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
  'zh/news',
  'zh/gifting',
  'zh/certification',
  'zh/contact',
  'zh/bag',
  'en',
  'en/products',
  'en/rituals',
  'en/journal',
  'en/news',
  'en/gifting',
  'en/certification',
  'en/contact',
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
  '.htaccess',
  'index.php',
  'page.php',
  'functions.php',
  'routes.php',
  'integration.css',
  'assets/js/core.js',
  'assets/js/products.js',
  'assets/js/events.js',
  'assets/js/journal.js',
  'assets/js/brand.js',
  'assets/media/brand/luxureat-logo.png',
  'assets/media/brand/wechat-qr.webp',
  'assets/media/journal/lux-032.jpg',
  'assets/media/brand/lux-029.jpg',
  'assets/data/products.js',
  'assets/data/events.js',
  'assets/data/journal.js',
  'assets/data/brand.js',
  'screenshot.png',
  'README.md',
]) {
  assert(fs.existsSync(path.join(themeDir, file)), `${file} exists`);
}

const styleCss = read(path.join(themeDir, 'style.css'));
assert(/Theme Name:\s*LuxurEat Static/i.test(styleCss), 'style.css declares the LuxurEat Static theme name');
const functionsPhp = read(path.join(themeDir, 'functions.php'));
assert(functionsPhp.includes('wp_enqueue_style'), 'functions.php enqueues styles');
assert(functionsPhp.includes("'products' => array('src' => 'assets/js/products.js', 'dependencies' => array('product-data'))"), 'functions.php loads product data before product behavior');
assert(functionsPhp.includes("'events' => array('src' => 'assets/js/events.js'") && functionsPhp.includes("'journal' => array('src' => 'assets/js/journal.js'"), 'functions.php registers event and journal domain scripts');
assert(functionsPhp.includes("'zh/caviar' => array('product-data', 'products', 'core')"), 'functions.php uses the canonical page asset map');
assert(functionsPhp.includes('wp_enqueue_script'), 'functions.php enqueues scripts');
assert(functionsPhp.includes('luxureat_static_defer_scripts') && functionsPhp.includes("add_filter('script_loader_tag'"), 'functions.php defers theme scripts without changing dependency order');
assert(functionsPhp.includes('luxureat_static_cache_headers') && functionsPhp.includes('stale-while-revalidate=86400'), 'functions.php enables short anonymous page caching');
assert(functionsPhp.includes('add_rewrite_rule'), 'functions.php registers rewrite rules');
assert(functionsPhp.includes('flush_rewrite_rules'), 'functions.php flushes rewrite rules on theme switch');
assert(!/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(functionsPhp), 'functions.php contains no invalid control characters');
assert(functionsPhp.includes("preg_replace('#/+#', '/', $path)"), 'functions.php normalizes repeated slashes with a valid PHP regex');
assert(functionsPhp.includes('function luxureat_static_url('), 'functions.php provides host-compatible route URLs');
assert(functionsPhp.includes('function luxureat_static_pretty_paths('), 'functions.php defines canonical pretty route URLs');
assert(functionsPhp.includes("'zh/caviar' => '/caviar/'"), 'functions.php maps the Chinese caviar route to /caviar/');
assert(functionsPhp.includes("'zh/news' => '/news/'"), 'functions.php maps the Chinese news route to /news/');
assert(functionsPhp.includes("'en/products' => '/en/products/'"), 'functions.php maps the English products route to /en/products/');
assert(functionsPhp.includes("'en/news' => '/en/news/'"), 'functions.php maps the English news route');
assert(functionsPhp.includes("'en/certification' => '/en/certification/'"), 'functions.php maps the English certification route');
assert(functionsPhp.includes("'en/caviar' => 'en/products'"), 'legacy English caviar route redirects to products');
assert(functionsPhp.includes("'en/private' => 'en/gifting'"), 'legacy English private route redirects to gifting');
assert(!functionsPhp.includes("add_query_arg('luxureat_path'"), 'functions.php does not generate query-based route URLs');
assert(functionsPhp.includes("wp_ajax_nopriv_luxureat_account") && functionsPhp.includes('wc_create_new_customer'), 'functions.php exposes WooCommerce-backed account registration');
assert(functionsPhp.includes('luxureat_static_mailpoet_subscribe') && functionsPhp.includes("'send_confirmation_email' => true"), 'functions.php subscribes opted-in registrations through MailPoet double opt-in');
assert(functionsPhp.includes('woocommerce_store_api_cart_item_images') && functionsPhp.includes('lux-005.jpg'), 'checkout cart items receive branded product images');
assert(functionsPhp.includes("wp_dequeue_script('mailpoet-marketing-optin-block-frontend')"), 'checkout removes the duplicate MailPoet opt-in block');
assert(functionsPhp.includes("$mode === 'forgot'") && functionsPhp.includes('retrieve_password($user->user_login)'), 'functions.php sends native WordPress password reset emails');
assert(functionsPhp.includes("'remember' => !empty($_POST['remember'])"), 'functions.php passes the remember-me choice to WordPress authentication');

