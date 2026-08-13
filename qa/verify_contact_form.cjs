const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const zh = read("zh/contact.html");
const en = read("en/contact.html");
const runtime = read("assets/js/brand.js");
const css = read("integration.css");
const themeBuilder = read("scripts/build-luxureat-theme.mjs");

for (const page of [zh, en]) {
  assert.match(page, /data-contact-form novalidate/);
  for (const name of ["name", "email", "inquiry_type", "message"]) {
    assert.match(page, new RegExp(`name="${name}"[^>]*required|required[^>]*name="${name}"`));
    assert.match(page, new RegExp(`data-contact-error="${name}"`));
  }
  assert.doesNotMatch(page, /name="phone"[^>]*required|required[^>]*name="phone"/);
  assert.equal((page.match(/lux-required-icon/g) || []).length, 4);
  assert.match(page, /lux-contact-services/);
  assert.match(page, /lux-contact-left/);
  assert.match(page, /lux-contact-business-card/);
  assert.match(page, /lux-global-footprint/);
}

for (const option of [
  "产品与采购咨询", "经销及渠道合作", "酒店餐饮与专业供应", "自有品牌与私人定制",
  "企业礼赠与项目合作", "品牌、媒体合作", "其他",
]) assert.ok(zh.includes(`<option value="${option}">${option}</option>`), `missing Chinese option: ${option}`);

assert.ok(zh.includes('class="font-headline-md text-secondary">产品与品鉴咨询'));
assert.ok(en.includes('class="font-headline-md text-secondary">Product & Tasting Consultation'));

assert.ok(runtime.includes('window.LuxureatContact'));
assert.ok(runtime.includes('mailto:errpenk@gmail.com'));
assert.ok(runtime.includes('data.get("name")') && runtime.includes('data.get("inquiry_type")') && runtime.includes('data.get("phone")'));
assert.ok(runtime.includes('["name", "email", "inquiry_type", "message"]'));
assert.ok(css.includes('.lux-contact-field-error.is-shaking'));
assert.ok(css.includes('.lux-required-icon'));
assert.ok(css.includes('.lux-contact-services li:hover'));
assert.ok(css.includes('font-size: 16px'));
assert.ok(css.includes('.lux-contact-main'));
assert.ok(css.includes('.lux-contact-left'));
assert.ok(css.includes('--lux-footprint-detail-size: var(--lux-type-body-sm, 13px)'));
assert.ok(css.includes('.lux-footprint-card > p:not(.lux-footprint-role)'));
assert.ok(themeBuilder.includes("wp_mail('errpenk@gmail.com'"));
assert.ok(themeBuilder.includes("wp_ajax_nopriv_luxureat_contact"));

console.log("Contact form verification passed.");
