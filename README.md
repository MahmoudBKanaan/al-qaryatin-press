# Al Qaryatin Press

The public catalogue and price calculator for Al Qaryatin Press in Hafr Al Batin.

[Visit the website](https://mahmoudbkanaan.github.io/al-qaryatin-press/)

## Development

Run `npm run dev` and open `http://127.0.0.1:4173/`. Node.js is the only local dependency. The SPA uses plain HTML, CSS, and JavaScript with hash routes.

GitHub Pages serves the root of `main` directly. Catalogue entries are in `src/catalog-data.js`, pricing rules in `src/quote.js`, and illustrations in `media/`.

The catalogue includes 67 products available to retail customers. The agency filter shows the 25 products eligible for agency orders. Calculator results are estimates or briefs for a final quote.
