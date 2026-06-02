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
  { slug: 'kahnawake', city: 'Kahnawake', province: 'QC', title: 'Kahnawake cannabis directory status and source notes', description: 'Kahnawake keeps surfacing in Search Console for cannabis, weed, and dispensary searches, but Potshops currently maps one historical-source Green Leaf profile, so this page separates search demand from confirmed current-store facts.', gscEvidence: 'Fresh and legacy rows include “green leaf kahnawake”, “kahnawake dispensary”, “kahnawake weed”, “cannabis kahnawake”, and “weed dispensary kahnawake”.', legacyImpressions: 1475, priority: 1 },
  { slug: 'halifax', city: 'Halifax', province: 'NS', title: 'Cannabis stores and dispensaries in Halifax', description: 'Halifax has repeat city-level searches for dispensaries, cannabis stores, and delivery-adjacent terms.', gscEvidence: 'Queries included “cannabis dispensary halifax”, “dispensaries halifax”, and “halifax dispensaries”.', legacyImpressions: 543, priority: 2 },
  { slug: 'fredericton', city: 'Fredericton', province: 'NB', title: 'Cannabis stores and dispensaries in Fredericton', description: 'Fredericton appears in both city page and store-level legacy URLs, making it a useful early rebuild target.', gscEvidence: 'Queries included “cannabis store fredericton”, “dispensary fredericton”, and “weed dispensary fredericton”.', legacyImpressions: 326, priority: 3 },
  { slug: 'shannonville', city: 'Shannonville', province: 'ON', title: 'Cannabis stores and dispensaries in Shannonville', description: 'Shannonville is now a source-backed recovery page because the Leagle Dreams legacy listing has address and phone context from a public directory.', gscEvidence: 'GSC listing demand showed Leagle Dreams with 562 impressions and 11 clicks; source-backed enrichment mapped the row to Old Highway 2 in Shannonville.', legacyImpressions: 562, priority: 4 },
  { slug: 'tobique-narrows', city: 'Tobique Narrows', province: 'NB', title: 'Cannabis stores and dispensaries in Tobique Narrows', description: 'Tobique Narrows has a source-backed Tribal ReLeaf profile that can support cautious New Brunswick internal linking.', gscEvidence: 'GSC listing demand showed Tribal ReLeaf with 371 impressions and 11 clicks; source-backed enrichment mapped the row to NB-105 in Tobique Narrows.', legacyImpressions: 371, priority: 5 },
  { slug: 'duncan', city: 'Duncan', province: 'BC', title: 'Duncan cannabis directory source notes', description: 'Duncan now has fresh Search Console impressions for cannabis Duncan and Duncan dispensary searches, but Potshops maps only one historical-source Clone Corner profile, so this page separates local search demand from verified current-store facts.', gscEvidence: 'Fresh 2026-04-03..2026-05-17 GSC rows showed /locations/duncan with 5 impressions plus query-page rows for “cannabis duncan” and “duncan dispensary”. Older rebuild evidence showed Clone Corner with 219 impressions and 10 clicks; source-backed enrichment mapped the row to Sahilton Road in Duncan.', legacyImpressions: 219, priority: 6 },
  { slug: 'victoria', city: 'Victoria', province: 'BC', title: 'Cannabis stores and dispensaries in Victoria', description: 'Victoria demand is tied to legacy Farmacy, Pineapple Express, and Gulf Island Organics listing searches plus downtown dispensary terms.', gscEvidence: 'Queries included “farmacy victoria”, “farm dispensary victoria”, “gulf island organics”, and downtown Victoria dispensary variants.', legacyImpressions: 3310, priority: 7 },
  { slug: 'hamilton', city: 'Hamilton', province: 'ON', title: 'Cannabis stores and dispensaries in Hamilton', description: 'Hamilton now has an importer-backed Mountain Greenery listing that can anchor cautious local utility while broader city coverage is rebuilt.', gscEvidence: 'Source-backed rebuild work mapped Mountain Greenery to Hamilton and Upper Wellington Street; use this as a local recovery clue, not a current operating claim.', legacyImpressions: 0, priority: 8 },
  { slug: 'penticton', city: 'Penticton', province: 'BC', title: 'Cannabis stores and dispensaries in Penticton', description: 'Penticton now has multiple source-backed historical profiles that support a cautious South Okanagan recovery page.', gscEvidence: 'Source-backed rebuild work mapped Green Essence to Martin Street and TPD Boutique to Front Street; use these as profile recovery clues, not current operating claims.', legacyImpressions: 0, priority: 9 },
  { slug: 'calgary', city: 'Calgary', province: 'AB', title: 'Calgary pot shop directory status and source notes', description: 'Calgary now has fresh Search Console hints for “calgary pot” and “pot stores calgary”, but Potshops only maps one historical-source Remedy Ice Cream profile, so this page explains the current evidence limits before stronger city claims.', gscEvidence: 'Recent GSC rows included “calgary pot” and “pot stores calgary” for this page; older rebuild evidence included “calgary pot shops”, “pot shop calgary”, “dispensary calgary”, and a source-backed Remedy Ice Cream listing cluster.', legacyImpressions: 269, priority: 10 },
  { slug: 'nanaimo', city: 'Nanaimo', province: 'BC', title: 'Cannabis stores and pot shops in Nanaimo', description: 'Nanaimo has legacy location-page impressions, long-tail pot shop demand, and now a source-backed Mr. Green’s recovery profile.', gscEvidence: 'Queries included “pot shops nanaimo” and “nanaimo dispensaries still open”; source-backed enrichment mapped Mr. Green’s to Nicol Street.', legacyImpressions: 166, priority: 11 },
  { slug: 'nelson', city: 'Nelson', province: 'BC', title: 'Nelson dispensary directory source notes', description: 'Nelson still receives Search Console rows for “dispensary nelson”, “dispensary nelson bc”, and related Nelson dispensary wording. Potshops currently maps one historical-source profile, The Kootenay’s Medicine Tree, so this page explains the evidence limits rather than claiming complete or current store coverage.', gscEvidence: 'Fresh 2026-04-02..2026-05-15 GSC rows showed /locations/nelson with 18 impressions, including “dispensary nelson”, “dispensary nelson bc”, and “nelson bc dispensary”. The source-backed recovery profile is The Kootenay’s Medicine Tree on Front Street, but current operation is not confirmed.', legacyImpressions: 470, priority: 12 },
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
  { slug: 'london', city: 'London', province: 'ON', title: 'Cannabis stores and dispensaries in London, Ontario', description: 'London adds an official-source Ontario city cluster with multiple AGCO-listed address-context profiles across Wharncliffe, Adelaide, and Dundas corridors.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add London profiles on Wharncliffe Road, Adelaide Street, and Dundas Street East; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 23 },
  { slug: 'windsor', city: 'Windsor', province: 'ON', title: 'Cannabis stores and dispensaries in Windsor, Ontario', description: 'Windsor adds an official-source southwestern Ontario cluster with AGCO-listed address-context profiles on Huron Church, Wyandotte, and Drouillard.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add Windsor profiles on Huron Church Road, Wyandotte Street West, and Drouillard Road; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 24 },
  { slug: 'mississauga', city: 'Mississauga', province: 'ON', title: 'Cannabis stores and dispensaries in Mississauga, Ontario', description: 'Mississauga adds an official-source Peel Region city cluster with AGCO-listed address-context profiles across Dundas, Hurontario, and Port Credit.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add Mississauga profiles on Dundas Street West, Hurontario Street, and Lakeshore Road East; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 25 },
  { slug: 'barrie', city: 'Barrie', province: 'ON', title: 'Barrie cannabis directory source notes | Potshops.ca', description: 'Barrie now has fresh Search Console impressions for Pop’s Cannabis Bayfield and broader Barrie dispensary searches, while Potshops maps three AGCO public-source address-context profiles and no unsupported menu, hours, delivery, stock, ordering, availability, or recommendation claims.', gscEvidence: 'Fresh 2026-04-04..2026-05-16 GSC rows showed /locations/barrie with 16 impressions, including “pops cannabis bayfield”, “cannabis dispensary in barrie”, “kush city barrie”, and “underground barrie”. AGCO public-source rows currently support Pop’s Cannabis Co. Barrie, Spiritleaf Park Place Barrie, and Emerald Cannabis Co Barrie only.', legacyImpressions: 0, priority: 26 },
  { slug: 'oshawa', city: 'Oshawa', province: 'ON', title: 'Cannabis stores and dispensaries in Oshawa, Ontario', description: 'Oshawa adds an official-source Durham Region city cluster with AGCO-listed address-context profiles across Ritson Road, Taunton Road, and King Street East.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table to add Oshawa profiles on Ritson Road South, Taunton Road East, and King Street East; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 27 },
  { slug: 'waterloo', city: 'Waterloo', province: 'ON', title: 'Cannabis stores and dispensaries in Waterloo, Ontario', description: 'Waterloo adds an official-source Kitchener-Waterloo city cluster with AGCO-listed address-context profiles around King Street, Westmount Road, and Albert Street.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table and exact-city filtering to add Waterloo profiles on King Street North, Westmount Road North, and Albert Street; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 28 },
  { slug: 'kitchener', city: 'Kitchener', province: 'ON', title: 'Cannabis stores and dispensaries in Kitchener, Ontario', description: 'Kitchener adds an official-source Waterloo Region city cluster with AGCO-listed address-context profiles across Highland Road, King Street, and Weber Street.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table and exact-city filtering to add Kitchener profiles on Highland Road West, King Street West, and Weber Street East; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 29 },
  { slug: 'guelph', city: 'Guelph', province: 'ON', title: 'Cannabis stores and dispensaries in Guelph, Ontario', description: 'Guelph adds an official-source Wellington County city cluster with AGCO-listed address-context profiles around Gordon, Woodlawn, and Edinburgh.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table and exact-city filtering to add Guelph profiles on Gordon Street, Woodlawn Road West, and Edinburgh Road South; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 30 },
  { slug: 'brampton', city: 'Brampton', province: 'ON', title: 'Cannabis stores and dispensaries in Brampton, Ontario', description: 'Brampton adds an official-source Peel Region city cluster with AGCO-listed address-context profiles across McVean, Worthington, and Inspire corridors.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table and exact-city filtering to add Brampton profiles on McVean Drive, Worthington Avenue, and Inspire Boulevard; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 31 },
  { slug: 'st-catharines', city: 'St. Catharines', province: 'ON', title: 'Cannabis stores and dispensaries in St. Catharines, Ontario', description: 'St. Catharines adds an official-source Niagara Region city cluster with AGCO-listed address-context profiles across Glendale, Scott, and Glenridge corridors.', gscEvidence: 'New-source acquisition on 2026-05-11 used the AGCO public status table, exact-city filtering, and exclusion of a cancelled duplicate row to add St. Catharines profiles; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 32 },
  { slug: 'niagara-falls', city: 'Niagara Falls', province: 'ON', title: 'Cannabis stores and dispensaries in Niagara Falls, Ontario', description: 'Niagara Falls adds an official-source Niagara Region city cluster with AGCO-listed address-context profiles across Drummond, Portage, and McLeod corridors.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact-city filtering to add Niagara Falls profiles on Drummond Road, Portage Road, and McLeod Road; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 33 },
  { slug: 'scarborough', city: 'Scarborough', province: 'ON', title: 'Cannabis stores and dispensaries in Scarborough, Ontario', description: 'Scarborough adds an official-source east Toronto cluster with AGCO-listed address-context profiles on Markham Road and Lapsley Road.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Scarborough profiles; query results can include Markham Road street-name matches, so rows are filtered by the city/town field rather than query text alone.', legacyImpressions: 0, priority: 34 },
  { slug: 'pickering', city: 'Pickering', province: 'ON', title: 'Cannabis stores and dispensaries in Pickering, Ontario', description: 'Pickering adds an official-source Durham Region cluster with AGCO-listed address-context profiles across Pickering Parkway, Brock Road, and Central Street.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Pickering profiles on Pickering Parkway, Brock Road, and Central Street; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 35 },
  { slug: 'ajax', city: 'Ajax', province: 'ON', title: 'Cannabis stores and dispensaries in Ajax, Ontario', description: 'Ajax adds an official-source Durham Region cluster with AGCO-listed address-context profiles across Westney, Kingston Road, and Harwood corridors.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Ajax profiles on Westney Road, Kingston Road, and Harwood Avenue; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 36 },
  { slug: 'burlington', city: 'Burlington', province: 'ON', title: 'Cannabis stores and dispensaries in Burlington, Ontario', description: 'Burlington adds an official-source Halton Region cluster with AGCO-listed address-context profiles across Brant Street, Appleby Line, and Fairview Street.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Burlington profiles on Brant Street, Appleby Line, and Fairview Street; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 37 },
  { slug: 'etobicoke', city: 'Etobicoke', province: 'ON', title: 'Cannabis stores and dispensaries in Etobicoke, Ontario', description: 'Etobicoke adds an official-source west Toronto cluster with AGCO-listed address-context profiles across Mimico Avenue, Lake Shore Boulevard West, and Woodbine Downs.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Etobicoke profiles on Mimico Avenue, Lake Shore Boulevard West, and Woodbine Downs Boulevard; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 38 },
  { slug: 'cambridge', city: 'Cambridge', province: 'ON', title: 'Cannabis stores and dispensaries in Cambridge, Ontario', description: 'Cambridge adds a Waterloo Region official-source cluster with AGCO-listed address-context profiles around Holiday Inn Drive, Christopher Drive, and Pinebush Road.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Cambridge profiles on Holiday Inn Drive, Christopher Drive, and Pinebush Road; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 39 },
  { slug: 'sudbury', city: 'Sudbury', province: 'ON', title: 'Cannabis stores and dispensaries in Sudbury, Ontario', description: 'Sudbury adds a northern Ontario official-source cluster with AGCO-listed address-context profiles on Kingsway, Notre Dame Avenue, and Kathleen Street.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Sudbury profiles on Kingsway, Notre Dame Avenue, and Kathleen Street; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 40 },
  { slug: 'north-bay', city: 'North Bay', province: 'ON', title: 'Cannabis stores and dispensaries in North Bay', description: 'North Bay now has a small official-source cluster from the AGCO status table, giving Potshops enough address-context data for a cautious northern Ontario city page.', gscEvidence: 'AGCO public status rows verified exact-city North Bay entries with Authorized to Open status on 2026-05-12; this page is source-led rather than GSC-led until crawl data accumulates.', legacyImpressions: 0, priority: 32 },
  { slug: 'sault-ste-marie', city: 'Sault Ste. Marie', province: 'ON', title: 'Cannabis stores and dispensaries in Sault Ste. Marie', description: 'Sault Ste. Marie now has official-source address-context rows from the AGCO status table, supporting a careful northern Ontario utility page without menu or availability claims.', gscEvidence: 'AGCO public status rows verified exact-city Sault Ste. Marie entries with Authorized to Open status on 2026-05-12; this page is source-led rather than GSC-led until crawl data accumulates.', legacyImpressions: 0, priority: 42 },
  { slug: 'peterborough', city: 'Peterborough', province: 'ON', title: 'Cannabis stores and dispensaries in Peterborough, Ontario', description: 'Peterborough adds an official-source Kawarthas cluster with AGCO-listed address-context profiles around Water Street, Brock Street, and George Street North.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Peterborough profiles on Water Street, Brock Street, and George Street North; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 43 },
  { slug: 'thunder-bay', city: 'Thunder Bay', province: 'ON', title: 'Cannabis stores and dispensaries in Thunder Bay, Ontario', description: 'Thunder Bay adds an official-source northwestern Ontario cluster with AGCO-listed address-context profiles around Algoma Street, Red River Road, and Arthur Street West.', gscEvidence: 'New-source acquisition on 2026-05-12 used the AGCO public status table and exact city/town filtering to add Thunder Bay profiles on Algoma Street South, Red River Road, and Arthur Street West; use them as cautious local directory depth, not menu or availability claims.', legacyImpressions: 0, priority: 44 },

];

export const locationUtilities: LocationUtility[] = [
  {
    slug: 'kahnawake',
    summary: 'Kahnawake remains a high-priority recovery page because fresh Search Console rows still use direct local language around Green Leaf, Kahnawake dispensary, Kahnawake weed, and cannabis Kahnawake queries.',
    directoryStatus: 'One high-demand legacy profile is mapped to Kahnawake today. It is labelled historical because the available source confirms local reporting context, not a current licence or storefront status.',
    searchIntent: ['green leaf kahnawake', 'kahnawake dispensary', 'kahnawake weed', 'cannabis kahnawake', 'weed dispensary kahnawake'],
    relatedListingSlugs: ['green-leaf'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Fresh Kahnawake query impressions can mean brand research, local directory research, or current-store intent; Potshops should keep those meanings separate instead of implying open storefront coverage.',
      'Do not treat historical local reporting as proof that a store is currently open, licensed, or accepting orders.',
      'Priority enrichment should verify address, operating status, source date, and official/current public evidence before adding maps, hours, contact details, or commercial links.',
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
    summary: 'Calgary has fresh city-level pot-shop impressions, but the rebuilt page should stay a directory-status and source-note page until more current public sources are verified.',
    directoryStatus: 'One Calgary listing is mapped today: Remedy Ice Cream. The source is historical news coverage and does not support contact, current operation, licence, menu, delivery, or availability claims.',
    searchIntent: ['calgary pot', 'pot stores calgary', 'remedy ice cream', 'calgary pot shops', 'pot shop calgary', 'calgary cannabis store'],
    relatedListingSlugs: ['remedy-ice-cream'],
    internalCategorySlugs: ['in-town-delivery'],
    localCaveats: [
      'Recent Calgary query impressions are useful demand signals, not proof that Potshops has complete local coverage.',
      'Remedy Ice Cream source coverage discussed legality concerns, so the row must stay historical and non-commercial.',
      'Calgary city copy should not imply current delivery, sales, stock, licence, hours, or contact status from older media coverage.',
      'Additional Calgary profiles need official/current sourcing before this becomes a broader local guide.',
    ],
    verificationNextSteps: [
      'Use official/current public sources for any future Calgary storefront, address, contact, or status facts.',
      'Research additional Calgary listings through the import workflow rather than adding unsupported city boilerplate.',
      'Keep the page useful for Calgary searchers by exposing the single mapped profile and the evidence limits before any broader city claim.',
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
    summary: 'Duncan is a focused Vancouver Island recovery page anchored by one source-backed Clone Corner profile and a fresh low-row location-page signal. Treat the page as search-intent clarification, not a complete Cowichan Valley store list.',
    directoryStatus: 'One Duncan listing is mapped today: Clone Corner. It remains historical/source-backed until current operation, licence, hours, menus, delivery, ordering, stock, availability, and contact status are independently confirmed.',
    searchIntent: ['cannabis duncan', 'duncan dispensary', 'clone corner duncan', 'duncan cannabis source notes', 'sahilton road cannabis context'],
    relatedListingSlugs: ['clone-corner'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Fresh GSC visibility does not mean Potshops has verified a current Duncan storefront; the mapped Clone Corner profile is historical-source context only.',
      'A single Clone Corner profile is not enough to present as a complete Duncan or Cowichan Valley cannabis directory.',
      'Public directory contact or address context should not become hours, ordering, stock, delivery, licence, menu, or current availability claims.',
      'Vancouver Island city pages should remain source-evidence-led until multiple verified profiles exist.',
    ],
    verificationNextSteps: [
      'Confirm Clone Corner against official/current public sources before adding maps, hours, contact, or outbound links.',
      'Use regulator, business, or public-directory evidence to decide whether additional Duncan/Cowichan Valley profiles belong in the importer.',
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
    summary: 'Nelson now has fresh low-row Search Console evidence for city-level dispensary searches plus one source-backed Kootenay profile, so the page should act as a source-limit guide instead of a broad city-store claim.',
    directoryStatus: 'One Nelson profile is mapped today: The Kootenay’s Medicine Tree. It is historical-source context only; Potshops has not confirmed current operation, hours, menu, stock, delivery, ordering, or licence details.',
    searchIntent: ['dispensary nelson', 'dispensary nelson bc', 'nelson bc dispensary', 'nelson potorium', 'kootenays medicine tree'],
    relatedListingSlugs: ['the-kootenays-medicine-tree'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Fresh Nelson impressions are city-level discovery searches, but the mapped evidence is still one historical-source profile.',
      'Front Street/source-note context must not become current storefront, licence, hours, menu, stock, delivery, ordering, or availability claims.',
      'Broader Kootenay coverage needs more source-backed rows before this page should imply more complete Nelson-area coverage.',
    ],
    verificationNextSteps: [
      'Look for official/current public references for The Kootenay’s Medicine Tree before adding richer business facts.',
      'Use the update path for Nelson source corrections before changing page-level claims or adding contact details.',
      'Add additional Nelson or Kootenay profiles only through the importer with visible source URLs and conservative notes.',
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
    slug: 'london',
    summary: 'London now has an official-source cluster from the AGCO public status table, connecting several address-context profiles across north and east London corridors.',
    directoryStatus: 'Three London listings are mapped today from AGCO public status-table evidence. Potshops keeps the page to source-backed directory context and avoids hours, menus, stock, ordering, service, review, or availability claims.',
    searchIntent: ['london ontario dispensary', 'london cannabis store', 'wharncliffe cannabis', 'adelaide street cannabis', 'dundas street london cannabis'],
    relatedListingSlugs: ['cannabist-shop-wharncliffe-london', 'holy-cannabis-london', 'cost-cannabis-london'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'London has many public AGCO rows, so this page is a curated source-backed starting point rather than a complete local directory.',
      'Address context from AGCO should not be rewritten into current hours, menu, stock, ordering, service, or availability claims.',
      'The selected rows cover Wharncliffe Road, Adelaide Street, and Dundas Street East, giving users corridor clues without implying neighbourhood completeness.',
    ],
    verificationNextSteps: [
      'Add more London rows only through the import workflow with official or business-source evidence.',
      'Confirm richer facts such as phone or hours from visible current sources before adding optional schema fields.',
      'Use GSC monitoring to decide whether London should get neighbourhood-level copy after these pages have crawled.',
    ],
  },
  {
    slug: 'windsor',
    summary: 'Windsor now has an official-source cluster from the AGCO public status table, adding southwestern Ontario coverage with mapped address-context profiles.',
    directoryStatus: 'Three Windsor listings are mapped today from AGCO public status-table evidence. Potshops treats them as official address context only, not as proof of hours, menus, stock, ordering, service, reviews, or availability.',
    searchIntent: ['windsor cannabis store', 'windsor dispensary', 'wyandotte cannabis', 'huron church cannabis', 'drouillard cannabis'],
    relatedListingSlugs: ['value-buds-windsor', 'discounted-cannabis-windsor', 'greentown-cannabis-discount-hut-windsor'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Windsor has a broad official-source table footprint, so this page should remain explicit about being a partial verified directory cluster.',
      'Multiple rows share brand names or corridors across Windsor; each profile needs its own source-backed address before any richer copy is added.',
      'AGCO status-table evidence should not be converted into purchase, delivery, menu, stock, or operating-hours language.',
    ],
    verificationNextSteps: [
      'Add additional Windsor rows only after exact-city filtering and import validation.',
      'Confirm any optional website, phone, or richer business details against visible current sources before adding them to schema.',
      'Watch GSC for Windsor query/page impressions before expanding to a larger southwestern Ontario page set.',
    ],
  },
  {
    slug: 'mississauga',
    summary: 'Mississauga is a high-value Peel Region cluster where the AGCO source provides enough address-context evidence to create a useful city page without making current menu or availability claims.',
    directoryStatus: 'Three Mississauga rows are mapped from the AGCO public status table across Dundas Street West, Hurontario Street, and Port Credit. They are address-context profiles only, not commercial availability claims.',
    searchIntent: ['mississauga cannabis store', 'mississauga dispensary', 'port credit cannabis store'],
    relatedListingSlugs: ['wed-cannabis-mississauga', 'canna-cabana-hurontario-mississauga', 'kindling-cannabis-port-credit-mississauga'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Mississauga searches can mix broad Peel Region intent, chain-store brand queries, and neighbourhood searches such as Port Credit; Potshops should keep exact profile evidence visible.',
      'The AGCO table supports address and public-status context, but Potshops should not infer hours, stock, ordering, delivery, ratings, or live menu data.',
      "WE'D Cannabis has no source-backed website in this import; do not add outbound/contact claims until a stronger public source is verified.",
    ],
    verificationNextSteps: [
      'Recheck official/public sources for each Mississauga row before adding phones, maps, or richer profile details.',
      'Consider adding additional Mississauga rows only after monitoring whether generic city or Port Credit queries appear in GSC.',
      'Keep the page as a source-backed city directory rather than a recommendation page until compliance and freshness checks are stronger.',
    ],
  },
  {
    slug: 'barrie',
    summary: 'Fresh Search Console now points existing Barrie visitors toward Pop’s Cannabis Bayfield plus generic Barrie dispensary research. This page should answer that source-limit intent by showing the three AGCO-backed address-context profiles and naming the unmatched query language Potshops is not mapping yet.',
    directoryStatus: 'Three Barrie rows are mapped from the AGCO public status table: Pop’s Cannabis Co. Barrie, Spiritleaf Park Place Barrie, and Emerald Cannabis Co Barrie. Query phrases such as Kush City Barrie and Underground Barrie are search-context only until a source-backed canonical profile is added.',
    searchIntent: ['pops cannabis bayfield', 'cannabis dispensary in barrie', 'kush city barrie', 'underground barrie', 'barrie cannabis store', 'barrie dispensary', 'cannabis stores near bayfield barrie'],
    relatedListingSlugs: ['pops-cannabis-barrie', 'spiritleaf-park-place-barrie', 'emerald-cannabis-barrie'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Barrie demand can mix generic city searches, Bayfield Street retail intent, and chain-store brand queries; Potshops should keep the page anchored to exact sourced profiles.',
      'Pop’s Cannabis Bayfield is supported by the mapped Pop’s Cannabis Co. Barrie profile, but Kush City Barrie and Underground Barrie are not mapped profiles here unless future public-source evidence supports them.',
      'The AGCO source supports public address/status context, but Potshops should not add hours, stock, ordering, delivery, ratings, recommendations, or live menu language from it.',
      'Future Barrie expansion should keep small enough batches to verify exact city matching and avoid accidentally importing street-name matches from other cities.',
    ],
    verificationNextSteps: [
      'Recheck official/public sources for each Barrie row before adding phones, maps, or richer profile details.',
      'Look for source-backed evidence before creating or mapping Kush City Barrie, Underground Barrie, or any other unmatched brand query to a canonical profile.',
      'Monitor future search rows for Barrie street, brand, and generic dispensary queries before deciding whether to expand into neighbourhood pages.',
      'Keep any richer recommendation, sponsor, or outbound commercial treatment blocked until compliance and current-source standards are clearer.',
    ],
  },
  {
    slug: 'oshawa',
    summary: 'Oshawa is a Durham Region official-source cluster where the AGCO public table provides enough exact-city address evidence to add useful local directory depth without implying menus or availability.',
    directoryStatus: 'Three Oshawa rows are mapped today from AGCO public status-table evidence across Ritson Road South, Taunton Road East, and King Street East. Potshops keeps them as address-context profiles only.',
    searchIntent: ['oshawa cannabis store', 'oshawa dispensary', 'taunton road cannabis', 'ritson road cannabis', 'king street east oshawa cannabis'],
    relatedListingSlugs: ['the-nug-co-oshawa', 'spiritleaf-taunton-oshawa', 'budget-bud-oshawa'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Oshawa has many official-source rows, so this page is a selective verified starting point rather than a complete local directory.',
      'AGCO address/status context should not be rewritten into current hours, menu, stock, ordering, delivery, ratings, or availability claims.',
      'Street-level hints such as Ritson, Taunton, and King Street East should stay tied to the exact listing evidence visible on profile pages.',
    ],
    verificationNextSteps: [
      'Add additional Oshawa rows only through exact-city filtering and import validation.',
      'Confirm optional facts such as phone, maps, or hours against visible current business sources before adding richer schema fields.',
      'Monitor future GSC rows for Oshawa brand, street, and generic dispensary queries before expanding beyond source-backed utility.',
    ],
  },
  {
    slug: 'waterloo',
    summary: 'Waterloo now has a compact official-source cluster from the AGCO public status table, with enough Kitchener-Waterloo address context to avoid a generic location shell.',
    directoryStatus: 'Three Waterloo rows are mapped today from AGCO public status-table evidence across King Street North, Westmount Road North, and Albert Street. Empty phone fields remain omitted from listing schema.',
    searchIntent: ['waterloo cannabis store', 'waterloo dispensary', 'king street waterloo cannabis', 'westmount road cannabis', 'albert street waterloo cannabis'],
    relatedListingSlugs: ['value-buds-waterloo', 'growers-retail-waterloo', 'phoenix-cannabis-waterloo'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The AGCO query for Waterloo can return street-name matches in other cities, so this batch only uses exact city/town rows labelled WATERLOO.',
      'AGCO public-status evidence supports address context only; Potshops should not add live menu, stock, ordering, delivery, rating, or operating-hours language from it.',
      'Phoenix Cannabis has no source-backed website in this import; keep outbound/contact claims blocked until a stronger public source is verified.',
    ],
    verificationNextSteps: [
      'Recheck exact-city public sources for each Waterloo row before adding phone, maps, hours, or richer profile details.',
      'Consider nearby Kitchener only as a separate future city cluster, not as implied Waterloo coverage.',
      'Use GSC monitoring to decide whether Waterloo should get deeper neighbourhood or campus-area copy after these URLs have crawled.',
    ],
  },
  {
    slug: 'kitchener',
    summary: 'Kitchener now has a compact official-source cluster from the AGCO public status table, with enough Waterloo Region address context to make the location page useful without broad unsupported coverage claims.',
    directoryStatus: 'Three Kitchener rows are mapped today from AGCO public status-table evidence across Highland Road West, King Street West, and Weber Street East. Potshops keeps them as address-context profiles only.',
    searchIntent: ['kitchener cannabis store', 'kitchener dispensary', 'highland road cannabis', 'king street kitchener cannabis', 'weber street cannabis'],
    relatedListingSlugs: ['highland-cannabis-kitchener', 'the-cannabist-shop-king-kitchener', 'canna-cabana-weber-kitchener'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Kitchener and Waterloo searches can overlap, so this page only maps exact city/town rows labelled KITCHENER rather than implying regional completeness.',
      'AGCO public-status evidence supports address context only; Potshops should not add live menu, stock, ordering, delivery, rating, or operating-hours language from it.',
      'Street-level hints such as Highland, King, and Weber should stay tied to the exact listing evidence visible on profile pages.',
    ],
    verificationNextSteps: [
      'Recheck exact-city public sources for each Kitchener row before adding phone, maps, hours, or richer profile details.',
      'Keep Waterloo as a separate nearby cluster and avoid merging Kitchener-Waterloo coverage unless source-backed regional pages are intentionally designed.',
      'Use future GSC rows to decide whether Kitchener deserves deeper neighbourhood or corridor copy after these URLs have crawled.',
    ],
  },
  {
    slug: 'guelph',
    summary: 'Guelph now has a source-backed Wellington County cluster from the AGCO public status table, with address-context profiles on Gordon, Woodlawn, and Edinburgh corridors.',
    directoryStatus: 'Three Guelph rows are mapped today from AGCO public status-table evidence. The original AGCO query can return Guelph Line rows from other cities, so exact city/town filtering is part of the evidence trail.',
    searchIntent: ['guelph cannabis store', 'guelph dispensary', 'gordon street cannabis', 'woodlawn road cannabis', 'edinburgh road cannabis'],
    relatedListingSlugs: ['value-buds-guelph', 'canna-cabana-woodlawn-guelph', 'spiritleaf-guelph'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The AGCO query for Guelph can surface street-name matches in Burlington and Georgetown, so this page only uses rows whose city/town is exactly GUELPH.',
      'AGCO public-status evidence should not be rewritten into hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
      'This is a selective official-source starting point rather than a complete Guelph directory.',
    ],
    verificationNextSteps: [
      'Confirm optional facts such as phone, maps, and hours from visible current business sources before adding richer schema fields.',
      'Add additional Guelph rows only through exact-city filtering and import validation.',
      'Monitor future GSC rows for Guelph brand, street, and generic dispensary queries before expanding beyond source-backed utility.',
    ],
  },

  {
    slug: 'brampton',
    summary: 'Brampton now has an official-source Peel Region cluster from the AGCO public status table, giving the page useful address-level context across McVean, Worthington, and Inspire corridors.',
    directoryStatus: 'Three Brampton rows are mapped today from AGCO public status-table evidence. They are address-context profiles only, not a complete Brampton store finder or live availability guide.',
    searchIntent: ['brampton cannabis store', 'brampton dispensary', 'mcvean cannabis', 'worthington cannabis brampton', 'inspire boulevard cannabis'],
    relatedListingSlugs: ['moonwlkr-cannabis-brampton', 'value-buds-worthington-brampton', 'vibes-cannabis-brampton'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Brampton has many AGCO rows, so this batch intentionally selected a small exact-city sample rather than implying complete local coverage.',
      'AGCO public-status evidence supports address context only; Potshops should not add live menu, stock, ordering, delivery, rating, operating-hours, or availability language from it.',
      'Rows without source-backed websites should not receive outbound contact or richer schema fields until another current public source supports them.',
    ],
    verificationNextSteps: [
      'Add more Brampton rows in later batches only if the page can keep clear exact-profile links and avoid becoming a thin scraped table.',
      'Verify optional details such as phone, maps, and hours from visible business sources before adding richer LocalBusiness fields.',
      'Watch future GSC rows for Brampton brand and neighbourhood queries before deciding whether this cluster needs deeper local copy.',
    ],
  },
  {
    slug: 'st-catharines',
    summary: 'St. Catharines adds a Niagara-area official-source cluster anchored by AGCO rows for Glendale, Scott, and Glenridge addresses.',
    directoryStatus: 'Three St. Catharines rows are mapped today from AGCO public status-table evidence. The page deliberately distinguishes authorized public-status rows from one cancelled duplicate row in the source results.',
    searchIntent: ['st catharines cannabis store', 'st catharines dispensary', 'glendale avenue cannabis', 'grantham plaza cannabis', 'glenridge cannabis'],
    relatedListingSlugs: ['one-plant-st-catharines', 'spiritleaf-st-catharines', 'superbud-st-catharines'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The AGCO query includes a cancelled duplicate for Spiritleaf, so this page only maps Authorized to Open rows and keeps the evidence trail explicit.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
      'This is a compact Niagara-area source cluster, not proof of complete St. Catharines market coverage.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding schema fields.',
      'Consider Niagara Falls or nearby Niagara-area rows as separate exact-city clusters rather than blending them into this page.',
      'Use future GSC rows to decide whether St. Catharines deserves additional neighbourhood copy after these URLs have crawled.',
    ],
  },
  {
    slug: 'niagara-falls',
    summary: 'Niagara Falls adds a source-backed Niagara Region cluster from the AGCO public status table, with address-context profiles across Drummond, Portage, and McLeod corridors.',
    directoryStatus: 'Three Niagara Falls rows are mapped today from exact-city AGCO public status-table evidence. The page is a selective address-context cluster, not a live menu, stock, delivery, or availability guide.',
    searchIntent: ['niagara falls cannabis store', 'niagara falls dispensary', 'drummond road cannabis', 'portage road cannabis', 'mcleod road cannabis'],
    relatedListingSlugs: ['honeypot-smoke-shop-niagara-falls', 'value-buds-portage-niagara-falls', 'sparkle-cannabis-niagara-falls'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'The AGCO Niagara Falls query returns many authorized and cancelled rows, so this page intentionally maps a small authorized sample rather than implying complete city coverage.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
      'Niagara-area users may compare Niagara Falls and St. Catharines pages, so each city should keep exact-profile links and avoid blended regional claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Add additional Niagara Falls rows only when the page can preserve clear exact-city filtering notes and useful internal links.',
      'Watch future GSC rows for Niagara Falls brand, tourism-corridor, and neighbourhood queries after these URLs have crawled.',
    ],
  },
  {
    slug: 'scarborough',
    summary: 'Scarborough adds an east Toronto official-source cluster from the AGCO public status table, anchored by Markham Road and Lapsley Road address-context rows.',
    directoryStatus: 'Three Scarborough rows are mapped today from exact city/town AGCO public status-table evidence. The page deliberately treats Markham Road as a street context inside Scarborough, not evidence for the separate City of Markham.',
    searchIntent: ['scarborough cannabis store', 'scarborough dispensary', 'markham road cannabis', 'lapsley road cannabis', 'east toronto dispensary'],
    relatedListingSlugs: ['pufftastic-cannabis-scarborough', 'green-merchant-scarborough', 'budssmoke-scarborough'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'AGCO searches for Markham can surface Scarborough rows because Markham Road appears in addresses; Potshops filters by exact city/town before creating city pages.',
      'Scarborough is a large east Toronto market, so three rows are not enough to claim complete local coverage.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts from visible current business sources before adding phone, hours, maps, or optional schema fields.',
      'Keep Scarborough and Markham/Vaughan strategy separate unless official rows support the exact municipal page.',
      'Use future GSC rows to decide whether Scarborough deserves neighbourhood subcopy around Markham Road, Eglinton, Kingston Road, or Steeles corridors.',
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
  {
    slug: 'pickering',
    summary: 'Pickering adds a Durham Region official-source cluster from the AGCO public status table, anchored by Pickering Parkway, Brock Road, and Central Street address-context rows.',
    directoryStatus: 'Three Pickering rows are mapped today from exact city/town AGCO public status-table evidence. The page is useful as a source-backed local directory starting point, not as a complete city guide.',
    searchIntent: ['pickering cannabis store', 'pickering dispensary', 'pickering parkway cannabis', 'brock road cannabis', 'durham region dispensary'],
    relatedListingSlugs: ['montrose-pickering', 'holland-daze-pickering', 'cannabis-xpress-pickering'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Pickering and Ajax sit close together in Durham Region, so Potshops should keep exact city/town evidence separate rather than blending regional rows.',
      'Three AGCO rows are not enough to claim complete local coverage or rank stores by quality.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Use future GSC rows to decide whether Pickering deserves neighbourhood or corridor copy around Pickering Parkway, Brock Road, or Central Street.',
      'Add additional Durham Region rows only when exact city filtering and visible source notes remain clear.',
    ],
  },
  {
    slug: 'ajax',
    summary: 'Ajax adds a Durham Region official-source cluster from the AGCO public status table, anchored by Westney Road, Kingston Road, and Harwood Avenue address-context rows.',
    directoryStatus: 'Three Ajax rows are mapped today from exact city/town AGCO public status-table evidence. The page deliberately stays factual and avoids implying store rankings, availability, or ordering options.',
    searchIntent: ['ajax cannabis store', 'ajax dispensary', 'westney road cannabis', 'kingston road ajax cannabis', 'harwood avenue cannabis'],
    relatedListingSlugs: ['the-6ix-cannabis-ajax', 'one-plant-ajax', 'cannaverse-ajax'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Ajax/Pickering searches can overlap geographically, so each page should link only to exact-city rows unless a source clearly supports broader Durham context.',
      'AGCO status-table rows provide address context, not live inventory, hours, reviews, delivery options, or ordering availability.',
      'This page should remain a compact source-backed utility until GSC shows which Ajax corridors or brand queries deserve deeper copy.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Watch future GSC rows for Ajax brand, Westney, Kingston Road, and Harwood Avenue query patterns after the URLs have crawled.',
      'Add additional Ajax rows only through the validated import workflow with exact city/town filtering.',
    ],
  },
  {
    slug: 'burlington',
    summary: 'Burlington adds a Halton Region official-source cluster from the AGCO public status table, anchored by Brant Street, Appleby Line, and Fairview Street address-context rows.',
    directoryStatus: 'Three Burlington rows are mapped today from exact city/town AGCO public status-table evidence. The page stays factual and does not imply complete local coverage, store ranking, live inventory, or ordering options.',
    searchIntent: ['burlington cannabis store', 'burlington dispensary', 'brant street cannabis', 'appleby line cannabis', 'fairview street cannabis'],
    relatedListingSlugs: ['treetop-burlington', 'value-buds-appleby-burlington', 'value-buds-fairview-burlington'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Burlington and broader Halton searches can overlap with Oakville and Hamilton-area intent, so this page should link only to exact-city rows unless a source clearly supports a broader regional claim.',
      'Three AGCO rows are not enough to claim complete Burlington coverage or recommend one store over another.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Watch future GSC rows for Burlington brand, Brant Street, Appleby Line, and Fairview Street query patterns after the URLs have crawled.',
      'Add additional Halton rows only through the validated import workflow with exact city/town filtering.',
    ],
  },
  {
    slug: 'etobicoke',
    summary: 'Etobicoke adds a west Toronto official-source cluster from the AGCO public status table, anchored by Mimico Avenue, Lake Shore Boulevard West, and Woodbine Downs address-context rows.',
    directoryStatus: 'Three Etobicoke rows are mapped today from exact city/town AGCO public status-table evidence. The page is a source-backed local directory starting point, not a current menu, stock, delivery, or ranking guide.',
    searchIntent: ['etobicoke cannabis store', 'etobicoke dispensary', 'mimico cannabis', 'lake shore boulevard west cannabis', 'woodbine downs cannabis'],
    relatedListingSlugs: ['lakeview-cannabis-etobicoke', 'herb-n-bud-etobicoke', 'purple-pineapple-etobicoke'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Etobicoke sits inside west Toronto, so Potshops should keep exact Etobicoke rows distinct from Toronto, North York, and Mississauga pages unless the source itself supports a broader geography.',
      'AGCO status-table rows provide address context, not live inventory, hours, reviews, delivery options, or ordering availability.',
      'This page should remain a compact source-backed utility until GSC shows which Etobicoke corridors or brand queries deserve deeper copy.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Use future GSC rows to decide whether Etobicoke deserves corridor copy around Mimico, Lake Shore Boulevard West, Albion, or Woodbine Downs.',
      'Add additional west Toronto rows only when exact city/town filtering and visible source notes remain clear.',
    ],
  },

  {
    slug: 'cambridge',
    summary: 'Cambridge adds a Waterloo Region official-source cluster from the AGCO public status table, anchored by Holiday Inn Drive, Christopher Drive, and Pinebush Road address-context rows.',
    directoryStatus: 'Three Cambridge rows are mapped today from exact city/town AGCO public status-table evidence. The page is a source-backed local directory starting point, not a current menu, stock, delivery, or ranking guide.',
    searchIntent: ['cambridge cannabis store', 'cambridge dispensary', 'holiday inn drive cannabis', 'pinebush road cannabis', 'waterloo region cannabis'],
    relatedListingSlugs: ['value-buds-cambridge', 'thisel-cambridge', 'tokyo-smoke-cambridge-pinebush'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Cambridge and broader Waterloo Region searches can overlap with Kitchener and Waterloo intent, so this page should link only to exact-city rows unless a source clearly supports a regional claim.',
      'Three AGCO rows are not enough to claim complete Cambridge coverage or recommend one store over another.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Watch future GSC rows for Cambridge brand, Holiday Inn Drive, Christopher Drive, and Pinebush Road query patterns after the URLs have crawled.',
      'Add additional Waterloo Region rows only through the validated import workflow with exact city/town filtering.',
    ],
  },
  {
    slug: 'sudbury',
    summary: 'Sudbury adds a northern Ontario official-source cluster from the AGCO public status table, anchored by Kingsway, Notre Dame Avenue, and Kathleen Street address-context rows.',
    directoryStatus: 'Three Sudbury rows are mapped today from exact city/town AGCO public status-table evidence. The page is a source-backed local directory starting point, not a current menu, stock, delivery, or ranking guide.',
    searchIntent: ['sudbury cannabis store', 'sudbury dispensary', 'kingsway cannabis', 'notre dame avenue cannabis', 'northern ontario cannabis'],
    relatedListingSlugs: ['happy-life-sudbury', 'pops-cannabis-sudbury', 'wild-flowerz-sudbury'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Sudbury searches can mix city-wide and northern Ontario intent, so Potshops should keep this page tied to exact Sudbury public-source rows rather than implying regional completeness.',
      'Three AGCO rows are not enough to claim complete Sudbury coverage or recommend one store over another.',
      'AGCO address/status data should not be converted into current hours, stock, ordering, delivery, ratings, reviews, or availability claims.',
    ],
    verificationNextSteps: [
      'Confirm richer facts such as phone, maps, and hours from visible current business sources before adding optional schema fields.',
      'Watch future GSC rows for Sudbury brand, Kingsway, Notre Dame Avenue, and Kathleen Street query patterns after the URLs have crawled.',
      'Add additional northern Ontario rows only through the validated import workflow with exact city/town filtering.',
    ],
  },

  {
    slug: 'north-bay',
    summary: 'North Bay extends the Potshops official-source footprint into northern Ontario with several exact-city AGCO rows rather than a single generic city placeholder.',
    directoryStatus: 'Three North Bay profiles are mapped from AGCO public status rows. Potshops treats them as address-context entries only: useful for local research, not proof of menus, stock, hours, ordering, or ongoing service details.',
    searchIntent: ['north bay cannabis store', 'north bay dispensary', 'cannabis stores north bay'],
    relatedListingSlugs: ['happy-life-north-bay', 'budssmoke-north-bay', 'sessions-north-bay-lakeshore'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'North Bay and surrounding Nipissing-area searches can include stores, reserve/community results, and broader northern Ontario intent; Potshops should keep exact-city source rows separate from neighbouring community rows.',
      'AGCO status-table evidence supports address context and status wording from the public table, but it does not provide current hours, product availability, prices, delivery, reviews, or ordering details.',
      'Do not infer a comprehensive North Bay directory from this first three-row cluster; show the mapped profiles and explain that more verification is needed.',
    ],
    verificationNextSteps: [
      'Recheck the AGCO public status table before adding more North Bay rows or updating status language.',
      'Look for official business pages or municipal/public directory sources before adding phone, website, hours, or map-specific facts.',
      'Monitor GSC for whether northern Ontario queries start landing on the North Bay location page after the new sitemap URLs are crawled.',
    ],
  },
  {
    slug: 'sault-ste-marie',
    summary: 'Sault Ste. Marie gives Potshops a second northern Ontario official-source cluster, with exact-city AGCO rows that can support cautious local navigation and internal links.',
    directoryStatus: 'Three Sault Ste. Marie profiles are mapped from AGCO public status rows. The page intentionally records official address context only and avoids claims about live menus, ordering, delivery, stock, prices, ratings, or hours.',
    searchIntent: ['sault ste marie cannabis store', 'sault ste marie dispensary', 'cannabis stores sault ste marie'],
    relatedListingSlugs: ['sessions-sault-ste-marie-hillside', 'happy-life-sault-ste-marie', 'due-north-sault-ste-marie-churchill'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Sault Ste. Marie rows should be kept separate from other northern Ontario cities; exact city matching matters because broad AGCO queries can return nearby or street-name matches.',
      'AGCO source evidence is strong enough for name/address/status context, but it does not support commercial claims such as open-now, order, delivery, in-stock, or licensed-store promotional copy.',
      'The first cluster is intentionally small, so the page should be framed as a source-backed starting point rather than a complete city directory.',
    ],
    verificationNextSteps: [
      'Refresh the AGCO status-table query before expanding the Sault Ste. Marie cluster.',
      'Add any phone, website, hours, or storefront details only after a current official/business source supports the exact fact.',
      'Check future GSC rows for Sault Ste. Marie query/page impressions before doing another city-specific copy pass.',
    ],
  },

  {
    slug: 'peterborough',
    summary: 'Peterborough gives Potshops a Kawarthas official-source cluster, with exact-city AGCO rows that can support cautious local navigation around Water, Brock, and George corridors.',
    directoryStatus: 'Three Peterborough profiles are mapped from AGCO public status rows. Potshops treats them as address-context entries only and avoids claims about live menus, ordering, delivery, stock, prices, ratings, or hours.',
    searchIntent: ['peterborough cannabis store', 'peterborough dispensary', 'water street cannabis', 'brock street cannabis', 'kawarthas cannabis'],
    relatedListingSlugs: ['kawartha-leafs-peterborough-water', 'kawartha-leafs-peterborough-brock', 'peace-pipe-peterborough-george'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Peterborough and broader Kawarthas searches can overlap with regional intent, so this page should stay anchored to exact Peterborough city rows unless a source clearly supports a wider regional claim.',
      'AGCO status-table evidence supports name, address, city, postal code, and public status context, but it does not support current hours, product availability, prices, delivery, reviews, or ordering details.',
      'The first cluster is intentionally small, so the page should be framed as a source-backed starting point rather than a complete city directory.',
    ],
    verificationNextSteps: [
      'Refresh the AGCO public status table before expanding the Peterborough cluster.',
      'Add phone, website, hours, map, or storefront facts only after a current official/business source supports the exact fact.',
      'Monitor future GSC rows for Peterborough, Kawartha Leafs, Peace Pipe, Water Street, Brock Street, and George Street query patterns after the URLs have crawled.',
    ],
  },
  {
    slug: 'thunder-bay',
    summary: 'Thunder Bay extends the Potshops footprint into northwestern Ontario with exact-city AGCO rows rather than generic northern Ontario copy.',
    directoryStatus: 'Three Thunder Bay profiles are mapped from AGCO public status rows. Potshops records official address context only and does not infer live menus, stock, ordering, delivery, prices, ratings, or hours.',
    searchIntent: ['thunder bay cannabis store', 'thunder bay dispensary', 'red river road cannabis', 'algoma street cannabis', 'northwestern ontario cannabis'],
    relatedListingSlugs: ['high-society-thunder-bay-algoma', 'cannabis-near-me-thunder-bay-red-river', 'toke-house-thunder-bay-mall'],
    internalCategorySlugs: ['dispensary'],
    localCaveats: [
      'Thunder Bay searches can mix city-wide and northwestern Ontario intent, so Potshops should keep exact-city source rows separate from broader regional claims.',
      'AGCO evidence is strong enough for public name/address/status context, not for current commerce claims such as open-now, order, delivery, in-stock, menus, or licensed-store promotional copy.',
      'Three AGCO rows are not enough to claim complete Thunder Bay coverage or recommend one profile over another.',
    ],
    verificationNextSteps: [
      'Refresh the AGCO status-table query before adding more Thunder Bay rows.',
      'Look for visible current business sources before adding optional schema fields such as telephone or website.',
      'Watch future GSC rows for Thunder Bay, Algoma, Red River, Arthur Street, and Toke House query/page impressions after the sitemap is recrawled.',
    ],
  },

];

export const listingSeeds: ListingSeed[] = listingSeedsImport as ListingSeed[];


export const priorityCategories: Category[] = [
  { slug: 'dispensary', legacyPath: '/category/dispensary/', title: 'Canadian cannabis dispensary directory', description: 'Browse source-backed Canadian cannabis dispensary profiles and city pages. Potshops.ca separates public-source listing evidence from unverified current-store claims.', gscEvidence: 'This hub keeps dispensary searches pointed at source-backed profiles, mapped city pages, and clear notes about what Potshops can and cannot verify.', legacyImpressions: 55, priority: 1 },
  { slug: 'in-town-delivery', legacyPath: '/category/in-town-delivery/', title: 'Cannabis delivery listings in Canada', description: 'Browse Canadian cannabis delivery-related profiles only where Potshops has public-source context. The page does not claim delivery is available today, ordering, menus, or licences.', gscEvidence: 'This hub keeps delivery-intent searches tied to source-backed public profiles and city pages while avoiding unsupported current-delivery claims.', legacyImpressions: 113, priority: 2 },
];

export const getCategory = (slug: string) => priorityCategories.find((category) => category.slug === slug);

export const getLocation = (slug: string) => priorityLocations.find((location) => location.slug === slug);
export const getLocationUtility = (slug: string) => locationUtilities.find((utility) => utility.slug === slug);
export const getListing = (slug: string) => listingSeeds.find((listing) => listing.slug === slug);
