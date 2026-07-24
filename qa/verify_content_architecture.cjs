const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const load = (file, key) => {
  const context = {
    window: {},
    URL,
    location: { href: "https://example.test/" },
    document: { currentScript: { src: `https://example.test/${file}` } },
  };
  vm.runInNewContext(read(file), context, { filename: file });
  return context.window[key];
};
const localMedia = (value) => String(value || "")
  .replace(/^https:\/\/example\.test\//, "")
  .replace(/^\.\.\//, "");

for (const file of [
  "assets/data/products.js",
  "assets/data/events.js",
  "assets/data/journal.js",
  "assets/data/brand.js",
  "assets/js/core.js",
  "assets/js/products.js",
  "assets/js/events.js",
  "assets/js/journal.js",
  "assets/js/brand.js",
]) assert(fs.existsSync(path.join(root, file)), `missing ${file}`);

const products = load("assets/data/products.js", "LUXUREAT_PRODUCT_DATA");
const events = load("assets/data/events.js", "LUXUREAT_EVENT_DATA");
const journal = load("assets/data/journal.js", "LUXUREAT_ARTICLE_DATA");

const media = [
  ...Object.values(products.images || {}),
  ...Object.values(products.galleries || {}).flat(),
  ...(events.events || []).flatMap((event) => [event.image, event.poster]),
  ...Object.values(journal.images || {}),
];
for (const value of new Set(media)) {
  const file = localMedia(value);
  assert(file.startsWith("assets/media/"), `legacy media path: ${value}`);
  assert(fs.existsSync(path.join(root, file)), `missing media: ${file}`);
}

const sourceFiles = [
  ...fs.readdirSync(path.join(root, "zh")).filter((name) => name.endsWith(".html")).map((name) => `zh/${name}`),
  ...fs.readdirSync(path.join(root, "en")).filter((name) => name.endsWith(".html")).map((name) => `en/${name}`),
];
const html = sourceFiles.map(read).join("\n");
assert(!html.includes("assets/images/"), "HTML still references assets/images");
assert(!html.includes("assets/article-images/"), "HTML still references assets/article-images");
assert(!html.includes("latest-event.js"), "HTML still loads the obsolete latest-event.js");
assert(!fs.existsSync(path.join(root, "main.js")), "legacy main.js still exists");
assert(!fs.existsSync(path.join(root, "latest-event.js")), "legacy latest-event.js still exists");

const event = events.events.find((item) => item.id === "marca-china-2026");
assert(event?.image?.endsWith("/marca-china-2026.png"), "latest event does not use supplied PNG");
assert(event?.poster?.endsWith("/marca-china-2026-poster.webp"), "latest event homepage poster is missing");

console.log("content architecture verification passed");
