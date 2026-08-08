# LuxurEat Web Design System

> **Status:** Normative
>  
> **Scope:** `luxureat.cn` source pages, shared components, WordPress-generated theme output, and future pages produced by developers or coding agents.
>  
> **Purpose:** Preserve a consistent LuxurEat visual language and prevent page-by-page typography, spacing, breakpoint, and layout drift.

---

## 1. Core principles

LuxurEat pages should feel editorial, restrained, premium, and consistent across Chinese and English. New pages should reuse the existing system instead of inventing new local styles.

The hierarchy is:

1. **Language typography rules**
2. **Design tokens / semantic type roles**
3. **Shared layout primitives**
4. **Reusable components**
5. **Page-specific composition**

Page-specific CSS must not override the first three layers unless there is a documented component-level reason.

### Required implementation behavior

- Use semantic font variables rather than hard-coded font-family declarations.
- Use the approved type scale rather than arbitrary font sizes.
- Use the approved container widths, page margins, gutters, and breakpoints.
- Prefer `clamp()` for large typography and large spacing.
- Keep Chinese and English visually equivalent, but do **not** force them to use identical font weight or line height.
- Do not treat every historical override in `integration.css` as a reusable pattern. This document defines the preferred standard for new work.

---

## 2. Font system

### 2.1 Approved families

| Role | Chinese | English | Default weight |
| --- | --- | --- | ---: |
| Display / H1 | `KingHwa Old Song Site` | `Nyght Serif` | ZH 700 / EN 400 |
| H2–H6 | `KingHwa Old Song Site` | `Nyght Serif` | ZH 700 / EN 400 |
| Body copy | `LuxurEat ZhiSong Site` | `Spectral` | 400 |
| Buttons / nav / labels | `LuxurEat ZhiSong Site` | `Spectral` | 500–700 |
| Chinese text inside English UI | `KingHwa Labels` | — | 700 |
| Icons | Material Symbols / Lucide SVG | Material Symbols / Lucide SVG | n/a |

### 2.2 Required semantic variables

Use the existing semantic variables:

```css
html[lang^="zh"] {
  --lux-page-heading: "KingHwa Old Song Site", serif;
  --lux-zh-headline: "KingHwa Old Song Site", serif;
  --lux-zh-body: "LuxurEat ZhiSong Site", serif;
}

html[lang^="en"] {
  --lux-page-heading: "Nyght Serif", "KingHwa Old Song Complete", serif;
  --lux-en-display: "Nyght Serif", "KingHwa Old Song Complete", serif;
  --lux-en-heading: "Nyght Serif", "KingHwa Old Song Complete", serif;
  --lux-en-body: "Spectral", "KingHwa Old Song Complete", serif;
}
```

The homepage may use optimized `... Home` variants for critical font loading, but the semantic role stays the same.

### 2.3 Forbidden font usage

Do **not** introduce unapproved UI or serif families such as:

```css
font-family: Arial;
font-family: Helvetica;
font-family: Georgia;
font-family: "Times New Roman";
```

Do not add a new font family merely to solve a local visual mismatch. Adjust the approved typography system first.

### 2.4 Language attributes are mandatory

Every page must set the correct document language:

```html
<html lang="zh-CN">
```

or:

```html
<html lang="en">
```

Chinese product names or Chinese labels inside English pages should explicitly carry a Chinese language attribute when practical:

```html
<span lang="zh-CN">中文产品名</span>
```

This allows the English UI to switch those spans back to the intended Chinese display family.

### 2.5 Icon fonts must remain isolated

Language-level font rules must never override:

```css
.material-symbols-outlined
```

Lucide icons should remain SVGs and must not inherit text typography in a way that changes their geometry.

---

## 3. Typography hierarchy

### 3.1 Standard type scale

Use the following roles. Do not invent a new font size unless an existing role clearly cannot serve the component.

| Token / role | Typical use | Size | Line height |
| --- | --- | ---: | ---: |
| Display XL | Homepage hero H1 | `clamp(64px, 8.4vw, 120px)` | `.92` |
| Display L | Page H1 / reader title | `clamp(42px, 5vw, 72px)` | ZH `1.12` / EN `1.04` |
| Heading L | Major section H2 | `48px` | `56px` |
| Heading M | Section / card heading | `32px` | `40px` |
| Heading S | Small heading | `24px` | `32px` |
| Body Primary | Long-form and standard reading text | `18px` | ZH `1.75` / EN `1.65` |
| Body Compact | Cards, summaries, utility copy | `16px` | `24px` |
| Label L | Buttons, filters, prominent labels | `14px` | `20px` |
| Label S | Metadata, helper text | `12px` | `16px` |
| Eyebrow | Hero kicker / section label | `11–14px` | `1.4` |

### 3.2 Standard body copy

Normal readable content defaults to **18px**.

Chinese:

```css
font-family: var(--lux-zh-body);
font-size: 18px;
line-height: 1.75;
font-weight: 400;
```

English:

