export const assetVersion = "20260720-brand-suffix";

export const contact = {
  email: "china@luxureat.com",
  secondaryEmail: "roberto@truffleat.com",
  phone: "+86 15721452475",
  phoneHref: "+8615721452475",
};

export const navigation = [
  { key: "home", zh: "首页", en: "Home", zhSlug: "index", enSlug: "index" },
  { key: "journal", zh: "关于我们", en: "About Us", zhSlug: "journal", enSlug: "journal" },
  { key: "products", zh: "系列产品", en: "Products", zhSlug: "caviar", enSlug: "products" },
  { key: "rituals", zh: "食谱艺术", en: "Recipe Art", zhSlug: "rituals", enSlug: "rituals" },
  { key: "news", zh: "品牌新闻", en: "Brand News", zhSlug: "news", enSlug: "news" },
  { key: "certification", zh: "品质认证", en: "Certification", zhSlug: "certification", enSlug: "certification" },
  { key: "gifting", zh: "礼赠合作", en: "Gifting", zhSlug: "gifting", enSlug: "gifting" },
  { key: "contact", zh: "联系我们", en: "Contact", zhSlug: "contact", enSlug: "contact" },
];

const page = (lang, slug, key, scripts) => ({
  lang,
  slug,
  key,
  file: `${lang}/${slug}.html`,
  route: slug === "index" ? lang : `${lang}/${slug}`,
  scripts: [...scripts, "core"],
});

export const pages = [
  page("zh", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("zh", "journal", "journal", ["journal-data", "journal"]),
  page("zh", "caviar", "products", ["product-data", "products"]),
  page("zh", "rituals", "rituals", ["journal-data", "journal"]),
  page("zh", "news", "news", ["event-data", "journal-data", "journal"]),
  page("zh", "certification", "certification", []),
  page("zh", "gifting", "gifting", ["brand-data", "brand"]),
  page("zh", "contact", "contact", ["brand-data", "brand"]),
  page("zh", "bag", "bag", ["product-data", "products"]),
  page("en", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("en", "journal", "journal", ["journal-data", "journal"]),
  page("en", "products", "products", ["product-data", "products"]),
  page("en", "rituals", "rituals", ["journal-data", "journal"]),
  page("en", "news", "news", ["event-data", "journal-data", "journal"]),
  page("en", "certification", "certification", []),
  page("en", "gifting", "gifting", ["brand-data", "brand"]),
  page("en", "contact", "contact", ["brand-data", "brand"]),
  page("en", "bag", "bag", ["product-data", "products"]),
];

export const scripts = {
  "product-data": { src: "assets/data/products.js", dependencies: [] },
  "event-data": { src: "assets/data/events.js", dependencies: [] },
  "journal-data": { src: "assets/data/journal.js", dependencies: [] },
  "brand-data": { src: "assets/data/brand.js", dependencies: [] },
  core: { src: "assets/js/core.js", dependencies: [] },
  products: { src: "assets/js/products.js", dependencies: ["product-data"] },
  events: { src: "assets/js/events.js", dependencies: ["event-data"] },
  journal: { src: "assets/js/journal.js", dependencies: ["journal-data"] },
  brand: { src: "assets/js/brand.js", dependencies: ["brand-data"] },
};

export const footer = {
  zh: {
    description: "不止于进口，更致力于定义意大利高端美食在中国的新标准。<br>LuxurEat China（露意膳）以正宗风味为根，以品质与安全为准则，将意大利饮食文化与创新体验带到中国。",
    copyright: "2026 LUXUREAT CHINA（露意膳）｜ 91310000MAERED2X1W",
    legal: [["privacy", "隐私政策"], ["terms", "销售条款"], ["shipping", "配送说明"]],
  },
  en: {
    description: "Beyond importing, we are committed to defining a new standard for premium Italian gastronomy in China.<br>Rooted in authentic flavor and guided by quality and safety, LuxurEat China（露意膳） brings Italian food culture and innovative experiences to China.",

    copyright: "2026 LUXUREAT CHINA（露意膳）｜ 91310000MAERED2X1W",
    legal: [
      ["privacy", "Privacy Policy"], ["terms", "Terms of Sale"], ["shipping", "Shipping"]
    ],
  },
};
