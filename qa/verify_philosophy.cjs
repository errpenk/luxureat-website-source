const path = require("path");
const { chromium } = require("playwright");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const fileUrl = (relativePath) => `file://${path.resolve(__dirname, relativePath)}`;

  await page.goto(fileUrl("../zh/journal.html"), { waitUntil: "domcontentloaded" });
  const featured = await page.locator("#featured").evaluate((root) => {
    const card = root.querySelector(".lux-reader-card");
    const copy = root.querySelector(".lg\\:col-span-5");
    return {
      image: card.querySelector("img").src,
      imagePosition: getComputedStyle(card.querySelector("img")).objectPosition,
      eyebrow: copy.querySelector("span").textContent.trim(),
      title: copy.querySelector("h2").textContent.trim(),
      text: copy.querySelector("p").textContent.replace(/\s+/g, " ").trim(),
    };
  });
  assert(featured.image.includes("luxureat-philosophy.png"), `featured image is wrong: ${featured.image}`);
  assert(featured.imagePosition === "50% 58%", `featured card crop changed unexpectedly: ${featured.imagePosition}`);
  assert(featured.eyebrow === "品牌传承", `featured eyebrow is wrong: ${featured.eyebrow}`);
  assert(featured.title === "本味之道", `featured title is wrong: ${featured.title}`);
  assert(featured.text.includes("传承意大利工艺") && featured.text.includes("LuxurEat以传统为根"), "featured summary is incomplete");

  await page.locator('[data-reader-open="zh-harvest"]').first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader:not([hidden]) .lux-reader-layout");
  const detail = await page.evaluate(() => {
    const root = document.querySelector(".lux-reader-body");
    const article = window.LUXUREAT_ARTICLE_DATA.articles["zh-harvest"];
    const contentText = (item) => typeof item === "string" ? item : item?.lines?.join("") || item?.text || "";
    const plainText = [article.intro, ...(article.opening || []), ...article.sections.flatMap(([, content]) => content.map(contentText))].join(" ");
    const expectedTime = `${Math.max(1, Math.ceil(plainText.replace(/\s/g, "").length / 300))} 分钟阅读`;
    return {
      title: root.querySelector("#lux-reader-title").textContent.trim(),
      image: root.querySelector(".lux-reader-cover img").src,
      coverPosition: getComputedStyle(root.querySelector(".lux-reader-cover img")).objectPosition,
      toc: [...root.querySelectorAll(".lux-reader-toc a")].map((node) => node.textContent.trim()),
      headings: [...root.querySelectorAll(".lux-reader-copy .lux-reader-section:not(.lux-reader-section-opening) h3")].map((node) => node.textContent.trim()),
      quoteLines: [...root.querySelectorAll(".lux-reader-indent-quote")].map((node) => node.querySelectorAll("p").length),
      quoteText: [...root.querySelectorAll(".lux-reader-indent-quote")].map((node) => node.textContent),
      boldTerms: [...root.querySelectorAll(".lux-reader-indent-quote strong")].map((node) => node.textContent.trim()),
      text: root.querySelector(".lux-reader-copy").textContent,
      readTime: root.querySelector(".lux-reader-meta-grid span:nth-child(3)").textContent.trim(),
      expectedTime,
    };
  });
  assert(detail.title === "LuxurEat的理念与哲学", `detail title is wrong: ${detail.title}`);
  assert(detail.image.includes("luxureat-philosophy.png"), `detail image is wrong: ${detail.image}`);
  assert(detail.coverPosition === "50% 0%", `philosophy cover is not top-aligned: ${detail.coverPosition}`);
  assert(detail.toc.join("|") === "我们的理念|我们的哲学", `detail toc is wrong: ${detail.toc}`);
  assert(detail.headings.join("|") === "我们的理念|我们的哲学", `detail headings are wrong: ${detail.headings}`);
  assert(detail.quoteLines.join("|") === "6|8", `quote grouping is wrong: ${detail.quoteLines}`);
  assert(detail.quoteText[0].includes("传统") && detail.quoteText[0].includes("创新") && detail.quoteText[0].includes("可持续性"), "vision quote is incomplete");
  assert(detail.quoteText[1].includes("历史") && detail.quoteText[1].includes("甄选") && detail.quoteText[1].includes("健康") && detail.quoteText[1].includes("永续"), "philosophy quote is incomplete");
  assert(detail.boldTerms.join("|") === "传统|创新|可持续性|历史|甄选|健康|永续", `philosophy terms are not bold: ${detail.boldTerms}`);
  assert(detail.text.includes("既传承意大利传统，又具有前瞻性视野的美食体验"), "detail article is incomplete");
  assert(detail.readTime === detail.expectedTime, `read time is not content-aware: ${detail.readTime} / ${detail.expectedTime}`);

  await page.goto(fileUrl("../zh/index.html"), { waitUntil: "domcontentloaded" });
  const home = await page.locator(".lux-home-harvest").evaluate((root) => ({
    title: root.querySelector("h2").textContent.trim(),
    text: root.querySelector(".lux-home-harvest-copy > p").textContent.trim(),
    image: root.querySelector("img").src,
    cta: root.querySelector(".lux-narrative-link").textContent.trim(),
    href: root.querySelector(".lux-narrative-link").getAttribute("href"),
  }));
  assert(home.title === "我们的价值观", `homepage values title is wrong: ${home.title}`);
  assert(home.text.includes("意大利美食文化") && home.text.includes("生物多样性"), "homepage values copy is incomplete");
  assert(home.image.includes("/assets/media/brand/home-values-truffle.jpg"), `homepage harvest image changed: ${home.image}`);
  assert(home.cta.includes("探索品牌理念") && home.href === "journal.html#about-us", `homepage values link is wrong: ${home.cta} / ${home.href}`);

  await page.goto(fileUrl("../en/journal.html"), { waitUntil: "domcontentloaded" });
  const englishFeatured = await page.locator("#featured").evaluate((root) => ({
    image: root.querySelector(".lux-reader-card img").src,
    eyebrow: root.querySelector(".lg\\:col-span-5 span").textContent.trim(),
    title: root.querySelector(".lg\\:col-span-5 h2").textContent.trim(),
  }));
  assert(englishFeatured.image.includes("luxureat-philosophy.png"), "English featured image is wrong");
  assert(englishFeatured.eyebrow === "Brand Heritage", `English eyebrow is wrong: ${englishFeatured.eyebrow}`);
  assert(englishFeatured.title === "The Way of True Flavor", `English title is wrong: ${englishFeatured.title}`);
  await page.locator('[data-reader-open="en-harvest"]').first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader:not([hidden]) .lux-reader-layout");
  const englishDetail = await page.evaluate(() => ({
    title: document.querySelector("#lux-reader-title").textContent.trim(),
    toc: [...document.querySelectorAll(".lux-reader-toc a")].map((node) => node.textContent.trim()),
    quotes: document.querySelectorAll(".lux-reader-indent-quote").length,
  }));
  assert(englishDetail.title === "The Philosophy and Values of LuxurEat", `English detail title is wrong: ${englishDetail.title}`);
  assert(englishDetail.toc.join("|") === "Our Vision|Our Philosophy", `English toc is wrong: ${englishDetail.toc}`);
  assert(englishDetail.quotes === 2, `English quote grouping is wrong: ${englishDetail.quotes}`);

  await browser.close();
  console.log("philosophy article verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
