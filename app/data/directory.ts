import listingSeedsImport from './listings.generated.json';

export type Location = {
  slug: string;
  city: string;
  province: string;
  title: string;
  description: string;
  gscEvidence: string;
  legacyImpressions: number;
  priority: number;
};

export type LocationUtility = {
  slug: string;
  summary: string;
  directoryStatus: string;
  searchIntent: string[];
  relatedListingSlugs: string[];
  internalCategorySlugs: string[];
  localCaveats: string[];
  verificationNextSteps: string[];
};

export type Category = {
  slug: string;
  legacyPath: string;
  title: string;
  description: string;
  gscEvidence: string;
  legacyImpressions: number;
  priority: number;
};

export type ListingSeed = {
  slug: string;
  name: string;
  legacyPath: string;
  locationHint: string;
  gscImpressions: number;
  gscClicks: number;
  averagePosition: number;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phone?: string;
  verificationStatus?: 'historical_source' | 'current_source' | 'needs_verification';
  lastVerified?: string;
  categories?: string[];
  sourceName?: string;
  sourceUrl?: string;
  sourceNote?: string;
};

export const priorityLocations: Location[] = [
  { slug: 'kahnawake', city: 'Kahnawake', province: 'QC', title: 'Cannabis stores and dispensaries in Kahnawake', description: 'Kahnawake generated the clearest local cannabis intent in Potshops Search Console data, including weed store, cannabis store, and dispensary searches.', gscEvidence: 'Queries included “weed shop kahnawake”, “kahnawake dispensary”, and “weed dispensary kahnawake”.', legacyImpressions: 1475, priority: 1 },
  { slug: 'halifax', city: 'Halifax', province: 'NS', title: 'Cannabis stores and dispensaries in Halifax', description: 'Halifax has repeat city-level searches for dispensaries, cannabis stores, and delivery-adjacent terms.', gscEvidence: 'Queries included “cannabis dispensary halifax”, “dispensaries halifax”, and “halifax dispensaries”.', legacyImpressions: 543, priority: 2 },
  { slug: 'fredericton', city: 'Fredericton', province: 'NB', title: 'Cannabis stores and dispensaries in Fredericton', description: 'Fredericton appears in both city page and store-level legacy URLs, making it a useful early rebuild target.', gscEvidence: 'Queries included “cannabis store fredericton”, “dispensary fredericton”, and “weed dispensary fredericton”.', legacyImpressions: 326, priority: 3 },
  { slug: 'victoria', city: 'Victoria', province: 'BC', title: 'Cannabis stores and dispensaries in Victoria', description: 'Victoria demand is tied to legacy Farmacy and Pineapple Express listing searches plus downtown dispensary terms.', gscEvidence: 'Queries included “farmacy victoria”, “farm dispensary victoria”, and “downtown victoria” dispensary variants.', legacyImpressions: 3120, priority: 4 },
  { slug: 'hamilton', city: 'Hamilton', province: 'ON', title: 'Cannabis stores and dispensaries in Hamilton', description: 'Hamilton now has an importer-backed Mountain Greenery listing that can anchor cautious local utility while broader city coverage is rebuilt.', gscEvidence: 'Source-backed rebuild work mapped Mountain Greenery to Hamilton and Upper Wellington Street; use this as a local recovery clue, not a current operating claim.', legacyImpressions: 0, priority: 5 },
  { slug: 'penticton', city: 'Penticton', province: 'BC', title: 'Cannabis stores and dispensaries in Penticton', description: 'Penticton now has a source-backed Green Essence listing that supports a small-market recovery page with clear historical-source caveats.', gscEvidence: 'Source-backed rebuild work mapped Green Essence Head Shop and Dispensary to Penticton and Martin Street; use this as a profile recovery clue, not a current operating claim.', legacyImpressions: 0, priority: 6 },
  { slug: 'calgary', city: 'Calgary', province: 'AB', title: 'Cannabis stores and pot shops in Calgary', description: 'Calgary queries skew toward “pot shops” and city-level dispensary discovery.', gscEvidence: 'Queries included “calgary pot shops”, “pot shop calgary”, and “dispensary calgary”.', legacyImpressions: 205, priority: 7 },
  { slug: 'nanaimo', city: 'Nanaimo', province: 'BC', title: 'Cannabis stores and pot shops in Nanaimo', description: 'Nanaimo has legacy location-page impressions and long-tail pot shop demand.', gscEvidence: 'Queries included “pot shops nanaimo” and “nanaimo dispensaries still open”.', legacyImpressions: 166, priority: 8 },
  { slug: 'nelson', city: 'Nelson', province: 'BC', title: 'Cannabis stores and dispensaries in Nelson', description: 'Nelson appeared as both a location page and store-level query cluster in legacy Search Console data.', gscEvidence: 'Queries included “dispensary nelson”, “dispensary nelson bc”, and “nelson potorium”.', legacyImpressions: 470, priority: 9 },
  { slug: 'vancouver', city: 'Vancouver', province: 'BC', title: 'Cannabis stores and dispensaries in Vancouver', description: 'Vancouver has meaningful legacy location-page impressions plus multiple high-impression legacy store profiles.', gscEvidence: 'GSC page data showed /location/vancouver/ with 512 impressions, and listing demand around The Green Leaf Society, Ahuevo, Herb Co, and other Vancouver-area profiles.', legacyImpressions: 512, priority: 10 },
  { slug: 'toronto', city: 'Toronto', province: 'ON', title: 'Cannabis stores and dispensaries in Toronto', description: 'Toronto is a broad rebuild target with legacy location-page demand and a large commercial cannabis search market.', gscEvidence: 'GSC page data showed /location/toronto/ with 109 impressions even while the old site was unavailable.', legacyImpressions: 109, priority: 11 },
  { slug: 'dartmouth', city: 'Dartmouth', province: 'NS', title: 'Cannabis stores and dispensaries in Dartmouth', description: 'Dartmouth appears as an adjacent Nova Scotia opportunity that can support the Halifax cluster.', gscEvidence: 'GSC page data showed /location/dartmouth/ with 71 impressions, making it a useful supporting page for the Halifax/Nova Scotia cluster.', legacyImpressions: 71, priority: 12 },
];

