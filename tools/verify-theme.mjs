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