const indexPhp = read(path.join(themeDir, 'index.php'));
assert(indexPhp.includes('wp_safe_redirect'), 'index.php redirects root and alias routes');
assert(indexPhp.includes('status_header(404)'), 'index.php has a 404 branch');
assert(indexPhp.includes('routes.php'), 'index.php loads the static route map');
assert(!indexPhp.includes("wp_safe_redirect(home_url('/zh/')"), 'index.php does not redirect root to /zh/ when server rewrites are unavailable');
assert(indexPhp.includes("$path = 'zh';"), 'index.php serves Chinese home at the site root');
assert(indexPhp.includes('$path = $target_path;'), 'index.php can render alias routes that are already canonical pretty URLs');

const pagePhp = read(path.join(themeDir, 'page.php'));
assert(pagePhp.includes('the_content()') && pagePhp.includes("$body_classes[] = 'lux-account-dashboard-page'") && pagePhp.includes("$body_classes[] = 'lux-checkout-page'"), 'page.php renders branded native account and checkout content');
assert(functionsPhp.includes('woocommerce_account_menu_items') && functionsPhp.includes("'orders' =>") && functionsPhp.includes("'edit-address' =>") && functionsPhp.includes("'edit-account' =>") && functionsPhp.includes("'customer-logout' =>"), 'customer account navigation is limited to the requested WooCommerce sections');
assert(functionsPhp.includes('luxureat_static_account_language') && pagePhp.includes("add_query_arg('lang', 'zh'") && pagePhp.includes("add_query_arg('lang', 'en'"), 'account page defaults to Chinese and provides a bilingual switch');
assert(functionsPhp.includes('woocommerce_get_endpoint_url') && functionsPhp.includes("add_query_arg('lang', luxureat_static_account_language()"), 'account endpoint links preserve the selected language');
assert(pagePhp.includes('luxureat-logo.png'), 'account page uses the LuxurEat logo');
assert(pagePhp.includes('lux-account-dashboard-page'), 'account dashboard receives a dedicated body class');

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
  assert(!source.includes('../main.js'), `${rel} does not load obsolete root main.js`);
  assert(!source.includes('../latest-event.js'), `${rel} does not load obsolete root latest-event.js`);
  assert(!source.includes('../assets/'), `${rel} does not use relative asset paths`);
  assert(!/href=["'][^"']*\.html(?:[#?][^"']*)?["']/.test(source), `${rel} has no .html internal hrefs`);
  assert(!source.includes("home_url('/zh/") && !source.includes("home_url('/en/"), `${rel} does not require pretty permalink routes`);
  assert(source.includes('luxureat_static_url('), `${rel} uses host-compatible route URLs`);
}

const zhCaviar = read(path.join(themeDir, 'pages/zh/caviar.php'));
const zhGifting = read(path.join(themeDir, 'pages/zh/gifting.php'));
assert(zhCaviar.includes('data-lux-caviar-controls'), 'Chinese caviar page marks the filter toolbar for caviar controls');
assert(!zhGifting.includes('企业专线'), 'gift inquiry phone does not show the enterprise hotline label');
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

