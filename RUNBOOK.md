# Potshops Runbook

Public site: https://potshops.ca/  
Repo: `/home/tom/projects/potshops`  
Branch: `main`  
Deploy: push to `origin/main` and verify production after Railway/edge deploy.

## Scope and safety

- Work only inside `/home/tom/projects/potshops` unless explicitly scoped.
- Cannabis compliance posture is conservative: do not add purchase/order/outbound dispensary CTAs, availability claims, reviews, ratings, or current licence claims unless source data supports them and the task has approval.
- Prefer source-backed listing notes, caveats, internal directory links, and verification next steps.
- City/location pages must include unique local utility, not just swapped city names.

## Prerequisite checks

```bash
cd /home/tom/projects/potshops
git status --short --branch
git log -1 --oneline
node --version
npm --version
```

Expected current branch: `main...origin/main`.

## Build and tests

```bash
cd /home/tom/projects/potshops
npm run build
```

Known caveats as of 2026-05-06:

- `npm run build` passes after the city utility work.
- `npm run lint` maps to `next lint`, which may be incompatible with newer Next.js versions; use build plus targeted smoke checks unless lint is explicitly fixed in scope.

## Local smoke pattern

```bash
cd /home/tom/projects/potshops
npm run start -- -p 3432
```

Smoke examples from another terminal:

```bash
curl -sS -I http://127.0.0.1:3432/
curl -sS http://127.0.0.1:3432/sitemap.xml | grep -c "<loc>"
curl -sS http://127.0.0.1:3432/locations/kahnawake | grep -F "Kahnawake"
curl -sS http://127.0.0.1:3432/locations/vancouver | grep -F "local search clues"
curl -sS http://127.0.0.1:3432/locations/fredericton | grep -F "verification"
```

## Deploy and production verification

```bash
cd /home/tom/projects/potshops
git status --short
git add <changed-files>
git commit -m "Short imperative summary"
git push origin main
```

Then verify:

```bash
curl -sS -I https://potshops.ca/
curl -sS -I https://www.potshops.ca/
curl -sS https://potshops.ca/sitemap.xml | grep -c "<loc>"
curl -sS "https://potshops.ca/locations/kahnawake?verification=$(git rev-parse --short HEAD)" | grep -F "Kahnawake"
```

## Cache/deploy pitfalls

- `www.potshops.ca` should redirect/finalize to apex `https://potshops.ca/`.
- Cloudflare has previously served stale canonical listing and city URLs while cache-busted query URLs showed new deployed content.
- Always verify both canonical and `?verification=<commit>` URLs for changed pages.
- If only canonical is stale, log a bounded cache purge follow-up; do not treat it as a failed build/deploy.

## Data workflow reminders

- GSC data comes through Maton from local Hermes env; do not copy `.env` or secrets to devserver.
- Before scaling listing imports, complete the POT-4 schema/validation workflow.
- Keep data source notes and compliance caveats visible when facts are incomplete.
