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

## How Updates Flow

```text
errpenk/CNWeb_Prototyping
  -> GitHub Actions builds luxureat-static
  -> GitHub Actions publishes root theme files to errpenk/luxureat-wordpress-theme
  -> Deployer for Git pulls that theme into WordPress
```

## After Installing

Go to:

```text
Appearance -> Themes
```

Activate:

```text
LuxurEat Static
```

Future changes should be made in `errpenk/CNWeb_Prototyping`. The generated theme repository should be treated as a deployment target.