const runtimeJs = [
  'assets/js/core.js',
  'assets/js/products.js',
  'assets/js/journal.js',
].map((file) => read(path.join(themeDir, file))).join('\n');
const brandJs = read(path.join(themeDir, 'assets/js/brand.js'));
assert(runtimeJs.includes('initLuxCaviarControls'), 'runtime scripts initializes caviar filter, view, and sort controls');
assert(runtimeJs.includes('data-caviar-item data-species') && runtimeJs.includes('data-price="${Number(product.amount) || 0}"'), 'runtime scripts renders sortable product cards from product data');
assert(runtimeJs.includes('data-caviar-filter'), 'runtime scripts listens to caviar filter buttons');
assert(runtimeJs.includes('data-caviar-view'), 'runtime scripts listens to caviar view buttons');
assert(runtimeJs.includes('data-caviar-sort'), 'runtime scripts listens to the caviar sort control');
assert(runtimeJs.includes('data-caviar-sort-option'), 'runtime scripts listens to explicit sort menu options');
assert(runtimeJs.includes('initLuxReader'), 'runtime scripts initializes the shared reading container');
assert(runtimeJs.includes('data-reader-open'), 'runtime scripts listens to reading-detail triggers');
assert(runtimeJs.includes('data-reader-archive') && runtimeJs.includes('lux-reader-archive'), 'runtime scripts renders journal archive lists inside the shared reader');
assert(runtimeJs.includes('data-reader-archive-filter') && runtimeJs.includes('syncReaderTop'), 'runtime scripts filters the journal archive and hides reader glass at the top');
assert(runtimeJs.includes('initLuxProductDetails'), 'runtime scripts initializes shared product-detail views');
assert(runtimeJs.includes('data-product-open'), 'runtime scripts listens to product-detail triggers');
assert(runtimeJs.includes('data-product-quantity'), 'runtime scripts supports product-detail quantity controls');
assert(runtimeJs.includes('data-product-gallery'), 'runtime scripts supports product-detail gallery thumbnails');
assert(runtimeJs.includes('data-product-main-image'), 'runtime scripts switches the product-detail main image');
assert(runtimeJs.includes('lux-product-recent'), 'runtime scripts renders product-detail recommendations');
assert(runtimeJs.includes('data-product-open="${luxEscapeProductHtml(key)}"'), 'product-detail recommendations can open other product details');
assert(runtimeJs.includes('data-product-back'), 'product-detail recommendations expose an in-modal back button');
assert(!runtimeJs.includes('!triggers.length && !hash.startsWith("#product-")'), 'product detail listener handles dynamically rendered bag buttons');
assert(runtimeJs.includes('data-product-cart-state'), 'product details show existing cart quantity');
assert(runtimeJs.includes('data-product-total'), 'product details show multi-quantity totals');
assert(runtimeJs.includes('data-product-recent-scroll') && runtimeJs.includes('scrollBy'), 'product-detail recommendations have horizontal arrow controls');
assert(runtimeJs.includes('lux-bag-line-total'), 'bag items show multi-quantity totals');
assert(runtimeJs.includes('${item.quantity}件总价') && runtimeJs.includes('lux-bag-detail'), 'bag items show quantity-specific totals and image detail actions');
assert(runtimeJs.includes('data-bag-quantity'), 'runtime scripts carries selected product quantities into the bag');
assert(runtimeJs.includes('data-account-form') && runtimeJs.includes('data-account-newsletter'), 'account modal provides registration and optional newsletter consent');
assert(runtimeJs.includes('data-account-forgot') && runtimeJs.includes('data-account-login-options') && runtimeJs.includes('text.resetSent'), 'account modal provides an inline password reset flow');
assert(runtimeJs.includes('luxureat_account') && runtimeJs.includes('LuxureatAccount'), 'account modal submits to the localized WordPress account endpoint');
assert(!runtimeJs.includes('lux-account-social') && !runtimeJs.includes('Or Sign In With') && !runtimeJs.includes('或使用以下方式登录'), 'account modal removes Google and WeChat sign-in controls');
assert(runtimeJs.includes('luxureat_checkout') && runtimeJs.includes('LuxureatCheckout') && runtimeJs.includes('AbortController'), 'bag checkout uses one bounded WordPress request');
assert(runtimeJs.includes('initLuxFooterActions'), 'runtime scripts initializes footer policy and social popups');
assert(runtimeJs.includes('data-footer-modal'), 'runtime scripts listens to footer modal buttons');
assert(runtimeJs.includes('mouseenter'), 'runtime scripts opens gift scenario info on hover');
assert(runtimeJs.includes('lux-reader-layout'), 'runtime scripts renders the editorial article reader layout');
assert(runtimeJs.includes('lux-reader-cover') && runtimeJs.includes('lux-reader-related-media'), 'runtime scripts renders the editorial article images');
assert(runtimeJs.includes('lux-reader-layout') && runtimeJs.includes('lux-reader-quote'), 'runtime scripts renders long-form reader articles');
assert(runtimeJs.includes('scrollRestoration'), 'runtime scripts restores saved scroll positions manually');
assert(runtimeJs.includes('lux-back-to-top'), 'runtime scripts adds the back-to-top floating action button');
assert(runtimeJs.includes('link.rel = "prefetch"') && runtimeJs.includes('pointerover') && runtimeJs.includes('touchstart'), 'runtime scripts prefetches internal pages when users hover, focus, or touch links');
assert(runtimeJs.includes('const pageHref =') && runtimeJs.includes('location.pathname.endsWith(".html")') && runtimeJs.includes('`/en/${slug}/`'), 'runtime navigation keeps static links relative and WordPress links root-based');
assert(runtimeJs.includes('aria-pressed'), 'runtime scripts updates pressed states for caviar toolbar buttons');
assert(runtimeJs.includes('.hidden ='), 'runtime scripts hides filtered-out caviar product cards');

const productDataJs = read(path.join(themeDir, 'assets/data/products.js'));
assert(productDataJs.includes('window.LUXUREAT_PRODUCT_DATA'), 'product data is separated into assets/data/products.js');
assert(productDataJs.includes('"zh-imperial-beluga"') && productDataJs.includes('"en-royal-oscetra"'), 'product data file contains bilingual product records');
assert(productDataJs.includes('sku: "imperial-beluga-30g"') && productDataJs.includes('sku: "ice-server"'), 'bilingual product records map to WooCommerce SKUs');
const articleDataJs = read(path.join(themeDir, 'assets/data/journal.js'));
assert(articleDataJs.includes('window.LUXUREAT_ARTICLE_DATA') && articleDataJs.includes('media/journal'), 'journal data is separated into assets/data/journal.js');
assert(!walk(themeDir).some((file) => /\.(php|css|js)$/i.test(file) && /googleusercontent|transparenttextures/.test(read(file))), 'theme uses local image assets instead of external prototype image URLs');

