const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const QA_DIR = __dirname;

function fail(message) {
  throw new Error(message);
}

async function expectVisible(page, selector, label) {
  const locator = page.locator(selector).first();
  const count = await locator.count();
  if (!count) fail(`${label} missing`);
  const box = await locator.boundingBox();
  if (!box || box.width < 1 || box.height < 1) fail(`${label} not visible`);
}

async function expectNoOfficialModules(page, label) {
  const count = await page.locator(".lux-modules").count();
  if (count !== 0) fail(`${label} shows prototype module cards`);
}

async function expectNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 6) fail(`${label} has horizontal overflow of ${overflow}px`);
}

async function inspectOfficialPage(page, url, screenshotName, label) {
  await page.goto(`${BASE_URL}${url}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);
  await expectVisible(page, ".lux-header", `${label} header`);
  await expectVisible(page, ".lux-footer", `${label} footer`);
  await expectNoOfficialModules(page, label);
  await expectNoHorizontalOverflow(page, label);
  await page.screenshot({ path: path.join(QA_DIR, screenshotName), fullPage: true });
}

async function main() {
  fs.mkdirSync(QA_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  await inspectOfficialPage(page, "/zh/index.html", "zh-home-desktop.png", "Chinese desktop home");
  const desktopFlyout = page.locator(".lux-nav-item").nth(1).locator(".lux-nav-flyout");
  await page.locator(".lux-nav-item").nth(1).hover();
  await desktopFlyout.hover();
  if (!await desktopFlyout.isVisible()) fail("desktop flyout disappears when moving into its links");

  await page.locator(".lux-lang a", { hasText: "EN" }).click();
  await page.waitForURL("**/en/index.html");
  await expectVisible(page, ".lux-header", "English switched header");
  await expectVisible(page, ".lux-footer", "English switched footer");
  await expectNoOfficialModules(page, "English switched home");
  await page.screenshot({ path: path.join(QA_DIR, "en-home-desktop.png"), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/zh/index.html`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);
  await expectNoHorizontalOverflow(page, "Chinese mobile home");
  await page.locator(".lux-menu").click();
  const isOpen = await page.locator(".lux-nav").evaluate((node) => node.classList.contains("open"));
  if (!isOpen) fail("mobile menu did not open");
  if (await page.locator(".lux-nav-flyout:visible").count()) fail("mobile submenus should start collapsed");
  await page.locator(".lux-nav-toggle").nth(1).click();
  if (await page.locator(".lux-nav-flyout:visible").count() !== 1) fail("mobile submenu accordion did not open exactly one section");
  await page.screenshot({ path: path.join(QA_DIR, "zh-home-mobile-menu.png"), fullPage: true });

  await inspectOfficialPage(page, "/zh/caviar.html", "zh-caviar-mobile.png", "Chinese mobile caviar");
  const productHero = await page.locator(".lux-products-main .lux-dark-photo-bg").first().evaluate((node) => getComputedStyle(node).backgroundImage);
  if (!productHero.includes("products-hero-caviar.jpg")) fail("Chinese product hero image is missing");
  await inspectOfficialPage(page, "/en/certification.html", "en-certification-mobile.png", "English mobile certification");

  await browser.close();
  console.log(`visual verification passed; screenshots written to ${QA_DIR}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
