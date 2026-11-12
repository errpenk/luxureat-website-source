<?php
$source = file_get_contents(__DIR__ . '/../.deploy/luxureat-static/functions.php');
if (!preg_match('/function luxureat_cms_seo_overrides\(.*?(?=function luxureat_static_disable_yoast_output)/s', $source, $match)) throw new RuntimeException('SEO helpers missing.');
function luxureat_static_seo_catalog() {
    $rows = array();
    foreach (array('published', 'empty', 'draft', 'missing', 'template', 'tag-error') as $route) $rows[$route] = array('cms_source' => $route, 'cms_kind' => 'blog', 'lang' => 'en');
    $rows['product'] = array('type' => 'Product');
    $rows['en/news/truffelixir-sweet-world'] = array('type' => 'NewsArticle');
    return $rows;
}
function luxureat_cms_post($source, $lang, $kind) {
    if ($source === 'missing') return null;
    return (object) array('ID' => $source, 'post_status' => $source === 'draft' ? 'draft' : 'publish', 'post_title' => 'A real article');
}
function get_post_meta($id, $key, $single) {
    if ($key === '_luxureat_source_id') return 'published';
    if ($key === '_luxureat_lang') return 'en';
    if ($key === '_luxureat_kind') return 'blog';
    if ($id === 'empty') return '';
    if ($id === 'template') return $key === '_yoast_wpseo_title' ? '%%title%% | LuxurEat' : '';
    return $key === '_yoast_wpseo_title' ? '<b>Curated title</b>' : 'Curated description';
}
function wp_strip_all_tags($value) { return strip_tags($value); }
function wpseo_replace_vars($value, $post) { return str_replace('%%title%%', $post->post_title, $value); }
function wp_get_post_terms($id, $taxonomy, $args) { return $id === 'tag-error' ? new stdClass() : array('Truffles', 'Food Pairing'); }
function is_wp_error($value) { return $value instanceof stdClass; }
function luxureat_static_current_path() { return $GLOBALS['route']; }
function luxureat_static_aliases() { return array('legacy' => 'published'); }
define('OBJECT', 'OBJECT');
function add_filter(...$args) {}
function is_singular($type) { return $GLOBALS['singular'] ?? true; }
function is_preview() { return $GLOBALS['preview'] ?? false; }
function get_queried_object() { return (object) array('ID' => 'published', 'post_status' => 'publish'); }
function luxureat_static_url($route) { return 'https://example.test/' . $route . '/'; }
function get_page_by_path($path, $output, $type) { return luxureat_cms_post('published', 'en', 'news'); }
eval($match[0]);
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
$meta = luxureat_cms_seo_overrides('published');
check($meta['title'] === 'Curated title' && $meta['description'] === 'Curated description', 'Use stored SEO fields without markup.');
check($meta['keywords'] === array('Truffles', 'Food Pairing'), 'Use actual assigned post tags.');
foreach (array('draft', 'missing', 'product', 'unknown') as $route) check(luxureat_cms_seo_overrides($route) === array(), 'No draft or unrelated metadata: ' . $route);
check(luxureat_cms_seo_overrides('template')['title'] === 'A real article | LuxurEat', 'Expand supported Yoast template variables.');
check(!isset(luxureat_cms_seo_overrides('tag-error')['keywords']), 'Ignore tag query errors.');
check(luxureat_cms_seo_overrides('en/news/truffelixir-sweet-world')['title'] === 'Curated title', 'News alias uses its published source.');
$GLOBALS['route'] = 'legacy';
check(luxureat_static_seo_value('title', 'Fallback') === 'Curated title', 'Aliases use the same SEO metadata.');
$GLOBALS['route'] = 'empty';
check(luxureat_static_seo_value('title', 'Tom &amp; Olive&#039;s') === "Tom & Olive's", 'Empty metadata retains the decoded fallback.');
check(luxureat_cms_canonical('native') === 'https://example.test/published/', 'Native post uses its matching public canonical route.');
$GLOBALS['preview'] = true;
check(luxureat_cms_canonical('native') === 'native', 'Preview canonical stays unchanged.');
$GLOBALS['preview'] = false;
$GLOBALS['singular'] = false;
check(luxureat_cms_canonical('native') === 'native', 'Unrelated pages stay unchanged.');
echo "CMS SEO fields, aliases, tags, templates and draft isolation passed.\n";
