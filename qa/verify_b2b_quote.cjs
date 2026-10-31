const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

for (const lang of ["zh", "en"]) {
  const cooperation = read(`${lang}/cooperation.html`);
  const contact = read(`${lang}/contact.html`);
  assert.doesNotMatch(cooperation, /class="lux-quote-hero-cta"/);
  assert.match(cooperation, /class="lux-contact-form lux-quote-form lg:w-1\/2" data-contact-form novalidate/);
  assert.match(cooperation, /class="lux-quote-submit"/);
  assert.equal((cooperation.match(/class="lux-required-star"/g) || []).length, 7);
  for (const name of ["name", "company", "email", "phone", "product_industry", "estimated_quantity", "delivery_market", "target_date", "inquiry_type", "message", "form_context", "website"]) {
    assert.match(cooperation, new RegExp(`name="${name}"`), `${lang} B2B quote form is missing ${name}`);
  }
  for (const name of ["company", "product_industry", "estimated_quantity", "delivery_market"]) {
    assert.match(cooperation, new RegExp(`name="${name}"[^>]*required`), `${lang} B2B quote form should require ${name}`);
  }
  assert.match(cooperation, /lux-quote-wechat[^>]*><img[^>]+wechat-qr\.webp[^>]+><span class="lux-wechat-copy"><span lang="(?:zh|en)">(?:更多详情与合作细节，也可搜索我们的微信号：|More details or more information, you can also search for our WeChat ID:)<\/span><b lang="en">LuxurEatChina<\/b><\/span>/);
  assert.match(contact, /class="lux-contact-b2b-cta" href="cooperation\.html#inquiry"/);
  assert.match(contact, /class="lux-contact-b2b-action"/);
}

const builder = read("scripts/build-luxureat-theme.mjs");
assert.ok(builder.includes("'zh/cooperation', 'en/cooperation'"), "quote pages do not receive the contact form nonce");
assert.ok(builder.includes("$estimated_quantity") && builder.includes("$delivery_market") && builder.includes("$is_b2b_quote"), "quote-specific fields are not handled by the server");
const runtime = read("assets/js/brand.js");
assert.ok(runtime.includes('"estimated_quantity", "delivery_market"') && runtime.includes("const quoteDetails = isQuoteForm"), "quote-specific fields are not validated or included in fallback email");
assert.ok(runtime.includes('contactRequired: "请填写电子邮箱或电话/微信其中一种。"') && runtime.includes('email?.value') && runtime.includes('phone?.value'), "quote form does not allow either email or phone / WeChat contact");
const products = read("assets/js/products.js");
assert.ok(products.includes('class="lux-product-wechat"') && products.includes('src="${luxWechatQrUrl}"') && products.includes('More details or more information, you can also search for our WeChat ID:') && products.includes('更多详情与合作细节，也可搜索我们的微信号：') && products.includes('<b lang="en">LuxurEatChina</b>') && products.includes('lux-product-quote-link') && products.includes('detailHref("cooperation", "inquiry")'));
const css = read("integration.css");
assert.ok(css.includes(".lux-product-wechat") && css.includes(".lux-quote-wechat") && css.includes('font: 700 17px/1.3 "Spectral", serif;') && css.includes("#8a6500"));
assert.ok(css.includes(".lux-wechat-copy") && css.includes("text-transform: none;"), "WeChat ID should retain its mixed-case spelling");
assert.ok(css.includes('var(--lux-zh-body, "LuxurEat ZhiSong Site")'));
assert.ok(css.includes("b2b-quotation-team.webp") && css.includes(".lux-quote-copy") && css.includes("position: sticky"));
assert.ok(css.includes(".lux-quote-submit") && css.includes("rgba(157,245,236,.58)") && css.includes("place-content: center start"), "quote submit area is not vertically centered, left aligned, or glowing");
assert.ok(css.includes(".lux-contact-b2b-action") && css.includes("place-items: center start"), "contact B2B CTA is not vertically centered and left aligned");
assert.ok(css.includes(".lux-reader-layout .lux-reader-hero") && css.includes(".lux-event-reader-index > div") && css.includes("border-bottom: 0"), "reader and event title dividers are not simplified");
assert.ok(css.includes("#core-services > .absolute:first-child") && css.includes("mix-blend-mode: screen"), "core services does not use the black contrast texture treatment");
console.log("B2B quote verification passed.");
