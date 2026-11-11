<?php
/**
 * Plugin Name: LuxurEat Media Release 2026-11-11
 * Description: Applies the verified media and SEO theme files, retaining a protected rollback copy.
 * Version: 1.0.0
 */
defined('ABSPATH') || exit;

register_activation_hook(__FILE__, function () {
    if (!current_user_can('manage_options') || get_stylesheet() !== 'luxureat-wordpress-theme') {
        wp_die('The expected LuxurEat theme and administrator access are required.');
    }
    $manifest = json_decode(file_get_contents(__DIR__ . '/manifest.json'), true);
    if (!$manifest || !is_array($manifest)) wp_die('The release manifest is missing.');
    $target = get_stylesheet_directory();
    $staged = array();
    $replaced = array();
    try {
        foreach ($manifest as $file => $hash) {
            if (!preg_match('~^(?:functions\\.php|style\\.css|assets/js/(?:core|gallery)\\.js|pages/(?:zh|en)/[a-z0-9/_-]+\\.php)$~D', $file) || strpos($file, '..') !== false) {
                throw new RuntimeException('Invalid release path.');
            }
            $source = __DIR__ . '/payload/' . $file;
            $destination = $target . '/' . $file;
            if (!is_file($source) || !is_file($destination) || !hash_equals($hash, hash_file('sha256', $source))) {
                throw new RuntimeException('Release source or existing target is invalid: ' . $file);
            }
            $backup = __DIR__ . '/rollback/' . $file;
            if (!wp_mkdir_p(dirname($backup)) || (!is_file($backup) && !copy($destination, $backup))) {
                throw new RuntimeException('Unable to preserve the original file: ' . $file);
            }
            $temporary = $destination . '.media-release-new' . (substr($file, -4) === '.php' ? '.php' : '');
            $staged[$file] = $temporary;
            if (!copy($source, $temporary) || !hash_equals($hash, hash_file('sha256', $temporary))) {
                throw new RuntimeException('Unable to stage the release: ' . $file);
            }
        }
        foreach ($staged as $file => $temporary) {
            if (!rename($temporary, $target . '/' . $file)) throw new RuntimeException('Unable to install: ' . $file);
            $replaced[] = $file;
        }
        foreach ($manifest as $file => $hash) {
            if (!hash_equals($hash, hash_file('sha256', $target . '/' . $file))) throw new RuntimeException('Installed checksum differs: ' . $file);
            if (function_exists('opcache_invalidate') && substr($file, -4) === '.php') opcache_invalidate($target . '/' . $file, true);
        }
        do_action('litespeed_purge_all');
        if (function_exists('wp_cache_clear_cache')) wp_cache_clear_cache();
        update_option('luxureat_media_release_20261111', array('time' => time(), 'files' => count($manifest)), false);
    } catch (Throwable $error) {
        foreach (array_reverse($replaced) as $file) {
            if (!copy(__DIR__ . '/rollback/' . $file, $target . '/' . $file)) {
                wp_die(esc_html('Rollback failed for ' . $file . '. Original files remain in this plugin rollback directory.'));
            }
        }
        foreach ($staged as $temporary) if (is_file($temporary)) unlink($temporary);
        wp_die(esc_html($error->getMessage()));
    }
});
