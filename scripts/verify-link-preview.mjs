import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

export function readPreview(html, canonical) {
  const head = html.split('</head>', 1)[0];
  assert.ok(Buffer.byteLength(head) < 300_000, 'WhatsApp must be able to read the head in its first 300 KB');
  const metadata = new Map();
  for (const [tag] of head.matchAll(/<meta\b[^>]+>/gi)) {
    const key = tag.match(/\s(?:property|name)="([^"]+)"/i)?.[1];
    if (!key?.startsWith('og:') && !key?.startsWith('twitter:')) continue;
    assert.ok(!metadata.has(key), `Duplicate ${key} at ${canonical}`);
    metadata.set(key, tag.match(/\scontent="([^"]*)"/i)?.[1]);
  }
  for (const key of ['og:title', 'og:description', 'og:image:alt']) {
    assert.ok(metadata.get(key)?.trim(), `Missing ${key} at ${canonical}`);
  }
  const image = new URL(metadata.get('og:image'));
  assert.equal(image.origin, new URL(canonical).origin);
  assert.equal(image.protocol, 'https:');
  assert.equal(metadata.get('og:url'), canonical);
  assert.equal(metadata.get('og:image:type'), 'image/jpeg');
  assert.equal(metadata.get('og:image:secure_url'), image.href);
  assert.equal(metadata.get('twitter:card'), 'summary_large_image');
  assert.equal(metadata.get('twitter:image'), image.href);
  assert.equal(metadata.get('twitter:image:alt'), metadata.get('og:image:alt'));
  return {
    image,
    width: Number(metadata.get('og:image:width')),
    height: Number(metadata.get('og:image:height')),
  };
}

export function verifyJpeg(bytes, { image, width, height }) {
  assert.ok(bytes.length > 0 && bytes.length < 600_000, `Invalid preview size at ${image}`);
  assert.equal(bytes.readUInt16BE(0), 0xffd8, `Expected JPEG at ${image}`);
  // Read the dimensions from the JPEG frame header rather than trusting its file extension.
  for (let offset = 2; offset + 8 < bytes.length && bytes[offset] === 0xff;) {
    const marker = bytes[offset + 1];
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      assert.equal(bytes.readUInt16BE(offset + 7), width);
      assert.equal(bytes.readUInt16BE(offset + 5), height);
      assert.ok(width >= 300 && height > 0 && width / height <= 4, `Invalid thumbnail dimensions at ${image}`);
      return;
    }
    const segmentLength = bytes.readUInt16BE(offset + 2);
    if (segmentLength < 2 || marker === 0xda) break;
    offset += 2 + segmentLength;
  }
  assert.fail(`Missing supported JPEG frame header at ${image}`);
}

async function checkPublishedPage(canonical) {
  const options = {
    headers: { 'User-Agent': 'WhatsApp/2.24.10.74 A' },
    redirect: 'error',
  };
  const page = await fetch(canonical, { ...options, signal: AbortSignal.timeout(10_000) });
  assert.equal(page.status, 200, canonical);
  assert.match(page.headers.get('content-type') || '', /^text\/html\b/i);
  const preview = readPreview(await page.text(), canonical);
  const image = await fetch(preview.image, { ...options, signal: AbortSignal.timeout(10_000) });
  assert.equal(image.status, 200, preview.image.href);
  assert.match(image.headers.get('content-type') || '', /^image\/jpeg\b/i);
  verifyJpeg(Buffer.from(await image.arrayBuffer()), preview);
  console.log(`Verified ${canonical} → ${preview.image.pathname} (${preview.width}×${preview.height})`);
}

if (import.meta.main) {
  const urls = ['https://qaryatain.com/', 'https://qaryatain.com/ar/product/business-cards/'];
  for (let attempt = 1; ; attempt++) {
    try {
      await Promise.all(urls.map(checkPublishedPage));
      break;
    } catch (error) {
      if (attempt === 3) throw error;
      console.warn(`Preview check ${attempt} failed: ${error.message}`);
      await delay(3000);
    }
  }
}
