import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import { pages } from '../site.config.mjs';

const site = 'https://luxureat.cn';
const root = path.resolve(import.meta.dirname, '..');
const output = path.resolve(process.argv[2] || 'sitemap.xml');
const excludedSlugs = new Set(['bag', 'cart', 'checkout', 'account', 'login', 'register']);

const isIndexable = (page) => page && page.indexable !== false && !excludedSlugs.has(page.slug);
const routeUrl = (lang, route = '') => `${site}/${lang === 'en' ? 'en/' : ''}${route ? `${route}/` : ''}`;

const pageUrl = (page) => {
  const route = String(page.route || '').replace(/^\/+|\/+$/g, '');
  if (!route || route === 'zh') return `${site}/`;
  if (route.startsWith('zh/')) return `${site}/${route.slice(3)}/`;
  return `${site}/${route}/`;
};

function loadData(file, key) {
  const context = {
    URL,
    location: { href: `file://${path.join(root, 'zh/index.html')}` },
    document: { currentScript: { src: `file://${path.join(root, file)}` } },
    window: {},
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  return context.window[key];
}

function loadAcademyArticles() {
  const context = {
    URL,
    location: { href: `file://${path.join(root, 'en/blog.html')}` },
    document: { currentScript: { src: `file://${path.join(root, 'assets/data/academy.js')}` } },
    window: { LUXUREAT_ARTICLE_DATA: { articles: {} } },
  };
  vm.createContext(context);
  for (const file of ['assets/data/academy.js', 'assets/data/academy-columns.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return Object.values(context.window.LUXUREAT_ACADEMY_DATA.articles);
}

const entries = [];
const publicPages = pages.filter(isIndexable);
const pageAlternates = new Map(publicPages.map((page) => [`${page.key}:${page.lang}`, pageUrl(page)]));
for (const page of publicPages) {
  entries.push({
    url: pageUrl(page),
    zh: pageAlternates.get(`${page.key}:zh`),
    en: pageAlternates.get(`${page.key}:en`),
  });
}

const addBilingualRoutes = (items, routeFor, idFor) => {
  const byId = new Map(items.map((item) => [`${idFor(item)}:${item.lang}`, routeFor(item)]));
  for (const item of items) {
    const id = idFor(item);
    entries.push({ url: routeFor(item), zh: byId.get(`${id}:zh`), en: byId.get(`${id}:en`) });
  }
};

const articles = loadAcademyArticles();
addBilingualRoutes(articles, (item) => routeUrl(item.lang, `blog/${item.slug}`), (item) => item.slug);

const products = Object.entries(loadData('assets/data/products.js', 'LUXUREAT_PRODUCT_DATA').products)
  .map(([key, item]) => ({ ...item, lang: key.startsWith('zh-') ? 'zh' : 'en' }));
addBilingualRoutes(products, (item) => routeUrl(item.lang, `product/${item.id}`), (item) => item.id);

const recipes = Object.entries(loadData('assets/data/journal.js', 'LUXUREAT_ARTICLE_DATA').articles)
  .filter(([, item]) => item.type === 'recipe' && item.recipe)
  .map(([id, item]) => ({ ...item, id, slug: id.replace(/^(?:zh|en)-recipe-/, '') }));
addBilingualRoutes(recipes, (item) => routeUrl(item.lang, `recipe/${item.slug}`), (item) => item.slug);

const news = loadData('assets/data/brand-news.js', 'LUXUREAT_BRAND_NEWS')
  .flatMap((item) => ['zh', 'en'].map((lang) => ({ ...item, lang })));
addBilingualRoutes(news, (item) => routeUrl(item.lang, `news/${item.id}`), (item) => item.id);

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const urls = [...new Map(entries.map((entry) => [entry.url, entry])).values()];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.map(({ url, zh, en }) => {
    const links = [
      zh && `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(zh)}" />`,
      en && `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />`,
      zh && `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(zh)}" />`,
    ].filter(Boolean);
    return ['  <url>', `    <loc>${escapeXml(url)}</loc>`, ...links, '  </url>'].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, xml, 'utf8');
console.log(`Wrote ${urls.length} indexable URL(s) with language alternates to ${output}`);