const integrationCss = read(path.join(themeDir, 'integration.css'));
assert(integrationCss.includes('.lux-wp-page-brand img') && integrationCss.includes('.woocommerce-MyAccount-navigation'), 'account page applies branded logo and WooCommerce account styling');
assert(integrationCss.includes('.lux-account-dashboard-page .woocommerce-MyAccount-content > p'), 'account dashboard hides the duplicated WooCommerce introduction');
assert(integrationCss.includes('html[lang^="zh"]') && integrationCss.includes('AlimamaShuHeiTi-Bold.woff2'), 'Chinese headline typography uses the bundled Alimama font');
assert(integrationCss.includes('[data-caviar-grid].is-list'), 'integration.css defines the caviar list view layout');
assert(integrationCss.includes('[data-caviar-item][hidden]'), 'integration.css hides filtered caviar product cards reliably');
assert(integrationCss.includes('.lux-sort-menu'), 'integration.css styles the sort menu');
assert(integrationCss.includes('.lux-back-to-top'), 'integration.css styles the back-to-top button');
assert(integrationCss.includes('.lux-reader'), 'integration.css styles the shared reading container');
assert(integrationCss.includes('.lux-product-detail'), 'integration.css styles the shared product-detail view');
assert(integrationCss.includes('.lux-product-gallery'), 'integration.css styles product image galleries');
assert(integrationCss.includes('.lux-checkout-page') && integrationCss.includes('.lux-home-gifting-title'), 'checkout and homepage editorial layers receive branded styling');
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
assert(integrationCss.includes('.lux-bag-summary') && integrationCss.includes('background: #181818'), 'bag order summary uses a softer dark background');
assert(!integrationCss.includes('background: rgba(143,47,36,.08)'), 'remove actions do not add a tinted background on hover');
assert(integrationCss.includes('.lux-footprint-card'), 'integration.css styles global footprint cards');
assert(integrationCss.includes('.lux-footprint-card .lux-with-icon'), 'global footprint contact links receive mail and phone icons');
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
assert(integrationCss.includes('aspect-ratio: 4 / 3'), 'journal archive images use a 4:3 ratio');
assert(integrationCss.includes('section:has(.lux-hero-fade-both)') && integrationCss.includes('border-bottom-color: transparent'), 'photo heroes hide divider lines while fading into the page background');
assert(integrationCss.includes('linear-gradient(to bottom, #131313 0%') && integrationCss.includes('transparent 100%)'), 'dark photo sections use page-color fade masks at their edges');
assert(integrationCss.includes('.lux-info-popover'), 'integration.css styles the frosted gift scenario popover');

const enRituals = read(path.join(themeDir, 'pages/en/rituals.php'));
assert(!enRituals.includes('style="opacity: 0;">Caviar should be served chilled'), 'English rituals temperature copy is visible');

const enGifting = read(path.join(themeDir, 'pages/en/gifting.php'));
assert(zhGifting.includes('data-info-popover'), 'Chinese gifting page marks scenario info buttons');
assert(enGifting.includes('data-info-popover'), 'English gifting page marks scenario info buttons');
assert(!zhGifting.includes('立即获取企业画册') && !zhGifting.includes('咨询专属顾问'), 'Chinese gifting hero removes the requested CTA controls');
assert(!enGifting.includes('Explore Collections'), 'English gifting hero removes the matching CTA control');
assert(zhGifting.includes('>参考方案</strong>') && !zhGifting.includes('<span>专业合作</span>') && !zhGifting.includes('开启企业礼赠方案'), 'Chinese gifting partner card uses the requested reference-plan wording');
assert(enGifting.includes('>Reference Plan</strong>') && !enGifting.includes('<span>Professional Partnership</span>') && !enGifting.includes('Start a Corporate Program'), 'English gifting partner card mirrors the reference-plan wording');
assert(zhGifting.includes('data-private-copy') && enGifting.includes('data-private-copy'), 'bilingual private-label copy exposes the bounded pointer interaction');
assert(!brandJs.includes('pointermove') && integrationCss.includes('#private-label [data-private-copy]') && integrationCss.includes('position: sticky'), 'private-label copy follows page scrolling with native bounded sticky positioning');
assert(zhGifting.includes('lux-inquiry-divider') && enGifting.includes('lux-inquiry-divider'), 'bilingual inquiry sections use the gold divider');
assert(!zhGifting.includes('>批发采购</strong>') && !zhGifting.includes('>进出口合作</strong>'), 'Chinese inquiry removes the two boxed cooperation options');

