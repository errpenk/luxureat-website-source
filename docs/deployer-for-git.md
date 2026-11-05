# Deployer for Git Setup

Use this when the WordPress host does not provide SSH or SFTP access.

## WordPress Plugin

In WordPress admin, open:

```text
Deployer for Git -> Install Theme
```

Install this public GitHub theme repository:

```text
errpenk/luxureat-wordpress-theme
```

Use branch:

```text
main
```

If the plugin asks for the provider, choose:

```text
GitHub
```

If it asks for a repository URL, use:

```text
https://github.com/errpenk/luxureat-wordpress-theme
```

The free plugin supports public repositories. The generated WordPress theme files live at the root of that repository, so WordPress can install it as a normal theme.

## Automatic Updates

The update flow is:

```text
errpenk/luxureat-website-source
  -> GitHub Actions builds luxureat-static
  -> GitHub Actions publishes root theme files to errpenk/luxureat-wordpress-theme
  -> GitHub webhook calls the Deployer for Git Push-to-Deploy URL
  -> Deployer for Git pulls that theme into WordPress
```

To make WordPress update automatically, copy the Deployer for Git **Show Push-to-Deploy URL** value and add it as a GitHub webhook on `errpenk/luxureat-wordpress-theme`.

Webhook settings:

```text
Payload URL: paste the Push-to-Deploy URL
Content type: application/json
Secret: leave blank unless Deployer for Git provides one
Events: Just the push event
Active: checked
```

Keep the Push-to-Deploy URL private. Treat it like a deploy token.

## After Installing

Go to:

```text
Appearance -> Themes
```

Activate:

```text
LuxurEat Static
```

Future source changes should be made in `errpenk/luxureat-website-source`. The generated theme repository should be treated as a deployment target.

## Page cache

WP Super Cache is enabled in Simple mode for anonymous visitors; logged-in visitors bypass the cache. LiteSpeed page caching is unavailable on this host. After publishing, open a WordPress admin page to run the theme build-version check and clear old page caches; verify the public HTML contains the new stylesheet version.
