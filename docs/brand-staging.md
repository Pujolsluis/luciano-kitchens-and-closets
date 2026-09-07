# Brand-book staging preview

The brand-book preview is published as a noindex review area within the same GitHub Pages site as production. It has three palette options:

- Black + gold: `/staging/`
- Black + peach: `/staging/black-peach/`
- White + navy: `/staging/white-navy/`

Each option has English and Spanish pages. Spanish follows the palette prefix, for example `/staging/black-peach/es/`. The preview bar links between palettes and labels the real business phone and email so they can be checked during review. For the GitHub Pages project URL, share `https://pujolsluis.github.io/luciano-kitchens-and-closets/staging/`.

To review it locally, run `npm run staging`, then open `http://localhost:4176/` in a browser. The command builds in a disposable workspace, validates the static output, and copies the result to the ignored `outputs/brand-staging` directory before serving it on port 4176. Stop the preview with `Ctrl+C` when finished. Use `npm run staging:build` when you need the validated static output without starting the server.

Local production builds export the eight live routes only. The GitHub Pages workflow sets `PUBLISH_STAGING=true` and deploys the eight live routes plus 24 review routes. Staging pages are `noindex, nofollow`, are excluded from the sitemap, omit Analytics and SurveyMonkey embeds, and keep the selected palette on internal page links. The route verifier checks canonical URLs, language metadata, palette selection and navigation, same-palette links, local assets, contact fallbacks, and the production/staging route boundary.

The design follows the supplied 24-page branding book:

- Pages 2 and 6–8: preserve the approved horizontal logo, its proportions and clear space. Do not recreate its custom lettering or rearrange its elements.
- Page 11: deep blue, peach `#E4C4AC`, white, black and restrained gold details. The book's RGB blue (2, 36, 91, or `#02245B`) conflicts with its printed `#003399` hex. This preview deliberately uses the darker RGB value. Gold is a visual approximation of the metallic treatment, used for borders and decoration.
- Page 12: Louis George Café is served locally in regular and bold. Avenir Next/Avenir are platform fallbacks; no licensed Avenir font binary was supplied or redistributed. Headings use Louis George Café for consistent rendering across devices.
- Page 20: navy panels, fine frames, open spacing and real project photography. All project images remain the company's existing photos.

Font source: https://www.dafont.com/louis-george-cafe.font by Chen Yining. The downloaded author's license is retained beside the original font files in `public/fonts/louis-george-cafe/` and permits personal and business use. No PDF pages or mockup photos are distributed as website content.

All visual overrides are scoped to `body.brand-staging`. Shared content and business details stay centrally maintained. Contact links still reach the business; configured surveys remain real collectors on live pages.
