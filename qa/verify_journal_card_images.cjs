const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const runtime = fs.readFileSync('assets/js/journal.js', 'utf8');
const attributes = new Map([
  ['srcset', 'wrong-cover.webp 720w'], ['sizes', '100vw'],
  ['data-lux-mobile-src', 'wrong-mobile.webp'], ['data-lux-src', 'wrong-lazy.webp'],
]);
const image = {style:{}, removeAttribute(name) { attributes.delete(name); }, hasAttribute:(name)=>attributes.has(name), setAttribute:(name,value)=>attributes.set(name,value)};
const card = {
  closest:()=>null, matches:()=>false,
  querySelector:(selector)=>selector === 'img' ? image : null,
  querySelectorAll:()=>[],
};
const trigger = {dataset:{readerOpen:'en-service'}, closest:(selector)=>selector === '.lux-home-market-collage' ? null : card};
vm.runInNewContext(runtime.slice(runtime.indexOf('  const syncReaderCards ='), runtime.indexOf('  syncReaderCards();') + '  syncReaderCards();'.length), {
  Set, articles:{'en-service':{image:'italian-caviar-market.webp',title:'Italian Caviar Market'}},
  document:{querySelectorAll:()=>[trigger]},
});
assert.equal(image.src, 'italian-caviar-market.webp');
assert.equal(attributes.size, 1, 'Stale responsive sources must not override the selected article cover');
assert.equal(attributes.get('data-lux-src'), image.src, 'Pending lazy loading must use the corrected cover');
console.log('Journal cards clear stale responsive and deferred cover sources.');
