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
  assert(result.tocFirst === "低盐的边界", `reader toc first item is wrong: ${result.tocFirst}`);
  assert(result.relatedOpacity === "1", `related CTA should be visible before hover: ${result.relatedOpacity}`);
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

  await page.hover(".lux-reader-related-grid button");
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
