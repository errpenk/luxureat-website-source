import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { assetVersion, contact, footer, navigation, pages, scripts } from "../site.config.mjs";

const rootArg = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const root = path.resolve(rootArg || process.cwd());
const check = process.argv.includes("--check");
const bagIcon = '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
const accountIcon = '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
const usesGoogleFonts = (html) => /<link\b[^>]*\bhref=["']https:\/\/fonts\.googleapis\.com\//i.test(html);

const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
const slugFor = (item, lang) => item[`${lang}Slug`];
const link = (slug) => `${slug}.html`;

function headerFor(page) {
  const { lang, key } = page;
  const otherLang = lang === "zh" ? "en" : "zh";
  const counterpart = pages.find((item) => item.lang === otherLang && item.key === key) || pages.find((item) => item.lang === otherLang && item.key === "home");
  const nav = navigation.map((item) => `<a${item.key === key ? ' class="active"' : ""} href="${link(slugFor(item, lang))}">${esc(item[lang])}</a>`).join("");
  const labels = lang === "zh"
    ? { nav: "navigation", bag: "购物袋", account: "个人登录", open: "关闭", closed: "菜单", menu: "菜单" }
    : { nav: "navigation", bag: "Shopping bag", account: "Account sign in", open: "Close", closed: "Menu", menu: "Menu" };
  const zhLink = lang === "zh" ? "#" : `../zh/${counterpart.slug}.html`;
  const enLink = lang === "en" ? "#" : `../en/${counterpart.slug}.html`;

  return `<!-- lux:header:start -->
<header class="lux-header">
  <a class="lux-brand" href="index.html"><img loading="eager" fetchpriority="high" decoding="async" src="../assets/media/brand/luxureat-logo.png" alt="LuxurEat"></a>
  <nav class="lux-nav" aria-label="${labels.nav}">${nav}</nav>
  <div class="lux-actions">
    <a class="lux-icon-action lux-bag-link" href="bag.html" aria-label="${labels.bag}">${bagIcon}<span class="lux-bag-count" data-bag-count hidden></span></a>
    <button class="lux-icon-action lux-account-link" type="button" data-account-open aria-label="${labels.account}">${accountIcon}</button>
    <span class="lux-lang"><a${lang === "zh" ? ' class="active"' : ""} href="${zhLink}">ZH</a><span>/</span><a${lang === "en" ? ' class="active"' : ""} href="${enLink}">EN</a></span>
    <button class="lux-menu" type="button" data-open="${labels.open}" data-closed="${labels.closed}" aria-expanded="false">${labels.menu}</button>
  </div>
</header>
<!-- lux:header:end -->`;
}

function footerFor(page) {
  const { lang } = page;
  const copy = footer[lang];
  const nav = navigation.map((item) => `<a href="${link(slugFor(item, lang))}">${esc(item[lang])}</a>`).join("");
  const social = lang === "zh"
    ? '<a href="https://xhslink.com/m/AfATtrqiQvu" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/rednote.svg" alt="">小红书</a><button type="button" data-footer-modal="wechat"><img loading="lazy" decoding="async" src="../assets/media/social/wechat.svg" alt="">微信</button><a href="https://v.douyin.com/9H5RI6LEdaU" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/douyin.svg" alt="">抖音</a><a href="https://weibo.com/u/6353448966" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/weibo.svg" alt="">微博</a>'
    : '<a href="https://xhslink.com/m/AfATtrqiQvu" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/rednote.svg" alt="">Rednote</a><button type="button" data-footer-modal="wechat"><img loading="lazy" decoding="async" src="../assets/media/social/wechat.svg" alt="">WeChat</button><a href="https://v.douyin.com/9H5RI6LEdaU" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/douyin.svg" alt="">Douyin</a><a href="https://weibo.com/u/6353448966" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="../assets/media/social/weibo.svg" alt="">Weibo</a>';
  const legal = copy.legal.map(([id, label]) => `<button type="button" data-footer-modal="${id}">${label}</button>`).join("");

  return `<!-- lux:footer:start -->
<footer class="lux-footer">
  <div class="lux-footer-grid">
    <div class="lux-footer-brand"><img loading="lazy" decoding="async" src="../assets/media/brand/luxureat-logo.png" alt="LuxurEat"><p>${copy.description}</p></div>
    <nav>${nav}</nav>
    <div class="lux-footer-social">${social}</div>
    <div><a href="mailto:${contact.email}">${contact.email}</a><a href="mailto:${contact.secondaryEmail}">${contact.secondaryEmail}</a><a href="tel:${contact.phoneHref}">${contact.phone}</a><div class="lux-footer-legal">${legal}</div></div>
  </div>
  <div class="lux-footer-bottom">${copy.copyright}</div>
</footer>
<!-- lux:footer:end -->`;
}

function scriptsFor(page) {
  const eager = page.key === "home" ? page.scripts.filter((handle) => handle === "core") : page.scripts;
  const lazy = page.key === "home" ? page.scripts.filter((handle) => handle !== "core") : [];
  const tags = eager.map((handle) => `<script defer src="../${scripts[handle].src}?v=${assetVersion}"></script>`).join("\n");
  const deferred = lazy.length
    ? '\n<script type="application/json" data-lux-deferred-scripts></script>'
    : "";
  return `<!-- lux:scripts:start -->\n${tags}${deferred}\n<!-- lux:scripts:end -->`;
}

function replaceRegion(html, name, fallback, replacement) {
  const marked = new RegExp(`<!-- lux:${name}:start -->[\\s\\S]*?<!-- lux:${name}:end -->`);
  if (marked.test(html)) return html.replace(marked, replacement);
  if (!fallback.test(html)) throw new Error(`Cannot find ${name} region`);
  return html.replace(fallback, replacement);
}

function protectMaterialIconMarkup(html) {
  return html.replace(/<(span|i)\b([^>]*\bclass=["'][^"']*\bmaterial-symbols-outlined\b[^"']*["'][^>]*)>\s*([a-z0-9_]+)\s*<\/\1>/gi, (_match, tag, attrs, icon) => {
    const cleanAttrs = attrs.replace(/\s(?:data-icon|aria-hidden|translate)=["'][^"']*["']/gi, "");
    return `<${tag}${cleanAttrs} data-icon="${icon}" aria-hidden="true" translate="no"></${tag}>`;
  });
}

function fontPreloads(page) {
  const fonts = page.lang === "zh"
    ? page.key === "home"
      ? [["KingHwaOldSong-home-critical.woff2", "KingHwa Old Song Home", 700], ["LuxurEatZhiSong-home-subset.woff2", "LuxurEat ZhiSong Home", 400]]
      : [[`KingHwaOldSong-${page.slug}-critical.woff2`, "KingHwa Old Song Page", 700], [`LuxurEatZhiSong-${page.slug}-critical.woff2`, "LuxurEat ZhiSong Page", 400]]
    : page.key === "home"
      ? [["NyghtSerif-home-critical.woff2", "Nyght Serif Home", 400], ["Spectral-home-critical.woff2", "Spectral Home", 400]]
      : [["NyghtSerif-Regular.woff2", "Nyght Serif", 400], ["Spectral-Regular.woff2", "Spectral", 400]];
  const links = fonts.map(([font]) => `<link rel="preload" href="../assets/fonts/${font}?v=${assetVersion}" as="font" type="font/woff2" crossorigin>`).join("\n");
  const faces = fonts.map(([font, family, weight]) => `@font-face{font-family:"${family}";src:url("../assets/fonts/${font}?v=${assetVersion}") format("woff2");font-weight:${weight};font-style:normal;font-display:block}`).join("");
  return `<!-- lux:fonts:start -->\n${links}\n<style data-lux-critical-fonts>${faces}</style>\n<!-- lux:fonts:end -->`;
}

function render(page) {
  const file = path.join(root, page.file);
  let html = fs.readFileSync(file, "utf8");
  html = replaceRegion(html, "header", /<header class="lux-header">[\s\S]*?<\/header>/, headerFor(page));
  html = replaceRegion(html, "footer", /<footer class="lux-footer">[\s\S]*?<\/footer>/, footerFor(page));
  html = replaceRegion(html, "scripts", /(?:\s*<script src="\.\.\/assets\/[^\"]+"><\/script>)+(?=\s*<\/body>)/, `\n${scriptsFor(page)}`);
  html = html.replace(/\n+(?=<!-- lux:scripts:start -->)/, "\n");
  html = html.replace(/(\.\.\/(?:assets\/css\/(?:tailwind-home|tailwind-site)\.css|integration\.css))\?v=[^"']+/g, `$1?v=${assetVersion}`);
  html = html.replace(/<link rel="preload" href="\.\.\/assets\/fonts\/KingHwaOldSong-subset\.woff2" as="font" type="font\/woff2" crossorigin>\n?/g, "");
  if (/<!-- lux:fonts:start -->[\s\S]*?<!-- lux:fonts:end -->/.test(html)) {
    html = html.replace(/<!-- lux:fonts:start -->[\s\S]*?<!-- lux:fonts:end -->/, fontPreloads(page));
  } else {
    html = html.replace(/(?=<link rel="stylesheet")/, `${fontPreloads(page)}\n`);
  }
  html = html.replace(/<link\b(?=[^>]*\brel=["']preconnect["'])(?=[^>]*\bhref=["']https:\/\/fonts\.(?:googleapis|gstatic)\.com["'])[^>]*>\s*/gi, "");
  html = html.replace(/<link\b[^>]*\bhref=["']https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols[^"']*["'][^>]*>\s*/gi, "");
  if (!/<link\b[^>]*\brel=["'](?:shortcut )?icon["']/i.test(html)) {
    html = html.replace(/<\/head>/i, '<link rel="icon" type="image/png" href="../assets/media/brand/luxureat-logo.png">\n</head>');
  }
  html = protectMaterialIconMarkup(html);
  return [file, html];
}

function performanceIssues(file, html) {
  const issues = [];
  for (const match of html.matchAll(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*>/gi)) {
    if (!/\b(?:defer|async)(?:\s|=|>)/i.test(match[0]) && !/\btype=["']module["']/i.test(match[0])) {
      issues.push(`${file}: blocking script ${match[0]}`);
    }
  }
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\bloading=["'](?:lazy|eager)["']/i.test(match[0]) && !/\bfetchpriority=["']high["']/i.test(match[0])) {
      issues.push(`${file}: image has no explicit loading policy ${match[0]}`);
    }
  }
  if (usesGoogleFonts(html) && !/<link\b(?=[^>]*\brel=["']preconnect["'])(?=[^>]*\bhref=["']https:\/\/fonts\.gstatic\.com["'])[^>]*>/i.test(html)) {
    issues.push(`${file}: Google Fonts is missing connection hints`);
  }
  const legacyRootRoutes = /^(?:\.\.\/)+(?:index|bag|caviar|contact|gifting|journal|product-imperial-beluga|rituals)\.html(?:[?#].*)?$/i;
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    if (legacyRootRoutes.test(match[1])) {
      issues.push(`${file}: internal link uses a legacy redirect ${match[1]}`);
    }
  }
  return issues;
}

const changed = [];
const performanceFailures = [];
for (const page of pages) {
  const [file, output] = render(page);
  performanceFailures.push(...performanceIssues(page.file, output));
  const input = fs.readFileSync(file, "utf8");
  if (input === output) continue;
  changed.push(path.relative(root, file));
  if (!check) fs.writeFileSync(file, output);
}

if (performanceFailures.length) {
  throw new Error(`Performance guardrails failed:\n${performanceFailures.join("\n")}`);
}

if (check && changed.length) {
  throw new Error(`Run npm run site:sync for: ${changed.join(", ")}`);
}
console.log(changed.length ? `Synchronized ${changed.length} pages.` : "Site pages are synchronized.");
