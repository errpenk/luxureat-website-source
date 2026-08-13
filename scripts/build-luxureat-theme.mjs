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
const productRoute = (product) => `${product.lang === 'zh' ? '' : 'en/'}product/${product.id}`;
const eventRoute = (event) => `${event.lang === 'zh' ? '' : 'en/'}events/${event.id}`;
const recipeRoute = (recipe) => `${recipe.lang === 'zh' ? '' : 'en/'}recipe/${recipe.slug}`;

function ensureSource() {
  const requiredFiles = ['README.md', '.htaccess', 'integration.css', 'robots.txt', 'llms.txt', 'google053137c136af2773.html', 'tools/generate-sitemap.mjs', 'assets/media/brand/luxureat-logo.png', 'assets/media/brand/wechat-qr.webp', ...new Set(Object.values(scripts).map(({ src }) => src))];
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
  ]).concat(productInputs.map((product) => product.image), eventInputs.map((event) => event.previewImage || event.image), recipeInputs.map((recipe) => recipe.image)).filter(Boolean).map(articleAsset));
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

function eventStartDate(event) {
  const match = event.zh.date.match(/(\d{4})年(\d{1,2})月(\d{1,2})/);
  return match ? `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}` : event.endDate;
}

function eventPageHtml(event, imageDimensions) {
  const alternate = eventInputs.find((candidate) => candidate.lang !== event.lang && candidate.id === event.id);
  const image = articleAsset(event.previewImage || event.image);
  const labels = event.lang === 'zh' ? { back: '返回品牌新闻' } : { back: 'Back to Brand News' };
  const sections = (event.copy.sections || []).map(([heading, copy]) => `<section class="lux-reader-section"><h2>${escapeHtml(heading)}</h2><p>${escapeHtml(copy)}</p></section>`).join('');
  const body = `<main class="lux-article-page">${breadcrumbHtml(event.lang, 'brand.html', event.lang === 'zh' ? '品牌新闻' : 'Brand News', event.copy.articleTitle)}<article class="lux-reader-layout lux-event-seo-page"><div class="lux-reader-rule"></div><section class="lux-reader-hero"><div class="lux-reader-hero-copy"><div class="lux-reader-meta-grid"><span>${escapeHtml(event.copy.category)}</span><span>${escapeHtml(event.copy.date)}</span><span>${escapeHtml(event.copy.city)}</span></div><h1 id="lux-reader-title">${escapeHtml(event.copy.articleTitle)}</h1><p class="lux-reader-summary">${escapeHtml(event.copy.intro)}</p></div><figure class="lux-reader-cover"><img${imageDimensions.get(image) || ''} loading="eager" fetchpriority="high" decoding="async" src="${escapeHtml(image)}" alt="${escapeHtml(event.copy.posterAlt || event.copy.articleTitle)}"></figure></section><section class="lux-reader-content"><aside class="lux-reader-aside"><a href="brand.html">${labels.back}</a><span>${escapeHtml(event.copy.location)}</span></aside><div class="lux-reader-copy">${sections}${event.copy.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(event.copy.quote)}</blockquote>` : ''}</div></section></article></main>`;
  return detailPageHtml({ lang: event.lang, pageKey: 'news', title: event.copy.articleTitle, description: event.copy.intro, route: eventRoute(event), alternateRoute: eventRoute(alternate || event), body });
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
  for (const event of eventInputs) {
    lines.push(`    '${eventRoute(event)}' => 'pages/${event.lang}/events/${event.id}.php',`);
  }
  for (const recipe of recipeInputs) {
    lines.push(`    '${recipeRoute(recipe)}' => 'pages/${recipe.lang}/recipe/${recipe.slug}.php',`);
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
    return `        '${escapePhpString(page.route)}' => ${phpList(page.key === 'home' ? ['core'] : page.scripts)},`;
  }), ...articleInputs.map((article) => `        '${articleRoute(article)}' => array('core'),`), ...productInputs.map((product) => `        '${productRoute(product)}' => array('core'),`), ...eventInputs.map((event) => `        '${eventRoute(event)}' => array('core'),`), ...recipeInputs.map((recipe) => `        '${recipeRoute(recipe)}' => array('core'),`)].join('\n');
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
    return `        '${articleRoute(article)}' => array('title' => '${escapePhpString(article.title)} | LuxurEat', 'description' => '${escapePhpString(article.intro)}', 'lang' => '${article.lang}', 'alternate' => '${alternate ? articleRoute(alternate) : articleRoute(article)}', 'indexable' => true, 'type' => 'Article', 'image' => '${escapePhpString(image)}'),`;
  });
  const productRows = productInputs.map((product) => {
    const alternate = productInputs.find((candidate) => candidate.lang !== product.lang && candidate.id === product.id);
    const image = String(product.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    return `        '${productRoute(product)}' => array('title' => '${escapePhpString(product.title)} | LuxurEat', 'description' => '${escapePhpString(product.cardDesc || product.desc)}', 'lang' => '${product.lang}', 'alternate' => '${productRoute(alternate || product)}', 'indexable' => true, 'type' => 'Product', 'image' => '${escapePhpString(image)}', 'sku' => '${escapePhpString(product.sku)}', 'category' => '${escapePhpString(product.eyebrow)}'),`;
  });
  const eventRows = eventInputs.map((event) => {
    const alternate = eventInputs.find((candidate) => candidate.lang !== event.lang && candidate.id === event.id);
    const image = String(event.previewImage || event.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    return `        '${eventRoute(event)}' => array('title' => '${escapePhpString(event.copy.articleTitle)} | LuxurEat', 'description' => '${escapePhpString(event.copy.intro)}', 'lang' => '${event.lang}', 'alternate' => '${eventRoute(alternate || event)}', 'indexable' => true, 'type' => 'Event', 'image' => '${escapePhpString(image)}', 'startDate' => '${eventStartDate(event)}', 'endDate' => '${escapePhpString(event.endDate)}', 'location' => '${escapePhpString(event.copy.location)}'),`;
  });
  const recipeRows = recipeInputs.map((article) => {
    const alternate = recipeInputs.find((candidate) => candidate.lang !== article.lang && candidate.slug === article.slug);
    const image = String(article.image || '').split('/assets/')[1] || 'media/brand/home-hero-truffle-poster.webp';
    const minutes = String(article.recipe.time).match(/\d+/)?.[0];
    const nutrition = (article.recipe.nutrition || []).map(([label, value]) => `${label}: ${value}`).join('; ');
    return `        '${recipeRoute(article)}' => array('title' => '${escapePhpString(article.title)} | LuxurEat', 'description' => '${escapePhpString(article.intro)}', 'lang' => '${article.lang}', 'alternate' => '${recipeRoute(alternate || article)}', 'indexable' => true, 'type' => 'Recipe', 'image' => '${escapePhpString(image)}', 'category' => '${escapePhpString(article.eyebrow)}', 'totalTime' => '${minutes ? `PT${minutes}M` : ''}', 'yield' => '${escapePhpString(article.recipe.servings)}', 'ingredients' => ${phpList(article.recipe.ingredients)}, 'instructions' => ${phpList(article.recipe.steps)}, 'nutrition' => '${escapePhpString(nutrition)}'),`;
  });
  return [...pageRows, ...articleRows, ...productRows, ...eventRows, ...recipeRows].join('\n');
}

function functionsPhp() {
  const { catalog, byPath } = buildAssetCatalogPhp();
  const seoCatalog = buildSeoCatalogPhp();
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
        'certification' => 'zh/certification',
        'certification.html' => 'zh/certification',
        'contact' => 'zh/contact',
        'contact.html' => 'zh/contact',
        'bag' => 'zh/bag',
        'bag.html' => 'zh/bag',
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
        'zh/contact' => '/contact/',
        'zh/bag' => '/bag/',
        'en' => '/en/',
        'en/product' => '/en/product/',
        'en/recipe' => '/en/recipe/',
        'en/about-us' => '/en/about-us/',
        'en/brand' => '/en/brand/',
        'en/blog' => '/en/blog/',
        'en/new' => '/en/new/',
        'en/cooperation' => '/en/cooperation/',
        'en/certification' => '/en/certification/',
        'en/contact' => '/en/contact/',
        'en/bag' => '/en/bag/',
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

    if (in_array($key, array('gclid', 'dclid', 'fbclid', 'msclkid', '_gl', 'wc-ajax', 'add-to-cart', 'quantity', 'variation_id', '_wpnonce'), true)) {
        return true;
    }

    if (in_array($route, array('zh', 'en'), true) && in_array($key, array('account', 'luxureat_verify', 'user', 'token'), true)) {
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

function luxureat_static_is_utility_page() {
    $path = luxureat_static_current_path();
    $aliases = luxureat_static_aliases();
    $route = isset($aliases[$path]) ? $aliases[$path] : $path;

    return in_array($route, array('zh/bag', 'en/bag'), true)
        || (function_exists('is_cart') && is_cart())
        || (function_exists('is_checkout') && is_checkout())
        || (function_exists('is_account_page') && is_account_page());
}

function luxureat_static_utility_noindex_header() {
    if (luxureat_static_is_utility_page()) {
        header('X-Robots-Tag: noindex, follow', true);
    }
}
add_action('template_redirect', 'luxureat_static_utility_noindex_header', -50);

function luxureat_static_utility_robots($robots) {
    if (luxureat_static_is_utility_page()) {
        $robots['noindex'] = true;
        $robots['follow'] = true;
    }
    return $robots;
}
add_filter('wp_robots', 'luxureat_static_utility_robots', 999);

function luxureat_static_search_metadata_endpoint() {
    $request_uri = isset($_SERVER['REQUEST_URI']) ? wp_unslash($_SERVER['REQUEST_URI']) : '';
    $request_path = parse_url($request_uri, PHP_URL_PATH);
    $files = array(
        '/google053137c136af2773.html' => array('google053137c136af2773.html', 'text/html; charset=UTF-8'),
        '/robots.txt' => array('robots.txt', 'text/plain; charset=UTF-8'),
        '/llms.txt' => array('llms.txt', 'text/plain; charset=UTF-8'),
        '/sitemap.xml' => array('sitemap.xml', 'application/xml; charset=UTF-8'),
    );

    if (!isset($files[$request_path])) {
        return;
    }

    $file = get_template_directory() . '/' . $files[$request_path][0];
    if (!is_file($file) || !is_readable($file)) {
        return;
    }

    status_header(200);
    nocache_headers();
    header_remove('X-Robots-Tag');
    header_remove('X-Powered-By');
    header('Content-Type: ' . $files[$request_path][1], true);
    header('Cache-Control: public, max-age=3600, stale-while-revalidate=86400', true);
    header('X-Content-Type-Options: nosniff', true);
    if (!isset($_SERVER['REQUEST_METHOD']) || strtoupper((string) $_SERVER['REQUEST_METHOD']) !== 'HEAD') {
        readfile($file);
    }
    exit;
}
add_action('init', 'luxureat_static_search_metadata_endpoint', -100);

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
    if (empty($meta['indexable'])) {
        echo '<meta name="robots" content="noindex,follow">' . "\n";
    }
    echo '<link rel="canonical" href="' . esc_url($canonical) . '">' . "\n";
    echo '<link rel="alternate" hreflang="zh-CN" href="' . esc_url(luxureat_static_url($zh_route)) . '">' . "\n";
    if ($alternate) {
        $en_route = $meta['lang'] === 'en' ? $route : $meta['alternate'];
        echo '<link rel="alternate" hreflang="en" href="' . esc_url(luxureat_static_url($en_route)) . '">' . "\n";
    }
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url(luxureat_static_url($zh_route)) . '">' . "\n";
    $og_type = in_array($meta['type'], array('Article', 'Product'), true) ? strtolower($meta['type']) : 'website';
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
        'headline' => $meta['type'] === 'Article' ? $meta['title'] : null,
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
        'location' => $meta['type'] === 'Event' ? array('@type' => 'Place', 'name' => $meta['location']) : null,
        'organizer' => $meta['type'] === 'Event' ? array('@type' => 'Organization', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh')) : null,
        'totalTime' => $meta['type'] === 'Recipe' && $meta['totalTime'] ? $meta['totalTime'] : null,
        'recipeYield' => $meta['type'] === 'Recipe' ? $meta['yield'] : null,
        'recipeIngredient' => $meta['type'] === 'Recipe' ? $meta['ingredients'] : null,
        'recipeInstructions' => $meta['type'] === 'Recipe' ? array_map(function ($step) { return array('@type' => 'HowToStep', 'text' => $step); }, $meta['instructions']) : null,
        'nutrition' => $meta['type'] === 'Recipe' && $meta['nutrition'] ? array('@type' => 'NutritionInformation', 'description' => $meta['nutrition']) : null,
        'author' => $meta['type'] === 'Recipe' ? array('@type' => 'Organization', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh')) : null,
        'publisher' => in_array($meta['type'], array('Article', 'WebPage'), true) ? array('@type' => 'Organization', 'name' => 'LuxurEat', 'url' => luxureat_static_url('zh'), 'logo' => array('@type' => 'ImageObject', 'url' => get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png')) : null,
    );
    $schema = array_filter($schema, function ($value) { return $value !== null; });
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    $parent_slugs = array('Article' => 'blog', 'Product' => 'product', 'Event' => 'brand', 'Recipe' => 'recipe');
    if (isset($parent_slugs[$meta['type']])) {
        $is_zh = $meta['lang'] === 'zh';
        $parent_route = ($is_zh ? 'zh/' : 'en/') . $parent_slugs[$meta['type']];
        $parent_names = array(
            'Article' => $is_zh ? '知识博客' : 'Knowledge Blog',
            'Product' => $is_zh ? '系列产品' : 'Products',
            'Event' => $is_zh ? '品牌新闻' : 'Brand News',
            'Recipe' => $is_zh ? '食谱艺术' : 'Recipes',
        );
        $breadcrumb = array(
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => array(
                array('@type' => 'ListItem', 'position' => 1, 'name' => $is_zh ? '首页' : 'Home', 'item' => luxureat_static_url($is_zh ? 'zh' : 'en')),
                array('@type' => 'ListItem', 'position' => 2, 'name' => $parent_names[$meta['type']], 'item' => luxureat_static_url($parent_route)),
                array('@type' => 'ListItem', 'position' => 3, 'name' => preg_replace('/ \\| LuxurEat$/', '', $meta['title']), 'item' => $canonical),
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode($breadcrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
remove_action('wp_head', 'rel_canonical');
add_action('wp_head', 'luxureat_static_seo_head', 1);

function luxureat_static_woo_catalog() {
    if (!function_exists('wc_get_product_id_by_sku')) {
        return array();
    }

    $cached = get_transient('luxureat_static_woo_catalog');
    if (is_array($cached)) {
        return $cached;
    }

    $catalog = array();
    foreach (array('imperial-beluga-30g', 'royal-oscetra-30g', 'mother-of-pearl-spoons', 'champagne', 'ice-server') as $sku) {
        $product_id = wc_get_product_id_by_sku($sku);
        $product = $product_id ? wc_get_product($product_id) : false;
        if (!$product) {
            continue;
        }

        $image_id = $product->get_image_id();
        $gallery = array_values(array_filter(array_map(function ($attachment_id) {
            return wp_get_attachment_image_url($attachment_id, 'full');
        }, $product->get_gallery_image_ids())));
        $stock_quantity = $product->managing_stock() ? $product->get_stock_quantity() : null;
        $max_quantity = $product->is_sold_individually()
            ? 1
            : ($stock_quantity !== null && !$product->backorders_allowed() ? max(0, (int) $stock_quantity) : 99);

        $catalog[$sku] = array(
            'id' => $product->get_id(),
            'sku' => $sku,
            'name' => $product->get_name(),
            'description' => wp_strip_all_tags($product->get_short_description() ?: $product->get_description()),
            'price' => (float) $product->get_price(),
            'currency' => html_entity_decode(get_woocommerce_currency_symbol(), ENT_QUOTES, 'UTF-8'),
            'image' => $image_id ? wp_get_attachment_image_url($image_id, 'full') : '',
            'gallery' => $gallery,
            'stockStatus' => $product->get_stock_status(),
            'stockQuantity' => $stock_quantity,
            'available' => $product->is_purchasable() && $product->is_in_stock(),
            'maxQuantity' => $max_quantity,
        );
    }
    set_transient('luxureat_static_woo_catalog', $catalog, MINUTE_IN_SECONDS);
    return $catalog;
}

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
            wp_localize_script('luxureat-core', 'LuxureatAccount', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_account'),
                'newsletterNonce' => wp_create_nonce('luxureat_newsletter'),
                'botChallenge' => luxureat_static_bot_challenge(),
                'loggedIn' => is_user_logged_in(),
                'bag' => is_user_logged_in() ? luxureat_static_get_bag(get_current_user_id()) : array(),
                'bagNonce' => wp_create_nonce('luxureat_bag'),
                'lostPasswordUrl' => wp_lostpassword_url(home_url('/')),
                'logoutUrl' => wp_logout_url(home_url('/')),
            ));
            if (in_array($path, array('zh', 'en'), true)) {
                wp_localize_script('luxureat-core', 'LuxureatCheckout', array(
                    'ajaxUrl' => admin_url('admin-ajax.php'),
                    'nonce' => wp_create_nonce('luxureat_checkout'),
                ));
                wp_localize_script('luxureat-core', 'LuxureatWooCatalog', array(
                    'products' => luxureat_static_woo_catalog(),
                ));
            }
        }
        if ($handle === 'products') {
            wp_localize_script('luxureat-products', 'LuxureatCheckout', array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('luxureat_checkout'),
            ));
            wp_localize_script('luxureat-products', 'LuxureatWooCatalog', array(
                'products' => luxureat_static_woo_catalog(),
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

function luxureat_static_strong_password($password, $email) {
    return strlen($password) >= 12 && preg_match('/[A-Za-z]/', $password) && preg_match('/[0-9]/', $password);
}

function luxureat_static_sanitize_bag($items) {
    if (!is_array($items)) {
        return array();
    }
    $bag = array();
    foreach (array_slice($items, 0, 20) as $item) {
        $id = isset($item['id']) ? substr(sanitize_text_field($item['id']), 0, 120) : '';
        $sku = isset($item['sku']) ? substr(sanitize_text_field($item['sku']), 0, 120) : '';
        $quantity = isset($item['quantity']) ? absint($item['quantity']) : 0;
        if ($id !== '' && $sku !== '' && $quantity >= 1 && $quantity <= 99) {
            $bag[] = array('id' => $id, 'sku' => $sku, 'quantity' => $quantity);
        }
    }
    return $bag;
}

function luxureat_static_get_bag($user_id) {
    return luxureat_static_sanitize_bag(get_user_meta($user_id, 'luxureat_bag', true));
}

function luxureat_static_bag_ajax() {
    if (!is_user_logged_in()) {
        wp_send_json_error(array('message' => 'Authentication required.'), 401);
    }
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_bag')) {
        wp_send_json_error(array('message' => 'Invalid request.'), 403);
    }
    $items = isset($_POST['items']) ? json_decode(wp_unslash($_POST['items']), true) : null;
    if (!is_array($items)) {
        wp_send_json_error(array('message' => 'Invalid bag.'), 400);
    }
    update_user_meta(get_current_user_id(), 'luxureat_bag', luxureat_static_sanitize_bag($items));
    wp_send_json_success();
}
add_action('wp_ajax_luxureat_bag', 'luxureat_static_bag_ajax');

function luxureat_static_silence_account_admin_mail($return, $mail) {
    $to = isset($mail['to']) ? (array) $mail['to'] : array();
    $admin = strtolower((string) get_option('admin_email'));
    $is_admin_recipient = array_filter($to, function ($recipient) use ($admin) {
        return strpos(strtolower((string) $recipient), $admin) !== false;
    });
    $subject = isset($mail['subject']) ? wp_strip_all_tags($mail['subject']) : '';
    if ($is_admin_recipient && preg_match('/new user registration|new subscriber|new subscription|password|(?:user|account|profile|email).*(?:modified|updated|changed|change|attempt)|新用户注册|新订阅者|密码|(?:用户|账户|资料|邮箱).*(?:修改|更新|更改|尝试)/i', $subject)) {
        return true;
    }
    return $return;
}
add_filter('wp_send_new_user_notification_to_admin', '__return_false');
add_filter('pre_wp_mail', 'luxureat_static_silence_account_admin_mail', 10, 2);

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

function luxureat_static_send_verification($user_id, $lang) {
    $user = get_userdata($user_id);
    if (!$user) {
        return false;
    }
    $token = wp_generate_password(48, false, false);
    update_user_meta($user_id, '_luxureat_email_verified', '0');
    update_user_meta($user_id, '_luxureat_email_token', hash_hmac('sha256', $token, wp_salt('auth')));
    update_user_meta($user_id, '_luxureat_email_expires', time() + DAY_IN_SECONDS);
    update_user_meta($user_id, '_luxureat_email_lang', $lang);
    $url = add_query_arg(array(
        'luxureat_verify' => '1',
        'user' => $user_id,
        'token' => $token,
    ), home_url('/'));
    $is_zh = $lang === 'zh';
    $subject = $is_zh ? '验证您的 LuxurEat（露意膳）账号' : 'Verify your LuxurEat account';
    $body = $is_zh
        ? "请点击以下链接验证邮箱并完成账号注册：\n\n" . $url . "\n\n此链接将在24小时后失效。"
        : "Open the link below to verify your email and finish creating your account:\n\n" . $url . "\n\nThis link expires in 24 hours.";
    return wp_mail($user->user_email, $subject, $body);
}

function luxureat_static_verify_email() {
    if (!isset($_GET['luxureat_verify'], $_GET['user'], $_GET['token'])) {
        return;
    }
    $user_id = absint($_GET['user']);
    $token = sanitize_text_field(wp_unslash($_GET['token']));
    $lang = get_user_meta($user_id, '_luxureat_email_lang', true) === 'en' ? 'en' : 'zh';
    $expected = (string) get_user_meta($user_id, '_luxureat_email_token', true);
    $expires = (int) get_user_meta($user_id, '_luxureat_email_expires', true);
    $valid = $expected !== ''
        && $expires >= time()
        && hash_equals($expected, hash_hmac('sha256', $token, wp_salt('auth')));
    if ($valid) {
        update_user_meta($user_id, '_luxureat_email_verified', '1');
        delete_user_meta($user_id, '_luxureat_email_token');
        delete_user_meta($user_id, '_luxureat_email_expires');
        if (get_user_meta($user_id, '_luxureat_newsletter_pending', true) === '1') {
            $user = get_userdata($user_id);
            if ($user) {
                luxureat_static_mailpoet_subscribe($user->user_email);
            }
            delete_user_meta($user_id, '_luxureat_newsletter_pending');
        }
    }
    $home = function_exists('luxureat_static_url') ? luxureat_static_url($lang) : home_url($lang === 'en' ? '/en/' : '/');
    wp_safe_redirect(add_query_arg('account', $valid ? 'verified' : 'verification-failed', $home));
    exit;
}
add_action('template_redirect', 'luxureat_static_verify_email', -1);

function luxureat_static_require_verified_email($user) {
    if ($user instanceof WP_User && get_user_meta($user->ID, '_luxureat_email_verified', true) === '0') {
        $message = determine_locale() === 'zh_CN'
            ? '请先打开验证邮件完成邮箱验证。'
            : 'Please verify your email using the link we sent before signing in.';
        return new WP_Error('luxureat_email_unverified', $message);
    }
    return $user;
}
add_filter('authenticate', 'luxureat_static_require_verified_email', 30);
add_filter('login_errors', function () {
    return determine_locale() === 'zh_CN' ? '登录信息不正确。' : 'The sign-in details are incorrect.';
});

function luxureat_static_rate_keys($scope, $identifier) {
    $remote_address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
    $identifier = strtolower(trim((string) $identifier));
    $salt = wp_salt('nonce');
    return array(
        'ip' => 'lux_rate_' . hash_hmac('sha256', $scope . '|ip|' . $remote_address, $salt),
        'identifier' => 'lux_rate_' . hash_hmac('sha256', $scope . '|identifier|' . $identifier, $salt),
    );
}

function luxureat_static_rate_consume($scope, $identifier, $ip_limit, $identifier_limit, $window) {
    $keys = luxureat_static_rate_keys($scope, $identifier);
    $limits = array('ip' => $ip_limit, 'identifier' => $identifier_limit);
    foreach ($keys as $type => $key) {
        if ((int) get_transient($key) >= $limits[$type]) {
            return false;
        }
    }
    foreach ($keys as $key) {
        set_transient($key, (int) get_transient($key) + 1, $window);
    }
    return true;
}

function luxureat_static_rate_reset($scope, $identifier) {
    foreach (luxureat_static_rate_keys($scope, $identifier) as $key) {
        delete_transient($key);
    }
}

function luxureat_static_account_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_account')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (!empty($_POST['company']) || !luxureat_static_verify_bot_challenge()) {
        wp_send_json_error(array('message' => $message('安全验证失败，请刷新页面后重试。', 'Security verification failed. Please refresh the page and try again.')), 403);
    }
    if (is_user_logged_in()) {
        wp_send_json_success();
    }

    $mode = isset($_POST['mode']) ? sanitize_key(wp_unslash($_POST['mode'])) : 'login';
    $raw_email = isset($_POST['email']) ? trim((string) wp_unslash($_POST['email'])) : '';
    $email = sanitize_email($raw_email);
    $password = isset($_POST['password']) ? (string) wp_unslash($_POST['password']) : '';
    if (!is_email($email)) {
        wp_send_json_error(array('message' => $message('电子邮箱不存在或格式错误。', 'The email address does not exist or is invalid.'), 'field' => 'email'), 400);
    }

    if ($mode === 'forgot') {
        if (!luxureat_static_rate_consume('forgot', $email, 5, 3, HOUR_IN_SECONDS)) {
            wp_send_json_error(array('message' => $message('请求过于频繁，请稍后再试。', 'Too many requests. Please try again later.')), 429);
        }
        $user = get_user_by('email', $email);
        if ($user) {
            update_user_meta($user->ID, 'locale', $is_zh ? 'zh_CN' : 'en_US');
            retrieve_password($user->user_login);
        }
        wp_send_json_success(array('message' => $message('如果该邮箱已注册，密码重置链接已发送，请检查收件箱和垃圾邮件。', 'If the email is registered, a reset link has been sent. Please check your inbox and spam folder.')));
    }

    if ($mode === 'register') {
        if (!function_exists('wc_create_new_customer') || get_option('woocommerce_enable_myaccount_registration') !== 'yes') {
            wp_send_json_error(array('message' => $message('暂未开放账号注册。', 'Account registration is not available yet.')), 403);
        }
        if (empty($_POST['consent'])) {
            wp_send_json_error(array('message' => $message('请先阅读并同意用户服务协议和隐私政策。', 'Please read and agree to the Terms of Service and Privacy Policy.')), 400);
        }
        if (!luxureat_static_strong_password($password, $email)) {
            wp_send_json_error(array('message' => $message('密码至少 12 位，并须包含字母和数字。', 'Use at least 12 characters with letters and numbers.')), 400);
        }
        if (!luxureat_static_rate_consume('register', $email, 8, 4, HOUR_IN_SECONDS)) {
            wp_send_json_error(array('message' => $message('请求过于频繁，请稍后再试。', 'Too many requests. Please try again later.')), 429);
        }
        $existing = get_user_by('email', $email);
        if ($existing) {
            $verification_expires = (int) get_user_meta($existing->ID, '_luxureat_email_expires', true);
            if (get_user_meta($existing->ID, '_luxureat_email_verified', true) === '0' && $verification_expires < time()) {
                luxureat_static_send_verification($existing->ID, $is_zh ? 'zh' : 'en');
            }
            wp_send_json_success(array(
                'message' => $message('如果该邮箱可以注册，验证邮件将会发送，请检查收件箱和垃圾邮件。', 'If this email can be registered, a verification message will be sent. Please check your inbox and spam folder.'),
                'requiresVerification' => true,
            ));
        }
        $user_id = wc_create_new_customer($email, '', $password);
        if (is_wp_error($user_id)) {
            wp_send_json_error(array('message' => $message('暂时无法创建账号，请稍后再试。', 'The account could not be created. Please try again later.'), 'field' => 'feedback'), 400);
        }
        update_user_meta($user_id, 'locale', $is_zh ? 'zh_CN' : 'en_US');
        if (!empty($_POST['newsletter'])) {
            update_user_meta($user_id, '_luxureat_newsletter_pending', '1');
        } else {
            delete_user_meta($user_id, '_luxureat_newsletter_pending');
        }
        if (!luxureat_static_send_verification($user_id, $is_zh ? 'zh' : 'en')) {
            require_once ABSPATH . 'wp-admin/includes/user.php';
            wp_delete_user($user_id);
            wp_send_json_error(array('message' => $message('验证邮件暂时无法发送，请稍后再试。', 'The verification email could not be sent. Please try again later.'), 'field' => 'feedback'), 500);
        }
        wp_send_json_success(array(
            'message' => $message('验证邮件已发送，请打开邮件中的链接完成注册后再登录。', 'A verification email has been sent. Open its link to finish registration before signing in.'),
            'requiresVerification' => true,
        ));
    }

    if (!luxureat_static_rate_consume('login', $email, 10, 20, 15 * MINUTE_IN_SECONDS)) {
        wp_send_json_error(array('message' => $message('登录尝试过于频繁，请稍后再试。', 'Too many sign-in attempts. Please try again later.'), 'field' => 'feedback'), 429);
    }
    $invalid_login = array('message' => $message('邮箱或密码不正确。', 'Incorrect email or password.'), 'field' => 'feedback');
    $user = get_user_by('email', $email);
    if (!$user || get_user_meta($user->ID, '_luxureat_email_verified', true) === '0' || $password === '') {
        wp_send_json_error($invalid_login, 401);
    }
    $credentials = array(
        'user_login' => $user->user_login,
        'user_password' => $password,
        'remember' => !empty($_POST['remember']),
    );
    $signed_in = wp_signon($credentials, is_ssl());
    if (is_wp_error($signed_in)) {
        wp_send_json_error($invalid_login, 401);
    }
    luxureat_static_rate_reset('login', $email);
    wp_send_json_success();
}
add_action('wp_ajax_nopriv_luxureat_account', 'luxureat_static_account_ajax');
add_action('wp_ajax_luxureat_account', 'luxureat_static_account_ajax');

function luxureat_static_contact_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_contact')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (!empty($_POST['company'])) {
        wp_send_json_error(array('message' => $message('安全验证失败，请刷新页面后重试。', 'Security verification failed. Please refresh the page and try again.')), 403);
    }

    $name = isset($_POST['name']) ? trim(sanitize_text_field(wp_unslash($_POST['name']))) : '';
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
    if (strlen($name) > 240 || strlen($phone) > 120 || strlen($content) > 12000 || !is_email($email)) {
        wp_send_json_error(array('message' => $message('请检查所填信息后重试。', 'Please check the information and try again.')), 400);
    }

    $remote_address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
    $rate_key = 'lux_contact_' . hash_hmac('sha256', $remote_address, wp_salt('nonce'));
    if (get_transient($rate_key)) {
        wp_send_json_error(array('message' => $message('信息已提交，请稍后再试。', 'Your message was submitted. Please wait before trying again.')), 429);
    }

    $subject = $name . ' + ' . $inquiry_labels[$inquiry_type];
    $body = "Nome: " . $name . "\n"
        . "Telefono: " . ($phone ?: 'Non fornito') . "\n"
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

function luxureat_static_password_hint() {
    return determine_locale() === 'zh_CN'
        ? '至少 12 位，须包含字母和数字。'
        : 'Use at least 12 characters with letters and numbers.';
}
add_filter('password_hint', 'luxureat_static_password_hint', 999);
add_filter('woocommerce_min_password_strength', '__return_zero', 999);
add_action('validate_password_reset', function ($errors, $user) {
    if (isset($_POST['pass1']) && !luxureat_static_strong_password((string) wp_unslash($_POST['pass1']), $user->user_email)) {
        $errors->add('password_reset_mismatch', luxureat_static_password_hint());
    }
}, 10, 2);

function luxureat_static_checkout_ajax() {
    $is_zh = isset($_POST['lang']) && sanitize_key(wp_unslash($_POST['lang'])) === 'zh';
    $message = function ($zh, $en) use ($is_zh) { return $is_zh ? $zh : $en; };
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'luxureat_checkout')) {
        wp_send_json_error(array('message' => $message('请刷新页面后重试。', 'Please refresh the page and try again.')), 403);
    }
    if (!is_user_logged_in()) {
        wp_send_json_error(array('message' => $message('请先登录账号，然后继续结算。', 'Please sign in before continuing to checkout.')), 401);
    }
    if (!function_exists('WC') || !function_exists('wc_get_product_id_by_sku')) {
        wp_send_json_error(array('message' => $message('结算服务暂时不可用。', 'Checkout is temporarily unavailable.')), 503);
    }
    if (null === WC()->cart && function_exists('wc_load_cart')) {
        wc_load_cart();
    }
    if (null === WC()->cart) {
        wp_send_json_error(array('message' => $message('无法建立购物车。', 'Could not start the cart.')), 503);
    }

    $items = isset($_POST['items']) ? json_decode(wp_unslash($_POST['items']), true) : null;
    if (!is_array($items) || !$items || count($items) > 20) {
        wp_send_json_error(array('message' => $message('购物袋数据无效。', 'The bag data is invalid.')), 400);
    }
    update_user_meta(get_current_user_id(), 'luxureat_bag', luxureat_static_sanitize_bag($items));

    $desired = array();
    foreach ($items as $item) {
        $sku = isset($item['sku']) ? sanitize_text_field($item['sku']) : '';
        $quantity = isset($item['quantity']) ? absint($item['quantity']) : 0;
        $product_id = $sku ? wc_get_product_id_by_sku($sku) : 0;
        $product = $product_id ? wc_get_product($product_id) : false;
        if (!$product || !$product->is_purchasable() || !$product->is_in_stock() || $quantity < 1 || $quantity > 99 || ($product->is_sold_individually() && $quantity > 1) || !$product->has_enough_stock($quantity)) {
            wp_send_json_error(array('message' => $message('商品已下架或数量无效。', 'A product is unavailable or its quantity is invalid.')), 400);
        }
        $desired[$sku] = array('id' => $product_id, 'quantity' => isset($desired[$sku]) ? $desired[$sku]['quantity'] + $quantity : $quantity);
        if ($desired[$sku]['quantity'] > 99 || !$product->has_enough_stock($desired[$sku]['quantity'])) {
            wp_send_json_error(array('message' => $message('商品数量超出库存限制。', 'The requested quantity exceeds available stock.')), 400);
        }
    }

    foreach (WC()->cart->get_cart() as $key => $cart_item) {
        $sku = isset($cart_item['data']) ? $cart_item['data']->get_sku() : '';
        if (!isset($desired[$sku])) {
            WC()->cart->remove_cart_item($key);
            continue;
        }
        if ((int) $cart_item['quantity'] !== $desired[$sku]['quantity']) {
            WC()->cart->set_quantity($key, $desired[$sku]['quantity'], false);
        }
        unset($desired[$sku]);
    }
    foreach ($desired as $item) {
        if (!WC()->cart->add_to_cart($item['id'], $item['quantity'])) {
            wp_send_json_error(array('message' => $message('商品无法加入购物车。', 'A product could not be added to the cart.')), 400);
        }
    }
    WC()->cart->calculate_totals();
    WC()->cart->set_session();
    $checkout_url = $is_zh ? wc_get_checkout_url() : add_query_arg('lang', 'en', wc_get_checkout_url());
    wp_send_json_success(array('checkoutUrl' => $checkout_url));
}
add_action('wp_ajax_nopriv_luxureat_checkout', 'luxureat_static_checkout_ajax');
add_action('wp_ajax_luxureat_checkout', 'luxureat_static_checkout_ajax');

function luxureat_static_reduce_paid_bag($order_id) {
    $order = function_exists('wc_get_order') ? wc_get_order($order_id) : false;
    if (!$order || $order->get_meta('_luxureat_bag_reduced')) {
        return;
    }
    $user_id = $order->get_user_id();
    if (!$user_id) {
        return;
    }
    $purchased = array();
    foreach ($order->get_items() as $item) {
        $product = $item->get_product();
        $sku = $product ? $product->get_sku() : '';
        if ($sku !== '') {
            $purchased[$sku] = isset($purchased[$sku]) ? $purchased[$sku] + $item->get_quantity() : $item->get_quantity();
        }
    }
    $bag = array_values(array_filter(array_map(function ($item) use (&$purchased) {
        if (!isset($purchased[$item['sku']])) {
            return $item;
        }
        $paid_quantity = min($item['quantity'], $purchased[$item['sku']]);
        $quantity = $item['quantity'] - $paid_quantity;
        $purchased[$item['sku']] -= $paid_quantity;
        if ($purchased[$item['sku']] <= 0) {
            unset($purchased[$item['sku']]);
        }
        return $quantity > 0 ? array_merge($item, array('quantity' => $quantity)) : null;
    }, luxureat_static_get_bag($user_id))));
    update_user_meta($user_id, 'luxureat_bag', $bag);
    $order->update_meta_data('_luxureat_bag_reduced', 1);
    $order->save();
}
add_action('woocommerce_payment_complete', 'luxureat_static_reduce_paid_bag');
add_action('woocommerce_order_status_processing', 'luxureat_static_reduce_paid_bag');
add_action('woocommerce_order_status_completed', 'luxureat_static_reduce_paid_bag');

function luxureat_static_require_account_for_checkout() {
    if (function_exists('is_checkout') && is_checkout() && !is_user_logged_in() && !wp_doing_ajax()) {
        wp_safe_redirect(add_query_arg('account', 'required', home_url('/')));
        exit;
    }
}
add_action('template_redirect', 'luxureat_static_require_account_for_checkout', 0);

function luxureat_static_translate_shipping_rates($rates) {
    $language = function_exists('WC') && WC()->session ? WC()->session->get('luxureat_checkout_lang', 'zh') : 'zh';
    if ($language !== 'zh') {
        return $rates;
    }
    foreach ($rates as $rate) {
        if (is_object($rate) && method_exists($rate, 'get_method_id') && $rate->get_method_id() === 'free_shipping') {
            $rate->set_label('免费配送');
        }
    }
    return $rates;
}
add_filter('woocommerce_package_rates', 'luxureat_static_translate_shipping_rates', 100);

function luxureat_static_restrict_test_payment($gateways) {
    if (!current_user_can('manage_woocommerce')) {
        unset($gateways['cheque']);
    }
    return $gateways;
}
add_filter('woocommerce_available_payment_gateways', 'luxureat_static_restrict_test_payment', 100);

function luxureat_static_cart_item_images($images, $cart_item) {
    $product = isset($cart_item['data']) ? $cart_item['data'] : false;
    if (!$product instanceof WC_Product) {
        return $images;
    }
    if ($product->get_image_id()) {
        return $images;
    }
    $files = array(
        'imperial-beluga-30g' => 'academy/beluga-caviar-cover-new-page-bg.png',
        'royal-oscetra-30g' => 'academy/oscetra-caviar-cover.png',
        'mother-of-pearl-spoons' => 'journal/caviar-etiquette-service.webp',
        'champagne' => 'brand/home-values-caviar-plating.webp',
        'ice-server' => 'brand/partnership-solution-caviar-service.jpg',
    );
    $sku = $product->get_sku();
    if (!isset($files[$sku])) {
        return $images;
    }
    $url = get_template_directory_uri() . '/assets/media/' . $files[$sku];
    return array((object) array(
        'id' => $product->get_id(),
        'src' => $url,
        'thumbnail' => $url,
        'srcset' => '',
        'sizes' => '',
        'name' => $product->get_name(),
        'alt' => $product->get_name(),
    ));
}
add_filter('woocommerce_store_api_cart_item_images', 'luxureat_static_cart_item_images', 10, 2);

function luxureat_static_remove_checkout_marketing_optin($integration_registry) {
    if (
        is_object($integration_registry)
        && method_exists($integration_registry, 'is_registered')
        && method_exists($integration_registry, 'unregister')
        && $integration_registry->is_registered('mailpoet')
    ) {
        $integration_registry->unregister('mailpoet');
    }
}
add_action(
    'woocommerce_blocks_checkout_block_registration',
    'luxureat_static_remove_checkout_marketing_optin',
    100
);

function luxureat_static_account_language() {
    $language = isset($_GET['lang']) ? sanitize_key(wp_unslash($_GET['lang'])) : 'zh';
    return $language === 'en' ? 'en' : 'zh';
}

function luxureat_static_account_menu($items) {
    if (!is_user_logged_in() || current_user_can('manage_options')) {
        return $items;
    }

    $is_zh = luxureat_static_account_language() === 'zh';
    $labels = array(
        'orders' => $is_zh ? '订单' : 'Orders',
        'edit-address' => $is_zh ? '地址' : 'Addresses',
        'edit-account' => $is_zh ? '账户资料' : 'Account details',
        'customer-logout' => $is_zh ? '退出登录' : 'Log out',
    );

    return array_intersect_key($labels, $items);
}
add_filter('woocommerce_account_menu_items', 'luxureat_static_account_menu', 999);

function luxureat_static_account_endpoint_url($url) {
    return add_query_arg('lang', luxureat_static_account_language(), $url);
}
add_filter('woocommerce_get_endpoint_url', 'luxureat_static_account_endpoint_url');

function luxureat_static_account_dashboard() {
    $user = wp_get_current_user();
    $is_zh = luxureat_static_account_language() === 'zh';
    ?>
    <section class="lux-account-dashboard">
        <p class="lux-account-eyebrow"><?php echo esc_html($is_zh ? '欢迎回来' : 'Welcome back'); ?></p>
        <h2><?php echo esc_html($user->display_name ?: $user->user_login); ?></h2>
        <p><?php echo esc_html($is_zh ? '在这里查看订单、管理收货与账单地址，或更新账户资料。' : 'View your orders, manage shipping and billing addresses, or update your account details.'); ?></p>
    </section>
    <?php
}

function luxureat_static_replace_account_dashboard() {
    remove_action('woocommerce_account_dashboard', 'woocommerce_account_dashboard');
    add_action('woocommerce_account_dashboard', 'luxureat_static_account_dashboard');
}
add_action('wp_loaded', 'luxureat_static_replace_account_dashboard');

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
    if (!is_admin() && !is_user_logged_in() && !is_account_page() && !is_cart() && !is_checkout()) {
        $headers['Cache-Control'] = 'public, max-age=300, stale-while-revalidate=86400';
    }

    return $headers;
}
add_filter('wp_headers', 'luxureat_static_cache_headers');

function luxureat_static_hide_server_version() {
    header_remove('X-Powered-By');
    if (!is_admin() && !is_user_logged_in() && !is_account_page() && !is_cart() && !is_checkout()) {
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
$is_account_page = function_exists('is_account_page') && is_account_page();
$is_checkout_page = function_exists('is_checkout') && is_checkout();
$is_customer_page = $is_account_page || $is_checkout_page;
$page_language = $is_customer_page && function_exists('luxureat_static_account_language') ? luxureat_static_account_language() : 'zh';
$is_zh_page = $page_language === 'zh';
if ($is_customer_page && function_exists('switch_to_locale')) {
    switch_to_locale($is_zh_page ? 'zh_CN' : 'en_US');
}
if ($is_customer_page && function_exists('WC') && WC()->session) {
    WC()->session->set('luxureat_checkout_lang', $page_language);
}
$account_endpoint = $is_account_page && function_exists('WC') && WC()->query ? WC()->query->get_current_endpoint() : '';
$is_account_dashboard = $is_account_page && is_user_logged_in() && !$account_endpoint;
$language_url = $is_checkout_page && function_exists('wc_get_checkout_url') ? wc_get_checkout_url() : (function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : get_permalink());
$body_classes = array();
if ($is_account_dashboard) $body_classes[] = 'lux-account-dashboard-page';
if ($is_checkout_page) $body_classes[] = 'lux-checkout-page';
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(trim('lux-wp-page-shell ' . implode(' ', $body_classes))); ?>>
<?php wp_body_open(); ?>
<header class="lux-wp-page-header">
    <a class="lux-wp-page-brand" href="<?php echo esc_url(home_url('/')); ?>">
        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/media/brand/luxureat-logo.png'); ?>" alt="LuxurEat">
        <span>LuxurEat <i aria-hidden="true">｜</i> <small>露意膳</small></span>
    </a>
    <nav class="lux-wp-page-actions" aria-label="<?php echo esc_attr($is_zh_page ? '页面导航' : 'Page navigation'); ?>">
        <?php if ($is_customer_page) : ?>
            <span class="lux-language-switch" aria-label="<?php echo esc_attr($is_zh_page ? '语言' : 'Language'); ?>">
                <a href="<?php echo esc_url(add_query_arg('lang', 'zh', $language_url)); ?>"<?php echo $is_zh_page ? ' aria-current="page"' : ''; ?>>中文</a>
                <i aria-hidden="true">/</i>
                <a href="<?php echo esc_url(add_query_arg('lang', 'en', $language_url)); ?>"<?php echo !$is_zh_page ? ' aria-current="page"' : ''; ?>>EN</a>
            </span>
        <?php endif; ?>
        <a class="lux-wp-page-home" href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html($is_zh_page ? '返回首页' : 'Return to home'); ?></a>
    </nav>
</header>
<main class="lux-wp-page-main">
<?php while (have_posts()) : the_post(); ?>
    <header class="lux-wp-page-title">
        <p><?php echo esc_html($is_checkout_page ? ($is_zh_page ? '安全结算' : 'Secure checkout') : ($is_zh_page ? '会员中心' : 'Group Account')); ?></p>
        <h1><?php echo esc_html($is_checkout_page ? ($is_zh_page ? '确认订单' : 'Checkout') : ($is_account_page ? ($is_zh_page ? '我的账户' : 'My account') : get_the_title())); ?></h1>
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
  for (const event of eventInputs) {
    write(path.join(themeDir, 'pages', event.lang, 'events', `${event.id}.php`), eventPageHtml(event, articleImageDimensions));
  }
  for (const recipe of recipeInputs) {
    write(path.join(themeDir, 'pages', recipe.lang, 'recipe', `${recipe.slug}.php`), recipePageHtml(recipe, articleImageDimensions));
  }

  execFileSync('zip', ['-qr', zipFile, 'luxureat-static', '-x', '*.DS_Store', '__MACOSX/*'], {
    cwd: outputRoot,
    stdio: 'inherit',
  });

  console.log(`Theme written to ${themeDir}`);
  console.log(`Theme zip written to ${zipFile}`);
}

await build();
