const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const expectedLocation = "广州保利世贸展览馆";
const expectedMapQuery = "广州市海珠区琶洲街道新港东路1000号保利世界贸易中心";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function rgbNumbers(color) {
  return (color.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`${BASE_URL}/zh/index.html`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-latest-event] .lux-event-meta");

  const result = await page.evaluate(() => {
    const section = document.querySelector("[data-latest-event]");
    const locationLink = section.querySelector(".lux-event-meta");
    const icon = locationLink.querySelector(".lux-lucide");
    return {
      title: section.querySelector("h2")?.textContent.trim(),
      poster: section.querySelector(".lux-event-frame img")?.getAttribute("src"),
      location: locationLink.textContent.trim(),
      mapQuery: new URL(locationLink.href).searchParams.get("q"),
      iconColor: getComputedStyle(icon).color,
    };
  });

  assert(result.title === "意大利奢味，广州相见。", `latest event title did not render: ${result.title}`);
  assert(result.poster.endsWith("/assets/media/events/marca-china-2026-home.jpeg"), `home event poster should use the full Marca poster: ${result.poster}`);
  assert(result.location === expectedLocation, `latest event location mismatch: ${result.location}`);
  assert(result.mapQuery === expectedMapQuery, `latest event map query mismatch: ${result.mapQuery}`);
  const [r, g, b] = rgbNumbers(result.iconColor);
  assert(r <= 5 && g >= 100 && g <= 112 && b >= 94 && b <= 106, `latest event icon is not TrufflEat green: ${result.iconColor}`);

  const detailHref = await page.locator("[data-latest-event] .lux-event-detail-link").getAttribute("href");
  assert(detailHref === "news.html#event-marca-china-2026", `event detail does not target Brand News: ${detailHref}`);
  await page.goto(`${BASE_URL}/zh/news.html#event-marca-china-2026`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".lux-event-reader-article figure img");
  const readerImage = await page.locator(".lux-event-reader-article figure img").first().getAttribute("src");
  assert(readerImage.endsWith("/assets/media/events/marca-china-2026.png"), `event article detail image should stay unchanged: ${readerImage}`);

  await browser.close();
  console.log("latest event verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
