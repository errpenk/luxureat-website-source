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
  'latest-event.js',
  'assets/luxureat-logo.png',
  'assets/wechat-qr.png',
  'assets/article-images/harvest-hero.jpg',
  'assets/article-images/champagne-hero.jpg',
  'assets/data/products.js',
  'screenshot.png',
  'README.md',
]) {
  assert(fs.existsSync(path.join(themeDir, file)), `${file} exists`);
}

const styleCss = read(path.join(themeDir, 'style.css'));
assert(/Theme Name:\s*LuxurEat Static/i.test(styleCss), 'style.css declares the LuxurEat Static theme name');

const functionsPhp = read(path.join(themeDir, 'functions.php'));
assert(functionsPhp.includes('wp_enqueue_style'), 'functions.php enqueues styles');
assert(functionsPhp.includes('luxureat-product-data') && functionsPhp.includes("array('luxureat-product-data')"), 'functions.php loads product data before main.js');
assert(functionsPhp.includes('luxureat-latest-event'), 'functions.php enqueues the latest event template script');
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
  assert(!source.includes('../latest-event.js'), `${rel} does not load ../latest-event.js directly`);
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

const mainJs = read(path.join(themeDir, 'main.js'));
assert(mainJs.includes('initLuxCaviarControls'), 'main.js initializes caviar filter, view, and sort controls');
assert(mainJs.includes('data-caviar-item data-species') && mainJs.includes('data-price="${Number(product.amount) || 0}"'), 'main.js renders sortable product cards from product data');
assert(mainJs.includes('data-caviar-filter'), 'main.js listens to caviar filter buttons');
assert(mainJs.includes('data-caviar-view'), 'main.js listens to caviar view buttons');
assert(mainJs.includes('data-caviar-sort'), 'main.js listens to the caviar sort control');
assert(mainJs.includes('data-caviar-sort-option'), 'main.js listens to explicit sort menu options');
assert(mainJs.includes('initLuxReader'), 'main.js initializes the shared reading container');
assert(mainJs.includes('data-reader-open'), 'main.js listens to reading-detail triggers');
assert(mainJs.includes('data-reader-archive') && mainJs.includes('lux-reader-archive'), 'main.js renders journal archive lists inside the shared reader');
assert(mainJs.includes('data-reader-archive-filter') && mainJs.includes('syncReaderTop'), 'main.js filters the journal archive and hides reader glass at the top');
assert(mainJs.includes('initLuxProductDetails'), 'main.js initializes shared product-detail views');
assert(mainJs.includes('data-product-open'), 'main.js listens to product-detail triggers');
assert(mainJs.includes('data-product-quantity'), 'main.js supports product-detail quantity controls');
assert(mainJs.includes('data-product-gallery'), 'main.js supports product-detail gallery thumbnails');
assert(mainJs.includes('data-product-main-image'), 'main.js switches the product-detail main image');
assert(mainJs.includes('lux-product-recent'), 'main.js renders product-detail recommendations');
assert(mainJs.includes('data-product-open="${escapeHtml(key)}"'), 'product-detail recommendations can open other product details');
assert(mainJs.includes('data-product-back'), 'product-detail recommendations expose an in-modal back button');
assert(mainJs.includes('data-product-cart-state'), 'product details show existing cart quantity');
assert(mainJs.includes('data-product-total'), 'product details show multi-quantity totals');
assert(mainJs.includes('data-product-recent-scroll') && mainJs.includes('scrollBy'), 'product-detail recommendations have horizontal arrow controls');
assert(mainJs.includes('lux-bag-line-total'), 'bag items show multi-quantity totals');
assert(mainJs.includes('${item.quantity}件总价') && mainJs.includes('lux-bag-detail'), 'bag items show quantity-specific totals and image detail actions');
assert(mainJs.includes('data-bag-quantity'), 'main.js carries selected product quantities into the bag');
assert(mainJs.includes('initLuxFooterActions'), 'main.js initializes footer policy and social popups');
assert(mainJs.includes('data-footer-modal'), 'main.js listens to footer modal buttons');
assert(mainJs.includes('mouseenter'), 'main.js opens gift scenario info on hover');
assert(mainJs.includes('lux-reader-layout'), 'main.js renders the editorial article reader layout');
assert(mainJs.includes('lux-reader-cover') && mainJs.includes('lux-reader-related-media'), 'main.js renders the editorial article images');
assert(mainJs.includes('lux-reader-layout') && mainJs.includes('lux-reader-quote'), 'main.js renders long-form reader articles');
assert(mainJs.includes('scrollRestoration'), 'main.js restores saved scroll positions manually');
assert(mainJs.includes('lux-back-to-top'), 'main.js adds the back-to-top floating action button');
assert(mainJs.includes('link.rel = "prefetch"') && mainJs.includes('pointerover') && mainJs.includes('touchstart'), 'main.js prefetches internal pages when users hover, focus, or touch links');
assert(mainJs.includes('aria-pressed'), 'main.js updates pressed states for caviar toolbar buttons');
assert(mainJs.includes('.hidden ='), 'main.js hides filtered-out caviar product cards');

