<?php
if (!defined('ABSPATH')) exit;

function luxureat_migration_manifest() {
    $manifest = json_decode(file_get_contents(__DIR__ . '/migration-pages.json'), true);
    return is_array($manifest) ? $manifest : array();
}

function luxureat_migration_extract($source) {
    if (!preg_match('~<!-- lux:header:end -->(.*?)<!-- lux:footer:start -->~s', $source, $match)) return new WP_Error('missing_region', 'Original content boundaries were not found.');
    $content = preg_replace_callback("~<\\?php echo esc_url\\(get_template_directory_uri\\(\\) \\. '([^']+)'\\); \\?>~", function ($match) {
        return esc_url(get_template_directory_uri() . $match[1]);
    }, $match[1]);
    $content = preg_replace_callback("~<\\?php echo esc_url\\(luxureat_static_url\\('([^']+)'(?:, '([^']*)')?\\)\\); \\?>~", function ($match) {
        return esc_url(luxureat_static_url($match[1], isset($match[2]) ? $match[2] : ''));
    }, $content);
    return strpos($content, '<?') === false ? $content : new WP_Error('unsupported_php', 'The source contains an unsupported template expression.');
}

function luxureat_migration_replace($html, $content) {
    return preg_replace_callback('~(<!-- lux:header:end -->).*?(<!-- lux:footer:start -->)~s', function ($match) use ($content) {
        return $match[1] . $content . $match[2];
    }, $html, 1);
}

function luxureat_page_image_sizes($content) {
    $tags = new WP_HTML_Tag_Processor($content);
    while ($tags->next_tag('IMG')) {
        $src = $tags->get_attribute('src');
        $deferred = $tags->get_attribute('data-lux-src');
        if (!$src && is_string($deferred) && $deferred !== '') {
            $src = $deferred;
            $tags->set_attribute('src', $src);
            $tags->remove_attribute('data-lux-src');
        }
        $mobile = $tags->get_attribute('data-lux-mobile-src');
        if (!$tags->get_attribute('srcset') && is_string($src) && is_string($mobile)) {
            $candidates = array();
            $prefix = get_template_directory_uri() . '/assets/media/';
            foreach (array($src, $mobile) as $url) {
                if (strpos($url, $prefix) !== 0) continue;
                $relative = strtok(substr($url, strlen($prefix)), '?');
                if (strpos($relative, '..') !== false || !preg_match('~^[a-zA-Z0-9/_-]+\\.(?:webp|png|jpe?g)$~', $relative)) continue;
                $info = @getimagesize(get_template_directory() . '/assets/media/' . $relative);
                if ($info) $candidates[$info[0]] = $url;
            }
            if (count($candidates) > 1) {
                ksort($candidates);
                $srcset = array();
                foreach ($candidates as $width => $url) $srcset[] = $url . ' ' . $width . 'w';
                $tags->set_attribute('srcset', implode(', ', $srcset));
            }
        }
        if (is_string($src) && strpos($src, '/new-arrivals/feature-olive-oil.webp') !== false) {
            $tags->set_attribute('loading', 'lazy');
            $tags->remove_attribute('fetchpriority');
        }
        if ($tags->get_attribute('loading') !== 'lazy' || !$tags->get_attribute('srcset')) continue;
        $sizes = $tags->get_attribute('sizes') ?: '100vw';
        // Native auto sizing uses the real card width, including narrow gallery thumbnails.
        if (strpos($sizes, 'auto') !== 0) $tags->set_attribute('sizes', 'auto, ' . $sizes);
    }
    return $tags->get_updated_html();
}

function luxureat_migration_pages() {
    $result = array();
    $manifest = luxureat_migration_manifest();
    foreach (get_posts(array('post_type' => 'page', 'post_status' => array('draft', 'publish', 'private', 'pending'), 'numberposts' => -1, 'meta_key' => '_luxureat_migration_route', 'orderby' => 'ID', 'order' => 'ASC')) as $page) {
        $route = get_post_meta($page->ID, '_luxureat_migration_route', true);
        if (isset($manifest[$route]) && !isset($result[$route])) $result[$route] = $page;
    }
    return $result;
}

