const path = require("node:path");
const { chromium } = require("playwright");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();

  for (const viewport of [{ width: 1366, height: 900 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`file://${path.resolve(__dirname, "../zh/journal.html")}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".lux-about-story .lux-reader-layout");

    const placement = await page.evaluate(() => {
      const events = document.querySelector("[data-recent-events]");
      const about = document.querySelector("[data-about-story]");
      return !events && !document.querySelector(".lux-about-divider") && Boolean(about);
    });
    assert(placement, "about story still contains the removed image divider");
    assert(await page.locator('[data-reader-open="zh-about"]').count() === 0, "about story still requires a click");

    const result = await page.evaluate(() => {
      const story = document.querySelector(".lux-about-story");
      const images = [...story.querySelectorAll(".lux-about-image-button img")];
      const content = story.querySelector(".lux-about-content");
      const sampleImage = story.querySelector(".lux-reader-section-media img");
      const productButton = story.querySelector('[data-about-image-alt="LuxurEat 全球业务布局"]');
      const carousel = story.querySelector(".lux-about-carousel");
      const track = story.querySelector(".lux-about-carousel-track");
      const summary = story.querySelector(".lux-reader-summary");
      const firstGalleryImages = [...story.querySelectorAll("#lux-about-section-0 .lux-about-image-button img")];
      return {
        heading: story.querySelector(".lux-recent-events-head h2").textContent.trim(),
        title: story.querySelector(".lux-reader-hero-copy h2").textContent.trim(),
        sectionCount: story.querySelectorAll(".lux-reader-copy .lux-reader-section").length,
        imageCount: images.length,
        imagesLoaded: images.every((image) => image.complete && image.naturalWidth > 0),
        hasClosing: story.textContent.includes("让传统美食在新的市场和消费场景中持续焕发活力"),
        sideColumnCount: story.querySelectorAll(".lux-reader-aside, .lux-reader-pull, .lux-about-toc").length,
        contentColumns: getComputedStyle(content).gridTemplateColumns,
        imageBorder: parseFloat(getComputedStyle(sampleImage).borderTopWidth),
        titleBrandColor: getComputedStyle(story.querySelector(".lux-about-title-brand")).color,
        productBorder: parseFloat(getComputedStyle(productButton).borderTopWidth),
        productBackground: getComputedStyle(productButton).backgroundColor,
        storyBackground: getComputedStyle(story).backgroundColor,
        carouselCount: carousel.querySelectorAll("figure").length,
        carouselDisplay: getComputedStyle(track).display,
        carouselOverflow: track.scrollWidth - track.clientWidth,
        carouselScrollbar: getComputedStyle(track).scrollbarWidth,
        carouselHintContent: getComputedStyle(carousel, "::before").content,
        lucidePaths: [...carousel.querySelectorAll(".lux-about-carousel-arrow svg path")].map((path) => path.getAttribute("d")),
        captionCount: story.querySelectorAll("figcaption").length,
        summaryWidth: summary.getBoundingClientRect().width,
        trackBox: track.getBoundingClientRect().toJSON(),
        arrowBoxes: [...carousel.querySelectorAll(".lux-about-carousel-arrow")].map((arrow) => arrow.getBoundingClientRect().toJSON()),
        firstGalleryHeights: firstGalleryImages.map((image) => image.getBoundingClientRect().height),
        overflow: story.scrollWidth - story.clientWidth,
      };
    });

    assert(result.heading === "关于我们", `wrong section heading: ${result.heading}`);
    assert(result.title === "LuxurEat｜从意大利家族餐桌，到世界高端美食版图", `wrong title: ${result.title}`);
    assert(result.sectionCount === 4, `wrong section count: ${result.sectionCount}`);
    assert(result.imageCount === 8, `wrong image count: ${result.imageCount}`);
    assert(result.imagesLoaded, "one or more about images failed to load");
    assert(result.hasClosing, "article closing paragraph is missing");
    assert(result.sideColumnCount === 0, `about side columns still exist: ${result.sideColumnCount}`);
    assert(result.contentColumns.split(" ").length === 1, `about body is not a single text column: ${result.contentColumns}`);
    assert(result.imageBorder === 0, `about image frame still exists: ${result.imageBorder}px`);
    assert(result.titleBrandColor === "rgb(10, 186, 181)", `LuxurEat title is not Tiffany blue: ${result.titleBrandColor}`);
    assert(result.productBorder === 1, `product image frame was not restored: ${result.productBorder}px`);
    assert(result.productBackground === result.storyBackground, `product frame background does not match page: ${result.productBackground}`);
    assert(result.carouselCount === 3, `last gallery is not one three-image row: ${result.carouselCount}`);
    assert(result.carouselDisplay === "flex", `carousel track is not flex: ${result.carouselDisplay}`);
    assert(result.carouselOverflow > 0, "carousel does not have horizontal movement");
    assert(result.carouselScrollbar === "none", `carousel scrollbar is visible: ${result.carouselScrollbar}`);
    assert(result.carouselHintContent === "none", `carousel hint is still visible: ${result.carouselHintContent}`);
    assert(result.lucidePaths.join("|") === "m15 18-6-6 6-6|m9 18 6-6-6-6", `carousel arrows are not Lucide chevrons: ${result.lucidePaths}`);
    assert(result.captionCount === 0, `image captions still exist: ${result.captionCount}`);
    if (viewport.width > 1000) assert(result.summaryWidth > 500, `about summary did not widen: ${result.summaryWidth}px`);
    assert(result.arrowBoxes.every((box) => box.top < result.trackBox.bottom && box.bottom > result.trackBox.top), "carousel arrows are not in the image row");
    assert(result.arrowBoxes[0].right <= result.trackBox.left && result.arrowBoxes[1].left >= result.trackBox.right, "carousel arrows are not outside the images");
    assert(result.firstGalleryHeights.length === 2, `first gallery image count is wrong: ${result.firstGalleryHeights}`);
    assert(Math.abs(result.firstGalleryHeights[0] - result.firstGalleryHeights[1]) <= 2, `first gallery images do not have equal heights: ${result.firstGalleryHeights}`);
    assert(result.overflow <= 6, `about section has horizontal overflow at ${viewport.width}px: ${result.overflow}px`);

    const imageButton = page.locator(".lux-about-image-button").first();
    const viewLabel = imageButton.locator(":scope > span");
    await imageButton.hover();
    await page.waitForTimeout(220);
    const viewState = await page.evaluate(() => {
      const button = document.querySelector(".lux-about-image-button");
      const label = button.querySelector(":scope > span");
      const buttonBox = button.getBoundingClientRect();
      const labelBox = label.getBoundingClientRect();
      return {
        xOffset: Math.abs((labelBox.left + labelBox.width / 2) - (buttonBox.left + buttonBox.width / 2)),
        yOffset: Math.abs((labelBox.top + labelBox.height / 2) - (buttonBox.top + buttonBox.height / 2)),
        fontSize: getComputedStyle(label).fontSize,
        readerFontSize: getComputedStyle(document.querySelector(".lux-reader-cta")).fontSize,
      };
    });
    assert(viewState.xOffset < 2 && viewState.yOffset < 2, `view-large-image label is not centered: ${viewState.xOffset}, ${viewState.yOffset}`);
    assert(viewState.fontSize === viewState.readerFontSize, `view-large-image font does not match reader CTA: ${viewState.fontSize} / ${viewState.readerFontSize}`);
    await viewLabel.hover();
    await page.waitForTimeout(220);
    const viewHover = await viewLabel.evaluate((node) => ({
      background: getComputedStyle(node).backgroundColor,
      color: getComputedStyle(node).color,
    }));
    assert(viewHover.background === "rgb(10, 186, 181)", `view-large-image hover is not Tiffany blue: ${viewHover.background}`);
    assert(viewHover.color === "rgb(16, 16, 16)", `view-large-image hover text is not black: ${viewHover.color}`);

    const track = page.locator(".lux-about-carousel-track");
    const beforeScroll = await track.evaluate((node) => node.scrollLeft);
    await page.locator('[data-about-carousel-step="1"]').click();
    await page.waitForTimeout(450);
    const afterScroll = await track.evaluate((node) => node.scrollLeft);
    assert(afterScroll > beforeScroll, "carousel next arrow does not move the gallery");

    await page.locator('[data-about-image-alt="LuxurEat 全球业务布局"]').click();
    assert(await page.locator(".lux-about-lightbox[open]").count() === 1, "image lightbox did not open");
    const lightboxState = await page.evaluate(() => {
      const lightbox = document.querySelector(".lux-about-lightbox");
      const image = lightbox.querySelector("img");
      const lightboxRect = lightbox.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();
      return {
        background: getComputedStyle(lightbox).backgroundColor,
        border: parseFloat(getComputedStyle(lightbox).borderTopWidth),
        centerDelta: Math.abs((lightboxRect.left + lightboxRect.width / 2) - (imageRect.left + imageRect.width / 2)),
        imageName: image.src,
      };
    });
    assert(lightboxState.background === "rgb(244, 242, 238)", `lightbox background is still black: ${lightboxState.background}`);
    assert(lightboxState.border === 0, `lightbox frame still exists: ${lightboxState.border}px`);
    assert(lightboxState.centerDelta <= 2, `lightbox image is not centered: ${lightboxState.centerDelta}px`);
    assert(lightboxState.imageName.includes("about-global-map.png"), `wrong lightbox image: ${lightboxState.imageName}`);
    await page.locator("[data-about-lightbox-close]").hover();
    const closeHover = await page.locator("[data-about-lightbox-close]").evaluate((node) => getComputedStyle(node).backgroundColor);
    assert(closeHover === "rgb(0, 80, 75)", `lightbox close hover is not dark green: ${closeHover}`);
    if (viewport.width > 1000) {
      await page.locator(".lux-about-lightbox").screenshot({ path: "/tmp/luxureat-about-map-lightbox.png" });
    }
    await page.locator("[data-about-lightbox-close]").click();
    await track.evaluate((node) => node.scrollTo({ left: 0 }));

    if (viewport.width > 1000) {
      await page.locator(".lux-about-story").screenshot({ path: "/tmp/luxureat-about-desktop.png" });
    } else {
      await page.locator(".lux-about-story").screenshot({ path: "/tmp/luxureat-about-mobile.png" });
    }
    await page.close();
  }

  const english = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await english.goto(`file://${path.resolve(__dirname, "../en/journal.html")}`, { waitUntil: "domcontentloaded" });
  await english.waitForSelector(".lux-about-story .lux-reader-layout");
  const englishResult = await english.evaluate(() => {
    const story = document.querySelector(".lux-about-story");
    const track = story.querySelector(".lux-about-carousel-track");
    return {
      heading: story.querySelector(".lux-recent-events-head h2").textContent.trim(),
      title: story.querySelector(".lux-reader-hero-copy h2").textContent.trim(),
      sectionCount: story.querySelectorAll(".lux-reader-copy .lux-reader-section").length,
      imageCount: story.querySelectorAll("[data-about-image]").length,
      captionCount: story.querySelectorAll("figcaption").length,
      carouselHint: story.querySelector(".lux-about-carousel").dataset.carouselHint,
      carouselHintContent: getComputedStyle(story.querySelector(".lux-about-carousel"), "::before").content,
      trackBox: track.getBoundingClientRect().toJSON(),
      arrowBoxes: [...story.querySelectorAll(".lux-about-carousel-arrow")].map((arrow) => arrow.getBoundingClientRect().toJSON()),
      overflow: story.scrollWidth - story.clientWidth,
    };
  });
  assert(englishResult.heading === "About Us", `wrong English heading: ${englishResult.heading}`);
  assert(englishResult.title === "LuxurEat｜From an Italian Family Table to the Global Gourmet Landscape", `wrong English title: ${englishResult.title}`);
  assert(englishResult.sectionCount === 4, `wrong English section count: ${englishResult.sectionCount}`);
  assert(englishResult.imageCount === 8, `wrong English image count: ${englishResult.imageCount}`);
  assert(englishResult.captionCount === 0, `English image captions still exist: ${englishResult.captionCount}`);
  assert(englishResult.carouselHint === "Slide left or right", `wrong English carousel hint: ${englishResult.carouselHint}`);
  assert(englishResult.carouselHintContent === "none", `English carousel hint is still visible: ${englishResult.carouselHintContent}`);
  assert(englishResult.arrowBoxes.every((box) => box.top < englishResult.trackBox.bottom && box.bottom > englishResult.trackBox.top), "English carousel arrows are not in the image row");
  assert(englishResult.arrowBoxes[0].right <= englishResult.trackBox.left && englishResult.arrowBoxes[1].left >= englishResult.trackBox.right, "English carousel arrows are not outside the images");
  assert(englishResult.overflow <= 6, `English about section has horizontal overflow: ${englishResult.overflow}px`);
  await english.locator(".lux-about-story").screenshot({ path: "/tmp/luxureat-about-en-desktop.png" });
  await english.close();

  await browser.close();
  console.log("about section verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
