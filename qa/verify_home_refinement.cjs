const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const home = read("zh/index.html");

[
  "意大利卓越品质的<br/><span class=\"text-secondary\">至臻之艺</span>",
  "来自意大利。意大利制造，享誉全球",
  "journal.html#reader-zh-harvest",
  "contact.html#global-footprint",
  "news.html#recent-events",
  ">合作详情</a>",
].forEach((value) => assert.ok(home.includes(value), `missing: ${value}`));

assert.ok(read("zh/contact.html").includes('id="global-footprint"'));
assert.ok(read("zh/news.html").includes("brand-news-global.png"));
assert.ok(read("zh/rituals.html").includes(">食材购买</h2>"));
assert.ok(read("assets/js/journal.js").includes('articles[readerHash]'));

console.log("home refinement checks passed");
