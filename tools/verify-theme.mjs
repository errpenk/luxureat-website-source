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
assert(mainJs.includes('scrollRestoration'), 'main.js restores saved scroll positions manually');
assert(mainJs.includes('lux-back-to-top'), 'main.js adds the back-to-top floating action button');
assert(mainJs.includes('aria-pressed'), 'main.js updates pressed states for caviar toolbar buttons');
assert(mainJs.includes('.hidden ='), 'main.js hides filtered-out caviar product cards');

const integrationCss = read(path.join(themeDir, 'integration.css'));
assert(integrationCss.includes('[data-caviar-grid].is-list'), 'integration.css defines the caviar list view layout');
assert(integrationCss.includes('[data-caviar-item][hidden]'), 'integration.css hides filtered caviar product cards reliably');
assert(integrationCss.includes('.lux-sort-menu'), 'integration.css styles the sort menu');
assert(integrationCss.includes('.lux-back-to-top'), 'integration.css styles the back-to-top button');

const enRituals = read(path.join(themeDir, 'pages/en/rituals.php'));
assert(!enRituals.includes('style="opacity: 0;">Caviar should be served chilled'), 'English rituals temperature copy is visible');

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
