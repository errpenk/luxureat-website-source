const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file));
const size = (file) => fs.statSync(path.join(root, file)).size;
const gzipSize = (file) => zlib.gzipSync(read(file), { level: 9 }).length;
const css = read("integration.css").toString();
const core = read("assets/js/core.js").toString();
const htaccess = read(".htaccess").toString();

assert.ok(size("assets/media/brand/luxureat-logo.png") <= 8 * 1024, "shared first-screen logo exceeds 8 KB");
assert.match(htaccess, /css\|js\|mjs\|ttf\|woff2/, "static TTF fonts do not receive the immutable cache lifetime");
assert.ok(size("assets/media/brand/home-hero-truffle-poster-lite-v2.webp") <= 9 * 1024, "homepage delivery poster exceeds 9 KB");
assert.ok(size("assets/media/brand/luxureat-logo-144.webp") <= 5 * 1024, "homepage delivery logo exceeds 5 KB");
assert.ok(size("assets/media/brand/luxureat-logo-64.webp") <= 2 * 1024 && size("assets/media/brand/luxureat-logo-96.webp") <= 3 * 1024, "navigation logos exceed their delivery budgets");
for (const service of ["selection", "partnership", "foodservice"]) {
  assert.ok(size(`assets/media/brand/home-service-${service}-420.webp`) <= 24 * 1024, `${service} service image exceeds 24 KB`);
}
for (const event of ["fhc-shanghai-2026", "cifie-changsha-2026-poster", "marca-china-2026-poster", "sial-guangzhou-2026"]) {
  assert.ok(size(`assets/media/events/${event}-520.webp`) <= 38 * 1024, `${event} delivery image exceeds 38 KB`);
  assert.ok(size(`assets/media/events/${event}-160.webp`) <= 7 * 1024, `${event} thumbnail exceeds 7 KB`);
}
assert.ok(size("assets/fonts/KingHwaOldSong-site.woff2") <= 1400 * 1024, "complete KingHwa site font exceeds 1.4 MB");
assert.ok(size("assets/fonts/LuxurEatZhiSong-site.woff2") <= 360 * 1024, "complete ZhiSong site font exceeds 360 KB");
assert.ok(size("assets/fonts/NyghtSerif-home-critical.woff2") <= 16 * 1024, "English home headline subset exceeds 16 KB");
assert.ok(size("assets/fonts/Spectral-home-critical.woff2") <= 32 * 1024, "English home body subset exceeds 32 KB");
assert.ok(size("assets/fonts/LuxurEatZhiSong-hero-critical.woff2") <= 64 * 1024, "Chinese home hero font exceeds 64 KB");
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
assert.ok(gzipSize("integration.css") <= 60 * 1024, "shared CSS exceeds the 60 KB compressed budget");
assert.ok(gzipSize("assets/js/core.js") <= 15 * 1024, "critical shared JavaScript still includes optional interactions");
assert.ok(gzipSize("assets/js/engagement.js") <= 17 * 1024, "optional account, footer and legal JavaScript exceeds 17 KB compressed");
assert.ok(size("assets/data/academy-index.js") <= 70 * 1024, "academy listing index exceeds 70 KB");
assert.match(read("assets/js/core.js").toString(), /luxIsMobile \? "240px 0px" : "1200px"/);
assert.doesNotMatch(read("assets/js/core.js").toString(), /image\.loading = "eager"/);
assert.match(read("assets/js/core.js").toString(), /if \(!luxIsMobile\) setTimeout\(loadDeferredScripts, 800\)/, "mobile home data still auto-loads without interaction");
assert.match(read("assets/js/core.js").toString(), /if \(luxIsMobile \|\| luxSaveData\) return/, "mobile hero video still competes with first-screen content");
assert.match(read("assets/js/core.js").toString(), /data-lux-analytics-src/, "analytics cannot load after the mobile critical path");
assert.match(core, /luxureat-logo-64\.webp/, "cookie banner does not use the delivery-sized logo");
assert.match(read("assets/js/core.js").toString(), /luxIsMobile \? 15000 : 1000/, "mobile analytics still competes with first-screen content");
assert.equal(size("assets/fonts/MaterialSymbolsOutlined-subset.ttf") <= 12 * 1024, true, "material icon subset exceeds 12 KB");
assert.doesNotMatch(css, /src:\s*url\(["']?assets\/fonts\/(?!MaterialSymbols)/, "shared CSS still contains an unversioned text-font URL");
assert.match(core, /navigation\?\.type === "reload"[\s\S]*?sessionStorage\.removeItem\(key\)/, "explicit refresh does not reset the current scroll position");
assert.doesNotMatch(core, /sessionStorage\.setItem\(`luxureatScroll:\$\{target\.pathname\}`/, "navigation still resets previously saved page positions");
assert.match(core, /elementFromPoint\(innerWidth \/ 2, innerHeight \/ 3\)[\s\S]*?anchor\?\.id/, "scroll restoration does not remember the visible content anchor");
assert.match(core, /anchor\.getBoundingClientRect\(\)\.top - position\.offset[\s\S]*?setTimeout\(retry, 100\)/, "scroll restoration does not follow asynchronous layout changes");
assert.match(core, /"wheel", "touchstart", "pointerdown", "keydown"/, "user input cannot cancel delayed scroll restoration");

for (const lang of ["zh", "en"]) {
  const home = read(`${lang}/index.html`).toString();
  assert.match(home, /rel="preload"[^>]+home-hero-truffle-poster-lite-v2\.webp/);
  assert.match(home, /lux-home-hero-mark[^>]+luxureat-logo-144\.webp/);
  assert.match(home, /data-lux-autoplay[^>]+class="lux-hero-video"[^>]+preload="none"/);
  assert.match(home, /data-lux-deferred-scripts/);
  assert.match(home, /rel="icon"[^>]+luxureat-logo\.png/);
  if (lang === "en") assert.match(home, /rel="preload"[^>]+NyghtSerif-home-critical\.woff2/);
  assert.match(home, lang === "zh" ? /rel="preload"[^>]+LuxurEatZhiSong-hero-critical\.woff2/ : /rel="preload"[^>]+Spectral-home-critical\.woff2/);
  if (lang === "zh") assert.doesNotMatch(home, /rel="preload"[^>]+(?:KingHwaOldSong-home-critical|LuxurEatZhiSong-home-subset)\.woff2/);
  if (lang === "zh") assert.doesNotMatch(home, /rel="preload"[^>]+(?:KingHwaOldSong-site|LuxurEatZhiSong-site)\.woff2/);
  assert.match(home, /class="lux-home-page /);
  assert.match(home, /<html class="[^"]*lux-home-root/);
  assert.match(home, /data-lux-critical-fonts/);
  assert.match(home, /font-display:swap/);
  assert.doesNotMatch(home, /rel="preload"[^>]+MaterialSymbolsOutlined-subset\.ttf/);
  const footer = home.match(/<footer class="lux-footer">[\s\S]*?<\/footer>/)?.[0] || "";
  assert.doesNotMatch(footer, /loading="lazy"/, "footer still delays its small local graphics");
  assert.match(footer, /loading="eager" fetchpriority="low"/, "footer graphics do not load early at low priority");
  assert.doesNotMatch(home, /<script\b(?=[^>]*\bsrc=)(?![^>]*\b(?:defer|async)\b)/i);
}

const allHtml = ["zh", "en"].flatMap((lang) => fs.readdirSync(path.join(root, lang)).filter((name) => name.endsWith(".html")).map((name) => read(`${lang}/${name}`).toString())).join("\n");
assert.doesNotMatch(allHtml, /assets\/fonts\/[^"']+\.(?:woff2|ttf)(?!\?v=)/, "a page still contains an unversioned font URL");
assert.doesNotMatch(allHtml, /srcset="([^" ]+-mobile\.webp) \d+w, \1 \d+w"/, "a responsive image repeats its mobile source as the desktop candidate");
for (const match of allHtml.matchAll(/<img\b[^>]*(?:\.avif|\.gif|\.jpe?g|\.png|\.webp)[^>]*>/gi)) {
  assert.match(match[0], /\bwidth="\d+"/i, "a raster image has no intrinsic width");
  assert.match(match[0], /\bheight="\d+"/i, "a raster image has no intrinsic height");
}
assert.match(read("zh/index.html").toString(), /data-lux-mobile-src="\.\.\/assets\/media\/brand\/home-service-selection-mobile\.webp"/);
assert.match(read("zh/index.html").toString(), /srcset="\.\.\/assets\/media\/brand\/[^"']+-mobile\.webp \d+w, \.\.\/assets\/media\/brand\/[^"']+ \d+w" sizes="100vw"/, "critical responsive images do not expose a native srcset");
for (const file of fs.readdirSync(path.join(root, "assets/media/brand")).filter((name) => name.endsWith("-mobile.webp"))) {
  assert.ok(size(`assets/media/brand/${file}`) <= 120 * 1024, `${file} exceeds the 120 KB mobile image budget`);
}

for (const slug of ["about-us", "product", "recipe", "brand", "blog", "certification", "cooperation", "contact", "bag"]) {
  const page = read(`zh/${slug}.html`).toString();
  const headline = "assets/fonts/KingHwaOldSong-site.woff2";
  const body = "assets/fonts/LuxurEatZhiSong-site.woff2";
  assert.ok(size(headline) + size(body) <= 1760 * 1024, `${slug} complete Chinese site fonts exceed 1.76 MB`);
  assert.match(page, /rel="preload"[^>]+KingHwaOldSong-[^"']+(?:critical|subset)\.woff2/);
  assert.match(page, /rel="preload"[^>]+LuxurEatZhiSong-[^"']+(?:critical|subset)\.woff2/);
  assert.doesNotMatch(page, /rel="preload"[^>]+(?:KingHwaOldSong-site|LuxurEatZhiSong-site)\.woff2/);
}

const videoMarkup = ["en", "zh"].flatMap((lang) => fs.readdirSync(path.join(root, lang)).filter((name) => name.endsWith(".html")).map((name) => read(`${lang}/${name}`).toString())).join("\n") + read("assets/js/events.js").toString();
for (const match of videoMarkup.matchAll(/<video\b[\s\S]*?<\/video>/g)) {
  assert.match(match[0], /muted/);
  assert.match(match[0], /playsinline/);
  if (match[0].includes("editorial-mosaic")) continue;
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
