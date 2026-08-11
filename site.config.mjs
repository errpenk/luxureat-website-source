export const assetVersion = "20260811-font-coverage-seo-32";

export const contact = {
  email: "china@luxureat.com",
  secondaryEmail: "roberto@ugolinigroup.com",
  phone: "+86 15721452475",
  phoneHref: "+8615721452475",
};

export const navigation = [
  { key: "home", zh: "首页", en: "Home", zhSlug: "index", enSlug: "index" },
  { key: "journal", zh: "关于我们", en: "About Us", zhSlug: "about-us", enSlug: "about-us" },
  { key: "new", zh: "热门新品", en: "New Arrivals", zhSlug: "new", enSlug: "new" },
  { key: "products", zh: "系列产品", en: "Products", zhSlug: "product", enSlug: "product" },
  { key: "rituals", zh: "食谱艺术", en: "Recipe Art", zhSlug: "recipe", enSlug: "recipe" },
  { key: "news", zh: "品牌新闻", en: "Brand News", zhSlug: "brand", enSlug: "brand" },
  { key: "blog", zh: "知识博客", en: "Blog", zhSlug: "blog", enSlug: "blog" },
  { key: "certification", zh: "品质认证", en: "Certification", zhSlug: "certification", enSlug: "certification" },
  { key: "gifting", zh: "商务合作", en: "Cooperation", zhSlug: "cooperation", enSlug: "cooperation" },
  { key: "contact", zh: "联系我们", en: "Contact", zhSlug: "contact", enSlug: "contact" },
];

export const seo = {
  zh: {
    home: ["LuxurEat（露意膳） | 意大利高端美食与品牌合作", "LuxurEat（露意膳）专注意大利高端美食、地道风味与中国市场合作，提供产品、食谱、品牌内容与专业服务。"],
    journal: ["关于我们 | LuxurEat（露意膳）", "了解 LuxurEat（露意膳）的品牌传承、产地故事、品质承诺与时令观察。"],
    new: ["热门新品 | LuxurEat（露意膳）", "发现 LuxurEat（露意膳）的意大利橄榄油、披萨与意式手工冰淇淋等热门新品。"],
    products: ["系列产品 | LuxurEat（露意膳）", "浏览 LuxurEat（露意膳）精选意大利高端美食与松露、鱼子酱等系列产品。"],
    rituals: ["食谱艺术 | LuxurEat（露意膳）", "从意大利地域风味到家庭餐桌，探索 LuxurEat（露意膳）的中英文食谱与烹饪灵感。"],
    news: ["品牌新闻 | LuxurEat（露意膳）", "查看 LuxurEat（露意膳）最新品牌活动、行业展会、合作动态与现场故事。"],
    blog: ["知识博客 | LuxurEat（露意膳）", "系统探索松露学院、意大利美食词典、生产者与产地故事，以及鱼子酱、橄榄油等意大利食材知识。"],
    certification: ["品质认证 | LuxurEat（露意膳）", "了解 LuxurEat（露意膳）的产地证明、质量体系、认证文件、责任贸易与合作项目。"],
    gifting: ["商务合作 | LuxurEat（露意膳）", "探索 LuxurEat（露意膳）的国际市场定制、品牌合作、渠道方案与中国市场服务。"],
    contact: ["联系我们 | LuxurEat（露意膳）", "联系 LuxurEat（露意膳），咨询品牌、产品、渠道与商务合作。"],
    bag: ["购物袋 | LuxurEat（露意膳）", "查看并管理您在 LuxurEat（露意膳）购物袋中的已选产品。"],
  },
  en: {
    home: ["LuxurEat | Premium Italian Food & Brand Partnerships", "Discover premium Italian food, authentic regional flavours, recipes, brand stories and professional market partnerships from LuxurEat."],
    journal: ["About Us | LuxurEat", "Discover LuxurEat's brand heritage, stories of place, quality promise and seasonal observations."],
    new: ["New Arrivals | LuxurEat", "Discover new Italian olive oil, pizza and artisan Gelato selections from LuxurEat."],
    products: ["Products | LuxurEat", "Browse LuxurEat's selected premium Italian foods, truffle products, caviar and culinary collections."],
    rituals: ["Recipe Art | LuxurEat", "Explore bilingual Italian recipes, regional flavours and practical inspiration for the family table from LuxurEat."],
    news: ["Brand News | LuxurEat", "Read the latest LuxurEat events, trade exhibitions, partnerships and stories from the field."],
    blog: ["Knowledge Blog | LuxurEat", "Explore the Truffle Academy, Italian Food Dictionary, producers and stories of place, caviar, olive oil and Italian craft."],
    certification: ["Quality & Certification | LuxurEat", "Explore LuxurEat's origin records, quality systems, certification documents, responsible trade and partnership projects."],
    gifting: ["Cooperation | LuxurEat", "Explore LuxurEat private label, brand partnerships, channel solutions and services for the China market."],
    contact: ["Contact | LuxurEat", "Contact LuxurEat for brand, product, distribution and business partnership enquiries."],
    bag: ["Shopping Bag | LuxurEat", "Review and manage the products selected in your LuxurEat shopping bag."],
  },
};

