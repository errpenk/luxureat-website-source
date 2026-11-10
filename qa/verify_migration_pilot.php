<?php
define('ABSPATH', __DIR__);
function add_action(...$args) {}
function add_filter(...$args) {}
function get_template_directory_uri() { return 'https://example.test/theme'; }
function esc_url($value) { return $value; }
function luxureat_static_url($route, $suffix = '') { return 'https://example.test/' . $route . '/' . $suffix; }
class WP_Error { public $code; function __construct($code, $message) { $this->code = $code; } }
require __DIR__ . '/../scripts/templates/page-migration-pilot.php';
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
$source = file_get_contents(__DIR__ . '/../.deploy/luxureat-static/pages/zh/certification.php');
$main = luxureat_pilot_source_main($source);
check(is_string($main), 'The real certification template must import successfully.');
check(strpos($main, '<?') === false, 'Imported content must contain no executable PHP.');
check(strpos($main, 'https://example.test/theme/assets/') !== false, 'Image URLs must resolve to the theme.');
$rendered = luxureat_pilot_replace_main($source, $main);
check(substr($rendered, 0, strpos($rendered, '<main')) === substr($source, 0, strpos($source, '<main')), 'The head and navigation must remain byte-identical.');
check(substr($rendered, strpos($rendered, '</main>') + 7) === substr($source, strpos($source, '</main>') + 7), 'The footer and scripts must remain byte-identical.');
check(luxureat_pilot_source_main('<main><?php evil(); ?></main>') instanceof WP_Error, 'Unsupported PHP must fail closed.');
check(luxureat_pilot_source_main('<div>No main</div>') instanceof WP_Error, 'Missing content must fail closed.');
check(luxureat_pilot_replace_main('<header>x</header><main>old</main><footer>y</footer>', '<main>$1 \\ test</main>') === '<header>x</header><main>$1 \\ test</main><footer>y</footer>', 'Replacement must preserve literal dollar signs and backslashes.');
echo "Migration pilot checks passed.\n";