export const locationUtilities: LocationUtility[] = [
  {
    slug: 'kahnawake',
    summary: 'Kahnawake is the clearest city-level recovery opportunity in the current Potshops data because searches use direct local language rather than only legacy brand names.',
    directoryStatus: 'One high-demand legacy profile is mapped to Kahnawake today. It is labelled historical because the available source confirms local reporting context, not a current licence or storefront status.',
    searchIntent: ['weed shop kahnawake', 'kahnawake dispensary', 'weed dispensary kahnawake'],
    relatedListingSlugs: ['green-leaf'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Kahnawake cannabis search results can mix community businesses, historical enforcement coverage, and current-store intent; Potshops should separate those facts clearly.',
      'Do not treat historical local reporting as proof that a store is currently open, licensed, or accepting orders.',
      'Priority enrichment should verify address, operating status, and source date before adding maps, hours, or commercial links.',
    ],
    verificationNextSteps: [
      'Confirm whether each Kahnawake profile has an official/current public source.',
      'Add address-level facts only when they come from an official business, regulator, or current directory source.',
      'Keep this page as a cautious city guide until at least two verified local profiles are available.',
    ],
  },
  {
    slug: 'vancouver',
    summary: 'Vancouver has the broadest cluster of legacy store-profile demand in the seed data, including Davie Street, Victoria Drive, Mount Pleasant, and Arbutus Ridge-adjacent searches.',
    directoryStatus: 'Four Vancouver-area listing seeds are connected to this page; two have public-source enrichment and the others are still queued for verification.',
    searchIntent: ['cannabis culture dispensary', 'weed delivery arbutus ridge bc', 'the green leaf society', 'vancouver dispensary'],
    relatedListingSlugs: ['cannabis-culture-920-davie', 'the-green-leaf-society', 'ahuevo-premium-marijuana', 'the-herb-co-mount-pleasant'],
    internalCategorySlugs: ['dispensary', 'in-town-delivery'],
    localCaveats: [
      'Vancouver legacy demand is mostly listing-led, so the page should point users to profile-level evidence instead of claiming comprehensive city coverage.',
      'The Arbutus Ridge delivery query is intent evidence only; Potshops should not advertise delivery availability until a compliant current source is verified.',
      'Some Vancouver source data is historical or cancelled-licence context, so visible copy must avoid current operating claims.',
    ],
    verificationNextSteps: [
      'Finish source notes for Ahuevo Premium Marijuana and The Herb Co Mount Pleasant.',
      'Separate Vancouver neighbourhood hints such as Davie Street, Victoria Drive, Mount Pleasant, and Arbutus Ridge when enough verified profiles exist.',
      'Only add outbound websites or contact links after compliance and current-status checks pass.',
    ],
  },
  {
    slug: 'fredericton',
    summary: 'Fredericton is a smaller but useful recovery page because it has both city-level query demand and a specific legacy King Canna profile that has already been source-enriched.',
    directoryStatus: 'One Fredericton listing seed is mapped and has historical public-source address context; current licensing and operating status still needs confirmation.',
    searchIntent: ['cannabis store fredericton', 'dispensary fredericton', 'weed dispensary fredericton'],
    relatedListingSlugs: ['king-canna-fredericton-2'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current seed set is too small to present as a complete Fredericton directory.',
      'The Hanwell Road address is sourced from a public shop directory, but Potshops still needs an official/current confirmation before stronger claims.',
      'Until more verified New Brunswick profiles are imported, this page should emphasize recovery status and verification needs.',
    ],
    verificationNextSteps: [
      'Check official/current sources for King Canna Fredericton before adding hours, map links, or contact CTAs.',
      'Find at least two additional Fredericton or nearby New Brunswick profiles before expanding the page into a broader local guide.',
      'Use this page to test the import validation workflow before scaling New Brunswick listings.',
    ],
  },
  {
    slug: 'victoria',
    summary: 'Victoria combines one of the largest legacy demand clusters in the rebuild with a newly source-enriched downtown Farmacy profile, so the page should help visitors separate brand-history searches from verified current-store facts.',
    directoryStatus: 'One Victoria listing is mapped today: Farm: The Original Farmacy Downtown. It is labelled historical because public-source evidence supports the downtown association and address context, not current operating status.',
    searchIntent: ['farmacy victoria', 'farm dispensary victoria', 'downtown victoria dispensary', 'victoria bc cannabis store'],
    relatedListingSlugs: ['farm-the-original-farmacy-downtown'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Victoria searches include brand-specific Farmacy language and broader downtown dispensary intent; Potshops should not imply comprehensive local coverage from one mapped profile.',
      'Historical directory evidence is useful for recovery, but it does not prove a storefront is currently open, licensed, or accepting orders.',
      'Downtown neighbourhood copy should remain informational until current official or regulator-backed sources are available.',
    ],
    verificationNextSteps: [
      'Confirm current public sources before adding website, phone, hours, map embeds, or outbound contact links for Victoria profiles.',
      'Look for additional Victoria and Greater Victoria listing candidates before expanding this page into a broader local guide.',
      'Keep the page focused on source-backed recovery and internal links until compliance review clears stronger local business claims.',
    ],
  },
  {
    slug: 'hamilton',
    summary: 'Hamilton is now a useful supporting location page because the importer-backed batch added Mountain Greenery with city and address context that can anchor a cautious local directory section.',
    directoryStatus: 'One Hamilton listing is mapped today: Mountain Greenery. The row remains historical/source-backed until current operating, licence, and contact facts are independently confirmed.',
    searchIntent: ['mountain greenery hamilton', 'hamilton dispensary', 'hamilton cannabis store', 'upper wellington cannabis'],
    relatedListingSlugs: ['mountain-greenery'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current Hamilton footprint is one mapped profile, so this page should not be framed as a complete Hamilton cannabis directory.',
      'Address-level context came from public sources but should not be converted into hours, ordering, delivery, or availability claims.',
      'Hamilton neighbourhood and street-level hints are helpful only when tied to visible source notes on listing pages.',
    ],
    verificationNextSteps: [
      'Find official or regulator-backed sources for Mountain Greenery before adding current-status details.',
      'Add more Hamilton-area listings only through the validated import workflow with source URLs and conservative notes.',
      'Use this page to link users to verified listing evidence rather than outbound cannabis commerce until compliance posture is clearer.',
    ],
  },
  {
    slug: 'penticton',
    summary: 'Penticton is a small but concrete recovery opportunity after the enrichment batch added Green Essence Head Shop and Dispensary with source-backed local context.',
    directoryStatus: 'One Penticton listing is mapped today: Green Essence Head Shop and Dispensary. The available evidence is treated as historical/public-source context, not a current availability or licence claim.',
    searchIntent: ['green essence penticton', 'penticton dispensary', 'penticton cannabis store', 'martin street cannabis'],
    relatedListingSlugs: ['green-essence-head-shop-dispensary'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Penticton currently has one mapped listing, so the page should be clear that Potshops is rebuilding coverage rather than listing every local option.',
      'Source-backed address context should remain separate from current operating, ordering, delivery, review, or rating claims.',
      'Small-market pages can become thin quickly; keep visible utility tied to exact mapped listing evidence and verification needs.',
    ],
    verificationNextSteps: [
      'Confirm current official or regulator-backed details before adding contact links, maps, hours, or richer LocalBusiness-style facts.',
      'Search for additional Penticton or South Okanagan candidates before broadening the page beyond one source-backed profile.',
      'Retain conservative historical labelling until source freshness and compliance are verified.',
    ],
  },
];

