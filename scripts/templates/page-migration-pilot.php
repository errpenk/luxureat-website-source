<?php
if (!defined('ABSPATH')) exit;

function luxureat_pilot_source_main($source) {
    if (!preg_match('~<main\b[^>]*>.*?</main>~s', $source, $match)) {
        return new WP_Error('missing_main', 'The original main element was not found.');
    }
    $main = preg_replace_callback("~<\\?php echo esc_url\\(get_template_directory_uri\\(\\) \\. '([^']+)'\\); \\?>~", function ($match) {
        return esc_url(get_template_directory_uri() . $match[1]);
    }, $match[0]);
    $main = preg_replace_callback("~<\\?php echo esc_url\\(luxureat_static_url\\('([^']+)'(?:, '([^']*)')?\\)\\); \\?>~", function ($match) {
        return esc_url(luxureat_static_url($match[1], isset($match[2]) ? $match[2] : ''));
    }, $main);
    return strpos($main, '<?') === false ? $main : new WP_Error('unsupported_php', 'The source contains an unsupported template expression.');
}

function luxureat_pilot_replace_main($html, $main) {
    return preg_replace_callback('~<main\b[^>]*>.*?</main>~s', function () use ($main) { return $main; }, $html, 1);
}

function luxureat_pilot_page() {
    $page = get_post((int) get_option('luxureat_pilot_page_id'));
    return $page && $page->post_type === 'page' && $page->post_status !== 'trash'
        && get_post_meta($page->ID, '_luxureat_pilot_route', true) === 'zh/certification' ? $page : null;
}

add_action('admin_menu', function () {
    add_management_page('LuxurEat Page Migration Pilot', 'LuxurEat Page Migration Pilot', 'manage_options', 'luxureat-page-pilot', function () {
        if (!current_user_can('manage_options')) return;
        $page = luxureat_pilot_page();
        echo '<div class="wrap"><h1>LuxurEat Page Migration Pilot</h1><p>Only the Chinese certification page participates. Original templates, CSS and scripts remain in place. Revert switches back to the original page and keeps the editable draft.</p>';
        echo '<p>Status: <strong>' . (get_option('luxureat_pilot_enabled') ? 'Enabled' : 'Original page') . '</strong></p>';
        if ($page) {
            echo '<p><a href="' . esc_url(get_edit_post_link($page->ID, 'raw')) . '">Edit migration draft</a> · <a href="' . esc_url(wp_nonce_url(add_query_arg('luxureat_pilot_preview', $page->ID, luxureat_static_url('zh/certification')), 'luxureat-pilot-preview')) . '">Preview with original styling</a></p>';
        }
        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="luxureat_page_pilot">';
        wp_nonce_field('luxureat-page-pilot');
        if (!$page) echo '<button class="button button-primary" name="pilot_action" value="create">Create editable certification draft</button>';
        else {
            echo '<button class="button button-primary" name="pilot_action" value="enable">Enable pilot</button> ';
            echo '<button class="button" name="pilot_action" value="revert">Revert migration — keep syrup update</button>';
        }
        echo '</form></div>';
    });
});

add_action('admin_post_luxureat_page_pilot', function () {
    if (!current_user_can('manage_options') || !current_user_can('unfiltered_html')) wp_die('Permission denied.', '', array('response' => 403));
    check_admin_referer('luxureat-page-pilot');
    $action = isset($_POST['pilot_action']) ? sanitize_key(wp_unslash($_POST['pilot_action'])) : '';
    $page = luxureat_pilot_page();
    if ($action === 'create' && !$page) {
        $file = get_template_directory() . '/pages/zh/certification.php';
        if (!is_readable($file)) wp_die('Original certification template is unavailable.');
        $main = luxureat_pilot_source_main(file_get_contents($file));
        if (is_wp_error($main)) wp_die(esc_html($main->get_error_message()));
        $id = wp_insert_post(wp_slash(array(
            'post_type' => 'page', 'post_status' => 'draft',
            'post_title' => '品质认证 · 中文 · 迁移试验', 'post_name' => 'luxureat-pilot-zh-certification',
            'post_content' => "<!-- wp:html -->\n" . $main . "\n<!-- /wp:html -->",
            'meta_input' => array('_luxureat_pilot_route' => 'zh/certification'),
        )), true);
        if (is_wp_error($id)) wp_die(esc_html($id->get_error_message()));
        update_option('luxureat_pilot_page_id', $id, false);
    } elseif ($action === 'enable' && $page) {
        update_option('luxureat_pilot_enabled', true, false);
    } elseif ($action === 'revert') {
        update_option('luxureat_pilot_enabled', false, false);
    } else wp_die('Invalid action.');
    do_action('litespeed_purge_url', luxureat_static_url('zh/certification'));
    wp_safe_redirect(admin_url('tools.php?page=luxureat-page-pilot'));
    exit;
});

add_filter('template_include', function ($template) {
    if (!in_array(luxureat_static_current_path(), array('zh/certification', 'certification'), true)) return $template;
    $page = luxureat_pilot_page();
    if (!$page) return $template;
    $preview_id = isset($_GET['luxureat_pilot_preview']) ? absint($_GET['luxureat_pilot_preview']) : 0;
    $preview = $preview_id === $page->ID && current_user_can('edit_post', $page->ID)
        && isset($_GET['_wpnonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_GET['_wpnonce'])), 'luxureat-pilot-preview');
    if (!get_option('luxureat_pilot_enabled') && !$preview) return $template;
    if (!defined('DONOTCACHEPAGE')) define('DONOTCACHEPAGE', true);
    nocache_headers();
    $main = do_blocks($page->post_content);
    if (!preg_match('~^\s*<main\b[^>]*>.*</main>\s*$~s', $main)) return $template;
    ob_start(function ($html) use ($main) { return luxureat_pilot_replace_main($html, trim($main)); });
    return $template;
}, 100);
