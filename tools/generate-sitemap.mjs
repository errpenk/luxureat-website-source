import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { pages } from '../site.config.mjs';

const site = 'https://luxureat.cn';
const output = path.resolve(process.argv[2] || 'sitemap.xml');
const excludedSlugs = new Set(['bag', 'cart', 'checkout', 'account', 'login', 'register']);
const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function academyPages() {
  const context = {
    URL,
    location: { href: `file://${path.join(sourceRoot, 'en/blog.html')}` },
    document: { currentScript: { src: `file://${path.join(sourceRoot, 'assets/data/academy.js')}` } },
    window: { LUXUREAT_ARTICLE_DATA: { articles: {} } },
  };
  vm.createContext(context);
  for (const file of ['assets/data/academy.js', 'assets/data/academy-columns.js']) {
    vm.runInContext(fs.readFileSync(path.join(sourceRoot, file), 'utf8'), context, { filename: file });
  }
  return Object.values(context.window.LUXUREAT_ACADEMY_DATA.articles).map((article) => ({
    key: `article:${article.slug}`,
    lang: article.lang,
    slug: article.slug,
    route: `${article.lang}/blog/${article.slug}`,
    indexable: true,
  }));
}

function loadData(file, key) {
  const context = {
    URL,
    location: { href: `file://${path.join(sourceRoot, 'zh/index.html')}` },
    document: { currentScript: { src: `file://${path.join(sourceRoot, file)}` } },
    window: {},
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(sourceRoot, file), 'utf8'), context, { filename: file });
  return context.window[key];
}

function detailPages() {
  const products = Object.keys(loadData('assets/data/products.js', 'LUXUREAT_PRODUCT_DATA').products).map((key) => {
    const lang = key.startsWith('zh-') ? 'zh' : 'en';
    const slug = key.slice(3);
    return { key: `product:${slug}`, lang, slug, route: `${lang}/product/${slug}`, indexable: true };
  });
  const events = loadData('assets/data/events.js', 'LUXUREAT_EVENT_DATA').events.flatMap((event) => ['zh', 'en'].map((lang) => ({
    key: `event:${event.id}`,
    lang,
    slug: event.id,
    route: `${lang}/events/${event.id}`,
    indexable: true,
  })));
  const recipes = Object.entries(loadData('assets/data/journal.js', 'LUXUREAT_ARTICLE_DATA').articles)
    .filter(([, article]) => article.type === 'recipe' && article.recipe)
    .map(([id, article]) => {
      const slug = id.replace(/^(?:zh|en)-recipe-/, '');
      return { key: `recipe:${slug}`, lang: article.lang, slug, route: `${article.lang}/recipe/${slug}`, indexable: true };
    });
  return [...products, ...events, ...recipes];
}

const isIndexable = (page) => page && page.indexable !== false && !excludedSlugs.has(page.slug);

const toUrl = (page) => {
  const route = String(page.route || '').replace(/^\/+|\/+$/g, '');
  if (!route || route === 'zh') return `${site}/`;
  if (route.startsWith('zh/')) return `${site}/${route.slice(3)}/`;
  return `${site}/${route}/`;
};

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const publicPages = [...pages, ...academyPages(), ...detailPages()].filter(isIndexable);
const alternates = new Map(publicPages.map((page) => [`${page.key}:${page.lang}`, toUrl(page)]));
const urls = [...new Map(publicPages.map((page) => [toUrl(page), page])).entries()];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...urls.map(([url, page]) => {
    const zh = alternates.get(`${page.key}:zh`);
    const en = alternates.get(`${page.key}:en`);
    const links = [
      zh && `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(zh)}" />`,
      en && `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />`,
      zh && `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(zh)}" />`,
    ].filter(Boolean);
    return [`  <url>`, `    <loc>${escapeXml(url)}</loc>`, ...links, `  </url>`].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, xml, 'utf8');
console.log(`Wrote ${urls.length} indexable URL(s) with language alternates to ${output}`);