const page = (lang, slug, key, scripts) => ({
  lang,
  slug,
  key,
  file: `${lang}/${slug}.html`,
  route: slug === "index" ? lang : `${lang}/${slug}`,
  seo: { title: seo[lang][key][0], description: seo[lang][key][1] },
  scripts: ["core", ...scripts],
});

export const pages = [
  page("zh", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("zh", "about-us", "journal", ["journal-data", "journal"]),
  page("zh", "product", "products", ["product-data", "products"]),
  page("zh", "new", "new", ["journal-data", "journal", "new-arrivals"]),
  page("zh", "recipe", "rituals", ["journal-data", "journal"]),
  page("zh", "brand", "news", ["event-data", "journal-data", "journal"]),
  page("zh", "blog", "blog", ["journal-data", "academy-data", "academy-columns", "academy", "journal"]),
  page("zh", "certification", "certification", ["certification-ui"]),
  page("zh", "cooperation", "gifting", ["brand-data", "brand"]),
  page("zh", "contact", "contact", ["brand-data", "brand"]),
  page("zh", "bag", "bag", ["product-data", "products"]),
  page("en", "index", "home", ["product-data", "event-data", "events", "journal-data", "journal", "products"]),
  page("en", "about-us", "journal", ["journal-data", "journal"]),
  page("en", "product", "products", ["product-data", "products"]),
  page("en", "new", "new", ["journal-data", "journal", "new-arrivals"]),
  page("en", "recipe", "rituals", ["journal-data", "journal"]),
  page("en", "brand", "news", ["event-data", "journal-data", "journal"]),
  page("en", "blog", "blog", ["journal-data", "academy-data", "academy-columns", "academy", "journal"]),
  page("en", "certification", "certification", ["certification-ui"]),
  page("en", "cooperation", "gifting", ["brand-data", "brand"]),
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
  "certification-ui": { src: "assets/js/certification-ui.js", dependencies: [] },
  "product-data": { src: "assets/data/products.js", dependencies: [] },
  "event-data": { src: "assets/data/events.js", dependencies: [] },
  "journal-data": { src: "assets/data/journal.js", dependencies: [] },
  "academy-data": { src: "assets/data/academy.js", dependencies: ["journal-data"] },
  "academy-columns": { src: "assets/data/academy-columns.js", dependencies: ["academy-data"] },
  "brand-data": { src: "assets/data/brand.js", dependencies: [] },
  core: { src: "assets/js/core.js", dependencies: [] },
  "new-arrivals": { src: "assets/js/new-arrivals.js", dependencies: [] },
  products: { src: "assets/js/products.js", dependencies: ["product-data"] },
  events: { src: "assets/js/events.js", dependencies: ["event-data"] },
  journal: { src: "assets/js/journal.js", dependencies: ["journal-data"] },
  academy: { src: "assets/js/academy.js", dependencies: ["academy-columns"] },
  brand: { src: "assets/js/brand.js", dependencies: ["brand-data"] },
};

export const footer = {
  zh: {
    description: "不止于进口，更致力于定义意大利高端美食在中国的新标准。<br>LuxurEat（露意膳）以正宗风味为根，以品质与安全为准则，将意大利饮食文化与创新体验带到中国。",
    newsletter: { heading: "LUXUREAT（露意膳）通讯｜订阅我们的更新", body: "接收产品上新、品牌活动与意式风味资讯。提交后，请通过邮件完成确认。", placeholder: "请输入电子邮箱", button: "确认订阅", invalid: "请输入有效的电子邮箱。" },
    copyright: "© 2026 LuxurEat（露意膳）｜露意膳（上海）贸易有限公司 版权所有 ｜ 统一社会信用代码：91310000MAERED2X1W",
    legal: [["privacy", "隐私政策"], ["terms", "销售条款"], ["shipping", "配送说明"]],
  },
  en: {
    description: "Beyond importing, we are committed to defining a new standard for premium Italian gastronomy in China.<br>Rooted in authentic flavor and guided by quality and safety, LuxurEat (露意膳) brings Italian food culture and innovative experiences to China.",
    newsletter: { heading: "LUXUREAT (露意膳) JOURNAL | SUBSCRIBE TO OUR UPDATES", body: "Receive new product releases, brand events and notes on authentic Italian flavour. Confirm your subscription through the email we send you.", placeholder: "Enter your email address", button: "Subscribe", invalid: "Please enter a valid email address." },

    copyright: "© 2026 LuxurEat (露意膳)｜Luxureat (Shanghai) Trading Co., Ltd. All Rights Reserved ｜ Unified Social Credit Code: 91310000MAERED2X1W",
    legal: [
      ["privacy", "Privacy Policy"], ["terms", "Terms of Sale"], ["shipping", "Shipping"]
    ],
  },
};
