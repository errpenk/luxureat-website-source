<?php
define('ABSPATH', __DIR__);
function add_action(...$args) {}
function add_filter(...$args) {}
function get_template_directory_uri() { return 'https://example.test/theme'; }
function esc_url($value) { return $value; }
function luxureat_static_url($route, $suffix = '') { return 'https://example.test/' . $route . '/' . $suffix; }
class WP_Error { public $code; function __construct($code, $message) { $this->code = $code; } }
require __DIR__ . '/../scripts/templates/page-migration.php';
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
echo "Migration checks passed for all 26 pages.\n";
