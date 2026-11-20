const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const theme = path.resolve(process.argv[2] || ".deploy/luxureat-static");
const read = (file) => fs.readFileSync(path.join(theme, file), "utf8");
const routes = new Map([...read("routes.php").matchAll(/'([^']+)' => '([^']+\.php)'/g)].map(([, route, file]) => [route, file]));
const sitemapCount = [...read("sitemap.xml").matchAll(/<loc>/g)].length;
assert.equal(routes.size, sitemapCount, "Every public route must appear in the sitemap");
const incoming = new Map([...routes.keys()].map((route) => [route, 0]));

for (const [route, file] of routes) {
  const html = read(file);
  const related = html.match(/<!-- lux:related:start -->([\s\S]*?)<!-- lux:related:end -->/)?.[1];
  assert(related, `${route} has no contextual links`);
  const relatedRoutes = [...related.matchAll(/luxureat_static_url\('([^']+)'/g)].map(([, target]) => target);
  assert(relatedRoutes.length >= 5, `${route} needs at least five contextual links`);
  assert(relatedRoutes.some((target) => /^(?:en\/)?(?:blog|product|recipe|news)\/.+/.test(target)), `${route} needs a relevant article, product, recipe or news link`);
  for (const target of relatedRoutes) assert(routes.has(target) && target !== route, `${route} links to an invalid or self route ${target}`);
  for (const target of new Set([...html.matchAll(/luxureat_static_url\('([^']+)'/g)].map(([, value]) => value))) {
    assert(routes.has(target), `${route} links to an unknown route ${target}`);
    if (target !== route) incoming.set(target, incoming.get(target) + 1);
  }
}
assert.deepEqual([...incoming].filter(([, count]) => count === 0), [], "Public routes must not be orphaned");
console.log(`${routes.size} public routes have contextual links and no orphan pages.`);
