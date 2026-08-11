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
assert(titles.length === 51, `academy does not expose the complete topic order: ${titles.length}`);
for (const title of ["What is extra virgin olive oil?", "Choosing Olive Oil: What to Check First", "Olive Oil on an Empty Stomach: Nutrition, Tolerance and Myths", "Italian food is more than one flavour", "Italy's twenty regions: a map of the table", "How to Read a Food Ingredient List", "Italian Gelato: From Urban Tradition to Modern Craft"]) assert(titles.includes(title), `academy topic is missing: ${title}`);
assert(titles.includes("Italian Pizza Begins with the Dough"), "Pizza Academy topic is missing");
assert(Object.keys(data.articles).length === 102, "academy does not expose all articles in both languages");
const zhTitles = data.order.map((slug) => data.articles[`zh-academy-${slug}`]?.title);
assert(zhTitles.every((title, index) => title && title !== titles[index]), "Chinese article titles are not localized");
assert(!data.order.includes("gelato-professional") && !data.order.includes("gelato-media") && !data.order.includes("producer-awards"), "Removed academy placeholders are still published");
assert(data.articles["zh-academy-olive-nutrition"].title === "橄榄油的营养价值：从份量到饮食搭配", "Olive-oil nutrition title is stale");
for (const [topic, prefix, count] of [["gelato", "gelato", 4], ["nutrition", "nutrition", 4], ["culture", "culture", 8]]) {
  const slugs = data.order.filter((slug) => data.articles[`zh-academy-${slug}`]?.topic === topic);
  slugs.slice(0, count).forEach((slug, index) => {
    const cover = `${prefix}-cover-${String(index + 1).padStart(2, "0")}.webp`;
    assert(data.articles[`zh-academy-${slug}`].image.endsWith(cover), `${slug} does not use ${cover}`);
    assert(data.articles[`en-academy-${slug}`].image.endsWith(cover), `${slug} English cover is not synchronized`);
  });
}
assert(data.articles["zh-academy-pizza-fundamentals"].image.endsWith("pizza-cover-01.webp"), "Pizza fundamentals does not keep its original cover");
for (const slug of ["evo-vs-common-cooking-oil", "story-of-italian-evo", "evo-chocolate-dessert", "choose-use-store-evo", "china-italian-evo", "neapolitan-roman-pizza-styles", "story-of-italian-pizza", "modern-pinsa-romana", "pizza-pinsa-at-home", "china-pizza-pinsa"]) {
  assert(data.articles[`zh-academy-${slug}`].image.endsWith(".webp") && data.articles[`en-academy-${slug}`].image === data.articles[`zh-academy-${slug}`].image, `${slug} custom cover is not optimized and synchronized`);
}
assert(data.articles["zh-academy-clean-label"].title.startsWith("无添加标签"), "No-additives label title is stale");
assert(data.articles["zh-academy-ugolini-gelato-mix"].cta?.label === "了解新品 →", "Gelato product preview CTA is missing");
for (const slug of data.order.filter((slug) => ["olive", "pizza", "gelato", "nutrition"].includes(data.articles[`zh-academy-${slug}`]?.topic))) {
  const article = data.articles[`zh-academy-${slug}`];
  const readingText = [article.intro, ...(article.opening || []), ...(article.sections || []).flatMap(([, paragraphs]) => paragraphs)].join("").replace(/\s/g, "");
  assert(readingText.length >= 450, `${slug} does not contain a substantive Chinese article`);
}
const synchronizedTopics = new Set(["olive", "pizza", "gelato", "nutrition"]);
const synchronizedSlugs = data.order.filter((slug) => synchronizedTopics.has(data.articles[`zh-academy-${slug}`]?.topic));
assert(synchronizedSlugs.length === 34, `academy English synchronization scope is incomplete: ${synchronizedSlugs.length}`);
for (const slug of synchronizedSlugs) {
  const zhArticle = data.articles[`zh-academy-${slug}`];
  const enArticle = data.articles[`en-academy-${slug}`];
  assert(enArticle, `${slug} has no English article`);
  assert(enArticle.opening.every(Boolean) && enArticle.sections.every(([heading, paragraphs]) => heading && paragraphs.every(Boolean)), `${slug} English article contains an empty section`);
  const englishCopy = JSON.stringify(enArticle).replaceAll("露意膳", "");
  assert(!/[\u3400-\u9fff]/.test(englishCopy), `${slug} English article contains untranslated Chinese copy`);
}
for (const slug of data.order.filter((slug) => data.articles[`zh-academy-${slug}`]?.topic === "culture")) {
  const article = data.articles[`zh-academy-${slug}`];
  const readingText = [article.intro, ...(article.opening || []), ...(article.sections || []).flatMap(([, paragraphs]) => paragraphs)].join("").replace(/\s/g, "");
  assert(Math.ceil(readingText.length / 300) >= 4, `${slug} is shorter than a four-minute Chinese read`);
}
for (const slug of data.order.filter((slug) => data.articles[`en-academy-${slug}`]?.topic === "culture")) {
  const article = data.articles[`en-academy-${slug}`];
  const readingText = [article.intro, ...(article.opening || []), ...(article.sections || []).flatMap(([, paragraphs]) => paragraphs)].join(" ");
  const wordCount = (readingText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  assert(Math.ceil(wordCount / 200) >= 4, `${slug} is shorter than a four-minute English read`);
}
assert(data.articles["zh-academy-pairings-class"].title === "风味搭配：从质地到味觉的平衡", "Pairing article title is stale");
assert(data.articles["zh-academy-beluga-caviar"].title === "贝鲁迦鱼子酱", "Beluga Chinese title is not localized");
assert(data.articles["zh-academy-sevruga-caviar"].title === "闪光鲟鱼子酱", "Sevruga Chinese title is not localized");
assert(data.articles["zh-academy-beluga-caviar"].intro.includes("Beluga caviar") && data.articles["zh-academy-sevruga-caviar"].intro.includes("Sevruga caviar"), "Caviar English terminology is missing from its first Chinese body occurrence");
for (const slug of ["gelato-vs-ice-cream", "gelato-history", "ugolini-gelato-mix", "gelato-flavours"]) {
  const articleText = JSON.stringify(data.articles[`zh-academy-${slug}`]);
  assert(!/Gelato|Ice Cream|松露/.test(articleText), `${slug} retains prohibited Chinese Gelato-page wording`);
}

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
  assert(data.articles[`zh-academy-${slug}`].archive.length <= 8, `${slug} Chinese archive label is too long`);
}

