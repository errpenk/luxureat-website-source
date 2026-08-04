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
assert.ok(size("assets/fonts/KingHwaOldSong-site.woff2") <= 550 * 1024, "Chinese site headline subset exceeds 550 KB");
assert.ok(size("assets/fonts/LuxurEatZhiSong-site.woff2") <= 320 * 1024, "Chinese site body subset exceeds 320 KB");
assert.ok(size("assets/fonts/NyghtSerif-home-critical.woff2") <= 16 * 1024, "English home headline subset exceeds 16 KB");
assert.ok(size("assets/fonts/Spectral-home-critical.woff2") <= 32 * 1024, "English home body subset exceeds 32 KB");
assert.ok(!fs.existsSync(path.join(root, "assets/fonts/KingHwaOldSong-subset.woff2")), "retired full KingHwa font remains bundled");
assert.ok(!fs.existsSync(path.join(root, "assets/fonts/LuxurEatZhiSongWeb-subset.woff2")), "retired full ZhiSong font remains bundled");
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
assert.match(read("assets/js/core.js").toString(), /rootMargin: "1200px"/);
assert.match(read("assets/js/core.js").toString(), /image\.loading = "eager"/);
assert.doesNotMatch(css, /font-display:\s*swap/, "custom fonts still permit an old-font flash");
assert.doesNotMatch(css, /src:\s*url\(["']?assets\/fonts\/(?!MaterialSymbols)/, "shared CSS still contains an unversioned text-font URL");

for (const lang of ["zh", "en"]) {
  const home = read(`${lang}/index.html`).toString();
  assert.match(home, /rel="preload"[^>]+home-hero-truffle-poster\.webp/);
  assert.match(home, /class="lux-hero-video"[^>]+autoplay[^>]+preload="auto"/);
  assert.match(home, /data-lux-deferred-scripts/);
  assert.match(home, /rel="icon"[^>]+luxureat-logo\.png/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+KingHwaOldSong-site\.woff2/ : /rel="preload"[^>]+NyghtSerif-home-critical\.woff2/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+LuxurEatZhiSong-site\.woff2/ : /rel="preload"[^>]+Spectral-home-critical\.woff2/);
  assert.match(home, /class="lux-home-page /);
  assert.match(home, /<html class="[^"]*lux-home-root/);
  assert.match(home, /data-lux-critical-fonts/);
  assert.doesNotMatch(home, /<script\b(?=[^>]*\bsrc=)(?![^>]*\b(?:defer|async)\b)/i);
}

const allHtml = ["zh", "en"].flatMap((lang) => fs.readdirSync(path.join(root, lang)).filter((name) => name.endsWith(".html")).map((name) => read(`${lang}/${name}`).toString())).join("\n");
assert.doesNotMatch(allHtml, /assets\/fonts\/[^"']+\.(?:woff2|ttf)(?!\?v=)/, "a page still contains an unversioned font URL");
assert.match(read("zh/index.html").toString(), /data-lux-mobile-src="\.\.\/assets\/media\/brand\/home-service-selection-mobile\.webp"/);
for (const file of fs.readdirSync(path.join(root, "assets/media/brand")).filter((name) => name.endsWith("-mobile.webp"))) {
  assert.ok(size(`assets/media/brand/${file}`) <= 120 * 1024, `${file} exceeds the 120 KB mobile image budget`);
}

for (const slug of ["journal", "caviar", "rituals", "news", "blog", "certification", "gifting", "contact", "bag"]) {
  const page = read(`zh/${slug}.html`).toString();
  const headline = "assets/fonts/KingHwaOldSong-site.woff2";
  const body = "assets/fonts/LuxurEatZhiSong-site.woff2";
  assert.ok(size(headline) + size(body) <= 900 * 1024, `${slug} Chinese critical fonts exceed 900 KB`);
  assert.match(page, /rel="preload"[^>]+KingHwaOldSong-site\.woff2/);
  assert.match(page, /rel="preload"[^>]+LuxurEatZhiSong-site\.woff2/);
}

const videoMarkup = ["en", "zh"].flatMap((lang) => fs.readdirSync(path.join(root, lang)).filter((name) => name.endsWith(".html")).map((name) => read(`${lang}/${name}`).toString())).join("\n") + read("assets/js/events.js").toString();
for (const match of videoMarkup.matchAll(/<video\b[\s\S]*?<\/video>/g)) {
  assert.match(match[0], /muted/);
  assert.match(match[0], /playsinline/);
  assert.match(match[0], /webkit-playsinline/);
  assert.match(match[0], /poster=/);
  assert.match(match[0], /<source media="\(max-width: 640px\)"[^>]+-mobile\.m4v/);
  assert.doesNotMatch(match[0], /\bcontrols(?:=|\s|>)/);
}
const videoRuntime = read("assets/js/core.js").toString();
assert.match(videoRuntime, /video\.setAttribute\("autoplay", ""\)/, "viewport videos are not promoted to autoplay before playback");
assert.match(videoRuntime, /data-lux-play-blocked/, "blocked mobile autoplay is not retried after user interaction");
assert.match(css, /::-webkit-media-controls-enclosure/, "Safari's native video control enclosure is not hidden");

console.log("Performance budgets passed.");
