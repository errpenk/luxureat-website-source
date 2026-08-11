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
  "assets/data/academy-index.js",
  "assets/data/brand.js",
  "assets/js/core.js",
  "assets/js/engagement.js",
  "assets/js/products.js",
  "assets/js/events.js",
  "assets/js/journal.js",
  "assets/js/brand.js",
]) assert(fs.existsSync(path.join(root, file)), `missing ${file}`);

const products = load("assets/data/products.js", "LUXUREAT_PRODUCT_DATA");
const events = load("assets/data/events.js", "LUXUREAT_EVENT_DATA");
const journal = load("assets/data/journal.js", "LUXUREAT_ARTICLE_DATA");
const recipeProductCategories = new Set(["caviar", "truffle", "olive-oil", "pizza", "gelato"]);
for (const article of Object.values(journal.articles).filter((item) => item.type === "recipe")) {
  assert(recipeProductCategories.has(article.productCategory), `${article.title} does not link to a matching product category`);
}

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

// A missing glyph makes the browser fall back per character and visibly mixes
// Chinese families. Cover every Chinese character used by static and dynamic
// content in both site fonts, rather than trying to predict where it renders.
const cjk = /[\u3000-\u303f\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff00-\uffef]/g;
const chineseSources = [
  ...sourceFiles,
  ...["assets/data", "assets/js"].flatMap((directory) => fs.readdirSync(path.join(root, directory))
    .filter((name) => name.endsWith(".js")).map((name) => `${directory}/${name}`)),
  "site.config.mjs",
];
const requiredChineseGlyphs = new Set(chineseSources.flatMap((file) => read(file).match(cjk) || []));
const siteGlyphManifest = new Set(read("assets/fonts/KingHwaOldSong-site-glyphs.txt").match(cjk) || []);
const missingSiteGlyphs = [...requiredChineseGlyphs].filter((glyph) => !siteGlyphManifest.has(glyph));
assert(!missingSiteGlyphs.length, `Chinese site fonts are missing: ${missingSiteGlyphs.join("")}`);

const typographyCss = ["integration.css", ...fs.readdirSync(path.join(root, "assets/css"))
  .filter((name) => name.endsWith(".css") && !name.startsWith("tailwind-"))
  .map((name) => `assets/css/${name}`)].map(read).join("\n");
const allowedFontFamilies = new Set([
  "inherit", '"Material Symbols Outlined"', '"Nyght Serif"', '"Spectral"',
  '"KingHwa Old Song Site"', '"LuxurEat ZhiSong Site"',
]);
const unapprovedFontFamilies = [...typographyCss.matchAll(/font-family\s*:\s*([^;}]+)/g)]
  .map((match) => match[1].replace(/\s*!important\s*$/, "").trim())
  .filter((family) => !family.startsWith("var(") && !allowedFontFamilies.has(family));
assert(!unapprovedFontFamilies.length, `unapproved text font declaration(s): ${[...new Set(unapprovedFontFamilies)].join(", ")}`);

assert(!html.includes("assets/images/"), "HTML still references assets/images");
assert(!html.includes("assets/article-images/"), "HTML still references assets/article-images");
assert(!html.includes("latest-event.js"), "HTML still loads the obsolete latest-event.js");
assert(!fs.existsSync(path.join(root, "main.js")), "legacy main.js still exists");
assert(!fs.existsSync(path.join(root, "latest-event.js")), "legacy latest-event.js still exists");

const event = events.events.find((item) => item.id === "marca-china-2026");
assert(event?.image?.endsWith("/marca-china-2026.png"), "latest event does not use supplied PNG");
assert(event?.poster?.endsWith("/marca-china-2026-poster.webp"), "latest event homepage poster is missing");

const productRuntime = read("assets/js/products.js");
assert(productRuntime.includes("const activeFilters = { category: new Set(), type: new Set() }"), "product filters do not expose category and label-type multi-select state");
assert(productRuntime.includes("activeFilters.category.has(item.dataset.species)") && productRuntime.includes("activeFilters.type.has(item.dataset.productType)"), "product cards do not combine category and label-type filters");
assert(productRuntime.includes('new URLSearchParams(location.search).get("category")') && productRuntime.includes('button.dataset.caviarFilter === requestedCategory'), "product category links do not initialize the matching catalogue filter");
assert(productRuntime.includes('"未找到相关产品"') && productRuntime.includes("empty.hidden = visibleCount !== 0"), "product empty-search state is missing");

