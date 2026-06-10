#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const INPUT = path.join(ROOT, 'data/listings.import.json');
const OUTPUT = path.join(ROOT, 'app/data/listings.generated.json');
const VALID_STATUSES = new Set(['needs_verification', 'historical_source', 'current_source']);
const VALID_CATEGORIES = new Set(['dispensary', 'in-town-delivery']);
const PROVINCES = new Set(['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']);
const FORBIDDEN_COMMERCIAL_TERMS = [
  /\border\b/i,
  /\bbuy\b/i,
  /\bpurchase\b/i,
  /\bopen now\b/i,
  /\blicensed\b/i,
  /\bsame[- ]day delivery\b/i,
  /\b24\/?7\b/i,
  /\bin stock\b/i,
];

const REGULATOR_SOURCE_MARKERS = [
  /aglc/i,
  /cannabis_retail_stores_in_bc/i,
  /cannabis\s+licensee\s+search/i,
  /status-current-cannabis-retail-store-applications/i,
  /opengovca/i,
];

function readRows() {
  if (!fs.existsSync(INPUT)) {
    throw new Error(`Missing import file: ${path.relative(ROOT, INPUT)}`);
  }
  const parsed = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error('Import file must contain a JSON array.');
  return parsed;
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getStoreBackboneSource({
  verificationStatus,
  sourceName,
  sourceUrl,
  sourceUrls,
}) {
  if (verificationStatus !== 'current_source' && verificationStatus !== 'historical_source') {
    return 'needs_verification';
  }

  const haystack = `${sourceName || ''} ${sourceUrl || ''} ${(Array.isArray(sourceUrls) ? sourceUrls.join(' ') : '')}`.toLowerCase();
  if (REGULATOR_SOURCE_MARKERS.some((marker) => marker.test(haystack))) {
    return 'regulator';
  }

  return 'public_source';
}

function assertUrl(url, field, errors) {
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) errors.push(`${field} must be http(s): ${url}`);
  } catch {
    errors.push(`${field} must be a valid absolute URL: ${url}`);
  }
}

