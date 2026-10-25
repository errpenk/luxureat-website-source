import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const output = process.argv[2] || path.join(root, '.deploy', 'luxureat-content.xml');
const site = 'https://luxureat.cn';
const theme = `${site}/wp-content/themes/luxureat-wordpress-theme`;
const xml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const cdata = (value) => `<![CDATA[${String(value ?? '').replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
const asset = (url) => {
  const value = String(url || '');
  const index = value.indexOf('/assets/');
  return index < 0 ? value : `${theme}${value.slice(index)}`;
};
const load = (files, initialWindow = {}) => {
  const context = {
    URL,
    location: { href: `file://${root}/zh/index.html` },
    document: { currentScript: { src: `file://${root}/${files[0]}` } },
    window: initialWindow,
  };
  vm.createContext(context);
  for (const file of files) {
    context.document.currentScript.src = `file://${root}/${file}`;
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  return context.window;
};
const journal = load(['assets/data/journal.js']).LUXUREAT_ARTICLE_DATA.articles;
const academy = load(['assets/data/academy.js', 'assets/data/academy-columns.js'], { LUXUREAT_ARTICLE_DATA: { articles: {} } }).LUXUREAT_ACADEMY_DATA.articles;
const gallery = load(['assets/data/gallery.js']).LUXUREAT_GALLERY_DATA;
const recipes = Object.entries(journal).filter(([, item]) => item.type === 'recipe' && item.recipe);
const blogs = Object.entries(academy);

