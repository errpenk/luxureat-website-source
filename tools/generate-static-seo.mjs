import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pages, seo } from '../site.config.mjs';

const outputFile = path.resolve(process.argv[2] || '.seo/static-seo.php.fragment');
const excludedSlugs = new Set(['bag', 'cart', 'checkout', 'account', 'login', 'register']);

const isPublic = (page) => page && page.indexable !== false && !excludedSlugs.has(page.slug);
const seoKey = (page) => `${page.lang}:${page.slug}`;
const toPath = (page) => {
  const route = String(page.route || '').replace(/^\/+|\/+$/g, '');
  if (!route || route === 'zh') return '/';
  if (route.startsWith('zh/')) return `/${route.slice(3)}/`;
  return `/${route}/`;
};

const publicPages = pages.filter(isPublic);
const byKeyAndLang = new Map(publicPages.map((page) => [`${page.key}:${page.lang}`, page]));
const records = {};

for (const page of publicPages) {
  const meta = seo?.[seoKey(page)];
  if (!meta?.title || !meta?.description) {
    throw new Error(`Missing SEO title/description for ${seoKey(page)} (${page.file})`);
  }

  const zhPage = byKeyAndLang.get(`${page.key}:zh`);
  const enPage = byKeyAndLang.get(`${page.key}:en`);
  const pagePath = toPath(page);

  records[pagePath] = {
    title: meta.title,
    description: meta.description,
    lang: page.lang === 'zh' ? 'zh-CN' : 'en',
    locale: page.lang === 'zh' ? 'zh_CN' : 'en_US',
    alternateLocale: page.lang === 'zh' ? 'en_US' : 'zh_CN',
    zhPath: zhPage ? toPath(zhPage) : pagePath,
    enPath: enPage ? toPath(enPage) : pagePath,
    xDefaultPath: zhPage ? toPath(zhPage) : pagePath,
  };
}

const json = JSON.stringify(records, null, 2);
const fragment = `// LUXUREAT_STATIC_SEO_BEGIN
// Generated from site.config.mjs by tools/generate-static-seo.mjs. Do not edit in the theme repository.

function luxureat_static_seo_map() {
    static $map = null;
    if (is_array($map)) {
        return $map;
    }

    $json = <<<'LUXUREAT_SEO_JSON'
${json}
LUXUREAT_SEO_JSON;

    $decoded = json_decode($json, true);
    $map = is_array($decoded) ? $decoded : array();
    return $map;
}

function luxureat_static_seo_path() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $request_path = is_string($request_path) ? $request_path : '/';
    $normalized = '/' . trim($request_path, '/');
    return $normalized === '/' ? '/' : $normalized . '/';
}

function luxureat_static_seo_data() {
    $map = luxureat_static_seo_map();
    $path = luxureat_static_seo_path();
    return isset($map[$path]) && is_array($map[$path]) ? $map[$path] : null;
}

function luxureat_static_seo_document_title($title) {
    $data = luxureat_static_seo_data();
    return $data && !empty($data['title']) ? $data['title'] : $title;
}
add_filter('pre_get_document_title', 'luxureat_static_seo_document_title', 999);

function luxureat_static_disable_yoast_presenters($presenters) {
    return luxureat_static_seo_data() ? array() : $presenters;
}
add_filter('wpseo_frontend_presenters', 'luxureat_static_disable_yoast_presenters', 999);

function luxureat_static_prepare_seo_head() {
    if (!luxureat_static_seo_data()) {
        return;
    }
    remove_action('wp_head', 'rel_canonical');
}
add_action('template_redirect', 'luxureat_static_prepare_seo_head', -150);

function luxureat_static_output_seo_head() {
    $data = luxureat_static_seo_data();
    if (!$data) {
        return;
    }

    $path = luxureat_static_seo_path();
    $canonical = home_url($path);
    $zh_url = home_url($data['zhPath']);
    $en_url = home_url($data['enPath']);
    $x_default_url = home_url($data['xDefaultPath']);
    $image_url = get_template_directory_uri() . '/assets/media/brand/home-hero-truffle-poster.webp';
    $logo_url = get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png';

    if (!current_theme_supports('title-tag')) {
        echo '<title>' . esc_html($data['title']) . '</title>' . "\n";
    }
    echo '<meta name="description" content="' . esc_attr($data['description']) . '">' . "\n";
    echo '<link rel="canonical" href="' . esc_url($canonical) . '">' . "\n";
    echo '<link rel="alternate" hreflang="zh-CN" href="' . esc_url($zh_url) . '">' . "\n";
    echo '<link rel="alternate" hreflang="en" href="' . esc_url($en_url) . '">' . "\n";
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($x_default_url) . '">' . "\n";

    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:site_name" content="LuxurEat">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($data['title']) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($data['description']) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url($image_url) . '">' . "\n";
    echo '<meta property="og:locale" content="' . esc_attr($data['locale']) . '">' . "\n";
    echo '<meta property="og:locale:alternate" content="' . esc_attr($data['alternateLocale']) . '">' . "\n";

    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($data['title']) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($data['description']) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($image_url) . '">' . "\n";

    $schema = array(
        '@context' => 'https://schema.org',
        '@graph' => array(
            array(
                '@type' => 'Organization',
                '@id' => home_url('/#organization'),
                'name' => 'LuxurEat',
                'alternateName' => '露意膳',
                'url' => home_url('/'),
                'logo' => array(
                    '@type' => 'ImageObject',
                    'url' => $logo_url,
                ),
                'email' => 'china@luxureat.com',
            ),
            array(
                '@type' => 'WebSite',
                '@id' => home_url('/#website'),
                'url' => home_url('/'),
                'name' => 'LuxurEat',
                'publisher' => array('@id' => home_url('/#organization')),
                'inLanguage' => array('zh-CN', 'en'),
            ),
            array(
                '@type' => 'WebPage',
                '@id' => $canonical . '#webpage',
                'url' => $canonical,
                'name' => $data['title'],
                'description' => $data['description'],
                'isPartOf' => array('@id' => home_url('/#website')),
                'about' => array('@id' => home_url('/#organization')),
                'inLanguage' => $data['lang'],
            ),
        ),
    );

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>' . "\n";
}
add_action('wp_head', 'luxureat_static_output_seo_head', 0);

// LUXUREAT_STATIC_SEO_END
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, fragment, 'utf8');
console.log(`Static SEO fragment written to ${outputFile}`);
console.log(`Generated metadata for ${Object.keys(records).length} public routes.`);
