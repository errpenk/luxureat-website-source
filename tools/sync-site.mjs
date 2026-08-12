import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import vm from "node:vm";
import sharp from "sharp";
import { assetVersion, contact, footer, navigation, pages, scripts } from "../site.config.mjs";

const rootArg = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const root = path.resolve(rootArg || process.cwd());
const check = process.argv.includes("--check");
const bagIcon = '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>';
const accountIcon = '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';

const esc = (value) => String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
const slugFor = (item, lang) => item[`${lang}Slug`];
const link = (slug) => `${slug}.html`;

function seoFor(page) {
  const robots = page.indexable === false ? '\n<meta name="robots" content="noindex,follow">' : "";
  return `<!-- lux:seo:start -->\n<title>${esc(page.seo.title)}</title>\n<meta name="description" content="${esc(page.seo.description)}">${robots}\n<!-- lux:seo:end -->`;
}

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
  const newsletter = copy.newsletter;

  return `<!-- lux:footer:start -->
<section class="lux-newsletter" aria-labelledby="lux-newsletter-title-${lang}">
  <div class="lux-newsletter-inner">
    <div class="lux-newsletter-intro"><img class="lux-newsletter-icon" loading="lazy" decoding="async" src="../assets/media/brand/newsletter-envelope.svg" alt="" aria-hidden="true"><div class="lux-newsletter-copy"><h2 id="lux-newsletter-title-${lang}">${newsletter.heading}</h2><p>${newsletter.body}</p></div></div>
    <form class="lux-newsletter-form" data-newsletter-form novalidate>
      <label class="lux-visually-hidden" for="lux-newsletter-email-${lang}">${newsletter.placeholder}</label>
      <div><input id="lux-newsletter-email-${lang}" name="email" type="email" autocomplete="email" maxlength="120" placeholder="${newsletter.placeholder}"><button type="submit">${newsletter.button}</button></div>
      <input name="company" type="text" tabindex="-1" autocomplete="off" hidden aria-hidden="true">
      <p data-newsletter-feedback role="status" aria-live="polite" data-invalid="${newsletter.invalid}"></p>
    </form>
  </div>
</section>
<footer class="lux-footer">
  <div class="lux-footer-grid">
    <div class="lux-footer-brand"><div class="lux-footer-brand-main"><img loading="lazy" decoding="async" src="../assets/media/brand/luxureat-logo.png" alt="LuxurEat"><p>${copy.description}</p></div><div class="lux-footer-legal">${legal}</div></div>
    <nav>${nav}</nav>
    <div class="lux-footer-social">${social}</div>
    <div><a href="mailto:${contact.email}">${contact.email}</a><a href="mailto:${contact.secondaryEmail}">${contact.secondaryEmail}</a><a href="tel:${contact.phoneHref}">${contact.phone}</a></div>
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

function addMobileImageSources(file, html, dimensions) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const source = tag.match(/\s(?:data-lux-src|src)=["'](\.\.\/assets\/media\/[^"']+\.(?:webp|png|jpe?g))["']/i)?.[1];
    if (!source) return tag;
    const mobile = tag.match(/\bdata-lux-mobile-src=["']([^"']+)["']/i)?.[1]
      || source.replace(/\.(?:webp|png|jpe?g)$/i, "-mobile.webp");
    if (!fs.existsSync(path.resolve(path.dirname(file), mobile))) return tag;
    let output = /\bdata-lux-mobile-src=/.test(tag)
      ? tag
      : tag.replace(/^<img\b/i, `<img data-lux-mobile-src="${mobile}"`);
    if (!/\bdata-lux-src=/.test(output)) {
      const mobileWidth = dimensions.get(mobile)?.[0];
      const desktopWidth = dimensions.get(source)?.[0];
      if (mobileWidth && desktopWidth) {
        const srcset = `srcset="${mobile} ${mobileWidth}w, ${source} ${desktopWidth}w"`;
        output = /\bsrcset=["'][^"']*["']/i.test(output)
          ? output.replace(/\bsrcset=["'][^"']*["']/i, srcset)
          : output.replace(/^<img\b/i, `<img ${srcset} sizes="100vw"`);
      }
    }
    return output;
  });
}

function mediaFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? mediaFiles(file) : [file];
  });
}

async function buildImageDimensions() {
  const mediaRoot = path.join(root, "assets/media");
  const rasterFiles = mediaFiles(mediaRoot).filter((file) => /\.(?:avif|gif|jpe?g|png|webp)$/i.test(file));
  const entries = await Promise.all(rasterFiles.map(async (file) => {
    const { width, height } = await sharp(file).metadata();
    const key = `../${path.relative(root, file).split(path.sep).join("/")}`;
    return [key, width && height ? [width, height] : null];
  }));
  const dimensions = new Map(entries.filter(([, size]) => size));
  for (const file of mediaFiles(mediaRoot).filter((item) => /\.svg$/i.test(item))) {
    const svg = fs.readFileSync(file, "utf8");
    const viewBox = svg.match(/\bviewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
    const width = svg.match(/\bwidth=["']([\d.]+)(?:px)?["']/i)?.[1] || viewBox?.[1];
    const height = svg.match(/\bheight=["']([\d.]+)(?:px)?["']/i)?.[1] || viewBox?.[2];
    if (width && height) dimensions.set(`../${path.relative(root, file).split(path.sep).join("/")}`, [Math.round(width), Math.round(height)]);
  }
  return dimensions;
}

function addImageDimensions(html, dimensions) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\bwidth=["']\d+["']/i.test(tag) && /\bheight=["']\d+["']/i.test(tag)) return tag;
    const source = tag.match(/\bdata-lux-src=["']([^"']+)["']/i)?.[1]
      || tag.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    const size = dimensions.get(source?.split(/[?#]/, 1)[0]);
    if (!size) return tag;
    return tag.replace(/^<img\b/i, `<img width="${size[0]}" height="${size[1]}"`);
  });
}

function deferHeroVideos(html) {
  return html.replace(/<video\b[^>]*\blux-hero-video\b[^>]*>/gi, (tag) => {
    const deferred = tag
      .replace(/\sautoplay(?:=["'][^"']*["'])?/i, "")
      .replace(/(?:\sdata-lux-autoplay)+/gi, " data-lux-autoplay")
      .replace(/\spreload=["'][^"']*["']/i, ' preload="none"');
    return /\bdata-lux-autoplay\b/i.test(deferred)
      ? deferred
      : deferred.replace(/^<video\b/i, '<video data-lux-autoplay');
  });
}

function fontPreloads(page) {
  const zhCritical = {
    home: ["KingHwaOldSong-home-critical.woff2", "LuxurEatZhiSong-home-subset.woff2"],
    journal: ["KingHwaOldSong-journal-critical.woff2", "LuxurEatZhiSong-journal-critical.woff2"],
    products: ["KingHwaOldSong-caviar-critical.woff2", "LuxurEatZhiSong-caviar-critical.woff2"],
    new: ["KingHwaOldSong-news-critical.woff2", "LuxurEatZhiSong-news-critical.woff2"],
    rituals: ["KingHwaOldSong-rituals-critical.woff2", "LuxurEatZhiSong-rituals-critical.woff2"],
    news: ["KingHwaOldSong-news-critical.woff2", "LuxurEatZhiSong-news-critical.woff2"],
    blog: ["KingHwaOldSong-blog-critical.woff2", "LuxurEatZhiSong-blog-critical.woff2"],
    certification: ["KingHwaOldSong-certification-critical.woff2", "LuxurEatZhiSong-certification-critical.woff2"],
    gifting: ["KingHwaOldSong-gifting-critical.woff2", "LuxurEatZhiSong-gifting-critical.woff2"],
    contact: ["KingHwaOldSong-contact-critical.woff2", "LuxurEatZhiSong-contact-critical.woff2"],
    bag: ["KingHwaOldSong-bag-critical.woff2", "LuxurEatZhiSong-bag-critical.woff2"],
  };
  const critical = zhCritical[page.key] || zhCritical.home;
  const fonts = page.lang === "zh"
    ? [
      [critical[0], "KingHwa Page Critical", 700],
      ["KingHwaOldSong-site.woff2", "KingHwa Old Song Site", 700, "normal", false],
      [critical[1], "ZhiSong Page Critical", 400],
      ["LuxurEatZhiSong-site.woff2", "LuxurEat ZhiSong Site", 400, "normal", false],
    ]
    : page.key === "home"
      ? [["NyghtSerif-home-critical.woff2", "Nyght Serif", 400], ["Spectral-home-critical.woff2", "Spectral", 400]]
      : [
        ["NyghtSerif-Regular.woff2", "Nyght Serif", 400],
        ["Spectral-Regular.woff2", "Spectral", 400],
        ["NyghtSerif-RegularItalic.woff2", "Nyght Serif", 400, "italic", false],
        ["NyghtSerif-Bold.woff2", "Nyght Serif", 700, "normal", false],
        ["Spectral-Italic.woff2", "Spectral", 400, "italic", false],
        ["Spectral-Light.woff2", "Spectral", 300, "normal", false],
        ["Spectral-SemiBold.woff2", "Spectral", 600, "normal", false],
      ];
  if (page.lang === "en" && ["home", "products", "bag"].includes(page.key)) {
    fonts.push(["KingHwaOldSong-labels-critical.woff2", "KingHwa Old Song Site", 700, "normal", false]);
  }
  const links = fonts.filter(([, , , , preload = true]) => preload).map(([font]) => `<link rel="preload" href="../assets/fonts/${font}?v=${assetVersion}" as="font" type="font/woff2" crossorigin>`).join("\n");
  const faces = fonts.map(([font, family, weight, style = "normal"]) => `@font-face{font-family:"${family}";src:url("../assets/fonts/${font}?v=${assetVersion}") format("woff2");font-weight:${weight};font-style:${style};font-display:block}`).join("");
  const localeFonts = page.lang === "zh" ? 'html[lang^="zh"]{--lux-zh-headline:"KingHwa Page Critical","KingHwa Old Song Site"!important;--lux-zh-body:"ZhiSong Page Critical","LuxurEat ZhiSong Site"!important}' : "";
  return `<!-- lux:fonts:start -->\n${links}\n<style data-lux-critical-fonts>${faces}${localeFonts}</style>\n<!-- lux:fonts:end -->`;
}

function render(page, dimensions) {
  const file = path.join(root, page.file);
  let html = fs.readFileSync(file, "utf8");
  if (/<!-- lux:seo:start -->[\s\S]*?<!-- lux:seo:end -->/.test(html)) {
    html = html.replace(/<!-- lux:seo:start -->[\s\S]*?<!-- lux:seo:end -->/, seoFor(page));
  } else {
    html = html
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>\s*/i, "")
      .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>\s*/i, "")
      .replace(/(<meta\b(?=[^>]*\bname=["']viewport["'])[^>]*>)/i, `$1\n${seoFor(page)}`);
  }
  html = replaceRegion(html, "header", /<header class="lux-header">[\s\S]*?<\/header>/, headerFor(page));
  html = replaceRegion(html, "footer", /<footer class="lux-footer">[\s\S]*?<\/footer>/, footerFor(page));
  html = replaceRegion(html, "scripts", /(?:\s*<script src="\.\.\/assets\/[^\"]+"><\/script>)+(?=\s*<\/body>)/, `\n${scriptsFor(page)}`);
  html = html.replace(/\n+(?=<!-- lux:scripts:start -->)/, "\n");
  html = html.replace(/(\.\.\/(?:assets\/css\/[^"']+\.css|integration\.css))\?v=[^"']+/g, `$1?v=${assetVersion}`);
  if (!html.includes("assets/css/newsletter.css")) {
    html = html.replace(/(<link rel="stylesheet" href="\.\.\/integration\.css\?v=[^"]+">)/, `$1\n<link rel="stylesheet" href="../assets/css/newsletter.css?v=${assetVersion}">`);
  } else {
    html = html.replace(/(\.\.\/assets\/css\/newsletter\.css)\?v=[^"']+/g, `$1?v=${assetVersion}`);
  }
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
  html = addMobileImageSources(file, html, dimensions);
  html = addImageDimensions(html, dimensions);
  html = deferHeroVideos(html);
  return [file, html];
}

function loadAcademyData() {
  const context = {
    URL,
    location: { href: `file://${path.join(root, "en/blog.html")}` },
    document: { currentScript: { src: `file://${path.join(root, "assets/data/academy.js")}` } },
    window: { LUXUREAT_ARTICLE_DATA: { articles: {} } },
  };
  vm.createContext(context);
  for (const file of ["assets/data/academy.js", "assets/data/academy-columns.js"]) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }
  return context.window.LUXUREAT_ACADEMY_DATA;
}

