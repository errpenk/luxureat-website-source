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
      location: locationLink.textContent.trim(),
      mapQuery: new URL(locationLink.href).searchParams.get("q"),
      iconColor: getComputedStyle(icon).color,
    };
  });

  assert(result.title === "意大利奢味，广州相见。", `latest event title did not render: ${result.title}`);
  assert(result.location === expectedLocation, `latest event location mismatch: ${result.location}`);
  assert(result.mapQuery === expectedMapQuery, `latest event map query mismatch: ${result.mapQuery}`);
  const [r, g, b] = rgbNumbers(result.iconColor);
  assert(r <= 5 && g >= 100 && g <= 112 && b >= 94 && b <= 106, `latest event icon is not TrufflEat green: ${result.iconColor}`);

  await browser.close();
  console.log("latest event verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
