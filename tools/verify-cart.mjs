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
vm.runInContext(fs.readFileSync('main.js', 'utf8'), context);

const bag = context.window.LuxureatBag;
assert.equal(typeof bag?.add, 'function');

bag.add({ id: 'beluga-30g', title: 'Imperial Beluga', price: 350, currency: '$' });
bag.add({ id: 'beluga-30g', title: 'Imperial Beluga', price: 350, currency: '$' });
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
