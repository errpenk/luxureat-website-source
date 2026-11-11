const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const core = fs.readFileSync('assets/js/core.js', 'utf8');
let loads = 0;
let observer;
class Observer {
  constructor(callback) { this.callback = callback; observer = this; }
  observe() {}
  disconnect() { this.disconnected = true; }
}
const start = core.indexOf('  if (!luxIsMobile && "IntersectionObserver" in window) {');
const scheduling = core.slice(start, core.indexOf('  loadHomeEvents().catch', start));
for (const mobile of [false, true]) {
  observer = undefined;
  vm.runInNewContext(scheduling, { luxIsMobile: mobile, window: {IntersectionObserver: Observer}, IntersectionObserver: Observer,
    document: {querySelectorAll: () => [{}]}, loadDeferredScripts: () => { loads++; } });
  if (mobile) assert.equal(observer, undefined, 'Mobile catalog data remains click-to-load');
  else {
    assert.equal(loads, 0, 'Desktop catalog data must not compete with the initial media');
    observer.callback([{isIntersecting: false}], observer);
    assert.equal(loads, 0);
    observer.callback([{isIntersecting: true}], observer);
    assert.equal(loads, 1);
    assert.ok(observer.disconnected);
  }
}
const journal = fs.readFileSync('assets/js/journal.js', 'utf8');
const syncStart = journal.indexOf('  const syncReaderCards = () => {');
const syncCode = journal.slice(syncStart, journal.indexOf('  syncReaderCards();', syncStart) + '  syncReaderCards();'.length);
for (const changed of [false, true]) {
  const attrs = {src: 'https://example.test/original.webp?v=old', srcset: 'small.webp 720w, original.webp 1800w', sizes: 'auto, 100vw'};
  const image = {style: {}, get src() {return attrs.src;}, set src(value) {attrs.src=value;},
    getAttribute: key => attrs[key], hasAttribute: key => key in attrs,
    setAttribute: (key,value) => {attrs[key]=value;}, removeAttribute: key => {delete attrs[key];}};
  const node = {closest: () => null, matches: () => false, querySelector: selector => selector === 'img' ? image : null, querySelectorAll: () => []};
  const trigger = {dataset: {readerOpen: 'article'}, closest: selector => selector.includes('market-collage') ? null : node};
  const source = changed ? 'https://example.test/new.webp' : 'https://example.test/original.webp?v=current';
  vm.runInNewContext(syncCode, {URL, document: {baseURI: 'https://example.test/', querySelectorAll: () => [trigger]},
    articles: {article: {image: source, title: 'Current title'}}, window: {luxImageSource: (url, thumbnail) => thumbnail ? url.replace('new.webp','new-small.webp') : url}});
  assert.equal(image.alt, 'Current title');
  if (changed) {
    assert.equal(attrs.src, 'https://example.test/new-small.webp', 'Changed CMS images must replace stale candidates');
    assert.equal(attrs.srcset, undefined);
  } else {
    assert.equal(attrs.srcset, 'small.webp 720w, original.webp 1800w', 'Reader hydration must preserve native responsive candidates');
    assert.equal(attrs.sizes, 'auto, 100vw');
    assert.equal(attrs.src, 'https://example.test/original.webp?v=old', 'Hydration must not restart the same image download');
  }
}
console.log('Homepage catalog deferral and responsive card hydration passed.');
const products = fs.readFileSync('assets/js/products.js', 'utf8');
const catalog = {innerHTML: ''};
const product = {id:'test',title:'Example product',image:'full.webp',desc:'Original description',amount:1,unit:'jar'};
const productContext = vm.createContext({document:{documentElement:{lang:'en'},querySelector:()=>catalog},location:{pathname:'/product/'},
  window:{LUXUREAT_PRODUCT_DATA:{products:{'en-test':product}},luxImageSource:(source,thumbnail)=>thumbnail?'small.webp':source}});
vm.runInContext(products.slice(0,products.indexOf('window.luxResponsiveData')),productContext);
vm.runInContext(products.slice(products.indexOf('function renderLuxProductCatalog()'),products.indexOf('function syncLuxProductBindings()'))+'\nrenderLuxProductCatalog();',productContext);
assert.match(catalog.innerHTML, /<img[^>]+loading="lazy"[^>]+src="small\.webp"/, 'Paginated product images must use lazy preview downloads');
assert.doesNotMatch(catalog.innerHTML, /background-image/, 'Hidden catalog pages must not eagerly fetch CSS backgrounds');
assert.match(catalog.innerHTML, /data-product-open="en-test"/);
assert.equal(product.image,'full.webp','Product details keep their full-size source');
console.log('Product catalog lazy previews and full-size detail data passed.');
const filterButtons = ['all','caviar','truffle'].map(value => ({dataset:{caviarFilterGroup:'category',caviarFilter:value},attrs:{},classList:{toggle(){}},setAttribute(key,value){this.attrs[key]=value;},addEventListener(event,callback){this.click=callback;}}));
const activeFilters = {category:new Set(),type:new Set()};
const filterStart = products.indexOf('  filterButtons.forEach((button) => {');
vm.runInNewContext(products.slice(filterStart,products.indexOf('  search?.addEventListener',filterStart)),{filterButtons,activeFilters,activeButtonClasses:[],inactiveButtonClasses:[],applyFilter(){}});
filterButtons[1].click();
filterButtons[2].click();
assert.deepEqual([...activeFilters.category],['truffle'],'Selecting a category replaces the previous category');
assert.equal(filterButtons[1].attrs['aria-pressed'],'false');
filterButtons[2].click();
assert.deepEqual([...activeFilters.category],['truffle'],'Clicking the selected category keeps it selected');
filterButtons[0].click();
assert.equal(activeFilters.category.size,0,'All categories clears the single choice');
const urlStart=products.indexOf('  const requestedCategories =');
vm.runInNewContext(products.slice(urlStart,products.indexOf('  applyFilter();',urlStart)),{filterButtons,URLSearchParams,location:{search:'?category=missing,truffle&category=caviar'}});
assert.deepEqual([...activeFilters.category],['truffle'],'Legacy multi-category URLs select the first valid category');
console.log('Single category selection, repeated selection, reset and legacy URLs passed.');
