const { chromium } = require("playwright");
const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch();

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport });
      await page.goto(`${BASE_URL}/zh/index.html`, { waitUntil: "domcontentloaded" });
      await page.waitForSelector(".lux-home-harvest .lux-home-harvest-copy h2");

      const result = await page.evaluate(() => ({
        overflow: Math.max(...Array.from(document.querySelectorAll(".lux-home-editorial, .lux-home-maison"), (section) => section.scrollWidth - section.clientWidth)),
        sections: document.querySelectorAll(".lux-home-editorial").length,
        maisonSections: document.querySelectorAll(".lux-home-maison").length,
        maisonCards: document.querySelectorAll(".lux-home-maison-grid > a").length,
        maisonLinks: [...document.querySelectorAll(".lux-home-maison a")].map((node) => node.getAttribute("href")),
        maisonText: document.querySelector(".lux-home-maison").textContent.replace(/\s+/g, " "),
        facts: document.querySelectorAll(".lux-home-harvest-facts > div").length,
        services: document.querySelectorAll(".lux-home-gifting-service").length,
        harvestDisplay: getComputedStyle(document.querySelector(".lux-home-harvest .lux-home-editorial-frame")).display,
        harvestNumberBackplate: getComputedStyle(document.querySelector(".lux-home-harvest .lux-home-editorial-frame"), "::before").backgroundColor,
        title: document.querySelector(".lux-home-harvest-copy h2")?.textContent.trim(),
        coreTitle: [...document.querySelectorAll("h2")].find((node) => node.textContent.trim() === "核心甄选资产")?.textContent.trim(),
        coreCards: document.querySelectorAll('[data-product-open="zh-imperial-beluga"], [data-product-open="zh-royal-oscetra"], [data-product-open="zh-ice-server"]').length,
      }));

      assert(result.overflow <= 2, `zh editorial modules overflow by ${result.overflow}px at ${viewport.width}px`);
      assert(result.sections === 2, "zh home should have two editorial modules");
      assert(result.maisonSections === 1 && result.maisonCards === 3, "zh group overview is incomplete");
      assert(result.maisonText.includes("认证农场") && result.maisonText.includes("Royal Kaluga") && result.maisonText.includes("LuxurEat USA"), "zh source brand narrative is incomplete");
      assert(["journal.html#about-us", "gifting.html", "certification.html", "contact.html"].every((href) => result.maisonLinks.includes(href)), `zh group links are incomplete: ${result.maisonLinks}`);
      assert(result.facts === 2, "zh harvest should keep two facts");
      assert(result.services === 3, "zh gifting should keep three services");
      assert(result.harvestDisplay === "grid", "zh harvest editorial grid is missing");
      if (viewport.width >= 900) {
        assert(result.harvestNumberBackplate === "rgb(16, 16, 16)", `zh harvest number backplate is missing: ${result.harvestNumberBackplate}`);
      }
      assert(result.title === "我们的价值观", `zh values title is wrong: ${result.title}`);
      assert(result.coreTitle === "核心甄选资产" && result.coreCards === 3, "zh core selection module changed unexpectedly");
      await page.close();
  }

  const englishPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await englishPage.goto(`${BASE_URL}/en/index.html`, { waitUntil: "domcontentloaded" });
  assert(await englishPage.getByRole("heading", { name: "Our Values", exact: true }).count() === 1, "en values module is missing");
  assert(await englishPage.getByText("Global Partnership", { exact: true }).count() === 1, "en partnership module is missing");
  assert(await englishPage.locator(".lux-home-maison-grid > a").count() === 3, "en group overview is incomplete");
  assert(await englishPage.locator(".lux-home-editorial").count() === 0, "en home should keep its restored legacy layout");
  await englishPage.close();

  await browser.close();
  console.log("home editorial verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
