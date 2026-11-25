# Al Qaryatin Press

The public product catalogue and price calculator for Al Qaryatin Press in Hafr Al Batin.

[Visit Qaryatain.com](https://qaryatain.com/)

## Development

With Node.js 24, run `npm run dev` and open `http://127.0.0.1:4173/`. The app renders English and Arabic pages at dedicated URLs and uses the History API for in-app navigation. Existing hash links still work.

Catalogue entries are in `src/catalog-data.js`, pricing rules in `src/quote.js`, and mockups in `media/`. Catalogue cards show standard per-item prices. Product pages show the estimate at the standard minimum and any small-order pricing rule. The calculator and cart apply the catalogue's small-order multiplier within the priced range. Size and unit-price presets are in `src/price-presets.js`. The calculator estimates a selected configuration or prepares a brief for a final quote.

## Deployment

Run `npm test` to build and validate the site. Pushes to `main` deploy to Cloudflare Pages at Qaryatain.com and to the GitHub Pages mirror. Other branches get Cloudflare preview deployments. The production workflow verifies the live commit and fetches share cards from the public domain.

## Search indexing

The build renders both languages into HTML with canonical URLs on Qaryatain.com, alternate-language links, structured data, and social metadata. The public robots file points crawlers to the bilingual sitemap. Cart and error pages carry a noindex directive. [Production sitemap](https://qaryatain.com/sitemap.xml)
