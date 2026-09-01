const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "luxureat-seo-"));
const sitemapFile = path.join(temporary, "sitemap.xml");

try {
  execFileSync(process.execPath, [path.join(root, "tools/generate-sitemap.mjs"), sitemapFile]);
  const sitemap = fs.readFileSync(sitemapFile, "utf8");
  assert.equal((sitemap.match(/<url>/g) || []).length, 24, "sitemap must contain the 24 public bilingual pages");
  assert.doesNotMatch(sitemap, /\/bag\//, "shopping bags must not be indexed");
  for (const language of ["zh-CN", "en", "x-default"]) {
    assert.equal((sitemap.match(new RegExp(`hreflang="${language}"`, "g")) || []).length, 24, `${language} alternates are incomplete`);
  }

  const robots = read("robots.txt");
  assert.match(robots, /^User-agent: \*$/m);
  assert.equal((robots.match(/^User-agent: \*$/gm) || []).length, 1, "wildcard crawler group must be unique for Baidu compatibility");
  assert.doesNotMatch(robots, /^Allow: \/$/m, "default crawl access does not need a redundant Allow rule");
  assert.match(robots, /Allow: \/wp-admin\/admin-ajax\.php/);
  assert.doesNotMatch(robots, /Disallow: \/(?:en\/)?(?:bag|cart|checkout|my-account)\//, "Google must crawl utility pages to see their noindex directive");
  assert.match(robots, /Sitemap: https:\/\/luxureat\.cn\/sitemap\.xml/);
  assert.doesNotMatch(robots, /Disallow: \/assets\//, "search engines need access to render assets");

  const llms = read("llms.txt");
  assert.match(llms, /^# LuxurEat \(露意膳\) Group$/m);
  assert.match(llms, /^> .+/m);
  assert.match(llms, /^## Chinese$/m);
  assert.match(llms, /^## English$/m);
  assert.match(llms, /\[Products\]\(https:\/\/luxureat\.cn\/en\/product\/\)/);
  assert.doesNotMatch(llms, /^(?!- \[[^\]]+\]\(https:\/\/luxureat\.cn\/)[^\n]*https:\/\/luxureat\.cn\//m, "site links must use llms.txt Markdown list format");

  for (const language of ["zh", "en"]) {
    const bag = read(`${language}/bag.html`);
    assert.equal((bag.match(/<meta name="robots" content="noindex,follow">/g) || []).length, 1, `${language} bag needs one noindex directive`);
  }
  for (const language of ["zh", "en"]) {
    for (const name of fs.readdirSync(path.join(root, language)).filter((file) => file.endsWith(".html"))) {
      const html = read(`${language}/${name}`);
      assert.equal((html.match(/<title>/g) || []).length, 1, `${language}/${name} needs one title`);
      assert.equal((html.match(/<meta name="description"/g) || []).length, 1, `${language}/${name} needs one description`);
      const visibleText = (html.split(/<body\b[^>]*>/i)[1] || "")
        .split("</body>")[0]
        .replace(/<[^>]+>/g, " ");
      assert.doesNotMatch(visibleText, /\bmaison\b/i, `${language}/${name} still exposes Maison to visitors or search engines`);
    }
  }
  assert.match(read("zh/index.html"), /<title>LuxurEat（露意膳）Group/);
  assert.match(read("en/index.html"), /<title>LuxurEat Group/);
  assert.ok(!fs.existsSync(path.join(root, "tools/generate-static-seo.mjs")), "obsolete duplicate SEO generator remains");
  assert.ok(!fs.existsSync(path.join(root, ".github/workflows/preserve-static-seo.yml")), "obsolete duplicate SEO workflow remains");
  assert.ok(!fs.existsSync(path.join(root, ".github/workflows/preserve-search-url-guard.yml")), "obsolete guard injection workflow remains");
  assert.ok(!fs.existsSync(path.join(root, ".github/workflows/publish-google-verification.yml")), "obsolete search metadata injection workflow remains");
  assert.ok(!fs.existsSync(path.join(root, "wordpress-snippets/search-url-guard.php.fragment")), "obsolete detached URL guard remains");
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}

console.log("SEO, hreflang, sitemap and robots checks passed.");
