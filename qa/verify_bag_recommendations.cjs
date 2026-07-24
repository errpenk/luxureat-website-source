const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE_URL}/zh/bag.html`, { waitUntil: "domcontentloaded" });

  await page.locator('.lux-bag-recommendations [data-bag-id="zh-champagne"]').evaluate((node) => node.click());
  await page.locator('.lux-bag-recommendations [data-bag-id="zh-ice-server"]').evaluate((node) => node.click());

  const items = await page.evaluate(() => window.LuxureatBag.items());
  const champagne = items.find((item) => item.id === "zh-champagne");
  const iceServer = items.find((item) => item.id === "zh-ice-server");

  assert(champagne, "champagne recommendation was not added");
  assert(iceServer, "ice-server recommendation was not added");
  assert(champagne.image.includes("lux-042.jpg"), `champagne image should be its own bottle image, got ${champagne.image}`);
  assert(iceServer.image.includes("lux-039.jpg"), `ice-server image should be its own server image, got ${iceServer.image}`);

  await browser.close();
  console.log("bag recommendation verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
