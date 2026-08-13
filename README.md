# LuxurEat Website Source

Source repository for the LuxurEat bilingual website and the WordPress theme publishing pipeline.

This repository is the source of truth. The generated WordPress theme is published to [`errpenk/luxureat-wordpress-theme`](https://github.com/errpenk/luxureat-wordpress-theme), where WordPress can pull it through Deployer for Git.

## Repository Roles

```text
errpenk/luxureat-website-source
  -> source HTML, CSS, JS, assets, tooling, docs, and WordPress sync plugin
  -> GitHub Actions builds the WordPress theme
  -> GitHub Actions publishes generated theme files to errpenk/luxureat-wordpress-theme
  -> WordPress updates the active theme through Deployer for Git webhook
```

## Site Entrypoints

- Chinese home: `zh/index.html`
- English home: `en/index.html`
- Static fallback entry: `index.html`

## Content Maintenance

Content shared across pages has one canonical data file. Edit the data file and its matching media directory; page templates and the shopping bag render from those sources.

| Domain | Text and records | Images | Runtime |
| --- | --- | --- | --- |
| Products | `assets/data/products.js` | `assets/media/products/` | `assets/js/products.js` |
| Events | `assets/data/events.js` | `assets/media/events/` | `assets/js/events.js` |
| Journal | `assets/data/journal.js` | `assets/media/journal/` | `assets/js/journal.js` |
| Brand/contact | `assets/data/brand.js` | `assets/media/brand/` | `assets/js/brand.js` |

Shared navigation, footer, modals, and page utilities live in `assets/js/core.js`. Keep content out of runtime files unless it is interface copy rather than editable product, event, journal, or brand information.

Routes, navigation labels, contact details, page script dependencies, and the shared header/footer are generated from `site.config.mjs`. After changing that file, synchronize the tracked static pages:

```bash
npm run site:sync
```

Do not hand-edit content between the `lux:header`, `lux:footer`, or `lux:scripts` markers in page HTML.

After changing content, run the unified check:

```bash
npm run check
```

## Performance Guardrails

These rules apply to every future page update:

- Declare page scripts in `site.config.mjs`. The shared generator loads them with `defer`, preserving dependency order without blocking HTML parsing.
- Give the one critical above-the-fold image `loading="eager"` and `fetchpriority="high"`. Give every other image `loading="lazy"` and `decoding="async"`.
- Keep background media on the existing viewport loader and use `preload="none"` for non-critical video.
- Link internal navigation directly to the canonical language page. Root-level legacy redirects remain only for old bookmarks and external links.
- HTML and anonymous WordPress pages use a five-minute cache with stale revalidation. Versioned CSS, JS, data, and fonts use a long immutable cache; replaceable media uses a one-day cache so same-name updates are not trapped for a year.
- Do not add a service worker or a performance dependency unless measurement proves it is necessary.

`npm run site:check` rejects blocking local scripts and images without an explicit loading policy.

## Image Uploads

New images under `assets/media/` are optimized automatically before preview and theme deployment. Large JPG and PNG files are converted to WebP, oversized WebP files are recompressed, and the longest edge is limited to 2000 pixels.

Run the same process locally before committing:

```bash
npm ci
npm run images:optimize
```

Pull requests run `npm run images:check` and fail when an image still needs optimization. Pushes to `main` or `backup` also run the optimizer and commit its output back to the source branch.

## WordPress Theme Publishing

The workflow `.github/workflows/publish-theme-repo.yml` builds the static site into a classic WordPress theme named `luxureat-static`.

Local build and verification:

```bash
npm run theme:check
```

The generated theme repository is:

```text
errpenk/luxureat-wordpress-theme
```

Treat that repository as a deployment target, not the place for long-term source edits.

## Backup Preview Flow

Use the `backup` branch for review changes. Every push to `backup` deploys the static site to GitHub Pages through `.github/workflows/deploy-backup-pages.yml`.

Review the Pages preview first, then merge `backup` into `main` only after approval. The `main` branch remains the source for publishing the WordPress theme.

## WordPress Content Sync Plugin

The plugin source lives in:

```text
wordpress-plugins/luxureat-github-sync
```

Build the installable plugin zip:

```bash
node tools/build-github-sync-plugin.mjs "$PWD"
node tools/verify-github-sync-plugin.mjs "$PWD"
```

The plugin exports published WordPress content to:

```text
content/wordpress-export.json
```

Recommended target:

```text
errpenk/luxureat-website-source
```

The plugin can also target `errpenk/luxureat-wordpress-theme`, but that is not recommended because the theme repository is generated and can be overwritten by the source publishing workflow.

## Security Notes

- GitHub Actions use read-only `GITHUB_TOKEN` permissions except the image optimizer, which has `Contents: write` only to commit optimized media back to the current branch.
- The WordPress theme publisher uses `THEME_REPO_DEPLOY_KEY` to push only to the generated theme repository.
- The WordPress content sync plugin needs a fine-grained GitHub token with only `Contents: Read and write` on the selected repository.
- Do not commit WordPress tokens, webhook URLs, `.env` files, private keys, or server credentials.