function luxureat_migration_preview_url($route, $id) {
    return wp_nonce_url(add_query_arg('luxureat_migration_preview', $id, luxureat_static_url($route)), 'luxureat-migration-preview-' . $id);
}

function luxureat_migration_purge($route) {
    do_action('litespeed_purge_url', luxureat_static_url($route));
}

add_action('admin_menu', function () {
    add_management_page('LuxurEat 页面迁移', 'LuxurEat 页面迁移', 'manage_options', 'luxureat-page-pilot', function () {
        if (!current_user_can('manage_options')) return;
        $manifest = luxureat_migration_manifest();
        $pages = luxureat_migration_pages();
        $enabled = (array) get_option('luxureat_migration_enabled', array());
        echo '<div class="wrap"><h1>LuxurEat 页面迁移</h1><p>沿用原主题的页头、页脚、样式和脚本。正文存入独立的 HTML 区块；编辑时请保留原有结构、类名和交互属性。</p>';
        echo '<p>已迁入：<strong>' . count($pages) . ' / ' . count($manifest) . '</strong>；已启用：<strong>' . count($enabled) . '</strong>。启用会发布页面；撤销会恢复原版并退回草稿，保留修改和糖浆更新。</p>';
        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="luxureat_page_migration">';
        wp_nonce_field('luxureat-page-migration');
        if (count($pages) < count($manifest)) echo '<button class="button button-primary" name="migration_action" value="import">迁入下一批页面（最多 4 页）</button> ';
        if (count($pages) === count($manifest)) echo '<button class="button button-primary" name="migration_action" value="enable_all">启用全部已迁入页面</button> ';
        echo '<button class="button" name="migration_action" value="revert_all">撤销全部迁移（保留糖浆更新和草稿）</button>';
        echo '<table class="widefat striped" style="margin-top:20px"><thead><tr><th>页面</th><th>原网址</th><th>状态与操作</th></tr></thead><tbody>';
        foreach ($manifest as $route => $item) {
            echo '<tr><td>' . esc_html($item['title']) . '</td><td><a href="' . esc_url(luxureat_static_url($route)) . '">' . esc_html($route) . '</a></td><td>';
            if (isset($pages[$route])) {
                $id = $pages[$route]->ID;
                echo (in_array($route, $enabled, true) ? '已启用' : '原版') . ' · <a href="' . esc_url(get_edit_post_link($id, 'raw')) . '">编辑</a> · <a href="' . esc_url(luxureat_migration_preview_url($route, $id)) . '">原样预览</a>';
                echo ' <button class="button-link" name="migration_action" value="' . esc_attr((in_array($route, $enabled, true) ? 'revert:' : 'enable:') . $route) . '">' . (in_array($route, $enabled, true) ? '撤销此页' : '启用此页') . '</button>';
            } else echo '尚未迁入';
            echo '</td></tr>';
        }
        echo '</tbody></table></form></div>';
    });
});