const productDataJs = read(path.join(themeDir, 'assets/data/products.js'));
assert(productDataJs.includes('window.LUXUREAT_PRODUCT_DATA'), 'product data is separated into assets/data/products.js');
assert(productDataJs.includes('"zh-imperial-beluga"') && productDataJs.includes('"en-royal-oscetra"'), 'product data file contains bilingual product records');
const articleDataJs = read(path.join(themeDir, 'assets/data/articles.js'));
assert(articleDataJs.includes('window.LUXUREAT_ARTICLE_DATA') && articleDataJs.includes('article-images'), 'article data is separated into assets/data/articles.js');
assert(!walk(themeDir).some((file) => /\.(php|css|js)$/i.test(file) && /googleusercontent|transparenttextures/.test(read(file))), 'theme uses local image assets instead of external prototype image URLs');

const integrationCss = read(path.join(themeDir, 'integration.css'));
assert(integrationCss.includes('[data-caviar-grid].is-list'), 'integration.css defines the caviar list view layout');
assert(integrationCss.includes('[data-caviar-item][hidden]'), 'integration.css hides filtered caviar product cards reliably');
assert(integrationCss.includes('.lux-sort-menu'), 'integration.css styles the sort menu');
assert(integrationCss.includes('.lux-back-to-top'), 'integration.css styles the back-to-top button');
assert(integrationCss.includes('.lux-reader'), 'integration.css styles the shared reading container');
assert(integrationCss.includes('.lux-product-detail'), 'integration.css styles the shared product-detail view');
assert(integrationCss.includes('.lux-product-gallery'), 'integration.css styles product image galleries');
assert(integrationCss.includes('.lux-product-qty'), 'integration.css styles product quantity controls');
assert(integrationCss.includes('.lux-product-recent-grid'), 'integration.css styles product-detail recommendation grids');
assert(integrationCss.includes('.lux-product-recent-nav') && integrationCss.includes('scrollbar-width: none'), 'integration.css hides recommendation scrollbars and styles arrow controls');
assert(integrationCss.includes('inset: 0 -86px auto'), 'recommendation arrows sit on both sides of the carousel');
assert(integrationCss.includes('.lux-product-cart-state'), 'integration.css styles product-detail cart state');
assert(integrationCss.includes('.lux-reader-panel::before') && integrationCss.includes('backdrop-filter: blur(16px)') && integrationCss.includes('border-bottom: 0'), 'integration.css gives reader and product headers glass blur without a divider line');
assert(integrationCss.includes('background: rgba(244,242,238,.82)'), 'reader header uses the light editorial glass layer');
assert(integrationCss.includes('.lux-reader-panel.is-at-top::before'), 'reader glass layer is hidden while the article is at the top');
assert(integrationCss.includes('.lux-reader-related-media:hover .lux-reader-related-cta') && integrationCss.includes('.lux-reader-related-cta:hover'), 'related article read buttons have hover interactions');
assert(integrationCss.includes('.lux-reader-archive-tabs') && integrationCss.includes('.lux-reader-archive-media'), 'journal archive uses the editorial grid with category tabs');
assert(integrationCss.includes('.lux-ceremony-copy'), 'ritual cards fade copy out before showing the reader CTA');
assert(integrationCss.includes('.lux-products-main'), 'product listing pages can align their hero directly under the fixed navigation');
assert(integrationCss.includes('.lux-reader-archive'), 'integration.css styles journal archive reader lists');
assert(integrationCss.includes('.lux-reader-layout') && integrationCss.includes('.lux-reader-cover') && integrationCss.includes('.lux-reader-quote'), 'integration.css styles magazine-style long-form reader articles');
assert(integrationCss.includes('.lux-dark-photo-block .lux-reader-cta'), 'integration.css centers reader detail buttons on dark photo cards');
assert(integrationCss.includes('.lux-product-panel::before'), 'integration.css gives product details a glass top layer');
assert(integrationCss.includes('.lux-bag-item') && integrationCss.includes('.lux-bag-detail'), 'integration.css styles light bag item cards and image detail hover actions');
assert(!integrationCss.includes('background: rgba(143,47,36,.08)'), 'remove actions do not add a tinted background on hover');
assert(integrationCss.includes('.lux-footprint-card'), 'integration.css styles global footprint cards');
assert(integrationCss.includes('.lux-product-catalog [data-caviar-item] [data-bag-add]'), 'integration.css gives product-card add buttons the heavier border');
assert(integrationCss.includes('.lux-product-catalog [data-caviar-item] [data-product-open]'), 'integration.css gives product-card detail buttons the lighter border');
assert(integrationCss.includes('.lux-dark-photo-block'), 'integration.css provides reusable dark photo backgrounds');
assert(integrationCss.includes('.lux-full-bleed'), 'integration.css supports full-width dark photo sections');
assert(integrationCss.includes('.lux-hero-fade-both'), 'integration.css supports top-and-bottom hero fades');
assert(integrationCss.includes('.lux-card-photo'), 'integration.css supports dark photo card backgrounds');
assert(integrationCss.includes('font: 700 34px/1.1 Montserrat'), 'product-detail prices use a clearer non-hairline font');
assert(integrationCss.includes('.lux-footer-modal'), 'integration.css styles footer light-background modals');
assert(!integrationCss.includes('.lux-reader-layout .lux-reader-intro:first-letter'), 'article reader does not enlarge or recolor the first character');
assert(integrationCss.includes('.lux-reader-cta'), 'integration.css styles card reading hover calls to action');
assert(integrationCss.includes('transform: translate(-50%, -50%)') && integrationCss.includes('place-items: center'), 'reader detail buttons stay centered inside image cards');
assert(integrationCss.includes('font: 400 32px/1.12 "Bodoni Moda"'), 'reader quote uses the current editorial display type');
assert(integrationCss.includes('.lux-bag-recommendations [data-bag-add]:hover') && integrationCss.includes('.lux-bag-recommendations [data-product-open]:active'), 'bag recommendation buttons have hover and active interactions');
assert(integrationCss.includes('.lux-footprint-stage:has(.lux-footprint-card:hover)') && integrationCss.includes('transform: scale(1.025)'), 'global footprint cards brighten the background and scale gently on hover');
assert(integrationCss.includes('section:has(.lux-hero-fade-both)') && integrationCss.includes('border-bottom-color: transparent'), 'photo heroes hide divider lines while fading into the page background');
assert(integrationCss.includes('linear-gradient(to bottom, #131313 0%') && integrationCss.includes('transparent 100%)'), 'dark photo sections use page-color fade masks at their edges');
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
assert(mainJs.includes('renderRecommendations') && mainJs.includes('data-product-open="${escapeHtml(key)}"'), 'bag recommendations render product-detail actions from product data');

