# Potshops.ca

Clean rebuild of Potshops.ca as a Canadian cannabis dispensary directory.

## Scope

- Public directory/content site for `potshops.ca`.
- Rebuild from scratch; old WordPress source is unavailable.
- Use Google Search Console data to guide information architecture, legacy URL mapping, city/province/category priorities, and redirects.
- Designed for Railway autodeploy once connected.

## Stack

- Next.js App Router
- TypeScript
- GSC-guided seed data in `app/data/directory.ts`

## Commands

```bash
npm install
npm run build
```

## Initial priorities

1. Pull/validate GSC query + page data. ✅ Saved under `research/gsc/`.
2. Define province/city/store/category URL structure. ✅ Initial priority city and listing routes implemented.
3. Build MVP homepage, location pages, listing profile template, sitemap, and schema. ✅ Initial app in place.
4. Seed compliant public listing data and add verified addresses/hours/categories.
5. Configure Railway autodeploy and verify production.
