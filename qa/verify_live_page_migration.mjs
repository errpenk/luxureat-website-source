import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pages } from '../site.config.mjs';

const [mode, baselinePath] = process.argv.slice(2);
assert(['capture', 'verify', 'verify-original'].includes(mode) && baselinePath, 'Usage: node qa/verify_live_page_migration.mjs capture|verify|verify-original /absolute/baseline.json');
const results = [];
for (let offset = 0; offset < pages.length; offset += 4) {
  const batch = await Promise.all(pages.slice(offset, offset + 4).map(async ({ lang, slug, route }) => {
    const pathname = `${lang === 'en' ? '/en' : ''}/${slug === 'index' ? '' : `${slug}/`}`;
    const response = await fetch(`https://luxureat.cn${pathname}`, { signal: AbortSignal.timeout(30000), headers: { 'Cache-Control': 'no-cache' } });
    assert.equal(response.status, 200, `${route}: HTTP status`);
    const html = await response.text();
    const match = html.match(/<!-- lux:header:end -->([\s\S]*?)<!-- lux:footer:start -->/);
    assert(match, `${route}: content boundaries`);
    const themeAssets = [...html.matchAll(/(?:src|href)=["']([^"']+\/(?:themes\/luxureat-wordpress-theme\/)[^"']+\.(?:js|css)(?:\?[^"']*)?)["']/g)]
      .map((item) => new URL(item[1].replaceAll('&amp;', '&')).pathname);
    return { route, pathname, content: match[1], themeAssets, source: response.headers.get('x-luxureat-content-source') };
  }));
  results.push(...batch);
}
assert.equal(results.length, 26);
if (mode === 'capture') {
  assert(!fs.existsSync(baselinePath), 'Do not overwrite an existing rollback baseline.');
  fs.writeFileSync(baselinePath, JSON.stringify(results, null, 2));
  console.log(`Captured all ${results.length} original page bodies.`);
} else {
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  for (const page of results) {
    const original = baseline.find((item) => item.route === page.route);
    assert(original, `${page.route}: baseline exists`);
    if (mode === 'verify') assert.equal(page.source, 'wordpress', `${page.route}: content must come from WordPress`);
    else assert.notEqual(page.source, 'wordpress', `${page.route}: rollback must use the original template`);
    if (page.content !== original.content) {
      let index = 0;
      while (index < page.content.length && page.content[index] === original.content[index]) index++;
      throw new Error(`${page.route}: content changed at ${index}; before=${JSON.stringify(original.content.slice(Math.max(0, index - 50), index + 100))}; after=${JSON.stringify(page.content.slice(Math.max(0, index - 50), index + 100))}`);
    }
    assert.deepEqual(page.themeAssets, original.themeAssets, `${page.route}: theme stylesheet/script paths`);
  }
  console.log(`All ${results.length} pages serve byte-identical content from ${mode === 'verify' ? 'WordPress' : 'the original templates'} with the same theme assets.`);
}
