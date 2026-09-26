import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';
import vm from 'node:vm';
import { pages, scripts } from '../site.config.mjs';

const sourceDir = path.resolve(process.argv[2] || process.cwd());
const outputRoot = path.resolve(process.argv[3] || process.cwd());
const themeDir = path.join(outputRoot, 'luxureat-static');
const zipFile = path.join(outputRoot, 'luxureat-static-theme.zip');
const leafletDistDir = path.join(sourceDir, 'node_modules', 'leaflet', 'dist');
const buildIdentifier = String(process.env.GITHUB_SHA || 'local').replace(/[^a-f0-9]/gi, '').slice(0, 40) || 'local';

const pageInputs = pages.map(({ lang, slug, file }) => [lang, slug, file]);

function loadAcademyArticles() {
  const context = {
    URL,
    location: { href: `file://${path.join(sourceDir, 'en/blog.html')}` },
    document: { currentScript: { src: `file://${path.join(sourceDir, 'assets/data/academy.js')}` } },
    window: { LUXUREAT_ARTICLE_DATA: { articles: {} } },
  };
  vm.createContext(context);
  for (const file of ['assets/data/academy.js', 'assets/data/academy-columns.js']) {
    vm.runInContext(fs.readFileSync(path.join(sourceDir, file), 'utf8'), context, { filename: file });
  }
  return Object.values(context.window.LUXUREAT_ACADEMY_DATA.articles);
}

const articleInputs = loadAcademyArticles();
const articleRoute = (article) => `${article.lang === 'zh' ? '' : 'en/'}blog/${article.slug}`;

function loadData(file, key) {
  const context = {
    URL,
    location: { href: `file://${path.join(sourceDir, 'zh/index.html')}` },
    document: { currentScript: { src: `file://${path.join(sourceDir, file)}` } },
    window: {},
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(sourceDir, file), 'utf8'), context, { filename: file });
  return context.window[key];
}

const productInputs = Object.entries(loadData('assets/data/products.js', 'LUXUREAT_PRODUCT_DATA').products).map(([key, product]) => ({
  ...product,
  lang: key.startsWith('zh-') ? 'zh' : 'en',
}));
const eventInputs = loadData('assets/data/events.js', 'LUXUREAT_EVENT_DATA').events.flatMap((event) => ['zh', 'en'].map((lang) => ({
  ...event,
  lang,
  copy: event[lang],
})));
const recipeInputs = Object.entries(loadData('assets/data/journal.js', 'LUXUREAT_ARTICLE_DATA').articles)
  .filter(([, article]) => article.type === 'recipe' && article.recipe)
  .map(([id, article]) => ({ ...article, id, slug: id.replace(/^(?:zh|en)-recipe-/, '') }));
const brandNewsInputs = loadData('assets/data/brand-news.js', 'LUXUREAT_BRAND_NEWS').flatMap((item) => ['zh', 'en'].map((lang) => ({
  ...item,
  lang,
  article: item[lang],
})));
const productRoute = (product) => `${product.lang === 'zh' ? '' : 'en/'}product/${product.id}`;
const recipeRoute = (recipe) => `${recipe.lang === 'zh' ? '' : 'en/'}recipe/${recipe.slug}`;
const brandNewsRoute = (item) => `${item.lang === 'zh' ? '' : 'en/'}news/${item.id}`;

