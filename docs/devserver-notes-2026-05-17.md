# Devserver notes — 2026-05-17

This repository had a working copy on `devserver` under `/home/tom/projects/potshops` during the May 2026 devserver cleanup.

## Cleanup status

Removed from devserver cleanup: not running in Docker, PM2, nginx, or Cloudflare tunnel on devserver at cleanup time.

## Operational notes

- No secrets or environment variable values are recorded here.
- At cleanup time, the remaining devserver workloads were EFS dev, Baserow, n8n, and n8n MCP.
- The local devserver working copy was scheduled for deletion after this note was pushed to GitHub.
- If this project needs to run again, redeploy from GitHub rather than relying on the old devserver path.

## Last observed Git state

- Branch: `main`
- Last local commit before this note: `86cfab8 2026-05-17 07:04:43 +0000 Clarify Green Leaf Kahnawake query context`
