const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

async function check(lang, fail = false) {
  const id = `${lang}-academy-example`;
  const article = { slug: 'example', title: 'Original' };
  let requests = 0;
  const context = {
    URL, Map, Promise,
    location: { origin: 'https://luxureat.cn', hash: '' },
    window: {
      LUXUREAT_ACADEMY_DATA: { articles: { [id]: article } },
      LUXUREAT_ARTICLE_DATA: { articles: { [id]: article } },
      LUXUREAT_CMS: { blog: { [`${id}:${lang}`]: { title: 'Edited', intro: 'Summary' } } },
    },
    document: {
      currentScript: { src: 'https://luxureat.cn/theme/assets/js/academy.js' },
      readyState: 'loading', addEventListener() {},
      createElement: () => ({}),
      body: { appendChild(script) { article.sections = []; script.onload(); } },
    },
    fetch: async (url) => {
      requests++;
      assert.equal(url.href, `https://luxureat.cn/${lang === 'en' ? 'en/' : ''}blog/example/`);
      return { ok: !fail, text: async () => 'page' };
    },
    DOMParser: class { parseFromString() { return { querySelector: () => ({ innerHTML: '<p>Edited body</p>' }) }; } },
  };
  vm.runInNewContext(fs.readFileSync(`${__dirname}/../assets/js/academy.js`, 'utf8'), context);
  assert.equal(requests, 0, 'list must not download article bodies');
  assert.equal(await context.window.luxLoadAcademyArticle(id), !fail);
  if (!fail) {
    assert.equal(article.cmsHtml, '<p>Edited body</p>');
    await context.window.luxLoadAcademyArticle(id);
    assert.equal(requests, 1, 'opened article must be cached');
  }
}
Promise.all([check('en'), check('zh'), check('en', true)]).then(() => console.log('Blog CMS lazy-loading checks passed')).catch((error) => { console.error(error); process.exitCode = 1; });
