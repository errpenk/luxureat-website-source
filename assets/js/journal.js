function initLuxReader() {
  const articleData = window.LUXUREAT_ARTICLE_DATA || {};
  const articles = articleData.articles || {};
  const events = window.LUXUREAT_EVENT_DATA?.events || [];
  const eventMount = document.querySelector("[data-recent-events]");
  const aboutMount = document.querySelector("[data-about-story]");
  const eventHash = decodeURIComponent(location.hash).replace(/^#event-/, "");
  const readerHash = decodeURIComponent(location.hash).replace(/^#reader-/, "");
  const triggers = document.querySelectorAll("[data-reader-open], [data-reader-archive], [data-event-open]");
  if (!triggers.length && !eventMount && !aboutMount && !events.some((event) => event.id === eventHash)) return;
  if (!Object.keys(articles).length && !events.length) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const labels = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", related: "延伸阅读", read: "阅读详情", archive: "往期随笔", note: "品鉴笔记", noteText: "温度、器具与节奏共同决定入口的第一层印象；真正的奢华来自克制而准确的服务。" }
    : { back: "Back", close: "Close", related: "Further Reading", read: "Read Details", archive: "Archive", note: "Tasting Notes", noteText: "Temperature, service ware, and pacing shape the first impression; luxury is restraint made precise." };
  const archiveGroups = () => document.documentElement.lang?.startsWith("zh")
    ? [
      ["品牌与产地", ["zh-harvest", "zh-truffle"]],
      ["服务与工艺", ["zh-service", "zh-malossol"]],
      ["品鉴仪式", ["zh-champagne", "zh-mother-of-pearl", "zh-ice-server", "zh-breath", "zh-hand-warm", "zh-palate"]],
    ]
    : [
      ["Maison & Origin", ["en-harvest", "en-truffle"]],
      ["Service & Craft", ["en-service", "en-malossol"]],
      ["Tasting Ritual", ["en-champagne", "en-mother-of-pearl", "en-ice-server", "en-breath", "en-hand-warm", "en-palate"]],
    ];
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const eventLabels = lang === "zh"
    ? { kicker: "Maison Events", title: "最近活动", latest: "最新活动", past: "过往活动", empty: "暂无过往活动", read: "查看详情" }
    : { kicker: "Maison Events", title: "Recent Events", latest: "Latest Events", past: "Past Events", empty: "No past events yet", read: "View details" };
  const aboutArticle = articles[`${lang}-about`];
  const aboutLabels = lang === "zh"
    ? { title: "关于我们", journal: "LuxurEat 志", story: "品牌故事", madeIn: "意大利制造", view: "查看大图", previous: "查看上一张图片", next: "查看下一张图片", slide: "左右滑动查看", close: "关闭", portrait: "Roberto Ugolini 肖像" }
    : { title: "About Us", journal: "LuxurEat Journal", story: "Brand Story", madeIn: "Made in Italy", view: "View Full Size", previous: "View previous image", next: "View next image", slide: "Slide left or right", close: "Close", portrait: "Portrait of Roberto Ugolini" };

  const renderRecentEvents = () => {
    if (!eventMount) return;
    const latest = events.filter((event) => event.status === "latest");
    const past = events.filter((event) => event.status === "past");
    eventMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>${eventLabels.kicker}</span>
          <h2>${eventLabels.title}</h2>
        </header>
        <div class="lux-recent-events-latest">
          <h3>${eventLabels.latest}</h3>
          ${latest.map((event) => {
            const copy = event[lang];
            return copy ? `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}">
              <span class="lux-event-card-copy">
                <small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small>
                <strong>${escapeHtml(copy.articleTitle)}</strong>
                <span>${escapeHtml(copy.intro)}</span>
                <span class="lux-narrative-link">${eventLabels.read}<span class="material-symbols-outlined">arrow_forward</span></span>
              </span>
            </button>` : "";
          }).join("")}
        </div>
        ${past.length ? `<div class="lux-past-events">
          <h3>${eventLabels.past}</h3>
          <div class="lux-past-events-grid">${past.map((event) => {
            const copy = event[lang];
            return `<button type="button" class="lux-event-card" data-event-open="${escapeHtml(event.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(event.cardImage || event.image)}" alt="${escapeHtml(copy.articleTitle)}"><span class="lux-event-card-copy"><small>${escapeHtml(copy.dateIso)} · ${escapeHtml(copy.city)}</small><strong>${escapeHtml(copy.articleTitle)}</strong></span></button>`;
          }).join("")}</div>
        </div>` : ""}
      </div>`;
  };
  renderRecentEvents();

  const renderAboutStory = () => {
    if (!aboutMount || !aboutArticle) return;
    const [titleBrand, ...titleRest] = aboutArticle.title.split("｜");
    const paragraphs = (content) => content.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
    const sectionHtml = aboutArticle.sections.map(([heading, content], index) => {
      const media = aboutArticle.sectionMedia[index] || [];
      const figures = media.map((item) => `<figure>
        <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(item.src)}" data-about-image-alt="${escapeHtml(item.alt)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(item.alt)}">
          <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}">
          <span>${escapeHtml(aboutLabels.view)}</span>
        </button>
      </figure>`).join("");
      const gallery = index === aboutArticle.sections.length - 1
        ? `<div class="lux-about-carousel" data-about-carousel data-carousel-hint="${escapeHtml(aboutLabels.slide)}">
            <button type="button" class="lux-about-carousel-arrow is-prev" data-about-carousel-step="-1" aria-label="${escapeHtml(aboutLabels.previous)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button>
            <div class="lux-about-carousel-track">${figures}</div>
            <button type="button" class="lux-about-carousel-arrow is-next" data-about-carousel-step="1" aria-label="${escapeHtml(aboutLabels.next)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>`
        : `<div class="lux-reader-section-media">${figures}</div>`;
      return `<section class="lux-reader-section" id="lux-about-section-${index}">
        <h3>${escapeHtml(heading)}</h3>
        ${paragraphs(content)}
        ${gallery}
      </section>`;
    }).join("");

    aboutMount.innerHTML = `
      <div class="lux-recent-events-inner">
        <header class="lux-recent-events-head">
          <span>Maison Story</span>
          <h2>${escapeHtml(aboutLabels.title)}</h2>
        </header>
      </div>
      <article class="lux-reader-layout">
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid"><span>${escapeHtml(aboutLabels.journal)}</span><span>${escapeHtml(aboutLabels.title)}</span><span>${escapeHtml(aboutLabels.story)}</span><span>${escapeHtml(aboutLabels.madeIn)}</span></div>
            <h2><span class="lux-about-title-brand">${escapeHtml(titleBrand)}｜</span>${escapeHtml(titleRest.join("｜"))}</h2>
            <p class="lux-reader-summary">${escapeHtml(aboutArticle.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            <button type="button" class="lux-about-image-button" data-about-image="${escapeHtml(aboutArticle.image)}" data-about-image-alt="${escapeHtml(aboutLabels.portrait)}" aria-label="${escapeHtml(aboutLabels.view)}: ${escapeHtml(aboutLabels.portrait)}">
              <img loading="lazy" decoding="async" src="${escapeHtml(aboutArticle.image)}" alt="${escapeHtml(aboutLabels.portrait)}">
              <span>${escapeHtml(aboutLabels.view)}</span>
            </button>
          </figure>
        </section>
        <section class="lux-reader-content lux-about-content">
          <div class="lux-reader-copy">
            <section class="lux-reader-section lux-reader-section-opening">${paragraphs(aboutArticle.opening)}</section>
            ${sectionHtml}
            <blockquote class="lux-reader-quote">${escapeHtml(aboutArticle.quote)}</blockquote>
          </div>
        </section>
      </article>`;
  };
  renderAboutStory();

  if (aboutMount) {
    const lightbox = document.createElement("dialog");
    lightbox.className = "lux-about-lightbox";
    lightbox.innerHTML = `<button type="button" data-about-lightbox-close aria-label="${escapeHtml(aboutLabels.close)}">${escapeHtml(aboutLabels.close)}</button><img loading="lazy" decoding="async" alt="">`;
    document.body.appendChild(lightbox);

    document.addEventListener("click", (event) => {
      const imageTrigger = event.target.closest("[data-about-image]");
      if (imageTrigger) {
        const image = lightbox.querySelector("img");
        image.src = imageTrigger.dataset.aboutImage;
        image.alt = imageTrigger.dataset.aboutImageAlt || "";
        lightbox.showModal();
        return;
      }

      const carouselTrigger = event.target.closest("[data-about-carousel-step]");
      if (carouselTrigger) {
        const track = carouselTrigger.closest("[data-about-carousel]").querySelector(".lux-about-carousel-track");
        track.scrollBy({ left: Number(carouselTrigger.dataset.aboutCarouselStep) * track.clientWidth * .8, behavior: "smooth" });
        return;
      }

      if (event.target === lightbox || event.target.closest("[data-about-lightbox-close]")) lightbox.close();
    });
  }

  const syncReaderCards = () => {
    const seen = new Set();
    const sync = (node, article) => {
      if (!node || seen.has(node) || node.closest(".lux-home-harvest")) return;
      seen.add(node);
      const image = node.querySelector("img");
      const background = node.querySelector(".lux-dark-photo-bg, [style*='background-image']");
      if (image) {
        image.src = article.cardImage || article.image;
        image.alt = article.cardTitle || article.title;
        if (article.cardPosition || article.coverPosition) image.style.objectPosition = article.cardPosition || article.coverPosition;
      } else if (background) {
        background.style.backgroundImage = `url("${article.cardImage || article.image}")`;
      }
      const heading = node.querySelector("h1,h2,h3,h4");
      if (heading) heading.textContent = article.cardTitle || article.title;
      const eyebrow = Array.from(node.querySelectorAll("span"))
        .find((span) => !span.closest("a,button") && !span.classList.contains("material-symbols-outlined") && /\D/.test(span.textContent.trim()) && span.textContent.trim().length < 64);
      if (eyebrow) eyebrow.textContent = article.cardEyebrow || article.eyebrow;
      const paragraph = node.querySelector("p");
      if (paragraph) {
        paragraph.textContent = article.cardText || article.intro;
        paragraph.style.whiteSpace = article.cardText?.includes("\n") ? "pre-line" : "";
      }
    };

    document.querySelectorAll("[data-reader-open]").forEach((trigger) => {
      const article = articles[trigger.dataset.readerOpen];
      if (!article) return;
      sync(trigger.closest(".lux-reader-card, .article-card") || trigger.parentElement, article);
    });
  };
  syncReaderCards();

  const reader = document.createElement("div");
  reader.className = "lux-reader";
  reader.hidden = true;
  reader.innerHTML = `
    <div class="lux-reader-backdrop" data-reader-close></div>
    <section class="lux-reader-panel" role="dialog" aria-modal="true" aria-labelledby="lux-reader-title">
      <header class="lux-reader-header">
        <button type="button" class="lux-reader-back" data-reader-back hidden></button>
        <button type="button" class="lux-reader-close" data-reader-close></button>
      </header>
      <div class="lux-reader-body" tabindex="-1"></div>
    </section>`;
  document.body.appendChild(reader);

  const body = reader.querySelector(".lux-reader-body");
  const panel = reader.querySelector(".lux-reader-panel");
  const backButton = reader.querySelector("[data-reader-back]");
  const closeButtons = reader.querySelectorAll("[data-reader-close]");
  let currentId = "";
  const stack = [];
  const syncReaderTop = () => {
    panel.classList.toggle("is-at-top", body.scrollTop <= 4);
  };

  const showReader = (copy) => {
    reader.hidden = false;
    document.body.classList.add("lux-reader-open");
    backButton.hidden = stack.length === 0;
    backButton.textContent = copy.back;
    reader.querySelector(".lux-reader-close").textContent = copy.close;
    body.focus();
    body.scrollTop = 0;
    syncReaderTop();
  };

  const renderArchive = (push) => {
    if (push && currentId) stack.push(currentId);
    currentId = "__archive";
    const copy = labels();
    const groups = archiveGroups();
    const allLabel = document.documentElement.lang?.startsWith("zh") ? "全部内容" : "All Collections";
    const items = groups.flatMap(([title, ids]) => ids.map((id) => ({ id, title })));
    body.innerHTML = `
      <article class="lux-reader-archive">
        <div class="lux-reader-archive-head">
          <h2>${escapeHtml(copy.archive)}</h2>
          <div class="lux-reader-archive-tabs">
            <button type="button" class="is-active" data-reader-archive-filter="all">${escapeHtml(allLabel)}</button>
            ${groups.map(([title]) => `<button type="button" data-reader-archive-filter="${escapeHtml(title)}">${escapeHtml(title)}</button>`).join("")}
          </div>
        </div>
        <div class="lux-reader-archive-grid">
          ${items.map(({ id, title }) => {
            const item = articles[id];
            return item ? `
              <button type="button" class="lux-reader-archive-card" data-reader-archive-item="${escapeHtml(id)}" data-reader-archive-category="${escapeHtml(title)}">
                <span class="lux-reader-archive-media"><img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt=""><span class="lux-reader-archive-cta">${copy.read}</span></span>
                <span class="lux-reader-archive-copy"><span>${escapeHtml(item.eyebrow)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta)}</small></span>
              </button>` : "";
          }).join("")}
        </div>
      </article>`;
    showReader(copy);
  };

  const render = (id, push) => {
    const article = articles[id];
    if (!article) return;
    if (push && currentId) stack.push(currentId);
    currentId = id;
    const copy = labels();
    if (article.type === "recipe" && article.recipe) {
      const recipe = article.recipe;
      const recipeLabels = article.lang === "zh"
        ? { time: "时间", difficulty: "难度", servings: "份量", ingredients: "食材", method: "准备", nutrition: "每份的估计营养成分" }
        : { time: "Time", difficulty: "Difficulty", servings: "Serves", ingredients: "Ingredients", method: "Method", nutrition: "Estimated nutrition per serving" };
      body.innerHTML = `
        <article class="lux-recipe-reader">
          <section class="lux-recipe-hero">
            <figure><img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"></figure>
            <div class="lux-recipe-intro">
              <span>${escapeHtml(article.eyebrow)}</span>
              <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
              <p>${escapeHtml(article.intro)}</p>
              <dl class="lux-recipe-facts">
                <div><dt>${recipeLabels.time}</dt><dd>${escapeHtml(recipe.time)}</dd></div>
                <div><dt>${recipeLabels.difficulty}</dt><dd>${escapeHtml(recipe.difficulty)}</dd></div>
                <div><dt>${recipeLabels.servings}</dt><dd>${escapeHtml(recipe.servings)}</dd></div>
              </dl>
            </div>
          </section>
          <section class="lux-recipe-body">
            <aside class="lux-recipe-ingredients">
              <h3>${recipeLabels.ingredients}</h3>
              <p>${escapeHtml(recipe.description)}</p>
              <ul>${recipe.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </aside>
            <div class="lux-recipe-method">
              <h3>${recipeLabels.method}</h3>
              <ol>${recipe.steps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
            </div>
          </section>
          <section class="lux-recipe-nutrition">
            <header><h3>${recipeLabels.nutrition}</h3></header>
            <dl>${recipe.nutrition.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
          </section>
        </article>`;
      showReader(copy);
      return;
    }
    const articleSections = article.sections.length ? article.sections : [[copy.note, copy.noteText]];
    const contentText = (item) => typeof item === "string" ? item : item?.lines?.join("") || item?.text || "";
    const paragraphs = (content) => (Array.isArray(content) ? content : [content])
      .map((item) => item?.type === "strong"
        ? `<p class="lux-reader-inline-heading"><strong>${escapeHtml(item.text)}</strong></p>`
        : item?.type === "quote"
          ? `<blockquote class="lux-reader-indent-quote">${item.lines.map((line, index) => `<p>${item.bold?.includes(index) ? `<strong>${escapeHtml(line)}</strong>` : escapeHtml(line)}</p>`).join("")}</blockquote>`
          : `<p>${escapeHtml(item)}</p>`)
      .join("");
    const opening = article.opening || [];
    const plainText = [article.intro, ...opening, ...articleSections.flatMap(([, content]) => (Array.isArray(content) ? content : [content]).map(contentText))].join(" ");
    const units = article.lang === "zh" ? plainText.replace(/\s/g, "").length / 300 : (plainText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length / 200;
    const minutes = Math.max(1, Math.ceil(units));
    const metaParts = article.meta.split("·").map((part) => part.trim()).filter(Boolean);
    const readTime = article.lang === "zh" ? `${minutes} 分钟阅读` : `${minutes} min read`;
    const issue = article.lang === "zh" ? "LuxurEat 志" : "LuxurEat Journal";
    const metaItems = [issue, article.eyebrow, readTime, metaParts[1] || metaParts[0] || ""];
    const asideRows = [
      [article.lang === "zh" ? "栏目" : "Column", article.eyebrow],
      [article.lang === "zh" ? "档案" : "Series", metaParts[0] || copy.archive],
      [article.lang === "zh" ? "日期" : "Date", metaParts[1] || ""],
    ].filter(([, value]) => value);
    const tocLabel = article.lang === "zh" ? "目录" : "Contents";
    const openingHtml = opening.length ? `<section class="lux-reader-section lux-reader-section-opening">${paragraphs(opening)}</section>` : "";
    const sectionHtml = articleSections.map(([heading, content], index) => {
      const media = article.sectionMedia?.[index] || [];
      return `
          <section class="lux-reader-section" id="lux-reader-section-${index}">
            <h3>${escapeHtml(heading)}</h3>
            ${paragraphs(content)}
            ${media.length ? `<div class="lux-reader-section-media">${media.map((item, mediaIndex) => `
              <figure>
                <img loading="lazy" decoding="async" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || heading)}">
                <figcaption>Figure ${String(mediaIndex + 1).padStart(2, "0")} / ${escapeHtml(heading)}</figcaption>
              </figure>`).join("")}</div>` : ""}
          </section>`;
    }).join("");
    const tocHtml = articleSections.map(([heading], index) => `<a href="#lux-reader-section-${index}">${escapeHtml(article.tocLabels?.[index] || heading)}</a>`).join("");

    body.innerHTML = `
      <article class="lux-reader-layout">
        <div class="lux-reader-rule"></div>
        <section class="lux-reader-hero">
          <div class="lux-reader-hero-copy">
            <div class="lux-reader-meta-grid">
              ${metaItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
            </div>
            <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
            <p class="lux-reader-summary">${escapeHtml(article.intro)}</p>
          </div>
          <figure class="lux-reader-cover">
            <img loading="lazy" decoding="async" src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}"${article.coverPosition ? ` style="object-position: ${escapeHtml(article.coverPosition)}"` : ""}>
            <figcaption>Figure 01 / ${escapeHtml(article.eyebrow)}</figcaption>
          </figure>
        </section>
        <section class="lux-reader-content">
          <aside class="lux-reader-aside">
            ${asideRows.map(([label, value]) => `<span>${escapeHtml(label)}：${escapeHtml(value)}</span>`).join("")}
          </aside>
          <div class="lux-reader-copy">
            ${openingHtml}
            ${sectionHtml}
            ${article.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(article.quote)}</blockquote>` : ""}
          </div>
          <aside class="lux-reader-pull">
            <p>${escapeHtml(article.quote || copy.noteText)}</p>
            <nav class="lux-reader-toc" aria-label="${escapeHtml(tocLabel)}">
              <span>${escapeHtml(tocLabel)}</span>
              ${tocHtml}
            </nav>
          </aside>
        </section>
          <section class="lux-reader-related">
            <div class="lux-reader-related-head">
              <h3>${copy.related}</h3>
            </div>
            <div class="lux-reader-related-grid">
              ${article.related.map((relatedId) => {
                const item = articles[relatedId];
                return item ? `
                  <button type="button" data-reader-related="${escapeHtml(relatedId)}">
                    <span class="lux-reader-related-media">
                      <img loading="lazy" decoding="async" src="${escapeHtml(item.image)}" alt="">
                      <span class="lux-reader-related-cta">${copy.read}</span>
                    </span>
                    <span>${escapeHtml(item.eyebrow)}</span>
                    <strong>${escapeHtml(item.title)}</strong>
                  </button>` : "";
              }).join("")}
            </div>
          </section>
      </article>`;

    showReader(copy);
  };

  const renderEvent = (id) => {
    const event = events.find((item) => item.id === id);
    const article = event?.[lang];
    if (!event || !article) return;
    stack.length = 0;
    currentId = `event:${id}`;
    const copy = labels();
    const allEvents = events.map((item) => ({ item, copy: item[lang] })).filter(({ copy: itemCopy }) => itemCopy);
    body.innerHTML = `
      <article class="lux-event-reader">
        <header class="lux-event-reader-intro">
          <div>
            <p>${escapeHtml(article.eyebrow)} / ${escapeHtml(article.category)}</p>
            <h2 id="lux-reader-title">${escapeHtml(article.articleTitle)}</h2>
          </div>
          <p>${escapeHtml(article.intro)}</p>
        </header>
        <div class="lux-event-reader-layout">
          <section class="lux-event-reader-article">
            <figure><img loading="lazy" decoding="async" src="${escapeHtml(event.previewImage || event.image)}" alt="${escapeHtml(article.articleTitle)}"></figure>
            <div class="lux-event-reader-lead">
              <span>${escapeHtml(article.dateIso)}<br>${escapeHtml(article.city)}<br>${escapeHtml(article.category)}</span>
              <p>${escapeHtml(article.intro)}</p>
            </div>
            <div class="lux-event-reader-copy">
              <aside>${lang === "zh" ? "活动回顾" : "Event Journal"}<br>${escapeHtml(article.location)}</aside>
              <div>
                ${article.sections.map(([heading, text]) => `<section><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(text)}</p></section>`).join("")}
                <blockquote>${escapeHtml(article.quote)}</blockquote>
              </div>
            </div>
          </section>
          <aside class="lux-event-reader-index">
            <div><h3>${lang === "zh" ? "所有活动" : "All Events"}</h3><span>${String(allEvents.length).padStart(2, "0")}</span></div>
            ${allEvents.map(({ item, copy: itemCopy }, index) => `<button type="button" data-event-open="${escapeHtml(item.id)}"><img loading="lazy" decoding="async" src="${escapeHtml(item.poster || item.image)}" alt=""><span><strong>${escapeHtml(itemCopy.articleTitle)}</strong><small>${escapeHtml(itemCopy.city)} / ${escapeHtml(itemCopy.dateIso)}</small></span><small>${String(index + 1).padStart(2, "0")}</small></button>`).join("")}
          </aside>
        </div>
      </article>`;
    showReader(copy);
  };

  const open = (id) => {
    stack.length = 0;
    currentId = "";
    render(id, false);
  };
  const close = () => {
    reader.hidden = true;
    document.body.classList.remove("lux-reader-open");
    stack.length = 0;
    currentId = "";
    if (location.hash.startsWith("#event-") || location.hash.startsWith("#reader-")) history.replaceState(null, "", `${location.pathname}${location.search}`);
  };

  document.addEventListener("click", (event) => {
    const eventTrigger = event.target.closest("[data-event-open]");
    if (eventTrigger) {
      event.preventDefault();
      renderEvent(eventTrigger.dataset.eventOpen);
      return;
    }
    const archive = event.target.closest("[data-reader-archive]");
    if (archive) {
      event.preventDefault();
      stack.length = 0;
      currentId = "";
      renderArchive(false);
      return;
    }
    const trigger = event.target.closest("[data-reader-open]");
    if (!trigger || !articles[trigger.dataset.readerOpen]) return;
    event.preventDefault();
    open(trigger.dataset.readerOpen);
  });
  body.addEventListener("click", (event) => {
    const archived = event.target.closest("[data-reader-archive-item]");
    if (archived) {
      render(archived.dataset.readerArchiveItem, true);
      return;
    }
    const related = event.target.closest("[data-reader-related]");
    if (related) render(related.dataset.readerRelated, true);
    const archiveFilter = event.target.closest("[data-reader-archive-filter]");
    if (archiveFilter) {
      const filter = archiveFilter.dataset.readerArchiveFilter || "all";
      body.querySelectorAll("[data-reader-archive-filter]").forEach((button) => {
        button.classList.toggle("is-active", button === archiveFilter);
      });
      body.querySelectorAll("[data-reader-archive-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.readerArchiveCategory !== filter;
      });
    }
  });
  body.addEventListener("scroll", syncReaderTop, { passive: true });
  backButton.addEventListener("click", () => {
    const previous = stack.pop();
    if (previous === "__archive") renderArchive(false);
    else if (previous) render(previous, false);
  });
  closeButtons.forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !reader.hidden) close();
  });
  if (events.some((event) => event.id === eventHash)) renderEvent(eventHash);
  else if (articles[readerHash]) open(readerHash);
}


document.addEventListener("DOMContentLoaded", initLuxReader);