const zhBag = read(path.join(themeDir, 'pages/zh/bag.php'));
const enBag = read(path.join(themeDir, 'pages/en/bag.php'));
assert(zhBag.includes('浏览全部') && zhBag.includes("luxureat_static_url('zh/caviar'"), 'Chinese bag browse-all link goes to caviar');
assert(enBag.includes('Browse All') && enBag.includes("luxureat_static_url('en/products'"), 'English bag browse-all link goes to products');
assert(zhBag.includes('data-bag-checkout') && enBag.includes('data-bag-checkout'), 'bilingual bag pages expose the WooCommerce checkout action');
assert(runtimeJs.includes('renderRecommendations') && runtimeJs.includes('data-product-open="${luxEscapeProductHtml(key)}"'), 'bag recommendations render product-detail actions from product data');

const zhJournal = read(path.join(themeDir, 'pages/zh/journal.php'));
const enJournal = read(path.join(themeDir, 'pages/en/journal.php'));
assert(zhJournal.includes('我们的使命与目标') && enJournal.includes('Our Mission &amp; Objectives'), 'bilingual about pages include the independent mission and objectives section');
assert(zhJournal.includes('面向年轻消费者') && zhJournal.includes('关爱银发消费者') && enJournal.includes('For Younger Consumers') && enJournal.includes('For Senior Consumers'), 'bilingual about pages include dedicated younger and senior consumer content');
assert(zhJournal.includes('本地运营主体') && enJournal.includes('local operating company'), 'bilingual about pages clarify LuxurEat China local operating status');
assert(zhJournal.includes('每款产品的具体特点应以相应产品说明为准') && enJournal.includes('must be verified in the relevant product information'), 'bilingual about pages qualify product and dietary characteristics');
assert(zhJournal.includes('about-china-operations.m4v') && zhJournal.includes('about-consumer-needs.m4v') && enJournal.includes('about-china-operations.m4v') && enJournal.includes('about-consumer-needs.m4v'), 'bilingual about pages use the compressed background videos');
const identityVideo = path.join(themeDir, 'assets/media/brand/about-china-operations.m4v');
const audienceVideo = path.join(themeDir, 'assets/media/brand/about-consumer-needs.m4v');
assert(fs.existsSync(identityVideo) && fs.statSync(identityVideo).size < 1.5 * 1024 * 1024, 'China identity background video stays below 1.5 MB');
assert(fs.existsSync(audienceVideo) && fs.statSync(audienceVideo).size < 1.5 * 1024 * 1024, 'consumer background video stays below 1.5 MB');
assert(integrationCss.includes('about-mission-rome.webp') && integrationCss.includes('"Alimama ShuHei"'), 'about program backgrounds and requested display font are present');
assert(integrationCss.includes('[data-certification="OU Kosher"] .lux-cert-card-front img'), 'OU Kosher logo receives a visible dark-card treatment');
assert(runtimeJs.includes('.lux-about-program-media') && runtimeJs.includes('videoObserver'), 'background videos play only near the viewport');
assert(enJournal.includes('Our Story') && enJournal.includes('Brand Story') && enJournal.includes('From a recipe at an Italian family table'), 'English journal hero mirrors the Chinese brand-story content');
assert(zhJournal.includes('data-reader-open="zh-harvest"'), 'Chinese journal opens the harvest reader');
assert(enJournal.includes('data-reader-open="en-harvest"'), 'English journal opens the harvest reader');
assert(zhJournal.includes('data-reader-archive'), 'Chinese journal archive opens inside the shared reader');
assert(enJournal.includes('data-reader-archive'), 'English journal archive opens inside the shared reader');
assert(zhJournal.includes('lux-reader-card'), 'Chinese journal cards expose hover reader actions');
assert(enJournal.includes('lux-reader-card'), 'English journal cards expose hover reader actions');

const zhRituals = read(path.join(themeDir, 'pages/zh/rituals.php'));
assert(zhRituals.includes('data-reader-open="zh-recipe-truffle-eggs"'), 'Chinese rituals pairing cards open reader details');
assert(enRituals.includes('data-reader-open="en-recipe-truffle-eggs"'), 'English rituals pairing cards open reader details');
assert(zhRituals.includes('data-reader-open="zh-recipe-truffle-tagliolini"') && zhRituals.includes('data-reader-open="zh-recipe-truffle-ravioli"') && zhRituals.includes('data-reader-open="zh-recipe-black-truffle-risotto"'), 'Chinese rituals ceremony cards open reader details');
assert(zhRituals.includes("luxureat_static_url('zh/caviar'"), 'Chinese rituals shopping CTA links to products');
assert(enRituals.includes("luxureat_static_url('en/products'"), 'English rituals shopping CTA links to products');
assert(zhRituals.includes('食材购买') && zhRituals.includes('系列产品') && !zhRituals.includes('>去购物<'), 'Chinese rituals shopping CTA uses the requested wording');
assert(enRituals.includes('Buy Now') && enRituals.includes('Products') && !enRituals.includes('>Shop Now<'), 'English rituals shopping CTA mirrors the requested wording');
assert((zhRituals.match(/lux-dark-photo-block/g) || []).length >= 3, 'Chinese rituals ceremony cards use dark photo backgrounds');