export const listingSeeds: ListingSeed[] = listingSeedsImport as ListingSeed[];


export const priorityCategories: Category[] = [
  { slug: 'dispensary', legacyPath: '/category/dispensary/', title: 'Canadian cannabis dispensary directory', description: 'A recovery page for dispensary-related Potshops.ca demand, designed to connect national dispensary searches to verified city and listing pages.', gscEvidence: 'GSC page data showed /category/dispensary/ impressions plus recurring query language around “dispensary”, “cannabis dispensary”, and city-specific dispensary searches.', legacyImpressions: 55, priority: 1 },
  { slug: 'in-town-delivery', legacyPath: '/category/in-town-delivery/', title: 'Cannabis delivery listings in Canada', description: 'A conservative rebuild page for delivery-intent searches. It should only promote verified, compliant delivery services after listing verification.', gscEvidence: 'GSC page data showed /category/in-town-delivery/ with 113 impressions and city delivery-adjacent queries.', legacyImpressions: 113, priority: 2 },
];

export const getCategory = (slug: string) => priorityCategories.find((category) => category.slug === slug);

export const getLocation = (slug: string) => priorityLocations.find((location) => location.slug === slug);
export const getLocationUtility = (slug: string) => locationUtilities.find((utility) => utility.slug === slug);
export const getListing = (slug: string) => listingSeeds.find((listing) => listing.slug === slug);
