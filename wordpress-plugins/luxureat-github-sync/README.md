# LuxurEat GitHub Sync

WordPress admin plugin for exporting the live site's public content to GitHub.

The recommended target is `errpenk/luxureat-website-source`, because that repository is the source of truth. `errpenk/luxureat-wordpress-theme` is available as a selectable target, but it is a generated deployment repository and is not recommended for content snapshots.

## What It Exports

- Site title, tagline, URL, language, and timezone.
- Active theme name, version, stylesheet, and template.
- Front page settings.
- Published pages and posts.
- Navigation menus and menu items.
- Public media attachment URLs, captions, descriptions, MIME types, and alt text.

It does not export users, comments, drafts, passwords, private post content, plugin files, cache files, or server files.

## GitHub Token

Create a fine-grained personal access token in GitHub with access only to the repository you want to sync.

Required permission:

- Contents: Read and write

Recommended repository:

- `errpenk/luxureat-website-source`

Optional repository:

- `errpenk/luxureat-wordpress-theme`

Keep the token private. The plugin reads it from the `LUXUREAT_GITHUB_SYNC_TOKEN` PHP constant or server environment and does not store it in the WordPress database.

Recommended `wp-config.php` setup (place it above the `That's all, stop editing` line):

```php
define('LUXUREAT_GITHUB_SYNC_TOKEN', 'github_pat_REPLACE_WITH_YOUR_TOKEN');
```

If an older plugin version stored a token in WordPress options, this version removes that legacy value during initialization. Configure the constant before upgrading, then revoke the old token and create a replacement.

## Install

1. Upload `luxureat-github-sync.zip` in WordPress under Plugins -> Add New -> Upload Plugin.
2. Activate **LuxurEat GitHub Sync**.
3. Open Tools -> LuxurEat GitHub Sync.
4. Add `LUXUREAT_GITHUB_SYNC_TOKEN` to `wp-config.php` or the server environment.
5. Keep the repository set to `errpenk/luxureat-website-source`.
6. Keep the file path as `content/wordpress-export.json`.
7. Click **Save Settings**.
8. Click **Sync to GitHub**.