assert(runtimeJs.includes('data-product-open="${luxEscapeProductHtml(key)}"') && productDataJs.includes('"zh-imperial-beluga"'), 'Chinese caviar product card opens product details from product data');
assert(zhCaviar.includes("luxureat_static_url('zh/rituals'"), 'Chinese caviar ritual CTA links to rituals');
assert(zhCaviar.includes('lux-dark-photo-block'), 'Chinese caviar page uses dark photo backgrounds');
assert(zhCaviar.includes('系列产品') && !zhCaviar.includes('鱼子酱系列'), 'Chinese product listing uses the requested series label');
assert(zhCaviar.includes('lux-products-main'), 'Chinese product listing hero starts flush below the fixed nav');
const enProducts = read(path.join(themeDir, 'pages/en/products.php'));
assert(enProducts.includes('Premium Products') && enProducts.includes('data-lux-caviar-controls'), 'English products page translates the Chinese product listing');
assert(enProducts.includes('lux-products-main'), 'English product listing hero starts flush below the fixed nav');
assert(runtimeJs.includes('data-product-open="${luxEscapeProductHtml(key)}"') && productDataJs.includes('"en-royal-oscetra"'), 'English products page renders Oscetra product details from product data');
assert(enProducts.includes("luxureat_static_url('en/rituals'"), 'English products ritual CTA links to rituals');
const zhCertification = read(path.join(themeDir, 'pages/zh/certification.php'));
const enCertification = read(path.join(themeDir, 'pages/en/certification.php'));
assert(enCertification.includes('Quality &amp; Certification') && enCertification.includes('Responsible Trade'), 'English certification page mirrors the Chinese certification page');
assert(enCertification.includes('ou-kosher-2026.png') && enCertification.includes('halal-2026.png') && enCertification.includes('vegan-2026.png') && enCertification.includes('excellent-taste-2025.avif') && enCertification.includes('fda-2026.png'), 'English certification page uses the refreshed certification assets');
assert(zhCertification.includes('cert-quality-system.m4v') && enCertification.includes('cert-quality-system.m4v'), 'bilingual certification system sections use the compressed background film');
const certificationVideo = path.join(themeDir, 'assets/media/brand/cert-quality-system.m4v');
assert(fs.existsSync(certificationVideo) && fs.statSync(certificationVideo).size < 1.5 * 1024 * 1024, 'certification background film stays below 1.5 MB');
assert(integrationCss.includes('.lux-cert-system-overlay') && integrationCss.includes('rgba(92, 92, 90, .66)'), 'certification background film uses the requested neutral gray overlay');

