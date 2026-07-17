const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await page.goto(`${BASE_URL}/zh/rituals.html`, { waitUntil: "domcontentloaded" });
  const cards = await page.evaluate(() => ({
    pageText: document.body.innerText,
    ids: [...document.querySelectorAll('[data-reader-open^="zh-recipe-"]')].map((node) => node.dataset.readerOpen),
    craftImage: document.querySelector('[style*="craftsmanship-truffle-chef.png"]')?.style.backgroundImage || "",
    jumpLinks: [...document.querySelectorAll('.lux-recipe-jump-nav a')].map((node) => [node.textContent.replace(/↘/g, "").trim(), node.getAttribute("href")]),
    jumpTargets: ["breakfast", "first-courses", "main-courses", "desserts"].every((id) => Boolean(document.getElementById(id))),
  }));
  assert(cards.pageText.includes("早餐") && !cards.pageText.includes("配餐艺术"), "Chinese breakfast section title is wrong");
  assert(cards.ids.includes("zh-recipe-truffle-eggs") && cards.ids.includes("zh-recipe-truffle-toast"), "Chinese recipe cards are missing");
  assert(cards.craftImage.includes("craftsmanship-truffle-chef.png"), "craftsmanship image was not replaced");
  assert(cards.pageText.includes("从早餐到甜点") && cards.pageText.includes("LuxurEat以意大利食谱为脉络"), "Chinese recipe introduction was not updated");
  assert(cards.jumpLinks.map(([, href]) => href).join("|") === "#breakfast|#first-courses|#main-courses|#desserts", `Chinese recipe navigation is wrong: ${cards.jumpLinks}`);
  assert(cards.jumpTargets, "one or more Chinese recipe navigation targets are missing");

  await page.locator('[data-reader-open="zh-recipe-truffle-eggs"]').first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader:not([hidden]) .lux-recipe-reader");
  const egg = await page.evaluate(() => ({
    title: document.querySelector("#lux-reader-title")?.textContent.trim(),
    facts: document.querySelector(".lux-recipe-facts")?.textContent.replace(/\s+/g, " "),
    ingredients: [...document.querySelectorAll(".lux-recipe-ingredients li")].map((node) => node.textContent.trim()),
    steps: document.querySelectorAll(".lux-recipe-method li").length,
    image: document.querySelector(".lux-recipe-hero img")?.src,
    sectionMarkers: [...document.querySelectorAll(".lux-recipe-ingredients > span, .lux-recipe-method > span, .lux-recipe-nutrition header > span")].map((node) => node.textContent.trim()),
    ingredientBorder: getComputedStyle(document.querySelector(".lux-recipe-ingredients")).borderTopWidth,
    energyLabel: document.querySelector(".lux-recipe-nutrition dt")?.textContent.trim(),
  }));
  assert(egg.title === "松露鸡蛋", `wrong first recipe title: ${egg.title}`);
  assert(egg.facts.includes("10分钟") && egg.facts.includes("简单") && egg.facts.includes("1人份"), "first recipe facts are incomplete");
  assert(egg.ingredients.length === 4 && egg.steps === 4, "first recipe content is incomplete");
  assert(egg.image.endsWith("/assets/media/journal/recipe-truffle-eggs.png"), "first recipe image is wrong");
  assert(egg.sectionMarkers.length === 0, `recipe section markers were not removed: ${egg.sectionMarkers}`);
  assert(egg.ingredientBorder === "0px", `ingredient color bar was not removed: ${egg.ingredientBorder}`);
  assert(egg.energyLabel === "能量", `energy label was not corrected: ${egg.energyLabel}`);

  await page.locator(".lux-reader-close").evaluate((node) => node.click());
  await page.locator('[data-reader-open="zh-recipe-truffle-toast"]').first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader:not([hidden]) .lux-recipe-reader");
  const toast = await page.evaluate(() => ({
    title: document.querySelector("#lux-reader-title")?.textContent.trim(),
    ingredients: document.querySelectorAll(".lux-recipe-ingredients li").length,
    steps: document.querySelectorAll(".lux-recipe-method li").length,
    image: document.querySelector(".lux-recipe-hero img")?.src,
  }));
  assert(toast.title === "水煮蛋配松露烤面包片", `wrong second recipe title: ${toast.title}`);
  assert(toast.ingredients === 9 && toast.steps === 4, "second recipe content is incomplete");
  assert(toast.image.endsWith("/assets/media/journal/recipe-truffle-toast.png"), "second recipe image is wrong");

  await page.goto(`${BASE_URL}/en/rituals.html`, { waitUntil: "domcontentloaded" });
  const english = await page.evaluate(() => ({
    pageText: document.body.innerText,
    ids: [...document.querySelectorAll('[data-reader-open^="en-recipe-"]')].map((node) => node.dataset.readerOpen),
    jumpLinks: [...document.querySelectorAll('.lux-recipe-jump-nav a')].map((node) => node.getAttribute("href")),
  }));
  assert(english.pageText.includes("Breakfast") && !english.pageText.includes("Perfect Pairings"), "English breakfast section is not synchronized");
  assert(english.ids.includes("en-recipe-truffle-eggs") && english.ids.includes("en-recipe-truffle-toast"), "English recipe cards are missing");
  assert(english.pageText.includes("The LuxurEat Table") && english.jumpLinks.join("|") === "#breakfast|#first-courses|#main-courses|#desserts", "English recipe introduction or navigation is not synchronized");

  await page.goto(`${BASE_URL}/zh/rituals.html`, { waitUntil: "domcontentloaded" });
  const courses = await page.evaluate(() => {
    const cards = [...document.querySelectorAll(".lux-course-card")];
    const firstCopy = cards[0]?.querySelector(".lux-ceremony-copy");
    return {
      heading: [...document.querySelectorAll("h2")].map((node) => node.textContent.trim()),
      ids: cards.map((node) => node.dataset.readerOpen),
      images: cards.map((node) => node.querySelector(".lux-dark-photo-bg")?.style.backgroundImage),
      opacity: cards.map((node) => getComputedStyle(node.querySelector(".lux-dark-photo-bg")).opacity),
      filters: cards.map((node) => getComputedStyle(node.querySelector(".lux-dark-photo-bg")).filter),
      firstCopyOpacity: getComputedStyle(firstCopy).opacity,
      mushroomBorder: getComputedStyle(cards[3]).borderTopWidth,
    };
  });
  assert(courses.heading.includes("第一道主食") && !courses.heading.includes("仪式感"), "First Courses heading is wrong");
  assert(courses.ids.join("|") === "zh-recipe-truffle-tagliolini|zh-recipe-truffle-ravioli|zh-recipe-black-truffle-risotto|zh-recipe-mushroom-soup", `course order is wrong: ${courses.ids}`);
  assert(new Set(courses.opacity).size === 1 && new Set(courses.filters).size === 1, `course cover brightness is inconsistent: ${courses.opacity} / ${courses.filters}`);
  assert(courses.mushroomBorder === "0px", `mushroom soup border was not removed: ${courses.mushroomBorder}`);
  await page.locator(".lux-course-card").first().hover();
  await page.waitForTimeout(300);
  const firstHover = await page.locator(".lux-course-card").first().evaluate((node) => ({
    copyOpacity: getComputedStyle(node.querySelector(".lux-ceremony-copy")).opacity,
    imageOpacity: Number(getComputedStyle(node.querySelector(".lux-dark-photo-bg")).opacity),
    overlay: getComputedStyle(node, "::after").backgroundImage,
  }));
  assert(firstHover.copyOpacity === "0", `first card copy does not disappear on hover: ${firstHover.copyOpacity}`);
  assert(firstHover.imageOpacity > Number(courses.opacity[0]), `first course image does not brighten on hover: ${firstHover.imageOpacity}`);
  assert(firstHover.overlay.includes("0.42") && firstHover.overlay.includes("0.06"), `first course overlay was not lightened: ${firstHover.overlay}`);

  for (const [id, title, image] of [
    ["zh-recipe-truffle-tagliolini", "白松露或黑松露细面", "recipe-truffle-tagliolini.png"],
    ["zh-recipe-truffle-ravioli", "松露奶油酱馄饨", "recipe-truffle-ravioli.png"],
    ["zh-recipe-black-truffle-risotto", "黑松露烩饭", "recipe-black-truffle-risotto.png"],
    ["zh-recipe-mushroom-soup", "奶油蘑菇浓汤", "recipe-mushroom-soup.png"],
  ]) {
    await page.locator(`[data-reader-open="${id}"]`).first().evaluate((node) => node.click());
    await page.waitForSelector(".lux-reader:not([hidden]) .lux-recipe-reader");
    const detail = await page.evaluate(() => ({
      title: document.querySelector("#lux-reader-title")?.textContent.trim(),
      image: document.querySelector(".lux-recipe-hero img")?.src,
      ingredients: document.querySelectorAll(".lux-recipe-ingredients li").length,
      steps: document.querySelectorAll(".lux-recipe-method li").length,
    }));
    assert(detail.title === title, `wrong course title for ${id}: ${detail.title}`);
    assert(detail.image.endsWith(`/assets/media/journal/${image}`), `wrong course image for ${id}: ${detail.image}`);
    assert(detail.ingredients >= 7 && detail.steps >= 4, `course detail is incomplete for ${id}`);
    await page.locator(".lux-reader-close").evaluate((node) => node.click());
  }

  const mainCourses = await page.evaluate(() => ({
    heading: [...document.querySelectorAll("h2")].map((node) => node.textContent.trim()),
    ids: [...document.querySelectorAll(".lux-main-course-card")].map((node) => node.dataset.readerOpen),
    images: [...document.querySelectorAll(".lux-main-course-card .lux-dark-photo-bg")].map((node) => node.style.backgroundImage),
  }));
  assert(mainCourses.heading.includes("第二道主食"), "Chinese Main Courses heading is missing");
  assert(mainCourses.ids.join("|") === "zh-recipe-beef-carpaccio-scallop-truffle|zh-recipe-shrimp-tartare-truffle", `Main Courses order is wrong: ${mainCourses.ids}`);
  assert(mainCourses.images[0].includes("recipe-beef-carpaccio-scallop-truffle.png") && mainCourses.images[1].includes("recipe-shrimp-tartare-truffle.png"), "Main Courses cover images are wrong");

  for (const [id, title, ingredients, steps] of [
    ["zh-recipe-beef-carpaccio-scallop-truffle", "扇贝松露牛肉薄片", 8, 4],
    ["zh-recipe-shrimp-tartare-truffle", "脆爽蔬菜松露虾仁鞑靼", 9, 4],
  ]) {
    await page.locator(`[data-reader-open="${id}"]`).first().evaluate((node) => node.click());
    await page.waitForSelector(".lux-reader:not([hidden]) .lux-recipe-reader");
    const detail = await page.evaluate(() => ({
      title: document.querySelector("#lux-reader-title")?.textContent.trim(),
      ingredients: document.querySelectorAll(".lux-recipe-ingredients li").length,
      steps: document.querySelectorAll(".lux-recipe-method li").length,
    }));
    assert(detail.title === title && detail.ingredients === ingredients && detail.steps === steps, `Main Courses detail is incomplete for ${id}: ${JSON.stringify(detail)}`);
    await page.locator(".lux-reader-close").evaluate((node) => node.click());
  }

  const desserts = await page.evaluate(() => ({
    heading: [...document.querySelectorAll("h2")].map((node) => node.textContent.trim()),
    ids: [...document.querySelectorAll(".lux-dessert-card")].map((node) => node.dataset.readerOpen),
    offsets: [...document.querySelectorAll(".lux-dessert-card")].map((node) => node.getBoundingClientRect().top),
  }));
  assert(desserts.heading.includes("甜品"), "Chinese Desserts heading is missing");
  assert(desserts.ids.join("|") === "zh-recipe-sweet-bread-butter-caviar|zh-recipe-truffle-tiramisu", `Dessert order is wrong: ${desserts.ids}`);
  assert(desserts.offsets[0] > desserts.offsets[1], `Dessert cards are not arranged right-high/left-low: ${desserts.offsets}`);

  for (const [id, title, ingredients, steps] of [
    ["zh-recipe-sweet-bread-butter-caviar", "甜面包配黄油和鱼子酱", 4, 4],
    ["zh-recipe-truffle-tiramisu", "松露提拉米苏", 10, 5],
  ]) {
    await page.locator(`[data-reader-open="${id}"]`).first().evaluate((node) => node.click());
    await page.waitForSelector(".lux-reader:not([hidden]) .lux-recipe-reader");
    const detail = await page.evaluate(() => ({
      eyebrow: document.querySelector(".lux-recipe-intro > span")?.textContent.trim(),
      title: document.querySelector("#lux-reader-title")?.textContent.trim(),
      ingredients: document.querySelectorAll(".lux-recipe-ingredients li").length,
      steps: document.querySelectorAll(".lux-recipe-method li").length,
    }));
    assert(detail.eyebrow === "甜点食谱", `Dessert eyebrow is wrong for ${id}: ${detail.eyebrow}`);
    assert(detail.title === title && detail.ingredients === ingredients && detail.steps === steps, `Dessert detail is incomplete for ${id}: ${JSON.stringify(detail)}`);
    await page.locator(".lux-reader-close").evaluate((node) => node.click());
  }

  await page.goto(`${BASE_URL}/en/rituals.html`, { waitUntil: "domcontentloaded" });
  assert(await page.getByRole("heading", { name: "First Courses", exact: true }).count() === 1, "English First Courses heading is missing");
  assert(await page.getByRole("heading", { name: "Main Courses", exact: true }).count() === 1, "English Main Courses heading is missing");
  assert(await page.locator(".lux-main-course-card").count() === 2, "English Main Courses cards are incomplete");
  assert(await page.getByRole("heading", { name: "Desserts", exact: true }).count() === 1, "English Desserts heading is missing");
  assert(await page.locator(".lux-dessert-card").count() === 2, "English Desserts cards are incomplete");
  assert(await page.locator('[data-reader-open^="en-recipe-"]').count() >= 6, "English recipe synchronization is incomplete");

  await browser.close();
  console.log("breakfast recipe verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
