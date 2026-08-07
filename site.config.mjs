export const assetVersion = "20260804-unified-zh-fonts-153";

export const contact = {
  email: "china@luxureat.com",
  secondaryEmail: "roberto@ugolinigroup.com",
  phone: "+86 15721452475",
  phoneHref: "+8615721452475",
};

export const navigation = [
  { key: "home", zh: "首页", en: "Home", zhSlug: "index", enSlug: "index" },
  { key: "journal", zh: "关于我们", en: "About Us", zhSlug: "journal", enSlug: "journal" },
  { key: "products", zh: "系列产品", en: "Products", zhSlug: "caviar", enSlug: "products" },
  { key: "rituals", zh: "食谱艺术", en: "Recipe Art", zhSlug: "rituals", enSlug: "rituals" },
  { key: "news", zh: "品牌新闻", en: "Brand News", zhSlug: "news", enSlug: "news" },
  { key: "blog", zh: "知识博客", en: "Blog", zhSlug: "blog", enSlug: "blog" },
  { key: "certification", zh: "品质认证", en: "Certification", zhSlug: "certification", enSlug: "certification" },
  { key: "gifting", zh: "商务合作", en: "Cooperation", zhSlug: "gifting", enSlug: "gifting" },
  { key: "contact", zh: "联系我们", en: "Contact", zhSlug: "contact", enSlug: "contact" },
];

const page = (lang, slug, key, scripts) => ({
  lang,
  slug,
  key,
  file: `${lang}/${slug}.html`,
  route: slug === "index" ? lang : `${lang}/${slug}`,
  scripts: ["core", ...scripts],
});

