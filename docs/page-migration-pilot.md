# Reversible WordPress page migration pilot — 2026-11-10

## Released syrup baseline

- Source commit: `688c1fee4fc5b26c03717035c16553abf32bded1`
- Source tag: `syrup-live-baseline-20261110`
- Generated theme baseline: `2b1b45d1f8862cab636c5fc78e0d1fb069f64dea`
- Chinese news: `/news/truffelixir-sweet-world/`
- English news: `/en/news/truffelixir-sweet-world/`

## Pilot scope and current state

Only the main content of Chinese `/certification/` participates. The hero, head, navigation, footer, styles and scripts remain in the original theme. This is a pilot, not a completed migration of all 26 pages.

An editable Custom HTML draft was created in WordPress as page **20509**, titled **品质认证 · 中文 · 迁移试验**. Preserve the HTML classes, attributes and structure when editing; converting it into other block types can alter the layout.

Tools → **LuxurEat Page Migration Pilot** provides draft editing, administrator-only preview, enable, and revert controls. The pilot was enabled and then reverted successfully. **Current state: Original page (disabled).** The draft remains available.

## Revert without losing the syrup release

1. In the tool above, click **Revert migration — keep syrup update**.
2. This sets `luxureat_pilot_enabled` to false and purges the certification URL. It does not delete the draft or modify syrup content.
3. To also remove the pilot code, revert source commit `2b750cd2672de441a7b5715b812ba4b239930b80` and redeploy. Do not reset main to a pre-syrup commit.

Related options: `luxureat_pilot_page_id`, `luxureat_pilot_enabled`. Draft metadata: `_luxureat_pilot_route=zh/certification`. No pre-existing pages were overwritten or removed.

Existing WordPress pages were exported before the pilot to the local workspace file `tmp/luxureat-pages-before-migration-20261110.xml` (10 page records). This is a content export, not a full database or media backup.

## Verification

- Generated theme checks and PHP lint passed.
- `qa/verify_migration_pilot.php` passed against the generated certification template, checking asset resolution, rejection of executable template expressions, literal replacement, and byte-identical preservation outside the main element.
- Browser checks found the same 34 main-content headings and the same theme stylesheet/script paths before, during preview, and after enabling. The image lightbox opened and closed.
- Theme asset cache-version parameters changed on deployment; this does not indicate a stylesheet change.
- The pilot has not been tested across all browsers or viewport sizes. Full-site migration is not enabled.
- The broader source check has an existing `Lux Catalogue Latin` font-allowlist failure; this release did not change that unrelated font rule.
