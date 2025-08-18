# Netlify Deploys

This site builds on Netlify from the Git repo. No local npm/node is required.

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 20 (set in netlify.toml / .node-version)

CI build steps:
1. Generate responsive images (Sharp) via `scripts/create-responsive-images.js`
2. Run pre-build checks `scripts/pre-build-check.js`
3. Build with Astro

Tips:
- Push to `main` to trigger a deploy preview or production, depending on Netlify settings.
- Use budget.json as guidance to keep assets lean.
- Lighthouse in the Netlify UI can be enabled for automatic audits.
