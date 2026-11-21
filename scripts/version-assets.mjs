import { createHash } from 'node:crypto';
import { cp, readFile, readdir, realpath, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const project = new URL('../', import.meta.url);

export async function versionAssets(dist) {
  const output = await realpath(dist);
  if (output !== join(await realpath(project), 'dist')) {
    throw new Error('Expected the project’s dist directory');
  }

  const source = new URL('src/', dist);
  const files = (await readdir(source)).filter(name => name.endsWith('.js')).sort();
  const hash = createHash('sha256');
  for (const filename of files) {
    hash.update(filename).update('\0').update(await readFile(new URL(filename, source)));
  }
  hash.update(await readFile(new URL('styles.css', dist)));
  const version = hash.digest('hex').slice(0, 16);
  const assets = new URL('app/', dist);
  const existing = await realpath(assets).catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (existing && existing !== join(output, 'app')) {
    throw new Error('Expected the generated app directory inside dist');
  }

  await rm(assets, { recursive: true, force: true });
  await cp(source, new URL(version + '/', assets), { recursive: true });
  const entry = new URL('index.html', dist);
  const index = await readFile(entry, 'utf8');
  if (!index.includes('src="./src/app.js"') || !index.includes('href="./styles.css"')) {
    throw new Error('The page must reference the application and stylesheet');
  }
  await writeFile(entry, index
    .replace('src="./src/app.js"', 'src="./app/' + version + '/app.js"')
    .replace('href="./styles.css"', 'href="./styles.css?v=' + version + '"'));
}
