import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const store = new Map();
const context = {
  URL,
  document: {
    documentElement: { lang: 'en' },
    body: { appendChild() {} },
    head: { appendChild() {} },
    addEventListener() {},
    createElement() {
      return {
        classList: { toggle() {} },
        setAttribute() {},
        addEventListener() {},
      };
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
  },
  window: {
    addEventListener() {},
    scrollTo() {},
    scrollY: 0,
  },
  history: {},
  location: { href: 'https://example.com/en/caviar.html', origin: 'https://example.com', pathname: '/en/caviar.html', search: '' },
  localStorage: {
    getItem(key) {
      return store.get(key) ?? null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  },
  sessionStorage: {
    getItem(key) {
      return store.get(key) ?? null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
  },
  requestAnimationFrame(callback) {
    callback();
  },
  setTimeout,
};

vm.createContext(context);
context.window.LuxureatWooCatalog = {
  products: {
    'imperial-beluga-30g': {
      name: 'Woo Beluga',
      price: 999,
      currency: '¥',
      image: 'https://example.com/woo-beluga.jpg',
      gallery: [],
      stockStatus: 'outofstock',
      stockQuantity: 0,
      available: false,
      maxQuantity: 0,
    },
  },
};
vm.runInContext(fs.readFileSync('assets/data/products.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('assets/js/products.js', 'utf8'), context);

const bag = context.window.LuxureatBag;
assert.equal(typeof bag?.add, 'function');
const syncedProduct = context.window.LUXUREAT_PRODUCT_DATA.products['en-imperial-beluga'];
assert.equal(syncedProduct.amount, 999);
assert.equal(syncedProduct.currency, '¥');
assert.equal(syncedProduct.image, 'https://example.com/woo-beluga.jpg');
assert.equal(syncedProduct.available, false);

bag.add({ id: 'beluga-30g', title: 'Imperial Beluga', price: 350, currency: '$' });
bag.add({ id: 'beluga-30g', title: 'Imperial Beluga', price: 350, currency: '$' });
assert.equal(store.has('luxureatBag'), false, 'guest bags must not persist in browser storage');
assert.equal(store.has('luxureat_guest_bag'), true, 'guest bags survive navigation only in session storage');
assert.equal(bag.items()[0].quantity, 2);
assert.equal(bag.subtotal(), 700);

bag.change('beluga-30g', -1);
assert.equal(bag.items()[0].quantity, 1);
bag.change('beluga-30g', -1);
assert.equal(bag.items()[0].quantity, 1);
assert.equal(bag.items().length, 1);

bag.remove('beluga-30g');
assert.equal(bag.items().length, 0);

bag.add({ id: 'oscetra-30g', title: 'Royal Oscetra', price: 180, currency: '$', quantity: 99 });
assert.equal(bag.items()[0].quantity, 99);
bag.change('oscetra-30g', 1);
assert.equal(bag.items()[0].quantity, 99);
