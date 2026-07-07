# GitHub Actions SSH Deploy

This repository can deploy the `luxureat-static` WordPress theme directly to the server after every push to `main`.

## Server Target

The likely Plesk target directory is:

```text
/var/www/vhosts/luxureat.cn/httpdocs/wp-content/themes/luxureat-static/
```

If Plesk shows a different WordPress document root, use that path instead. The directory must end with:

```text
wp-content/themes/luxureat-static/
```

## 1. Create A Deploy Key

Run this on your Mac:

```bash
ssh-keygen -t ed25519 -C "github-actions-luxureat" -f ~/.ssh/luxureat_github_actions
```

This creates:

```text
~/.ssh/luxureat_github_actions       private key for GitHub Secrets
~/.ssh/luxureat_github_actions.pub   public key for the server
```

Do not commit either key.

## 2. Add The Public Key To The Server

If SSH is available:

```bash
ssh-copy-id -i ~/.ssh/luxureat_github_actions.pub USER@luxureat.cn
```

If Plesk manages SSH keys, open Plesk and add the content of:

```text
~/.ssh/luxureat_github_actions.pub
```

to the SSH user's `authorized_keys`.

## 3. Add GitHub Secrets

In GitHub:

```text
Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
```

Add these secrets:

```text
SSH_HOST     luxureat.cn
SSH_USER     your SSH username
SSH_PORT     22
SSH_KEY      full contents of ~/.ssh/luxureat_github_actions
TARGET_DIR   /var/www/vhosts/luxureat.cn/httpdocs/wp-content/themes/luxureat-static/
```

Then add this repository variable:

```text
ENABLE_THEME_DEPLOY   true
```

Use:

```text
Repository -> Settings -> Secrets and variables -> Actions -> Variables -> New repository variable
```

`SSH_KEY` must include the full private key, including:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
...
-----END OPENSSH PRIVATE KEY-----
```

## 4. Deploy

Push to `main`:

```bash
git add .
git commit -m "Update LuxurEat WordPress theme"
git push origin main
```

GitHub Actions will:

1. package the theme for verification;
2. run `tools/verify-theme.mjs`;
3. run `tools/verify-deploy-workflow.mjs`;
4. sync `luxureat-static/` to the WordPress theme directory with `rsync --delete`.

The workflow can also be started manually from:

```text
GitHub -> Actions -> Deploy WordPress Theme -> Run workflow
```

## Safety Notes

The deploy command only syncs the `luxureat-static/` theme directory. It does not touch uploads, plugins, the database, or other WordPress files.

Keep `TARGET_DIR` exact. If it points to the wrong folder, `rsync --delete` will mirror the theme directory into that location.
