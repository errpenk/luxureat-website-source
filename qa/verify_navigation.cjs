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
    assert((html.match(/<title>/g) || []).length === 1, `${lang}/${file} must have exactly one title`);
    assert((html.match(/<meta name="description"/g) || []).length === 1, `${lang}/${file} must have exactly one description`);
    assert(html.includes("<!-- lux:seo:start -->") && html.includes("<!-- lux:seo:end -->"), `${lang}/${file} is missing the managed SEO block`);
    const header = html.match(/<nav class="lux-nav"[\s\S]*?<\/nav>/)?.[0] || "";
    const newsLabel = lang === "zh" ? "品牌新闻" : "Brand News";
    const blogLabel = lang === "zh" ? "知识博客" : "Blog";
    const recipeLabel = lang === "zh" ? "食谱艺术" : "Recipe Art";
    const aboutLabel = lang === "zh" ? "关于我们" : "About Us";
    const certificationLabel = lang === "zh" ? "品质认证" : "Certification";
    const productHref = 'href="product.html"';
    assert((header.match(/<a\b/g) || []).length === 10, `${lang}/${file} does not have the aligned ten-page navigation`);
    assert(header.includes(`href="brand.html">${newsLabel}</a>`), `${lang}/${file} is missing Brand News navigation`);
    assert(new RegExp(`(?:class="active" )?href="blog\\.html">${blogLabel}</a>`).test(header), `${lang}/${file} is missing Blog navigation`);
    assert(header.includes(`href="recipe.html">${recipeLabel}</a>`), `${lang}/${file} has the wrong Recipe Art label`);
    assert(header.includes(`href="about-us.html">${aboutLabel}</a>`), `${lang}/${file} has the wrong About Us label`);
    assert(header.includes(`href="certification.html">${certificationLabel}</a>`) || header.includes(`href="certification.html" class="active">${certificationLabel}</a>`) || header.includes(`class="active" href="certification.html">${certificationLabel}</a>`), `${lang}/${file} is missing certification navigation`);
    assert(header.indexOf('href="about-us.html"') > header.indexOf('href="index.html"') && header.indexOf('href="about-us.html"') < header.indexOf('href="recipe.html"'), `${lang}/${file} does not place About Us directly after Home`);
    assert(header.indexOf('href="new.html"') > header.indexOf('href="about-us.html"') && header.indexOf('href="new.html"') < header.indexOf(productHref), `${lang}/${file} does not place New Arrivals before Products`);
    assert(header.indexOf('href="blog.html"') > header.indexOf('href="brand.html"') && header.indexOf('href="blog.html"') < header.indexOf('href="certification.html"'), `${lang}/${file} does not place Blog directly after Brand News`);
    assert(!html.includes(lang === "zh" ? "品鉴艺术" : ">Rituals<"), `${lang}/${file} still contains the old ritual label`);
    assert(!html.includes(lang === "zh" ? ">品牌志<" : ">Journal<"), `${lang}/${file} still contains the old About Us label`);

    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const href = match[1];
      if (/^(?:https?:|mailto:|tel:|javascript:)/.test(href) || href === "#") continue;
      const [rawPath, fragment = ""] = href.split("#");
      if (rawPath.includes("?")) {
        assert(/^product\.html\?category=[a-z0-9-]+$/.test(rawPath), `${lang}/${file} uses an unsupported public query link ${href}`);
      }
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
const journalRuntime = fs.readFileSync(path.join(root, "assets/js/journal.js"), "utf8");
const productRuntime = fs.readFileSync(path.join(root, "assets/js/products.js"), "utf8");
const coreRuntime = fs.readFileSync(path.join(root, "assets/js/core.js"), "utf8");
const integrationCss = fs.readFileSync(path.join(root, "integration.css"), "utf8");
const academyIndex = fs.readFileSync(path.join(root, "assets/data/academy-index.js"), "utf8");
const linkedRuntimes = `${journalRuntime}\n${productRuntime}`;
const directRecipeSlugs = [...linkedRuntimes.matchAll(/recipe\.html\?recipe=([a-z0-9-]+)/g)].map(([, slug]) => slug);
const helperRecipeSlugs = [...linkedRuntimes.matchAll(/recipeLink\("([a-z0-9-]+)"/g)].map(([, slug]) => slug);
const productRecipeSlugs = [...productRuntime.matchAll(/recipeRef\("([a-z0-9-]+)"/g)].map(([, slug]) => slug);
const productGuideSlugs = [...productRuntime.matchAll(/guideRef\("([a-z0-9-]+)"/g)].map(([, slug]) => slug);
const recipeLinkSlugs = [...directRecipeSlugs, ...helperRecipeSlugs, ...productRecipeSlugs];
for (const slug of recipeLinkSlugs) {
  for (const lang of ["zh", "en"]) assert(journalData.includes(`"${lang}-recipe-${slug}":`) || journalData.includes(`addDocumentedRecipe("${slug}"`), `mapped ${lang} recipe is missing: ${slug}`);
}
const directGuideSlugs = [...linkedRuntimes.matchAll(/blog\.html\?article=([a-z0-9-]+)/g)].map(([, slug]) => slug);
const helperGuideSlugs = [...linkedRuntimes.matchAll(/guideLink\("([a-z0-9-]+)"/g)].map(([, slug]) => slug);
const guideLinkSlugs = [...directGuideSlugs, ...helperGuideSlugs, ...productGuideSlugs];
for (const slug of guideLinkSlugs) {
  assert((academyIndex.match(new RegExp(`"slug":"${slug}"`, "g")) || []).length >= 2, `mapped bilingual article is missing: ${slug}`);
}
for (const [, slug] of linkedRuntimes.matchAll(/product\.html\?product=([a-z0-9-]+)/g)) {
  assert(productData.includes(`["${slug}",`), `mapped product is missing: ${slug}`);
}
const academySlugs = new Set([...academyIndex.matchAll(/"slug":"([a-z0-9-]+)"/g)].map(([, slug]) => slug));
const articleMapBlock = journalRuntime.match(/const articleContentLinks = \{([\s\S]*?)\n  \};\n  const knowledgeForRecipe/)?.[1] || "";
const mappedArticleSlugs = new Set([...articleMapBlock.matchAll(/^\s+"([a-z0-9-]+)": \[/gm)].map(([, slug]) => slug));
assert(mappedArticleSlugs.size === academySlugs.size && [...academySlugs].every((slug) => mappedArticleSlugs.has(slug)), "the 66 knowledge articles do not each have a curated internal-link mapping");
assert(new Set(recipeLinkSlugs).size >= 10, "internal recipe links are not sufficiently varied");
assert(new Set(guideLinkSlugs).size >= 10, "internal guide links are not sufficiently varied");
assert(new Set(productRecipeSlugs).size >= 8, "product-to-recipe links are not sufficiently varied");
assert(new Set(productGuideSlugs).size >= 4, "product-to-guide links are not sufficiently varied");
assert(productRuntime.includes("content.links.map"), "product links are still constrained to one recipe and one guide");
assert(journalRuntime.includes("relatedKnowledge.map") && journalRuntime.includes("const secondaryArticleLinks = articleLinks.slice(1)"), "recipe or article links are still constrained to one related item");
assert(journalRuntime.includes("item?.href === link.href"), "optional article CTAs are not safely deduplicated");
assert(journalRuntime.includes('class="lux-reader-article-links"') && journalRuntime.includes('class="lux-recipe-product-link"'), "knowledge article links do not reuse the shared internal-link interaction style");
assert(integrationCss.includes(".lux-reader-article-links { display: flex; flex-direction: column;"), "knowledge article links are not displayed one per line");
assert(productRuntime.includes("productFamily") && productRuntime.includes("productUse") && productRuntime.includes(".sort((a, b) => b.score - a.score"), "product recommendations are not deterministically ranked by relevance");
assert(journalRuntime.includes('data-lux-cta-location="article-body"') && journalRuntime.includes('data-lux-cta-location="recipe-details"'), "contextual article or recipe links are missing");
assert(journalRuntime.includes("safeDetailHref") && journalRuntime.includes('detailHref("recipe"') && productRuntime.includes('detailHref("recipe"'), "contextual links still depend on WordPress-reserved query variables or static relative paths");
assert(coreRuntime.includes('luxGetCookieConsent() !== "analytics"') && coreRuntime.includes('window.luxTrack("cta_click"'), "CTA analytics do not respect consent or emit the expected event");
assert(integrationCss.includes(".lux-cert-awards header p a:hover") && integrationCss.includes("outline: 1px solid #81d8d0"), "brand and industry partnership links do not share the site link interaction states");
assert(journalRuntime.includes('get("recipe")') && productRuntime.includes('get("product")'), "public recipe or product query route is not handled");
for (const lang of ["zh", "en"]) {
  const directory = path.join(root, lang);
  for (const file of fs.readdirSync(directory).filter((name) => name.endsWith(".html"))) {
    const html = fs.readFileSync(path.join(directory, file), "utf8");
    for (const [, id] of html.matchAll(/data-reader-open=["']([^"']+)["']/g)) {
      const generatedRecipe = id.match(/^(?:zh|en)-recipe-(.+)$/)?.[1];
      assert(journalData.includes(`"${id}":`) || (generatedRecipe && journalData.includes(`addDocumentedRecipe("${generatedRecipe}"`)), `${lang}/${file} references missing reader ${id}`);
    }
    for (const [, id] of html.matchAll(/data-product-open=["']([^"']+)["']/g)) assert(productData.includes(`"${id.replace(/^(?:zh|en)-/, "")}"`), `${lang}/${file} references missing product ${id}`);
  }
}

assert(fs.existsSync(path.join(root, "zh/brand.html")), "Chinese Brand News page is missing");
assert(fs.existsSync(path.join(root, "en/brand.html")), "English Brand News page is missing");
assert(fs.existsSync(path.join(root, "zh/blog.html")), "Chinese Blog page is missing");
assert(fs.existsSync(path.join(root, "en/blog.html")), "English Blog page is missing");
assert(fs.existsSync(path.join(root, "en/certification.html")), "English certification page is missing");
for (const lang of ["zh", "en"]) {
  for (const file of ["about-us.html", "product.html", "recipe.html", "brand.html", "cooperation.html"]) {
    assert(fs.existsSync(path.join(root, lang, file)), `${lang}/${file} is missing`);
  }
}
for (const file of ["journal.html", "caviar.html", "products.html", "rituals.html", "news.html", "gifting.html"]) {
  assert(!fs.existsSync(path.join(root, "zh", file)) && !fs.existsSync(path.join(root, "en", file)), `legacy static page ${file} still exists`);
}
assert(!fs.existsSync(path.join(root, "en/private.html")), "extra English private-selection page still exists");
const core = fs.readFileSync(path.join(root, "assets/js/core.js"), "utf8");
assert(core.includes('className = "lux-nav-flyout"'), "flyout navigation is missing");
assert(core.includes('["certification.html", "Certification"'), "English and Chinese navigation are not aligned");
assert(core.includes('["blog.html", "知识博客"') && core.includes('["探索意大利", "culture-academy"]') && core.includes('["营养与配料指南", "nutrition-guide"]'), "Chinese Blog topics are incomplete");
assert(!core.includes('["意大利美食学院", "?topic=academy"]') && !core.includes('["Italian Food Academy", "?topic=academy"]'), "Food Academy is still duplicated in Blog navigation");
assert(core.includes('["意式手工冰淇淋", "gelato-academy"]') && !core.includes('["意式 Gelato", "gelato-academy"]'), "Chinese Gelato academy label is not localized");
assert(core.includes('["blog.html", "Blog"') && core.includes('["Explore Italy", "culture-academy"]') && core.includes('["Nutrition & Ingredients", "nutrition-guide"]'), "English Blog topics are incomplete");
assert(core.includes('["cooperation.html", "商务合作", [["国际市场定制", "private-label"], ["合作案例", "partnership-cases"]'), "Chinese gifting submenu is incorrect");
assert(core.includes('["about-us.html", "关于我们", [["关于我们", "about-us"], ["品牌传承", "featured"], ["品牌承诺", "brand-promise"], ["时令随笔", "seasonal-notes"]]'), "Chinese About Us submenu is incorrect");
assert(core.includes('["contact.html", "联系我们", [["品牌咨询", "brand-consultation"], ["全球足迹", "global-footprint"]]'), "Chinese contact submenu is incorrect");
assert(core.includes('["食谱库", "recipe-library"]') && core.includes('["Recipe Library", "recipe-library"]'), "bilingual Recipe Library submenu is missing");
assert(core.includes('luxHeader?.classList.toggle("is-menu-open", open)') && core.includes('luxNav.querySelector(".lux-nav-item > a.active")?.closest(".lux-nav-item")'), "mobile navigation does not expose the current page submenu without :has support");
assert(core.includes('classList.toggle("is-scrolled", window.scrollY > 1)') && !core.includes('document.body.classList.contains("lux-home-page")'), "shared header does not react to the top scroll state on every page");
assert(core.includes('body > section h2'), "navigation does not scan top-level section headings");
assert(core.includes('luxureat_internal_return') && core.includes('luxReturnScroll') && core.includes('history.back()'), "internal content links do not preserve their source reading position");
assert(journalRuntime.includes('LuxureatReturnFromInternalLink') && productRuntime.includes('LuxureatReturnFromInternalLink'), "content detail close actions do not return to the source page");

const submenuTargets = {
  zh: {
    "index.html": ["meet-us", "selected-products", "italian-food-culture", "maison-overview", "market-system", "brand-timeline", "china-partnership", "partnership-process"],
    "about-us.html": ["about-us", "featured", "brand-promise", "seasonal-notes"],
    "product.html": ["product-catalogue"],
    "new.html": ["olive-oil", "pizza", "gelato"],
    "recipe.html": ["italian-flavor-recipes", "olive-recipes", "truffle-recipes", "healthy-light-recipes", "china-family-recipes", "recipe-library"],
    "brand.html": ["recent-events", "exhibition-map", "news-center"],
    "blog.html": [],
    "certification.html": ["responsible-trade", "quality-system", "certification-system", "award-proofs", "certification-glossary"],
    "cooperation.html": ["private-label", "partnership-cases", "business-partnership", "china-partnership", "inquiry"],
    "contact.html": ["brand-consultation", "global-footprint"],
  },
  en: {
    "index.html": ["meet-us", "selected-products", "italian-food-culture", "maison-overview", "market-system", "brand-timeline", "china-partnership", "partnership-process"],
    "about-us.html": ["about-us", "featured", "brand-promise", "seasonal-notes"],
    "product.html": ["product-catalogue"],
    "new.html": ["olive-oil", "pizza", "gelato"],
    "recipe.html": ["italian-flavor-recipes", "olive-recipes", "truffle-recipes", "healthy-light-recipes", "china-family-recipes", "recipe-library"],
    "brand.html": ["recent-events", "exhibition-map", "news-center"],
    "blog.html": [],
    "certification.html": ["responsible-trade", "quality-system", "certification-system", "award-proofs", "certification-glossary"],
    "cooperation.html": ["private-label", "partnership-cases", "business-partnership", "china-partnership", "inquiry"],
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
