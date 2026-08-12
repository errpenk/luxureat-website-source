import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const pluginDir = path.join(root, 'wordpress-plugins/luxureat-github-sync');
const zipFile = path.join(root, 'dist/luxureat-github-sync.zip');

const files = {
  main: path.join(pluginDir, 'luxureat-github-sync.php'),
  admin: path.join(pluginDir, 'includes/class-luxureat-github-sync-admin.php'),
  exporter: path.join(pluginDir, 'includes/class-luxureat-github-sync-exporter.php'),
  github: path.join(pluginDir, 'includes/class-luxureat-github-sync-github-client.php'),
  readme: path.join(pluginDir, 'README.md'),
  uninstall: path.join(pluginDir, 'uninstall.php'),
};

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

assert(fs.existsSync(pluginDir), 'plugin directory exists');
for (const [label, file] of Object.entries(files)) {
  assert(fs.existsSync(file), `${label} file exists`);
}

const main = read(files.main);
assert(main.includes('Plugin Name: LuxurEat GitHub Sync'), 'main plugin file declares the plugin name');
assert(main.includes("defined('ABSPATH') || exit;"), 'main plugin file blocks direct access');
assert(main.includes('LUXUREAT_GITHUB_SYNC_VERSION'), 'main plugin file defines a version constant');
assert(main.includes('class-luxureat-github-sync-admin.php'), 'main plugin file loads the admin class');
assert(main.includes('class-luxureat-github-sync-exporter.php'), 'main plugin file loads the exporter class');
assert(main.includes('class-luxureat-github-sync-github-client.php'), 'main plugin file loads the GitHub client class');

const admin = read(files.admin);
assert(admin.includes('manage_options'), 'admin page requires manage_options capability');
assert(admin.includes('wp_nonce_field('), 'admin forms emit nonces');
assert(admin.includes('check_admin_referer('), 'admin actions verify nonces');
assert(admin.includes('LuxurEat_GitHub_Sync_Admin::allowed_repositories'), 'admin uses a fixed allow-list of repositories');
assert(admin.includes('errpenk/luxureat-website-source'), 'admin defaults to the source repository');
assert(admin.includes('errpenk/luxureat-wordpress-theme'), 'admin can target the theme repository');
assert(admin.includes('LUXUREAT_GITHUB_SYNC_TOKEN') && admin.includes("getenv('LUXUREAT_GITHUB_SYNC_TOKEN')"), 'admin reads the GitHub token from server configuration');
assert(!admin.includes('name="github_token"') && !admin.includes('type="password"'), 'admin does not accept a GitHub token through WordPress settings');
assert(admin.includes('remove_legacy_token') && admin.includes("unset($stored['github_token'])"), 'admin removes legacy plaintext tokens from WordPress options');
assert(admin.includes('not recommended'), 'admin warns that the theme repository is not the preferred content target');

const exporter = read(files.exporter);
assert(exporter.includes("'post_status' => 'publish'"), 'exporter only exports published content');
assert(exporter.includes('wp_get_nav_menus'), 'exporter includes navigation menus');
assert(exporter.includes('wp_get_attachment_url'), 'exporter includes public media URLs');
assert(!/user_pass|user_email|admin_email/.test(exporter), 'exporter does not include passwords or personal admin emails');
assert(exporter.includes('apply_filters('), 'exporter exposes a filter for future extension');

const github = read(files.github);
assert(github.includes('api.github.com/repos/%s/%s/contents/%s'), 'GitHub client writes via the repository contents API');
assert(github.includes('wp_remote_get'), 'GitHub client reads the existing file SHA');
assert(github.includes('wp_remote_request'), 'GitHub client sends the update request');
assert(github.includes("'method' => 'PUT'"), 'GitHub client uses PUT for content updates');
assert(github.includes('base64_encode'), 'GitHub client base64-encodes file content');
assert(github.includes('Authorization'), 'GitHub client sends an Authorization header');
assert(github.includes('Bearer '), 'GitHub client uses bearer token authentication');

const readme = read(files.readme);
assert(readme.includes('fine-grained personal access token'), 'plugin README documents fine-grained token setup');
assert(readme.includes('Contents: Read and write'), 'plugin README documents the required GitHub permission');
assert(readme.includes('errpenk/luxureat-website-source'), 'plugin README recommends the source repository');
assert(readme.includes('LUXUREAT_GITHUB_SYNC_TOKEN'), 'plugin README documents server-side token configuration');

const uninstall = read(files.uninstall);
assert(uninstall.includes('delete_option'), 'uninstall removes stored options');
assert(uninstall.includes('luxureat_github_sync_options'), 'uninstall removes the plugin option');

assert(fs.existsSync(zipFile), 'plugin zip exists');
if (fs.existsSync(zipFile)) {
  try {
    const entries = execFileSync('unzip', ['-Z1', zipFile], { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    assert(entries.includes('luxureat-github-sync/luxureat-github-sync.php'), 'zip contains the main plugin file at the WordPress plugin root');
    assert(entries.includes('luxureat-github-sync/includes/class-luxureat-github-sync-admin.php'), 'zip contains the admin class');
    assert(!entries.some((entry) => entry.startsWith('__MACOSX/')), 'zip has no macOS metadata');
  } catch (error) {
    failures.push(`zip can be inspected with unzip: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`GitHub sync plugin verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`GitHub sync plugin verification passed for ${pluginDir}`);
