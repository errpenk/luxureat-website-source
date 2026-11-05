const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const runtime = fs.readFileSync('assets/js/core.js', 'utf8');
let click;
const images = [0, 1, 2, 3].map((index) => ({
  dataset: { storageImage: String(index) },
  classList: { toggle(name, active) { this.active = active; } },
}));
const buttons = [0, 1, 2, 3].map((index) => ({
  dataset: { storageIndex: String(index) },
  setAttribute(name, value) { this.pressed = value; },
  closest: () => gallery,
}));
const gallery = { querySelectorAll: (selector) => selector === '[data-storage-image]' ? images : buttons };
vm.runInNewContext(runtime.slice(runtime.indexOf('document.addEventListener("click"'), runtime.indexOf('const luxIsMobile')), {
  document: { addEventListener(type, listener) { click = listener; } },
});
for (const selected of [2, 0, 3, 1]) {
  click({ target: { closest: () => buttons[selected] } });
  images.forEach((image, index) => assert.equal(image.classList.active, index === selected));
  buttons.forEach((button, index) => assert.equal(button.pressed, String(index === selected)));
}
click({ target: { closest: () => null } });
const css = fs.readFileSync('integration.css', 'utf8');
assert.match(css, /@media \(min-width: 721px\)\s*{\s*\.lux-product-storage-gallery > picture:not\(\.is-active\) { display: none; }/);
assert.match(css, /\.lux-product-storage-thumbs button img { aspect-ratio: 1; }/);
assert.match(css, /\.lux-product-storage-thumbs button \{ display: block; min-width: 0; padding: 0; border: 2px solid transparent; border-radius: 0; background: transparent; cursor: pointer; line-height: 0; \}/);
assert.match(css, /\.lux-product-storage-thumbs button\[aria-pressed="true"\] { border-color: #005b50; }/);
for (const lang of ['zh', 'en']) {
  const directory = `.deploy/luxureat-static/pages/${lang}/product`;
  const pages = fs.readdirSync(directory);
  assert.equal(pages.length, 53);
  for (const page of pages) {
    const html = fs.readFileSync(`${directory}/${page}`, 'utf8');
    assert.equal((html.match(/data-storage-image=/g) || []).length, 4, page);
    assert.equal((html.match(/data-storage-index=/g) || []).length, 4, page);
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1, page);
  }
}
console.log('Storage gallery switching and 106 bilingual pages verified.');
