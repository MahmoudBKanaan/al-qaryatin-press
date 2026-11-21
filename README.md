# Al Qaryatin Press

The public product catalogue and price calculator for Al Qaryatin Press in Hafr Al Batin.

[Visit the website](https://mahmoudbkanaan.github.io/al-qaryatin-press/)

## Development

With Node.js 24, run `npm run dev` and open `http://127.0.0.1:4173/`. The SPA uses plain HTML, CSS, and JavaScript with hash routes.

Catalogue entries are in `src/catalog-data.js`, pricing rules in `src/quote.js`, and mockups in `media/`. The catalogue shows estimated totals for typical small-to-large orders. Example sizes, quantities and prices are in `src/price-presets.js`. The calculator estimates a selected configuration or prepares a brief for a final quote.

## Deployment

Run `npm test` to build and validate the site. GitHub Actions runs the same checks for pull requests to `main` and deploys the validated `dist/` build to GitHub Pages after each push to `main`.