```css
font-family: var(--lux-en-body);
font-size: 18px;
line-height: 1.65;
font-weight: 400;
```

Do not use 14–17px for ordinary article or section body copy. Smaller sizes are reserved for labels, metadata, forms, tables, and compact UI.

### 3.3 Chinese headings

Chinese headings use the headline family and strong weight:

```css
font-family: var(--lux-zh-headline);
font-weight: 700;
letter-spacing: 0;
```

The established rendering treatment may include:

```css
-webkit-text-stroke: .16px currentColor;
paint-order: stroke fill;
```

Do not add large tracking to Chinese headings.

### 3.4 English headings

English display and heading typography uses Nyght Serif at a restrained weight:

```css
font-family: var(--lux-en-heading);
font-weight: 400;
```

For major display titles:

```css
font-family: var(--lux-en-display);
font-weight: 400;
```

Do not mirror the Chinese `700` weight onto English Nyght Serif.

### 3.5 Letter spacing

Use these ranges:

| Role | Letter spacing |
| --- | ---: |
| Chinese headings | `0` |
| Chinese body | `0` |
| English display | `0` to `-.02em` |
| Normal body | `0` to `.01em` |
| Standard label | `.05em` to `.10em` |
| Eyebrow / uppercase editorial label | `.20em` to `.28em` |
| Large uppercase CTA | maximum `.30em` |

Avoid arbitrary values such as `.4em`, `6px`, or `8px` unless a specific approved component requires them.

---

## 4. Page grid and spacing

### 4.1 Base geometry

The default LuxurEat page system is:

| Token | Value |
| --- | ---: |
| Maximum page/container width | `1440px` |
| Desktop horizontal page margin | `80px` |
| Mobile horizontal page margin | `24px` |
| Standard grid gutter | `24px` |
| Major section gap | `120px` |

Reference implementation:

```css
.lux-container {
  width: min(1440px, 100%);
  margin-inline: auto;
  padding-inline: 80px;
}

@media (max-width: 767px) {
  .lux-container {
    padding-inline: 24px;
  }
}
```

Do not create random page margins such as 43px, 57px, or unrelated max-width values for standard page sections.

### 4.2 Grid behavior

Use a 12-column editorial grid when a multi-column composition is needed. Standard gaps should be based on the 24px gutter.

Special editorial sections may deviate, but the deviation must belong to a named reusable component rather than one-off anonymous page CSS.

### 4.3 Reading measure

A full-width page does not imply full-width text.

Recommended text widths:

| Content | Maximum width |
| --- | ---: |
| Long-form body | about `720px` |
| Intro / summary | `500–680px` |
| Hero support copy | about `672px` (`max-w-2xl`) |

Long paragraphs must not stretch across the full 1440px container.

---

## 5. Responsive breakpoints

Use the existing breakpoint system unless a real component fracture requires an exception:

| Name | Width |
| --- | ---: |
| Mobile base | `< 640px` |
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |

Avoid arbitrary breakpoints such as `873px`, `947px`, or `1137px`.

A custom breakpoint is acceptable only when:

1. a component visibly breaks at a specific width,
2. the component is reusable,
3. the reason is documented next to the media query.

---

## 6. Hero standard

### 6.1 Non-home page hero structure

All top-level editorial pages should use the same semantic stack:

```text
Kicker
↓
H1
↓
Support copy
↓
Scroll indicator or CTA
```

Recommended container behavior:

```css
.lux-page-hero-content {
  width: min(100%, 1152px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 2.2vw, 32px);
  margin-inline: auto;
  text-align: center;
}
```

Hero viewport behavior:

```css
.lux-page-top-hero {
  min-height: 100svh;
}
```

### 6.2 Hero support scale

Use:

```css
.lux-hero-kicker {
  font-size: 14px;
}

.lux-hero-support {
  font-size: 18px;
}
```

Do not create a different hero type scale for each page.

---

## 7. Buttons, labels, metadata, and UI copy

### 7.1 Buttons

Buttons and CTAs should normally use the body/UI family rather than the display family.

Typical range:

```css
font-size: 12px; /* compact */
font-size: 14px; /* standard */
font-weight: 600;
letter-spacing: .08em;
```

Large editorial CTAs may use 18px and up to `.30em` tracking when the component intentionally follows the established uppercase CTA pattern.

### 7.2 Metadata

Use 11–14px for dates, categories, indexes, counts, and similar metadata. These sizes are not substitutes for body copy.

### 7.3 Form fields

Inputs and form helper copy should prioritize legibility over editorial display styling. Use the body/UI family and keep field labels consistent across account, checkout, contact, and search components.

---

## 8. Tailwind and CSS usage

### 8.1 Tailwind class names are not the full design system

Some compiled Tailwind utilities still expose legacy values such as:

```text
text-body-md = 16px / 24px
```

but final language-level typography rules may override ordinary paragraphs to 18px.

Therefore:

- Do not infer the final design system solely from the utility class name.
- Prefer semantic shared classes or design tokens when adding new components.
- Avoid adding more downstream `!important` fixes merely to counter old utilities.

