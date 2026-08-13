const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:8000";
const expected = [
  "OU Kosher",
  "Demeter",
  "CITES",
  "Excellent Taste 2025",
  "Eccellenze Italiane 2025",
  "FDA",
  "HACCP",
  "Vegan",
  "USDA Organic",
  "Halal",
  "EU Organic",
  "BRCGS",
  "IFS",
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});

  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    await page.goto(`${BASE_URL}/zh/certification.html`, { waitUntil: "domcontentloaded" });
    const certificationCards = page.locator(".lux-cert-card");
    for (let index = 0; index < await certificationCards.count(); index += 1) {
      await certificationCards.nth(index).scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(() => [...document.querySelectorAll(".lux-cert-card img")].every((image) => image.complete && image.naturalWidth > 0));
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => ({
      title: document.querySelector("h1")?.textContent.replace(/\s+/g, "").trim(),
      names: [...document.querySelectorAll("[data-certification]")].map((node) => node.dataset.certification),
      logos: [...document.querySelectorAll("[data-certification]")].map((node) => node.querySelectorAll("img").length),
      backCopies: [...document.querySelectorAll("[data-certification]")].map((node) => {
        const face = node.querySelector(".lux-cert-card-back");
        const faceRect = face.getBoundingClientRect();
        return {
          name: node.dataset.certification,
          front: node.querySelector(".lux-cert-card-front p")?.textContent.trim(),
          back: face.querySelector("p")?.textContent.trim(),
          visible: getComputedStyle(face.querySelector("p")).display !== "none",
          fits: [...face.children].every((child) => {
            const childRect = child.getBoundingClientRect();
            return childRect.top >= faceRect.top - 1 && childRect.bottom <= faceRect.bottom + 1;
          }),
        };
      }),
      headings: [...document.querySelectorAll("main h2")].map((node) => node.textContent.replace(/\s+/g, "").trim()),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    }));

    assert(result.title === "品质承诺与权威认证", `certification title changed: ${result.title}`);
    assert(result.names.join("|") === expected.join("|"), `certification list is incomplete: ${result.names}`);
    assert(result.logos.every((count) => count === 2), `a certification card is missing a front or back logo: ${result.logos}`);
    assert(result.backCopies.every(({ front, back }) => front && front === back), "a certification card back is missing its complete description");
    if (viewport.width <= 640) {
      assert(result.backCopies.every(({ visible }) => visible), "certification descriptions are hidden on mobile card backs");
      assert(result.backCopies.every(({ fits }) => fits), `certification descriptions overflow on mobile: ${result.backCopies.filter(({ fits }) => !fits).map(({ name }) => name).join(", ")}`);
    }
    assert(result.headings.includes("责任采购与全球合规"), "responsible sourcing section was not updated");
    assert(result.headings.includes("全球品质体系：从产地到市场"), "global quality section was not updated");
    assert(result.headings.includes("认证体系：传统品质的现代证明"), "certification philosophy section was not updated");
    assert(result.overflow <= 6, `certification page overflows by ${result.overflow}px at ${viewport.width}px`);

    const firstCard = page.locator(".lux-cert-card").first();
    await firstCard.focus();
    await page.waitForTimeout(750);
    const flipped = await firstCard.locator(".lux-cert-card-inner").evaluate((node) => getComputedStyle(node).transform);
    assert(flipped !== "none", `certification card did not flip at ${viewport.width}px`);
    await page.close();
  }

  await browser.close();
  console.log("certification verification passed");
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
