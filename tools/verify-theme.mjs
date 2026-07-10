import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const themeDir = path.join(root, 'luxureat-static');
const zipFile = path.join(root, 'luxureat-static-theme.zip');

const expectedRoutes = [
  'zh',
  'zh/caviar',
  'zh/rituals',
  'zh/journal',
  'zh/gifting',
  'zh/certification',
  'zh/contact',
  'zh/bag',
  'en',
  'en/caviar',
  'en/products',
  'en/rituals',
  'en/journal',
  'en/gifting',
  'en/contact',
  'en/private',
  'en/bag',
];

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function hasExactHref(source, href) {
  const values = [];
  let offset = 0;
  while (offset < source.length) {
    const index = source.indexOf('href=', offset);
    if (index === -1) break;
    const quote = source[index + 5];
    if (quote !== '"' && quote !== "'") {
      offset = index + 5;
      continue;
    }
    const start = index + 6;
    const end = source.indexOf(quote, start);
    if (end === -1) break;
    values.push(source.slice(start, end));
    offset = end + 1;
  }
  return values.includes(href);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

assert(fs.existsSync(themeDir), 'theme folder luxureat-static exists');
for (const file of [
  'style.css',
  'index.php',
  'functions.php',
  'routes.php',
  'integration.css',
  'main.js',
  'assets/luxureat-logo.png',
  'assets/wechat-qr.png',
  'screenshot.png',
  'README.md',
]) {
  assert(fs.existsSync(path.join(themeDir, file)), `${file} exists`);
}

const styleCss = read(path.join(themeDir, 'style.css'));
assert(/Theme Name:\s*LuxurEat Static/i.test(styleCss), 'style.css declares the LuxurEat Static theme name');

const functionsPhp = read(path.join(themeDir, 'functions.php'));
assert(functionsPhp.includes('wp_enqueue_style'), 'functions.php enqueues styles');
assert(functionsPhp.includes('wp_enqueue_script'), 'functions.php enqueues scripts');
assert(functionsPhp.includes('add_rewrite_rule'), 'functions.php registers rewrite rules');
assert(functionsPhp.includes('flush_rewrite_rules'), 'functions.php flushes rewrite rules on theme switch');
assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(functionsPhp), 'functions.php contains no invalid control characters');
assert(functionsPhp.includes("preg_replace('#/+#', '/', $path)"), 'functions.php normalizes repeated slashes with a valid PHP regex');
assert(functionsPhp.includes('function luxureat_static_url('), 'functions.php provides host-compatible route URLs');
assert(functionsPhp.includes('function luxureat_static_pretty_paths('), 'functions.php defines canonical pretty route URLs');
assert(functionsPhp.includes("'zh/caviar' => '/caviar/'"), 'functions.php maps the Chinese caviar route to /caviar/');
assert(functionsPhp.includes("'en/caviar' => '/en/caviar/'"), 'functions.php maps the English caviar route to /en/caviar/');
assert(functionsPhp.includes("'en/products' => '/en/products/'"), 'functions.php maps the English products route to /en/products/');
assert(!functionsPhp.includes("add_query_arg('luxureat_path'"), 'functions.php does not generate query-based route URLs');

const indexPhp = read(path.join(themeDir, 'index.php'));
assert(indexPhp.includes('wp_safe_redirect'), 'index.php redirects root and alias routes');
assert(indexPhp.includes('status_header(404)'), 'index.php has a 404 branch');
assert(indexPhp.includes('routes.php'), 'index.php loads the static route map');
assert(!indexPhp.includes("wp_safe_redirect(home_url('/zh/')"), 'index.php does not redirect root to /zh/ when server rewrites are unavailable');
assert(indexPhp.includes("$path = 'zh';"), 'index.php serves Chinese home at the site root');
assert(indexPhp.includes('$path = $target_path;'), 'index.php can render alias routes that are already canonical pretty URLs');

