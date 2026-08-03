const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const context = {
  URL,
  document: { currentScript: { src: `file://${path.join(root, "assets/data/academy.js")}` } },
  location: { href: `file://${path.join(root, "en/blog.html")}` },
  window: { LUXUREAT_ARTICLE_DATA: { articles: {} } },
};
vm.runInNewContext(read("assets/data/academy.js"), context);

const data = context.window.LUXUREAT_ACADEMY_DATA;
const titles = data.order.map((slug) => data.articles[`en-academy-${slug}`]?.title);
assert(titles.length === 38, `academy does not expose the complete topic order: ${titles.length}`);
for (const title of ["What is extra virgin olive oil?", "What to check when choosing olive oil", "Olive oil on an empty stomach: value, method and myths", "Italian food is more than one flavour", "Italy's twenty regions: a map of the table", "How to read an ingredient list", "Italian Gelato: from city tradition to modern craft", "Producers and world awards: a verified dossier"]) assert(titles.includes(title), `academy topic is missing: ${title}`);
assert(Object.keys(data.articles).length === 76, "academy does not expose all articles in both languages");
const zhTitles = data.order.map((slug) => data.articles[`zh-academy-${slug}`]?.title);
assert(zhTitles.every((title, index) => title && title !== titles[index]), "Chinese article titles are not localized");

const baerii = data.articles["en-academy-baerii-caviar"];
assert(baerii.image.includes("baerii-caviar-cover"), "DOCX first image is not the Baerii cover");
assert(baerii.sections[0][1].length === 7, "Baerii sensory details are incomplete");
assert(baerii.opening[0].startsWith("The Baerii sturgeon is one of the fastest-maturing"), "Baerii maturity paragraph is missing");
assert(data.articles["zh-academy-baerii-caviar"].opening[0].includes("7–8 年"), "Baerii Chinese maturity paragraph is missing");
assert(data.articles["en-academy-beluga-caviar"].image.includes("beluga-caviar-cover-new-page-bg.png"), "Beluga does not use the supplied cover");

const mainTypes = data.articles["en-academy-main-types-of-caviar"];
const comparison = mainTypes.sections.flatMap(([, content]) => content).find((item) => item?.type === "table");
assert(comparison?.rows.length === 11, "caviar comparison table rows are incomplete");
assert(comparison?.rows[0].length === 7, "caviar comparison table columns are incomplete");

const processing = data.articles["en-academy-caviar-processing"];
assert(processing.sectionMedia.flat().length === 6, "processing article images are incomplete");

for (const article of Object.values(data.articles)) {
  assert(article.asideSummary, `${article.id} has no article synopsis`);
  assert(article.column, `${article.id} has no column label`);
  assert(article.archive, `${article.id} has no archive label`);
}
assert(data.articles["en-academy-white-sturgeon-caviar"].wideCover, "wide fish covers are not marked");
for (const slug of data.order) {
  assert(data.articles[`zh-academy-${slug}`].archive.length <= 5, `${slug} Chinese archive label is too long`);
}

for (const lang of ["zh", "en"]) {
  const html = read(`${lang}/blog.html`);
  assert(html.includes('id="caviar-academy"') && html.includes("data-academy-list") && html.includes("data-academy-search"), `${lang} Blog page is incomplete`);
  assert(html.includes(`class="active" href="blog.html">${lang === "zh" ? "知识博客" : "Blog"}</a>`), `${lang} Blog navigation is not active`);
  assert(html.includes("lux-academy-news-hero") && html.includes("min-h-[85vh]"), `${lang} Blog hero does not match Brand News`);
  assert(html.includes("../assets/media/academy/caviar-academy-hero.webp"), `${lang} Blog hero does not use the supplied photo`);
}
const zhBlog = read("zh/blog.html");
assert(zhBlog.includes("知识、起源与工艺") && zhBlog.includes("<h2>意大利美食学院</h2>") && zhBlog.includes("橄榄油"), "Chinese academy introduction is not localized");
assert(read("assets/js/core.js").includes('"探索意大利", "?topic=culture"') && read("assets/js/core.js").includes('"营养与配料指南", "?topic=nutrition"'), "Chinese Blog submenu is incomplete");
const runtime = read("assets/js/academy.js");
assert(runtime.includes('search.addEventListener("input"') && runtime.includes("data-reader-open") && runtime.includes("data-academy-topic-filter"), "academy search, topic filters or reader integration is missing");
assert(!runtime.includes("<small>Caviar Academy</small>"), "latest posts still display the Caviar Academy label");
const readerRuntime = read("assets/js/journal.js");
assert(readerRuntime.includes('"知识博客"') && readerRuntime.includes("article.asideSummary"), "localized reader label or synopsis is missing");
assert(readerRuntime.includes("article.archive || article.eyebrow"), "article cover captions do not use archive labels");
assert(readerRuntime.includes("item.archive || item.eyebrow"), "related articles do not use archive labels");
const styles = read("integration.css");
assert(styles.includes(".lux-academy-card:hover .lux-reader-cta") && styles.includes("background: #89670f"), "academy cover hover treatment is missing");
assert(styles.includes(".lux-academy-latest button:hover img"), "latest-post hover treatment is missing");
assert(styles.includes("font: 700 14px/1.4 var(--lux-page-heading)") && styles.includes(".lux-academy-sidebar > label"), "academy sidebar headings do not share a font size");
assert(styles.includes(".lux-academy-reader .lux-reader-section-media img"), "academy inline-media cleanup is missing");
assert(styles.includes("[data-academy-item][hidden]"), "academy search results cannot be hidden");
assert(styles.includes(".lux-academy-topics") && styles.includes(".lux-home-topic-preview") && styles.includes(".lux-reader-cover-art.is-olive") && styles.includes(".lux-reader-cover-art.is-nutrition"), "topic styling is incomplete");
assert(!styles.includes(".lux-academy-reader.is-wide-cover .lux-reader-cover img {\n  mix-blend-mode"), "wide covers still darken the page background");
assert(styles.includes(".lux-about-story .lux-reader-section-media figure"), "about-page media containers are not cleaned up");
assert(styles.includes(".lux-about-story .lux-about-carousel-track figure"), "about-page carousel borders are not removed");
assert(styles.includes('--lux-zh-headline: "KingHwa Old Song Page"'), "Chinese headings do not use the current page-specific KingHwa font");
assert(styles.includes(".lux-reader-related-grid button.is-wide-cover img"), "related wide covers are still cropped");
assert(styles.includes('.lux-latest-event-slide[aria-hidden="true"]'), "homepage carousel does not fully hide inactive slides");
assert(styles.includes('right: calc(100% + 30px)'), "English timeline labels are not fixed to the left of the marker");
console.log("caviar academy verification passed");
