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

const productRuntime = read("assets/js/products.js");
assert(productRuntime.includes("const activeFilters = { category: new Set(), type: new Set() }"), "product filters do not expose category and label-type multi-select state");
assert(productRuntime.includes("activeFilters.category.has(item.dataset.species)") && productRuntime.includes("activeFilters.type.has(item.dataset.productType)"), "product cards do not combine category and label-type filters");
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
  const news = read(`${locale}/news.html`);
  assert(news.includes("data-exhibition-map"), `${locale} exhibition map mount is missing`);
  assert(news.includes("data-news-center"), `${locale} News Centre mount is missing`);
}
assert(read("zh/news.html").includes("共同探索高端食品领域的创新方向与增长空间"), "Chinese Brand News hero copy is outdated");
assert(journalRuntime.includes("发布 LuxurEat（露意膳）参与的国际食品展会") && !journalRuntime.includes('latest: "最新活动"'), "Chinese exhibition heading copy is outdated");
assert(journalRuntime.includes("聚焦 LuxurEat（露意膳）的品牌动态、新品发布") && !journalRuntime.includes("Maison Journal"), "Chinese News Centre heading copy is outdated");
assert(journalRuntime.includes("<strong>${escapeHtml(story.title)}</strong>"), "News Centre preview title is missing");
assert(read("zh/journal.html").includes("阅读详情") && !read("zh/journal.html").includes("阅读详细叙事"), "Chinese featured journal link is outdated");
assert(read("en/journal.html").includes("LuxurEat (露意膳) is a Chinese company established."), "English company description punctuation is outdated");
const accountRuntime = read("assets/js/core.js");
assert(accountRuntime.includes('passwordPlaceholder: "请输入您的密码"'), "Chinese password placeholder is outdated");
const integrationStyles = read("integration.css");
assert(integrationStyles.includes(".lux-caviar-empty") && integrationStyles.includes("grid-row: 1"), "product empty state is not aligned with the filter panel");
assert(integrationStyles.includes("home-gifting-waves.webp"), "homepage partnership background is outdated");
assert(integrationStyles.includes(".lux-reader-image-button") && integrationStyles.includes("position: sticky"), "reader media or sticky contents styling is missing");
assert(integrationStyles.includes("align-items: center") && integrationStyles.includes(".lux-recent-events-head > span"), "events and news heading copy is not vertically centered");
for (const locale of ["zh", "en"]) {
  assert(read(`${locale}/index.html`).includes("lux-home-why-orbit"), `${locale} homepage partnership circle is missing`);
}
const zhCaviar = read("zh/caviar.html");
assert(zhCaviar.includes("<strong>品味非凡</strong>") && zhCaviar.includes("<strong>合规可溯</strong>") && zhCaviar.includes("<strong>匠心臻选</strong>"), "Chinese product notes are outdated");
const zhCertification = read("zh/certification.html");
const enCertification = read("en/certification.html");
assert(zhCertification.includes(">品质与认证</h2>") && enCertification.includes(">Quality &amp; Certification</h2>"), "certification glossary title is not localized");
assert((zhCertification.match(/data-cert-media-carousel/g) || []).length >= 2, "certification image carousels are incomplete");
assert(zhCertification.includes("data-cert-quote-prev") && zhCertification.includes("data-cert-quote-next"), "certification quote controls are missing");
assert(!zhCertification.includes('aria-label="全球合作图片导航"') && !enCertification.includes('aria-label="Global partnership image navigation"'), "duplicate image-side quote controls remain");
assert(accountRuntime.includes("function initLuxGiftScroller()") && accountRuntime.includes("grid.addEventListener(\"mouseleave\", start)"), "gifting catalogue autoplay is missing");
assert(journalRuntime.includes("aboutMount.querySelectorAll(\"[data-about-carousel]\")"), "About Us carousel autoplay is missing");
assert(integrationStyles.includes('font-family: "Material Symbols Outlined" !important'), "material icon font is not protected");
const zhBlog = read("zh/blog.html");
assert(zhBlog.includes("全面了解鱼子酱的历史、养殖与加工方式、种类、品鉴方法及可持续生产"), "Chinese Blog kicker is outdated");
assert(!zhBlog.includes("对于希望全面了解这种奢华食品每一处细微差别的人来说"), "obsolete Chinese Blog paragraph remains");

console.log("content architecture verification passed");