const journalRuntime = read("assets/js/journal.js");
assert(journalRuntime.includes("leaflet@1.9.4"), "Leaflet map runtime is missing");
assert(journalRuntime.includes("tile.openstreetmap.org/{z}/{x}/{y}.png"), "OSM China basemap is missing");
assert(journalRuntime.includes("data-map-reset"), "OSM China reset control is missing");
assert(journalRuntime.includes('marker.on("mouseover"'), "map marker hover previews are missing");
assert(!/https:\/\/webapi\.amap\.com\//.test(journalRuntime), "legacy AMap loader is still present");
assert(journalRuntime.includes("caviareat-baerii-news.png"), "independent News Centre article is missing");
assert(journalRuntime.includes('data-reader-open="${storyId}"') && !journalRuntime.includes("story.sections.map"), "News Centre preview does not open a separate article");
assert(journalRuntime.includes("archiveOrigin") && journalRuntime.includes("render(archived.dataset.readerArchiveItem, false)"), "archive close/back navigation state is missing");
assert(journalRuntime.includes("data-reader-image") && journalRuntime.includes("imageLightbox.showModal()"), "article inline-image lightbox is missing");
assert(journalRuntime.includes('"品牌调查"'), "Chinese journal label is not localized");
assert(journalRuntime.includes('["品牌与产业", ["zh-harvest", "zh-truffle", "zh-service"]]'), "seasonal archive categories are not reorganized");
for (const id of ["ice-server", "breath", "hand-warm", "palate"]) {
  assert(!journal.articles[`zh-${id}`] && !journal.articles[`en-${id}`], `deleted seasonal article remains: ${id}`);
}
assert(journal.articles["zh-champagne"]?.title === "鱼子酱感官分析", "Chinese sensory-analysis article is missing");
assert(journal.articles["en-champagne"]?.title === "Sensory Analysis of Caviar", "English sensory-analysis article is missing");
assert(journal.articles["zh-mother-of-pearl"]?.title === "鱼子酱标签：品质与透明度", "Chinese labeling article is missing");
assert(journal.articles["en-mother-of-pearl"]?.title === "Caviar Labeling: Quality and Transparency", "English labeling article is missing");
assert(journal.articles["en-champagne"].sections.length === 11, "sensory-analysis DOCX content is incomplete");
assert(journal.articles["en-mother-of-pearl"].sectionMedia[0][0].src.includes("caviar-labeling-diagram"), "labeling diagram is missing");
for (const locale of ["zh", "en"]) {
  const news = read(`${locale}/brand.html`);
  assert(news.includes("data-exhibition-map"), `${locale} exhibition map mount is missing`);
  assert(news.includes("data-news-center"), `${locale} News Centre mount is missing`);
}
assert(read("zh/brand.html").includes("共同探索高端食品领域的创新方向与增长空间"), "Chinese Brand News hero copy is outdated");
assert(journalRuntime.includes("发布 LuxurEat（露意膳）参与的国际食品展会") && !journalRuntime.includes('latest: "最新活动"'), "Chinese exhibition heading copy is outdated");
assert(journalRuntime.includes("聚焦 LuxurEat（露意膳）的品牌动态、新品发布") && !journalRuntime.includes("Maison Journal"), "Chinese News Centre heading copy is outdated");
assert(journalRuntime.includes("<strong>${escapeHtml(story.title)}</strong>"), "News Centre preview title is missing");
assert(read("zh/about-us.html").includes("阅读详情") && !read("zh/about-us.html").includes("阅读详细叙事"), "Chinese featured journal link is outdated");
assert(read("en/about-us.html").includes("LuxurEat (露意膳) is a Chinese company established."), "English company description punctuation is outdated");
const accountRuntime = read("assets/js/core.js");
const engagementRuntime = read("assets/js/engagement.js");
assert(engagementRuntime.includes('passwordPlaceholder: "请输入您的密码"'), "Chinese password placeholder is outdated");
assert(!accountRuntime.includes("luxProtectMaterialIcons"), "static Material Symbols still use a document-wide mutation observer");
const integrationStyles = read("integration.css");
assert(integrationStyles.includes(".lux-header.is-scrolled") && integrationStyles.includes(".lux-header:has(.lux-nav.open)"), "shared header top or mobile-menu surface styling is incomplete");
assert(integrationStyles.includes(".lux-reader-close:hover") && integrationStyles.includes("border-color: #101010;") && integrationStyles.includes("box-shadow: none;"), "article-reader close hover does not retain the default thin border");
assert(read("zh/about-us.html").includes("我们不使用的成分") && read("en/about-us.html").includes("Ingredients we do not use") && read("assets/css/journal.css").includes("lux-ingredient-standard-note"), "bilingual ingredient-exclusion statement is missing");
assert(read("assets/css/journal.css").includes("width:100vw") && !read("assets/css/journal.css").includes("border-left"), "brand-promise note is not full-width or still has a left accent rule");
assert(read("assets/js/certification-ui.js").includes("IntersectionObserver") && read("assets/css/certification.css").includes("is-scroll-flipped"), "certification glossary does not replay its scroll-triggered flip");
assert(integrationStyles.includes(".lux-header { position: fixed; grid-template-columns: auto 1fr; }") && !integrationStyles.includes(".lux-header { position: sticky; grid-template-columns: auto 1fr; }"), "mobile header is not fixed over the hero at the top");
assert(integrationStyles.includes(".lux-back-to-top:hover,.lux-back-to-top:focus-visible") && integrationStyles.includes("background:#9a6d22") && integrationStyles.includes("font: 700 13px/1.4"), "gold back-to-top hover or enlarged partnership detail link is missing");
assert(read("assets/css/rituals.css").includes("border-color:#81d8d0;color:#81d8d0"), "recipe-library detail CTA does not turn Tiffany blue");
assert(integrationStyles.includes('--lux-en-display: "Nyght Serif"') && integrationStyles.includes('--lux-en-heading: "Nyght Serif"') && read("en/contact.html").includes('NyghtSerif-Regular.woff2') && read("en/contact.html").includes('NyghtSerif-RegularItalic.woff2') && read("en/contact.html").includes('NyghtSerif-Bold.woff2'), "English headings do not use versioned Nyght Serif faces");
assert(integrationStyles.includes('--lux-en-body: "Spectral"') && read("en/contact.html").includes('Spectral-Regular.woff2') && read("en/contact.html").includes('Spectral-Italic.woff2') && read("en/contact.html").includes('Spectral-SemiBold.woff2'), "English body copy does not use versioned Spectral faces");
assert(integrationStyles.includes('html[lang^="en"] body *:not(.material-symbols-outlined)::before') && integrationStyles.includes('html[lang^="en"] body *:not(.material-symbols-outlined)::after') && integrationStyles.includes('font-family: var(--lux-en-heading) !important'), "English typography does not reject legacy text or generated-content fonts globally");
assert(integrationStyles.includes(".lux-cert-glossary-grid") && integrationStyles.includes("grid-template-columns: repeat(2, minmax(0, 1fr)) !important") && integrationStyles.includes(".lux-cert-principle"), "mobile certification cards are not arranged in two columns");
assert(integrationStyles.includes('--lux-zh-headline: "KingHwa Old Song Site"') && read("zh/contact.html").includes('KingHwaOldSong-site.woff2'), "Chinese headings do not use the complete KingHwa subset");
assert(read("zh/about-us.html").includes('LuxurEatZhiSong-site.woff2') && integrationStyles.includes('html[lang^="zh"] .lux-cert-awards h2'), "Journal body typography is not bundled and award records are not explicitly KingHwa");
assert(integrationStyles.includes('--lux-zh-body: "LuxurEat ZhiSong Site"') && read("zh/contact.html").includes('LuxurEatZhiSong-site.woff2'), "Chinese body copy does not use the complete ZhiSong subset");
assert(integrationStyles.includes('html[lang^="zh"] body *:not(.material-symbols-outlined)::before') && integrationStyles.includes('html[lang^="zh"] body *:not(.material-symbols-outlined)::after') && integrationStyles.includes('font-family: inherit !important'), "Chinese generated content does not inherit the current typography");
const registeredTextFonts = [...integrationStyles.matchAll(/@font-face\s*\{[^}]*font-family:\s*"([^"]+)"/g)].map((match) => match[1]).filter((family) => family !== "Material Symbols Outlined");
assert(registeredTextFonts.length === 0, "shared CSS still registers stale text fonts");
assert(integrationStyles.includes('MaterialSymbolsOutlined-subset.ttf'), "local Material Symbols subset is missing");
assert(["en", "zh"].flatMap((locale) => require("node:fs").readdirSync(locale).filter((name) => name.endsWith(".html")).map((name) => `${locale}/${name}`)).every((file) => !/<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com\//i.test(read(file))), "a page still depends on Google Fonts");
assert(read("zh/index.html").includes('KingHwaOldSong-site.woff2') && read("zh/index.html").includes('class="lux-home-page '), "Chinese homepage does not use the complete KingHwa subset");
assert(read("en/index.html").includes('NyghtSerif-home-critical.woff2') && read("en/index.html").includes('Spectral-home-critical.woff2') && read("en/index.html").includes('class="lux-home-page '), "English homepage does not use its reduced first-view fonts");
assert(!read("zh/index.html").includes('rel="preload" href="../assets/fonts/KingHwaOldSong-subset.woff2"'), "Chinese homepage still forces the full KingHwa font into the critical path");
assert(!require("node:fs").existsSync("assets/fonts/LanternMingA-subset.woff2") && !require("node:fs").existsSync("assets/fonts/LanternMing-SOURCE.md"), "retired font assets remain in the site bundle");
assert(integrationStyles.includes(".lux-info-icon:hover") && integrationStyles.includes("color: #9df5ec !important") && integrationStyles.includes("transform: scale(1.08)"), "gifting Lucide info icon interaction is incomplete");
assert(integrationStyles.includes('html[lang^="zh"] .lux-home-maison blockquote') && integrationStyles.includes('html[lang^="zh"] .lux-event-card-copy strong') && integrationStyles.includes("-webkit-text-stroke: .16px currentColor"), "Chinese homepage quote and event titles do not use the strengthened KingHwa treatment");
assert(integrationStyles.includes('html[lang^="zh"] body p.lux-footprint-video-title') && integrationStyles.includes('html[lang^="en"] body p.lux-footprint-video-title'), "contact footer title does not use the locale heading font");
assert(read("zh/index.html").includes('href="contact.html">联系我们</a>') && read("en/index.html").includes('href="contact.html">Contact Us</a>'), "homepage contact CTA is not localized");
assert(integrationStyles.includes(".lux-selected-products-kicker") && integrationStyles.includes(".lux-home-editorial-kicker") && integrationStyles.includes(".lux-home-why-copy > span") && integrationStyles.includes(".lux-meet-map-card > span") && integrationStyles.includes("font-size: 11px !important") && integrationStyles.includes("letter-spacing: .28em !important"), "homepage eyebrow labels do not share the Maison Overview typography");
assert(integrationStyles.includes("Title-case labels need a larger optical size") && integrationStyles.includes("#selected-products .lux-selected-products-kicker") && integrationStyles.includes("#gifting-editorial .lux-home-editorial-kicker") && integrationStyles.includes("font-size: 14px !important"), "title-case homepage labels are still optically undersized");
assert(integrationStyles.includes("Match the partnership CTA to Explore Partnership") && integrationStyles.includes("font-size: 18px !important") && integrationStyles.includes("line-height: 27px !important") && integrationStyles.includes("white-space: nowrap") && integrationStyles.includes("writing-mode: horizontal-tb"), "homepage partnership CTA does not match Explore Partnership horizontally");
const allPageHtml = ["zh", "en"].flatMap((locale) => require("node:fs").readdirSync(locale).filter((name) => name.endsWith(".html")).map((name) => read(`${locale}/${name}`))).join("\n");
const materialIconTags = [...allPageHtml.matchAll(/<(?:span|i)\b[^>]*\bclass=["'][^"']*\bmaterial-symbols-outlined\b[^"']*["'][^>]*>\s*<\/(?:span|i)>/gi)].map((match) => match[0]);
assert(materialIconTags.length && materialIconTags.every((tag) => /\bdata-icon=["'][a-z0-9_]+["']/.test(tag) && /\btranslate=["']no["']/.test(tag) && /\baria-hidden=["']true["']/.test(tag)), "static material icons are not translation-safe empty graphics");
assert(!/<(?:span|i)\b[^>]*\bmaterial-symbols-outlined\b[^>]*>\s*[a-z0-9_]+\s*<\/(?:span|i)>/i.test(allPageHtml), "a static material icon still exposes translatable ligature text");
assert(!/<text\b/i.test(allPageHtml), "an inline SVG still exposes translatable text");
assert(!allPageHtml.includes("roberto@truffleat.com") && !allPageHtml.includes("roberto%40truffleat.com"), "obsolete Roberto email remains in page HTML");
assert(!allPageHtml.includes("?cc=") && !allPageHtml.includes("&cc="), "email links must not add a CC recipient");
assert(allPageHtml.includes('href="mailto:china@luxureat.com"') && allPageHtml.includes('href="mailto:roberto@ugolinigroup.com"'), "direct China and Roberto mail links are missing");
for (const locale of ["zh", "en"]) {
  const giftingHtml = read(`${locale}/cooperation.html`);
  assert(giftingHtml.includes('href="mailto:roberto@ugolinigroup.com?subject='), `${locale} generic gifting email action does not default to Roberto`);
}
assert(integrationStyles.includes(".lux-caviar-empty") && integrationStyles.includes("grid-row: 1"), "product empty state is not aligned with the filter panel");
assert(integrationStyles.includes("home-gifting-waves.webp"), "homepage partnership background is outdated");
assert(integrationStyles.includes(".lux-reader-image-button") && integrationStyles.includes("position: sticky"), "reader media or sticky contents styling is missing");
assert(integrationStyles.includes("align-items: center") && integrationStyles.includes(".lux-recent-events-head > span"), "events and news heading copy is not vertically centered");
for (const locale of ["zh", "en"]) {
  assert(read(`${locale}/index.html`).includes("lux-home-why-orbit"), `${locale} homepage partnership circle is missing`);
  const home = read(`${locale}/index.html`);
  assert(/data-lux-autoplay[^>]*class="lux-hero-video"[^>]*\bpreload="none"/.test(home), `${locale} homepage hero video does not defer transfer`);
  assert(home.includes("data-lux-deferred-scripts") && !home.includes('defer src="../assets/data/products.js'), `${locale} homepage noncritical scripts still block DOMContentLoaded`);
}
assert(accountRuntime.includes("data-lux-deferred-scripts"), "mobile-first-load script deferral logic is incomplete");
assert(!accountRuntime.includes("luxDeferredScripts.textContent") && accountRuntime.includes('["../data/products.js", "../data/events.js", "../data/journal.js"]'), "deferred script loading is not restricted to the trusted local catalog");
assert(accountRuntime.includes('event.target.closest?.("[data-reader-open]")') && accountRuntime.includes("trigger.click()"), "the first deferred article click is not replayed after its runtime loads");
assert(journalRuntime.includes('document.readyState === "complete"') && journalRuntime.includes("initLuxReader()"), "the reader runtime does not cover deferred and post-load initialization");
assert(productRuntime.includes('document.readyState === "complete"') && productRuntime.includes("initLuxProductDetails()") && productRuntime.includes("renderInitialBag()"), "the product runtime does not cover deferred and post-load initialization");
assert(read("assets/js/academy.js").includes('document.readyState === "complete"'), "the academy runtime can initialize after its reader runtime");
assert(productRuntime.includes('key: "price-asc"') && productRuntime.includes('key: "price-desc"') && productRuntime.includes("lux-sort-selected-icon"), "bilingual price sorting or its Lucide selection icon is incomplete");
assert(integrationStyles.includes(".lux-about-story .lux-reader-quote") && integrationStyles.includes(".lux-reader-pull p") && integrationStyles.includes("grid-template-columns: 112px minmax(0, 1fr)"), "requested quote hierarchy or compact mobile product view is incomplete");
assert(integrationStyles.includes(".lux-footer .lux-footer-brand > p") && integrationStyles.includes("font-size: var(--lux-type-body-sm) !important"), "footer description does not match navigation sizing");
assert(read("en/index.html").includes('href="about-us.html#reader-en-harvest" data-reader-open="en-harvest"') && read("zh/index.html").includes('href="about-us.html#reader-zh-harvest" data-reader-open="zh-harvest"'), "homepage Values UI lacks a native article fallback");
assert(accountRuntime.includes("else if (trigger.href) location.href = trigger.href"), "failed deferred reader loading has no native link fallback");
assert(integrationStyles.includes("z-index: 120 !important") && integrationStyles.includes("html[lang] body #luxureat-china .lux-about-program-lead h2") && integrationStyles.includes("clamp(34px, 4vw, 58px)") && integrationStyles.includes(".lux-recent-events-head > span"), "sort layering or requested bilingual typography is incomplete");
assert(integrationStyles.includes("About-page closing statement: restrained KingHwa display treatment") && integrationStyles.includes("clamp(22px, 2.2vw, 32px)"), "Chinese About closing statement does not use the reduced KingHwa treatment");
assert(integrationStyles.includes('html[lang^="en"] .lux-about-story .lux-reader-quote') && integrationStyles.includes("#consumer-needs .lux-about-program-grid h3") && integrationStyles.includes("#consumer-needs .lux-product-characteristics-note strong") && integrationStyles.includes("color: #d0ac2d !important"), "English About statement scale or bilingual consumer gold headings are incomplete");
assert(integrationStyles.includes("#mission-objectives .lux-about-program-grid h3") && integrationStyles.includes("-webkit-text-stroke: .6px #050505") && integrationStyles.includes("paint-order: stroke fill"), "bilingual mission headings do not use gold fill with a black outline");
assert(read("zh/index.html").includes("<blockquote>品味的奢华") && read("en/index.html").includes("<blockquote>The luxury of taste") && integrationStyles.includes(".lux-home-maison-head > div:first-child > blockquote") && integrationStyles.includes("color: #004b47"), "homepage Maison baselines or the deep-green Services label are incomplete");
assert(read("zh/cooperation.html").includes("lux-gifting-hero lux-standard-hero") && read("en/cooperation.html").includes("lux-gifting-hero lux-standard-hero") && integrationStyles.includes(".lux-gifting-hero .lux-hero-fade-both") && integrationStyles.includes("#000 100%"), "bilingual Gifting hero blend is incomplete");
const sharedHeroPages = ["about-us", "recipe", "brand", "blog", "certification", "cooperation", "contact"];
assert(read("zh/recipe.html").includes('data-recipe-library-app') && read("en/recipe.html").includes('data-recipe-library-app'), "bilingual unified recipe-library mounts are missing");
assert(journalRuntime.includes("renderRecipeLibrary") && journalRuntime.includes("data-recipe-region") && journalRuntime.includes("data-recipe-ingredient"), "recipe archive does not provide shared region and ingredient filtering");
assert(journalRuntime.includes('read: "阅读详情"') && journalRuntime.includes('class="lux-reader-cta"'), "recipe-library cards do not reuse the shared detail CTA");
assert(journalRuntime.includes('href="${href}" class="lux-recipe-library-card"') && journalRuntime.includes('id.replace(/^(?:zh|en)-recipe-/'), "recipe cards do not expose crawlable localized detail links");
assert(journalRuntime.includes("lux-recipe-product-link") && journalRuntime.includes('href="${escapeHtml(productHref)}"') && journalRuntime.includes('.lux-nav a[href$="product.html"], .lux-nav a[href$="/product/"]') && journalRuntime.includes('productUrl.searchParams.set("category", productCategory)'), "related recipe products do not reuse the localized product route and category filter");
assert(read("assets/css/rituals.css").includes(".lux-recipe-library-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 12px}"), "mobile recipe library is not a two-column grid");
assert(journalRuntime.includes("article.productCategory ||") && read("assets/data/journal.js").includes('"sweet-bread-butter-caviar": "caviar"') && read("assets/data/journal.js").includes('"truffle-eggs": "truffle"'), "legacy recipes do not map to their matching product category");
assert(read("zh/product.html").includes('data-caviar-filter="caviar"') && read("en/product.html").includes('data-caviar-filter="caviar"'), "the caviar recipe category is missing from the bilingual product filters");
assert(sharedHeroPages.every((page) => read(`zh/${page}.html`).includes("lux-page-top-hero") && read(`zh/${page}.html`).includes("lux-page-hero-content")), "Chinese editorial heroes do not use the shared structure");
assert(sharedHeroPages.every((page) => read(`en/${page}.html`).includes("lux-page-top-hero") && read(`en/${page}.html`).includes("lux-page-hero-content")), "English editorial heroes do not use the shared structure");
assert(integrationStyles.includes("Shared non-home hero: kicker, title and support copy form one centered stack") && integrationStyles.includes("gap: clamp(24px, 2.2vw, 32px) !important") && integrationStyles.includes("font-weight: 700 !important") && integrationStyles.includes("min-height: 100svh !important"), "shared non-home hero spacing, kicker weight, or viewport centering is incomplete");
const heroTailPages = ["new", "recipe", "brand", "blog", "certification", "cooperation", "contact"];
assert(heroTailPages.every((page) => read(`zh/${page}.html`).includes("lux-page-top-hero lux-hero-tail")) && heroTailPages.every((page) => read(`en/${page}.html`).includes("lux-page-top-hero lux-hero-tail")), "bilingual editorial hero tails are incomplete");
assert(integrationStyles.includes("Editorial hero tail: one horizontal rule followed by a centered fading stem") && integrationStyles.includes("--lux-hero-stem-height: clamp(96px, 12svh, 150px)") && integrationStyles.includes("padding-bottom: calc(48px + var(--lux-hero-stem-height))"), "editorial hero tail styling or whole-composition centering is incomplete");
assert(integrationStyles.includes("Mobile editorial heroes: center the copy without the decorative stem") && integrationStyles.includes(".lux-hero-tail .lux-page-hero-content > .lux-hero-support::before") && integrationStyles.includes("display: none"), "mobile editorial heroes still reserve space for the decorative stem");
assert(!read("zh/certification.html").includes('<div class="w-24 h-px bg-primary mx-auto"></div>') && !read("en/certification.html").includes('<div class="w-24 h-px bg-primary mx-auto"></div>'), "certification hero still contains a duplicate horizontal rule");
assert(!read("zh/product.html").includes("lux-page-top-hero") && read("zh/product.html").includes("items-center justify-end") && !read("en/product.html").includes("lux-page-top-hero") && read("en/product.html").includes("items-center justify-end"), "product heroes are not horizontally centered in their bottom-aligned layout");
assert(read("zh/product.html").indexOf("lux-product-count") < read("zh/product.html").indexOf("<header><strong>筛选条件") && read("en/product.html").indexOf("lux-product-count") < read("en/product.html").indexOf("<header><strong>Filter by"), "bilingual product counts are not above the filter headings");
assert(integrationStyles.includes("grid-template-rows: auto 1fr auto") && integrationStyles.includes(".lux-home-maison-head > div:first-child > span:first-child") && integrationStyles.includes("transform: translateY(1.7px)"), "Maison alignment is incomplete");
assert(integrationStyles.includes("html[lang] body .lux-account-inline-actions button") && integrationStyles.includes("html[lang] body .lux-account-existing button") && integrationStyles.includes("font-size: 12px !important") && integrationStyles.includes("font-size: 14px !important"), "bilingual account helper-link sizing is inconsistent");
assert(read("assets/fonts/ChineseTypography-SOURCE.md").includes("京華老宋体v3.0.ttf"), "KingHwa source metadata is not v3.0");
assert(integrationStyles.includes("Every page-top hero follows the homepage's 14px / 18px support scale") && integrationStyles.includes("html[lang] body .lux-hero-kicker") && integrationStyles.includes("html[lang] body .lux-hero-support"), "bilingual page-top hero copy does not share the homepage scale");
assert(accountRuntime.includes('document.querySelectorAll("#selected-products > .grid > .group")') && accountRuntime.includes("location.href = productLink.href"), "homepage product cards are not fully clickable");
assert(integrationStyles.includes("#selected-products > .grid > .group > div:last-child > p") && integrationStyles.includes("max-height: 0") && integrationStyles.includes("margin-bottom: 0 !important") && integrationStyles.includes("left: 32px"), "homepage product labels, names and purchase actions are not compactly left-aligned");
assert(integrationStyles.includes('html[lang^="zh"] :is(p, li, blockquote, figcaption, dt, dd)') && integrationStyles.includes("line-height: 1.75 !important"), "Chinese body copy does not use the enlarged reading scale");
assert(integrationStyles.includes('html[lang^="zh"] :is(#lux-reader-title') && integrationStyles.includes('html[lang] body p.lux-footprint-video-title'), "bilingual modal/contact title scale is incomplete");
const zhCaviar = read("zh/product.html");
assert(zhCaviar.includes("<strong>品味非凡</strong>") && zhCaviar.includes("<strong>合规可溯</strong>") && zhCaviar.includes("<strong>匠心臻选</strong>"), "Chinese product notes are outdated");
const zhCertification = read("zh/certification.html");
const enCertification = read("en/certification.html");
const enContact = read("en/contact.html");
const zhContact = read("zh/contact.html");
assert((enContact.match(/lux-country-icon/g) || []).length === 4 && (zhContact.match(/lux-country-icon/g) || []).length === 4, "Global Presence country-specific icons are incomplete");
assert(enContact.includes('d="M8 2h8l-1 7') && enContact.includes('d="m12 2 3.1 6.3') && enContact.includes('d="M12 17c-3-3') && enContact.includes('d="m6 8 6-5 6 5"'), "Global Presence country icons are not distinctive");
assert(zhCertification.includes(">品质与认证</h2>") && enCertification.includes(">Quality &amp; Certification</h2>"), "certification glossary title is not localized");
assert(zhCertification.includes("px-margin-mobile md:px-margin-desktop") && enCertification.includes("px-margin-mobile md:px-margin-desktop"), "certification main container still uses desktop padding on mobile");
assert((zhCertification.match(/data-cert-media-carousel/g) || []).length >= 2, "certification image carousels are incomplete");
assert(zhCertification.includes("data-cert-quote-prev") && zhCertification.includes("data-cert-quote-next"), "certification quote controls are missing");
assert(!zhCertification.includes('aria-label="全球合作图片导航"') && !enCertification.includes('aria-label="Global partnership image navigation"'), "duplicate image-side quote controls remain");
assert(accountRuntime.includes("function initLuxGiftScroller()") && accountRuntime.includes("grid.addEventListener(\"mouseleave\", start)"), "gifting catalogue autoplay is missing");
assert(journalRuntime.includes("aboutMount.querySelectorAll(\"[data-about-carousel]\")"), "About Us carousel autoplay is missing");
assert(read("assets/js/events.js").includes('meet: "Meet Us"'), "English Exhibition Atlas heading is not Meet Us");
assert(integrationStyles.includes('font-family: "Material Symbols Outlined" !important'), "material icon font is not protected");
assert(integrationStyles.includes('.material-symbols-outlined::before') && integrationStyles.includes('content: attr(data-icon)'), "material icons do not render from non-translatable attributes");
assert(!/<span\b[^>]*\bmaterial-symbols-outlined\b[^>]*>\s*[a-z0-9_]+\s*<\/span>/i.test(productRuntime + journalRuntime), "a dynamic material icon still exposes translatable ligature text");
assert(integrationStyles.includes('font-size: 18px !important') && integrationStyles.includes('line-height: 1.65 !important'), "English body copy does not meet the enlarged reading scale");
assert(productRuntime.includes('lang === "en" ? \' lang="zh-CN"\'') && integrationStyles.includes('html[lang^="en"] body [lang^="zh"]') && integrationStyles.includes('font-family: "KingHwa Old Song Site" !important'), "Chinese product names in the English interface do not use the KingHwa family");
const zhBlog = read("zh/blog.html");
assert(zhBlog.includes("从松露、鱼子酱与橄榄油，到美食词典、生产者与产地故事"), "Chinese Blog kicker is outdated");
const academyRuntime = read("assets/js/academy.js");
assert(academyRuntime.includes("loadAcademyArticle") && academyRuntime.includes("academy-articles/") && academyRuntime.includes("trigger.click()"), "academy reader data is not loaded one article at a time and replayed on demand");
assert(!zhBlog.includes("assets/data/academy.js") && !zhBlog.includes("assets/data/academy-columns.js") && !zhBlog.includes("assets/data/journal.js") && zhBlog.includes("assets/data/academy-index.js"), "Blog still downloads full article data before interaction");
assert(academyRuntime.includes('culture: "探索意大利"') && academyRuntime.includes('olive: "橄榄油学院"') && academyRuntime.includes('gelato: "意式手工冰淇淋"'), "Chinese Explore Italy topics are missing");
assert(!zhBlog.includes("对于希望全面了解这种奢华食品每一处细微差别的人来说"), "obsolete Chinese Blog paragraph remains");
assert(read("assets/css/journal.css").includes("scroll-margin-top:96px"), "Brand Promise does not land below the fixed header");
const ritualStyles = read("assets/css/rituals.css");
assert(ritualStyles.includes("border-color:#fff;color:#fff") && ritualStyles.includes(".lux-reader-cta:hover") && ritualStyles.includes("border-color:#81d8d0;color:#81d8d0"), "recipe-library detail CTA does not change from white to Tiffany on direct hover");
assert(allPageHtml.includes('class="lux-newsletter"') && ["zh", "en"].every((locale) => read(`${locale}/index.html`).includes("data-newsletter-form")), "bilingual footer newsletter is missing");
assert(engagementRuntime.includes("createLuxBotProof") && engagementRuntime.includes('action", "luxureat_newsletter"') && engagementRuntime.includes("newsletterNonce"), "newsletter validation or secure submission runtime is incomplete");
const themeBuilder = read("scripts/build-luxureat-theme.mjs");
assert(themeBuilder.includes("luxureat_static_newsletter_ajax") && themeBuilder.includes("send_confirmation_email' => true"), "newsletter endpoint does not use verified MailPoet subscription");

console.log("content architecture verification passed");
