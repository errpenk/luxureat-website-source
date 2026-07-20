const { chromium } = require("playwright");
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const lang of ["zh", "en"]) {
      const page = await browser.newPage({ viewport });
      await page.goto(`${BASE_URL}/${lang}/news.html#event-cifie-changsha-2026`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".lux-reader:not([hidden]) .lux-event-reader");

      const result = await page.evaluate(() => {
        const reader = document.querySelector(".lux-reader-body");
        const title = document.querySelector(".lux-event-reader h2");
        const image = document.querySelector(".lux-event-reader-article figure img");
        const sectionTitle = document.querySelector(".lux-event-reader-copy h3");
        const indexImage = document.querySelector(".lux-event-reader-index button img");
        return {
          title: title?.textContent.trim(),
          image: image?.getAttribute("src"),
          sectionTitleFont: getComputedStyle(sectionTitle).fontFamily,
          indexImage: indexImage?.getAttribute("src"),
          indexImageFit: getComputedStyle(indexImage).objectFit,
          overflow: reader.scrollWidth - reader.clientWidth,
          sections: document.querySelectorAll(".lux-event-reader-copy section").length,
        };
      });

      assert(result.title?.includes(lang === "zh" ? "意大利风味" : "Italian flavor"), `${lang} event title is wrong`);
      assert(result.image?.includes("assets/media/events/cifie-changsha-2026-banner.webp"), `${lang} event preview image is wrong`);
      assert(result.indexImage?.includes("assets/media/events/cifie-changsha-2026.jpg"), `${lang} event index image should use the Changsha poster: ${result.indexImage}`);
      assert(result.indexImageFit === "contain", `${lang} event index image should show the complete poster: ${result.indexImageFit}`);
      assert(result.sectionTitleFont.includes("Alimama ShuHei"), `${lang} event section title should use Alimama ShuHei: ${result.sectionTitleFont}`);
      assert(result.sections === 3, `${lang} event article sections are incomplete`);
      assert(result.overflow <= 6, `${lang} event reader overflows by ${result.overflow}px at ${viewport.width}px`);
      await page.close();
    }
  }

  const home = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await home.goto(`${BASE_URL}/zh/index.html`, { waitUntil: "domcontentloaded" });
  const detailHref = await home.locator(".lux-event-detail-link").getAttribute("href");
  assert(detailHref === "news.html#event-cifie-changsha-2026", `home event link is wrong: ${detailHref}`);
  await home.close();

  await browser.close();
  console.log("event reader verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
