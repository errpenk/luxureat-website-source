import assert from 'node:assert/strict';
import fs from 'node:fs';

const runtime = fs.readFileSync('assets/js/products.js', 'utf8');

assert.match(runtime, /data-purchase-cta/, 'the reserved left product CTA is missing');
assert.match(runtime, /加入购物袋/, 'the Chinese left product CTA label is missing');
assert.match(runtime, /Add to Cart/, 'the English left product CTA label is missing');
assert.match(runtime, /data-product-open/, 'the View Details product action is missing');
assert.doesNotMatch(runtime, /data-bag-|LuxureatBag|luxureat_guest_bag|luxureat_bag|luxureat_checkout|LuxureatCheckout|LuxureatWooCatalog|add_to_cart/, 'legacy consumer commerce runtime remains');
assert.doesNotMatch(runtime, /sessionStorage|wc_get_checkout_url|data-product-quantity|data-product-cart-state/, 'legacy bag persistence, checkout or quantity state remains');
assert.equal(fs.existsSync('bag.html'), false, 'root bag redirect remains');
assert.equal(fs.existsSync('zh/bag.html'), false, 'Chinese bag page remains');
assert.equal(fs.existsSync('en/bag.html'), false, 'English bag page remains');

console.log('Consumer commerce removal verification passed.');
