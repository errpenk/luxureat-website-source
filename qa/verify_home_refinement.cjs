const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const home = read("zh/index.html");
const styles = read("integration.css");

[
  "意大利卓越品质的<br/><span class=\"text-secondary\">至臻之艺</span>",
  "探索地道风味，品味真正的意大利制造",
  "about-us.html#reader-zh-harvest",
  "contact.html#global-footprint",
  "brand.html#news-center",
  'id="meet-us"',
  ">立即联系我们</a>",
].forEach((value) => assert.ok(home.includes(value), `missing: ${value}`));

assert.ok(read("zh/contact.html").includes('id="global-footprint"'));
assert.ok(read("zh/brand.html").includes("brand-news-global.webp"));
assert.ok(read("zh/recipe.html").includes(">食材购买</h2>"));
assert.ok(read("assets/js/journal.js").includes('articles[readerHash]'));
assert.ok(read("assets/js/events.js").includes('${newsIndexHref}#exhibition-map'));
assert.ok(read("assets/js/events.js").includes("LuxurEat（露意膳）"));
assert.match(styles, /\.lux-latest-event-slide\s*\{[^}]*display:\s*flex;[^}]*align-items:\s*center;/s);
assert.match(styles, /@media \(max-width: 720px\)\s*\{\s*\.lux-home-hero\s*\{[^}]*overflow:\s*hidden;/s);

console.log("home refinement checks passed");
