import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const store = new Map();
const context = {
  document: {
    documentElement: { lang: 'en' },
    body: { appendChild() {} },
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
  location: { pathname: '/en/caviar.html' },
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

bag.remove('beluga-30g');
assert.equal(bag.items().length, 0);