const routesPhp = read(path.join(themeDir, 'routes.php'));
for (const route of expectedRoutes) {
  const routePattern = new RegExp(`['"]${route.replace('/', '\\/')}['"]\\s*=>`);
  assert(routePattern.test(routesPhp), `routes.php maps ${route}`);
  const filePath = route === 'zh' || route === 'en'
    ? path.join(themeDir, 'pages', route, 'index.php')
    : path.join(themeDir, 'pages', `${route}.php`);
  assert(fs.existsSync(filePath), `page file exists for ${route}`);
}

const pageFiles = walk(path.join(themeDir, 'pages')).filter((file) => file.endsWith('.php'));
assert(pageFiles.length >= expectedRoutes.length, 'converted PHP page files exist');
for (const file of pageFiles) {
  const rel = path.relative(themeDir, file);
  const source = read(file);
  assert(source.includes('wp_head();'), `${rel} calls wp_head()`);
  assert(source.includes('wp_footer();'), `${rel} calls wp_footer()`);
  assert(!source.includes('../integration.css'), `${rel} does not link ../integration.css directly`);
  assert(!source.includes('../main.js'), `${rel} does not load ../main.js directly`);
  assert(!source.includes('../assets/'), `${rel} does not use relative asset paths`);
  assert(!/href=["'][^"']*\.html(?:[#?][^"']*)?["']/.test(source), `${rel} has no .html internal hrefs`);
  assert(!source.includes("home_url('/zh/") && !source.includes("home_url('/en/"), `${rel} does not require pretty permalink routes`);
  assert(source.includes('luxureat_static_url('), `${rel} uses host-compatible route URLs`);
}

const zhCaviar = read(path.join(themeDir, 'pages/zh/caviar.php'));
assert(zhCaviar.includes('data-lux-caviar-controls'), 'Chinese caviar page marks the filter toolbar for caviar controls');
assert(!zhCaviar.includes('top-[89px]'), 'Chinese caviar filter toolbar does not leave an 89px sticky gap under the header');
assert(zhCaviar.includes('top-[78px]'), 'Chinese caviar filter toolbar sticks directly below the desktop header');
assert(zhCaviar.includes('data-caviar-filter="all"'), 'Chinese caviar page has an all filter button');
assert(zhCaviar.includes('data-caviar-filter="beluga"'), 'Chinese caviar page has a Beluga filter button');
assert(zhCaviar.includes('data-caviar-filter="oscetra"'), 'Chinese caviar page has an Oscetra filter button');
assert(zhCaviar.includes('data-caviar-filter="baeri"'), 'Chinese caviar page has a Baeri filter button');
assert(zhCaviar.includes('data-caviar-view="grid"'), 'Chinese caviar page has a grid view button');
assert(zhCaviar.includes('data-caviar-view="list"'), 'Chinese caviar page has a list view button');
assert(zhCaviar.includes('data-caviar-sort'), 'Chinese caviar page has a sort control');
assert(zhCaviar.includes('data-caviar-sort-menu'), 'Chinese caviar page has a collapsible sort menu');
assert(zhCaviar.includes('data-caviar-sort-option="recommended"'), 'Chinese caviar sort menu has a recommended option');
assert(zhCaviar.includes('data-caviar-sort-option="price-asc"'), 'Chinese caviar sort menu has a low-price option');
assert(zhCaviar.includes('data-caviar-sort-option="price-desc"'), 'Chinese caviar sort menu has a high-price option');
assert(zhCaviar.includes('data-caviar-grid'), 'Chinese caviar page marks the product grid');
assert(zhCaviar.includes('data-caviar-item'), 'Chinese caviar page marks product cards');
assert(zhCaviar.includes('data-species="beluga"'), 'Chinese caviar page marks Beluga product species');
assert(zhCaviar.includes('data-species="oscetra"'), 'Chinese caviar page marks Oscetra product species');
assert(zhCaviar.includes('data-price='), 'Chinese caviar product cards expose prices for sorting');

const mainJs = read(path.join(themeDir, 'main.js'));
assert(mainJs.includes('initLuxCaviarControls'), 'main.js initializes caviar filter, view, and sort controls');
assert(mainJs.includes('data-caviar-filter'), 'main.js listens to caviar filter buttons');
assert(mainJs.includes('data-caviar-view'), 'main.js listens to caviar view buttons');
assert(mainJs.includes('data-caviar-sort'), 'main.js listens to the caviar sort control');
assert(mainJs.includes('data-caviar-sort-option'), 'main.js listens to explicit sort menu options');
assert(mainJs.includes('initLuxReader'), 'main.js initializes the shared reading container');
assert(mainJs.includes('data-reader-open'), 'main.js listens to reading-detail triggers');
assert(mainJs.includes('initLuxProductDetails'), 'main.js initializes shared product-detail views');
assert(mainJs.includes('data-product-open'), 'main.js listens to product-detail triggers');
assert(mainJs.includes('data-product-quantity'), 'main.js supports product-detail quantity controls');
assert(mainJs.includes('data-product-gallery'), 'main.js supports product-detail gallery thumbnails');
assert(mainJs.includes('data-product-main-image'), 'main.js switches the product-detail main image');
assert(mainJs.includes('data-bag-quantity'), 'main.js carries selected product quantities into the bag');
assert(mainJs.includes('initLuxFooterActions'), 'main.js initializes footer policy and social popups');
assert(mainJs.includes('data-footer-modal'), 'main.js listens to footer modal buttons');
assert(mainJs.includes('mouseenter'), 'main.js opens gift scenario info on hover');
assert(mainJs.includes('lux-reader-layout'), 'main.js renders the editorial article reader layout');
assert(mainJs.includes('lux-reader-wide-image'), 'main.js renders the editorial article body images');
assert(mainJs.includes('scrollRestoration'), 'main.js restores saved scroll positions manually');
assert(mainJs.includes('lux-back-to-top'), 'main.js adds the back-to-top floating action button');
assert(mainJs.includes('aria-pressed'), 'main.js updates pressed states for caviar toolbar buttons');
assert(mainJs.includes('.hidden ='), 'main.js hides filtered-out caviar product cards');

const integrationCss = read(path.join(themeDir, 'integration.css'));
assert(integrationCss.includes('[data-caviar-grid].is-list'), 'integration.css defines the caviar list view layout');
assert(integrationCss.includes('[data-caviar-item][hidden]'), 'integration.css hides filtered caviar product cards reliably');
assert(integrationCss.includes('.lux-sort-menu'), 'integration.css styles the sort menu');
assert(integrationCss.includes('.lux-back-to-top'), 'integration.css styles the back-to-top button');
assert(integrationCss.includes('.lux-reader'), 'integration.css styles the shared reading container');
assert(integrationCss.includes('.lux-product-detail'), 'integration.css styles the shared product-detail view');
assert(integrationCss.includes('.lux-product-gallery'), 'integration.css styles product image galleries');
assert(integrationCss.includes('.lux-product-qty'), 'integration.css styles product quantity controls');
assert(integrationCss.includes('[data-caviar-grid] [data-bag-add]'), 'integration.css gives product-card add buttons the heavier border');
assert(integrationCss.includes('[data-caviar-grid] [data-product-open]'), 'integration.css gives product-card detail buttons the lighter border');
assert(integrationCss.includes('.lux-dark-photo-block'), 'integration.css provides reusable dark photo backgrounds');
assert(integrationCss.includes('.lux-full-bleed'), 'integration.css supports full-width dark photo sections');
assert(integrationCss.includes('.lux-hero-fade-both'), 'integration.css supports top-and-bottom hero fades');
assert(integrationCss.includes('.lux-card-photo'), 'integration.css supports dark photo card backgrounds');
assert(integrationCss.includes('font: 700 34px/1.1 Montserrat'), 'product-detail prices use a clearer non-hairline font');
assert(integrationCss.includes('.lux-footer-modal'), 'integration.css styles footer light-background modals');
assert(!integrationCss.includes('.lux-reader-layout .lux-reader-intro:first-letter'), 'article reader does not enlarge or recolor the first character');
assert(integrationCss.includes('.lux-reader-cta'), 'integration.css styles card reading hover calls to action');
assert(integrationCss.includes('.lux-info-popover'), 'integration.css styles the frosted gift scenario popover');

const enRituals = read(path.join(themeDir, 'pages/en/rituals.php'));
assert(!enRituals.includes('style="opacity: 0;">Caviar should be served chilled'), 'English rituals temperature copy is visible');

const zhGifting = read(path.join(themeDir, 'pages/zh/gifting.php'));
const enGifting = read(path.join(themeDir, 'pages/en/gifting.php'));
assert(zhGifting.includes('data-info-popover'), 'Chinese gifting page marks scenario info buttons');
assert(enGifting.includes('data-info-popover'), 'English gifting page marks scenario info buttons');
assert(!zhGifting.includes('立即获取企业画册') && !zhGifting.includes('咨询专属顾问'), 'Chinese gifting hero removes the requested CTA controls');
assert(!enGifting.includes('Explore Collections'), 'English gifting hero removes the matching CTA control');
assert(zhGifting.includes('<strong>参考方案</strong>') && !zhGifting.includes('<span>专业合作</span>') && !zhGifting.includes('开启企业礼赠方案'), 'Chinese gifting partner card uses the requested reference-plan wording');
assert(enGifting.includes('<strong>Reference Plan</strong>') && !enGifting.includes('<span>Professional Partnership</span>') && !enGifting.includes('Start a Corporate Program'), 'English gifting partner card mirrors the reference-plan wording');

const zhBag = read(path.join(themeDir, 'pages/zh/bag.php'));
const enBag = read(path.join(themeDir, 'pages/en/bag.php'));
assert(zhBag.includes('浏览全部') && zhBag.includes("luxureat_static_url('zh/caviar'"), 'Chinese bag browse-all link goes to caviar');
assert(enBag.includes('Browse All') && enBag.includes("luxureat_static_url('en/products'"), 'English bag browse-all link goes to products');
assert(zhBag.includes('查看详情') && zhBag.includes('data-product-open'), 'Chinese bag recommendations include product-detail actions');
assert(enBag.includes('View Details') && enBag.includes('data-product-open'), 'English bag recommendations include product-detail actions');

const zhJournal = read(path.join(themeDir, 'pages/zh/journal.php'));
const enJournal = read(path.join(themeDir, 'pages/en/journal.php'));
assert(zhJournal.includes('data-reader-open="zh-harvest"'), 'Chinese journal opens the harvest reader');
assert(enJournal.includes('data-reader-open="en-harvest"'), 'English journal opens the harvest reader');
assert(zhJournal.includes('lux-reader-card'), 'Chinese journal cards expose hover reader actions');
assert(enJournal.includes('lux-reader-card'), 'English journal cards expose hover reader actions');

const zhRituals = read(path.join(themeDir, 'pages/zh/rituals.php'));
assert(zhRituals.includes('data-reader-open="zh-champagne"'), 'Chinese rituals pairing cards open reader details');
assert(enRituals.includes('data-reader-open="en-champagne"'), 'English rituals pairing cards open reader details');
assert(zhRituals.includes("luxureat_static_url('zh/caviar'"), 'Chinese rituals shopping CTA links to products');
assert(enRituals.includes("luxureat_static_url('en/products'"), 'English rituals shopping CTA links to products');
assert((zhRituals.match(/lux-dark-photo-block/g) || []).length >= 3, 'Chinese rituals ceremony cards use dark photo backgrounds');

assert(zhCaviar.includes('data-product-open="zh-imperial-beluga"'), 'Chinese caviar product card opens product details');
assert(zhCaviar.includes("luxureat_static_url('zh/rituals'"), 'Chinese caviar ritual CTA links to rituals');
assert(zhCaviar.includes('lux-dark-photo-block'), 'Chinese caviar page uses dark photo backgrounds');
assert(zhCaviar.includes('系列产品') && !zhCaviar.includes('鱼子酱系列'), 'Chinese product listing uses the requested series label');
const enCaviar = read(path.join(themeDir, 'pages/en/caviar.php'));
assert(enCaviar.includes('data-product-open="en-imperial-beluga"'), 'English caviar page opens product details');
assert(enCaviar.includes("luxureat_static_url('en/rituals'"), 'English caviar ritual CTA links to rituals');
assert((enCaviar.match(/lux-dark-photo-block/g) || []).length >= 3, 'English caviar pairing cards use dark photo backgrounds');
const enProducts = read(path.join(themeDir, 'pages/en/products.php'));
assert(enProducts.includes('Premium Products') && enProducts.includes('data-lux-caviar-controls'), 'English products page translates the Chinese product listing');
assert(enProducts.includes('data-product-open="en-royal-oscetra"'), 'English products page opens Oscetra product details');
assert(enProducts.includes("luxureat_static_url('en/rituals'"), 'English products ritual CTA links to rituals');

const zhContact = read(path.join(themeDir, 'pages/zh/contact.php'));
assert(zhContact.includes('lux-dark-photo-block'), 'Chinese contact hero uses a dark photo background');

const zhHome = read(path.join(themeDir, 'pages/zh/index.php'));
const enHome = read(path.join(themeDir, 'pages/en/index.php'));
assert(zhHome.includes('data-product-open="zh-imperial-beluga"'), 'Chinese home shop CTA opens product detail');
assert(enHome.includes('data-product-open="en-imperial-beluga"'), 'English home shop CTA opens product detail');
assert(enHome.includes("luxureat_static_url('en/products'"), 'English navigation exposes the products page');
assert(zhGifting.indexOf("luxureat_static_url('zh/certification'") < zhGifting.indexOf("luxureat_static_url('zh/gifting'"), 'Chinese nav puts certification before gifting');
assert(zhGifting.includes('lux-partner-card') && zhGifting.includes("luxureat_static_url('zh/contact'"), 'Chinese gifting inquiry card links to contact');
assert(zhHome.includes('小红书') && zhHome.includes('data-footer-modal="wechat"') && zhHome.includes('微博'), 'Chinese footer exposes localized social actions');
assert(enHome.includes('Rednote') && enHome.includes('WeChat') && enHome.includes('Weibo'), 'English footer exposes social actions');
assert(hasExactHref(zhHome, 'https://xhslink.com/m/6Jn3PRYzjAy') && hasExactHref(zhHome, 'https://v.douyin.com/oEPE48mPS48/'), 'Chinese footer uses the updated Rednote and Douyin links');
assert(hasExactHref(enHome, 'https://xhslink.com/m/6Jn3PRYzjAy') && hasExactHref(enHome, 'https://v.douyin.com/oEPE48mPS48/'), 'English footer uses the updated Rednote and Douyin links');
assert(zhHome.includes('mailto:china@luxureat.com') && zhHome.includes('tel:15721452475'), 'Chinese footer contact actions are clickable');
assert(enHome.includes('mailto:china@luxureat.com') && enHome.includes('tel:15721452475'), 'English footer contact actions are clickable');

assert(fs.existsSync(zipFile), 'theme zip exists');
if (fs.existsSync(zipFile)) {
  try {
    const entries = execFileSync('unzip', ['-Z1', zipFile], { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    assert(entries.includes('luxureat-static/style.css'), 'zip contains luxureat-static/style.css');
    assert(entries.includes('luxureat-static/index.php'), 'zip contains luxureat-static/index.php');
    assert(entries.includes('luxureat-static/functions.php'), 'zip contains luxureat-static/functions.php');
    assert(entries.includes('luxureat-static/assets/luxureat-logo.png'), 'zip contains logo asset');
    assert(entries.includes('luxureat-static/assets/wechat-qr.png'), 'zip contains WeChat QR asset');
    assert(!entries.some((entry) => entry.startsWith('__MACOSX/')), 'zip has no __MACOSX metadata');
  } catch (error) {
    failures.push(`zip can be inspected with unzip: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`Theme verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Theme verification passed for ${themeDir}`);
