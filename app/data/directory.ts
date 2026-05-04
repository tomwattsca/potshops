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

export const listingSeeds: ListingSeed[] = [
  { slug: 'green-leaf', name: 'Green Leaf', legacyPath: '/listing/green-leaf/', locationHint: 'Kahnawake, QC', gscImpressions: 7311, gscClicks: 436, averagePosition: 12.4 },
  { slug: 'the-green-leaf-society', name: 'The Green Leaf Society', legacyPath: '/listing/the-green-leaf-society/', locationHint: 'Vancouver / BC', gscImpressions: 5426, gscClicks: 123, averagePosition: 21.9 },
  { slug: 'healing-health-compassion', name: 'Healing Health Compassion', legacyPath: '/listing/healing-health-compassion/', locationHint: 'Canada', gscImpressions: 4829, gscClicks: 18, averagePosition: 7.9 },
  { slug: 'rocket-chronic-2', name: 'Rocket Chronic', legacyPath: '/listing/rocket-chronic-2/', locationHint: 'Canada', gscImpressions: 2439, gscClicks: 6, averagePosition: 6.0 },
  { slug: 'farm-the-original-farmacy-downtown', name: 'Farm: The Original Farmacy Downtown', legacyPath: '/listing/farm-the-original-farmacy-downtown/', locationHint: 'Victoria, BC', gscImpressions: 1974, gscClicks: 2, averagePosition: 25.3 },
  { slug: 'mountain-greenery', name: 'Mountain Greenery', legacyPath: '/listing/mountain-greenery/', locationHint: 'Hamilton, ON', gscImpressions: 1433, gscClicks: 15, averagePosition: 8.9 },
  { slug: 'green-essence-head-shop-dispensary', name: 'Green Essence Head Shop and Dispensary', legacyPath: '/listing/green-essence-head-shop-dispensary/', locationHint: 'Penticton, BC', gscImpressions: 981, gscClicks: 7, averagePosition: 9.9 },
  { slug: 'ahuevo-premium-marijuana', name: 'Ahuevo Premium Marijuana', legacyPath: '/listing/ahuevo-premium-marijuana/', locationHint: 'Vancouver, BC', gscImpressions: 539, gscClicks: 21, averagePosition: 8.3 },
  { slug: 'mount-zion-rastafarian-church', name: 'Mount Zion Rastafarian Church', legacyPath: '/listing/mount-zion-rastafarian-church/', locationHint: 'Canada', gscImpressions: 405, gscClicks: 29, averagePosition: 11.6 },
  { slug: 'leagle-dreams', name: 'Leagle Dreams', legacyPath: '/listing/leagle-dreams/', locationHint: 'Canada', gscImpressions: 562, gscClicks: 11, averagePosition: 8.5 },
  { slug: 'maritime-medicinal', name: 'Maritime Medicinal', legacyPath: '/listing/maritime-medicinal/', locationHint: 'Atlantic Canada', gscImpressions: 103, gscClicks: 11, averagePosition: 13.1 },
  { slug: 'clone-corner', name: 'Clone Corner', legacyPath: '/listing/clone-corner/', locationHint: 'Canada', gscImpressions: 219, gscClicks: 10, averagePosition: 39.8 },
  { slug: 'mr-greens', name: 'Mr. Greens', legacyPath: '/listing/mr-greens/', locationHint: 'Canada', gscImpressions: 550, gscClicks: 10, averagePosition: 26.4 },
  { slug: 'gulf-island-organics', name: 'Gulf Island Organics', legacyPath: '/listing/gulf-island-organics/', locationHint: 'BC', gscImpressions: 190, gscClicks: 8, averagePosition: 18.0 },
  { slug: 'remedy-ice-cream', name: 'Remedy Ice Cream', legacyPath: '/listing/remedy-ice-cream/', locationHint: 'Canada', gscImpressions: 64, gscClicks: 8, averagePosition: 6.3 },
  { slug: 'tpd-boutique', name: 'TPD Boutique', legacyPath: '/listing/tpd-boutique/', locationHint: 'Canada', gscImpressions: 334, gscClicks: 8, averagePosition: 7.5 },
  { slug: '420-delivery', name: '420 Delivery', legacyPath: '/listing/420-delivery/', locationHint: 'Canada', gscImpressions: 353, gscClicks: 7, averagePosition: 47.5 },
  { slug: 'blessed-herbs-cafe', name: 'Blessed Herbs Cafe', legacyPath: '/listing/blessed-herbs-cafe/', locationHint: 'Canada', gscImpressions: 135, gscClicks: 6, averagePosition: 9.3 },
  { slug: 'tribal-releaf', name: 'Tribal Releaf', legacyPath: '/listing/tribal-releaf/', locationHint: 'Canada', gscImpressions: 371, gscClicks: 6, averagePosition: 7.9 },
  { slug: 'piff-express', name: 'Piff Express', legacyPath: '/listing/piff-express/', locationHint: 'Canada', gscImpressions: 72, gscClicks: 5, averagePosition: 4.9 },
  { slug: 'compassion-in-motion', name: 'Compassion in Motion', legacyPath: '/listing/compassion-in-motion/', locationHint: 'Canada', gscImpressions: 601, gscClicks: 4, averagePosition: 6.5 },
  { slug: 'eden', name: 'Eden', legacyPath: '/listing/eden/', locationHint: 'Canada', gscImpressions: 254, gscClicks: 4, averagePosition: 21.4 },
  { slug: 'the-herb-co-mount-pleasant', name: 'The Herb Co Mount Pleasant', legacyPath: '/listing/the-herb-co-mount-pleasant/', locationHint: 'Vancouver, BC', gscImpressions: 171, gscClicks: 4, averagePosition: 30.5 },
  { slug: 'the-kootenays-medicine-tree', name: 'The Kootenays Medicine Tree', legacyPath: '/listing/the-kootenays-medicine-tree/', locationHint: 'BC', gscImpressions: 77, gscClicks: 4, averagePosition: 10.1 },
];


export const priorityCategories: Category[] = [
  { slug: 'dispensary', legacyPath: '/category/dispensary/', title: 'Canadian cannabis dispensary directory', description: 'A recovery page for dispensary-related Potshops.ca demand, designed to connect national dispensary searches to verified city and listing pages.', gscEvidence: 'GSC page data showed /category/dispensary/ impressions plus recurring query language around “dispensary”, “cannabis dispensary”, and city-specific dispensary searches.', legacyImpressions: 55, priority: 1 },
  { slug: 'in-town-delivery', legacyPath: '/category/in-town-delivery/', title: 'Cannabis delivery listings in Canada', description: 'A conservative rebuild page for delivery-intent searches. It should only promote verified, compliant delivery services after listing verification.', gscEvidence: 'GSC page data showed /category/in-town-delivery/ with 113 impressions and city delivery-adjacent queries.', legacyImpressions: 113, priority: 2 },
];

export const getCategory = (slug: string) => priorityCategories.find((category) => category.slug === slug);

export const getLocation = (slug: string) => priorityLocations.find((location) => location.slug === slug);
export const getListing = (slug: string) => listingSeeds.find((listing) => listing.slug === slug);
