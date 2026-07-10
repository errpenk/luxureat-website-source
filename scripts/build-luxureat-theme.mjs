import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const sourceDir = path.resolve(process.argv[2] || process.cwd());
const outputRoot = path.resolve(process.argv[3] || process.cwd());
const themeDir = path.join(outputRoot, 'luxureat-static');
const zipFile = path.join(outputRoot, 'luxureat-static-theme.zip');

const pageInputs = [
  ['zh', 'index', 'zh/index.html'],
  ['zh', 'caviar', 'zh/caviar.html'],
  ['zh', 'rituals', 'zh/rituals.html'],
  ['zh', 'journal', 'zh/journal.html'],
  ['zh', 'gifting', 'zh/gifting.html'],
  ['zh', 'certification', 'zh/certification.html'],
  ['zh', 'contact', 'zh/contact.html'],
  ['zh', 'bag', 'zh/bag.html'],
  ['en', 'index', 'en/index.html'],
  ['en', 'caviar', 'en/caviar.html'],
  ['en', 'products', 'en/products.html'],
  ['en', 'rituals', 'en/rituals.html'],
  ['en', 'journal', 'en/journal.html'],
  ['en', 'gifting', 'en/gifting.html'],
  ['en', 'contact', 'en/contact.html'],
  ['en', 'private', 'en/private.html'],
  ['en', 'bag', 'en/bag.html'],
];

