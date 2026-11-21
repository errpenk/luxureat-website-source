<?php
if (!defined('ABSPATH')) exit;

function luxureat_news_manifest() {
    $items = json_decode(file_get_contents(__DIR__ . '/news-manifest.json'), true);
    return is_array($items) ? $items : array();
}

function luxureat_news_posts() {
    $result = array();
    foreach (get_posts(array('post_type' => 'post', 'post_status' => 'any', 'numberposts' => -1, 'meta_key' => '_luxureat_kind', 'meta_value' => 'news')) as $post) {
        $key = get_post_meta($post->ID, '_luxureat_source_id', true) . ':' . get_post_meta($post->ID, '_luxureat_lang', true);
        $result[$key] = $post;
    }
    return $result;
}

function luxureat_news_media($name, $post_id) {
    if (!preg_match('~^media/brand-news/[a-zA-Z0-9._-]+\.(?:webp|png|jpe?g|mp4)$~', $name)) return new WP_Error('bad_media', 'Invalid news media path.');
    $existing = get_posts(array('post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => 1, 'meta_key' => '_luxureat_news_asset', 'meta_value' => $name));
    if ($existing) return wp_get_attachment_url($existing[0]->ID);
    $source = get_template_directory() . '/assets/' . $name;
    if (!is_readable($source)) return new WP_Error('missing_media', 'Missing news media: ' . $name);
    $uploaded = wp_upload_bits(basename($name), null, file_get_contents($source));
    if ($uploaded['error']) return new WP_Error('upload_failed', $uploaded['error']);
    $type = wp_check_filetype($uploaded['file']);
    $id = wp_insert_attachment(array('post_mime_type' => $type['type'], 'post_title' => pathinfo($name, PATHINFO_FILENAME), 'post_status' => 'inherit', 'post_parent' => $post_id), $uploaded['file'], $post_id, true);
    if (is_wp_error($id)) return $id;
    update_post_meta($id, '_luxureat_news_asset', $name);
    if (strpos($type['type'], 'image/') === 0) {
        require_once ABSPATH . 'wp-admin/includes/image.php';
        wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $uploaded['file']));
    }
    return wp_get_attachment_url($id);
}

add_action('admin_menu', function () {
    add_management_page('LuxurEat 新闻入库', 'LuxurEat 新闻入库', 'manage_options', 'luxureat-news-migration', function () {
        $posts = luxureat_news_posts();
        $manifest = luxureat_news_manifest();
        echo '<div class="wrap"><h1>LuxurEat 新闻入库</h1><p>将新闻正文、封面和插图存入 WordPress。已有文章不会覆盖正文；重复运行只处理尚未入库的文章。</p><p>已入库：<strong>' . count($posts) . ' / ' . count($manifest) . '</strong></p>';
        if (count($posts) < count($manifest)) {
            echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="luxureat_news_migration">';
            wp_nonce_field('luxureat-news-migration');
            echo '<button class="button button-primary">迁入下一批新闻（2 篇）</button></form>';
        }
        echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="luxureat_news_attach_media">';
        wp_nonce_field('luxureat-news-attach-media');
        echo '<button class="button">关联已有媒体与使用它的文章</button></form>';
        echo '<p><a href="' . esc_url(admin_url('edit.php?category_name=新闻中心')) . '">查看新闻文章</a> · <a href="' . esc_url(admin_url('upload.php?mode=list')) . '">查看媒体库</a></p></div>';
    });
});

add_action('admin_post_luxureat_news_migration', function () {
    if (!current_user_can('manage_options') || !current_user_can('upload_files') || !current_user_can('unfiltered_html')) wp_die('Permission denied.', '', array('response' => 403));
    check_admin_referer('luxureat-news-migration');
    $posts = luxureat_news_posts();
    $category = get_term_by('name', '新闻中心', 'category');
    if (!$category) wp_die('News Center category is missing.');
    $completed = 0;
    foreach (luxureat_news_manifest() as $item) {
        $key = $item['id'] . ':' . $item['lang'];
        if (isset($posts[$key])) continue;
        $matches = get_posts(array('post_type' => 'post', 'post_status' => 'any', 'numberposts' => 1, 'title' => $item['title']));
        $existing = $matches ? $matches[0] : null;
        $body = $item['body'];
        if (!$existing) {
            $id = wp_insert_post(wp_slash(array('post_type' => 'post', 'post_status' => 'publish', 'post_title' => $item['title'], 'post_excerpt' => $item['intro'], 'post_content' => $body, 'post_date' => $item['date'] . ' 12:00:00', 'post_category' => array($category->term_id))), true);
            if (is_wp_error($id)) wp_die(esc_html($id->get_error_message()));
        } else {
            $id = $existing->ID;
            wp_set_post_categories($id, array($category->term_id), true);
        }
        update_post_meta($id, '_luxureat_kind', 'news');
        update_post_meta($id, '_luxureat_source_id', $item['id']);
        update_post_meta($id, '_luxureat_lang', $item['lang']);
        update_post_meta($id, '_luxureat_news_category', $item['category']);
        $names = array($item['cover']);
        if (preg_match_all('/__LUX_MEDIA__(media\/brand-news\/[a-zA-Z0-9._-]+)/', $body, $found)) $names = array_merge($names, $found[1]);
        $urls = array();
        foreach (array_unique($names) as $name) {
            $url = luxureat_news_media($name, $id);
            if (is_wp_error($url)) wp_die(esc_html($url->get_error_message()));
            $urls['__LUX_MEDIA__' . $name] = $url;
        }
        if (!$existing) wp_update_post(wp_slash(array('ID' => $id, 'post_content' => strtr($body, $urls))));
        elseif ($existing->post_status !== 'publish') wp_update_post(array('ID' => $id, 'post_status' => 'publish'));
        $cover = get_posts(array('post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => 1, 'meta_key' => '_luxureat_news_asset', 'meta_value' => $item['cover']));
        if ($cover && !has_post_thumbnail($id)) set_post_thumbnail($id, $cover[0]->ID);
        $completed++;
        if ($completed >= 2) break;
    }
    wp_safe_redirect(admin_url('tools.php?page=luxureat-news-migration'));
    exit;
});

add_action('admin_post_luxureat_news_attach_media', function () {
    if (!current_user_can('manage_options')) wp_die('Permission denied.', '', array('response' => 403));
    check_admin_referer('luxureat-news-attach-media');
    $posts = get_posts(array('post_type' => array('post', 'page'), 'post_status' => array('publish', 'draft', 'private'), 'numberposts' => -1));
    $media = get_posts(array('post_type' => 'attachment', 'post_status' => 'inherit', 'post_parent' => 0, 'numberposts' => -1));
    foreach ($media as $attachment) {
        $url = wp_get_attachment_url($attachment->ID);
        $name = $url ? basename(parse_url($url, PHP_URL_PATH)) : '';
        if (!$name) continue;
        foreach ($posts as $post) {
            if ((int) get_post_thumbnail_id($post->ID) !== $attachment->ID && strpos($post->post_content, $name) === false) continue;
            wp_update_post(array('ID' => $attachment->ID, 'post_parent' => $post->ID));
            break;
        }
    }
    wp_safe_redirect(admin_url('upload.php?mode=list'));
    exit;
});