const zhJournal = read(path.join(themeDir, 'pages/zh/journal.php'));
const enJournal = read(path.join(themeDir, 'pages/en/journal.php'));
assert(zhJournal.includes('data-reader-open="zh-harvest"'), 'Chinese journal opens the harvest reader');
assert(enJournal.includes('data-reader-open="en-harvest"'), 'English journal opens the harvest reader');
assert(zhJournal.includes('data-reader-archive'), 'Chinese journal archive opens inside the shared reader');
assert(enJournal.includes('data-reader-archive'), 'English journal archive opens inside the shared reader');
assert(zhJournal.includes('lux-reader-card'), 'Chinese journal cards expose hover reader actions');
assert(enJournal.includes('lux-reader-card'), 'English journal cards expose hover reader actions');

const zhRituals = read(path.join(themeDir, 'pages/zh/rituals.php'));
assert(zhRituals.includes('data-reader-open="zh-champagne"'), 'Chinese rituals pairing cards open reader details');
assert(enRituals.includes('data-reader-open="en-champagne"'), 'English rituals pairing cards open reader details');
assert(zhRituals.includes('data-reader-open="zh-breath"') && zhRituals.includes('data-reader-open="zh-hand-warm"') && zhRituals.includes('data-reader-open="zh-palate"'), 'Chinese rituals ceremony cards open reader details');
assert(zhRituals.includes("luxureat_static_url('zh/caviar'"), 'Chinese rituals shopping CTA links to products');
assert(enRituals.includes("luxureat_static_url('en/products'"), 'English rituals shopping CTA links to products');
assert(zhRituals.includes('即刻购买') && zhRituals.includes('系列产品') && !zhRituals.includes('>去购物<'), 'Chinese rituals shopping CTA uses the requested wording');
assert(enRituals.includes('Buy Now') && enRituals.includes('Products') && !enRituals.includes('>Shop Now<'), 'English rituals shopping CTA mirrors the requested wording');
assert((zhRituals.match(/lux-dark-photo-block/g) || []).length >= 3, 'Chinese rituals ceremony cards use dark photo backgrounds');

