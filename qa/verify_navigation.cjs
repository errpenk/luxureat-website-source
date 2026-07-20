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
    const recipeLabel = lang === "zh" ? "食谱艺术" : "Recipe Art";
    const aboutLabel = lang === "zh" ? "关于我们" : "About Us";
    const certificationLabel = lang === "zh" ? "品质认证" : "Certification";
    assert((header.match(/<a\b/g) || []).length === 8, `${lang}/${file} does not have the aligned eight-page navigation`);
    assert(header.includes(`href="news.html">${newsLabel}</a>`), `${lang}/${file} is missing Brand News navigation`);
    assert(header.includes(`href="rituals.html">${recipeLabel}</a>`), `${lang}/${file} has the wrong Recipe Art label`);
    assert(header.includes(`href="journal.html">${aboutLabel}</a>`), `${lang}/${file} has the wrong About Us label`);
    assert(header.includes(`href="certification.html">${certificationLabel}</a>`) || header.includes(`href="certification.html" class="active">${certificationLabel}</a>`) || header.includes(`class="active" href="certification.html">${certificationLabel}</a>`), `${lang}/${file} is missing certification navigation`);
    assert(header.indexOf('href="journal.html"') > header.indexOf('href="index.html"') && header.indexOf('href="journal.html"') < header.indexOf('href="rituals.html"'), `${lang}/${file} does not place About Us directly after Home`);
    assert(!html.includes(lang === "zh" ? "品鉴艺术" : ">Rituals<"), `${lang}/${file} still contains the old ritual label`);
    assert(!html.includes(lang === "zh" ? ">品牌志<" : ">Journal<"), `${lang}/${file} still contains the old About Us label`);
  }
}

assert(fs.existsSync(path.join(root, "zh/news.html")), "Chinese Brand News page is missing");
assert(fs.existsSync(path.join(root, "en/news.html")), "English Brand News page is missing");
assert(fs.existsSync(path.join(root, "en/certification.html")), "English certification page is missing");
assert(!fs.existsSync(path.join(root, "en/caviar.html")), "duplicate English caviar page still exists");
assert(!fs.existsSync(path.join(root, "en/private.html")), "extra English private-selection page still exists");
const core = fs.readFileSync(path.join(root, "assets/js/core.js"), "utf8");
assert(core.includes('className = "lux-nav-flyout"'), "flyout navigation is missing");
assert(core.includes('["certification.html", "Certification"'), "English and Chinese navigation are not aligned");
assert(core.includes('["gifting.html", "礼赠合作", [["国际市场定制", 2], ["合作案例", 3]'), "Chinese gifting submenu is incorrect");
assert(core.includes('["journal.html", "关于我们", [["关于我们", 1], ["品牌传承", 5]]'), "Chinese About Us submenu is incorrect");
assert(core.includes('["contact.html", "联系我们", [["品牌咨询", 2], ["全球足迹", 5]]'), "Chinese contact submenu is incorrect");
assert(core.includes('body > section h2'), "navigation does not scan top-level section headings");
console.log("navigation verification passed");