function validateRow(row, index, seen) {
  const label = `row ${index + 1}${row && row.slug ? ` (${row.slug})` : ''}`;
  const errors = [];
  const warnings = [];

  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    return { errors: [`${label}: row must be an object`], warnings, appRow: null };
  }

  const slug = cleanString(row.slug);
  const name = cleanString(row.name);
  const status = cleanString(row.status || 'needs_verification');

  if (!slug) errors.push(`${label}: missing required slug`);
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`${label}: slug must be lowercase kebab-case`);
  if (slug && seen.has(slug)) errors.push(`${label}: duplicate slug`);
  if (slug) seen.add(slug);
  if (!name) errors.push(`${label}: missing required name`);
  if (!VALID_STATUSES.has(status)) errors.push(`${label}: invalid status ${JSON.stringify(status)}`);

  const categories = Array.isArray(row.categories) ? row.categories.map(cleanString).filter(Boolean) : [];
  if (categories.length === 0) warnings.push(`${label}: no categories supplied; page will default to generic listing context`);
  for (const category of categories) {
    if (!VALID_CATEGORIES.has(category)) errors.push(`${label}: unknown category ${category}; add it to priorityCategories before importing`);
  }

  const sourceUrls = Array.isArray(row.source_urls) ? row.source_urls.map(cleanString).filter(Boolean) : [];
  for (const [sourceIndex, sourceUrl] of sourceUrls.entries()) assertUrl(sourceUrl, `${label}: source_urls[${sourceIndex}]`, errors);

  const website = cleanString(row.website);
  if (website) assertUrl(website, `${label}: website`, errors);

  const province = cleanString(row.province).toUpperCase();
  if (province && !PROVINCES.has(province)) errors.push(`${label}: province must be a Canadian province/territory code`);

  const address = cleanString(row.address);
  const city = cleanString(row.city);
  const postalCode = cleanString(row.postal_code);
  const phone = cleanString(row.phone);
  const lastVerified = cleanString(row.last_verified_at);
  const observedAt = cleanString(row.observed_at);
  const confidence = cleanString(row.confidence);
  const missingReasons = Array.isArray(row.missing_reasons) ? row.missing_reasons.map(cleanString).filter(Boolean) : [];
  if (lastVerified) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(lastVerified)) {
      errors.push(`${label}: last_verified_at must use YYYY-MM-DD`);
    } else {
      const parsedDate = new Date(`${lastVerified}T00:00:00.000Z`);
      if (Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== lastVerified) {
      errors.push(`${label}: last_verified_at must be a valid calendar date`);
      }
    }
  }
  if (observedAt) {
    const parsedObservedAt = new Date(observedAt);
    if (Number.isNaN(parsedObservedAt.getTime())) {
      errors.push(`${label}: observed_at must be a valid timestamp`);
    }
  }
  if (confidence && !['high', 'medium', 'low'].includes(confidence)) {
    errors.push(`${label}: confidence must be high, medium, or low`);
  }

  if (status !== 'needs_verification' && sourceUrls.length === 0) {
    errors.push(`${label}: ${status} requires at least one source_urls entry`);
  }
  if (status === 'current_source' && !lastVerified) {
    errors.push(`${label}: current_source requires last_verified_at`);
  }
  if (status === 'current_source' && (!address || !city || !province)) {
    errors.push(`${label}: current_source requires address, city, and province`);
  }
  if (status === 'historical_source' && website) {
    warnings.push(`${label}: website present on historical_source; app will not render outbound commercial CTAs`);
  }
  if ((address || phone || website) && sourceUrls.length === 0) {
    warnings.push(`${label}: contact/location fields need source_urls before promotion`);
  }

  const claimText = [row.source_note, ...(Array.isArray(row.commercial_claims) ? row.commercial_claims : [])].filter(Boolean).join(' ');
  for (const pattern of FORBIDDEN_COMMERCIAL_TERMS) {
    if (pattern.test(claimText)) {
      errors.push(`${label}: commercial/current-operation claim found (${pattern}); keep imports factual and remove purchase, availability, delivery, open-now, or licence-promotion wording from listing data`);
    }
  }

  const sourceName = cleanString(row.source_name);
  const sourceNote = cleanString(row.source_note);
  if (sourceUrls.length > 0 && !sourceName) warnings.push(`${label}: source_urls present without source_name`);
  if (sourceUrls.length > 0 && !sourceNote) warnings.push(`${label}: source_urls present without source_note`);

  const gscImpressions = Number(row.gsc_impressions || 0);
  const gscClicks = Number(row.gsc_clicks || 0);
  const averagePosition = Number(row.average_position || 0);
  if (!Number.isFinite(gscImpressions) || gscImpressions < 0) errors.push(`${label}: gsc_impressions must be a non-negative number`);
  if (!Number.isFinite(gscClicks) || gscClicks < 0) errors.push(`${label}: gsc_clicks must be a non-negative number`);
  if (!Number.isFinite(averagePosition) || averagePosition < 0) errors.push(`${label}: average_position must be a non-negative number`);

  const sourceUrl = sourceUrls[0] || undefined;
  const storeBackbone = getStoreBackboneSource({
    verificationStatus: status,
    sourceName,
    sourceUrl,
    sourceUrls,
  });
  const appRow = {
    slug,
    name,
    legacyPath: cleanString(row.legacy_path) || `/listing/${slug}/`,
    locationHint: cleanString(row.location_hint) || [city, province].filter(Boolean).join(', ') || 'Canada',
    gscImpressions,
    gscClicks,
    averagePosition,
    ...(address ? { address } : {}),
    ...(city ? { city } : {}),
    ...(province ? { province } : {}),
    ...(postalCode ? { postalCode } : {}),
    ...(phone ? { phone } : {}),
    verificationStatus: status,
    ...(website ? { website } : {}),
    ...(categories.length > 0 ? { categories } : {}),
    ...(sourceUrls.length > 0 ? { sourceUrls } : {}),
    ...(lastVerified ? { lastVerified } : {}),
    ...(observedAt ? { observedAt } : {}),
    ...(confidence ? { confidence } : {}),
    ...(missingReasons.length > 0 ? { missingReasons } : {}),
    ...(sourceName ? { sourceName } : {}),
    ...(sourceUrl ? { sourceUrl } : {}),
    ...(sourceNote ? { sourceNote } : {}),
    ...(storeBackbone ? { storeBackbone } : {}),
  };

  return { errors, warnings, appRow };
}

function main() {
  const rows = readRows();
  const seen = new Set();
  const allErrors = [];
  const allWarnings = [];
  const appRows = [];
  rows.forEach((row, index) => {
    const { errors, warnings, appRow } = validateRow(row, index, seen);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
    if (appRow) appRows.push(appRow);
  });

  for (const warning of allWarnings) console.warn(`WARN ${warning}`);
  if (allErrors.length > 0) {
    for (const error of allErrors) console.error(`ERROR ${error}`);
    console.error(`Listing import failed: ${allErrors.length} error(s), ${allWarnings.length} warning(s).`);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(appRows, null, 2) + '\n');
  console.log(`Listing import OK: ${appRows.length} listing(s), ${allWarnings.length} warning(s).`);
  console.log(`Wrote ${path.relative(ROOT, OUTPUT)}`);
}

main();
