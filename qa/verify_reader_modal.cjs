const path = require("path");
const { chromium } = require("playwright");

function rgbNumbers(color) {
  return (color.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isAqua([r, g, b]) {
  return r > 140 && r < 180 && g > 230 && b > 220;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  await page.goto(`file://${path.resolve(__dirname, "../zh/journal.html")}`, { waitUntil: "domcontentloaded" });
  const replacements = [
    ["zh-truffle", "世界鱼子酱版图：主要生产国与产业发展", "caviar-world-map.png", 9, "更加多元化的全球产业格局", "5 分钟阅读"],
    ["zh-service", "意大利鱼子酱市场：欧洲领先的生产中心与全球出口力量", "italian-caviar-market.png", 13, "鱼子酱产业发展的重要优势", "6 分钟阅读"],
    ["zh-malossol", "鱼子酱礼仪：如何优雅地品尝鱼子酱", "caviar-etiquette-service.png", 4, "不会因为食用过多而影响体验", "2 分钟阅读"],
  ];
  for (const [id, title, imageName, sectionCount, closing, readTime] of replacements) {
    const card = page.locator(`[data-reader-open="${id}"]`).first().locator("xpath=ancestor::*[contains(concat(' ', normalize-space(@class), ' '), ' lux-reader-card ')][1]");
    assert((await card.locator("h4").textContent()).trim() === title, `${id} card title was not replaced`);
    assert((await card.locator("img").getAttribute("src")).includes(imageName), `${id} card image was not replaced`);
    await page.locator(`[data-reader-open="${id}"]`).first().evaluate((node) => node.click());
    await page.waitForSelector(".lux-reader:not([hidden]) .lux-reader-layout");
    const articleState = await page.evaluate(() => {
      const root = document.querySelector(".lux-reader-body");
      const inlineHeadings = [...root.querySelectorAll(".lux-reader-inline-heading")];
      const indentQuote = root.querySelector(".lux-reader-indent-quote");
      return {
        title: root.querySelector("#lux-reader-title").textContent.trim(),
        image: root.querySelector(".lux-reader-cover img").src,
        sections: root.querySelectorAll(".lux-reader-copy .lux-reader-section:not(.lux-reader-section-opening)").length,
        text: root.querySelector(".lux-reader-copy").textContent,
        readTime: root.querySelector(".lux-reader-meta-grid span:nth-child(3)").textContent.trim(),
        toc: [...root.querySelectorAll(".lux-reader-toc a")].map((link) => link.textContent.trim()),
        inlineCount: inlineHeadings.length,
        inlineColors: inlineHeadings.map((node) => getComputedStyle(node).color),
        inlineWeights: inlineHeadings.map((node) => Number(getComputedStyle(node).fontWeight)),
        quoteLines: indentQuote?.querySelectorAll("p").length || 0,
        quoteIndent: indentQuote ? parseFloat(getComputedStyle(indentQuote).marginLeft) : 0,
        quoteBorder: indentQuote ? parseFloat(getComputedStyle(indentQuote).borderLeftWidth) : 0,
      };
    });
    assert(articleState.title === title, `${id} detail title was not replaced`);
    assert(articleState.image.includes(imageName), `${id} detail image was not replaced`);
    assert(articleState.sections === sectionCount, `${id} section count is wrong: ${articleState.sections}`);
    assert(articleState.text.includes(closing), `${id} detail article is incomplete`);
    assert(articleState.readTime === readTime, `${id} read time is wrong: ${articleState.readTime}`);
    if (id === "zh-truffle") assert(articleState.toc.join("|") === "中国|意大利|伊朗|法国|北美|俄罗斯|阿联酋|西班牙|全球化发展的鱼子酱产业", `world atlas toc is wrong: ${articleState.toc}`);
    if (id === "zh-service") {
      assert(articleState.inlineCount === 6, `caviar types are not six inline headings: ${articleState.inlineCount}`);
      assert(articleState.inlineColors.every((color) => color === "rgb(16, 16, 16)"), `caviar type headings are not black: ${articleState.inlineColors}`);
      assert(articleState.inlineWeights.every((weight) => weight >= 700), `caviar type headings are not bold: ${articleState.inlineWeights}`);
      assert(!articleState.toc.some((label) => ["Beluga", "Oscetra", "Sevruga", "白鲟鱼子酱", "西伯利亚鲟鱼子酱", "Kaluga"].includes(label)), "caviar types still appear in the toc");
      assert(articleState.quoteLines === 7 && articleState.quoteIndent > 0 && articleState.quoteBorder > 0, "sales channels are not an indented quote");
    }
    await page.locator(".lux-reader-close").evaluate((node) => node.click());
  }
  await page.locator('[data-reader-open="zh-malossol"]').first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader:not([hidden]) .lux-reader-layout");

  const result = await page.evaluate(() => {
    const layout = document.querySelector(".lux-reader-layout");
    const hero = document.querySelector(".lux-reader-hero");
    const content = document.querySelector(".lux-reader-content");
    const title = document.querySelector("#lux-reader-title");
    const heading = document.querySelector(".lux-reader-copy h3");
    const tocLink = document.querySelector(".lux-reader-toc a");
    const relatedCta = document.querySelector(".lux-reader-related-cta");
    const pullQuote = document.querySelector(".lux-reader-pull p");
    const firstParagraph = document.querySelector(".lux-reader-copy .lux-reader-section:first-child p:first-of-type");
    const closeButton = document.querySelector(".lux-reader-close");
    return {
      layoutBg: getComputedStyle(layout).backgroundColor,
      heroDisplay: getComputedStyle(hero).display,
      heroColumns: getComputedStyle(hero).gridTemplateColumns,
      contentDisplay: content ? getComputedStyle(content).display : "",
      titleFont: getComputedStyle(title).fontFamily,
      headingFont: getComputedStyle(heading).fontFamily,
      headingColor: getComputedStyle(heading).color,
      firstLetterColor: getComputedStyle(firstParagraph, "::first-letter").color,
      closeBg: getComputedStyle(closeButton).backgroundColor,
      closeColor: getComputedStyle(closeButton).color,
      pullFont: getComputedStyle(pullQuote).fontFamily,
      relatedCtaFont: getComputedStyle(relatedCta).fontFamily,
      pullFontSize: parseFloat(getComputedStyle(pullQuote).fontSize),
      relatedCtaFontSize: parseFloat(getComputedStyle(relatedCta).fontSize),
      tocCount: document.querySelectorAll(".lux-reader-toc a").length,
      tocFirst: tocLink?.textContent.trim(),
      relatedOpacity: getComputedStyle(relatedCta).opacity,
      relatedBorder: getComputedStyle(relatedCta).borderTopColor,
      relatedBg: getComputedStyle(relatedCta).backgroundColor,
      overflow: document.querySelector(".lux-reader-body").scrollWidth - document.querySelector(".lux-reader-body").clientWidth,
    };
  });

  const [r, g, b] = rgbNumbers(result.layoutBg);
  assert(r > 220 && g > 215 && b > 205, `reader background is not light: ${result.layoutBg}`);
  assert(result.heroDisplay === "grid", `reader hero is not grid: ${result.heroDisplay}`);
  assert(result.heroColumns.split(" ").length >= 2, `reader hero is not two-column: ${result.heroColumns}`);
  assert(result.contentDisplay === "grid", "reader content grid missing");
  assert(result.titleFont.includes("Alimama ShuHei"), `reader title font is not Alimama ShuHei: ${result.titleFont}`);
  assert(result.headingFont.includes("Alimama ShuHei"), `reader section heading font is not Alimama ShuHei: ${result.headingFont}`);
  const [headingR, headingG, headingB] = rgbNumbers(result.headingColor);
  assert(headingR < 10 && headingG > 90 && headingG < 130 && headingB > 80 && headingB < 120, `reader section heading color is not TrufflEat green: ${result.headingColor}`);
  const [letterR, letterG, letterB] = rgbNumbers(result.firstLetterColor);
  assert(letterR < 10 && letterG > 90 && letterG < 130 && letterB > 80 && letterB < 120, `reader drop cap color is not TrufflEat green: ${result.firstLetterColor}`);
  const [closeR, closeG, closeB] = rgbNumbers(result.closeBg);
  assert(!isAqua([closeR, closeG, closeB]), `reader close background should only be aqua on hover: ${result.closeBg}`);
  assert(!result.pullFont.includes("Alimama ShuHei"), `reader pull quote should use original font: ${result.pullFont}`);
  assert(!result.relatedCtaFont.includes("Alimama ShuHei"), `related CTA should use original font: ${result.relatedCtaFont}`);
  assert(result.pullFontSize <= 16, `reader pull quote should use original small size: ${result.pullFontSize}px`);
  assert(result.relatedCtaFontSize <= 16, `related CTA should use original small size: ${result.relatedCtaFontSize}px`);
  assert(result.tocCount >= 3, `reader toc is missing section links: ${result.tocCount}`);
  assert(result.tocFirst === "优雅与传统", `reader toc first item is wrong: ${result.tocFirst}`);
  assert(parseFloat(result.relatedOpacity) < 0.02, `related CTA should be hidden before hover: ${result.relatedOpacity}`);
  assert(rgbNumbers(result.relatedBorder).every((value) => value > 240), `related CTA default border should be white: ${result.relatedBorder}`);
  assert(rgbNumbers(result.relatedBg).every((value) => value < 10), `related CTA default background should be transparent/dark: ${result.relatedBg}`);
  assert(result.overflow <= 6, `reader modal has horizontal overflow: ${result.overflow}px`);

  await page.locator("[data-reader-related]").first().evaluate((node) => node.click());
  await page.waitForFunction(() => {
    const back = document.querySelector(".lux-reader-back");
    return back && !back.hidden;
  });
  const navSizes = await page.evaluate(() => {
    const back = document.querySelector(".lux-reader-back").getBoundingClientRect();
    const close = document.querySelector(".lux-reader-close").getBoundingClientRect();
    return { backWidth: back.width, backHeight: back.height, closeWidth: close.width, closeHeight: close.height };
  });
  assert(Math.abs(navSizes.backWidth - navSizes.closeWidth) <= 2, `close width should match back width: ${JSON.stringify(navSizes)}`);
  assert(Math.abs(navSizes.backHeight - navSizes.closeHeight) <= 2, `close height should match back height: ${JSON.stringify(navSizes)}`);

  await page.hover(".lux-reader-toc a");
  await page.waitForTimeout(220);
  const tocHover = await page.evaluate(() => getComputedStyle(document.querySelector(".lux-reader-toc a")).color);
  const [tocR, tocG, tocB] = rgbNumbers(tocHover);
  assert(tocR < 10 && tocG > 90 && tocG < 130 && tocB > 80 && tocB < 120, `reader toc hover color is not TrufflEat green: ${tocHover}`);

  await page.hover(".lux-reader-close");
  await page.waitForTimeout(220);
  const closeHover = await page.evaluate(() => getComputedStyle(document.querySelector(".lux-reader-close")).backgroundColor);
  const [closeHoverR, closeHoverG, closeHoverB] = rgbNumbers(closeHover);
  assert(isAqua([closeHoverR, closeHoverG, closeHoverB]), `reader close hover background is not aqua: ${closeHover}`);

  await page.locator(".lux-reader-related-media").first().hover({ position: { x: 24, y: 24 } });
  await page.waitForTimeout(220);
  const relatedImageHover = await page.evaluate(() => {
    const cta = document.querySelector(".lux-reader-related-cta");
    return {
      opacity: getComputedStyle(cta).opacity,
      bg: getComputedStyle(cta).backgroundColor,
    };
  });
  assert(parseFloat(relatedImageHover.opacity) > 0.98, `related CTA should appear on image hover: ${relatedImageHover.opacity}`);
  assert(rgbNumbers(relatedImageHover.bg).every((value) => value < 40), `related CTA image-hover background should stay dark: ${relatedImageHover.bg}`);

  await page.hover(".lux-reader-related-cta");
  await page.waitForTimeout(220);
  const relatedHover = await page.evaluate(() => {
    const cta = document.querySelector(".lux-reader-related-cta");
    return {
      bg: getComputedStyle(cta).backgroundColor,
      color: getComputedStyle(cta).color,
    };
  });
  const [hoverR, hoverG, hoverB] = rgbNumbers(relatedHover.bg);
  assert(isAqua([hoverR, hoverG, hoverB]), `related CTA hover background is not aqua: ${relatedHover.bg}`);

  await page.locator(".lux-reader-close").evaluate((node) => node.click());
  await page.locator("[data-reader-archive]").first().evaluate((node) => node.click());
  await page.waitForSelector(".lux-reader-archive-cta");
  const archiveDefault = await page.evaluate(() => {
    const cta = document.querySelector(".lux-reader-archive-cta");
    return {
      opacity: getComputedStyle(cta).opacity,
      border: getComputedStyle(cta).borderTopColor,
      bg: getComputedStyle(cta).backgroundColor,
    };
  });
  assert(parseFloat(archiveDefault.opacity) < 0.02, `archive CTA should be hidden before image hover: ${archiveDefault.opacity}`);

  const archiveMediaBox = await page.locator(".lux-reader-archive-media").first().boundingBox();
  await page.mouse.move(archiveMediaBox.x + 24, archiveMediaBox.y + 24);
  await page.waitForTimeout(220);
  const archiveImageHover = await page.evaluate(() => {
    const cta = document.querySelector(".lux-reader-archive-cta");
    return {
      opacity: getComputedStyle(cta).opacity,
      border: getComputedStyle(cta).borderTopColor,
      bg: getComputedStyle(cta).backgroundColor,
    };
  });
  assert(parseFloat(archiveImageHover.opacity) > 0.98, `archive CTA should appear on image hover: ${archiveImageHover.opacity}`);
  assert(rgbNumbers(archiveImageHover.border).every((value) => value > 240), `archive CTA image-hover border should be white: ${archiveImageHover.border}`);
  assert(rgbNumbers(archiveImageHover.bg).every((value) => value < 20), `archive CTA image-hover background should be transparent/dark: ${archiveImageHover.bg}`);

  await page.hover(".lux-reader-archive-cta");
  await page.waitForTimeout(220);
  const archiveHover = await page.evaluate(() => getComputedStyle(document.querySelector(".lux-reader-archive-cta")).backgroundColor);
  const [archiveHoverR, archiveHoverG, archiveHoverB] = rgbNumbers(archiveHover);
  assert(isAqua([archiveHoverR, archiveHoverG, archiveHoverB]), `archive CTA hover background is not aqua: ${archiveHover}`);

  await browser.close();
  console.log("reader modal verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
