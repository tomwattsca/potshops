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
  { slug: 'shannonville', city: 'Shannonville', province: 'ON', title: 'Cannabis stores and dispensaries in Shannonville', description: 'Shannonville is now a source-backed recovery page because the Leagle Dreams legacy listing has address and phone context from a public directory.', gscEvidence: 'GSC listing demand showed Leagle Dreams with 562 impressions and 11 clicks; source-backed enrichment mapped the row to Old Highway 2 in Shannonville.', legacyImpressions: 562, priority: 4 },
  { slug: 'tobique-narrows', city: 'Tobique Narrows', province: 'NB', title: 'Cannabis stores and dispensaries in Tobique Narrows', description: 'Tobique Narrows has a source-backed Tribal ReLeaf profile that can support cautious New Brunswick internal linking.', gscEvidence: 'GSC listing demand showed Tribal ReLeaf with 371 impressions and 11 clicks; source-backed enrichment mapped the row to NB-105 in Tobique Narrows.', legacyImpressions: 371, priority: 5 },
  { slug: 'duncan', city: 'Duncan', province: 'BC', title: 'Cannabis stores and dispensaries in Duncan', description: 'Duncan has a source-backed Clone Corner profile that can anchor a small Vancouver Island recovery page.', gscEvidence: 'GSC listing demand showed Clone Corner with 219 impressions and 10 clicks; source-backed enrichment mapped the row to Sahilton Road in Duncan.', legacyImpressions: 219, priority: 6 },
  { slug: 'victoria', city: 'Victoria', province: 'BC', title: 'Cannabis stores and dispensaries in Victoria', description: 'Victoria demand is tied to legacy Farmacy, Pineapple Express, and Gulf Island Organics listing searches plus downtown dispensary terms.', gscEvidence: 'Queries included “farmacy victoria”, “farm dispensary victoria”, “gulf island organics”, and downtown Victoria dispensary variants.', legacyImpressions: 3310, priority: 7 },
  { slug: 'hamilton', city: 'Hamilton', province: 'ON', title: 'Cannabis stores and dispensaries in Hamilton', description: 'Hamilton now has an importer-backed Mountain Greenery listing that can anchor cautious local utility while broader city coverage is rebuilt.', gscEvidence: 'Source-backed rebuild work mapped Mountain Greenery to Hamilton and Upper Wellington Street; use this as a local recovery clue, not a current operating claim.', legacyImpressions: 0, priority: 8 },
  { slug: 'penticton', city: 'Penticton', province: 'BC', title: 'Cannabis stores and dispensaries in Penticton', description: 'Penticton now has multiple source-backed historical profiles that support a cautious South Okanagan recovery page.', gscEvidence: 'Source-backed rebuild work mapped Green Essence to Martin Street and TPD Boutique to Front Street; use these as profile recovery clues, not current operating claims.', legacyImpressions: 0, priority: 9 },
  { slug: 'calgary', city: 'Calgary', province: 'AB', title: 'Cannabis stores and pot shops in Calgary', description: 'Calgary queries skew toward “pot shops”, city-level dispensary discovery, and Remedy Ice Cream legacy interest.', gscEvidence: 'Queries included “calgary pot shops”, “pot shop calgary”, “dispensary calgary”, and a source-backed Remedy Ice Cream listing cluster.', legacyImpressions: 269, priority: 10 },
  { slug: 'nanaimo', city: 'Nanaimo', province: 'BC', title: 'Cannabis stores and pot shops in Nanaimo', description: 'Nanaimo has legacy location-page impressions, long-tail pot shop demand, and now a source-backed Mr. Green’s recovery profile.', gscEvidence: 'Queries included “pot shops nanaimo” and “nanaimo dispensaries still open”; source-backed enrichment mapped Mr. Green’s to Nicol Street.', legacyImpressions: 166, priority: 11 },
  { slug: 'nelson', city: 'Nelson', province: 'BC', title: 'Cannabis stores and dispensaries in Nelson', description: 'Nelson appeared as both a location page and store-level query cluster, and now has a source-backed Kootenays Medicine Tree profile.', gscEvidence: 'Queries included “dispensary nelson”, “dispensary nelson bc”, and “nelson potorium”; source-backed enrichment mapped The Kootenay’s Medicine Tree to Front Street.', legacyImpressions: 470, priority: 12 },
  { slug: 'vancouver', city: 'Vancouver', province: 'BC', title: 'Cannabis stores and dispensaries in Vancouver', description: 'Vancouver has meaningful legacy location-page impressions plus multiple high-impression legacy store and region-service profiles.', gscEvidence: 'GSC page data showed /location/vancouver/ with 512 impressions, and listing demand around The Green Leaf Society, Ahuevo, Herb Co, Compassion in Motion, Call 420, and other Vancouver-area profiles.', legacyImpressions: 512, priority: 13 },
  { slug: 'toronto', city: 'Toronto', province: 'ON', title: 'Cannabis stores and dispensaries in Toronto', description: 'Toronto is a broad rebuild target with legacy location-page demand and several source-backed historical profiles now mapped.', gscEvidence: 'GSC page data showed /location/toronto/ with 109 impressions; enrichment now maps Piff Express plus Annette Street historical profiles.', legacyImpressions: 109, priority: 14 },
  { slug: 'bible-hill', city: 'Bible Hill', province: 'NS', title: 'Cannabis stores and dispensaries in Bible Hill', description: 'Bible Hill now has a source-backed Maritime Medicinal historical profile that supports a cautious Nova Scotia recovery page.', gscEvidence: 'Source-backed enrichment mapped Maritime Medicinal to Main Street in Bible Hill; use this as profile recovery evidence, not a current-service claim.', legacyImpressions: 103, priority: 15 },
  { slug: 'salmon-arm', city: 'Salmon Arm', province: 'BC', title: 'Cannabis stores and dispensaries in Salmon Arm', description: 'Salmon Arm now has a source-backed Eden historical profile that can anchor a small Interior BC recovery page.', gscEvidence: 'Source-backed enrichment mapped Eden to Lakeshore Drive NW in Salmon Arm; use this as historical directory evidence until fresher sources are found.', legacyImpressions: 0, priority: 16 },
  { slug: 'deseronto', city: 'Deseronto', province: 'ON', title: 'Cannabis stores and dispensaries in Deseronto', description: 'Deseronto now has a source-backed Cannabis Convenience historical profile that can support a cautious Bay of Quinte recovery page.', gscEvidence: 'Source-backed enrichment mapped Cannabis Convenience to Highway 49 in Deseronto; use this as historical directory evidence until current official sources are found.', legacyImpressions: 0, priority: 17 },
  { slug: 'vernon', city: 'Vernon', province: 'BC', title: 'Cannabis stores and dispensaries in Vernon', description: 'Vernon now has a source-backed Okanagan Cannabinoid Therapy historical profile, adding a cautious North Okanagan recovery page.', gscEvidence: 'Source-backed enrichment mapped Okanagan Cannabinoid Therapy to 30th Avenue in Vernon; use this as historical directory evidence until current official sources are found.', legacyImpressions: 0, priority: 18 },
  { slug: 'dartmouth', city: 'Dartmouth', province: 'NS', title: 'Cannabis stores and dispensaries in Dartmouth', description: 'Dartmouth appears as an adjacent Nova Scotia opportunity that can support the Halifax cluster.', gscEvidence: 'GSC page data showed /location/dartmouth/ with 71 impressions, making it a useful supporting page for the Halifax/Nova Scotia cluster.', legacyImpressions: 71, priority: 19 },
  { slug: 'belleville', city: 'Belleville', province: 'ON', title: 'Cannabis stores and dispensaries in Belleville', description: 'Belleville adds an official-source Bay of Quinte page that can support the Deseronto/Tyendinaga recovery cluster without relying only on historical seed rows.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add an official-source Belleville profile; use it as cautious local directory depth, not a menu or availability claim.', legacyImpressions: 0, priority: 20 },
  { slug: 'ottawa', city: 'Ottawa', province: 'ON', title: 'Cannabis stores and dispensaries in Ottawa', description: 'Ottawa adds an official-source Ontario city cluster with multiple AGCO-listed address-context profiles.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add Ottawa profiles on Preston, George, and Somerset streets; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 21 },
  { slug: 'kingston', city: 'Kingston', province: 'ON', title: 'Cannabis stores and dispensaries in Kingston', description: 'Kingston adds an official-source eastern Ontario cluster with several AGCO-listed address-context profiles.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add Kingston profiles on Princess and Division streets; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 22 },
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
    summary: 'Vancouver has the broadest cluster of legacy store-profile demand in the seed data, including Davie Street, Victoria Drive, Mount Pleasant, Arbutus Ridge-adjacent searches, and two newly source-backed Greater Vancouver region-service profiles.',
    directoryStatus: 'Six Vancouver-area listing seeds are connected to this page; all six now have public-source enrichment, but the two region-service rows remain deliberately caveated because the sources support brand/region context rather than address-level or licence proof.',
    searchIntent: ['cannabis culture dispensary', 'weed delivery arbutus ridge bc', 'the green leaf society', 'compassion in motion', 'call 420 delivery', 'vancouver dispensary'],
    relatedListingSlugs: ['cannabis-culture-920-davie', 'the-green-leaf-society', 'ahuevo-premium-marijuana', 'the-herb-co-mount-pleasant', 'compassion-in-motion', '420-delivery'],
    internalCategorySlugs: ['dispensary', 'in-town-delivery'],
    localCaveats: [
      'Vancouver legacy demand is mostly listing-led, so the page should point users to profile-level evidence instead of claiming comprehensive city coverage.',
      'Greater Vancouver service-profile evidence can span Vancouver, Burnaby, Richmond, Surrey, Maple Ridge, and the Lower Mainland; Potshops should not imply a precise storefront location when sources only support regional context.',
      'Some Vancouver source data is historical, cancelled-licence, or brand-site context, so visible copy must avoid current operating claims.',
    ],
    verificationNextSteps: [
      'Recheck official/current public sources for Ahuevo Premium Marijuana, The Herb Co Mount Pleasant, Compassion in Motion, and Call 420 before adding address-level facts.',
      'Separate Vancouver neighbourhood hints such as Davie Street, Victoria Drive, Mount Pleasant, Arbutus Ridge, and the broader Lower Mainland when enough verified profiles exist.',
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
    searchIntent: ['farmacy victoria', 'farm dispensary victoria', 'gulf island organics', 'downtown victoria dispensary', 'victoria bc cannabis store'],
    relatedListingSlugs: ['farm-the-original-farmacy-downtown', 'gulf-island-organics'],
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
    directoryStatus: 'Three Hamilton listings are mapped today: one historical recovery profile and two AGCO-sourced address-context profiles. The official-source rows add current directory depth, but Potshops still avoids hours, menus, stock, ordering, or service claims.',
    searchIntent: ['mountain greenery hamilton', 'village cannabis hamilton', 'neku cannabis hamilton', 'hamilton dispensary', 'hamilton cannabis store', 'upper wellington cannabis', 'king street east cannabis'],
    relatedListingSlugs: ['mountain-greenery', 'village-cannabis-co-hamilton', 'neku-cannabis-hamilton'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current Hamilton footprint is still selective, so this page should not be framed as a complete Hamilton cannabis directory even after adding two official-source rows.',
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
    directoryStatus: 'Two Penticton listings are mapped today: Green Essence Head Shop and Dispensary, plus TPD Boutique. The available evidence is treated as historical/public-source context, not a current availability claim.',
    searchIntent: ['green essence penticton', 'tpd boutique penticton', 'penticton dispensary', 'penticton cannabis store', 'martin street cannabis', 'front street cannabis'],
    relatedListingSlugs: ['green-essence-head-shop-dispensary', 'tpd-boutique'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Penticton currently has two mapped listings, so the page should still be clear that Potshops is rebuilding coverage rather than listing every local option.',
      'Source-backed address context should remain separate from current operating, ordering, delivery, review, or rating claims.',
      'Small-market pages can become thin quickly; keep visible utility tied to exact mapped listing evidence and verification needs.',
    ],
    verificationNextSteps: [
      'Confirm current official or regulator-backed details before adding contact links, maps, hours, or richer LocalBusiness-style facts.',
      'Search for additional Penticton or South Okanagan candidates before broadening the page beyond one source-backed profile.',
      'Retain conservative historical labelling until source freshness and compliance are verified.',
    ],
  },
  {
    slug: 'toronto',
    summary: 'Toronto has broad city-level demand and now one source-backed historical Piff Express row that can anchor a cautious delivery-intent recovery section.',
    directoryStatus: 'Five Toronto listings are mapped today: three historical/contextual profiles plus two AGCO-sourced address-context profiles. The official-source rows improve city coverage, but Potshops still avoids hours, menus, stock, ordering, or service claims.',
    searchIntent: ['piff express', 'canna savanna toronto', 'fogtown flower toronto', 'toronto cannabis delivery', 'dundas street west cannabis', 'queen street west cannabis', 'yonge street cannabis', 'toronto dispensary'],
    relatedListingSlugs: ['piff-express', 'mount-zion-rastafarian-church', 'blessed-herbs-cafe', 'canna-savanna-toronto', 'fogtown-flower-toronto'],
    internalCategorySlugs: ['in-town-delivery', 'dispensary'],
    localCaveats: [
      'Toronto is too large for five mapped profiles to imply comprehensive coverage.',
      'Enforcement-context source data should be clearly separated from current business discovery.',
      'Delivery-intent pages require extra compliance caution and should not contain order, availability, or service claims without current legal review.',
    ],
    verificationNextSteps: [
      'Find official/current sources before adding Toronto contact links, hours, maps, or LocalBusiness-style facts.',
      'Add multiple Toronto profiles through the importer before promoting this as a city guide.',
      'Keep the row useful for legacy URL recovery and internal linking while current-status evidence is missing.',
    ],
  },
  {
    slug: 'calgary',
    summary: 'Calgary has city-level pot-shop demand plus a source-backed Remedy Ice Cream legacy profile that should remain framed as historical reporting.',
    directoryStatus: 'One Calgary listing is mapped today: Remedy Ice Cream. The source is historical news coverage and does not support contact, operating, or availability claims.',
    searchIntent: ['remedy ice cream', 'calgary pot shops', 'pot shop calgary', 'calgary cannabis store'],
    relatedListingSlugs: ['remedy-ice-cream'],
    internalCategorySlugs: ['in-town-delivery'],
    localCaveats: [
      'Remedy Ice Cream source coverage discussed legality concerns, so the row must stay historical and non-commercial.',
      'Calgary city copy should not imply current delivery, sales, stock, or licence status from older media coverage.',
      'Additional Calgary profiles need official/current sourcing before this becomes a broader local guide.',
    ],
    verificationNextSteps: [
      'Use official/current sources for any future Calgary storefront or service facts.',
      'Research additional Calgary listings through the import workflow rather than adding unsupported city boilerplate.',
      'Avoid outbound commercial CTAs for historical or legality-sensitive rows.',
    ],
  },
  {
    slug: 'shannonville',
    summary: 'Shannonville now has one high-signal, source-backed profile from the legacy data: L’Eagle Dreams.',
    directoryStatus: 'One Shannonville listing is mapped today. It is historical/source-backed because the public directory evidence gives address and phone context, not current operating or licence proof.',
    searchIntent: ['leagle dreams', 'leagle dreams shannonville', 'shannonville dispensary', 'old highway 2 cannabis'],
    relatedListingSlugs: ['leagle-dreams'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Do not imply comprehensive Shannonville coverage from one mapped profile.',
      'Public directory address and phone data need regulator or business-source confirmation before maps, hours, or contact CTAs are added.',
      'Tyendinaga and Shannonville search results can mix legacy directories, Indigenous-territory businesses, and current commercial intent, so page copy must keep evidence type visible.',
    ],
    verificationNextSteps: [
      'Find an official or regulator-backed current source for L’Eagle Dreams before adding stronger LocalBusiness facts.',
      'Research nearby Tyendinaga/Shannonville profiles through the import workflow before expanding this into a local guide.',
      'Keep outbound commercial links absent until compliance posture and current status are reviewed.',
    ],
  },
  {
    slug: 'tobique-narrows',
    summary: 'Tobique Narrows adds a second New Brunswick recovery cluster beyond Fredericton by mapping Tribal ReLeaf to a source-backed profile.',
    directoryStatus: 'One Tobique Narrows listing is mapped today. It has historical public-directory address and phone context but no official current-status verification.',
    searchIntent: ['tribal releaf', 'tribal releaf tobique narrows', 'tobique narrows dispensary', 'nb-105 cannabis'],
    relatedListingSlugs: ['tribal-releaf'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The row should be treated as a recovered profile, not proof of a currently operating or licensed storefront.',
      'New Brunswick pages should avoid broad store-finder claims until multiple official/current sources are mapped.',
      'Address and phone context should remain visibly tied to the source note on the listing page.',
    ],
    verificationNextSteps: [
      'Look for official business, regulator, or local-government references before adding hours or richer schema.',
      'Add additional nearby New Brunswick profiles only when source URLs and conservative notes pass the importer.',
      'Use the page primarily for internal linking and recovery until a broader local dataset exists.',
    ],
  },
  {
    slug: 'duncan',
    summary: 'Duncan is a focused Vancouver Island recovery page anchored by the newly source-backed Clone Corner listing.',
    directoryStatus: 'One Duncan listing is mapped today. It is historical/source-backed until current operating, licence, and contact status are independently confirmed.',
    searchIntent: ['clone corner duncan', 'duncan dispensary', 'duncan cannabis store', 'sahilton road cannabis'],
    relatedListingSlugs: ['clone-corner'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'A single Clone Corner profile is not enough to present as a complete Duncan cannabis directory.',
      'Public directory contact details should not become hours, ordering, stock, or current availability claims.',
      'Vancouver Island city pages should remain source-evidence-led until multiple verified profiles exist.',
    ],
    verificationNextSteps: [
      'Confirm Clone Corner against official/current public sources before adding maps, hours, or outbound contact links.',
      'Research additional Duncan and Cowichan Valley candidates through the validated importer.',
      'Keep the page connected to exact listing evidence and category hubs while coverage is thin.',
    ],
  },


  {
    slug: 'nanaimo',
    summary: 'Nanaimo has legacy pot-shop demand and now one source-backed Mr. Green’s profile that can anchor a cautious Vancouver Island recovery page.',
    directoryStatus: 'One Nanaimo listing is mapped today: Mr. Green’s. It is historical/source-backed until current status and regulator/business-source details are independently confirmed.',
    searchIntent: ['pot shops nanaimo', 'nanaimo dispensaries still open', 'mr greens nanaimo', 'nicol street cannabis'],
    relatedListingSlugs: ['mr-greens'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current Nanaimo footprint is one mapped profile, so the page should not imply complete city coverage.',
      'Historical directory address and phone context must not become hours, ordering, stock, or current availability claims.',
      'Nanaimo and broader Vancouver Island pages should stay evidence-led until multiple current public sources are mapped.',
    ],
    verificationNextSteps: [
      'Find official or current public sources for Mr. Green’s before adding maps, hours, or outbound contact links.',
      'Research additional Nanaimo and mid-Island candidates through the validated importer.',
      'Keep users pointed to exact listing evidence while coverage is still thin.',
    ],
  },
  {
    slug: 'nelson',
    summary: 'Nelson combines legacy dispensary queries with a newly source-backed Kootenays Medicine Tree profile, making it a useful Kootenay recovery page.',
    directoryStatus: 'One Nelson listing is mapped today: The Kootenay’s Medicine Tree. It remains historical/source-backed until fresher current-status evidence is found.',
    searchIntent: ['dispensary nelson', 'dispensary nelson bc', 'nelson potorium', 'kootenays medicine tree'],
    relatedListingSlugs: ['the-kootenays-medicine-tree'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Nelson search demand mixes city-level discovery and older store-name interest; Potshops should keep those evidence types separate.',
      'Address and phone context from a public directory should not be converted into current storefront or service claims.',
      'Broader Kootenay coverage needs more source-backed rows before this page becomes more than a recovery guide.',
    ],
    verificationNextSteps: [
      'Look for official/current public references for Kootenays Medicine Tree before adding richer business facts.',
      'Add additional Nelson or Kootenay listings through the importer only with visible source URLs and conservative notes.',
      'Use the page for internal linking to the exact recovered profile and category hub while coverage is small.',
    ],
  },
  {
    slug: 'bible-hill',
    summary: 'Bible Hill gives the Nova Scotia cluster one source-backed profile through Maritime Medicinal, adjacent to Halifax/Dartmouth search demand.',
    directoryStatus: 'One Bible Hill listing is mapped today: Maritime Medicinal. It is historical/source-backed and should not be presented as a current service listing.',
    searchIntent: ['maritime medicinal', 'bible hill dispensary', 'truro cannabis', 'nova scotia dispensary'],
    relatedListingSlugs: ['maritime-medicinal'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Bible Hill and Truro-area searches are adjacent to the larger Halifax/Dartmouth cluster, but one profile is not enough for complete coverage.',
      'Public directory contact data needs fresher confirmation before maps, hours, or contact CTAs are added.',
      'Nova Scotia pages should stay especially clear about historical versus current source status.',
    ],
    verificationNextSteps: [
      'Find official/current sources for Maritime Medicinal before adding any stronger business details.',
      'Research additional Halifax, Dartmouth, Truro, and Bible Hill candidates through the importer.',
      'Keep the page linked to exact source-backed evidence until the province cluster has more depth.',
    ],
  },
  {
    slug: 'salmon-arm',
    summary: 'Salmon Arm now has one recovered Interior BC profile through Eden, adding a small but concrete location page outside the larger Vancouver Island and Lower Mainland clusters.',
    directoryStatus: 'One Salmon Arm listing is mapped today: Eden. The row is historical/source-backed until current public-source status is independently confirmed.',
    searchIntent: ['eden salmon arm', 'salmon arm dispensary', 'salmon arm cannabis store', 'lakeshore drive cannabis'],
    relatedListingSlugs: ['eden'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current Salmon Arm footprint is one recovered profile, not a complete city directory.',
      'Historical directory evidence should not be used for current availability, service, or compliance claims.',
      'Interior BC coverage needs more source-backed profiles before broader local guide copy is warranted.',
    ],
    verificationNextSteps: [
      'Find fresher official or business-source evidence before adding maps, hours, or outbound contact links.',
      'Research additional Salmon Arm and Shuswap-area candidates through the import workflow.',
      'Use this page primarily for legacy recovery and internal linking while the local dataset is thin.',
    ],
  },
  {
    slug: 'deseronto',
    summary: 'Deseronto now has one recovered historical profile through Cannabis Convenience, giving the Bay of Quinte/Tyendinaga-area cluster a source-backed starting point.',
    directoryStatus: 'One Deseronto listing is mapped today: Cannabis Convenience. The row is historical/source-backed and should not be presented as a current service or availability listing.',
    searchIntent: ['cannabis convenience deseronto', 'deseronto dispensary', 'bay of quinte cannabis store', 'highway 49 cannabis'],
    relatedListingSlugs: ['cannabis-convenience'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Deseronto and nearby Tyendinaga searches can mix historical directory profiles, Indigenous-territory businesses, and current commercial intent; Potshops should keep evidence types visible.',
      'The public directory address and phone are useful profile context, not proof of current licensing, hours, stock, or service availability.',
      'Do not infer delivery or ordering availability from the old Potshops recovery footprint or nearby-category language.',
    ],
    verificationNextSteps: [
      'Look for official/current sources for Cannabis Convenience before adding maps, hours, outbound links, or stronger LocalBusiness facts.',
      'Research nearby Tyendinaga, Shannonville, and Bay of Quinte profiles through the import workflow before broadening local guide copy.',
      'Keep this page focused on exact source-backed evidence while the local dataset is one profile.',
    ],
  },
  {
    slug: 'vernon',
    summary: 'Vernon now has one recovered North Okanagan profile through Okanagan Cannabinoid Therapy, complementing the existing Penticton and Salmon Arm Interior BC pages.',
    directoryStatus: 'One Vernon listing is mapped today: Okanagan Cannabinoid Therapy - Vernon. The row is historical/source-backed until current public-source status is independently confirmed.',
    searchIntent: ['okanagan cannabinoid therapy vernon', 'vernon dispensary', 'north okanagan cannabis store', '30th avenue cannabis'],
    relatedListingSlugs: ['okanagan-cannabinoid-therapy-vernon'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The current Vernon footprint is one recovered profile, not a complete North Okanagan directory.',
      'Historical directory evidence should not be converted into current availability, hours, review, delivery, or licensing claims.',
      'Interior BC coverage should remain profile-led until more source-backed rows support broader city guide copy.',
    ],
    verificationNextSteps: [
      'Find fresher official or business-source evidence before adding contact links, maps, hours, or richer schema facts.',
      'Research additional Vernon, Kelowna, and Okanagan candidates through the import workflow.',
      'Use this page for legacy recovery and internal links while the local dataset remains thin.',
    ],
  },

  {
    slug: 'ottawa',
    summary: 'Ottawa now has a small official-source cluster from the AGCO public status table, giving Potshops a stronger eastern Ontario city page than a generic location template.',
    directoryStatus: 'Three Ottawa listings are mapped today from AGCO public status-table evidence. They add address-context depth, but Potshops still avoids hours, menus, stock, ordering, service, review, or availability claims.',
    searchIntent: ['ottawa dispensary', 'ottawa cannabis store', 'preston street cannabis', 'byward market cannabis', 'somerset street cannabis'],
    relatedListingSlugs: ['pakalolo-ottawa', 'buzzed-buds-ottawa', 'electrical-banana-ottawa'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The Ottawa footprint is selective and sourced for address context, not a complete city directory.',
      'AGCO table rows should not be expanded into menu, hours, delivery, stock, or current-service claims unless a stronger visible source supports those exact facts.',
      'Street-level hints such as Preston, George, and Somerset should stay tied to the exact listing evidence shown on profile pages.',
    ],
    verificationNextSteps: [
      'Add more Ottawa profiles through the validated importer only when source URLs and conservative notes pass validation.',
      'Look for official or business-source confirmation before adding phone, maps, hours, or richer LocalBusiness fields.',
      'Monitor GSC for Ottawa city/page rows before expanding this page beyond source-backed utility and internal links.',
    ],
  },
  {
    slug: 'kingston',
    summary: 'Kingston now has an official-source cluster from the AGCO public status table, with multiple downtown and midtown address-context profiles.',
    directoryStatus: 'Three Kingston listings are mapped today from AGCO public status-table evidence. They improve local depth, but Potshops still avoids hours, menus, stock, ordering, service, review, or availability claims.',
    searchIntent: ['kingston dispensary', 'kingston cannabis store', 'princess street cannabis', 'division street cannabis', 'downtown kingston cannabis'],
    relatedListingSlugs: ['710-kingston', 'giggles-cannabis-kingston', 'mary-js-cannabis-kingston'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The Kingston page is a source-backed starting point, not a complete city guide.',
      'AGCO public status-table address context should not be converted into operating, ordering, stock, or availability claims.',
      'Two profiles sit on Princess Street, so page copy can mention the corridor only as a directory clue tied to listed profiles.',
    ],
    verificationNextSteps: [
      'Add additional Kingston-area rows only through the import workflow with official or business-source evidence.',
      'Confirm richer facts such as phone or hours from a source that visibly supports them before adding schema fields.',
      'Use GSC monitoring to decide whether Kingston deserves deeper neighbourhood copy or should remain a compact utility page.',
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