assert(mainJs.includes('data-product-open="${escapeHtml(key)}"') && productDataJs.includes('"zh-imperial-beluga"'), 'Chinese caviar product card opens product details from product data');
assert(zhCaviar.includes("luxureat_static_url('zh/rituals'"), 'Chinese caviar ritual CTA links to rituals');
assert(zhCaviar.includes('lux-dark-photo-block'), 'Chinese caviar page uses dark photo backgrounds');
assert(zhCaviar.includes('系列产品') && !zhCaviar.includes('鱼子酱系列'), 'Chinese product listing uses the requested series label');
assert(zhCaviar.includes('lux-products-main'), 'Chinese product listing hero starts flush below the fixed nav');
const enCaviar = read(path.join(themeDir, 'pages/en/caviar.php'));
assert(enCaviar.includes('data-product-open="en-imperial-beluga"'), 'English caviar page opens product details');
assert(enCaviar.includes('data-product-bind="en-imperial-beluga"'), 'English caviar page binds hero product data from products.js');
assert(enCaviar.includes('Tasting Profile') && enCaviar.includes('Origin &amp; Harvest'), 'English caviar page keeps the editorial caviar layout');
const enProducts = read(path.join(themeDir, 'pages/en/products.php'));
assert(enProducts.includes('Premium Products') && enProducts.includes('data-lux-caviar-controls'), 'English products page translates the Chinese product listing');
assert(enProducts.includes('lux-products-main'), 'English product listing hero starts flush below the fixed nav');
assert(mainJs.includes('data-product-open="${escapeHtml(key)}"') && productDataJs.includes('"en-royal-oscetra"'), 'English products page renders Oscetra product details from product data');
assert(enProducts.includes("luxureat_static_url('en/rituals'"), 'English products ritual CTA links to rituals');

