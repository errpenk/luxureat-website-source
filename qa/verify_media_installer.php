<?php
define('ABSPATH', __DIR__);
$fixture = sys_get_temp_dir() . '/luxureat-media-installer-' . bin2hex(random_bytes(8));
mkdir($fixture . '/payload', 0700, true);
mkdir($fixture . '/theme', 0700, true);
file_put_contents($fixture . '/theme/style.css', 'original');
file_put_contents($fixture . '/payload/style.css', 'updated');
file_put_contents($fixture . '/theme/unchanged.webp', 'keep media');
file_put_contents($fixture . '/manifest.json', json_encode(array('style.css' => hash('sha256', 'updated'))));
function register_activation_hook($file, $callback) { $GLOBALS['activate_release'] = $callback; }
function current_user_can($capability) { return true; }
function get_stylesheet() { return 'luxureat-wordpress-theme'; }
function get_stylesheet_directory() { return $GLOBALS['fixture'] . '/theme'; }
function wp_mkdir_p($dir) { return is_dir($dir) || mkdir($dir, 0700, true); }
function wp_die($message) { throw new RuntimeException($message); }
function esc_html($message) { return $message; }
function do_action(...$args) {}
function update_option(...$args) {}
$code = file_get_contents(__DIR__ . '/../tools/install-media-release.php');
eval(str_replace('__DIR__', var_export($fixture, true), substr($code, 5)));
$activate_release();
if (file_get_contents($fixture . '/theme/style.css') !== 'updated' || file_get_contents($fixture . '/rollback/style.css') !== 'original' || file_get_contents($fixture . '/theme/unchanged.webp') !== 'keep media') {
    throw new RuntimeException('Release must preserve original files and untouched media.');
}
foreach (array(array('../wp-config.php' => hash('sha256', 'updated')), array('style.css' => str_repeat('0', 64))) as $manifest) {
    file_put_contents($fixture . '/manifest.json', json_encode($manifest));
    $rejected = false;
    try { $activate_release(); } catch (RuntimeException $error) { $rejected = true; }
    if (!$rejected || file_get_contents($fixture . '/theme/style.css') !== 'updated' || file_get_contents($fixture . '/rollback/style.css') !== 'original') throw new RuntimeException('Invalid releases must fail without changing installed files or backups.');
}
echo "Theme-only installer preserves media and rollback copies; invalid paths and checksums fail closed.\n";
