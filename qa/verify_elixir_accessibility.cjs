const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
(async () => {
  const source = fs.readFileSync('assets/js/academy.js', 'utf8').split('window.luxLoadAcademyArticle =')[0];
  const registry = {};
  const context = vm.createContext({URL, Map, Promise, Object, window: {
    LUXUREAT_ACADEMY_DATA: {articles: registry}, LUXUREAT_ARTICLE_DATA: {articles: registry},
    LUXUREAT_CMS: {blog: JSON.parse('{"__proto__:en":{"title":"polluted"}}')},
  }, document: {currentScript:{src:'https://luxureat.cn/assets/js/academy.js'},
    createElement:()=>({}), body:{appendChild:script=>script.onload()}},
  });
  vm.runInContext(source, context);
  assert.equal(Object.prototype.title, undefined);
  for (const id of ['__proto__','constructor','../../test','en-academy-missing']) {
    assert.equal(await vm.runInContext(`loadAcademyArticle(${JSON.stringify(id)})`,context), false);
  }
  registry['zh-academy-valid'] = {sections:[]};
  assert.equal(await vm.runInContext('loadAcademyArticle("zh-academy-valid")',context), true);
  const builder=fs.readFileSync('scripts/build-luxureat-theme.mjs','utf8');
  const pathExpression=builder.match(/articleAsset\(src\)\.replace\([^\n]+?'\)/)[0];
  for(const src of ['../assets/video.mp4','../../assets/video.mp4']) {
    assert.equal(vm.runInNewContext(pathExpression,{src,articleAsset:x=>x}),'/assets/video.mp4');
  }
  const dataContext={window:{},URL,document:{currentScript:{src:'https://luxureat.cn/assets/data/products.js'}}};
  vm.runInNewContext(fs.readFileSync('assets/data/products.js','utf8'),dataContext);
  const data=dataContext.window.LUXUREAT_PRODUCT_DATA.products;
  assert(data, 'Product registry missing');
  const recommendationCode=fs.readFileSync('assets/js/products.js','utf8').match(/const recommendations = ([\s\S]+?)\.map\(\(\{ key, item \}\) => \[key, item\]\);/)[0];
  for(const [id,product] of Object.entries(data).filter(([,p])=>p.series==='TrufflElixir')) {
    const result=vm.runInNewContext(`${recommendationCode}\nrecommendations`,{products:data,product,id,prefix:id.slice(0,3), productFamily:x=>x,productUse:()=>''});
    assert.equal(result.slice(0,5).filter(([,p])=>p.series==='TrufflElixir').length,5,id);
    assert(!result.some(([key])=>key===id));
  }
  for(const lang of ['zh','en']) {
    const html=fs.readFileSync(`${lang}/index.html`,'utf8');
    assert.equal((html.match(/<div class="lux-market-feature" role="button"/g)||[]).length,4);
    assert(!/<article[^>]*role="button"[^>]*data-market-slide-to/.test(html));
  }
  console.log('Elixir recommendations, safe article IDs, media paths and homepage semantics passed.');
})().catch(error=>{console.error(error);process.exitCode=1});