function ensureSource() {
  for (const file of ['README.md', 'integration.css', 'main.js', 'assets/luxureat-logo.png', 'assets/wechat-qr.png']) {
    if (!fs.existsSync(path.join(sourceDir, file))) {
      throw new Error(`Missing source file: ${path.join(sourceDir, file)}`);
    }
  }
  for (const [, , htmlFile] of pageInputs) {
    if (!fs.existsSync(path.join(sourceDir, htmlFile))) {
      throw new Error(`Missing source page: ${path.join(sourceDir, htmlFile)}`);
    }
  }
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, contents) {
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function routeKey(lang, slug) {
  return slug === 'index' ? lang : `${lang}/${slug}`;
}

function escapePhpString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function phpRouteUrl(lang, slug, suffix = '') {
  return `<?php echo esc_url(luxureat_static_url('${routeKey(lang, slug)}', '${escapePhpString(suffix)}')); ?>`;
}

function hasUrlScheme(href) {
  return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(href.trimStart());
}

function stripKnownLocalIncludes(html) {
  const localStylesheetTag = '<link rel="stylesheet" href="../integration.css">';
  const scriptOpen = '<script src="../main.js">';
  const scriptClose = '</script>';

  return html
    .split(localStylesheetTag)
    .join('')
    .split(`${scriptOpen}${scriptClose}`)
    .join('');
}

function rewriteHref(href, currentLang) {
  const trimmedHref = href.trimStart();

  if (
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('//') ||
    hasUrlScheme(trimmedHref) ||
    href.includes('<?php')
  ) {
    return href;
  }

  const sibling = href.match(/^([A-Za-z0-9-]+|index)\.html([?#].*)?$/);
  if (sibling) {
    return phpRouteUrl(currentLang, sibling[1], sibling[2] || '');
  }

  const crossLang = href.match(/^\.\.\/(zh|en)\/([A-Za-z0-9-]+|index)\.html([?#].*)?$/);
  if (crossLang) {
    return phpRouteUrl(crossLang[1], crossLang[2], crossLang[3] || '');
  }

  return href;
}

function convertHtml(file, lang) {
  let html = fs.readFileSync(path.join(sourceDir, file), 'utf8');

  html = stripKnownLocalIncludes(html);

  html = html.replace(/\b(src|href)=(["'])\.\.\/assets\/luxureat-logo\.png\2/g, (_match, attr, quote) => {
    return `${attr}=${quote}<?php echo esc_url(get_template_directory_uri() . '/assets/luxureat-logo.png'); ?>${quote}`;
  });

  html = html.replace(/\bhref=(["'])([^"']+)\1/g, (match, quote, href) => {
    const nextHref = rewriteHref(href, lang);
    return nextHref === href ? match : `href=${quote}${nextHref}${quote}`;
  });

  html = html.replace(/<\/head>/i, "<?php wp_head(); ?>\n</head>");
  html = html.replace(/<\/body>/i, "<?php wp_footer(); ?>\n</body>");

  return html;
}

function buildRoutesPhp() {
  const lines = [
    '<?php',
    'return array(',
  ];
  for (const [lang, slug] of pageInputs) {
    const route = slug === 'index' ? lang : `${lang}/${slug}`;
    const file = slug === 'index' ? `pages/${lang}/index.php` : `pages/${lang}/${slug}.php`;
    lines.push(`    '${route}' => '${file}',`);
  }
  lines.push(');', '');
  return lines.join('\n');
}

function styleCss() {
  return `/*
Theme Name: LuxurEat Static
Theme URI: https://github.com/errpenk/luxureat-website-source
Author: LuxurEat
Description: Static LuxurEat bilingual prototype packaged as a WordPress theme.
Version: 1.0.3
Requires at least: 6.0
Text Domain: luxureat-static
*/
`;
}

function functionsPhp() {
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

function luxureat_static_routes() {
    $routes = require get_template_directory() . '/routes.php';
    return is_array($routes) ? $routes : array();
}

function luxureat_static_aliases() {
    return array(
        'index.html' => 'zh',
        'zh/index.html' => 'zh',
        'en/index.html' => 'en',
        'caviar' => 'zh/caviar',
        'caviar.html' => 'zh/caviar',
        'rituals' => 'zh/rituals',
        'rituals.html' => 'zh/rituals',
        'journal' => 'zh/journal',
        'journal.html' => 'zh/journal',
        'gifting' => 'zh/gifting',
        'gifting.html' => 'zh/gifting',
        'certification' => 'zh/certification',
        'certification.html' => 'zh/certification',
        'contact' => 'zh/contact',
        'contact.html' => 'zh/contact',
        'bag' => 'zh/bag',
        'bag.html' => 'zh/bag',
        'private-selection' => 'en/private',
        'private-selection.html' => 'en/private',
        'product-imperial-beluga' => 'zh/caviar',
        'product-imperial-beluga.html' => 'zh/caviar',
    );
}

function luxureat_static_normalize_path($path) {
    $path = is_string($path) ? $path : '';
    $path = trim($path);
    $path = trim($path, '/');
    $path = preg_replace('#/+#', '/', $path);
    return $path ? $path : '';
}

function luxureat_static_pretty_paths() {
    return array(
        'zh' => '/',
        'zh/caviar' => '/caviar/',
        'zh/rituals' => '/rituals/',
        'zh/journal' => '/journal/',
        'zh/gifting' => '/gifting/',
        'zh/certification' => '/certification/',
        'zh/contact' => '/contact/',
        'zh/bag' => '/bag/',
        'en' => '/en/',
        'en/caviar' => '/en/caviar/',
        'en/products' => '/en/products/',
        'en/rituals' => '/en/rituals/',
        'en/journal' => '/en/journal/',
        'en/gifting' => '/en/gifting/',
        'en/contact' => '/en/contact/',
        'en/private' => '/en/private/',
        'en/bag' => '/en/bag/',
    );
}

function luxureat_static_url($path = 'zh', $suffix = '') {
    $path = luxureat_static_normalize_path($path);
    $suffix = is_string($suffix) ? $suffix : '';
    $pretty_paths = luxureat_static_pretty_paths();

    $url = isset($pretty_paths[$path])
        ? home_url($pretty_paths[$path])
        : home_url('/' . $path . '/');

    return $url . $suffix;
}

function luxureat_static_current_path() {
    $query_path = get_query_var('luxureat_path');
    if (is_string($query_path) && $query_path !== '') {
        return luxureat_static_normalize_path($query_path);
    }

    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $home_path = parse_url(home_url('/'), PHP_URL_PATH);

    $request_path = is_string($request_path) ? $request_path : '/';
    $home_path = is_string($home_path) ? $home_path : '/';

    if ($home_path !== '/' && strpos($request_path, $home_path) === 0) {
        $request_path = substr($request_path, strlen($home_path));
    }

    return luxureat_static_normalize_path($request_path);
}

function luxureat_static_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();

    wp_enqueue_style(
        'luxureat-integration',
        $theme_uri . '/integration.css',
        array(),
        filemtime($theme_dir . '/integration.css')
    );

    wp_enqueue_script(
        'luxureat-main',
        $theme_uri . '/main.js',
        array(),
        filemtime($theme_dir . '/main.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'luxureat_static_assets');

function luxureat_static_register_routes() {
    foreach (array_keys(luxureat_static_routes()) as $route) {
        add_rewrite_rule('^' . preg_quote($route, '/') . '/?$', 'index.php?luxureat_path=' . $route, 'top');
    }

    foreach (array_keys(luxureat_static_aliases()) as $alias) {
        add_rewrite_rule('^' . preg_quote($alias, '/') . '/?$', 'index.php?luxureat_path=' . $alias, 'top');
    }

    add_rewrite_rule('^$', 'index.php?luxureat_path=__home', 'top');
}
add_action('init', 'luxureat_static_register_routes');

function luxureat_static_query_vars($vars) {
    $vars[] = 'luxureat_path';
    return $vars;
}
add_filter('query_vars', 'luxureat_static_query_vars');

function luxureat_static_template_include($template) {
    $path = luxureat_static_current_path();
    $routes = luxureat_static_routes();
    $aliases = luxureat_static_aliases();

    if ($path === '' || $path === '__home' || isset($routes[$path]) || isset($aliases[$path])) {
        return get_template_directory() . '/index.php';
    }

    return $template;
}
add_filter('template_include', 'luxureat_static_template_include');

function luxureat_static_flush_rewrites() {
    luxureat_static_register_routes();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'luxureat_static_flush_rewrites');
add_action('switch_theme', 'flush_rewrite_rules');
`;
}

function indexPhp() {
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

$routes = require get_template_directory() . '/routes.php';
$path = luxureat_static_current_path();
$aliases = luxureat_static_aliases();

if ($path === '' || $path === '__home') {
    $path = 'zh';
}

if (isset($aliases[$path])) {
    $target_path = $aliases[$path];
    $pretty_paths = luxureat_static_pretty_paths();
    $canonical_request_path = isset($pretty_paths[$target_path]) ? trim($pretty_paths[$target_path], '/') : '';

    if ($canonical_request_path === $path) {
        $path = $target_path;
    } else {
        wp_safe_redirect(luxureat_static_url($target_path), 301);
        exit;
    }
}

if (!isset($routes[$path])) {
    status_header(404);
    nocache_headers();
    ?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php esc_html_e('Page not found', 'luxureat-static'); ?></title>
    <?php wp_head(); ?>
</head>
<body style="margin:0;background:#101010;color:#e5e2e1;font-family:Montserrat,Arial,sans-serif;display:grid;min-height:100vh;place-items:center;text-align:center;padding:24px;">
    <main>
        <p style="color:#9df5ec;letter-spacing:.2em;text-transform:uppercase;font-size:12px;">LuxurEat</p>
        <h1 style="font-family:Georgia,serif;font-weight:400;"><?php esc_html_e('Page not found', 'luxureat-static'); ?></h1>
        <p><a style="color:#e9c349;" href="<?php echo esc_url(luxureat_static_url('zh')); ?>"><?php esc_html_e('Return to home', 'luxureat-static'); ?></a></p>
    </main>
    <?php wp_footer(); ?>
</body>
</html><?php
    exit;
}

status_header(200);
include get_template_directory() . '/' . $routes[$path];
`;
}

function readme() {
  return `# LuxurEat Static WordPress Theme

This package wraps the static bilingual LuxurEat website source from https://github.com/errpenk/luxureat-website-source as a WordPress theme.

## Install

1. Upload \`luxureat-static-theme.zip\` in WordPress: Appearance -> Themes -> Add New -> Upload Theme.
2. Activate **LuxurEat Static**.
3. Open Settings -> Permalinks once and save if routes do not appear immediately.

## Routes

- \`/\` serves the Chinese home page.
- Default Chinese routes use root-level pretty URLs such as \`/caviar/\`, \`/rituals/\`, and \`/contact/\`.
- English routes use \`/en/\`, \`/en/caviar/\`, and the rest of the \`/en/.../\` namespace.

## Notes

- The current version prioritizes visual fidelity and static routing.
- Local assets, \`integration.css\`, and \`main.js\` are loaded through WordPress theme APIs.
- Most photographic images remain the original external prototype image URLs.
`;
}

function build() {
  ensureSource();

  fs.rmSync(themeDir, { recursive: true, force: true });
  fs.rmSync(zipFile, { force: true });
  mkdirp(themeDir);

  fs.copyFileSync(path.join(sourceDir, 'integration.css'), path.join(themeDir, 'integration.css'));
  fs.copyFileSync(path.join(sourceDir, 'main.js'), path.join(themeDir, 'main.js'));
  mkdirp(path.join(themeDir, 'assets'));
  fs.copyFileSync(path.join(sourceDir, 'assets/luxureat-logo.png'), path.join(themeDir, 'assets/luxureat-logo.png'));
  fs.copyFileSync(path.join(sourceDir, 'assets/wechat-qr.png'), path.join(themeDir, 'assets/wechat-qr.png'));

  const screenshotSource = path.join(sourceDir, 'qa/zh-home-desktop.png');
  fs.copyFileSync(
    fs.existsSync(screenshotSource) ? screenshotSource : path.join(sourceDir, 'assets/luxureat-logo.png'),
    path.join(themeDir, 'screenshot.png')
  );

  write(path.join(themeDir, 'style.css'), styleCss());
  write(path.join(themeDir, 'functions.php'), functionsPhp());
  write(path.join(themeDir, 'index.php'), indexPhp());
  write(path.join(themeDir, 'routes.php'), buildRoutesPhp());
  write(path.join(themeDir, 'README.md'), readme());

  for (const [lang, slug, htmlFile] of pageInputs) {
    const outFile = slug === 'index'
      ? path.join(themeDir, 'pages', lang, 'index.php')
      : path.join(themeDir, 'pages', lang, `${slug}.php`);
    write(outFile, convertHtml(htmlFile, lang));
  }

  execFileSync('zip', ['-qr', zipFile, 'luxureat-static', '-x', '*.DS_Store', '__MACOSX/*'], {
    cwd: outputRoot,
    stdio: 'inherit',
  });

  console.log(`Theme written to ${themeDir}`);
  console.log(`Theme zip written to ${zipFile}`);
}

build();
