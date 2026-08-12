<?php
/**
 * Admin UI and actions for LuxurEat GitHub Sync.
 */

defined('ABSPATH') || exit;

class LuxurEat_GitHub_Sync_Admin {
    const OPTION_NAME = 'luxureat_github_sync_options';
    const NOTICE_TRANSIENT_PREFIX = 'luxureat_github_sync_notice_';

    public static function init() {
        self::remove_legacy_token();
        add_action('admin_menu', array(__CLASS__, 'add_admin_page'));
        add_action('admin_post_luxureat_github_sync_save', array(__CLASS__, 'save_settings'));
        add_action('admin_post_luxureat_github_sync_run', array(__CLASS__, 'sync_now'));
    }

    public static function allowed_repositories() {
        return array(
            'errpenk/luxureat-website-source' => array(
                'label' => 'errpenk/luxureat-website-source',
                'description' => 'Recommended source repository for WordPress content snapshots.',
            ),
            'errpenk/luxureat-wordpress-theme' => array(
                'label' => 'errpenk/luxureat-wordpress-theme',
                'description' => 'Deployment target repository; not recommended for content snapshots because source publishes may overwrite extra files.',
            ),
        );
    }

    public static function default_options() {
        return array(
            'repository' => 'errpenk/luxureat-website-source',
            'branch' => 'main',
            'file_path' => 'content/wordpress-export.json',
            'last_sync_at' => '',
            'last_commit_url' => '',
        );
    }

    public static function get_options() {
        $stored = get_option(self::OPTION_NAME, array());
        return wp_parse_args(is_array($stored) ? $stored : array(), self::default_options());
    }

    public static function github_token() {
        if (defined('LUXUREAT_GITHUB_SYNC_TOKEN') && is_string(LUXUREAT_GITHUB_SYNC_TOKEN)) {
            return trim(LUXUREAT_GITHUB_SYNC_TOKEN);
        }

        $environment_token = getenv('LUXUREAT_GITHUB_SYNC_TOKEN');
        return is_string($environment_token) ? trim($environment_token) : '';
    }

    public static function add_admin_page() {
        add_management_page(
            'LuxurEat GitHub Sync',
            'LuxurEat GitHub Sync',
            'manage_options',
            'luxureat-github-sync',
            array(__CLASS__, 'render_page')
        );
    }

