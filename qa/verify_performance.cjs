const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file));
const size = (file) => fs.statSync(path.join(root, file)).size;
const gzipSize = (file) => zlib.gzipSync(read(file), { level: 9 }).length;
const css = read("integration.css").toString();

assert.ok(size("assets/media/brand/luxureat-logo.png") <= 8 * 1024, "shared first-screen logo exceeds 8 KB");
assert.ok(size("assets/fonts/KingHwaOldSong-home-subset.woff2") <= 350 * 1024, "Chinese home headline subset exceeds 350 KB");
assert.ok(size("assets/fonts/KingHwaOldSong-subset.woff2") <= 720 * 1024, "Chinese headline subset exceeds 720 KB");
assert.ok(size("assets/media/brand/home-hero-truffle-mobile.m4v") <= 320 * 1024, "mobile hero video exceeds 320 KB");
assert.ok(gzipSize("integration.css") <= 52 * 1024, "shared CSS exceeds the 52 KB compressed budget");
assert.ok(gzipSize("assets/js/core.js") <= 22 * 1024, "critical shared JavaScript exceeds the 22 KB compressed budget");
assert.doesNotMatch(css, /font-display:\s*swap/, "custom fonts still permit an old-font flash");

for (const lang of ["zh", "en"]) {
  const home = read(`${lang}/index.html`).toString();
  assert.match(home, /rel="preload"[^>]+home-hero-truffle-poster\.webp/);
  assert.match(home, /class="lux-hero-video"[^>]+autoplay[^>]+preload="auto"/);
  assert.match(home, /data-lux-deferred-scripts/);
  assert.match(home, /rel="icon"[^>]+luxureat-logo\.png/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+KingHwaOldSong-home-subset\.woff2/ : /rel="preload"[^>]+NyghtSerif-Regular\.woff2/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+LuxurEatZhiSongWeb-subset\.woff2/ : /rel="preload"[^>]+Spectral-Regular\.woff2/);
  assert.doesNotMatch(home, /<script\b(?=[^>]*\bsrc=)(?![^>]*\b(?:defer|async)\b)/i);
}

assert.match(read("zh/contact.html").toString(), /rel="preload"[^>]+KingHwaOldSong-subset\.woff2/);

console.log("Performance budgets passed.");
