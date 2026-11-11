<?php
$php = file_get_contents(__DIR__ . '/../.deploy/luxureat-static/functions.php');
preg_match('/function luxureat_static_public_plugin_output\(\) \{.*?\n\}/s', $php, $match);
if (!$match) throw new RuntimeException('Missing public plugin integration.');
eval($match[0]);
class baiduseo_common {}
function luxureat_static_current_path() { return $GLOBALS['route']; }
function luxureat_static_aliases() { return array(); }
function luxureat_static_seo_catalog() { return array('zh' => array()); }
function is_user_logged_in() { return $GLOBALS['logged_in']; }
function add_filter(...$args) {}
function do_action($hook, $ttl) { if ($hook !== 'litespeed_control_set_ttl' || $ttl !== 300) throw new RuntimeException('HTML cache TTL exceeds proof lifetime.'); }
function remove_action($hook, $callback, $priority) { $GLOBALS['removed'][] = $callback[1]; }
$plugin = new baiduseo_common();
$wp_filter = array(
    'wp' => (object) array('callbacks' => array(10 => array(array('function' => array($plugin, 'baiduseo_init_session')), array('function' => 'unrelated_callback')))),
    'wp_head' => (object) array('callbacks' => array(1 => array(array('function' => array($plugin, 'baiduseo_mainpage'))))),
);
foreach (array(
    array('zh', false, 'GET', true, true),
    array('zh', false, 'HEAD', true, true),
    array('zh', true, 'GET', false, true),
    array('zh', false, 'POST', false, true),
    array('unknown', false, 'GET', false, false),
) as $case) {
    list($route, $logged_in, $_SERVER['REQUEST_METHOD'], $session, $head) = $case;
    $removed = array();
    luxureat_static_public_plugin_output();
    if (in_array('baiduseo_init_session', $removed, true) !== $session || in_array('baiduseo_mainpage', $removed, true) !== $head) {
        throw new RuntimeException('Public session and metadata isolation failed.');
    }
}
echo "Anonymous page sessions and metadata ownership passed; POST and logged-in sessions preserved.\n";
preg_match('/function luxureat_cms_payload\(\$kind\) \{.*?\n\}/s', $php, $payload_function);
if (!$payload_function) throw new RuntimeException('Missing CMS payload integration.');
eval($payload_function[0]);
function luxureat_cms_posts($kind) { return array((object) array('ID' => 1, 'post_content' => '<p>Original &amp; HTML</p>')); }
function get_post_meta($id, $key, $single) { return $key === '_luxureat_lang' ? 'en' : 'sample'; }
function get_the_post_thumbnail_url(...$args) { return 'https://example.test/image.webp'; }
function get_the_title($post) { return $GLOBALS['cms_test_title']; }
function get_the_excerpt($post) { return '&quot;Flavour&quot; &amp; tradition &#x2014; Italy&#8217;s table'; }
function apply_filters($hook, $content) { return $content; }
$cms_test_title = 'Italy&#8217;s Olive Oil &amp; Food';
$payload = luxureat_cms_payload('recipe')['sample:en'];
if ($payload['title'] !== 'Italy’s Olive Oil & Food' || $payload['intro'] !== '"Flavour" & tradition — Italy’s table' || $payload['cmsHtml'] !== '<p>Original &amp; HTML</p>') throw new RuntimeException('CMS plain text must decode entities once without altering HTML content.');
$cms_test_title = '&lt;img src=x onerror=alert(1)&gt;';
if (strpos(json_encode(luxureat_cms_payload('recipe'), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT), '<img') !== false) throw new RuntimeException('Plain title data must retain safe JSON serialization.');
echo "CMS title and excerpt entities decode once; content HTML and safe serialization are preserved.\n";
