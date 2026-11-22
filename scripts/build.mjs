import { versionAssets } from './version-assets.mjs';
import { buildSeo } from './build-seo.mjs';
import { cp, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
await mkdir(dist, { recursive: true });

for (const entry of ['index.html', 'styles.css', 'src', 'fonts', 'media']) {
  await cp(new URL(entry, root), new URL(entry, dist), { recursive: true });
}
await versionAssets(dist);
await buildSeo(dist, { indexable: true });
console.log('Built dist/');