function normalizeAcademyValue(value) {
  if (typeof value === "string") {
    const marker = value.indexOf("/assets/");
    return marker < 0 ? value : value.slice(marker + 1);
  }
  if (Array.isArray(value)) return value.map(normalizeAcademyValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeAcademyValue(item)]));
  }
  return value;
}

function academyIndex(source) {
  const fields = ["slug", "title", "intro", "topic", "topicLabel", "image", "artClass", "wideCover"];
  const articles = Object.fromEntries(Object.entries(source.articles).map(([id, article]) => [id,
    Object.fromEntries(fields.filter((field) => article[field] != null).map((field) => {
      if (field !== "image") return [field, article[field]];
      const marker = article.image.indexOf("/assets/");
      return [field, marker < 0 ? article.image : article.image.slice(marker + 1)];
    })),
  ]));
  return `(() => {\n  const root = new URL("../../", document.currentScript?.src || location.href);\n  const data = ${JSON.stringify({ order: source.order, articles })};\n  Object.values(data.articles).forEach((article) => { if (article.image) article.image = new URL(article.image, root).href; });\n  window.LUXUREAT_ACADEMY_DATA = data;\n  const articleData = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };\n  Object.assign(articleData.articles, data.articles);\n})();\n`;
}

function academyArticleChunk(id, article) {
  return `(() => {\n  const root = new URL("../../../", document.currentScript?.src || location.href);\n  const revive = (value) => {\n    if (typeof value === "string" && value.startsWith("assets/")) return new URL(value, root).href;\n    if (Array.isArray(value)) return value.map(revive);\n    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, revive(item)]));\n    return value;\n  };\n  const data = window.LUXUREAT_ARTICLE_DATA ||= { articles: {} };\n  data.articles[${JSON.stringify(id)}] = revive(${JSON.stringify(normalizeAcademyValue(article))});\n})();\n`;
}

