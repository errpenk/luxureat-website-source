function initCaviarAcademy() {
  const data = window.LUXUREAT_ACADEMY_DATA;
  const list = document.querySelector("[data-academy-list]");
  const latest = document.querySelector("[data-academy-latest]");
  const search = document.querySelector("[data-academy-search]");
  if (!data || !list || !latest || !search) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const copy = lang === "zh"
    ? { read: "阅读文章", latest: "最新文章", empty: "未找到相关文章", topics: "内容专题", all: "全部", culture: "探索意大利", academy: "美食学院", caviar: "鱼子酱学院", olive: "橄榄油学院", gelato: "意式 Gelato", nutrition: "营养与配料" }
    : { read: "Read article", latest: "Latest posts", empty: "No articles found", topics: "Topics", all: "All", culture: "Explore Italy", academy: "Food Academy", caviar: "Caviar Academy", olive: "Olive Oil Academy", gelato: "Italian Gelato", nutrition: "Nutrition & Ingredients" };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const articles = data.order.map((slug) => data.articles[`${lang}-academy-${slug}`]).filter(Boolean);

  const art = (article, compact = false) => article.image
    ? `<img ${!compact && articles.indexOf(article) === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">`
    : `<span class="lux-academy-card-art ${escapeHtml(article.artClass || "is-caviar")}" role="img" aria-label="${escapeHtml(article.title)}"><b>${escapeHtml(article.topicLabel || article.eyebrow)}</b><strong>${escapeHtml(article.topic === "olive" ? "OLIO" : article.topic === "gelato" ? "GELATO" : "CAVIAR")}</strong></span>`;
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
  topicNav.innerHTML = [["all", copy.all], ["culture", copy.culture], ["academy", copy.academy], ["caviar", copy.caviar], ["olive", copy.olive], ["gelato", copy.gelato], ["nutrition", copy.nutrition]].map(([topic, label]) => `<button type="button" data-academy-topic-filter="${topic}">${label}</button>`).join("");
  document.querySelector(".lux-academy-intro")?.after(topicNav);

  const setTopic = (topic) => {
    topicNav.querySelectorAll("[data-academy-topic-filter]").forEach((button) => button.classList.toggle("is-active", button.dataset.academyTopicFilter === topic));
    renderLatest(topic);
    let visible = 0;
    list.querySelectorAll("[data-academy-item]").forEach((card) => {
      const matchesTopic = topic === "all" || card.dataset.academyTopic === topic;
      const matchesQuery = !search.value.trim() || card.dataset.academySearchText.includes(search.value.trim().toLowerCase());
      card.hidden = !(matchesTopic && matchesQuery);
      if (!card.hidden) visible += 1;
    });
    if (empty) {
      empty.textContent = copy.empty;
      empty.hidden = visible !== 0;
    }
  };
  const params = new URLSearchParams(location.search);
  const requestedTopic = params.get("topic") || ({
    "culture-academy": "culture",
    "food-academy": "academy",
    "caviar-academy": "caviar",
    "olive-academy": "olive",
    "gelato-academy": "gelato",
    "nutrition-guide": "nutrition",
  }[location.hash.slice(1)] || "all");
  const requestedQuery = params.get("q");
  if (requestedQuery) search.value = requestedQuery;
  topicNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-academy-topic-filter]");
    if (button) setTopic(button.dataset.academyTopicFilter);
  });

  const empty = document.querySelector("[data-academy-empty]");
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    const topic = topicNav.querySelector(".is-active")?.dataset.academyTopicFilter || "all";
    list.querySelectorAll("[data-academy-item]").forEach((card) => {
      const matchesTopic = topic === "all" || card.dataset.academyTopic === topic;
      card.hidden = !(matchesTopic && (!query || card.dataset.academySearchText.includes(query)));
      if (!card.hidden) visible += 1;
    });
    if (empty) {
      empty.textContent = copy.empty;
      empty.hidden = visible !== 0;
    }
  });
  setTopic(["culture", "academy", "caviar", "olive", "gelato", "nutrition"].includes(requestedTopic) ? requestedTopic : "all");
}

if (document.readyState === "complete") initCaviarAcademy();
else document.addEventListener("DOMContentLoaded", initCaviarAcademy, { once: true });
