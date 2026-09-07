# Luciano Custom Kitchens & Closets

A bilingual, mobile-friendly static website for South Florida homeowners. Built from the Sites/Vinext starter and prepared for **GitHub Pages**, with no WordPress, database, Worker, or Sites hosting dependency at runtime.

## Local development

Use Node.js 24 LTS and npm.

```sh
npm ci
npm run dev
```

The preview URL is printed by the development server. Phone and email links work immediately. Quote forms remain hidden until SurveyMonkey collectors are configured.

## Build and validate

```sh
npm run typecheck
npm run lint
npm run build
npm test
```

Deploy **only `dist/client`**. The intermediate `dist/server` directory is used for prerendering and must never be uploaded to Pages. `npm start` previews the generated static output.

`npm run test:deployments` builds and verifies both the custom-domain root and the GitHub Pages repository subpath. It leaves the GitHub Pages version in `dist/client`.

The pinned starter exporter redirects trailing-slash routes while prerendering. We export slashless files and normalize them to directory `index.html` files during the build. Public URL helpers and Vite's asset base handle the repository prefix while the prerender router stays rooted at `/`. All public navigation uses ordinary anchors and works without server routing. The plain static preview automatically detects the built prefix from the home page's canonical URL.

## Content

- `lib/content.ts`: complete English and Spanish copy.
- `lib/site.ts`: shared business facts, contact information, and URL helpers.
- `lib/routes.ts`: localized landing pages, galleries, and privacy pages.
- `public/images/manifest.json`: 45 migrated source assets with original URLs and local responsive variants.
- `config/surveys.json`: public collector URLs and local embed-document paths. No API credentials.

English lives at `/`; Spanish at `/es/`. Existing kitchen and closet gallery paths remain at `/2022/01/kitchens/` and `/2022/01/closets/`, with Spanish equivalents under `/es/`. Legacy home section anchors and the old `/sample-page/` link are retained.

## Shared staging review

The Pages workflow also publishes a review-only, noindex staging area at `/staging/`, with a dropdown that compares black/gold, black/peach, and white/navy directions. It is served from the same Pages deployment as the production homepage, while remaining absent from the sitemap, Analytics, and SurveyMonkey embeds. See [brand staging notes](docs/brand-staging.md).

Images are real project assets reused from the business website with the owner's approval. Testimonials are attributed excerpts; Spanish excerpts are labeled as translations. Branding, photography, and customer quotations are not offered under an open-source license.

## Hosting configuration

| Setting | GitHub Pages preview | Later custom domain |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://pujolsluis.github.io` | `https://www.lucianokitchensandclosets.com` |
| `NEXT_PUBLIC_BASE_PATH` | `/luciano-kitchens-and-closets` | Empty |
| Search indexing | Disabled | Enabled |
| Analytics | Disabled | Existing production property |

Actions uses repository variables `SITE_ORIGIN`, `CUSTOM_DOMAIN`, and `PAGES_ENABLED`. Deployment is gated by `PAGES_ENABLED=true`; publishing the repository does not change the existing business domain.

See [launch instructions](docs/launch.md), [SurveyMonkey setup and bilingual questions](docs/surveymonkey.md), and [acceptance checks](docs/acceptance.md).

## Analytics and privacy

Production analytics uses the existing `G-SZBVF0E902` property only on the two business hostnames and respects Do Not Track. Event names are `phone_click`, `email_click`, `quote_engagement`, and `quote_open`. No submitted fields, query strings, or URL fragments are sent in event payloads. SurveyMonkey responses determine completed leads; a quote button click is not counted as a completed inquiry.

## Maintenance notes

The Shadcn catalog and original starter lockfile dependencies are retained. Lint excludes unmodified vendored components and the starter mobile hook; site code remains checked. The server-image-optimizer lint recommendation is disabled because this site uses precompressed local WebP variants and no image server.

GitHub authentication, SurveyMonkey account setup, final domain cutover, and a real test inquiry are separate operational steps documented above. Customer responses and credentials must never be committed.