### 8.2 Avoid inline page typography fixes

Do not solve typography drift with new page-local `<style>` blocks.

Bad:

```html
<style>
  .page-x h2 { font-size: 53px; }
</style>
```

Preferred:

```css
.lux-section-title {
  /* shared semantic role */
}
```

### 8.3 `!important`

New CSS should not use `!important` by default. Existing code contains historical `!important` rules because the site has accumulated multiple styling layers. New work should reduce, not extend, that dependency.

Use `!important` only when overriding a third-party/plugin layer or when a documented legacy cascade makes it unavoidable.

---

## 9. Coding-agent constraints

The following rules are intended to be read literally by Codex, coding assistants, or developers generating new LuxurEat pages.

### MUST

- MUST use existing LuxurEat semantic font variables.
- MUST use KingHwa for Chinese headings.
- MUST use LuxurEat ZhiSong for Chinese body copy.
- MUST use Nyght Serif for English headings and display text.
- MUST use Spectral for English body/UI copy.
- MUST set the correct `lang` on each HTML document.
- MUST keep standard body text at 18px unless the content is explicitly metadata, compact UI, a table, or a form helper.
- MUST use Chinese body line-height `1.75` and English body line-height `1.65` for normal reading text.
- MUST keep Chinese headings at `font-weight: 700` and `letter-spacing: 0`.
- MUST keep English Nyght Serif headings/display at `font-weight: 400` by default.
- MUST use the 1440 / 80 / 24 / 24 / 120 layout system for standard pages.
- MUST use 640 / 768 / 1024 / 1280 as default breakpoints.
- MUST preserve Material Symbols and Lucide icon rendering.
- MUST reuse the shared hero structure for top-level pages unless the page has an approved special hero component.

### MUST NOT

- MUST NOT add unapproved font families.
- MUST NOT invent arbitrary font sizes for normal headings/body copy.
- MUST NOT use wide letter spacing on Chinese titles.
- MUST NOT use page-local CSS simply to restyle a standard type role.
- MUST NOT create arbitrary page margins or container widths for standard sections.
- MUST NOT create arbitrary responsive breakpoints without a documented component-level need.
- MUST NOT copy historical `integration.css` overrides blindly into new components.
- MUST NOT override `.material-symbols-outlined` with language fonts.

### SHOULD

- SHOULD use `clamp()` for display typography and large spacing.
- SHOULD keep long-form text around 720px maximum width.
- SHOULD express recurring patterns as semantic classes/components.
- SHOULD prefer reusable design tokens over raw values.
- SHOULD use the 12-column grid with 24px gutters for complex editorial layouts.
- SHOULD reduce the need for downstream overrides and `!important` rules.

---

## 10. Recommended semantic CSS layer

Long-term, new work should converge toward three layers:

```text
design-tokens.css
    ↓
typography.css
    ↓
components / pages
```

A future token layer may expose values such as:

```css
:root {
  --lux-container-max: 1440px;
  --lux-page-pad-desktop: 80px;
  --lux-page-pad-mobile: 24px;
  --lux-grid-gutter: 24px;
  --lux-section-gap: 120px;

  --lux-type-body: 18px;
  --lux-type-label: 14px;
  --lux-type-meta: 12px;
}
```

The purpose is to move progressively away from scattered raw values and late cascade corrections.

---

## 11. Review checklist for new pages

Before merging a new LuxurEat page, verify:

- [ ] Correct `lang` attribute is present.
- [ ] No unapproved font family has been introduced.
- [ ] Chinese heading/body family assignment is correct.
- [ ] English heading/body family assignment is correct.
- [ ] Normal body copy is 18px and uses the language-specific line height.
- [ ] H1/H2/H3 use the approved type scale or an existing semantic component.
- [ ] Chinese headings have no arbitrary letter spacing.
- [ ] Standard page container uses 1440px max width.
- [ ] Desktop page margin follows 80px where applicable.
- [ ] Mobile page margin follows 24px where applicable.
- [ ] Standard gutter is 24px.
- [ ] Major section rhythm is based on the 120px system or an approved responsive `clamp()` equivalent.
- [ ] Breakpoints are drawn from 640 / 768 / 1024 / 1280 unless a documented exception exists.
- [ ] Long-form text does not span excessively wide columns.
- [ ] Page hero follows the shared hero hierarchy unless intentionally using a named special hero.
- [ ] Material Symbols / Lucide icons render with their own icon rules.
- [ ] No unnecessary page-local `<style>` block was added.
- [ ] No unnecessary new `!important` rule was added.

---

## 12. Source-of-truth note

This document defines the preferred design standard for future development.

Existing pages may contain historical local overrides in `integration.css` or compiled Tailwind utilities that do not perfectly conform to this document. When modifying an old component:

1. preserve the current visual intent,
2. prefer migrating it toward this design system,
3. avoid creating a new one-off rule simply because an old one exists.

When this document and a legacy page-local implementation conflict, new development should prefer this document unless the component has a documented approved exception.
