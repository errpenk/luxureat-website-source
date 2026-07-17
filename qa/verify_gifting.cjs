const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const assert = (condition, message) => { if (!condition) throw new Error(message); };

(async () => {
  const browser = await chromium.launch();
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`${BASE_URL}/zh/gifting.html`, { waitUntil: "domcontentloaded" });
    const result = await page.evaluate(() => ({
      text: document.body.textContent.replace(/\s+/g, " "),
      hero: document.querySelector("h1")?.textContent.replace(/\s+/g, "").trim(),
      sections: ["private-label", "core-services", "inquiry"].every((id) => document.getElementById(id)),
      oldB2BSection: Boolean(document.getElementById("b2b-partnership")),
      privateLabelCards: document.querySelectorAll("#private-label article").length,
      privateLabelCardClasses: [...document.querySelectorAll("#private-label article")].map((node) => node.className),
      privateLabelBackground: getComputedStyle(document.querySelector("#private-label > div")).backgroundImage,
      mailto: document.querySelector('#private-label a[href^="mailto:"]')?.getAttribute("href"),
      inquiryMailto: document.querySelector('#inquiry .lux-partner-card')?.getAttribute("href"),
      coreBackground: document.querySelector('#core-services [style*="value-ribbed-texture"]')?.getAttribute("style"),
      catalogueCards: [...document.querySelectorAll("[data-gift-grid] h4")].map((node) => node.textContent.trim()),
      catalogueImages: [...document.querySelectorAll("[data-gift-grid] img")].map((node) => node.getAttribute("src")),
      contactLinks: [...document.querySelectorAll('a[href="contact.html"]')].length,
      fullService: document.body.textContent.includes("Full Service"),
      catalogueBackground: getComputedStyle(document.querySelector(".lux-gift-catalogue-section")).backgroundImage,
      importerBackground: getComputedStyle(document.querySelector(".lux-importer-invite")).backgroundImage,
      importerCardBackgrounds: [...document.querySelectorAll(".lux-importer-invite-grid article")].map((node) => getComputedStyle(node).backgroundColor),
      importerIcons: document.querySelectorAll(".lux-importer-contact .lux-lucide").length,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }));
    assert(result.sections, "a gifting partnership section is missing");
    assert(result.hero === "定义商务共创的卓越标准", `gifting hero was not updated: ${result.hero}`);
    assert(!result.oldB2BSection, "the standalone two-path section should be removed");
    assert(result.privateLabelCards === 4, "the four private-label information cards should be present");
    assert(result.privateLabelCardClasses.every((name) => name.includes("backdrop-blur") && !name.includes("border-t")), "private-label cards should be frosted and have no colored top border");
    assert(result.privateLabelBackground.includes("gifting-global-partnership.png"), "private-label background was not applied");
    assert(result.coreBackground?.includes("value-ribbed-texture.png"), "gray texture is missing");
    assert(decodeURIComponent(result.mailto || "") === "mailto:china@luxureat.com?subject=LuxurEat 商务合作咨询", "custom project email subject is incorrect");
    assert(decodeURIComponent(result.inquiryMailto || "") === "mailto:china@luxureat.com?subject=LuxurEat 商务合作咨询", "inquiry card email subject is incorrect");
    assert(result.text.includes("全程安心交付"), "delivery wording was not updated");
    assert(!result.text.includes("全程冷链交付"), "old delivery wording remains");
    assert(["自有品牌与 OEM 生产", "批发采购", "进出口合作"].every((text) => result.text.includes(text)), "B2B content is incomplete");
    assert(!result.text.includes("两条合作路径"), "the old two-path heading remains");
    assert(!result.text.includes("索取价目表 →") && !result.text.includes("提交合作资料 →"), "old inquiry card links remain");
    assert(!result.text.includes("1000+") && !result.text.includes("商务响应时间") && !result.text.includes("24 小时内"), "old inquiry statistics or response wording remain");
    assert(result.catalogueCards.join("|") === "自有品牌 · OEM 生产|批发 · 专业采购|进出口 · 全球分销|餐饮 · 稳定供应|礼赠 · 品牌定制", `partnership catalogue is incomplete: ${result.catalogueCards}`);
    assert(result.catalogueImages.every((src, index) => src.includes(`gifting-partnership-0${index + 1}.png`)), "partnership catalogue images are out of order");
    assert(!result.fullService, "Full Service label still exists");
    assert(result.catalogueBackground.includes("gifting-catalogue-texture.png"), "figure 8 is missing from the partnership catalogue");
    assert(result.importerBackground.includes("gifting-importer-partnership.png"), "figure 3 is missing from the importer section");
    assert(result.importerCardBackgrounds.every((value) => value === "rgba(0, 0, 0, 0)"), "the importer cards still have white boxes");
    assert(result.importerIcons === 2, "Lucide email and phone icons are missing");
    assert(result.overflow <= 6, `gifting page overflows by ${result.overflow}px at ${viewport.width}px`);
    await page.close();
  }
  await browser.close();
  console.log("gifting verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
