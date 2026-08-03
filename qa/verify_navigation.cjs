const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const lang of ["zh", "en"]) {
  const directory = path.join(root, lang);
  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(directory, file), "utf8");
    const header = html.match(/<nav class="lux-nav"[\s\S]*?<\/nav>/)?.[0] || "";
    const newsLabel = lang === "zh" ? "品牌新闻" : "Brand News";
    const blogLabel = lang === "zh" ? "知识博客" : "Blog";
    const recipeLabel = lang === "zh" ? "食谱艺术" : "Recipe Art";
    const aboutLabel = lang === "zh" ? "关于我们" : "About Us";
    const certificationLabel = lang === "zh" ? "品质认证" : "Certification";
    assert((header.match(/<a\b/g) || []).length === 9, `${lang}/${file} does not have the aligned nine-page navigation`);
    assert(header.includes(`href="news.html">${newsLabel}</a>`), `${lang}/${file} is missing Brand News navigation`);
    assert(new RegExp(`(?:class="active" )?href="blog\\.html">${blogLabel}</a>`).test(header), `${lang}/${file} is missing Blog navigation`);
    assert(header.includes(`href="rituals.html">${recipeLabel}</a>`), `${lang}/${file} has the wrong Recipe Art label`);
    assert(header.includes(`href="journal.html">${aboutLabel}</a>`), `${lang}/${file} has the wrong About Us label`);
    assert(header.includes(`href="certification.html">${certificationLabel}</a>`) || header.includes(`href="certification.html" class="active">${certificationLabel}</a>`) || header.includes(`class="active" href="certification.html">${certificationLabel}</a>`), `${lang}/${file} is missing certification navigation`);
    assert(header.indexOf('href="journal.html"') > header.indexOf('href="index.html"') && header.indexOf('href="journal.html"') < header.indexOf('href="rituals.html"'), `${lang}/${file} does not place About Us directly after Home`);
    assert(header.indexOf('href="blog.html"') > header.indexOf('href="news.html"') && header.indexOf('href="blog.html"') < header.indexOf('href="certification.html"'), `${lang}/${file} does not place Blog directly after Brand News`);
    assert(!html.includes(lang === "zh" ? "品鉴艺术" : ">Rituals<"), `${lang}/${file} still contains the old ritual label`);
    assert(!html.includes(lang === "zh" ? ">品牌志<" : ">Journal<"), `${lang}/${file} still contains the old About Us label`);

    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:|javascript:)/.test(href) || href === "#") continue;
      const [rawPath, fragment = ""] = href.split("#");
      const cleanPath = rawPath.split("?")[0];
      const target = path.resolve(directory, cleanPath || file);
      assert(fs.existsSync(target), `${lang}/${file} links to missing target ${href}`);
      if (!fragment || /^(?:archive|product-|reader-|event-)/.test(fragment)) continue;
      const targetHtml = fs.readFileSync(target, "utf8");
      assert(new RegExp(`(?:id|name)=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`).test(targetHtml), `${lang}/${file} links to missing anchor ${href}`);
    }
  }
}

const journalData = fs.readFileSync(path.join(root, "assets/data/journal.js"), "utf8");
const productData = fs.readFileSync(path.join(root, "assets/data/products.js"), "utf8");
for (const lang of ["zh", "en"]) {
  const directory = path.join(root, lang);
  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(directory, file), "utf8");
    for (const [, id] of html.matchAll(/data-reader-open=["']([^"']+)["']/g)) assert(journalData.includes(`"${id}":`), `${lang}/${file} references missing reader ${id}`);
    for (const [, id] of html.matchAll(/data-product-open=["']([^"']+)["']/g)) assert(productData.includes(`"${id.replace(/^(?:zh|en)-/, "")}"`), `${lang}/${file} references missing product ${id}`);
  }
}

assert(fs.existsSync(path.join(root, "zh/news.html")), "Chinese Brand News page is missing");
assert(fs.existsSync(path.join(root, "en/news.html")), "English Brand News page is missing");
assert(fs.existsSync(path.join(root, "zh/blog.html")), "Chinese Blog page is missing");
assert(fs.existsSync(path.join(root, "en/blog.html")), "English Blog page is missing");
assert(fs.existsSync(path.join(root, "en/certification.html")), "English certification page is missing");
assert(!fs.existsSync(path.join(root, "en/caviar.html")), "duplicate English caviar page still exists");
assert(!fs.existsSync(path.join(root, "en/private.html")), "extra English private-selection page still exists");
const core = fs.readFileSync(path.join(root, "assets/js/core.js"), "utf8");
assert(core.includes('className = "lux-nav-flyout"'), "flyout navigation is missing");
assert(core.includes('["certification.html", "Certification"'), "English and Chinese navigation are not aligned");
assert(core.includes('["blog.html", "知识博客", [["鱼子酱学院", "caviar-academy"]]'), "Chinese Blog submenu is incorrect");
assert(core.includes('["blog.html", "Blog", [["Caviar Academy", "caviar-academy"]]'), "English Blog submenu is incorrect");
assert(core.includes('["gifting.html", "商务合作", [["国际市场定制", "private-label"], ["合作案例", "partnership-cases"]'), "Chinese cooperation submenu is incorrect");
assert(core.includes('["journal.html", "关于我们", [["关于我们", "about-us"], ["品牌传承", "featured"], ["时令随笔", "seasonal-notes"]]'), "Chinese About Us submenu is incorrect");
assert(core.includes('["contact.html", "联系我们", [["品牌咨询", "brand-consultation"], ["全球足迹", "global-footprint"]]'), "Chinese contact submenu is incorrect");
assert(core.includes('body > section h2'), "navigation does not scan top-level section headings");

const submenuTargets = {
  zh: {
    "index.html": ["meet-us", "selected-products", "maison-overview", "market-system", "brand-timeline", "gifting-editorial"],
    "journal.html": ["about-us", "featured", "seasonal-notes"],
    "caviar.html": ["product-catalogue"],
    "rituals.html": ["breakfast", "first-courses", "main-courses", "desserts"],
    "news.html": ["recent-events", "exhibition-map", "news-center"],
    "blog.html": ["caviar-academy"],
    "certification.html": ["responsible-trade", "quality-system", "certification-system", "certification-glossary"],
    "gifting.html": ["private-label", "partnership-cases", "business-partnership", "china-partnership", "inquiry"],
    "contact.html": ["brand-consultation", "global-footprint"],
  },
  en: {
    "index.html": ["meet-us", "selected-products", "maison-overview", "market-system", "brand-timeline", "gifting-editorial"],
    "journal.html": ["about-us", "featured", "seasonal-notes"],
    "products.html": ["product-catalogue"],
    "rituals.html": ["breakfast", "first-courses", "main-courses", "desserts"],
    "news.html": ["recent-events", "exhibition-map", "news-center"],
    "blog.html": ["caviar-academy"],
    "certification.html": ["responsible-trade", "quality-system", "certification-system", "certification-glossary"],
    "gifting.html": ["private-label", "partnership-cases", "business-partnership", "china-partnership", "inquiry"],
    "contact.html": ["brand-consultation", "global-footprint"],
  },
};
for (const [lang, pages] of Object.entries(submenuTargets)) {
  for (const [file, targets] of Object.entries(pages)) {
    const html = fs.readFileSync(path.join(root, lang, file), "utf8");
    targets.forEach((target) => assert(new RegExp(`\\bid=["']${target}["']`).test(html), `${lang}/${file} is missing submenu target #${target}`));
    targets.forEach((target) => assert(core.includes(`"${target}"`), `navigation config is missing #${target}`));
  }
}
console.log("navigation verification passed");
