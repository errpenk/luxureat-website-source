import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { pages } from '../site.config.mjs';

const site = 'https://luxureat.cn';
const output = path.resolve(process.argv[2] || 'sitemap.xml');
const excludedSlugs = new Set(['bag', 'cart', 'checkout', 'account', 'login', 'register']);

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

const urls = [...new Set(pages.filter(isIndexable).map(toUrl))];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, xml, 'utf8');
console.log(`Wrote ${urls.length} indexable URL(s) to ${output}`);
