const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

for (const lang of ["zh", "en"]) {
  const html = read(`${lang}/new.html`);
  assert(html.includes("lux-page-top-hero lux-hero-tail lux-standard-hero"), `${lang}/new.html does not use the shared page hero`);
  assert(html.includes("assets/media/new-arrivals/hero-italy.webp"), `${lang}/new.html is missing the supplied hero image`);
  assert(html.includes("lux-new-hero-shade"), `${lang}/new.html is missing the black hero overlay`);
  for (const layout of ["lux-new-filmstrip", "lux-new-space", "lux-new-categories", "lux-new-about", "lux-chef-advice", "lux-new-menu", "lux-new-features"]) {
    assert(html.includes(layout), `${lang}/new.html is missing ${layout}`);
  }
  for (const topic of ["olive-oil", "pizza", "gelato"]) {
    assert(html.includes(`id="${topic}"`), `${lang}/new.html is missing #${topic}`);
  }
  assert(!html.includes('<button type="button" disabled>'), `${lang}/new.html still shows disabled purchase actions`);
  const productsPage = lang === "zh" ? "product.html" : "product.html";
  for (const category of ["olive-oil", "pizza", "gelato"]) {
    assert(html.includes(`href="${productsPage}?category=${category}#product-catalogue"`), `${lang}/new.html is missing the ${category} purchase link`);
  }
  for (const topic of ["olive", "pizza", "gelato"]) {
    assert(html.includes(`href="blog.html#${topic}-academy"`), `${lang}/new.html is missing the ${topic} academy link`);
  }
  for (const image of ["chef-olive-oil.webp", "chef-pizza.webp", "chef-gelato.webp", "feature-origin.webp", "feature-foodservice.webp", "feature-supply.webp"]) {
    assert(html.includes(`assets/media/new-arrivals/${image}`), `${lang}/new.html is missing ${image}`);
  }
  for (let index = 1; index <= 5; index += 1) assert(html.includes(`assets/media/new-arrivals/brand-purpose-0${index}.`), `${lang}/new.html is missing brand-purpose-0${index}`);
  const mosaicImages = [...html.matchAll(/\bsrc="[^"]*brand-purpose-(0\d)\.(?:jpg|webp)"/g)].map((match) => match[1]);
  assert(mosaicImages.join(",") === "04,05,03,01,02", `${lang}/new.html brand-purpose image order is incorrect`);
  const discovery = html.match(/<section class="lux-new-discovery"[\s\S]*?<\/section>\s*<\/main>/)?.[0] || "";
  assert(discovery && !discovery.includes("<a "), `${lang}/new.html discovery layouts must not contain additional UI links`);
  assert((html.match(/data-chef-slide/g) || []).length === 3, `${lang}/new.html must provide three rotating chef recommendations`);
  assert(html.includes("data-chef-prev") && html.includes("data-chef-next") && !html.includes("data-chef-count"), `${lang}/new.html must use side arrows without the deleted chef counter pill`);
  assert(!html.includes("data-cert-media-carousel") && !html.includes("data-cert-media-prev") && !html.includes("data-cert-media-next"), `${lang}/new.html still contains the deleted product image carousels`);
  assert((html.match(/<video data-lux-autoplay muted loop playsinline preload="none"/g) || []).length === 2, `${lang}/new.html mosaic videos are not deferred`);
  assert((html.match(/lux-new-product-visual/g) || []).length === 3, `${lang}/new.html must provide three static product visuals`);
  assert((html.match(/lux-new-product-visual" tabindex="0"/g) || []).length === 3, `${lang}/new.html product visuals must reveal captions on keyboard or tap focus`);
  assert((html.match(/lux-filmstrip-icon/g) || []).length === 4 && (html.match(/<figure tabindex="0">/g) || []).length === 4, `${lang}/new.html must provide four keyboard-accessible Lucide flip cards`);
  assert(html.indexOf("lux-new-menu") < html.indexOf("lux-new-list"), `${lang}/new.html production-line cards must follow the editorial intro`);
  assert(html.includes("professionalism and perseverance"), `${lang}/new.html is missing the shared professionalism and perseverance label`);
  assert(!html.includes("lux-new-welcome"), `${lang}/new.html still contains the deleted welcome layout`);
  assert(html.includes("assets/js/new-arrivals.js"), `${lang}/new.html is missing the chef carousel script`);
}
const zh = read("zh/new.html");
const en = read("en/new.html");
assert(!zh.includes("Pizza") && !zh.includes("Gelato") && !zh.includes("意式披萨"), "Chinese new arrivals still use Pizza, Gelato or 意式披萨");
assert(zh.includes("披萨") && zh.includes("意式手工冰淇淋"), "Chinese product names are not fully localized");
assert(zh.includes("手工工艺的真材实料") && !zh.includes("低温里的真实原料"), "Chinese Gelato craft message is not updated");
assert(!zh.includes("开心果") && !en.toLowerCase().includes("pistachio"), "new-arrivals copy still names a specific Gelato flavour ingredient");
assert(zh.includes("LuxurEat（露意膳）") && en.includes("LuxurEat (露意膳)"), "localized LuxurEat brand suffixes are missing");
assert((zh.match(/厨师建议 · 专注餐饮/g) || []).length === 3 && (en.match(/CHEF'S NOTES · FOODSERVICE FOCUS/g) || []).length === 3, "chef recommendation foodservice labels are missing");
for (const keyword of ["产地严选", "专业验证", "耐心精筛", "手工匠心"]) assert(zh.includes(`<strong>${keyword}</strong>`), `Chinese flip-card keyword is missing ${keyword}`);
const styles = read("integration.css");
const pageStyles = read("assets/css/new-arrivals.css");
assert(pageStyles.includes(".lux-new-feature.is-reversed figure") && pageStyles.includes(".lux-new-actions"), "new-arrivals editorial layout or action styling is missing");
assert(pageStyles.includes(".lux-new-copy { color: #191917; }") && pageStyles.includes(".lux-new-actions { display: flex") && pageStyles.includes("background: #004b47; color: #fff"), "new-arrivals product copy or action UI is missing");
assert(pageStyles.includes(".lux-new-actions > :is(button, a):hover") && pageStyles.includes("border-color: #004b47; background: #9df5ec; color: #004b47"), "new-arrivals actions do not preserve their border with the Tiffany hover treatment");
assert(pageStyles.includes(".lux-new-product-visual { position: relative; isolation: isolate; overflow: hidden; }") && pageStyles.includes(".lux-new-product-visual > img { display: block; width: 100%; height: 100%; object-fit: cover"), "new-arrivals product images do not cover their masked containers");
assert(!pageStyles.includes(".lux-new-product-visual::after { opacity: .72") && !pageStyles.includes(".lux-new-product-visual figcaption { opacity: 1; transform: none;"), "mobile product captions are forced visible instead of using tap focus");
assert(pageStyles.includes("background: #fff") && pageStyles.includes("color: #004b47"), "new-arrivals full-width white canvas or deep-green accents are missing");
assert(styles.includes(".lux-header :is(.lux-bag-link, .lux-account-link) { display: none !important; }"), "shopping bag and account controls are not hidden");
assert(pageStyles.includes("background: #0f0f10") && pageStyles.includes("data-chef") === false, "new-arrivals black sections are missing");
assert(pageStyles.includes("grid-template-rows: 205px minmax(0, 1fr)") && pageStyles.includes("grid-template-rows: 180px calc((100vw - 16px) / 3)") && pageStyles.includes("height: 100%; object-fit: cover"), "about mosaic does not use browser-stable fixed rows");
assert(pageStyles.includes(".lux-chef-advice-stage { display: grid") && pageStyles.includes(".lux-chef-advice-slide[hidden] { display: grid !important; visibility: hidden; pointer-events: none; }"), "chef carousel height is not locked to its tallest slide");
const carousel = read("assets/js/new-arrivals.js");
assert(carousel.includes("setInterval") && carousel.includes("data-chef-slide"), "chef recommendations do not rotate automatically");
assert(carousel.includes("data-chef-prev") && carousel.includes("data-chef-next"), "chef recommendation controls are not wired");
assert(carousel.includes('classList.toggle("is-in-view", isIntersecting)') && carousel.includes("is-auto-flipped"), "new-arrivals repeatable scroll reveal or automatic flip interaction is missing");
for (const id of ["olive-bruschetta", "pizza-margherita", "gelato-classic"]) assert(zh.includes(`data-reader-open="zh-recipe-${id}"`), `Chinese recommended recipe interaction is missing ${id}`);
assert((zh.match(/阅读详情/g) || []).length === 3, "Chinese recommended recipes must provide three detail actions");
for (const productCopy of ["橄榄油产品目录（以实际库存和标签为准）", "披萨产品目录（以实际库存和标签为准）", "意式手工冰淇淋产品目录（以实际库存和标签为准）"]) assert(read("assets/data/journal.js").includes(productCopy), `New-arrivals recipe product link is missing ${productCopy}`);
assert(styles.includes(".lux-recipe-product-link .lux-lucide") && !read("assets/css/rituals.css").includes(".lux-recipe-product-link"), "Recipe product-link UI is not shared across reader pages");
assert(read("assets/css/rituals.css").includes(".lux-recipe-theme-card > div > span { display: none; }"), "Recipe cards still show their gold category labels");
assert(pageStyles.includes("pointer-events: none") && pageStyles.includes("article:hover .lux-new-recipe-cta"), "recommended recipe details are not hover-revealed");
assert(pageStyles.includes(".lux-new-features article strong") && (pageStyles.match(/font: 500 clamp\(28px, 2\.8vw, 40px\)\/1\.1/g) || []).length >= 2, "feature and recipe titles do not share the same type size");
assert((pageStyles.match(/font: 400 18px\/1\.75/g) || []).length >= 3, "feature, recipe and about copy do not share the same type size");
assert(pageStyles.includes("color: #81d8d0") && pageStyles.includes(".lux-chef-side-nav"), "Tiffany recipe label or side-arrow chef navigation is missing");
assert(pageStyles.includes("color: #81d8d0 !important") && pageStyles.includes("-webkit-text-stroke: 0") && pageStyles.includes("text-shadow: none"), "recipe label does not render as unaltered Tiffany blue");
assert(pageStyles.includes(".lux-new-space span { font: 400 18px/1.75"), "Italian flavour-space copy does not match the about-copy size");
assert(pageStyles.includes("transform: rotateY(180deg)") && pageStyles.includes(".lux-filmstrip-icon") && pageStyles.includes("background: #76551f"), "deep-gold Lucide flip-card treatment is missing");
assert(pageStyles.includes(".lux-new-categories::before") && pageStyles.includes("top: 280px") && pageStyles.includes("width: 100vw"), "about-section background does not rise behind the midpoint of the 560px recipe cards");
assert(pageStyles.includes("--lux-new-soft-bg: #e5e5df") && pageStyles.includes(".lux-new-reveal.is-in-view"), "deeper soft background or repeatable reveal styling is missing");
assert(pageStyles.includes("box-shadow: 0 96px 0 var(--lux-new-soft-bg)") && pageStyles.includes("aspect-ratio: 1.08 / 1"), "soft transition band or mobile square cards are missing");
assert(pageStyles.includes("counter-reset: lux-new-line") && pageStyles.includes('content: "0" counter(lux-new-line)') && pageStyles.includes("border-right: 2px solid #76551f"), "production-line editorial card decoration is missing");
assert(pageStyles.includes("width: min(1280px, calc(100% - 48px))") && pageStyles.includes("min-height: 527px") && pageStyles.includes("height: 248px; aspect-ratio: auto"), "production-line cards are not widened with a stable minimum height");
assert(pageStyles.includes("width: 100%; height: 100%; object-fit: cover; object-position: center"), "production-line images do not fully cover their media frames");
assert(pageStyles.includes(".lux-new-features article::after") && pageStyles.includes("inset: -1px") && pageStyles.includes("linear-gradient(to top, #0f0f10 0 18%") && pageStyles.includes(".lux-new-features article img { position: absolute; z-index: 0; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover"), "feature-card images, masks or black lower edge are incomplete");
assert(pageStyles.includes("font-size: 15px !important") && pageStyles.includes("min-width: 150px"), "new-arrivals actions are not uniformly enlarged");
assert(pageStyles.includes("html[lang^=\"en\"] body.lux-new-page .lux-header nav.lux-nav > .lux-nav-item > a { font-size: 13px !important; }"), "English header navigation does not match the locale size");
console.log("new arrivals verification passed");
