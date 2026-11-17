import assert from 'node:assert/strict';
import fs from 'node:fs';

const runtime = fs.readFileSync('assets/js/products.js', 'utf8');

assert.match(runtime, /luxQuoteHref\(product\)/, 'the product quote link is missing');
assert.match(runtime, /咨询报价/, 'the Chinese quote CTA label is missing');
assert.match(runtime, /Request a Quote/, 'the English quote CTA label is missing');
assert.doesNotMatch(runtime, /data-purchase-cta|加入购物袋|Add to Cart/, 'inactive cart controls remain');
assert.match(runtime, /data-product-open/, 'the View Details product action is missing');
assert.doesNotMatch(runtime, /data-bag-|LuxureatBag|luxureat_guest_bag|luxureat_bag|luxureat_checkout|LuxureatCheckout|LuxureatWooCatalog|add_to_cart/, 'legacy consumer commerce runtime remains');
assert.doesNotMatch(runtime, /sessionStorage|wc_get_checkout_url|data-product-quantity|data-product-cart-state/, 'legacy bag persistence, checkout or quantity state remains');
assert.equal(fs.existsSync('bag.html'), false, 'root bag redirect remains');
assert.equal(fs.existsSync('zh/bag.html'), false, 'Chinese bag page remains');
assert.equal(fs.existsSync('en/bag.html'), false, 'English bag page remains');

console.log('Consumer commerce removal verification passed.');
