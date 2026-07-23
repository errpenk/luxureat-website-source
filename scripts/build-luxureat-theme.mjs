import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pages, scripts } from '../site.config.mjs';

const sourceDir = path.resolve(process.argv[2] || process.cwd());
const outputRoot = path.resolve(process.argv[3] || process.cwd());
const themeDir = path.join(outputRoot, 'luxureat-static');
const zipFile = path.join(outputRoot, 'luxureat-static-theme.zip');

const pageInputs = pages.map(({ lang, slug, file }) => [lang, slug, file]);

function ensureSource() {
  for (const file of ['README.md', '.htaccess', 'integration.css', 'assets/media/brand/luxureat-logo.png', 'assets/media/brand/wechat-qr.webp', 'assets/data/products.js', 'assets/data/events.js', 'assets/data/journal.js', 'assets/data/brand.js', 'assets/js/core.js', 'assets/js/products.js', 'assets/js/events.js', 'assets/js/journal.js', 'assets/js/brand.js']) {
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

function copyDir(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const sourcePath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
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

function phpThemeAsset(assetPath) {
  return `<?php echo esc_url(get_template_directory_uri() . '/assets/${escapePhpString(assetPath)}'); ?>`;
}

function hasUrlScheme(href) {
  return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(href.trimStart());
}

function attrIncludes(tag, attr, value) {
  const marker = `${attr}=`;
  let offset = 0;
  while (offset < tag.length) {
    const index = tag.indexOf(marker, offset);
    if (index === -1) return false;
    const quote = tag[index + marker.length];
    if (quote !== '"' && quote !== "'") {
      offset = index + marker.length;
      continue;
    }
    const start = index + marker.length + 1;
    const end = tag.indexOf(quote, start);
    if (end === -1) return false;
    if (tag.slice(start, end).startsWith(value)) return true;
    offset = end + 1;
  }
  return false;
}

function stripTagByAttr(html, tagName, attr, value) {
  let output = '';
  let offset = 0;
  const lower = html.toLowerCase();
  const openNeedle = `<${tagName}`;
  const closeNeedle = `</${tagName}>`;

  while (offset < html.length) {
    const start = lower.indexOf(openNeedle, offset);
    if (start === -1) break;
    const openEnd = html.indexOf('>', start);
    if (openEnd === -1) break;
    const tag = html.slice(start, openEnd + 1);
    const end = tagName === 'script'
      ? lower.indexOf(closeNeedle, openEnd + 1)
      : openEnd;
    if (end === -1) break;
    const tagEnd = tagName === 'script' ? end + closeNeedle.length : end + 1;
    if (attrIncludes(tag, attr, value)) {
      output += html.slice(offset, start);
      offset = tagEnd;
    } else {
      output += html.slice(offset, tagEnd);
      offset = tagEnd;
    }
  }

  return output + html.slice(offset);
}

function stripKnownLocalIncludes(html) {
  return [
    ['link', 'href', '../integration.css'],
    ['script', 'src', '../assets/data/products.js'],
    ['script', 'src', '../assets/data/events.js'],
    ['script', 'src', '../assets/data/journal.js'],
    ['script', 'src', '../assets/data/brand.js'],
    ['script', 'src', '../assets/js/core.js'],
    ['script', 'src', '../assets/js/products.js'],
    ['script', 'src', '../assets/js/events.js'],
    ['script', 'src', '../assets/js/journal.js'],
    ['script', 'src', '../assets/js/brand.js'],
  ].reduce((source, args) => stripTagByAttr(source, ...args), html);
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

  html = html.replace(/\b(src|href|poster|data-lux-bg)=(["'])\.\.\/assets\/([^"']+)\2/g, (_match, attr, quote, assetPath) => {
    return `${attr}=${quote}${phpThemeAsset(assetPath)}${quote}`;
  });
  html = html.replace(/url\((['"]?)\.\.\/assets\/([^'")]+)\1\)/g, (_match, quote, assetPath) => {
    return `url(${quote}${phpThemeAsset(assetPath)}${quote})`;
  });
  html = html.replace(/url\(&quot;\.\.\/assets\/([^&]+)&quot;\)/g, (_match, assetPath) => {
    return `url(&quot;${phpThemeAsset(assetPath)}&quot;)`;
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

function phpList(values) {
  return `array(${values.map((value) => `'${escapePhpString(value)}'`).join(', ')})`;
}

function buildAssetCatalogPhp() {
  const catalog = Object.entries(scripts).map(([handle, script]) => {
    return `        '${escapePhpString(handle)}' => array('src' => '${escapePhpString(script.src)}', 'dependencies' => ${phpList(script.dependencies)}),`;
  }).join('\n');
  const byPath = pages.map((page) => {
    return `        '${escapePhpString(page.route)}' => ${phpList(page.scripts)},`;
  }).join('\n');
  return { catalog, byPath };
}

function functionsPhp() {
  const { catalog, byPath } = buildAssetCatalogPhp();
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
        'news' => 'zh/news',
        'news.html' => 'zh/news',
        'gifting' => 'zh/gifting',
        'gifting.html' => 'zh/gifting',
        'certification' => 'zh/certification',
        'certification.html' => 'zh/certification',
        'contact' => 'zh/contact',
        'contact.html' => 'zh/contact',
        'bag' => 'zh/bag',
        'bag.html' => 'zh/bag',
        'en/caviar' => 'en/products',
        'en/caviar.html' => 'en/products',
        'en/private' => 'en/gifting',
        'en/private.html' => 'en/gifting',
        'private-selection' => 'en/gifting',
        'private-selection.html' => 'en/gifting',
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
        'zh/news' => '/news/',
        'zh/gifting' => '/gifting/',
        'zh/certification' => '/certification/',
        'zh/contact' => '/contact/',
        'zh/bag' => '/bag/',
        'en' => '/en/',
        'en/products' => '/en/products/',
        'en/rituals' => '/en/rituals/',
        'en/journal' => '/en/journal/',
        'en/news' => '/en/news/',
        'en/gifting' => '/en/gifting/',
        'en/certification' => '/en/certification/',
        'en/contact' => '/en/contact/',
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

function luxureat_static_woo_catalog() {
    if (!function_exists('wc_get_product_id_by_sku')) {
        return array();
    }

    $catalog = array();
    foreach (array('imperial-beluga-30g', 'royal-oscetra-30g', 'mother-of-pearl-spoons', 'champagne', 'ice-server') as $sku) {
        $product_id = wc_get_product_id_by_sku($sku);
        $product = $product_id ? wc_get_product($product_id) : false;
        if (!$product) {
            continue;
        }

        $image_id = $product->get_image_id();
        $gallery = array_values(array_filter(array_map(function ($attachment_id) {
            return wp_get_attachment_image_url($attachment_id, 'full');
        }, $product->get_gallery_image_ids())));
        $stock_quantity = $product->managing_stock() ? $product->get_stock_quantity() : null;
        $max_quantity = $product->is_sold_individually()
            ? 1
            : ($stock_quantity !== null && !$product->backorders_allowed() ? max(0, (int) $stock_quantity) : 99);

        $catalog[$sku] = array(
            'id' => $product->get_id(),
            'sku' => $sku,
            'name' => $product->get_name(),
            'description' => wp_strip_all_tags($product->get_short_description() ?: $product->get_description()),
            'price' => (float) $product->get_price(),
            'currency' => html_entity_decode(get_woocommerce_currency_symbol(), ENT_QUOTES, 'UTF-8'),
            'image' => $image_id ? wp_get_attachment_image_url($image_id, 'full') : '',
            'gallery' => $gallery,
            'stockStatus' => $product->get_stock_status(),
            'stockQuantity' => $stock_quantity,
            'available' => $product->is_purchasable() && $product->is_in_stock(),
            'maxQuantity' => $max_quantity,
        );
    }
    return $catalog;
}

function luxureat_static_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    $path = luxureat_static_current_path();
    $path = $path === '' ? 'zh' : $path;
    $aliases = luxureat_static_aliases();
    $path = isset($aliases[$path]) ? $aliases[$path] : $path;

    wp_enqueue_style(
        'luxureat-integration',
        $theme_uri . '/integration.css',
        array(),
        filemtime($theme_dir . '/integration.css')
    );

    $catalog = array(
${catalog}
    );
    $assets_by_path = array(
${byPath}
    );

    foreach (isset($assets_by_path[$path]) ? $assets_by_path[$path] : array('core') as $handle) {
        if (!isset($catalog[$handle])) {
            continue;
        }
        $script = $catalog[$handle];
        $source = $theme_dir . '/' . $script['src'];
        if (!is_file($source)) {
            continue;
        }
        $dependencies = array_map(function ($dependency) {
            return 'luxureat-' . $dependency;
        }, $script['dependencies']);
        wp_enqueue_script(
            'luxureat-' . $handle,
            $theme_uri . '/' . $script['src'],
            $dependencies,
            filemtime($source),
            true
        );
        if ($handle === 'core') {
            wp_localize_script('luxureat-core', 'LuxureatAccount', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_account'),
                'loggedIn' => is_user_logged_in(),
                'lostPasswordUrl' => wp_lostpassword_url(home_url('/')),
                'logoutUrl' => wp_logout_url(home_url('/')),
            ));
        }
        if ($handle === 'products') {
            wp_localize_script('luxureat-products', 'LuxureatCheckout', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_checkout'),
            ));
            wp_localize_script('luxureat-products', 'LuxureatWooCatalog', array(
                'products' => luxureat_static_woo_catalog(),
            ));
        }
    }
}
add_action('wp_enqueue_scripts', 'luxureat_static_assets');

function luxureat_static_mailpoet_subscribe($email) {
    if (!class_exists('\\MailPoet\\API\\API')) {
        return new WP_Error('mailpoet_unavailable');
    }

    try {
        $api = \\MailPoet\\API\\API::MP('v1');
        $lists = array_values(array_filter($api->getLists(), function ($list) {
            return isset($list['type']) && $list['type'] === 'default' && empty($list['deleted_at']);
        }));
        if (!$lists) {
            return new WP_Error('mailpoet_list_missing');
        }

        $preferred = array_values(array_filter($lists, function ($list) {
            return stripos($list['name'], 'LuxurEat') !== false;
        }));
        $list_id = (int) ($preferred ? $preferred[0]['id'] : $lists[0]['id']);
        $options = array('send_confirmation_email' => true, 'schedule_welcome_email' => true);
        try {
            $subscriber = $api->getSubscriber($email);
            $api->subscribeToLists($subscriber['id'], array($list_id), $options);
        } catch (\\MailPoet\\API\\MP\\v1\\APIException $error) {
            if ((int) $error->getCode() !== 4) {
                throw $error;
            }
            $api->addSubscriber(array('email' => $email), array($list_id), $options);
        }
        return true;
    } catch (\\Throwable $error) {
        return new WP_Error('mailpoet_failed');
    }
}

function luxureat_static_account_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_account')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (is_user_logged_in()) {
        wp_send_json_success();
    }

    $mode = isset($_POST['mode']) ? sanitize_key(wp_unslash($_POST['mode'])) : 'login';
    $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    $password = isset($_POST['password']) ? (string) wp_unslash($_POST['password']) : '';
    if (!is_email($email)) {
        wp_send_json_error(array('message' => $message('请输入有效邮箱。', 'Enter a valid email address.')), 400);
    }

    if ($mode === 'forgot') {
        $user = get_user_by('email', $email);
        if ($user) {
            $sent = retrieve_password($user->user_login);
            if (is_wp_error($sent)) {
                wp_send_json_error(array('message' => $message('暂时无法发送重置邮件，请稍后再试。', 'The reset email could not be sent. Please try again later.')), 500);
            }
        }
        wp_send_json_success(array('message' => $message('如果该邮箱已注册，密码重置链接已发送，请检查收件箱和垃圾邮件。', 'If the email is registered, a reset link has been sent. Please check your inbox and spam folder.')));
    }

    if (strlen($password) < 8) {
        wp_send_json_error(array('message' => $message('请输入有效邮箱和至少 8 位密码。', 'Enter a valid email and a password of at least 8 characters.')), 400);
    }

    if ($mode === 'register') {
        if (!function_exists('wc_create_new_customer') || get_option('woocommerce_enable_myaccount_registration') !== 'yes') {
            wp_send_json_error(array('message' => $message('暂未开放账号注册。', 'Account registration is not available yet.')), 403);
        }
        $user_id = wc_create_new_customer($email, '', $password);
        if (is_wp_error($user_id)) {
            wp_send_json_error(array('message' => wp_strip_all_tags($user_id->get_error_message())), 400);
        }
        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id, true, is_ssl());
        if (!empty($_POST['newsletter'])) {
            luxureat_static_mailpoet_subscribe($email);
        }
        wp_send_json_success();
    }

    $user = get_user_by('email', $email);
    $credentials = array(
        'user_login' => $user ? $user->user_login : $email,
        'user_password' => $password,
        'remember' => !empty($_POST['remember']),
    );
    $signed_in = wp_signon($credentials, is_ssl());
    if (is_wp_error($signed_in)) {
        wp_send_json_error(array('message' => $message('邮箱或密码不正确。', 'Incorrect email or password.')), 401);
    }
    wp_send_json_success();
}
add_action('wp_ajax_nopriv_luxureat_account', 'luxureat_static_account_ajax');
add_action('wp_ajax_luxureat_account', 'luxureat_static_account_ajax');

function luxureat_static_checkout_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_checkout')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (!is_user_logged_in()) {
        wp_send_json_error(array('message' => $message('请先登录账号，然后继续结算。', 'Please sign in before continuing to checkout.')), 401);
    }
    if (!function_exists('WC') || !function_exists('wc_get_product_id_by_sku')) {
        wp_send_json_error(array('message' => $message('结算服务暂时不可用。', 'Checkout is temporarily unavailable.')), 503);
    }
    if (null === WC()->cart && function_exists('wc_load_cart')) {
        wc_load_cart();
    }
    if (null === WC()->cart) {
        wp_send_json_error(array('message' => $message('无法建立购物车。', 'Could not start the cart.')), 503);
    }

    $items = isset($_POST['items']) ? json_decode(wp_unslash($_POST['items']), true) : null;
    if (!is_array($items) || !$items || count($items) > 20) {
        wp_send_json_error(array('message' => $message('购物袋数据无效。', 'The bag data is invalid.')), 400);
    }

    $desired = array();
    foreach ($items as $item) {
        $sku = isset($item['sku']) ? sanitize_text_field($item['sku']) : '';
        $quantity = isset($item['quantity']) ? absint($item['quantity']) : 0;
        $product_id = $sku ? wc_get_product_id_by_sku($sku) : 0;
        $product = $product_id ? wc_get_product($product_id) : false;
        if (!$product || !$product->is_purchasable() || !$product->is_in_stock() || $quantity < 1 || $quantity > 99 || ($product->is_sold_individually() && $quantity > 1) || !$product->has_enough_stock($quantity)) {
            wp_send_json_error(array('message' => $message('商品已下架或数量无效。', 'A product is unavailable or its quantity is invalid.')), 400);
        }
        $desired[$sku] = array('id' => $product_id, 'quantity' => isset($desired[$sku]) ? $desired[$sku]['quantity'] + $quantity : $quantity);
        if ($desired[$sku]['quantity'] > 99 || !$product->has_enough_stock($desired[$sku]['quantity'])) {
            wp_send_json_error(array('message' => $message('商品数量超出库存限制。', 'The requested quantity exceeds available stock.')), 400);
        }
    }

    foreach (WC()->cart->get_cart() as $key => $cart_item) {
        $sku = isset($cart_item['data']) ? $cart_item['data']->get_sku() : '';
        if (!isset($desired[$sku])) {
            WC()->cart->remove_cart_item($key);
            continue;
        }
        if ((int) $cart_item['quantity'] !== $desired[$sku]['quantity']) {
            WC()->cart->set_quantity($key, $desired[$sku]['quantity'], false);
        }
        unset($desired[$sku]);
    }
    foreach ($desired as $item) {
        if (!WC()->cart->add_to_cart($item['id'], $item['quantity'])) {
            wp_send_json_error(array('message' => $message('商品无法加入购物车。', 'A product could not be added to the cart.')), 400);
        }
    }
    WC()->cart->calculate_totals();
    WC()->cart->set_session();
    $checkout_url = $is_zh ? wc_get_checkout_url() : add_query_arg('lang', 'en', wc_get_checkout_url());
    wp_send_json_success(array('checkoutUrl' => $checkout_url));
}
add_action('wp_ajax_nopriv_luxureat_checkout', 'luxureat_static_checkout_ajax');
add_action('wp_ajax_luxureat_checkout', 'luxureat_static_checkout_ajax');

function luxureat_static_require_account_for_checkout() {
    if (function_exists('is_checkout') && is_checkout() && !is_user_logged_in() && !wp_doing_ajax()) {
        wp_safe_redirect(add_query_arg('account', 'required', home_url('/')));
        exit;
    }
}
add_action('template_redirect', 'luxureat_static_require_account_for_checkout', 0);

function luxureat_static_translate_shipping_rates($rates) {
    $language = function_exists('WC') && WC()->session ? WC()->session->get('luxureat_checkout_lang', 'zh') : 'zh';
    if ($language !== 'zh') {
        return $rates;
    }
    foreach ($rates as $rate) {
        if (is_object($rate) && method_exists($rate, 'get_method_id') && $rate->get_method_id() === 'free_shipping') {
            $rate->set_label('免费配送');
        }
    }
    return $rates;
}
add_filter('woocommerce_package_rates', 'luxureat_static_translate_shipping_rates', 100);

function luxureat_static_restrict_test_payment($gateways) {
    if (!current_user_can('manage_woocommerce')) {
        unset($gateways['cheque']);
    }
    return $gateways;
}
add_filter('woocommerce_available_payment_gateways', 'luxureat_static_restrict_test_payment', 100);

function luxureat_static_cart_item_images($images, $cart_item) {
    $product = isset($cart_item['data']) ? $cart_item['data'] : false;
    if (!$product instanceof WC_Product) {
        return $images;
    }
    if ($product->get_image_id()) {
        return $images;
    }
    $files = array(
        'imperial-beluga-30g' => 'lux-005.jpg',
        'royal-oscetra-30g' => 'lux-030.jpg',
        'mother-of-pearl-spoons' => 'lux-022.jpg',
        'champagne' => 'lux-042.jpg',
        'ice-server' => 'lux-039.jpg',
    );
    $sku = $product->get_sku();
    if (!isset($files[$sku])) {
        return $images;
    }
    $url = get_template_directory_uri() . '/assets/media/products/' . $files[$sku];
    return array((object) array(
        'id' => $product->get_id(),
        'src' => $url,
        'thumbnail' => $url,
        'srcset' => '',
        'sizes' => '',
        'name' => $product->get_name(),
        'alt' => $product->get_name(),
    ));
}
add_filter('woocommerce_store_api_cart_item_images', 'luxureat_static_cart_item_images', 10, 2);

function luxureat_static_remove_checkout_marketing_optin($integration_registry) {
    if (
        is_object($integration_registry)
        && method_exists($integration_registry, 'is_registered')
        && method_exists($integration_registry, 'unregister')
        && $integration_registry->is_registered('mailpoet')
    ) {
        $integration_registry->unregister('mailpoet');
    }
}
add_action(
    'woocommerce_blocks_checkout_block_registration',
    'luxureat_static_remove_checkout_marketing_optin',
    100
);

function luxureat_static_account_language() {
    $language = isset($_GET['lang']) ? sanitize_key(wp_unslash($_GET['lang'])) : 'zh';
    return $language === 'en' ? 'en' : 'zh';
}

function luxureat_static_account_menu($items) {
    if (!is_user_logged_in() || current_user_can('manage_options')) {
        return $items;
    }

    $is_zh = luxureat_static_account_language() === 'zh';
    $labels = array(
        'orders' => $is_zh ? '订单' : 'Orders',
        'edit-address' => $is_zh ? '地址' : 'Addresses',
        'edit-account' => $is_zh ? '账户资料' : 'Account details',
        'customer-logout' => $is_zh ? '退出登录' : 'Log out',
    );

    return array_intersect_key($labels, $items);
}
add_filter('woocommerce_account_menu_items', 'luxureat_static_account_menu', 999);

function luxureat_static_account_endpoint_url($url) {
    return add_query_arg('lang', luxureat_static_account_language(), $url);
}
add_filter('woocommerce_get_endpoint_url', 'luxureat_static_account_endpoint_url');

function luxureat_static_account_dashboard() {
    $user = wp_get_current_user();
    $is_zh = luxureat_static_account_language() === 'zh';
    ?>
    <section class="lux-account-dashboard">
        <p class="lux-account-eyebrow"><?php echo esc_html($is_zh ? '欢迎回来' : 'Welcome back'); ?></p>
        <h2><?php echo esc_html($user->display_name ?: $user->user_login); ?></h2>
        <p><?php echo esc_html($is_zh ? '在这里查看订单、管理收货与账单地址，或更新账户资料。' : 'View your orders, manage shipping and billing addresses, or update your account details.'); ?></p>
    </section>
    <?php
}

function luxureat_static_replace_account_dashboard() {
    remove_action('woocommerce_account_dashboard', 'woocommerce_account_dashboard');
    add_action('woocommerce_account_dashboard', 'luxureat_static_account_dashboard');
}
add_action('wp_loaded', 'luxureat_static_replace_account_dashboard');

function luxureat_static_defer_scripts($tag, $handle) {
    if (strpos($handle, 'luxureat-') !== 0 || strpos($tag, ' defer') !== false) {
        return $tag;
    }

    return str_replace(' src=', ' defer src=', $tag);
}
add_filter('script_loader_tag', 'luxureat_static_defer_scripts', 10, 2);

function luxureat_static_cache_headers($headers) {
    if (!is_admin() && !is_user_logged_in() && !is_account_page() && !is_cart() && !is_checkout()) {
        $headers['Cache-Control'] = 'public, max-age=300, stale-while-revalidate=86400';
    }

    return $headers;
}
add_filter('wp_headers', 'luxureat_static_cache_headers');

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

function pagePhp() {
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

status_header(200);
$is_account_page = function_exists('is_account_page') && is_account_page();
$is_checkout_page = function_exists('is_checkout') && is_checkout();
$is_customer_page = $is_account_page || $is_checkout_page;
$page_language = $is_customer_page && function_exists('luxureat_static_account_language') ? luxureat_static_account_language() : 'zh';
$is_zh_page = $page_language === 'zh';
if ($is_customer_page && function_exists('switch_to_locale')) {
    switch_to_locale($is_zh_page ? 'zh_CN' : 'en_US');
}
if ($is_customer_page && function_exists('WC') && WC()->session) {
    WC()->session->set('luxureat_checkout_lang', $page_language);
}
$account_endpoint = $is_account_page && function_exists('WC') && WC()->query ? WC()->query->get_current_endpoint() : '';
$is_account_dashboard = $is_account_page && is_user_logged_in() && !$account_endpoint;
$language_url = $is_checkout_page && function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : (function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : get_permalink());
$body_classes = array();
if ($is_account_dashboard) $body_classes[] = 'lux-account-dashboard-page';
if ($is_checkout_page) $body_classes[] = 'lux-checkout-page';
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(trim('lux-wp-page-shell ' . implode(' ', $body_classes))); ?>>
<?php wp_body_open(); ?>
<header class="lux-wp-page-header">
    <a class="lux-wp-page-brand" href="<?php echo esc_url(home_url('/')); ?>">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png'); ?>" alt="LuxurEat">
        <span>LuxurEat <i aria-hidden="true">｜</i> <small>露意膳</small></span>
    </a>
    <nav class="lux-wp-page-actions" aria-label="<?php echo esc_attr($is_zh_page ? '页面导航' : 'Page navigation'); ?>">
        <?php if ($is_customer_page) : ?>
            <span class="lux-language-switch" aria-label="<?php echo esc_attr($is_zh_page ? '语言' : 'Language'); ?>">
                <a href="<?php echo esc_url(add_query_arg('lang', 'zh', $language_url)); ?>"<?php echo $is_zh_page ? ' aria-current="page"' : ''; ?>>中文</a>
                <i aria-hidden="true">/</i>
                <a href="<?php echo esc_url(add_query_arg('lang', 'en', $language_url)); ?>"<?php echo !$is_zh_page ? ' aria-current="page"' : ''; ?>>EN</a>
            </span>
        <?php endif; ?>
        <a class="lux-wp-page-home" href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($is_zh_page ? '返回首页' : 'Return to home'); ?></a>
    </nav>
</header>
<main class="lux-wp-page-main">
<?php while (have_posts()) : the_post(); ?>
    <header class="lux-wp-page-title">
        <p><?php echo esc_html($is_checkout_page ? ($is_zh_page ? '安全结算' : 'Secure checkout') : ($is_zh_page ? '会员中心' : 'Maison Account')); ?></p>
        <h1><?php echo esc_html($is_checkout_page ? ($is_zh_page ? '确认订单' : 'Checkout') : ($is_account_page ? ($is_zh_page ? '我的账户' : 'My account') : get_the_title())); ?></h1>
    </header>
    <div class="lux-wp-page-content"><?php the_content(); ?></div>
<?php endwhile; ?>
</main>
<?php wp_footer(); ?>
</body>
</html>
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
- English routes use \`/en/\`, \`/en/products/\`, and the rest of the \`/en/.../\` namespace.

## Notes

- The current version prioritizes visual fidelity and static routing.
- Local assets and domain scripts are loaded through WordPress theme APIs.
- Products, events, journal, and brand content each have dedicated data, script, and media locations under \`assets/\`.
`;
}

function build() {
  ensureSource();

  fs.rmSync(themeDir, { recursive: true, force: true });
  fs.rmSync(zipFile, { force: true });
  mkdirp(themeDir);

  fs.copyFileSync(path.join(sourceDir, 'integration.css'), path.join(themeDir, 'integration.css'));
  fs.copyFileSync(path.join(sourceDir, '.htaccess'), path.join(themeDir, '.htaccess'));
  copyDir(path.join(sourceDir, 'assets'), path.join(themeDir, 'assets'));

  const screenshotSource = path.join(sourceDir, 'qa/zh-home-desktop.png');
  fs.copyFileSync(
    fs.existsSync(screenshotSource) ? screenshotSource : path.join(sourceDir, 'assets/media/brand/luxureat-logo.png'),
    path.join(themeDir, 'screenshot.png')
  );

  write(path.join(themeDir, 'style.css'), styleCss());
  write(path.join(themeDir, 'functions.php'), functionsPhp());
  write(path.join(themeDir, 'index.php'), indexPhp());
  write(path.join(themeDir, 'page.php'), pagePhp());
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
