const { chromium } = require("playwright");
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.goto(`${BASE_URL}/zh/caviar.html#product-zh-imperial-beluga`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".lux-product-detail:not([hidden]) .lux-product-qty");

  const plus = page.locator('.lux-product-qty [data-product-quantity="1"]');
  const before = await plus.evaluate((button) => ({
    color: getComputedStyle(button).color,
    background: getComputedStyle(button).backgroundColor,
  }));
  await plus.hover();
  await page.waitForTimeout(250);
  const after = await plus.evaluate((button) => ({
    color: getComputedStyle(button).color,
    background: getComputedStyle(button).backgroundColor,
  }));

  assert(after.color === "rgb(0, 106, 100)", `quantity plus hover should use the bag teal: ${after.color}`);
  assert(after.background === "rgb(215, 222, 219)", `quantity plus hover should use the bag surface: ${after.background}`);
  assert(after.color !== before.color, `quantity plus hover color should change: ${before.color} -> ${after.color}`);
  await browser.close();
  console.log("product quantity hover verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
