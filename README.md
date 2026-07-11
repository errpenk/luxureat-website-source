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
- React/shadcn migration workspace: `react-router-app/` (not deployed to the current static Pages preview)

## WordPress Theme Publishing

The workflow `.github/workflows/publish-theme-repo.yml` builds the static site into a classic WordPress theme named `luxureat-static`.

Local build:

```bash
node scripts/build-luxureat-theme.mjs "$PWD" "$PWD/.deploy"
node tools/verify-theme.mjs "$PWD/.deploy"
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

- GitHub Actions use read-only `GITHUB_TOKEN` permissions unless a workflow needs a narrower deploy key.
- The WordPress theme publisher uses `THEME_REPO_DEPLOY_KEY` to push only to the generated theme repository.
- The WordPress content sync plugin needs a fine-grained GitHub token with only `Contents: Read and write` on the selected repository.
- Do not commit WordPress tokens, webhook URLs, `.env` files, private keys, or server credentials.