for (const lang of ["zh", "en"]) {
  const html = read(`${lang}/blog.html`);
  assert(html.includes('id="caviar-academy"') && html.includes("data-academy-list") && html.includes("data-academy-search"), `${lang} Blog page is incomplete`);
  assert(html.includes(`class="active" href="blog.html">${lang === "zh" ? "知识博客" : "Blog"}</a>`), `${lang} Blog navigation is not active`);
  assert(html.includes("lux-academy-news-hero") && html.includes("min-h-[85vh]"), `${lang} Blog hero does not match Brand News`);
  assert(html.includes("../assets/media/academy/caviar-academy-hero.webp"), `${lang} Blog hero does not use the supplied photo`);
}
const zhBlog = read("zh/blog.html");
assert(zhBlog.includes("全部内容") && zhBlog.includes("<h2>知识、起源与工艺</h2>") && zhBlog.includes("橄榄油"), "Chinese academy introduction is not localized");
assert(read("assets/js/core.js").includes('"探索意大利", "?topic=culture"') && read("assets/js/core.js").includes('"营养与配料指南", "?topic=nutrition"'), "Chinese Blog submenu is incomplete");
assert(!read("assets/js/core.js").includes('"意大利美食学院", "?topic=academy"'), "Food Academy is still a separate Blog submenu");
assert(read("assets/js/core.js").includes('"披萨学院", "?topic=pizza"'), "Chinese Pizza Academy submenu is missing");
const runtime = read("assets/js/academy.js");
assert(runtime.includes('search.addEventListener("input"') && runtime.includes("data-reader-open") && runtime.includes("data-academy-topic-filter"), "academy search, topic filters or reader integration is missing");
assert(runtime.includes("const introCopy") && runtime.includes("introTitle.textContent") && runtime.includes("introSummary.textContent"), "academy topic introduction does not follow the active filter");
assert(runtime.includes('params.has("topic")') && runtime.includes("topicNav.getBoundingClientRect().top - headerOffset"), "Blog submenu links do not position the selected topic below the fixed header");
assert(!runtime.includes('["academy", copy.academy]') && !read("assets/data/academy.js").includes('topic: "academy"'), "Food Academy articles are not merged into Explore Italy");
assert(!runtime.includes("<small>Caviar Academy</small>"), "latest posts still display the Caviar Academy label");
assert(!runtime.includes('article.topic === "olive" ? "OLIO"') && runtime.includes('aria-label="${escapeHtml(article.title)}"></span>'), "academy synthetic covers still render text");
const readerRuntime = read("assets/js/journal.js");
assert(readerRuntime.includes('"知识博客"') && readerRuntime.includes("article.asideSummary"), "localized reader label or synopsis is missing");
assert(!readerRuntime.includes('article.topic === "olive" ? "OLIO"') && readerRuntime.includes('aria-label="${escapeHtml(article.title)}"></div>'), "reader synthetic covers still render text");
assert(readerRuntime.includes("article.archive || article.eyebrow"), "article cover captions do not use archive labels");
assert(readerRuntime.includes("item.archive || item.eyebrow"), "related articles do not use archive labels");
assert(readerRuntime.includes("paragraphs(opening, Boolean(article.slug))") && readerRuntime.includes("paragraphs(content, Boolean(article.slug))"), "knowledge-blog articles do not merge consecutive short lines into paragraphs");
const styles = read("integration.css");
assert(styles.includes(".lux-academy-card:hover .lux-reader-cta") && styles.includes("background: #89670f"), "academy cover hover treatment is missing");
assert(styles.includes(".lux-academy-latest button:hover img"), "latest-post hover treatment is missing");
assert(styles.includes("font: 700 14px/1.4 var(--lux-page-heading)") && styles.includes(".lux-academy-sidebar > label"), "academy sidebar headings do not share a font size");
assert(styles.includes('.lux-academy-latest h2 {\n  margin: 0 0 18px;\n  color: #686159;'), "latest-post title does not match the search-label color");
assert(styles.includes(":is(.lux-academy-count, .lux-academy-sidebar > label, .lux-academy-latest h2)") && styles.includes("var(--lux-zh-body, var(--lux-en-body)) !important"), "academy sidebar headings do not share the same locale body font");
assert(styles.includes(".lux-academy-reader .lux-reader-section-media img"), "academy inline-media cleanup is missing");
assert(styles.includes("[data-academy-item][hidden]"), "academy search results cannot be hidden");
assert(styles.includes(".lux-academy-topics") && styles.includes(".lux-home-topic-preview") && styles.includes(".lux-reader-cover-art.is-olive") && styles.includes(".lux-reader-cover-art.is-nutrition"), "topic styling is incomplete");
assert(!styles.includes(".lux-academy-reader.is-wide-cover .lux-reader-cover img {\n  mix-blend-mode"), "wide covers still darken the page background");
assert(styles.includes(".lux-about-story .lux-reader-section-media figure"), "about-page media containers are not cleaned up");
assert(styles.includes(".lux-about-story .lux-about-carousel-track figure"), "about-page carousel borders are not removed");
assert(styles.includes('--lux-zh-headline: "KingHwa Old Song Site"'), "Chinese headings do not use the complete KingHwa subset");
assert(styles.includes(".lux-reader-related-grid button.is-wide-cover img"), "related wide covers are still cropped");
assert(styles.includes('.lux-latest-event-slide[aria-hidden="true"]'), "homepage carousel does not fully hide inactive slides");
assert(styles.includes('right: calc(100% + 30px)'), "English timeline labels are not fixed to the left of the marker");
console.log("caviar academy verification passed");