    public static function render_page() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to access this page.', 'luxureat-github-sync'));
        }

        $options = self::get_options();
        $repositories = LuxurEat_GitHub_Sync_Admin::allowed_repositories();
        $notice = self::consume_notice();
        ?>
        <div class="wrap">
            <h1>LuxurEat GitHub Sync</h1>

            <?php if ($notice) : ?>
                <div class="notice notice-<?php echo esc_attr($notice['type']); ?> is-dismissible">
                    <p><?php echo esc_html($notice['message']); ?></p>
                </div>
            <?php endif; ?>

            <p>
                Export published WordPress content to GitHub as a JSON snapshot.
                The recommended target is the source repository, not the generated theme repository.
            </p>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="luxureat_github_sync_save">
                <?php wp_nonce_field('luxureat_github_sync_save'); ?>

                <table class="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row"><label for="luxureat_github_sync_repository">Repository</label></th>
                            <td>
                                <select id="luxureat_github_sync_repository" name="repository">
                                    <?php foreach ($repositories as $repository => $meta) : ?>
                                        <option value="<?php echo esc_attr($repository); ?>" <?php selected($options['repository'], $repository); ?>>
                                            <?php echo esc_html($meta['label']); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                                <p class="description">
                                    <?php echo esc_html($repositories[$options['repository']]['description'] ?? $repositories['errpenk/luxureat-website-source']['description']); ?>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="luxureat_github_sync_branch">Branch</label></th>
                            <td>
                                <input id="luxureat_github_sync_branch" name="branch" type="text" class="regular-text" value="<?php echo esc_attr($options['branch']); ?>">
                                <p class="description">Use <code>main</code> unless you intentionally sync to another branch.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><label for="luxureat_github_sync_file_path">File path</label></th>
                            <td>
                                <input id="luxureat_github_sync_file_path" name="file_path" type="text" class="regular-text" value="<?php echo esc_attr($options['file_path']); ?>">
                                <p class="description">Recommended: <code>content/wordpress-export.json</code>.</p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">GitHub token</th>
                            <td>
                                <p class="description">
                                    <?php if (self::github_token() !== '') : ?>
                                        Configured securely through <code>LUXUREAT_GITHUB_SYNC_TOKEN</code>.
                                    <?php else : ?>
                                        Not configured. Add <code>LUXUREAT_GITHUB_SYNC_TOKEN</code> to <code>wp-config.php</code> or the server environment.
                                    <?php endif; ?>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <?php submit_button('Save Settings'); ?>
            </form>

            <hr>

            <h2>Sync now</h2>
            <p>
                This exports published pages, posts, menus, media URLs, and site metadata.
                Drafts, users, comments, passwords, and private admin data are not exported.
            </p>

            <?php if (!empty($options['last_sync_at'])) : ?>
                <p>
                    Last sync: <strong><?php echo esc_html($options['last_sync_at']); ?></strong>
                    <?php if (!empty($options['last_commit_url'])) : ?>
                        <a href="<?php echo esc_url($options['last_commit_url']); ?>" target="_blank" rel="noopener noreferrer">View commit</a>
                    <?php endif; ?>
                </p>
            <?php endif; ?>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                <input type="hidden" name="action" value="luxureat_github_sync_run">
                <?php wp_nonce_field('luxureat_github_sync_run'); ?>
                <?php submit_button('Sync to GitHub', 'primary', 'submit', false); ?>
            </form>
        </div>
        <?php
    }

    public static function save_settings() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to save these settings.', 'luxureat-github-sync'));
        }

        check_admin_referer('luxureat_github_sync_save');

        $options = self::get_options();
        $repositories = LuxurEat_GitHub_Sync_Admin::allowed_repositories();

        $repository = isset($_POST['repository']) ? sanitize_text_field(wp_unslash($_POST['repository'])) : $options['repository'];
        if (!array_key_exists($repository, $repositories)) {
            $repository = 'errpenk/luxureat-website-source';
        }

        $branch = isset($_POST['branch']) ? sanitize_text_field(wp_unslash($_POST['branch'])) : 'main';
        $branch = preg_replace('/[^A-Za-z0-9._\/-]/', '', $branch);
        $branch = $branch ? $branch : 'main';

        $file_path = isset($_POST['file_path']) ? sanitize_text_field(wp_unslash($_POST['file_path'])) : 'content/wordpress-export.json';
        $file_path = self::sanitize_file_path($file_path);

        $options['repository'] = $repository;
        $options['branch'] = $branch;
        $options['file_path'] = $file_path;

        update_option(self::OPTION_NAME, $options, false);
        self::redirect_with_notice('success', 'Settings saved.');
    }

    public static function sync_now() {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to sync content.', 'luxureat-github-sync'));
        }

        check_admin_referer('luxureat_github_sync_run');

        $options = self::get_options();
        $repositories = LuxurEat_GitHub_Sync_Admin::allowed_repositories();
        if (!array_key_exists($options['repository'], $repositories)) {
            self::redirect_with_notice('error', 'The selected GitHub repository is not allowed.');
        }

        $token = self::github_token();
        if ($token === '') {
            self::redirect_with_notice('error', 'Configure LUXUREAT_GITHUB_SYNC_TOKEN before syncing.');
        }

        $exporter = new LuxurEat_GitHub_Sync_Exporter();
        $payload = $exporter->export();
        $json = wp_json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        if (!is_string($json)) {
            self::redirect_with_notice('error', 'WordPress could not encode the export payload.');
        }

        $client = new LuxurEat_GitHub_Sync_GitHub_Client($token);
        $message = sprintf(
            'Export WordPress content from %s',
            wp_parse_url(home_url('/'), PHP_URL_HOST)
        );

        $result = $client->put_file(
            $options['repository'],
            $options['branch'],
            $options['file_path'],
            $json . "\n",
            $message
        );

        if (is_wp_error($result)) {
            self::redirect_with_notice('error', $result->get_error_message());
        }

        $options['last_sync_at'] = current_time('mysql');
        $options['last_commit_url'] = isset($result['commit_url']) ? esc_url_raw($result['commit_url']) : '';
        update_option(self::OPTION_NAME, $options, false);

        self::redirect_with_notice('success', 'Content exported to GitHub.');
    }

    private static function sanitize_file_path($file_path) {
        $file_path = trim(str_replace('\\', '/', $file_path));
        $file_path = ltrim($file_path, '/');
        $file_path = preg_replace('#/+#', '/', $file_path);

        if ($file_path === '' || strpos($file_path, '..') !== false) {
            return 'content/wordpress-export.json';
        }

        return $file_path;
    }

    private static function remove_legacy_token() {
        $stored = get_option(self::OPTION_NAME, array());
        if (!is_array($stored) || !array_key_exists('github_token', $stored)) {
            return;
        }

        unset($stored['github_token']);
        update_option(self::OPTION_NAME, $stored, false);
    }

    private static function redirect_with_notice($type, $message) {
        set_transient(
            self::NOTICE_TRANSIENT_PREFIX . get_current_user_id(),
            array(
                'type' => $type === 'error' ? 'error' : 'success',
                'message' => $message,
            ),
            60
        );

        wp_safe_redirect(add_query_arg('page', 'luxureat-github-sync', admin_url('tools.php')));
        exit;
    }

    private static function consume_notice() {
        $key = self::NOTICE_TRANSIENT_PREFIX . get_current_user_id();
        $notice = get_transient($key);
        delete_transient($key);

        return is_array($notice) ? $notice : null;
    }
}
