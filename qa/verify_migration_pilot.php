<?php
define('ABSPATH', __DIR__);
function add_action(...$args) {}
function add_filter($name, $callback, ...$args) { $GLOBALS['migration_test_filters'][$name][] = $callback; }
function get_template_directory_uri() { return 'https://example.test/theme'; }
function esc_url($value) { return $value; }
function luxureat_static_url($route, $suffix = '') { return 'https://example.test/' . $route . '/' . $suffix; }
class WP_Error { public $code; function __construct($code, $message) { $this->code = $code; } }
function get_posts($args) { return array($GLOBALS['migration_test_page']); }
function get_post_meta($id, $key, $single) { return 'zh'; }
function get_option($key, $default = false) { return $key === 'luxureat_migration_enabled' ? array('zh') : $default; }
function luxureat_static_current_path() { return 'zh'; }
function luxureat_static_aliases() { return array(); }
function absint($value) { return abs((int) $value); }
function current_user_can(...$args) { return false; }
require __DIR__ . '/../.deploy/luxureat-static/page-migration.php';
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
$manifest = json_decode(file_get_contents(__DIR__ . '/../.deploy/luxureat-static/migration-pages.json'), true);
check(count($manifest) === 26, 'All 26 bilingual main pages must participate.');
foreach ($manifest as $route => $item) {
    $source = file_get_contents(__DIR__ . '/../.deploy/luxureat-static/' . $item['file']);
    $content = luxureat_migration_extract($source);
    check(is_string($content), $route . ': the real template must import successfully.');
    check(strpos($content, '<?') === false, $route . ': imported content must contain no executable PHP.');
    $rendered = luxureat_migration_replace($source, $content);
    check(explode('<!-- lux:header:end -->', $rendered)[0] === explode('<!-- lux:header:end -->', $source)[0], $route . ': head and navigation must remain byte-identical.');
    check(explode('<!-- lux:footer:start -->', $rendered)[1] === explode('<!-- lux:footer:start -->', $source)[1], $route . ': footer and scripts must remain byte-identical.');
    check(substr_count($content, '<main') === substr_count(explode('<!-- lux:footer:start -->', explode('<!-- lux:header:end -->', $source)[1])[0], '<main'), $route . ': all original main elements must be retained.');
}
check(luxureat_migration_extract('<!-- lux:header:end --><?php evil(); ?><!-- lux:footer:start -->') instanceof WP_Error, 'Unsupported PHP must fail closed.');
check(luxureat_migration_extract('<div>No boundaries</div>') instanceof WP_Error, 'Missing boundaries must fail closed.');
check(luxureat_migration_replace('before<!-- lux:header:end -->old<!-- lux:footer:start -->after', '$1 \\ literal') === 'before<!-- lux:header:end -->$1 \\ literal<!-- lux:footer:start -->after', 'Replacement must preserve literal dollar signs and backslashes.');
$render = $GLOBALS['migration_test_filters']['template_include'][0];
foreach (array('draft', 'private', 'pending') as $status) {
    $GLOBALS['migration_test_page'] = (object) array('ID' => 7, 'post_status' => $status, 'post_content' => 'non-public content');
    $_GET = array('luxureat_migration_preview' => 7, '_wpnonce' => 'invalid');
    $buffers = ob_get_level();
    check($render('original.php') === 'original.php' && ob_get_level() === $buffers, 'Non-public content must never render for an unauthorized visitor: ' . $status);
}
echo "Migration checks passed for all 26 pages; non-public content remains private.\n";
