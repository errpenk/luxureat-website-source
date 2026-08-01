function initCaviarAcademy() {
  const data = window.LUXUREAT_ACADEMY_DATA;
  const list = document.querySelector("[data-academy-list]");
  const latest = document.querySelector("[data-academy-latest]");
  const search = document.querySelector("[data-academy-search]");
  if (!data || !list || !latest || !search) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const copy = lang === "zh"
    ? { read: "阅读文章", latest: "最新文章", empty: "未找到相关文章" }
    : { read: "Read article", latest: "Latest posts", empty: "No articles found" };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const articles = data.order.map((slug) => data.articles[`${lang}-academy-${slug}`]).filter(Boolean);

  list.innerHTML = articles.map((article, index) => `
    <article class="lux-academy-card lux-reader-card${article.wideCover ? " is-wide-cover" : ""}" data-academy-item data-academy-search-text="${escapeHtml(`${article.title} ${article.intro}`.toLowerCase())}">
      <button class="lux-academy-card-media lux-reader-media" type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}" aria-label="${copy.read}: ${escapeHtml(article.title)}">
        <img ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
        <span class="lux-reader-cta">${copy.read}</span>
      </button>
      <div class="lux-academy-card-copy">
        <h2>${escapeHtml(article.title)}</h2>
        <p>${escapeHtml(article.intro)}</p>
        <button type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}">${copy.read}<span aria-hidden="true">→</span></button>
      </div>
    </article>`).join("");

  latest.innerHTML = `<h2>${copy.latest}</h2>${articles.slice(0, 4).map((article) => `
    <button class="lux-reader-card${article.wideCover ? " is-wide-cover" : ""}" type="button" data-reader-open="${lang}-academy-${escapeHtml(article.slug)}">
      <img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="">
      <span><strong>${escapeHtml(article.title)}</strong></span>
    </button>`).join("")}`;

  const empty = document.querySelector("[data-academy-empty]");
  search.addEventListener("input", () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    list.querySelectorAll("[data-academy-item]").forEach((card) => {
      card.hidden = Boolean(query) && !card.dataset.academySearchText.includes(query);
      if (!card.hidden) visible += 1;
    });
    if (empty) {
      empty.textContent = copy.empty;
      empty.hidden = visible !== 0;
    }
  });
}

if (document.readyState === "complete") initCaviarAcademy();
else document.addEventListener("DOMContentLoaded", initCaviarAcademy, { once: true });
