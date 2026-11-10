# Reversible WordPress page migration — 2026-11-10

## Current deployment

All 26 bilingual main-page content regions are imported and enabled. WordPress page IDs are **20512–20537**; metadata `_luxureat_migration_route` maps each record to its original URL. The importer preserves the entire region between `lux:header:end` and `lux:footer:start`, including heroes and modal containers. Navigation, footer, CSS, JavaScript, and dynamic product/article data sources remain in the existing theme.

Implementation commits: `54a95c2270a3d0c8e0fbe7feafdb1d04ec020b27`, `0b5979cd1583c386e3af01a59e45289716ab713e`; privacy regression checks: `8ee46d2718612a6e5b3c82f927dcbc8b08e5dd1b`.

Open **Tools → LuxurEat 页面迁移** (`/wp-admin/tools.php?page=luxureat-page-pilot`). Each row provides the current page's editor, original-style preview, and individual enable/revert switch. The global revert button restores all original templates and returns the managed pages to drafts while preserving their edits. Re-enabling publishes them. Draft, private, and pending content is never used for anonymous rendering; administrators can preview it using a signed preview link.

Current status: **26/26 published and enabled**. Existing pages, articles, and the old certification pilot draft were not overwritten. The historical pilot page 20509 is retained but no longer controls the live certification page; use the new management table's edit links.

### Editing and future GitHub updates

The page content is a native Custom HTML block to preserve markup and interaction attributes. Use the management table's editor and preserve classes, data attributes, and structure. Publishing/saving a published page updates the corresponding original URL. GitHub remains responsible for the page shell, styles, scripts, and existing dynamic data; changing source HTML does not silently overwrite WordPress-edited content. Structural interaction changes must keep both sources compatible.

### Verification and restore artifacts

- All 26 page content regions were compared byte-for-byte before migration, after activation, after global rollback, and after reactivation. Theme stylesheet/script paths also matched.
- Global rollback restored all 26 original templates. With the final publication workflow, individual rollback of English gallery restored the original HTML and made its WordPress record non-public; re-enable republished it.
- The WordPress gallery editor was saved successfully twice, with its original title restored.
- Browser smoke checks covered syrup filtering, product details/internal links, the recipe reader, gallery filter expansion, and contact form fields. No real contact message was sent.
- The final GitHub workflow passed generated-theme checks, PHP lint, all 26 template import tests, and regression checks preventing private/draft/pending content from rendering publicly.
- Local pre-migration rendered-content baseline: `tmp/luxureat-26-pages-before-migration-20261110.json`.
- Local route/editor mapping: `tmp/luxureat-migrated-page-records-20261110.json`.
- Local post-migration WordPress page export: `tmp/luxureat-pages-after-migration-20261110.xml` (37 records, including the 26 managed pages).
- Recheck the active site with `node qa/verify_live_page_migration.mjs verify /absolute/path/to/the/baseline.json`. After reverting, use `verify-original` instead. Never overwrite the original capture.

To undo the migration, use the management panel's global revert button. It preserves the syrup release and all managed content. Remove migration code only in a separate reviewed change after disabling it; do not reset the source repository or restore the whole database just to undo this migration.

The following sections record the earlier single-page pilot for historical reference.

## Released syrup baseline

- Source commit: `688c1fee4fc5b26c03717035c16553abf32bded1`
- Source tag: `syrup-live-baseline-20261110`
- Generated theme baseline: `2b1b45d1f8862cab636c5fc78e0d1fb069f64dea`
- Chinese news: `/news/truffelixir-sweet-world/`
- English news: `/en/news/truffelixir-sweet-world/`

## Historical pilot scope and state

Only the main content of Chinese `/certification/` participates. The hero, head, navigation, footer, styles and scripts remain in the original theme. This is a pilot, not a completed migration of all 26 pages.

An editable Custom HTML draft was created in WordPress as page **20509**, titled **品质认证 · 中文 · 迁移试验**. This historical record has been preserved.

The original single-page pilot was enabled and then reverted successfully before the broader migration. Its controls have now been replaced by the 26-page management panel described above.

## Historical pilot rollback

The old pilot used `luxureat_pilot_enabled=false` to restore the original certification page. For the current implementation, use the global/individual controls described above instead.

Related options: `luxureat_pilot_page_id`, `luxureat_pilot_enabled`. Draft metadata: `_luxureat_pilot_route=zh/certification`. No pre-existing pages were overwritten or removed.

Existing WordPress pages were exported before the pilot to the local workspace file `tmp/luxureat-pages-before-migration-20261110.xml` (10 page records). This is a content export, not a full database or media backup.

## Historical pilot verification

- Generated theme checks and PHP lint passed.
- `qa/verify_migration_pilot.php` passed against the generated certification template, checking asset resolution, rejection of executable template expressions, literal replacement, and byte-identical preservation outside the main element.
- Browser checks found the same 34 main-content headings and the same theme stylesheet/script paths before, during preview, and after enabling. The image lightbox opened and closed.
- Theme asset cache-version parameters changed on deployment; this does not indicate a stylesheet change.
- The pilot was not tested across all browsers or viewport sizes. At that stage, only the certification pilot existed and was disabled.
- The broader source check has an existing `Lux Catalogue Latin` font-allowlist failure; this release did not change that unrelated font rule.