const prose = (content) => (Array.isArray(content) ? content : [content]).map((item) => {
  if (item?.type === 'table') return `<table><tbody>${item.rows.map((row, i) => `<tr>${row.map((cell) => `<${i ? 'td' : 'th'}>${xml(cell)}</${i ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table>`;
  if (item?.type === 'quote') return `<blockquote>${item.lines.map((line) => `<p>${xml(line)}</p>`).join('')}</blockquote>`;
  if (item?.type === 'strong') return `<p><strong>${xml(item.text)}</strong></p>`;
  if (typeof item === 'string' && item.startsWith('• ')) return `<ul><li>${xml(item.slice(2))}</li></ul>`;
  return `<p>${xml(item)}</p>`;
}).join('\n');
const blogBody = (article) => [
  prose(article.opening || []),
  ...(article.sections || []).map(([heading, content], i) => `<h2>${xml(heading)}</h2>${prose(content)}${(article.sectionMedia?.[i] || []).map((media) => `<figure><img src="${xml(asset(media.src))}" alt="${xml(media.alt || heading)}"></figure>`).join('')}`),
  article.quote ? `<blockquote>${xml(article.quote)}</blockquote>` : '',
].filter(Boolean).join('\n');
const recipeBody = (article) => {
  const r = article.recipe;
  const zh = article.lang === 'zh';
  const list = (items, tag) => `<${tag}>${(items || []).map((item) => `<li>${xml(item)}</li>`).join('')}</${tag}>`;
  return `<p>${xml(r.description || article.intro)}</p>\n<p>${zh ? '时间' : 'Time'}：${xml(r.time)} · ${zh ? '难度' : 'Difficulty'}：${xml(r.difficulty)} · ${zh ? '份量' : 'Serves'}：${xml(r.servings)}</p>\n<h2>${zh ? '食材' : 'Ingredients'}</h2>${list(r.ingredients, 'ul')}\n<h2>${zh ? '准备' : 'Method'}</h2>${list(r.steps, 'ol')}\n${r.nutrition?.length ? `<h2>${zh ? '每份的估计营养成分' : 'Estimated nutrition per serving'}</h2><dl>${r.nutrition.map(([label, value]) => `<dt>${xml(label)}</dt><dd>${xml(value)}</dd>`).join('')}</dl>` : ''}`;
};

const attachments = new Map();
let attachmentId = 10000;
const attach = (url) => {
  const source = asset(url);
  if (!source || !source.startsWith(`${theme}/assets/`)) return 0;
  if (!attachments.has(source)) attachments.set(source, ++attachmentId);
  return attachments.get(source);
};

const posts = [];
let postId = 20000;
for (const [id, article] of recipes) {
  const slug = id;
  const route = `${article.lang === 'zh' ? '' : 'en/'}recipe/${id.replace(/^(zh|en)-recipe-/, '')}`;
  posts.push({ id: ++postId, slug, title: article.title, excerpt: article.intro, body: recipeBody(article), kind: 'recipe', lang: article.lang, route, image: attach(article.image), sourceId: id });
}
for (const [id, article] of blogs) {
  const slug = id;
  const route = `${article.lang === 'zh' ? '' : 'en/'}blog/${article.slug}`;
  posts.push({ id: ++postId, slug, title: article.title, excerpt: article.intro, body: blogBody(article), kind: 'blog', lang: article.lang, route, image: attach(article.image), sourceId: id });
  for (const section of article.sectionMedia || []) for (const image of section) attach(image.src);
}
for (const media of gallery) {
  const video = attach(media.src);
  const image = attach(media.poster);
  for (const lang of ['zh', 'en']) {
    const title = media[lang].title;
    posts.push({ id: ++postId, slug: `${lang}-${media.id}`, title, excerpt: '', body: `<figure><video controls playsinline poster="${xml(asset(media.poster))}" src="${xml(asset(media.src))}"></video></figure>`, kind: 'gallery', lang, route: `${lang === 'zh' ? '' : 'en/'}gallery/#event-${media.eventId}`, image, sourceId: media.id, eventId: media.eventId, date: media.date, video });
  }
}

const meta = (key, value) => `<wp:postmeta><wp:meta_key>${cdata(key)}</wp:meta_key><wp:meta_value>${cdata(value)}</wp:meta_value></wp:postmeta>`;
const categories = { recipe: 'LuxurEat · 食谱', blog: 'LuxurEat · 知识博客', gallery: 'LuxurEat · 企业画廊' };
const item = (post) => `<item>
<title>${xml(post.title)}</title><link>${xml(`${site}/${post.route}/`)}</link><dc:creator>${cdata('admin')}</dc:creator>
<guid isPermaLink="false">${xml(`${site}/?luxureat-import=${post.id}`)}</guid>
<description></description><content:encoded>${cdata(post.body)}</content:encoded><excerpt:encoded>${cdata(post.excerpt)}</excerpt:encoded>
<wp:post_id>${post.id}</wp:post_id><wp:post_date>${cdata('2026-10-25 12:00:00')}</wp:post_date><wp:post_date_gmt>${cdata('2026-10-25 10:00:00')}</wp:post_date_gmt>
<wp:comment_status>closed</wp:comment_status><wp:ping_status>closed</wp:ping_status><wp:post_name>${cdata(post.slug)}</wp:post_name><wp:status>draft</wp:status><wp:post_parent>0</wp:post_parent><wp:menu_order>0</wp:menu_order><wp:post_type>post</wp:post_type>
<category domain="category" nicename="${xml(`luxureat-${post.kind}`)}">${cdata(categories[post.kind])}</category>
${meta('_luxureat_kind', post.kind)}${meta('_luxureat_lang', post.lang)}${meta('_luxureat_route', post.route)}${meta('_luxureat_source_id', post.sourceId)}${post.image ? meta('_thumbnail_id', post.image) : ''}${post.eventId ? meta('_luxureat_event_id', post.eventId) + meta('_luxureat_date', post.date) + meta('_luxureat_video_attachment_id', post.video) : ''}
</item>`;
const attachment = ([url, id]) => {
  const extension = path.extname(new URL(url).pathname).toLowerCase();
  const mime = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' }[extension] || 'application/octet-stream';
  const name = path.basename(new URL(url).pathname);
  return `<item><title>${xml(name)}</title><link>${xml(url)}</link><dc:creator>${cdata('admin')}</dc:creator><guid isPermaLink="false">${xml(`${site}/?luxureat-media=${id}`)}</guid><description></description><content:encoded>${cdata('')}</content:encoded><excerpt:encoded>${cdata('')}</excerpt:encoded><wp:post_id>${id}</wp:post_id><wp:post_date>${cdata('2026-10-25 12:00:00')}</wp:post_date><wp:post_date_gmt>${cdata('2026-10-25 10:00:00')}</wp:post_date_gmt><wp:comment_status>closed</wp:comment_status><wp:ping_status>closed</wp:ping_status><wp:post_name>${cdata(path.parse(name).name)}</wp:post_name><wp:status>inherit</wp:status><wp:post_parent>0</wp:post_parent><wp:menu_order>0</wp:menu_order><wp:post_type>attachment</wp:post_type><wp:post_mime_type>${mime}</wp:post_mime_type><wp:attachment_url>${cdata(url)}</wp:attachment_url></item>`;
};
const header = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:wfw="http://wellformedweb.org/CommentAPI/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:wp="http://wordpress.org/export/1.2/"><channel><title>LuxurEat content</title><link>${site}</link><description>Recipes, knowledge articles and gallery</description><pubDate>Sun, 25 Oct 2026 12:00:00 +0000</pubDate><language>zh-CN</language><wp:wxr_version>1.2</wp:wxr_version><wp:base_site_url>${site}</wp:base_site_url><wp:base_blog_url>${site}</wp:base_blog_url><wp:author><wp:author_id>1</wp:author_id><wp:author_login>admin</wp:author_login><wp:author_email></wp:author_email><wp:author_display_name>${cdata('admin')}</wp:author_display_name><wp:author_first_name></wp:author_first_name><wp:author_last_name></wp:author_last_name></wp:author>`;
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${header}\n${[...attachments].map(attachment).join('\n')}\n${posts.map(item).join('\n')}\n</channel></rss>\n`);
console.log(`Exported ${posts.length} posts and ${attachments.size} media records to ${output}`);