function ensureSource() {
  const requiredFiles = ['README.md', '.htaccess', 'integration.css', 'robots.txt', 'llms.txt', 'google053137c136af2773.html', 'sogousiteverification.txt', 'tools/generate-sitemap.mjs', 'assets/media/brand/luxureat-logo.png', 'assets/media/brand/wechat-qr.webp', ...new Set(Object.values(scripts).map(({ src }) => src))];
  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(sourceDir, file))) {
      throw new Error(`Missing source file: ${path.join(sourceDir, file)}`);
    }
  }
  for (const file of ['leaflet.css', 'leaflet.js']) {
    if (!fs.existsSync(path.join(leafletDistDir, file))) {
      throw new Error(`Missing Leaflet dependency file: ${path.join(leafletDistDir, file)}`);
    }
  }
  for (const [, , htmlFile] of pageInputs) {
    if (!fs.existsSync(path.join(sourceDir, htmlFile))) {
      throw new Error(`Missing source page: ${path.join(sourceDir, htmlFile)}`);
    }
  }
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(file, contents) {
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function copyDir(src, dest) {
  mkdirp(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const sourcePath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

function routeKey(lang, slug) {
  return slug === 'index' ? lang : `${lang}/${slug}`;
}

function escapePhpString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function phpRouteUrl(lang, slug, suffix = '') {
  return `<?php echo esc_url(luxureat_static_url('${routeKey(lang, slug)}', '${escapePhpString(suffix)}')); ?>`;
}

function phpThemeAsset(assetPath) {
  return `<?php echo esc_url(get_template_directory_uri() . '/assets/${escapePhpString(assetPath)}'); ?>`;
}

function hasUrlScheme(href) {
  return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(href.trimStart());
}

function attrIncludes(tag, attr, value) {
  const marker = `${attr}=`;
  let offset = 0;
  while (offset < tag.length) {
    const index = tag.indexOf(marker, offset);
    if (index === -1) return false;
    const quote = tag[index + marker.length];
    if (quote !== '"' && quote !== "'") {
      offset = index + marker.length;
      continue;
    }
    const start = index + marker.length + 1;
    const end = tag.indexOf(quote, start);
    if (end === -1) return false;
    if (tag.slice(start, end).startsWith(value)) return true;
    offset = end + 1;
  }
  return false;
}

function stripTagByAttr(html, tagName, attr, value) {
  let output = '';
  let offset = 0;
  const lower = html.toLowerCase();
  const openNeedle = `<${tagName}`;
  const closeNeedle = `</${tagName}>`;

  while (offset < html.length) {
    const start = lower.indexOf(openNeedle, offset);
    if (start === -1) break;
    const openEnd = html.indexOf('>', start);
    if (openEnd === -1) break;
    const tag = html.slice(start, openEnd + 1);
    const end = tagName === 'script'
      ? lower.indexOf(closeNeedle, openEnd + 1)
      : openEnd;
    if (end === -1) break;
    const tagEnd = tagName === 'script' ? end + closeNeedle.length : end + 1;
    if (attrIncludes(tag, attr, value)) {
      output += html.slice(offset, start);
      offset = tagEnd;
    } else {
      output += html.slice(offset, tagEnd);
      offset = tagEnd;
    }
  }

  return output + html.slice(offset);
}

function stripKnownLocalIncludes(html) {
  return [
    ['link', 'href', '../integration.css'],
    ...Object.values(scripts).map(({ src }) => ['script', 'src', `../${src}`]),
  ].reduce((source, args) => stripTagByAttr(source, ...args), html);
}

function rewriteHref(href, currentLang) {
  const trimmedHref = href.trimStart();

  if (
    trimmedHref.startsWith('#') ||
    trimmedHref.startsWith('//') ||
    hasUrlScheme(trimmedHref) ||
    href.includes('<?php')
  ) {
    return href;
  }

  const sibling = href.match(/^([A-Za-z0-9-]+|index)\.html([?#].*)?$/);
  if (sibling) {
    return phpRouteUrl(currentLang, sibling[1], sibling[2] || '');
  }

  const crossLang = href.match(/^\.\.\/(zh|en)\/([A-Za-z0-9-]+|index)\.html([?#].*)?$/);
  if (crossLang) {
    return phpRouteUrl(crossLang[1], crossLang[2], crossLang[3] || '');
  }

  return href;
}

function convertHtmlSource(html, lang) {
  html = stripKnownLocalIncludes(html);
  html = html.replace(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>\s*/gi, '');

  html = html.replace(/\bsrcset=(["'])([^"']+)\1/g, (_match, quote, value) => {
    return `srcset=${quote}${value.replace(/\.\.\/assets\/([^\s,]+)/g, (_asset, assetPath) => phpThemeAsset(assetPath))}${quote}`;
  });
  html = html.replace(/\b(src|href|poster|data-lux-bg|data-lux-src)=(["'])\.\.\/assets\/([^"']+)\2/g, (_match, attr, quote, assetPath) => {
    return `${attr}=${quote}${phpThemeAsset(assetPath)}${quote}`;
  });
  html = html.replace(/url\((['"]?)\.\.\/assets\/([^'")]+)\1\)/g, (_match, quote, assetPath) => {
    return `url(${quote}${phpThemeAsset(assetPath)}${quote})`;
  });
  html = html.replace(/url\(&quot;\.\.\/assets\/([^&]+)&quot;\)/g, (_match, assetPath) => {
    return `url(&quot;${phpThemeAsset(assetPath)}&quot;)`;
  });
  html = html.replace(/(["'])\.\.\/assets\/([^"']+)\1/g, (_match, quote, assetPath) => {
    return `${quote}${phpThemeAsset(assetPath)}${quote}`;
  });
  html = html.replace(/\.\.\/assets\/([^"'\s,)]+)/g, (_match, assetPath) => phpThemeAsset(assetPath));

  html = html.replace(/\bhref=(["'])([^"']+)\1/g, (match, quote, href) => {
    const nextHref = rewriteHref(href, lang);
    return nextHref === href ? match : `href=${quote}${nextHref}${quote}`;
  });

  html = html.replace(/<\/head>/i, "<?php wp_head(); ?>\n</head>");
  html = html.replace(/<\/body>/i, "<?php wp_footer(); ?>\n</body>");

  return html;
}

function convertHtml(file, lang) {
  return convertHtmlSource(fs.readFileSync(path.join(sourceDir, file), 'utf8'), lang);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
}

function articleAsset(value) {
  const source = decodeURIComponent(String(value || ''));
  const marker = source.indexOf('/assets/');
  return marker < 0 ? source : `../assets/${source.slice(marker + 8)}`;
}

async function buildArticleImageDimensions() {
  const sources = new Set(articleInputs.flatMap((article) => [
    article.image,
    ...(article.sectionMedia || []).flat().map((item) => item.src),
  ]).concat(
    productInputs.map((product) => product.image),
    eventInputs.map((event) => event.previewImage || event.image),
    recipeInputs.map((recipe) => recipe.image),
    brandNewsInputs.flatMap((item) => [
      item.cardImage,
      item.videoPoster,
      ...(item.article.sections || []).flatMap(([, , media = []]) => media.filter((entry) => entry.type === 'image').map((entry) => entry.src)),
    ]),
  ).filter(Boolean).map(articleAsset));
  const entries = await Promise.all([...sources].map(async (source) => {
    const file = path.join(sourceDir, source.replace(/^\.\.\//, ''));
    if (!fs.existsSync(file)) return [source, ''];
    const { width, height } = await sharp(file).metadata();
    return [source, width && height ? ` width="${width}" height="${height}"` : ''];
  }));
  return new Map(entries);
}

function renderArticleContent(content) {
  const items = Array.isArray(content) ? content : [content];
  return items.map((item) => {
    if (item?.type === 'table') {
      return `<div class="lux-reader-table-wrap"><table><tbody>${item.rows.map((row, rowIndex) => `<tr>${row.map((cell) => `<${rowIndex ? 'td' : 'th'}>${escapeHtml(cell)}</${rowIndex ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    if (item?.type === 'quote') {
      return `<blockquote class="lux-reader-indent-quote">${item.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}</blockquote>`;
    }
    if (item?.type === 'strong') return `<p class="lux-reader-inline-heading"><strong>${escapeHtml(item.text)}</strong></p>`;
    if (typeof item === 'string' && item.startsWith('• ')) return `<ul class="lux-reader-prose-list"><li>${escapeHtml(item.slice(2))}</li></ul>`;
    return `<p>${escapeHtml(item)}</p>`;
  }).join('');
}

function breadcrumbHtml(lang, parentHref, parentLabel, title) {
  const home = lang === 'zh' ? '首页' : 'Home';
  const label = lang === 'zh' ? '面包屑导航' : 'Breadcrumb';
  return `<nav class="lux-breadcrumb" aria-label="${label}"><a href="index.html">${home}</a><span aria-hidden="true">/</span><a href="${parentHref}">${escapeHtml(parentLabel)}</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(title)}</span></nav>`;
}

function articlePageHtml(article, imageDimensions) {
  const blogPage = pages.find((page) => page.lang === article.lang && page.key === 'blog');
  let html = fs.readFileSync(path.join(sourceDir, blogPage.file), 'utf8');
  const cover = articleAsset(article.image);
  const sections = (article.sections || []).map(([heading, content], index) => {
    const media = (article.sectionMedia?.[index] || []).map((item) => {
      const source = articleAsset(item.src);
      return `<figure><img${imageDimensions.get(source) || ''} loading="lazy" decoding="async" src="${escapeHtml(source)}" alt="${escapeHtml(item.alt || heading)}"></figure>`;
    }).join('');
    return `<section class="lux-reader-section" id="article-section-${index}"><h2>${escapeHtml(heading)}</h2>${renderArticleContent(content)}${media ? `<div class="lux-reader-section-media">${media}</div>` : ''}</section>`;
  }).join('');
  const pageBody = `<main class="lux-article-page">${breadcrumbHtml(article.lang, 'blog.html', article.lang === 'zh' ? '知识博客' : 'Knowledge Blog', article.title)}<article class="lux-reader-layout lux-academy-reader${article.wideCover ? ' is-wide-cover' : ''}">
    <div class="lux-reader-rule"></div>
    <section class="lux-reader-hero"><div class="lux-reader-hero-copy"><div class="lux-reader-meta-grid"><span>${escapeHtml(article.eyebrow)}</span><span>${escapeHtml(article.meta)}</span></div><h1 id="lux-reader-title">${escapeHtml(article.title)}</h1><p class="lux-reader-summary">${escapeHtml(article.intro)}</p></div>${cover ? `<figure class="lux-reader-cover"><img${imageDimensions.get(cover) || ''} loading="eager" fetchpriority="high" decoding="async" src="${escapeHtml(cover)}" alt="${escapeHtml(article.title)}"></figure>` : ''}</section>
    <section class="lux-reader-content"><aside class="lux-reader-aside"><a href="${article.lang === 'zh' ? 'blog.html' : 'blog.html'}">${article.lang === 'zh' ? '返回知识博客' : 'Back to Knowledge Blog'}</a></aside><div class="lux-reader-copy">${(article.opening || []).length ? `<section class="lux-reader-section lux-reader-section-opening">${renderArticleContent(article.opening)}</section>` : ''}${sections}${article.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(article.quote)}</blockquote>` : ''}</div></section>
  </article></main>`;
  html = html.replace(/<!-- lux:seo:start -->[\s\S]*?<!-- lux:seo:end -->/, `<!-- lux:seo:start -->\n<title>${escapeHtml(article.title)} | LuxurEat</title>\n<meta name="description" content="${escapeHtml(article.intro)}">\n<!-- lux:seo:end -->`);
  const alternate = articleInputs.find((candidate) => candidate.lang !== article.lang && candidate.slug === article.slug);
  html = html.replace(`<a class="active" href="#">${article.lang === 'zh' ? 'ZH' : 'EN'}</a>`, `<a class="active" href="<?php echo esc_url(luxureat_static_url('${articleRoute(article)}')); ?>">${article.lang === 'zh' ? 'ZH' : 'EN'}</a>`);
  if (alternate) {
    const currentBlogLink = article.lang === 'zh' ? '../en/blog.html' : '../zh/blog.html';
    html = html.replace(`href="${currentBlogLink}"`, `href="<?php echo esc_url(luxureat_static_url('${articleRoute(alternate)}')); ?>"`);
  }
  html = html.replace(/(<!-- lux:header:end -->)[\s\S]*?(<!-- lux:footer:start -->)/, `$1\n${pageBody}\n$2`);
  return convertHtmlSource(html, article.lang);
}

function detailPageHtml({ lang, pageKey, title, description, route, alternateRoute, body }) {
  const sourcePage = pages.find((page) => page.lang === lang && page.key === pageKey);
  let html = fs.readFileSync(path.join(sourceDir, sourcePage.file), 'utf8');
  html = html.replace(/<!-- lux:seo:start -->[\s\S]*?<!-- lux:seo:end -->/, `<!-- lux:seo:start -->\n<title>${escapeHtml(title)} | LuxurEat</title>\n<meta name="description" content="${escapeHtml(description)}">\n<!-- lux:seo:end -->`);
  const otherLang = lang === 'zh' ? 'en' : 'zh';
  html = html.replace(`<a class="active" href="#">${lang === 'zh' ? 'ZH' : 'EN'}</a>`, `<a class="active" href="<?php echo esc_url(luxureat_static_url('${route}')); ?>">${lang === 'zh' ? 'ZH' : 'EN'}</a>`);
  const oldLanguageLink = lang === 'zh' ? `../en/${sourcePage.slug}.html` : `../zh/${sourcePage.slug}.html`;
  html = html.replace(`href="${oldLanguageLink}"`, `href="<?php echo esc_url(luxureat_static_url('${alternateRoute}')); ?>"`);
  html = html.replace(/(<!-- lux:header:end -->)[\s\S]*?(<!-- lux:footer:start -->)/, `$1\n${body}\n$2`);
  return convertHtmlSource(html, lang);
}

function productPageHtml(product, imageDimensions) {
  const alternate = productInputs.find((candidate) => candidate.lang !== product.lang && candidate.id === product.id);
  const image = articleAsset(product.image);
  const labels = product.lang === 'zh'
    ? { back: '返回产品系列', facts: '产品信息' }
    : { back: 'Back to Products', facts: 'Product information' };
  const facts = (product.details || []).map(({ label, value }) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
  const body = `<main class="lux-article-page">${breadcrumbHtml(product.lang, 'product.html', product.lang === 'zh' ? '系列产品' : 'Products', product.title)}<article class="lux-reader-layout lux-product-seo-page"><div class="lux-reader-rule"></div><section class="lux-reader-hero"><div class="lux-reader-hero-copy"><div class="lux-reader-meta-grid"><span>${escapeHtml(product.eyebrow)}</span><span>${escapeHtml(product.unit)}</span><span>${escapeHtml(product.manufacturer)}</span></div><h1 id="lux-reader-title">${escapeHtml(product.title)}</h1><p class="lux-reader-summary">${escapeHtml(product.desc)}</p></div><figure class="lux-reader-cover"><img${imageDimensions.get(image) || ''} loading="eager" fetchpriority="high" decoding="async" src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}"></figure></section><section class="lux-reader-content"><aside class="lux-reader-aside"><a href="product.html">${labels.back}</a></aside><div class="lux-reader-copy"><section class="lux-reader-section"><h2>${labels.facts}</h2><dl class="lux-seo-facts">${facts}</dl></section></div></section></article></main>`;
  return detailPageHtml({ lang: product.lang, pageKey: 'products', title: product.title, description: product.cardDesc || product.desc, route: productRoute(product), alternateRoute: productRoute(alternate || product), body });
}

function brandNewsPageHtml(item, imageDimensions) {
  const alternate = brandNewsInputs.find((candidate) => candidate.lang !== item.lang && candidate.id === item.id);
  const article = item.article;
  const cover = articleAsset(item.cardImage);
  const linkedEvent = eventInputs.find((event) => event.lang === item.lang && event.id === item.eventId);
  const renderMedia = (entry) => {
    if (entry.type === 'video') {
      const video = articleAsset(item.video);
      const poster = articleAsset(item.videoPoster || item.cardImage);
      return `<figure class="lux-brand-news-media is-video"><video controls playsinline webkit-playsinline preload="metadata" width="${item.videoWidth || 1080}" height="${item.videoHeight || 1920}" poster="${escapeHtml(poster)}"><source src="${escapeHtml(video)}" type="video/mp4"></video></figure>`;
    }
    const source = articleAsset(entry.src);
    const alt = entry.alt?.[item.lang] || article.title;
    return `<figure class="lux-brand-news-media"><img${imageDimensions.get(source) || ''} loading="lazy" decoding="async" src="${escapeHtml(source)}" alt="${escapeHtml(alt)}"></figure>`;
  };
  const sections = (article.sections || []).map(([heading, paragraphs, media = []]) => `<section class="lux-reader-section"><h2>${escapeHtml(heading)}</h2>${renderArticleContent(paragraphs)}${media.map(renderMedia).join('')}</section>`).join('');
  const linkedEventImage = linkedEvent ? articleAsset(linkedEvent.thumbnail || linkedEvent.poster || linkedEvent.image) : '';
  const linkedEventHtml = linkedEvent
    ? `<a class="lux-brand-news-event-link" href="<?php echo esc_url(luxureat_static_url('${linkedEvent.lang}/brand', '#event-${linkedEvent.id}')); ?>"><img${imageDimensions.get(linkedEventImage) || ''} loading="lazy" decoding="async" src="${escapeHtml(linkedEventImage)}" alt=""><span><small>Exhibitions &amp; Events</small><strong>${escapeHtml(linkedEvent.copy.articleTitle)}</strong></span><span aria-hidden="true">→</span></a>`
    : '';
  const body = `<main class="lux-article-page">${breadcrumbHtml(item.lang, 'brand.html', item.lang === 'zh' ? '品牌新闻' : 'Brand News', article.title)}<article class="lux-brand-news-reader lux-brand-news-seo-page">
    <figure class="lux-brand-news-hero"><img${imageDimensions.get(cover) || ''} loading="eager" fetchpriority="high" decoding="async" src="${escapeHtml(cover)}" alt="${escapeHtml(article.title)}"></figure>
    <div class="lux-brand-news-sheet"><header><p class="lux-brand-news-meta"><span>${escapeHtml(article.date)}</span><span>${escapeHtml(article.category)}</span><span>${escapeHtml(article.author)}</span></p><h1 id="lux-reader-title">${escapeHtml(article.title)}</h1><p class="lux-brand-news-intro">${escapeHtml(article.intro)}</p>${article.sourceUrl ? `<a class="lux-brand-news-source" href="${escapeHtml(article.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(article.source)} ↗</a>` : ''}</header><div class="lux-brand-news-copy">${renderArticleContent(article.opening || [])}${sections}${linkedEventHtml}</div></div>
  </article></main>`;
  return detailPageHtml({ lang: item.lang, pageKey: 'news', title: article.title, description: article.intro, route: brandNewsRoute(item), alternateRoute: brandNewsRoute(alternate || item), body });
}

function recipePageHtml(article, imageDimensions) {
  const alternate = recipeInputs.find((candidate) => candidate.lang !== article.lang && candidate.slug === article.slug);
  const recipe = article.recipe;
  const image = articleAsset(article.image);
  const labels = article.lang === 'zh'
    ? { time: '时间', difficulty: '难度', servings: '份量', ingredients: '食材', method: '准备', nutrition: '每份的估计营养成分', nutritionNote: '营养说明', region: '参考产区', oil: '推荐用油', professionalTip: '专业提示', foodSafety: '食品安全', allergens: '过敏原提示', substitutions: '可替换食材', products: '相关产品' }
    : { time: 'Time', difficulty: 'Difficulty', servings: 'Serves', ingredients: 'Ingredients', method: 'Method', nutrition: 'Estimated nutrition per serving', nutritionNote: 'Nutrition note', region: 'Reference region', oil: 'Suggested oil', professionalTip: 'Professional tip', foodSafety: 'Food safety', allergens: 'Allergen note', substitutions: 'Substitutions', products: 'Related products' };
  const productHref = `product.html${article.productCategory ? `?category=${encodeURIComponent(article.productCategory)}#product-catalogue` : ''}`;
  const details = [[labels.region, recipe.region], [labels.oil, recipe.oil], [labels.professionalTip, recipe.professionalTip], [labels.foodSafety, recipe.foodSafety], [labels.allergens, recipe.allergens], [labels.substitutions, recipe.substitutions]].filter(([, value]) => value).map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
  const body = `<main class="lux-article-page">${breadcrumbHtml(article.lang, 'recipe.html', article.lang === 'zh' ? '食谱艺术' : 'Recipes', article.title)}<article class="lux-recipe-reader lux-recipe-seo-page"><section class="lux-recipe-hero"><figure><img${imageDimensions.get(image) || ''} loading="eager" fetchpriority="high" decoding="async" src="${escapeHtml(image)}" alt="${escapeHtml(article.title)}"></figure><div class="lux-recipe-intro"><span>${escapeHtml(article.eyebrow)}</span><h1 id="lux-reader-title">${escapeHtml(article.title)}</h1><p>${escapeHtml(article.intro)}</p><dl class="lux-recipe-facts"><div><dt>${labels.time}</dt><dd>${escapeHtml(recipe.time)}</dd></div><div><dt>${labels.difficulty}</dt><dd>${escapeHtml(recipe.difficulty)}</dd></div><div><dt>${labels.servings}</dt><dd>${escapeHtml(recipe.servings)}</dd></div></dl></div></section><section class="lux-recipe-body"><aside class="lux-recipe-ingredients"><h2>${labels.ingredients}</h2><ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></aside><div class="lux-recipe-method"><h2>${labels.method}</h2><ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol></div></section><section class="lux-recipe-nutrition"><header><h2>${labels.nutrition}</h2></header><dl>${recipe.nutrition.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>${recipe.nutritionNote ? `<p class="lux-recipe-nutrition-note"><strong>${labels.nutritionNote}</strong>${escapeHtml(recipe.nutritionNote)}</p>` : ''}</section><section class="lux-recipe-details">${details}${recipe.products ? `<div><dt>${labels.products}</dt><dd><a class="lux-recipe-product-link" href="${productHref}">${escapeHtml(recipe.products)}</a></dd></div>` : ''}</section></article></main>`;
  return detailPageHtml({ lang: article.lang, pageKey: 'rituals', title: article.title, description: article.intro, route: recipeRoute(article), alternateRoute: recipeRoute(alternate || article), body });
}

function buildRoutesPhp() {
  const lines = [
    '<?php',
    'return array(',
  ];
  for (const [lang, slug] of pageInputs) {
    const route = slug === 'index' ? lang : `${lang}/${slug}`;
    const file = slug === 'index' ? `pages/${lang}/index.php` : `pages/${lang}/${slug}.php`;
    lines.push(`    '${route}' => '${file}',`);
  }
  for (const article of articleInputs) {
    lines.push(`    '${articleRoute(article)}' => 'pages/${article.lang}/blog/${article.slug}.php',`);
  }
  for (const product of productInputs) {
    lines.push(`    '${productRoute(product)}' => 'pages/${product.lang}/product/${product.id}.php',`);
  }
  for (const recipe of recipeInputs) {
    lines.push(`    '${recipeRoute(recipe)}' => 'pages/${recipe.lang}/recipe/${recipe.slug}.php',`);
  }
  for (const item of brandNewsInputs) {
    lines.push(`    '${brandNewsRoute(item)}' => 'pages/${item.lang}/news/${item.id}.php',`);
  }
  lines.push(');', '');
  return lines.join('\n');
}

function styleCss() {
  return `/*
Theme Name: LuxurEat Static
Theme URI: https://github.com/errpenk/luxureat-website-source
Author: LuxurEat
Description: Static LuxurEat bilingual prototype packaged as a WordPress theme.
Version: 1.0.9
Requires at least: 6.0
Text Domain: luxureat-static
*/
`;
}

function phpList(values) {
  return `array(${values.map((value) => `'${escapePhpString(value)}'`).join(', ')})`;
}

function buildAssetCatalogPhp() {
  const catalog = Object.entries(scripts).map(([handle, script]) => {
    return `        '${escapePhpString(handle)}' => array('src' => '${escapePhpString(script.src)}', 'dependencies' => ${phpList(script.dependencies)}),`;
  }).join('\n');
  const byPath = [...pages.map((page) => {
    return `        '${escapePhpString(page.route)}' => ${phpList(page.key === 'home' ? ['image-variants', 'core'] : page.scripts)},`;
  }), ...articleInputs.map((article) => `        '${articleRoute(article)}' => array('core'),`), ...productInputs.map((product) => `        '${productRoute(product)}' => array('core'),`), ...recipeInputs.map((recipe) => `        '${recipeRoute(recipe)}' => array('core'),`), ...brandNewsInputs.map((item) => `        '${brandNewsRoute(item)}' => array('core'),`)].join('\n');
  return { catalog, byPath };
}

function buildSeoCatalogPhp() {
  const pageRows = pages.map((page) => {
    const alternate = pages.find((candidate) => candidate.key === page.key && candidate.lang !== page.lang);
    return `        '${escapePhpString(page.route)}' => array('title' => '${escapePhpString(page.seo.title)}', 'description' => '${escapePhpString(page.seo.description)}', 'lang' => '${page.lang}', 'alternate' => '${escapePhpString(alternate?.route || page.route)}', 'indexable' => ${page.indexable === false ? 'false' : 'true'}, 'type' => 'WebPage', 'image' => 'media/brand/home-hero-truffle-poster.webp'),`;
  });
  const articleRows = articleInputs.map((article) => {
    const alternate = articleInputs.find((candidate) => candidate.lang !== article.lang && candidate.slug === article.slug);
    const image = String(article.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    return `        '${articleRoute(article)}' => array('title' => '${escapePhpString(article.title)} | LuxurEat', 'description' => '${escapePhpString(article.intro)}', 'lang' => '${article.lang}', 'alternate' => '${alternate ? articleRoute(alternate) : articleRoute(article)}', 'indexable' => true, 'type' => 'Article', 'image' => '${escapePhpString(image)}', 'author' => 'LuxurEat'),`;
  });
  const productRows = productInputs.map((product) => {
    const alternate = productInputs.find((candidate) => candidate.lang !== product.lang && candidate.id === product.id);
    const image = String(product.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    return `        '${productRoute(product)}' => array('title' => '${escapePhpString(product.title)} | LuxurEat', 'description' => '${escapePhpString(product.cardDesc || product.desc)}', 'lang' => '${product.lang}', 'alternate' => '${productRoute(alternate || product)}', 'indexable' => true, 'type' => 'WebPage', 'contentType' => 'Product', 'image' => '${escapePhpString(image)}', 'sku' => '${escapePhpString(product.sku)}', 'category' => '${escapePhpString(product.eyebrow)}'),`;
  });
  const recipeRows = recipeInputs.map((article) => {
    const alternate = recipeInputs.find((candidate) => candidate.lang !== article.lang && candidate.slug === article.slug);
    const image = String(article.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    const minutes = String(article.recipe.time).match(/\d+/)?.[0];
    const nutrition = (article.recipe.nutrition || []).map(([label, value]) => `${label}: ${value}`).join('; ');
    return `        '${recipeRoute(article)}' => array('title' => '${escapePhpString(article.title)} | LuxurEat', 'description' => '${escapePhpString(article.intro)}', 'lang' => '${article.lang}', 'alternate' => '${recipeRoute(alternate || article)}', 'indexable' => true, 'type' => 'Recipe', 'image' => '${escapePhpString(image)}', 'category' => '${escapePhpString(article.eyebrow)}', 'totalTime' => '${minutes ? `PT${minutes}M` : ''}', 'yield' => '${escapePhpString(article.recipe.servings)}', 'ingredients' => ${phpList(article.recipe.ingredients)}, 'instructions' => ${phpList(article.recipe.steps)}, 'nutrition' => '${escapePhpString(nutrition)}'),`;
  });
  const brandNewsRows = brandNewsInputs.map((item) => {
    const alternate = brandNewsInputs.find((candidate) => candidate.lang !== item.lang && candidate.id === item.id);
    const image = String(item.cardImage || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    return `        '${brandNewsRoute(item)}' => array('title' => '${escapePhpString(item.article.title)} | LuxurEat', 'description' => '${escapePhpString(item.article.intro)}', 'lang' => '${item.lang}', 'alternate' => '${brandNewsRoute(alternate || item)}', 'indexable' => true, 'type' => 'NewsArticle', 'image' => '${escapePhpString(image)}', 'datePublished' => '${escapePhpString(item.date)}', 'author' => '${escapePhpString(item.article.author || 'LuxurEat')}'),`;
  });
  return [...pageRows, ...articleRows, ...productRows, ...recipeRows, ...brandNewsRows].join('\n');
}

function functionsPhp() {
  const { catalog, byPath } = buildAssetCatalogPhp();
  const seoCatalog = buildSeoCatalogPhp();
  const eventIds = [...new Set(eventInputs.map((event) => event.id))];
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

function luxureat_static_routes() {
    $routes = require get_template_directory() . '/routes.php';
    return is_array($routes) ? $routes : array();
}

function luxureat_static_aliases() {
    return array(
        'index.html' => 'zh',
        'zh/index.html' => 'zh',
        'en/index.html' => 'en',
        'zh/about-us' => 'zh/about-us',
        'zh/about-us.html' => 'zh/about-us',
        'zh/product' => 'zh/product',
        'zh/product.html' => 'zh/product',
        'zh/recipe' => 'zh/recipe',
        'zh/recipe.html' => 'zh/recipe',
        'zh/brand' => 'zh/brand',
        'zh/brand.html' => 'zh/brand',
        'zh/blog' => 'zh/blog',
        'zh/blog.html' => 'zh/blog',
        'zh/new' => 'zh/new',
        'zh/new.html' => 'zh/new',
        'zh/cooperation' => 'zh/cooperation',
        'zh/cooperation.html' => 'zh/cooperation',
        'zh/certification' => 'zh/certification',
        'zh/certification.html' => 'zh/certification',
        'zh/china-market-insights' => 'zh/china-market-insights',
        'zh/china-market-insights.html' => 'zh/china-market-insights',
        'zh/import-export-services' => 'zh/import-export-services',
        'zh/import-export-services.html' => 'zh/import-export-services',
        'zh/contact' => 'zh/contact',
        'zh/contact.html' => 'zh/contact',
        'en/about-us.html' => 'en/about-us',
        'en/product.html' => 'en/product',
        'en/recipe.html' => 'en/recipe',
        'en/brand.html' => 'en/brand',
        'en/blog.html' => 'en/blog',
        'en/cooperation.html' => 'en/cooperation',
        'en/certification.html' => 'en/certification',
        'en/contact.html' => 'en/contact',
        'about-us' => 'zh/about-us',
        'about-us.html' => 'zh/about-us',
        'journal' => 'zh/about-us',
        'journal.html' => 'zh/about-us',
        'product' => 'zh/product',
        'product.html' => 'zh/product',
        'caviar' => 'zh/product',
        'caviar.html' => 'zh/product',
        'recipe' => 'zh/recipe',
        'recipe.html' => 'zh/recipe',
        'rituals' => 'zh/recipe',
        'rituals.html' => 'zh/recipe',
        'brand' => 'zh/brand',
        'brand.html' => 'zh/brand',
        'news' => 'zh/brand',
        'news.html' => 'zh/brand',
        'blog' => 'zh/blog',
        'blog.html' => 'zh/blog',
        'new' => 'zh/new',
        'new.html' => 'zh/new',
        'cooperation' => 'zh/cooperation',
        'cooperation.html' => 'zh/cooperation',
        'gifting' => 'zh/cooperation',
        'gifting.html' => 'zh/cooperation',
        'china-market-insights' => 'zh/china-market-insights',
        'china-market-insights.html' => 'zh/china-market-insights',
        'import-export-services' => 'zh/import-export-services',
        'import-export-services.html' => 'zh/import-export-services',
        'certification' => 'zh/certification',
        'certification.html' => 'zh/certification',
        'contact' => 'zh/contact',
        'contact.html' => 'zh/contact',
        'en/journal' => 'en/about-us',
        'en/journal.html' => 'en/about-us',
        'en/products' => 'en/product',
        'en/products.html' => 'en/product',
        'en/caviar' => 'en/product',
        'en/caviar.html' => 'en/product',
        'en/rituals' => 'en/recipe',
        'en/rituals.html' => 'en/recipe',
        'en/news' => 'en/brand',
        'en/news.html' => 'en/brand',
        'en/new.html' => 'en/new',
        'en/gifting' => 'en/cooperation',
        'en/gifting.html' => 'en/cooperation',
        'en/private' => 'en/cooperation',
        'en/private.html' => 'en/cooperation',
        'en/china-market-insights.html' => 'en/china-market-insights',
        'en/import-export-services.html' => 'en/import-export-services',
        'private-selection' => 'en/cooperation',
        'private-selection.html' => 'en/cooperation',
        'product-imperial-beluga' => 'zh/product',
        'product-imperial-beluga.html' => 'zh/product',
    );
}

function luxureat_static_normalize_path($path) {
    $path = is_string($path) ? $path : '';
    $path = trim($path);
    $path = trim($path, '/');
    $path = preg_replace('#/+#', '/', $path);
    return $path ? $path : '';
}

function luxureat_static_pretty_paths() {
    return array(
        'zh' => '/',
        'zh/product' => '/product/',
        'zh/recipe' => '/recipe/',
        'zh/about-us' => '/about-us/',
        'zh/brand' => '/brand/',
        'zh/blog' => '/blog/',
        'zh/new' => '/new/',
        'zh/cooperation' => '/cooperation/',
        'zh/certification' => '/certification/',
        'zh/china-market-insights' => '/china-market-insights/',
        'zh/import-export-services' => '/import-export-services/',
        'zh/contact' => '/contact/',
        'en' => '/en/',
        'en/product' => '/en/product/',
        'en/recipe' => '/en/recipe/',
        'en/about-us' => '/en/about-us/',
        'en/brand' => '/en/brand/',
        'en/blog' => '/en/blog/',
        'en/new' => '/en/new/',
        'en/cooperation' => '/en/cooperation/',
        'en/certification' => '/en/certification/',
        'en/china-market-insights' => '/en/china-market-insights/',
        'en/import-export-services' => '/en/import-export-services/',
        'en/contact' => '/en/contact/',
    );
}

function luxureat_static_url($path = 'zh', $suffix = '') {
    $path = luxureat_static_normalize_path($path);
    $suffix = is_string($suffix) ? $suffix : '';
    $pretty_paths = luxureat_static_pretty_paths();
    $home = untrailingslashit((string) get_option('home'));

    $route = isset($pretty_paths[$path])
        ? $pretty_paths[$path]
        : '/' . $path . '/';
    $url = $home . $route;

    return $url . $suffix;
}

function luxureat_static_current_path() {
    $query_path = get_query_var('luxureat_path');
    if (is_string($query_path) && $query_path !== '') {
        return luxureat_static_normalize_path($query_path);
    }

    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $home_path = parse_url((string) get_option('home'), PHP_URL_PATH);

    $request_path = is_string($request_path) ? $request_path : '/';
    $home_path = is_string($home_path) ? $home_path : '/';

    if ($home_path !== '/' && strpos($request_path, $home_path) === 0) {
        $request_path = substr($request_path, strlen($home_path));
    }

    return luxureat_static_normalize_path($request_path);
}

function luxureat_static_is_allowed_public_query($key, $route) {
    if (strpos($key, 'utm_') === 0 || strpos($key, 'attribute_') === 0) {
        return true;
    }

    if (in_array($key, array('gclid', 'dclid', 'fbclid', 'msclkid', '_gl'), true)) {
        return true;
    }

    return in_array($route, array('zh/product', 'en/product'), true) && $key === 'category';
}

function luxureat_static_reject_noncanonical_requests() {
    if (
        is_admin()
        || is_user_logged_in()
        || (function_exists('wp_doing_ajax') && wp_doing_ajax())
        || (function_exists('wp_doing_cron') && wp_doing_cron())
    ) {
        return;
    }

    $method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper((string) $_SERVER['REQUEST_METHOD']) : 'GET';
    if (!in_array($method, array('GET', 'HEAD'), true)) {
        return;
    }

    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $request_path = luxureat_static_normalize_path(is_string($request_path) ? $request_path : '');
    $gone_paths = array('product-category/uncategorized');
    $gone = in_array($request_path, $gone_paths, true);

    $route = $request_path === '' ? 'zh' : $request_path;
    $aliases = luxureat_static_aliases();
    if (isset($aliases[$route])) {
        $route = $aliases[$route];
    }
    $public_route = isset(luxureat_static_routes()[$route]);

    $raw_query = parse_url($request_uri, PHP_URL_QUERY);
    if (!$gone && $public_route && is_string($raw_query) && $raw_query !== '') {
        $decoded_query = rawurldecode($raw_query);
        $gone = preg_match('/^[A-Za-z]=[0-9]{7,}$/', $decoded_query) === 1
            || preg_match('#^[^=&]+/[^=&]+\\.html(?:&.*)?$#i', $decoded_query) === 1;

        if (!$gone) {
            $query = array();
            wp_parse_str($raw_query, $query);
            foreach (array_keys($query) as $key) {
                if (!luxureat_static_is_allowed_public_query((string) $key, $route)) {
                    $gone = true;
                    break;
                }
            }
        }
    }

    if (!$gone) {
        return;
    }

    status_header(410);
    nocache_headers();
    header('X-Robots-Tag: noindex, nofollow', true);
    header('Content-Type: text/html; charset=UTF-8');
    if ($method !== 'HEAD') {
        echo '<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Gone</title></head><body><h1>410 Gone</h1></body></html>';
    }
    exit;
}
add_action('template_redirect', 'luxureat_static_reject_noncanonical_requests', -200);

function luxureat_static_redirect_legacy_aliases() {
    if (is_admin() || (function_exists('wp_doing_ajax') && wp_doing_ajax())) {
        return;
    }

    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '/';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $request_path = luxureat_static_normalize_path(is_string($request_path) ? $request_path : '');
    if (preg_match('#^(en/)?events/([a-z0-9-]+)$#', $request_path, $matches) && in_array($matches[2], ${phpList(eventIds)}, true)) {
        $brand_route = empty($matches[1]) ? 'zh/brand' : 'en/brand';
        wp_safe_redirect(luxureat_static_url($brand_route, '#event-' . rawurlencode($matches[2])), 301);
        exit;
    }
    $aliases = luxureat_static_aliases();

    if (isset($aliases[$request_path])) {
        $target_path = $aliases[$request_path];
        $pretty_paths = luxureat_static_pretty_paths();
        $canonical_request_path = isset($pretty_paths[$target_path])
            ? trim($pretty_paths[$target_path], '/')
            : '';
        if ($canonical_request_path === $request_path) {
            return;
        }
        wp_safe_redirect(luxureat_static_url($target_path), 301);
        exit;
    }
}
add_action('template_redirect', 'luxureat_static_redirect_legacy_aliases', -150);

function luxureat_static_disable_consumer_commerce() {
    if (is_admin() || (function_exists('wp_doing_ajax') && wp_doing_ajax())) {
        return;
    }
    $is_consumer_page = (function_exists('is_cart') && is_cart())
        || (function_exists('is_checkout') && is_checkout())
        || (function_exists('is_account_page') && is_account_page());
    if (!$is_consumer_page) {
        return;
    }
    $path = luxureat_static_current_path();
    $language = $path === 'en' || strpos($path, 'en/') === 0 ? 'en' : 'zh';
    wp_safe_redirect(luxureat_static_url($language . '/product'), 302);
    exit;
}
add_action('template_redirect', 'luxureat_static_disable_consumer_commerce', -50);

function luxureat_static_publish_root_robots() {
    $source = get_template_directory() . '/robots.txt';
    $target = trailingslashit(ABSPATH) . 'robots.txt';
    if (!is_readable($source)) {
        return;
    }

    $contents = file_get_contents($source);
    $target_hash = is_readable($target) ? hash_file('sha256', $target) : false;
    if ($contents === false || (is_string($target_hash) && hash_equals(hash('sha256', $contents), $target_hash))) {
        return;
    }
    if (!is_writable(ABSPATH)) {
        return;
    }

    $temporary = $target . '.luxureat.tmp';
    if (file_put_contents($temporary, $contents, LOCK_EX) !== false) {
        @chmod($temporary, 0644);
        @rename($temporary, $target);
    }
    if (is_file($temporary)) {
        @unlink($temporary);
    }
}
add_action('after_setup_theme', 'luxureat_static_publish_root_robots', 1);

function luxureat_static_search_metadata_endpoint() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $files = array(
        '/google053137c136af2773.html' => array('google053137c136af2773.html', 'text/html; charset=UTF-8'),
        '/robots.txt' => array('robots.txt', 'text/plain; charset=UTF-8'),
        '/llms.txt' => array('llms.txt', 'text/plain; charset=UTF-8'),
        '/sitemap.xml' => array('sitemap.xml', 'application/xml; charset=UTF-8'),
        '/catalogues/tin-caviar-academy.pdf' => array('assets/documents/tin-caviar-academy.pdf', 'application/pdf'),
        '/catalogues/luxureat-brochure.pdf' => array('assets/documents/luxureat-brochure.pdf', 'application/pdf'),
    );

    if (!isset($files[$request_path])) {
        return;
    }

    $file = get_template_directory() . '/' . $files[$request_path][0];
    if (!is_file($file) || !is_readable($file)) {
        return;
    }

    status_header(200);
    header_remove('X-Robots-Tag');
    header_remove('X-Powered-By');
    header_remove('Set-Cookie');
    header_remove('Pragma');
    header_remove('Expires');
    header_remove('Vary');
    header('Content-Type: ' . $files[$request_path][1], true);
    header('Cache-Control: public, max-age=3600, stale-while-revalidate=86400', true);
    header('Expires: ' . gmdate('D, d M Y H:i:s', time() + HOUR_IN_SECONDS) . ' GMT', true);
    header('Vary: Accept-Encoding', true);
    header('X-Content-Type-Options: nosniff', true);
    if (!isset($_SERVER['REQUEST_METHOD']) || strtoupper((string) $_SERVER['REQUEST_METHOD']) !== 'HEAD') {
        readfile($file);
    }
    exit;
}
add_action('init', 'luxureat_static_search_metadata_endpoint', -100);

function luxureat_sogou_site_verification() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    if (parse_url($request_uri, PHP_URL_PATH) !== '/sogousiteverification.txt') {
        return;
    }

    $file = get_template_directory() . '/sogousiteverification.txt';
    if (!is_file($file) || !is_readable($file)) {
        return;
    }

    status_header(200);
    nocache_headers();
    header('Content-Type: text/plain; charset=UTF-8');
    readfile($file);
    exit;
}
add_action('template_redirect', 'luxureat_sogou_site_verification', -100);

function luxureat_baidu_site_verification() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    if (parse_url($request_uri, PHP_URL_PATH) !== '/baidu_verify_codeva-unoYAk5W8p.html') {
        return;
    }

    status_header(200);
    nocache_headers();
    header('Content-Type: text/html; charset=UTF-8');
    echo '6c9c028426f2f70621969ba37ffb0ae3';
    exit;
}
add_action('template_redirect', 'luxureat_baidu_site_verification', -100);

function luxureat_static_seo_catalog() {
    return array(
${seoCatalog}
    );
}

function luxureat_static_disable_yoast_output() {
    $path = luxureat_static_current_path();
    $path = $path === '' || $path === '__home' ? 'zh' : $path;
    $aliases = luxureat_static_aliases();
    $route = isset($aliases[$path]) ? $aliases[$path] : $path;
    if (!isset(luxureat_static_seo_catalog()[$route]) || !function_exists('YoastSEO')) {
        return;
    }

    $front_end = YoastSEO()->classes->get(Yoast\\WP\\SEO\\Integrations\\Front_End_Integration::class);
    remove_action('wpseo_head', array($front_end, 'present_head'), -9999);
}
add_action('template_redirect', 'luxureat_static_disable_yoast_output', -20);

function luxureat_static_seo_head() {
    $path = luxureat_static_current_path();
    $path = $path === '' || $path === '__home' ? 'zh' : $path;
    $aliases = luxureat_static_aliases();
    $route = isset($aliases[$path]) ? $aliases[$path] : $path;
    $catalog = luxureat_static_seo_catalog();
    if (!isset($catalog[$route])) {
        return;
    }

    $meta = $catalog[$route];
    $alternate = isset($catalog[$meta['alternate']]) ? $catalog[$meta['alternate']] : null;
    $zh_route = $meta['lang'] === 'zh' ? $route : $meta['alternate'];
    $canonical = luxureat_static_url($route);
    $image = get_template_directory_uri() . '/assets/' . $meta['image'];
    echo '<link rel="canonical" href="' . esc_url($canonical) . '">' . "\n";
    echo '<link rel="alternate" hreflang="zh-CN" href="' . esc_url(luxureat_static_url($zh_route)) . '">' . "\n";
    if ($alternate) {
        $en_route = $meta['lang'] === 'en' ? $route : $meta['alternate'];
        echo '<link rel="alternate" hreflang="en" href="' . esc_url(luxureat_static_url($en_route)) . '">' . "\n";
    }
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url(luxureat_static_url($zh_route)) . '">' . "\n";
    $is_article = in_array($meta['type'], array('Article', 'NewsArticle'), true);
    $og_type = $is_article ? 'article' : ($meta['type'] === 'Product' ? 'product' : 'website');
    echo '<meta property="og:type" content="' . esc_attr($og_type) . '">' . "\n";
    echo '<meta property="og:site_name" content="LuxurEat">' . "\n";
    echo '<meta property="og:locale" content="' . esc_attr($meta['lang'] === 'zh' ? 'zh_CN' : 'en_US') . '">' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($meta['title']) . '">' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($meta['description']) . '">' . "\n";
    echo '<meta property="og:url" content="' . esc_url($canonical) . '">' . "\n";
    echo '<meta property="og:image" content="' . esc_url($image) . '">' . "\n";
    echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($meta['title']) . '">' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($meta['description']) . '">' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($image) . '">' . "\n";
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => $meta['type'],
        'name' => $meta['title'],
        'headline' => $is_article ? $meta['title'] : null,
        'description' => $meta['description'],
        'url' => $canonical,
        'image' => $image,
        'inLanguage' => $meta['lang'] === 'zh' ? 'zh-CN' : 'en',
        'isPartOf' => array('@type' => 'WebSite', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh')),
        'sku' => $meta['type'] === 'Product' ? $meta['sku'] : null,
        'category' => in_array($meta['type'], array('Product', 'Recipe'), true) ? $meta['category'] : null,
        'brand' => $meta['type'] === 'Product' ? array('@type' => 'Brand', 'name' => 'LuxurEat') : null,
        'startDate' => $meta['type'] === 'Event' ? $meta['startDate'] : null,
        'endDate' => $meta['type'] === 'Event' ? $meta['endDate'] : null,
        'eventStatus' => $meta['type'] === 'Event' ? 'https://schema.org/EventScheduled' : null,
        'eventAttendanceMode' => $meta['type'] === 'Event' ? 'https://schema.org/OfflineEventAttendanceMode' : null,
        'location' => $meta['type'] === 'Event' ? array('@type' => 'Place', 'name' => $meta['location'], 'address' => array('@type' => 'PostalAddress', 'name' => $meta['location'], 'addressLocality' => $meta['city'], 'addressCountry' => $meta['country'])) : null,
        'organizer' => $meta['type'] === 'Event' ? array('@type' => 'Organization', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh')) : null,
        'totalTime' => $meta['type'] === 'Recipe' && $meta['totalTime'] ? $meta['totalTime'] : null,
        'recipeYield' => $meta['type'] === 'Recipe' ? $meta['yield'] : null,
        'recipeIngredient' => $meta['type'] === 'Recipe' ? $meta['ingredients'] : null,
        'recipeInstructions' => $meta['type'] === 'Recipe' ? array_map(function ($step) { return array('@type' => 'HowToStep', 'text' => $step); }, $meta['instructions']) : null,
        'nutrition' => $meta['type'] === 'Recipe' && $meta['nutrition'] ? array('@type' => 'NutritionInformation', 'description' => $meta['nutrition']) : null,
        'author' => $meta['type'] === 'Recipe' || $is_article ? array('@type' => 'Organization', 'name' => isset($meta['author']) ? $meta['author'] : 'LuxurEat', 'url' => luxureat_static_url('zh')) : null,
        'datePublished' => $is_article && !empty($meta['datePublished']) ? $meta['datePublished'] : null,
        'dateModified' => $is_article && !empty($meta['datePublished']) ? $meta['datePublished'] : null,
        'publisher' => $is_article || $meta['type'] === 'WebPage' ? array('@type' => 'Organization', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh'), 'logo' => array('@type' => 'ImageObject', 'url' => get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png')) : null,
    );
    $schema = array_filter($schema, function ($value) { return $value !== null; });
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    $content_type = isset($meta['contentType']) ? $meta['contentType'] : $meta['type'];
    $parent_slugs = array('Article' => 'blog', 'NewsArticle' => 'brand', 'Product' => 'product', 'Event' => 'brand', 'Recipe' => 'recipe');
    if (isset($parent_slugs[$content_type])) {
        $is_zh = $meta['lang'] === 'zh';
        $parent_route = ($is_zh ? 'zh/' : 'en/') . $parent_slugs[$content_type];
        $parent_names = array(
            'Article' => $is_zh ? '知识博客' : 'Knowledge Blog',
            'NewsArticle' => $is_zh ? '品牌新闻' : 'Brand News',
            'Product' => $is_zh ? '系列产品' : 'Products',
            'Event' => $is_zh ? '品牌新闻' : 'Brand News',
            'Recipe' => $is_zh ? '食谱艺术' : 'Recipes',
        );
        $breadcrumb = array(
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => array(
                array('@type' => 'ListItem', 'position' => 1, 'name' => $is_zh ? '首页' : 'Home', 'item' => luxureat_static_url($is_zh ? 'zh' : 'en')),
                array('@type' => 'ListItem', 'position' => 2, 'name' => $parent_names[$content_type], 'item' => luxureat_static_url($parent_route)),
                array('@type' => 'ListItem', 'position' => 3, 'name' => preg_replace('/ \\| LuxurEat$/', '', $meta['title']), 'item' => $canonical),
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode($breadcrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
remove_action('wp_head', 'rel_canonical');
add_action('wp_head', 'luxureat_static_seo_head', 1);

function luxureat_static_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    $path = luxureat_static_current_path();
    $path = $path === '' ? 'zh' : $path;
    $aliases = luxureat_static_aliases();
    $path = isset($aliases[$path]) ? $aliases[$path] : $path;

    wp_enqueue_style(
        'luxureat-integration',
        $theme_uri . '/integration.css',
        array(),
        filemtime($theme_dir . '/integration.css')
    );

    $catalog = array(
${catalog}
    );
    $assets_by_path = array(
${byPath}
    );

    foreach (isset($assets_by_path[$path]) ? $assets_by_path[$path] : array('core') as $handle) {
        if (!isset($catalog[$handle])) {
            continue;
        }
        $script = $catalog[$handle];
        $source = $theme_dir . '/' . $script['src'];
        if (!is_file($source)) {
            continue;
        }
        $dependencies = array_map(function ($dependency) {
            return 'luxureat-' . $dependency;
        }, $script['dependencies']);
        wp_enqueue_script(
            'luxureat-' . $handle,
            $theme_uri . '/' . $script['src'],
            $dependencies,
            filemtime($source),
            true
        );
        if ($handle === 'core') {
            wp_localize_script('luxureat-core', 'LuxureatNewsletter', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_newsletter'),
                'botChallenge' => luxureat_static_bot_challenge(),
            ));
        }
        if ($handle === 'brand' && in_array($path, array('zh/contact', 'en/contact'), true)) {
            wp_localize_script('luxureat-brand', 'LuxureatContact', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_contact'),
            ));
        }
    }
}
add_action('wp_enqueue_scripts', 'luxureat_static_assets');

function luxureat_static_trim_plugin_assets() {
    $path = luxureat_static_current_path();
    $aliases = luxureat_static_aliases();
    $path = isset($aliases[$path]) ? $aliases[$path] : ($path === '' ? 'zh' : $path);
    if (!isset(luxureat_static_routes()[$path])) {
        return;
    }

    foreach (array('woocommerce-layout', 'woocommerce-smallscreen', 'woocommerce-general', 'wc-blocks-style') as $handle) {
        wp_dequeue_style($handle);
    }
    foreach (array(
        'wc-jquery-blockui', 'wc-add-to-cart', 'wc-js-cookie', 'woocommerce',
        'woocommerce-analytics', 'woocommerce-analytics-client', 'sourcebuster-js',
        'wc-order-attribution', 'googlesitekit-events-provider-woocommerce',
        'jetpack-stats', 'jquery', 'jquery-core', 'jquery-migrate'
    ) as $handle) {
        wp_dequeue_script($handle);
    }
}
add_action('wp_enqueue_scripts', 'luxureat_static_trim_plugin_assets', 999);
add_action('wp_print_styles', 'luxureat_static_trim_plugin_assets', PHP_INT_MAX);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('wp_enqueue_scripts', 'wp_enqueue_emoji_styles');
add_filter('emoji_svg_url', '__return_false');

function luxureat_static_resource_hints($urls, $relation_type) {
    if ($relation_type !== 'preconnect') {
        return $urls;
    }
    return array_values(array_filter($urls, function ($url) {
        $href = is_array($url) && isset($url['href']) ? $url['href'] : $url;
        return !preg_match('#^(?:(?:https?:)?//)?[ic]0\\.wp\\.com/?$#i', (string) $href);
    }));
}
add_filter('wp_resource_hints', 'luxureat_static_resource_hints', PHP_INT_MAX, 2);

function luxureat_static_filter_plugin_style($html, $handle) {
    $path = luxureat_static_current_path();
    $aliases = luxureat_static_aliases();
    $path = isset($aliases[$path]) ? $aliases[$path] : ($path === '' ? 'zh' : $path);
    if (isset(luxureat_static_routes()[$path]) && in_array($handle, array('wc-blocks-style', 'woocommerce-inline'), true)) {
        return '';
    }
    return $html;
}
add_filter('style_loader_tag', 'luxureat_static_filter_plugin_style', PHP_INT_MAX, 2);

function luxureat_static_delay_analytics($tag, $handle, $src) {
    $path = luxureat_static_current_path();
    $aliases = luxureat_static_aliases();
    $path = isset($aliases[$path]) ? $aliases[$path] : ($path === '' ? 'zh' : $path);
    if ($handle === 'google_gtagjs' && isset(luxureat_static_routes()[$path])) {
        return '<script data-lux-analytics-src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'luxureat_static_delay_analytics', PHP_INT_MAX, 3);

function luxureat_static_bot_challenge() {
    $payload = time() . '.' . wp_generate_password(16, false, false);
    return $payload . '.' . hash_hmac('sha256', $payload, wp_salt('nonce'));
}

function luxureat_static_verify_bot_challenge() {
    $token = isset($_POST['bot_challenge']) ? sanitize_text_field(wp_unslash($_POST['bot_challenge'])) : '';
    $nonce = isset($_POST['bot_nonce']) ? sanitize_text_field(wp_unslash($_POST['bot_nonce'])) : '';
    $proof = isset($_POST['bot_proof']) ? sanitize_text_field(wp_unslash($_POST['bot_proof'])) : '';
    $parts = explode('.', $token);
    if (
        count($parts) !== 3 ||
        !ctype_digit($parts[0]) ||
        abs(time() - (int) $parts[0]) > 15 * MINUTE_IN_SECONDS ||
        !hash_equals(hash_hmac('sha256', $parts[0] . '.' . $parts[1], wp_salt('nonce')), $parts[2]) ||
        !preg_match('/^[a-f0-9]{32}$/', $nonce) ||
        !ctype_digit($proof) ||
        (int) $proof > 1000000 ||
        substr(hash('sha256', $token . ':' . $nonce . ':' . $proof), 0, 3) !== '000'
    ) {
        return false;
    }

    $replay_key = 'lux_bot_' . hash('sha256', $token . ':' . $nonce . ':' . $proof);
    if (get_transient($replay_key)) {
        return false;
    }
    set_transient($replay_key, 1, 15 * MINUTE_IN_SECONDS);
    return true;
}




function luxureat_static_mailpoet_subscribe($email) {
    if (!class_exists('\\MailPoet\\API\\API')) {
        return new WP_Error('mailpoet_unavailable');
    }

    try {
        $api = \\MailPoet\\API\\API::MP('v1');
        $lists = array_values(array_filter($api->getLists(), function ($list) {
            return isset($list['type']) && $list['type'] === 'default' && empty($list['deleted_at']);
        }));
        if (!$lists) {
            return new WP_Error('mailpoet_list_missing');
        }

        $preferred = array_values(array_filter($lists, function ($list) {
            return stripos($list['name'], 'LuxurEat') !== false;
        }));
        $list_id = (int) ($preferred ? $preferred[0]['id'] : $lists[0]['id']);
        $options = array('send_confirmation_email' => true, 'schedule_welcome_email' => true);
        try {
            $subscriber = $api->getSubscriber($email);
            $already_subscribed = isset($subscriber['status']) && $subscriber['status'] === 'subscribed';
            $api->subscribeToLists($subscriber['id'], array($list_id), $options);
            if ($already_subscribed) {
                return 'already_subscribed';
            }
        } catch (\\MailPoet\\API\\MP\\v1\\APIException $error) {
            if ((int) $error->getCode() !== 4) {
                throw $error;
            }
            $api->addSubscriber(array('email' => $email), array($list_id), $options);
        }
        return 'confirmation_sent';
    } catch (\\Throwable $error) {
        return new WP_Error('mailpoet_failed');
    }
}

function luxureat_static_newsletter_ajax() {
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_newsletter')) {
        wp_send_json_error(array('message' => "请刷新页面后重试。\nPlease refresh the page and try again."), 403);
    }
    if (!empty($_POST['company']) || !luxureat_static_verify_bot_challenge()) {
        wp_send_json_error(array('message' => "安全验证失败，请刷新页面后重试。\nSecurity verification failed. Please refresh the page and try again."), 403);
    }
    $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
    if (!is_email($email)) {
        wp_send_json_error(array('message' => "请输入正确的邮箱格式。\nPlease enter a valid email address."), 400);
    }
    $remote_address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    $rate_key = 'lux_newsletter_' . hash_hmac('sha256', strtolower($email) . '|' . $remote_address, wp_salt('nonce'));
    if (get_transient($rate_key)) {
        wp_send_json_error(array('message' => "确认邮件已经发送，请检查收件箱或垃圾邮件。\nA confirmation email has already been sent. Please check your inbox or spam folder."), 429);
    }
    $subscribed = luxureat_static_mailpoet_subscribe($email);
    if (is_wp_error($subscribed)) {
        wp_send_json_error(array('message' => "订阅失败，请稍后再试。\nSubscription failed. Please try again later."), 503);
    }
    set_transient($rate_key, '1', 10 * MINUTE_IN_SECONDS);
    wp_send_json_success(array('state' => 'confirmation_sent', 'message' => "如果该邮箱尚未订阅，确认邮件将会发送。请检查收件箱或垃圾邮件。\nIf this email is not already subscribed, a confirmation message will be sent. Please check your inbox or spam folder."));
}
add_action('wp_ajax_nopriv_luxureat_newsletter', 'luxureat_static_newsletter_ajax');
add_action('wp_ajax_luxureat_newsletter', 'luxureat_static_newsletter_ajax');


function luxureat_static_contact_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_contact')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (!empty($_POST['website'])) {
        wp_send_json_error(array('message' => $message('安全验证失败，请刷新页面后重试。', 'Security verification failed. Please refresh the page and try again.')), 403);
    }

    $name = isset($_POST['name']) ? trim(sanitize_text_field(wp_unslash($_POST['name']))) : '';
    $company = isset($_POST['company']) ? trim(sanitize_text_field(wp_unslash($_POST['company']))) : '';
    $product_industry = isset($_POST['product_industry']) ? trim(sanitize_text_field(wp_unslash($_POST['product_industry']))) : '';
    $phone = isset($_POST['phone']) ? trim(sanitize_text_field(wp_unslash($_POST['phone']))) : '';
    $raw_email = isset($_POST['email']) ? trim((string) wp_unslash($_POST['email'])) : '';
    $email = sanitize_email($raw_email);
    $inquiry_type = isset($_POST['inquiry_type']) ? trim(sanitize_text_field(wp_unslash($_POST['inquiry_type']))) : '';
    $content = isset($_POST['message']) ? trim(sanitize_textarea_field(wp_unslash($_POST['message']))) : '';
    $inquiry_labels = array(
        '产品与采购咨询' => 'Richieste su prodotti e acquisti',
        '经销及渠道合作' => 'Distribuzione e partnership commerciali',
        '酒店餐饮与专业供应' => 'Fornitura per hotel, ristorazione e professionisti',
        '自有品牌与私人定制' => 'Private label e personalizzazione su misura',
        '企业礼赠与项目合作' => 'Regali aziendali e collaborazioni di progetto',
        '品牌、媒体合作' => 'Collaborazioni con brand e media',
        '其他' => 'Altro',
        'Product & Purchasing Enquiries' => 'Richieste su prodotti e acquisti',
        'Distribution & Channel Partnerships' => 'Distribuzione e partnership commerciali',
        'Hospitality, Catering & Professional Supply' => 'Fornitura per hotel, ristorazione e professionisti',
        'Private Label & Bespoke Customisation' => 'Private label e personalizzazione su misura',
        'Corporate Gifting & Project Partnerships' => 'Regali aziendali e collaborazioni di progetto',
        'Brand & Media Partnerships' => 'Collaborazioni con brand e media',
        'Other' => 'Altro',
    );
    if ($name === '' || $raw_email === '' || $content === '' || !isset($inquiry_labels[$inquiry_type])) {
        wp_send_json_error(array('message' => $message('请填写所有必填信息。', 'Please complete all required fields.')), 400);
    }
    if (strlen($name) > 240 || strlen($company) > 360 || strlen($product_industry) > 360 || strlen($phone) > 120 || strlen($content) > 12000 || !is_email($email)) {
        wp_send_json_error(array('message' => $message('请检查所填信息后重试。', 'Please check the information and try again.')), 400);
    }

    $remote_address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    $rate_key = 'lux_contact_' . hash_hmac('sha256', $remote_address, wp_salt('nonce'));
    if (get_transient($rate_key)) {
        wp_send_json_error(array('message' => $message('信息已提交，请稍后再试。', 'Your message was submitted. Please wait before trying again.')), 429);
    }

    $subject = $name . ' + ' . $inquiry_labels[$inquiry_type];
    $body = "Nome: " . $name . "\n"
        . "Azienda: " . ($company ?: 'Non fornito') . "\n"
        . "Prodotto / Settore: " . ($product_industry ?: 'Non fornito') . "\n"
        . "Telefono / WeChat: " . ($phone ?: 'Non fornito') . "\n"
        . "E-mail: " . $email . "\n\n"
        . "Messaggio:\n" . $content;
    $headers = array('Reply-To: ' . $name . ' <' . $email . '>');
    if (!wp_mail('roberto@ugolinigroup.com', $subject, $body, $headers)) {
        wp_send_json_error(array('message' => $message('暂时无法发送，请稍后再试。', 'Your message could not be sent. Please try again later.')), 500);
    }
    set_transient($rate_key, 1, 30);
    wp_send_json_success(array('message' => $message('信息已发送，我们会尽快与您联系。', 'Your message has been sent. We will be in touch soon.')));
}
add_action('wp_ajax_nopriv_luxureat_contact', 'luxureat_static_contact_ajax');
add_action('wp_ajax_luxureat_contact', 'luxureat_static_contact_ajax');



function luxureat_static_defer_scripts($tag, $handle) {
    if (strpos($handle, 'luxureat-') !== 0 || strpos($tag, ' defer') !== false) {
        return $tag;
    }

    return str_replace(' src=', ' defer src=', $tag);
}
add_filter('script_loader_tag', 'luxureat_static_defer_scripts', 10, 2);

function luxureat_static_cache_headers($headers) {
    $headers['Content-Security-Policy'] = "frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests";
    $headers['Content-Security-Policy-Report-Only'] = "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.openstreetmap.org https://*.wp.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.wp.com; frame-src 'self' https://trufflebar.com https://*.google.com; media-src 'self'; upgrade-insecure-requests";
    $headers['X-Frame-Options'] = 'SAMEORIGIN';
    $headers['X-Content-Type-Options'] = 'nosniff';
    $headers['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    $headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()';
    $headers['Cross-Origin-Opener-Policy'] = 'same-origin-allow-popups';
    if (!is_admin() && !is_user_logged_in()) {
        $headers['Cache-Control'] = 'public, max-age=300, stale-while-revalidate=86400';
    }

    return $headers;
}
add_filter('wp_headers', 'luxureat_static_cache_headers');

function luxureat_static_hide_server_version() {
    header_remove('X-Powered-By');
    if (!is_admin() && !is_user_logged_in()) {
        header('Cache-Control: public, max-age=300, s-maxage=1800, stale-while-revalidate=86400', true);
    }
}
add_action('send_headers', 'luxureat_static_hide_server_version', PHP_INT_MAX);
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
add_filter('the_generator', '__return_empty_string');

function luxureat_static_remove_xmlrpc_pingbacks($methods) {
    foreach (array('pingback.ping', 'pingback.extensions.getPingbacks') as $method) {
        unset($methods[$method]);
    }
    return $methods;
}
add_filter('xmlrpc_methods', 'luxureat_static_remove_xmlrpc_pingbacks', 999);

function luxureat_static_restrict_xmlrpc_request() {
    if (defined('XMLRPC_REQUEST') && XMLRPC_REQUEST && (!isset($_GET['for']) || $_GET['for'] !== 'jetpack')) {
        status_header(403);
        nocache_headers();
        exit('XML-RPC is available only for Jetpack.');
    }
}
add_action('init', 'luxureat_static_restrict_xmlrpc_request', 0);

function luxureat_static_cookie_samesite_headers() {
    $cookies = array_values(array_filter(headers_list(), function ($header) {
        return stripos($header, 'Set-Cookie:') === 0;
    }));
    if (!$cookies) {
        return;
    }

    header_remove('Set-Cookie');
    foreach ($cookies as $cookie) {
        if (
            stripos($cookie, 'Set-Cookie: wordpress_') === 0 &&
            stripos($cookie, 'samesite=') === false
        ) {
            $cookie .= '; SameSite=Lax';
        }
        header($cookie, false);
    }
}

function luxureat_static_register_cookie_header_callback() {
    if (function_exists('header_register_callback')) {
        header_register_callback('luxureat_static_cookie_samesite_headers');
    }
}
add_action('init', 'luxureat_static_register_cookie_header_callback', 0);

function luxureat_static_register_routes() {
    foreach (array_keys(luxureat_static_routes()) as $route) {
        add_rewrite_rule('^' . preg_quote($route, '/') . '/?$', 'index.php?luxureat_path=' . $route, 'top');
    }

    foreach (array_keys(luxureat_static_aliases()) as $alias) {
        add_rewrite_rule('^' . preg_quote($alias, '/') . '/?$', 'index.php?luxureat_path=' . $alias, 'top');
    }

    add_rewrite_rule('^$', 'index.php?luxureat_path=__home', 'top');
}
add_action('init', 'luxureat_static_register_routes');

function luxureat_static_query_vars($vars) {
    $vars[] = 'luxureat_path';
    return $vars;
}
add_filter('query_vars', 'luxureat_static_query_vars');

function luxureat_static_template_include($template) {
    $path = luxureat_static_current_path();
    $routes = luxureat_static_routes();
    $aliases = luxureat_static_aliases();

    if ($path === '' || $path === '__home' || isset($routes[$path]) || isset($aliases[$path])) {
        return get_template_directory() . '/index.php';
    }

    return $template;
}
add_filter('template_include', 'luxureat_static_template_include');

function luxureat_static_flush_rewrites() {
    luxureat_static_register_routes();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'luxureat_static_flush_rewrites');
add_action('switch_theme', 'flush_rewrite_rules');

function luxureat_static_refresh_changed_routes() {
    $route_version = md5(wp_json_encode(array(luxureat_static_routes(), luxureat_static_aliases(), '${escapePhpString(buildIdentifier)}')));
    if (get_option('luxureat_static_route_version') === $route_version) {
        return;
    }
    flush_rewrite_rules(false);
    if (function_exists('wp_cache_clear_cache')) {
        wp_cache_clear_cache();
    }
    update_option('luxureat_static_route_version', $route_version, false);
}
add_action('init', 'luxureat_static_refresh_changed_routes', 20);
`;
}

function indexPhp() {
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

$routes = require get_template_directory() . '/routes.php';
$path = luxureat_static_current_path();
$request_path = $path;
$aliases = luxureat_static_aliases();

if ($path === '' || $path === '__home') {
    $path = 'zh';
}

if (isset($aliases[$path])) {
    $target_path = $aliases[$path];
    $pretty_paths = luxureat_static_pretty_paths();
    $canonical_request_path = isset($pretty_paths[$target_path]) ? trim($pretty_paths[$target_path], '/') : '';

    if ($canonical_request_path === $path) {
        $path = $target_path;
    } else {
        wp_safe_redirect(luxureat_static_url($target_path), 301);
        exit;
    }
}

if ($request_path === $path && isset($routes[$path])) {
    $pretty_paths = luxureat_static_pretty_paths();
    $canonical_request_path = isset($pretty_paths[$path]) ? trim($pretty_paths[$path], '/') : $path;
    if ($canonical_request_path !== $request_path) {
        wp_safe_redirect(luxureat_static_url($path), 301);
        exit;
    }
}

if (!isset($routes[$path])) {
    status_header(404);
    nocache_headers();
    ?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php esc_html_e('Page not found', 'luxureat-static'); ?></title>
    <?php wp_head(); ?>
</head>
<body style="margin:0;background:#101010;color:#e5e2e1;font-family:Spectral;display:grid;min-height:100vh;place-items:center;text-align:center;padding:24px;">
    <main>
        <p style="color:#9df5ec;letter-spacing:.2em;text-transform:uppercase;font-size:12px;">LuxurEat</p>
        <h1 style="font-family:'Nyght Serif';font-weight:400;"><?php esc_html_e('Page not found', 'luxureat-static'); ?></h1>
        <p><a style="color:#e9c349;" href="<?php echo esc_url(luxureat_static_url('zh')); ?>"><?php esc_html_e('Return to home', 'luxureat-static'); ?></a></p>
    </main>
    <?php wp_footer(); ?>
</body>
</html><?php
    exit;
}

status_header(200);
include get_template_directory() . '/' . $routes[$path];
`;
}

function pagePhp() {
  return `<?php
if (!defined('ABSPATH')) {
    exit;
}

status_header(200);
$page_language = determine_locale() === 'en_US' ? 'en' : 'zh';
$is_zh_page = $page_language === 'zh';
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class('lux-wp-page-shell'); ?>>
<?php wp_body_open(); ?>
<header class="lux-wp-page-header">
    <a class="lux-wp-page-brand" href="<?php echo esc_url(home_url('/')); ?>">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png'); ?>" alt="LuxurEat">
        <span>LuxurEat <i aria-hidden="true">｜</i> <small>露意膳</small></span>
    </a>
    <nav class="lux-wp-page-actions" aria-label="<?php echo esc_attr($is_zh_page ? '页面导航' : 'Page navigation'); ?>">
        <a class="lux-wp-page-home" href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($is_zh_page ? '返回首页' : 'Return to home'); ?></a>
    </nav>
</header>
<main class="lux-wp-page-main">
<?php while (have_posts()) : the_post(); ?>
    <header class="lux-wp-page-title">
        <h1><?php echo esc_html(get_the_title()); ?></h1>
    </header>
    <div class="lux-wp-page-content"><?php the_content(); ?></div>
<?php endwhile; ?>
</main>
<?php wp_footer(); ?>
</body>
</html>
`;
}

function readme() {
  return `# LuxurEat Static WordPress Theme

This package wraps the static bilingual LuxurEat website source from https://github.com/errpenk/luxureat-website-source as a WordPress theme.

## Install

1. Upload \`luxureat-static-theme.zip\` in WordPress: Appearance -> Themes -> Add New -> Upload Theme.
2. Activate **LuxurEat Static**.
3. Open Settings -> Permalinks once and save if routes do not appear immediately.

## Routes

- \`/\` serves the Chinese home page.
- Default Chinese routes use root-level pretty URLs such as \`/product/\`, \`/recipe/\`, and \`/contact/\`.
- English routes use \`/en/\`, \`/en/product/\`, and the rest of the \`/en/.../\` namespace.

## Notes

- The current version prioritizes visual fidelity and static routing.
- Local assets and domain scripts are loaded through WordPress theme APIs.
- Products, events, journal, and brand content each have dedicated data, script, and media locations under \`assets/\`.
`;
}

async function build() {
  ensureSource();
  const articleImageDimensions = await buildArticleImageDimensions();

  fs.rmSync(themeDir, { recursive: true, force: true });
  fs.rmSync(zipFile, { force: true });
  mkdirp(themeDir);

  fs.copyFileSync(path.join(sourceDir, 'integration.css'), path.join(themeDir, 'integration.css'));
  fs.copyFileSync(path.join(sourceDir, '.htaccess'), path.join(themeDir, '.htaccess'));
  fs.copyFileSync(path.join(sourceDir, 'robots.txt'), path.join(themeDir, 'robots.txt'));
  fs.copyFileSync(path.join(sourceDir, 'llms.txt'), path.join(themeDir, 'llms.txt'));
  fs.copyFileSync(path.join(sourceDir, 'google053137c136af2773.html'), path.join(themeDir, 'google053137c136af2773.html'));
  fs.copyFileSync(path.join(sourceDir, 'sogousiteverification.txt'), path.join(themeDir, 'sogousiteverification.txt'));
  execFileSync(process.execPath, [path.join(sourceDir, 'tools/generate-sitemap.mjs'), path.join(themeDir, 'sitemap.xml')]);
  copyDir(path.join(sourceDir, 'assets'), path.join(themeDir, 'assets'));
  const leafletTargetDir = path.join(themeDir, 'assets', 'vendor', 'leaflet');
  mkdirp(leafletTargetDir);
  fs.copyFileSync(path.join(leafletDistDir, 'leaflet.css'), path.join(leafletTargetDir, 'leaflet.css'));
  fs.copyFileSync(path.join(leafletDistDir, 'leaflet.js'), path.join(leafletTargetDir, 'leaflet.js'));
  copyDir(path.join(leafletDistDir, 'images'), path.join(leafletTargetDir, 'images'));

  const screenshotSource = path.join(sourceDir, 'qa/zh-home-desktop.png');
  await sharp(fs.existsSync(screenshotSource) ? screenshotSource : path.join(sourceDir, 'assets/media/brand/luxureat-logo.png'))
    .resize({ width: 1200, height: 900, fit: 'cover' })
    .png({ compressionLevel: 9, palette: true, quality: 85 })
    .toFile(path.join(themeDir, 'screenshot.png'));

  write(path.join(themeDir, 'style.css'), styleCss());
  write(path.join(themeDir, 'functions.php'), functionsPhp());
  write(path.join(themeDir, 'index.php'), indexPhp());
  write(path.join(themeDir, 'page.php'), pagePhp());
  write(path.join(themeDir, 'routes.php'), buildRoutesPhp());
  write(path.join(themeDir, 'README.md'), readme());

  for (const [lang, slug, htmlFile] of pageInputs) {
    const outFile = slug === 'index'
      ? path.join(themeDir, 'pages', lang, 'index.php')
      : path.join(themeDir, 'pages', lang, `${slug}.php`);
    write(outFile, convertHtml(htmlFile, lang));
  }
  for (const article of articleInputs) {
    write(path.join(themeDir, 'pages', article.lang, 'blog', `${article.slug}.php`), articlePageHtml(article, articleImageDimensions));
  }
  for (const product of productInputs) {
    write(path.join(themeDir, 'pages', product.lang, 'product', `${product.id}.php`), productPageHtml(product, articleImageDimensions));
  }
  for (const recipe of recipeInputs) {
    write(path.join(themeDir, 'pages', recipe.lang, 'recipe', `${recipe.slug}.php`), recipePageHtml(recipe, articleImageDimensions));
  }
  for (const item of brandNewsInputs) {
    write(path.join(themeDir, 'pages', item.lang, 'news', `${item.id}.php`), brandNewsPageHtml(item, articleImageDimensions));
  }

  execFileSync('zip', ['-qr', zipFile, 'luxureat-static', '-x', '*.DS_Store', '__MACOSX/*'], {
    cwd: outputRoot,
    stdio: 'inherit',
  });

  console.log(`Theme written to ${themeDir}`);
  console.log(`Theme zip written to ${zipFile}`);
}

await build();
