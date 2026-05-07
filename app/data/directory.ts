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
  { slug: 'calgary', city: 'Calgary', province: 'AB', title: 'Cannabis stores and pot shops in Calgary', description: 'Calgary queries skew toward “pot shops” and city-level dispensary discovery.', gscEvidence: 'Queries included “calgary pot shops”, “pot shop calgary”, and “dispensary calgary”.', legacyImpressions: 205, priority: 5 },
  { slug: 'nanaimo', city: 'Nanaimo', province: 'BC', title: 'Cannabis stores and pot shops in Nanaimo', description: 'Nanaimo has legacy location-page impressions and long-tail pot shop demand.', gscEvidence: 'Queries included “pot shops nanaimo” and “nanaimo dispensaries still open”.', legacyImpressions: 166, priority: 6 },
  { slug: 'nelson', city: 'Nelson', province: 'BC', title: 'Cannabis stores and dispensaries in Nelson', description: 'Nelson appeared as both a location page and store-level query cluster in legacy Search Console data.', gscEvidence: 'Queries included “dispensary nelson”, “dispensary nelson bc”, and “nelson potorium”.', legacyImpressions: 470, priority: 7 },
  { slug: 'vancouver', city: 'Vancouver', province: 'BC', title: 'Cannabis stores and dispensaries in Vancouver', description: 'Vancouver has meaningful legacy location-page impressions plus multiple high-impression legacy store profiles.', gscEvidence: 'GSC page data showed /location/vancouver/ with 512 impressions, and listing demand around The Green Leaf Society, Ahuevo, Herb Co, and other Vancouver-area profiles.', legacyImpressions: 512, priority: 8 },
  { slug: 'toronto', city: 'Toronto', province: 'ON', title: 'Cannabis stores and dispensaries in Toronto', description: 'Toronto is a broad rebuild target with legacy location-page demand and a large commercial cannabis search market.', gscEvidence: 'GSC page data showed /location/toronto/ with 109 impressions even while the old site was unavailable.', legacyImpressions: 109, priority: 9 },
  { slug: 'dartmouth', city: 'Dartmouth', province: 'NS', title: 'Cannabis stores and dispensaries in Dartmouth', description: 'Dartmouth appears as an adjacent Nova Scotia opportunity that can support the Halifax cluster.', gscEvidence: 'GSC page data showed /location/dartmouth/ with 71 impressions, making it a useful supporting page for the Halifax/Nova Scotia cluster.', legacyImpressions: 71, priority: 10 },
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