function performanceIssues(file, html) {
  const issues = [];
  for (const match of html.matchAll(/<script\b(?![^>]*\bsrc=)(?![^>]*\btype=["']application\/(?:json|ld\+json)["'])[^>]*>/gi)) {
    issues.push(`${file}: executable inline script ${match[0]}`);
  }
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
  const legacyRootRoutes = /^(?:\.\.\/)+(?:index|bag|caviar|contact|gifting|journal|news|products|product-imperial-beluga|rituals)\.html(?:[?#].*)?$/i;
  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    if (legacyRootRoutes.test(match[1])) {
      issues.push(`${file}: internal link uses a legacy redirect ${match[1]}`);
    }
  }
  return issues;
}

const changed = [];
const performanceFailures = [];
const imageDimensions = await buildImageDimensions();
const academyData = loadAcademyData();
const academyIndexFile = path.join(root, "assets/data/academy-index.js");
const academyIndexOutput = academyIndex(academyData);
if (!fs.existsSync(academyIndexFile) || fs.readFileSync(academyIndexFile, "utf8") !== academyIndexOutput) {
  changed.push(path.relative(root, academyIndexFile));
  if (!check) fs.writeFileSync(academyIndexFile, academyIndexOutput);
}
for (const [id, article] of Object.entries(academyData.articles)) {
  const file = path.join(root, "assets/data/academy-articles", `${id}.js`);
  const output = academyArticleChunk(id, article);
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === output) continue;
  changed.push(path.relative(root, file));
  if (!check) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, output);
  }
}
for (const page of pages) {
  const [file, output] = render(page, imageDimensions);
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