add_action('admin_post_luxureat_page_migration', function () {
    if (!current_user_can('manage_options') || !current_user_can('unfiltered_html')) wp_die('Permission denied.', '', array('response' => 403));
    check_admin_referer('luxureat-page-migration');
    $action = isset($_POST['migration_action']) ? sanitize_text_field(wp_unslash($_POST['migration_action'])) : '';
    $manifest = luxureat_migration_manifest();
    $pages = luxureat_migration_pages();
    $enabled = (array) get_option('luxureat_migration_enabled', array());
    if ($action === 'import') {
        $batch = array_slice(array_diff_key($manifest, $pages), 0, 4, true);
        // Validate first; retries skip existing records without overwriting edits.
        $content = array();
        foreach ($batch as $route => $item) {
            $file = get_template_directory() . '/' . $item['file'];
            if (!is_readable($file)) wp_die('Original page template is unavailable.');
            $content[$route] = luxureat_migration_extract(file_get_contents($file));
            if (is_wp_error($content[$route])) wp_die(esc_html($content[$route]->get_error_message()));
        }
        foreach ($batch as $route => $item) {
            $id = wp_insert_post(wp_slash(array('post_type' => 'page', 'post_status' => 'draft',
                'post_title' => $item['title'], 'post_name' => 'luxureat-cms-' . str_replace('/', '-', $route),
                'post_content' => '<!-- wp:html -->' . $content[$route] . '<!-- /wp:html -->',
                'meta_input' => array('_luxureat_migration_route' => $route),
            )), true);
            if (is_wp_error($id)) wp_die(esc_html($id->get_error_message()));
        }
    } elseif ($action === 'enable_all' && count($pages) === count($manifest)) $enabled = array_keys($pages);
    elseif ($action === 'revert_all') $enabled = array();
    elseif (preg_match('~^(enable|revert):(.+)$~', $action, $match) && isset($pages[$match[2]])) {
        $enabled = array_values(array_diff($enabled, array($match[2])));
        if ($match[1] === 'enable') $enabled[] = $match[2];
    } else wp_die('Invalid action.');
    foreach ($pages as $route => $page) {
        $status = in_array($route, $enabled, true) ? 'publish' : 'draft';
        if ($page->post_status === $status) continue;
        $updated = wp_update_post(array('ID' => $page->ID, 'post_status' => $status), true);
        if (is_wp_error($updated)) wp_die(esc_html($updated->get_error_message()));
    }
    update_option('luxureat_migration_enabled', $enabled, false);
    foreach (array_keys($manifest) as $route) luxureat_migration_purge($route);
    wp_safe_redirect(admin_url('tools.php?page=luxureat-page-pilot'));
    exit;
});

add_filter('template_include', function ($template) {
    $route = luxureat_static_current_path();
    $aliases = luxureat_static_aliases();
    $route = $route === '' || $route === '__home' ? 'zh' : (isset($aliases[$route]) ? $aliases[$route] : $route);
    $manifest = luxureat_migration_manifest();
    if (!isset($manifest[$route])) return $template;
    $pages = luxureat_migration_pages();
    if (!isset($pages[$route])) return $template;
    $page = $pages[$route];
    $preview_id = isset($_GET['luxureat_migration_preview']) ? absint($_GET['luxureat_migration_preview']) : 0;
    $preview = $preview_id === $page->ID && current_user_can('edit_post', $page->ID)
        && isset($_GET['_wpnonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_GET['_wpnonce'])), 'luxureat-migration-preview-' . $page->ID);
    $published = $page->post_status === 'publish' && in_array($route, (array) get_option('luxureat_migration_enabled', array()), true);
    if (!$published && !$preview) return $template;
    if ($preview) {
        if (!defined('DONOTCACHEPAGE')) define('DONOTCACHEPAGE', true);
        nocache_headers();
    }
    $content = do_blocks($page->post_content);
    if (!trim($content) || strpos($content, '<?') !== false) return $template;
    $content = luxureat_page_image_sizes($content);
    header('X-LuxurEat-Content-Source: wordpress');
    ob_start(function ($html) use ($content) { return luxureat_migration_replace($html, $content); });
    return $template;
}, 100);

add_action('save_post_page', function ($id) {
    $route = get_post_meta($id, '_luxureat_migration_route', true);
    if (isset(luxureat_migration_manifest()[$route])) luxureat_migration_purge($route);
});

add_filter('preview_post_link', function ($url, $page) {
    $route = get_post_meta($page->ID, '_luxureat_migration_route', true);
    return isset(luxureat_migration_manifest()[$route]) ? luxureat_migration_preview_url($route, $page->ID) : $url;
}, 10, 2);

add_filter('page_link', function ($url, $id) {
    $route = get_post_meta($id, '_luxureat_migration_route', true);
    return isset(luxureat_migration_manifest()[$route]) ? luxureat_static_url($route) : $url;
}, 10, 2);

add_action('template_redirect', function () {
    if (!is_page() || is_preview()) return;
    $route = get_post_meta(get_queried_object_id(), '_luxureat_migration_route', true);
    if (!isset(luxureat_migration_manifest()[$route])) return;
    wp_safe_redirect(luxureat_static_url($route), 301);
    exit;
}, -175);
