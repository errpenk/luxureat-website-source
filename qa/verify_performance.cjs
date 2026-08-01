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
assert.ok(size("assets/fonts/KingHwaOldSong-home-critical.woff2") <= 200 * 1024, "Chinese home headline subset exceeds 200 KB");
assert.ok(size("assets/fonts/LuxurEatZhiSong-home-subset.woff2") <= 250 * 1024, "Chinese home body subset exceeds 250 KB");
assert.ok(size("assets/fonts/NyghtSerif-home-critical.woff2") <= 16 * 1024, "English home headline subset exceeds 16 KB");
assert.ok(size("assets/fonts/Spectral-home-critical.woff2") <= 32 * 1024, "English home body subset exceeds 32 KB");
assert.ok(size("assets/fonts/KingHwaOldSong-subset.woff2") <= 720 * 1024, "Chinese headline subset exceeds 720 KB");
assert.ok(size("assets/media/brand/home-hero-truffle-mobile.m4v") <= 320 * 1024, "mobile hero video exceeds 320 KB");
assert.ok(size("assets/media/brand/about-hero-chi-siamo-mobile.m4v") <= 650 * 1024, "mobile about hero video exceeds 650 KB");
for (const file of [
  "about-china-operations-mobile.m4v", "about-consumer-needs-mobile.m4v",
  "cert-quality-system-mobile.m4v", "cert-capability-background-mobile.m4v",
  "contact-global-footprint-mobile.m4v", "home-maison-overview-mobile.m4v",
]) assert.ok(size(`assets/media/brand/${file}`) <= 520 * 1024, `${file} exceeds 520 KB`);
assert.ok(size("assets/media/events/exhibition-atlas-globe-mobile.m4v") <= 180 * 1024, "mobile event atlas video exceeds 180 KB");
assert.ok(gzipSize("integration.css") <= 52 * 1024, "shared CSS exceeds the 52 KB compressed budget");
assert.ok(gzipSize("assets/js/core.js") <= 22 * 1024, "critical shared JavaScript exceeds the 22 KB compressed budget");
assert.doesNotMatch(css, /font-display:\s*swap/, "custom fonts still permit an old-font flash");

for (const lang of ["zh", "en"]) {
  const home = read(`${lang}/index.html`).toString();
  assert.match(home, /rel="preload"[^>]+home-hero-truffle-poster\.webp/);
  assert.match(home, /class="lux-hero-video"[^>]+autoplay[^>]+preload="auto"/);
  assert.match(home, /data-lux-deferred-scripts/);
  assert.match(home, /rel="icon"[^>]+luxureat-logo\.png/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+KingHwaOldSong-home-critical\.woff2/ : /rel="preload"[^>]+NyghtSerif-home-critical\.woff2/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+LuxurEatZhiSong-home-subset\.woff2/ : /rel="preload"[^>]+Spectral-home-critical\.woff2/);
  assert.match(home, /class="lux-home-page /);
  assert.match(home, /<html class="[^"]*lux-home-root/);
  assert.match(home, /data-lux-critical-fonts/);
  assert.doesNotMatch(home, /<script\b(?=[^>]*\bsrc=)(?![^>]*\b(?:defer|async)\b)/i);
}

for (const slug of ["journal", "caviar", "rituals", "news", "blog", "certification", "gifting", "contact", "bag"]) {
  const page = read(`zh/${slug}.html`).toString();
  const headline = `assets/fonts/KingHwaOldSong-${slug}-critical.woff2`;
  const body = `assets/fonts/LuxurEatZhiSong-${slug}-critical.woff2`;
  assert.ok(size(headline) + size(body) <= 450 * 1024, `${slug} Chinese critical fonts exceed 450 KB`);
  assert.match(page, new RegExp(`rel="preload"[^>]+KingHwaOldSong-${slug}-critical\\.woff2`));
  assert.match(page, new RegExp(`rel="preload"[^>]+LuxurEatZhiSong-${slug}-critical\\.woff2`));
}

const videoMarkup = ["en", "zh"].flatMap((lang) => fs.readdirSync(path.join(root, lang)).filter((name) => name.endsWith(".html")).map((name) => read(`${lang}/${name}`).toString())).join("\n") + read("assets/js/events.js").toString();
for (const match of videoMarkup.matchAll(/<video\b[\s\S]*?<\/video>/g)) {
  assert.match(match[0], /muted/);
  assert.match(match[0], /playsinline/);
  assert.match(match[0], /webkit-playsinline/);
  assert.match(match[0], /poster=/);
  assert.match(match[0], /<source media="\(max-width: 640px\)"[^>]+-mobile\.m4v/);
}

console.log("Performance budgets passed.");