const zhContact = read(path.join(themeDir, 'pages/zh/contact.php'));
assert(zhContact.includes('lux-dark-photo-block'), 'Chinese contact hero uses a dark photo background');
assert(zhContact.includes('Italy • United States • Thailand • China'), 'Chinese contact footprint lists the requested countries');
assert(zhContact.includes('上海市闵行区') && zhContact.includes('联明路389号A栋 505室') && zhContact.includes('邮编: 201101'), 'Chinese contact HQ address is updated');
assert(zhContact.includes('lux-footprint-heading') && !zhContact.includes('<details class="lux-footprint-card'), 'Chinese contact footprint cards are expanded by default');
assert(zhContact.includes('local_dining') && zhContact.includes('temple_buddhist') && zhContact.includes('account_balance'), 'Chinese contact footprint uses country-specific icons');
assert(zhContact.includes('info@truffleat.com') && zhContact.includes('tel:+393515111273') && hasExactHref(zhContact, 'https://www.truffleat.com'), 'Chinese contact Italy card has clickable contacts');
assert(zhContact.includes('info@luxureat.com') && zhContact.includes('tel:+14256266318'), 'Chinese contact United States card has clickable contacts');
assert(zhContact.includes('info@truffle.co.th') && hasExactHref(zhContact, 'https://wa.me/66811331337'), 'Chinese contact Thailand card has clickable contacts');
assert(zhContact.includes('china@luxureat.com') && zhContact.includes('tel:+8615721452475') && zhContact.includes('+86 15721452475'), 'Chinese contact China card has clickable contacts');
const enContact = read(path.join(themeDir, 'pages/en/contact.php'));
assert(enContact.includes('Global Presence') && enContact.includes('Italy') && enContact.includes('Thailand') && enContact.includes('China'), 'English contact footprint lists the requested countries');
assert(enContact.includes('Truffleat Srl') && enContact.includes('Luxureat LLC') && enContact.includes('Truffleat Co., Ltd') && enContact.includes('LuxurEat China Ltd'), 'English contact footprint uses the requested entities');
assert(enContact.includes('lux-footprint-heading') && !enContact.includes('<details class="lux-footprint-card'), 'English contact footprint cards are expanded by default');

const zhHome = read(path.join(themeDir, 'pages/zh/index.php'));
const enHome = read(path.join(themeDir, 'pages/en/index.php'));
const latestEventJs = read(path.join(themeDir, 'latest-event.js'));
assert(zhHome.includes('data-latest-event'), 'Chinese home has the latest event mount point');
assert(latestEventJs.includes('marca-china-2026.jpeg') && latestEventJs.includes('document.currentScript'), 'latest event script renders the event from theme-relative assets');
assert(zhHome.includes('data-product-open="zh-imperial-beluga"'), 'Chinese home shop CTA opens product detail');
assert(enHome.includes("luxureat_static_url('en/products', '#product-en-imperial-beluga')"), 'English home shop CTA opens product detail through products');
assert(enHome.includes("luxureat_static_url('en/products'"), 'English navigation exposes the products page');
assert(zhGifting.indexOf("luxureat_static_url('zh/certification'") < zhGifting.indexOf("luxureat_static_url('zh/gifting'"), 'Chinese nav puts certification before gifting');
assert(zhGifting.includes('lux-partner-card') && zhGifting.includes("luxureat_static_url('zh/contact'"), 'Chinese gifting inquiry card links to contact');
assert(zhHome.includes('小红书') && zhHome.includes('data-footer-modal="wechat"') && zhHome.includes('微博'), 'Chinese footer exposes localized social actions');
assert(enHome.includes('Rednote') && enHome.includes('WeChat') && enHome.includes('Weibo'), 'English footer exposes social actions');
assert(hasExactHref(zhHome, 'https://xhslink.com/m/6Jn3PRYzjAy') && hasExactHref(zhHome, 'https://v.douyin.com/oEPE48mPS48/'), 'Chinese footer uses the updated Rednote and Douyin links');
assert(hasExactHref(enHome, 'https://xhslink.com/m/6Jn3PRYzjAy') && hasExactHref(enHome, 'https://v.douyin.com/oEPE48mPS48/'), 'English footer uses the updated Rednote and Douyin links');
assert(zhHome.includes('mailto:china@luxureat.com') && zhHome.includes('tel:+8615721452475'), 'Chinese footer contact actions are clickable');
assert(enHome.includes('mailto:china@luxureat.com') && enHome.includes('tel:+8615721452475'), 'English footer contact actions are clickable');

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
    assert(entries.includes('luxureat-static/assets/data/products.js'), 'zip contains product data asset');
    assert(entries.some((entry) => entry.startsWith('luxureat-static/assets/images/')), 'zip contains local image assets');
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
