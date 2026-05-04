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

export type ListingSeed = {
  slug: string;
  name: string;
  legacyPath: string;
  locationHint: string;
  gscImpressions: number;
  gscClicks: number;
  averagePosition: number;
};

export const priorityLocations: Location[] = [
  { slug: 'kahnawake', city: 'Kahnawake', province: 'QC', title: 'Cannabis stores and dispensaries in Kahnawake', description: 'Kahnawake generated the clearest local cannabis intent in Potshops Search Console data, including weed store, cannabis store, and dispensary searches.', gscEvidence: 'Queries included “weed shop kahnawake”, “kahnawake dispensary”, and “weed dispensary kahnawake”.', legacyImpressions: 1475, priority: 1 },
  { slug: 'halifax', city: 'Halifax', province: 'NS', title: 'Cannabis stores and dispensaries in Halifax', description: 'Halifax has repeat city-level searches for dispensaries, cannabis stores, and delivery-adjacent terms.', gscEvidence: 'Queries included “cannabis dispensary halifax”, “dispensaries halifax”, and “halifax dispensaries”.', legacyImpressions: 543, priority: 2 },
  { slug: 'fredericton', city: 'Fredericton', province: 'NB', title: 'Cannabis stores and dispensaries in Fredericton', description: 'Fredericton appears in both city page and store-level legacy URLs, making it a useful early rebuild target.', gscEvidence: 'Queries included “cannabis store fredericton”, “dispensary fredericton”, and “weed dispensary fredericton”.', legacyImpressions: 326, priority: 3 },
  { slug: 'victoria', city: 'Victoria', province: 'BC', title: 'Cannabis stores and dispensaries in Victoria', description: 'Victoria demand is tied to legacy Farmacy and Pineapple Express listing searches plus downtown dispensary terms.', gscEvidence: 'Queries included “farmacy victoria”, “farm dispensary victoria”, and “downtown victoria” dispensary variants.', legacyImpressions: 3120, priority: 4 },
  { slug: 'calgary', city: 'Calgary', province: 'AB', title: 'Cannabis stores and pot shops in Calgary', description: 'Calgary queries skew toward “pot shops” and city-level dispensary discovery.', gscEvidence: 'Queries included “calgary pot shops”, “pot shop calgary”, and “dispensary calgary”.', legacyImpressions: 205, priority: 5 },
  { slug: 'nanaimo', city: 'Nanaimo', province: 'BC', title: 'Cannabis stores and pot shops in Nanaimo', description: 'Nanaimo has legacy location-page impressions and long-tail pot shop demand.', gscEvidence: 'Queries included “pot shops nanaimo” and “nanaimo dispensaries still open”.', legacyImpressions: 166, priority: 6 },
  { slug: 'nelson', city: 'Nelson', province: 'BC', title: 'Cannabis stores and dispensaries in Nelson', description: 'Nelson appeared as both a location page and store-level query cluster in legacy Search Console data.', gscEvidence: 'Queries included “dispensary nelson”, “dispensary nelson bc”, and “nelson potorium”.', legacyImpressions: 470, priority: 7 },
];

export const listingSeeds: ListingSeed[] = [
  { slug: 'green-leaf', name: 'Green Leaf', legacyPath: '/listing/green-leaf/', locationHint: 'Kahnawake, QC', gscImpressions: 7311, gscClicks: 436, averagePosition: 12.4 },
  { slug: 'the-green-leaf-society', name: 'The Green Leaf Society', legacyPath: '/listing/the-green-leaf-society/', locationHint: 'Vancouver / BC', gscImpressions: 5426, gscClicks: 123, averagePosition: 21.9 },
  { slug: 'healing-health-compassion', name: 'Healing Health Compassion', legacyPath: '/listing/healing-health-compassion/', locationHint: 'Canada', gscImpressions: 4829, gscClicks: 18, averagePosition: 7.9 },
  { slug: 'rocket-chronic-2', name: 'Rocket Chronic', legacyPath: '/listing/rocket-chronic-2/', locationHint: 'Canada', gscImpressions: 2439, gscClicks: 6, averagePosition: 6.0 },
  { slug: 'farm-the-original-farmacy-downtown', name: 'Farm: The Original Farmacy Downtown', legacyPath: '/listing/farm-the-original-farmacy-downtown/', locationHint: 'Victoria, BC', gscImpressions: 1974, gscClicks: 2, averagePosition: 25.3 },
  { slug: 'mountain-greenery', name: 'Mountain Greenery', legacyPath: '/listing/mountain-greenery/', locationHint: 'Hamilton, ON', gscImpressions: 1433, gscClicks: 15, averagePosition: 8.9 },
  { slug: 'green-essence-head-shop-dispensary', name: 'Green Essence Head Shop & Dispensary', legacyPath: '/listing/green-essence-head-shop-dispensary/', locationHint: 'Penticton, BC', gscImpressions: 981, gscClicks: 7, averagePosition: 9.9 },
  { slug: 'ahuevo-premium-marijuana', name: 'Ahuevo Premium Marijuana', legacyPath: '/listing/ahuevo-premium-marijuana/', locationHint: 'Vancouver, BC', gscImpressions: 539, gscClicks: 21, averagePosition: 8.3 },
];

export const getLocation = (slug: string) => priorityLocations.find((location) => location.slug === slug);
export const getListing = (slug: string) => listingSeeds.find((listing) => listing.slug === slug);
