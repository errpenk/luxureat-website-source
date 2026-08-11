function initCaviarAcademy() {
  const data = window.LUXUREAT_ACADEMY_DATA;
  const list = document.querySelector("[data-academy-list]");
  const latest = document.querySelector("[data-academy-latest]");
  const search = document.querySelector("[data-academy-search]");
  const count = document.querySelector("[data-academy-count]");
  const empty = document.querySelector("[data-academy-empty]");
  if (!data || !list || !latest || !search) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const copy = lang === "zh"
    ? { read: "阅读文章", latest: "最新文章", empty: "未找到相关文章", topics: "内容专题", all: "全部", culture: "探索意大利", caviar: "鱼子酱学院", olive: "橄榄油学院", pizza: "披萨学院", gelato: "意式手工冰淇淋", nutrition: "营养与配料", truffle: "松露学院", dictionary: "意大利美食词典", producers: "生产者、大师与产地故事" }
    : { read: "Read article", latest: "Latest posts", empty: "No articles found", topics: "Topics", all: "All", culture: "Explore Italy", caviar: "Caviar Academy", olive: "Olive Oil Academy", pizza: "Pizza Academy", gelato: "Italian Gelato", nutrition: "Nutrition & Ingredients", truffle: "Truffle Academy", dictionary: "Italian Food Dictionary", producers: "Producers, Masters & Stories of Place" };
  const introCopy = lang === "zh" ? {
    all: ["全部内容", "知识、起源与工艺", "从地域文化、生产者与美食词典出发，再深入松露、橄榄油、鱼子酱、披萨、意式手工冰淇淋与营养配料。"],
    culture: ["探索意大利", "地域、传统与餐桌", "从二十个大区、地方传统、食材来源与餐桌方式，理解意大利风味如何在土地和日常生活中形成。"],
    caviar: ["鱼子酱学院", "品种、工艺与品鉴", "认识鲟鱼品种、养殖与加工方法，学习从颗粒、色泽、质地、盐度和保存条件判断鱼子酱。"],
    olive: ["橄榄油学院", "产区、风味与应用", "从橄榄品种、采收与机械萃取，到标签、营养、保存和餐桌使用，建立完整的橄榄油判断方法。"],
    pizza: ["披萨学院", "面团、发酵与烘烤", "理解面粉、含水量、酵母、时间与炉温如何共同影响披萨的饼边、香气、弹性和入口平衡。"],
    gelato: ["意式手工冰淇淋", "原料、质地与温度", "从经典口味、配方结构、空气含量与服务温度，认识意式手工冰淇淋和普通冰淇淋的差异。"],
    nutrition: ["营养与配料", "标签、份量与安全", "学习阅读配料、营养、过敏原与无添加标签，把单项数字放回份量、饮食结构和具体产品资料中理解。"],
    truffle: ["松露学院", "生态、品种与风味", "从地下菌根生态、意大利产地与采集季节，到香气搭配和松露产品选购，系统理解松露。"],
    dictionary: ["意大利美食词典", "菜单、食材与标签", "读懂意大利菜单结构、意面形状、奶酪与腌肉、烹饪方法和食品标签中的关键词。"],
    producers: ["生产者、大师与产地故事", "人、手艺与土地", "走近松露采集者、制酪师、传统醋坊、那不勒斯披萨师和意式冰淇淋师的真实工作与产地文化。"],
  } : {
    all: ["All topics", "Knowledge, origin and craft", "Begin with regions, producers and the Italian food dictionary, then explore truffles, olive oil, caviar, pizza, Italian gelato, nutrition and labels."],
    culture: ["Explore Italy", "Territory, tradition and table", "Read Italy through its twenty regions, local traditions, ingredient origins and the ways food is prepared and shared."],
    caviar: ["Caviar Academy", "Species, craft and tasting", "Understand sturgeon species, production, texture, salinity, storage and the practical language of caviar tasting."],
    olive: ["Olive Oil Academy", "Origin, flavour and use", "Connect cultivars, harvest and extraction with labels, nutrition, storage and everyday kitchen use."],
    pizza: ["Pizza Academy", "Dough, fermentation and heat", "See how flour, hydration, yeast, time and oven heat shape a pizza's rim, aroma, elasticity and balance."],
    gelato: ["Italian Gelato", "Ingredients, texture and temperature", "Explore classic flavours, recipe structure, air and serving temperature, with a clear distinction from ordinary ice cream."],
    nutrition: ["Nutrition & Ingredients", "Labels, portions and safety", "Read ingredients, nutrition, allergens and no-additives claims in the context of portions, dietary patterns and verified product files."],
    truffle: ["Truffle Academy", "Ecology, species and flavour", "Understand truffles through their underground ecology, Italian territories and seasons, then explore aroma, pairing and informed product selection."],
    dictionary: ["Italian Food Dictionary", "Menus, ingredients and labels", "Learn the language of Italian menu structure, pasta shapes, cheese and cured meats, cooking methods and protected food labels."],
    producers: ["Producers, Masters & Stories of Place", "People, craft and territory", "Meet truffle hunters, cheesemakers, traditional vinegar makers, Neapolitan pizzaiuoli and gelatieri through their work and territories."],
  };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const articles = data.order.map((slug) => data.articles[`${lang}-academy-${slug}`]).filter(Boolean);

  const art = (article, compact = false) => article.image
    ? `<img ${!compact && articles.indexOf(article) === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">`
    : `<span class="lux-academy-card-art ${escapeHtml(article.artClass || "is-caviar")}" role="img" aria-label="${escapeHtml(article.title)}"></span>`;
  list.innerHTML = articles.map((article, index) => `
    <article class="lux-academy-card lux-reader-card${article.wideCover ? " is-wide-cover" : ""}" data-academy-item data-academy-topic="${escapeHtml(article.topic || "caviar")}" data-academy-search-text="${escapeHtml(`${article.title} ${article.intro} ${article.topicLabel || ""}`.toLowerCase())}">
      <button class="lux-academy-card-media lux-reader-media" type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}" aria-label="${copy.read}: ${escapeHtml(article.title)}">
        ${article.image ? `<img ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">` : art(article)}
        <span class="lux-reader-cta">${copy.read}</span>
      </button>
      <div class="lux-academy-card-copy">
        <h2>${escapeHtml(article.title)}</h2>
        <p>${escapeHtml(article.intro)}</p>
        <button type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}">${copy.read}<span aria-hidden="true">→</span></button>
      </div>
    </article>`).join("");

  const renderLatest = (topic = "all") => {
    const latestArticles = (topic === "all" ? articles : articles.filter((article) => article.topic === topic)).slice(0, 4);
    latest.innerHTML = `<h2>${copy.latest}</h2>${latestArticles.map((article) => `
      <button class="lux-reader-card${article.wideCover ? " is-wide-cover" : ""}" type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}">
        ${article.image ? `<img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="">` : art(article, true)}
        <span><strong>${escapeHtml(article.title)}</strong></span>
      </button>`).join("")}`;
  };
  renderLatest();

  const topicNav = document.createElement("nav");
  topicNav.className = "lux-academy-topics";
  topicNav.setAttribute("aria-label", copy.topics);
  topicNav.innerHTML = [["all", copy.all], ["culture", copy.culture], ["caviar", copy.caviar], ["olive", copy.olive], ["pizza", copy.pizza], ["truffle", copy.truffle], ["gelato", copy.gelato], ["nutrition", copy.nutrition], ["dictionary", copy.dictionary], ["producers", copy.producers]].map(([topic, label]) => `<button type="button" data-academy-topic-filter="${topic}">${label}</button>`).join("");
  document.querySelector(".lux-academy-intro")?.after(topicNav);
  const intro = document.querySelector(".lux-academy-intro");
  const introLabel = intro?.querySelector("span");
  const introTitle = intro?.querySelector("h2");
  const introSummary = intro?.querySelector("p");

  const applyFilters = (topic) => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    list.querySelectorAll("[data-academy-item]").forEach((card) => {
      const matchesTopic = topic === "all" || card.dataset.academyTopic === topic;
      card.hidden = !(matchesTopic && (!query || card.dataset.academySearchText.includes(query)));
      if (!card.hidden) visible += 1;
    });
    if (count) count.innerHTML = lang === "zh" ? `共显示 <strong>${visible}</strong> 篇文章` : `Showing <strong>${visible}</strong> articles`;
    if (empty) {
      empty.textContent = copy.empty;
      empty.hidden = visible !== 0;
    }
  };
  const setTopic = (topic) => {
    const currentIntro = introCopy[topic] || introCopy.all;
    if (introLabel) introLabel.textContent = currentIntro[0];
    if (introTitle) introTitle.textContent = currentIntro[1];
    if (introSummary) introSummary.textContent = currentIntro[2];
    topicNav.querySelectorAll("[data-academy-topic-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.academyTopicFilter === topic));
    renderLatest(topic);
    applyFilters(topic);
  };
  const params = new URLSearchParams(location.search);
  const requestedTopic = params.get("topic") || ({
    "culture-academy": "culture",
    "food-academy": "culture",
    "caviar-academy": "caviar",
    "olive-academy": "olive",
    "pizza-academy": "pizza",
    "gelato-academy": "gelato",
    "nutrition-guide": "nutrition",
    "truffle-academy": "truffle",
    "italian-food-dictionary": "dictionary",
    "producers-stories": "producers",
  }[location.hash.slice(1)] || "all");
  const requestedQuery = params.get("q");
  if (requestedQuery) search.value = requestedQuery;
  topicNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-academy-topic-filter]");
    if (button) setTopic(button.dataset.academyTopicFilter);
  });

  search.addEventListener("input", () => {
    const topic = topicNav.querySelector(".is-active")?.dataset.academyTopicFilter || "all";
    applyFilters(topic);
  });
  setTopic(["culture", "caviar", "olive", "pizza", "gelato", "nutrition", "truffle", "dictionary", "producers"].includes(requestedTopic) ? requestedTopic : requestedTopic === "academy" ? "culture" : "all");
  if (params.has("topic") || location.hash) requestAnimationFrame(() => {
    const headerOffset = innerWidth <= 1080 ? 82 : 108;
    scrollTo({ top: scrollY + topicNav.getBoundingClientRect().top - headerOffset, behavior: "smooth" });
  });
}

if (document.readyState === "complete") initCaviarAcademy();
else document.addEventListener("DOMContentLoaded", initCaviarAcademy, { once: true });
