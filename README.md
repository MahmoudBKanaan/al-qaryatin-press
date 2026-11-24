# Al Qaryatin Press

The public product catalogue and price calculator for Al Qaryatin Press in Hafr Al Batin.

[Visit the website](https://mahmoudbkanaan.github.io/al-qaryatin-press/)

## Development

With Node.js 24, run `npm run dev` and open `http://127.0.0.1:4173/`. The app renders English and Arabic pages at dedicated URLs and uses the History API for in-app navigation. Existing hash links still work.

Catalogue entries are in `src/catalog-data.js`, pricing rules in `src/quote.js`, and mockups in `media/`. Catalogue cards show per-item prices across standard sizes. Product pages show the estimate at the minimum order quantity. Size and unit-price presets are in `src/price-presets.js`. The calculator estimates a selected configuration or prepares a brief for a final quote.

## Deployment

Run `npm test` to build and validate the site. GitHub Actions runs the same checks for pull requests to `main` and deploys the validated `dist/` build to GitHub Pages after each push to `main`.

## Search indexing

The build renders crawlable pages in both languages and publishes [sitemap.xml](https://mahmoudbkanaan.github.io/al-qaryatin-press/sitemap.xml). The sitemap lists canonical content pages. Cart pages carry a noindex directive. Submit the sitemap in Google Search Console using the verified URL-prefix property for the GitHub Pages project.