const zhContact = read(path.join(themeDir, 'pages/zh/contact.php'));
assert(zhContact.includes('lux-dark-photo-block'), 'Chinese contact hero uses a dark photo background');
assert(zhContact.includes('意大利 • 美国 • 泰国 • 中国'), 'Chinese contact footprint localizes the requested countries');
assert(zhContact.includes('上海市闵行区') && zhContact.includes('联明路389号A栋 505室') && zhContact.includes('邮编: 201101'), 'Chinese contact HQ address is updated');
assert(zhContact.includes('lux-footprint-heading') && !zhContact.includes('<details class="lux-footprint-card'), 'Chinese contact footprint cards are expanded by default');
assert(zhContact.includes('local_dining') && zhContact.includes('temple_buddhist') && zhContact.includes('account_balance'), 'Chinese contact footprint uses country-specific icons');
assert(zhContact.includes('info@truffleat.com') && zhContact.includes('tel:+393515111273') && hasExactHref(zhContact, 'https://www.truffleat.com'), 'Chinese contact Italy card restores its regional contacts');
assert(zhContact.includes('info@luxureat.com') && zhContact.includes('tel:+14256266318'), 'Chinese contact United States card restores its regional contacts');
assert(zhContact.includes('info@truffle.co.th') && zhContact.includes('tel:+6626799441') && hasExactHref(zhContact, 'https://wa.me/66811331337'), 'Chinese contact Thailand card restores its regional contacts');
assert(zhContact.includes('china@luxureat.com') && zhContact.includes('roberto@truffleat.com') && zhContact.includes('tel:+8615721452475'), 'Chinese contact China card remains unchanged');
assert((zhContact.match(/lux-footprint-role/g) || []).length === 4, 'Chinese global footprint explains each regional function');
const enContact = read(path.join(themeDir, 'pages/en/contact.php'));
assert(enContact.includes('Global Presence') && enContact.includes('Italy') && enContact.includes('Thailand') && enContact.includes('China'), 'English contact footprint lists the requested countries');
assert(enContact.includes('Truffleat Srl') && enContact.includes('Luxureat LLC') && enContact.includes('Truffleat Co., Ltd') && enContact.includes('LuxurEat China（露意膳） Ltd'), 'English contact footprint uses the requested entities');
assert(enContact.includes('lux-footprint-heading') && !enContact.includes('<details class="lux-footprint-card'), 'English contact footprint cards are expanded by default');
assert(enContact.includes('info@truffleat.com') && enContact.includes('info@luxureat.com') && enContact.includes('info@truffle.co.th'), 'English contact page restores the regional contacts');
assert((enContact.match(/lux-footprint-role/g) || []).length === 4, 'English global footprint explains each regional function');
assert(zhContact.includes('lux-footprint-video-strip') && enContact.includes('lux-footprint-video-strip'), 'bilingual contact pages place the footprint film in its own container below the four cards');
assert(zhContact.indexOf('lux-footprint-video-strip') > zhContact.lastIndexOf('lux-footprint-card') && enContact.indexOf('lux-footprint-video-strip') > enContact.lastIndexOf('lux-footprint-card'), 'the footprint film follows rather than replaces the location cards');
const footprintVideo = path.join(themeDir, 'assets/media/brand/contact-global-footprint.m4v');
assert(fs.existsSync(footprintVideo) && fs.statSync(footprintVideo).size < 1.5 * 1024 * 1024, 'global footprint background film stays below 1.5 MB');
assert(integrationCss.includes('.lux-footprint-video-fade') && integrationCss.includes('rgba(7, 7, 7, .30)') && integrationCss.includes('#070707 100%'), 'footprint film stays visible and blends into the footer color');
assert(integrationCss.includes('#global-footprint') && integrationCss.includes('padding-bottom: 0 !important') && integrationCss.includes('brightness(.96)'), 'footprint film meets the footer without a gap and remains slightly brighter');
assert(zhContact.includes('让我们共同开拓中国高端食品市场') && enContact.includes('Let Us Grow China’s Premium Food Market Together'), 'bilingual full-width footprint film carries the centered market-development message');
assert(zhContact.includes('contact-market-logo.png') && enContact.includes('contact-market-logo.png') && integrationCss.includes('.lux-footprint-video-logo'), 'bilingual footprint films show the supplied LuxurEat logo above the centered message');
assert(integrationCss.includes('#mission-objectives .lux-about-program-overlay') && integrationCss.includes('rgba(8, 12, 12, .48)') && integrationCss.includes('border-top: 0'), 'mission section keeps the seam closed with a lighter translucent overlay');
assert(zhContact.includes('placeholder="请输入您的电子邮箱"') && enContact.includes('placeholder="Enter your email address"'), 'bilingual contact forms use localized email prompts');
assert(zhContact.includes('lux-contact-network-thumb') && enContact.includes('lux-contact-network-thumb'), 'bilingual contact pages use the global-network business image');
assert((zhContact.match(/lux-contact-service-thumb/g) || []).length === 3 && (enContact.match(/lux-contact-service-thumb/g) || []).length === 3, 'all three bilingual contact thumbnails expose the shared interaction');
assert(zhGifting.includes('luxureat-contact-qr.webp') && enGifting.includes('luxureat-contact-qr.webp'), 'bilingual gifting pages show the supplied contact QR code');
assert(zhGifting.includes('china@luxureat.com') && zhGifting.includes('roberto@truffleat.com') && enGifting.includes('china@luxureat.com') && enGifting.includes('roberto@truffleat.com'), 'bilingual gifting contact block exposes both China and Roberto emails');
assert(zhGifting.includes('诚邀中国经销与') && enGifting.includes('Invitation to Chinese Distribution'), 'bilingual gifting pages lead with distribution and channel partners in China');
assert(zhGifting.includes('直接进口产品') && enGifting.includes('imports products directly into China'), 'bilingual gifting pages clarify China direct-import operations');
assert(!zhGifting.includes('拥有食品进口资质') && !enGifting.includes('food-import qualifications'), 'China partnership no longer requires partners to act as the importer');