export const pages = [
  page("zh", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("zh", "journal", "journal", ["journal-data", "journal"]),
  page("zh", "caviar", "products", ["product-data", "products"]),
  page("zh", "rituals", "rituals", ["journal-data", "journal"]),
  page("zh", "news", "news", ["event-data", "journal-data", "journal"]),
  page("zh", "blog", "blog", ["journal-data", "academy-data", "academy", "journal"]),
  page("zh", "certification", "certification", []),
  page("zh", "gifting", "gifting", ["brand-data", "brand"]),
  page("zh", "contact", "contact", ["brand-data", "brand"]),
  page("zh", "bag", "bag", ["product-data", "products"]),
  page("en", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("en", "journal", "journal", ["journal-data", "journal"]),
  page("en", "products", "products", ["product-data", "products"]),
  page("en", "rituals", "rituals", ["journal-data", "journal"]),
  page("en", "news", "news", ["event-data", "journal-data", "journal"]),
  page("en", "blog", "blog", ["journal-data", "academy-data", "academy", "journal"]),
  page("en", "certification", "certification", []),
  page("en", "gifting", "gifting", ["brand-data", "brand"]),
  page("en", "contact", "contact", ["brand-data", "brand"]),
  page("en", "bag", "bag", ["product-data", "products"]),
];

export const seo = {
  "zh:index": {
    title: "LuxurEat 露意膳｜意大利松露、鱼子酱与高端食品",
    description: "LuxurEat（露意膳）连接意大利优质食材与中国市场，精选松露、鱼子酱及高端食品，并提供餐饮、渠道与品牌合作方案。",
  },
  "zh:journal": {
    title: "关于 LuxurEat 露意膳｜品牌、全球网络与专业经验",
    description: "了解 LuxurEat（露意膳）的品牌背景、意大利美食专业经验、全球业务网络，以及面向中国与国际市场的长期合作理念。",
  },
  "zh:caviar": {
    title: "意大利松露、鱼子酱与高端食品｜LuxurEat 露意膳",
    description: "浏览 LuxurEat（露意膳）精选松露、鱼子酱与意大利高端食品，面向高端零售、酒店餐饮、礼赠与专业渠道。",
  },
  "zh:rituals": {
    title: "意大利食谱与餐饮灵感｜LuxurEat 露意膳",
    description: "探索松露、鱼子酱及意大利高端食材的食谱、搭配方式与餐饮应用灵感，让专业食材自然进入不同用餐场景。",
  },
  "zh:news": {
    title: "品牌新闻与全球展会动态｜LuxurEat 露意膳",
    description: "查看 LuxurEat（露意膳）的品牌新闻、国际展会、市场活动与合作动态，了解我们在中国及全球市场的最新进展。",
  },
  "zh:blog": {
    title: "意大利美食知识博客｜LuxurEat 露意膳",
    description: "阅读关于意大利食材、产区、橄榄油、Gelato、营养与美食文化的知识内容，建立从产地到餐桌的专业理解。",
  },
  "zh:certification": {
    title: "品质认证与食品合规｜LuxurEat 露意膳",
    description: "了解 LuxurEat（露意膳）关注的食品品质、安全、认证与合规标准，以及面向中国和国际市场的专业保障。",
  },
  "zh:gifting": {
    title: "商务合作、经销与定制方案｜LuxurEat 露意膳",
    description: "LuxurEat（露意膳）面向经销商、酒店餐饮、零售与企业客户提供渠道合作、自有品牌、OEM、礼赠及定制解决方案。",
  },
  "zh:contact": {
    title: "联系 LuxurEat 露意膳｜中国与全球合作咨询",
    description: "联系 LuxurEat（露意膳）中国团队，咨询产品采购、经销合作、酒店餐饮供应、自有品牌、企业礼赠及品牌合作。",
  },
  "en:index": {
    title: "LuxurEat | Italian Truffles, Caviar & Premium Foods",
    description: "LuxurEat connects premium Italian gastronomy with China and global markets, offering curated truffles, caviar, fine foods and professional partnership solutions.",
  },
  "en:journal": {
    title: "About LuxurEat | Brand, Global Network & Expertise",
    description: "Discover LuxurEat's background, Italian food expertise, global network and long-term approach to premium gastronomy and international partnerships.",
  },
  "en:products": {
    title: "Italian Truffles, Caviar & Premium Foods | LuxurEat",
    description: "Explore LuxurEat's curated selection of truffles, caviar and premium Italian foods for retail, hospitality, gifting and professional distribution.",
  },
  "en:rituals": {
    title: "Italian Recipes & Culinary Inspiration | LuxurEat",
    description: "Explore recipes, pairings and culinary ideas for truffles, caviar and premium Italian ingredients across home, hospitality and professional dining occasions.",
  },
  "en:news": {
    title: "Brand News & Global Events | LuxurEat",
    description: "Follow LuxurEat brand news, international exhibitions, market activities and partnership updates across China and global markets.",
  },
  "en:blog": {
    title: "Italian Food Knowledge & Culture | LuxurEat",
    description: "Read about Italian ingredients, regions, olive oil, gelato, nutrition and food culture, from origin and production to tasting and everyday use.",
  },
  "en:certification": {
    title: "Quality, Certification & Food Compliance | LuxurEat",
    description: "Learn about the quality, food safety, certification and compliance principles supporting LuxurEat products and international market operations.",
  },
  "en:gifting": {
    title: "Distribution, Private Label & Business Partnerships | LuxurEat",
    description: "Explore LuxurEat distribution, hospitality supply, private label, OEM, corporate gifting and tailored partnership solutions for professional clients.",
  },
  "en:contact": {
    title: "Contact LuxurEat | China & Global Partnerships",
    description: "Contact LuxurEat for product purchasing, distribution, hospitality supply, private label, corporate gifting and brand partnership enquiries.",
  },
};

export const scripts = {
  "product-data": { src: "assets/data/products.js", dependencies: [] },
  "event-data": { src: "assets/data/events.js", dependencies: [] },
  "journal-data": { src: "assets/data/journal.js", dependencies: [] },
  "academy-data": { src: "assets/data/academy.js", dependencies: ["journal-data"] },
  "brand-data": { src: "assets/data/brand.js", dependencies: [] },
  core: { src: "assets/js/core.js", dependencies: [] },
  products: { src: "assets/js/products.js", dependencies: ["product-data"] },
  events: { src: "assets/js/events.js", dependencies: ["event-data"] },
  journal: { src: "assets/js/journal.js", dependencies: ["journal-data"] },
  academy: { src: "assets/js/academy.js", dependencies: ["academy-data"] },
  brand: { src: "assets/js/brand.js", dependencies: ["brand-data"] },
};

export const footer = {
  zh: {
    description: "不止于进口，更致力于定义意大利高端美食在中国的新标准。<br>LuxurEat（露意膳）以正宗风味为根，以品质与安全为准则，将意大利饮食文化与创新体验带到中国。",
    copyright: "© 2026 LuxurEat（露意膳）｜露意膳（上海）贸易有限公司 版权所有 ｜ 统一社会信用代码：91310000MAERED2X1W",
    legal: [["privacy", "隐私政策"], ["terms", "销售条款"], ["shipping", "配送说明"]],
  },
  en: {
    description: "Beyond importing, we are committed to defining a new standard for premium Italian gastronomy in China.<br>Rooted in authentic flavor and guided by quality and safety, LuxurEat (露意膳) brings Italian food culture and innovative experiences to China.",

    copyright: "© 2026 LuxurEat (露意膳)｜Luxureat (Shanghai) Trading Co., Ltd. All Rights Reserved ｜ Unified Social Credit Code: 91310000MAERED2X1W",
    legal: [
      ["privacy", "Privacy Policy"], ["terms", "Terms of Sale"], ["shipping", "Shipping"]
    ],
  },
};
