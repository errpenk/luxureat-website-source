const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const core = fs.readFileSync('assets/js/core.js', 'utf8');
const images = [
  {src:'desktop.webp', srcset:'small.webp 720w, desktop.webp 1600w', dataset:{luxMobileSrc:'small.webp?v=current'}, closest:()=>null},
  {src:'desktop.webp', srcset:'', dataset:{luxMobileSrc:'small.webp?v=current'}, closest:()=>({})},
  {src:'', srcset:'', dataset:{luxSrc:'desktop.webp',luxMobileSrc:'small.webp?v=current'}, closest:()=>null},
  {src:'desktop.webp', srcset:'', dataset:{luxMobileSrc:'small.webp?v=current'}, closest:()=>null},
];
const context = vm.createContext({URL, window:{LUXUREAT_IMAGE_VARIANTS:{'media/test.webp':'media/test-720.webp'}}, navigator:{},
  matchMedia:()=>({matches:true}), document:{currentScript:{src:'https://example.test/assets/js/core.js'},baseURI:'https://example.test/',querySelectorAll:()=>images}});
vm.runInContext(core.slice(core.indexOf('const luxIsMobile'),core.indexOf('window.luxResponsiveData =')),context);
const start = core.indexOf('if (luxIsMobile) {\n  document.querySelectorAll("img[data-lux-mobile-src]")');
vm.runInContext(core.slice(start,core.indexOf('const luxLazyImages',start)),context);
assert.equal(images[0].src,'desktop.webp','Native responsive selection must not restart');
assert.equal(images[0].srcset,'small.webp 720w, desktop.webp 1600w');
assert.equal(images[1].src,'desktop.webp','Picture sources must remain native');
assert.equal(images[2].src,'','Offscreen image must stay deferred');
assert.equal(images[2].dataset.luxSrc,'small.webp?v=current');
assert.equal(images[3].src,'small.webp?v=current','Legacy fallback must preserve the exact version URL');
assert.equal(context.window.luxImageSource('https://example.test/assets/media/test.webp?v=current'),'https://example.test/assets/media/test-720.webp?v=current');
const titles=JSON.parse(fs.readFileSync('scripts/seo-titles.json','utf8'));
for(const [route,title] of Object.entries(titles)) assert.ok((title+' | LuxurEat').length<=70,route);
console.log('Native responsive images, deferred fallback and search title budgets passed.');