const zhHome = read(path.join(themeDir, 'pages/zh/index.php'));
const enHome = read(path.join(themeDir, 'pages/en/index.php'));
assert(zhHome.includes('lux-home-maison-media') && enHome.includes('lux-home-maison-media') && zhHome.includes('home-maison-overview.m4v') && enHome.includes('home-maison-overview.m4v'), 'bilingual home overview sections use the isolated background film');
const maisonVideo = path.join(themeDir, 'assets/media/brand/home-maison-overview.m4v');
assert(fs.existsSync(maisonVideo) && fs.statSync(maisonVideo).size < 1.5 * 1024 * 1024, 'home overview background film stays below 1.5 MB');
assert(integrationCss.includes('.lux-home-maison-overlay') && integrationCss.includes('rgba(4, 7, 7, .84)') && integrationCss.includes('.lux-home-maison-inner'), 'home overview film has a black contrast overlay limited to its own section');
const latestEventJs = read(path.join(themeDir, 'assets/js/events.js'));
const eventDataJs = read(path.join(themeDir, 'assets/data/events.js'));
assert(zhHome.includes('data-latest-event'), 'Chinese home has the latest event mount point');
assert(latestEventJs.includes('LUXUREAT_EVENT_DATA') && !latestEventJs.includes('marca-china-2026.jpeg'), 'latest event script renders shared event data without duplicated content');
assert(eventDataJs.includes('marca-china-2026') && fs.existsSync(path.join(themeDir, 'assets/media/events/marca-china-2026.png')), 'theme includes shared event data and its article image');
assert(zhHome.includes('data-product-open="zh-imperial-beluga"'), 'Chinese home shop CTA opens product detail');
assert(enHome.includes("luxureat_static_url('en/products', '#product-en-imperial-beluga')"), 'English home shop CTA opens product detail through products');
assert(enHome.includes("luxureat_static_url('en/products'"), 'English navigation exposes the products page');
assert(enHome.includes('>Certification</a>') && !enHome.includes('>Quality &amp; Certification</a>'), 'English navigation uses the concise Certification label');
assert(zhGifting.indexOf("luxureat_static_url('zh/certification'") < zhGifting.indexOf("luxureat_static_url('zh/gifting'"), 'Chinese nav puts certification before gifting');
assert(zhGifting.includes('lux-partner-card') && zhGifting.includes("luxureat_static_url('zh/contact'"), 'Chinese gifting inquiry card links to contact');
assert(zhHome.includes('小红书') && zhHome.includes('data-footer-modal="wechat"') && zhHome.includes('微博'), 'Chinese footer exposes localized social actions');
assert(enHome.includes('Rednote') && enHome.includes('WeChat') && enHome.includes('Weibo'), 'English footer exposes social actions');
assert(['rednote.svg', 'wechat.svg', 'douyin.svg', 'weibo.svg'].every((icon) => zhHome.includes(`media/social/${icon}`) && enHome.includes(`media/social/${icon}`)), 'bilingual footers use all four supplied social SVG icons');
assert(zhHome.includes('2026 LUXUREAT CHINA（露意膳）｜ 91310000MAERED2X1W') && enHome.includes('2026 LUXUREAT CHINA（露意膳）｜ 91310000MAERED2X1W'), 'bilingual footers use the updated 2026 copyright line');
assert(hasExactHref(zhHome, 'https://xhslink.com/m/AfATtrqiQvu') && hasExactHref(zhHome, 'https://v.douyin.com/oEPE48mPS48/'), 'Chinese footer uses the updated Rednote and Douyin links');
assert(hasExactHref(enHome, 'https://xhslink.com/m/AfATtrqiQvu') && hasExactHref(enHome, 'https://v.douyin.com/oEPE48mPS48/'), 'English footer uses the updated Rednote and Douyin links');
assert(zhHome.includes('mailto:china@luxureat.com?cc=roberto@truffleat.com') && zhHome.includes('roberto@truffleat.com') && zhHome.includes('tel:+8615721452475'), 'Chinese footer exposes both emails with China as recipient and Roberto in copy');
assert(enHome.includes('mailto:china@luxureat.com?cc=roberto@truffleat.com') && enHome.includes('roberto@truffleat.com') && enHome.includes('tel:+8615721452475'), 'English footer exposes both emails with China as recipient and Roberto in copy');

assert(fs.existsSync(zipFile), 'theme zip exists');
if (fs.existsSync(zipFile)) {
  try {
    const entries = execFileSync('unzip', ['-Z1', zipFile], { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    assert(entries.includes('luxureat-static/style.css'), 'zip contains luxureat-static/style.css');
    assert(entries.includes('luxureat-static/.htaccess'), 'zip contains static asset cache rules');
    assert(entries.includes('luxureat-static/index.php'), 'zip contains luxureat-static/index.php');
    assert(entries.includes('luxureat-static/functions.php'), 'zip contains luxureat-static/functions.php');
    assert(entries.includes('luxureat-static/assets/media/brand/luxureat-logo.png'), 'zip contains logo asset');
    assert(entries.includes('luxureat-static/assets/media/brand/wechat-qr.webp'), 'zip contains WeChat QR asset');
    assert(entries.includes('luxureat-static/assets/data/products.js'), 'zip contains product data asset');
    assert(entries.some((entry) => entry.startsWith('luxureat-static/assets/media/brand/')), 'zip contains local image assets');
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
