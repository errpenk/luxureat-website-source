const luxAssetBase = new URL(".", document.currentScript?.src || location.href);
const luxAsset = (path) => new URL(path, luxAssetBase).href;

const luxNav = document.querySelector(".lux-nav");
const luxMenu = document.querySelector(".lux-menu");

if (luxNav && luxMenu) {
  const setOpen = (open) => {
    luxNav.classList.toggle("open", open);
    luxMenu.setAttribute("aria-expanded", String(open));
    luxMenu.textContent = open ? luxMenu.dataset.open : luxMenu.dataset.closed;
  };

  luxMenu.addEventListener("click", () => {
    setOpen(!luxNav.classList.contains("open"));
  });

  luxNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function renderLuxProductCatalog() {
  const grid = document.querySelector("[data-caviar-grid]");
  const data = window.LUXUREAT_PRODUCT_DATA;
  if (!grid || !data?.products) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const labels = lang === "zh"
    ? { add: "加入购物袋", detail: "查看详情", badge: "限量珍藏" }
    : { add: "Add to Cart", detail: "View Details", badge: "Limited Reserve" };
  const formatMoney = (product) => `${product.currency || ""}${Math.round(Number(product.amount) || 0)}`;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const speciesFor = (key) => {
    if (key.includes("beluga")) return "beluga";
    if (key.includes("oscetra")) return "oscetra";
    if (key.includes("champagne") || key.includes("truffle")) return "pairing";
    return "service";
  };
  const entries = Object.entries(data.products).filter(([key]) => key.startsWith(`${lang}-`));
  if (!entries.length) return;

  grid.innerHTML = entries.map(([key, product], index) => `
    <article class="group cursor-pointer flex flex-col gap-6" data-caviar-item data-species="${speciesFor(key)}" data-price="${Number(product.amount) || 0}" data-recommendation="${index + 1}" data-title="${escapeHtml(product.title)}">
      <div class="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-low">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style="background-image: url('${escapeHtml(product.image)}');"></div>
        ${index === 0 ? `<div class="absolute top-4 left-4 border border-secondary/50 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md"><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">${labels.badge}</span></div>` : ""}
      </div>
      <div class="flex flex-col gap-2 border-t border-secondary/20 pt-4">
        <div class="flex justify-between items-start">
          <h2 class="font-headline-md text-headline-sm md:text-headline-md text-on-surface">${escapeHtml(product.title)}</h2>
          <span class="font-body-lg text-body-lg text-secondary">${escapeHtml(formatMoney(product))} / ${escapeHtml(product.unit)}</span>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant line-clamp-2">${escapeHtml(product.desc)}</p>
        <div class="mt-4 flex items-center gap-4">
          <button class="border border-primary text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm hover:bg-primary hover:text-surface-container-lowest transition-all duration-300 w-full md:w-auto" data-bag-add data-bag-id="${escapeHtml(product.id)}" data-bag-title="${escapeHtml(product.title)}" data-bag-subtitle="${escapeHtml(product.subtitle)}" data-bag-price="${escapeHtml(product.amount)}" data-bag-currency="${escapeHtml(product.currency)}" data-bag-image="${escapeHtml(product.image)}" type="button">${labels.add}</button>
          <button class="border border-outline-variant text-on-surface hover:border-primary hover:text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm transition-all duration-300 w-full md:w-auto" data-product-open="${escapeHtml(key)}" type="button">${labels.detail}</button>
        </div>
      </div>
    </article>`).join("");
}

function initLuxCaviarControls() {
  const controls = document.querySelector("[data-lux-caviar-controls]");
  const grid = document.querySelector("[data-caviar-grid]");
  const items = grid ? Array.from(grid.querySelectorAll("[data-caviar-item]")) : [];

  if (!controls || !grid || !items.length) {
    return;
  }

  const filterButtons = Array.from(controls.querySelectorAll("[data-caviar-filter]"));
  const viewButtons = Array.from(controls.querySelectorAll("[data-caviar-view]"));
  const sortButton = controls.querySelector("[data-caviar-sort]");
  const sortLabel = controls.querySelector("[data-caviar-sort-label]");
  const sortMenu = controls.querySelector("[data-caviar-sort-menu]");
  const sortItems = Array.from(controls.querySelectorAll("[data-caviar-sort-option]"));
  const count = document.querySelector("[data-caviar-count]");
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";

  const activeButtonClasses = ["border-primary", "text-primary", "bg-primary/10"];
  const inactiveButtonClasses = ["border-outline-variant", "text-on-surface-variant"];
  const activeIconClasses = ["text-primary"];
  const inactiveIconClasses = ["text-on-surface-variant"];
  const sortOptions = [
    {
      key: "recommended",
      label: lang === "zh" ? "推荐排列" : "Recommended",
      compare: (a, b) => Number(a.dataset.recommendation) - Number(b.dataset.recommendation),
    },
    {
      key: "price-asc",
      label: lang === "zh" ? "价格升序" : "Price: Low to High",
      compare: (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
    },
    {
      key: "price-desc",
      label: lang === "zh" ? "价格降序" : "Price: High to Low",
      compare: (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
    },
  ];

  let activeFilter = "all";
  let activeView = "grid";
  let activeSortKey = "recommended";

  const setPressed = (buttons, activeButton, activeClasses, inactiveClasses) => {
    buttons.forEach((button) => {
      const isActive = button === activeButton;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("hover:text-primary", !isActive);
      activeClasses.forEach((className) => button.classList.toggle(className, isActive));
      inactiveClasses.forEach((className) => button.classList.toggle(className, !isActive));
    });
  };

  const applyFilter = () => {
    let visibleCount = 0;

    items.forEach((item) => {
      const matchesFilter = activeFilter === "all" || item.dataset.species === activeFilter;
      item.hidden = !matchesFilter;
      if (matchesFilter) {
        visibleCount += 1;
      }
    });

    if (count) {
      count.textContent = String(visibleCount);
    }
  };

  const applyView = () => {
    grid.classList.toggle("is-list", activeView === "list");
    const activeButton = viewButtons.find((button) => button.dataset.caviarView === activeView);
    setPressed(viewButtons, activeButton, activeIconClasses, inactiveIconClasses);
  };

  const applySort = () => {
    const option = sortOptions.find((item) => item.key === activeSortKey) || sortOptions[0];
    if (sortButton) {
      sortButton.dataset.caviarSort = option.key;
      sortButton.setAttribute("aria-expanded", "false");
      sortButton.setAttribute("aria-label", `${lang === "zh" ? "排序方式" : "Sort by"}: ${option.label}`);
    }
    if (sortLabel) {
      sortLabel.textContent = option.label;
    }
    sortItems.forEach((item) => {
      const selected = item.dataset.caviarSortOption === option.key;
      item.setAttribute("aria-selected", String(selected));
      item.classList.toggle("is-selected", selected);
    });

    items
      .slice()
      .sort(option.compare)
      .forEach((item) => grid.appendChild(item));
  };

  const setSortOpen = (open) => {
    if (!sortButton || !sortMenu) return;
    sortButton.setAttribute("aria-expanded", String(open));
    sortMenu.hidden = !open;
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.caviarFilter || "all";
      setPressed(filterButtons, button, activeButtonClasses, inactiveButtonClasses);
      applyFilter();
    });
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeView = button.dataset.caviarView || "grid";
      applyView();
    });
  });

  if (sortButton) {
    sortButton.addEventListener("click", () => {
      setSortOpen(sortMenu?.hidden ?? true);
    });
  }

  sortItems.forEach((item) => {
    item.addEventListener("click", () => {
      activeSortKey = item.dataset.caviarSortOption || "recommended";
      applySort();
      setSortOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!controls.contains(event.target)) setSortOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setSortOpen(false);
  });

  applyFilter();
  applyView();
  applySort();
}

renderLuxProductCatalog();
initLuxCaviarControls();

(() => {
  const prefetched = new Set();

  const hrefFor = (anchor) => {
    const href = anchor?.getAttribute?.("href");
    if (!href || href.startsWith("#") || anchor.target || anchor.hasAttribute("download")) return "";

    const url = new URL(href, location.href);
    if (url.origin !== location.origin || url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (url.pathname === location.pathname && url.search === location.search) return "";
    if (!url.pathname.endsWith("/") && !url.pathname.endsWith(".html")) return "";

    url.hash = "";
    return url.href;
  };

  const prefetch = (target) => {
    const anchor = target?.closest?.("a[href]");
    const href = hrefFor(anchor);
    if (!href || prefetched.has(href)) return;

    prefetched.add(href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = href;
    document.head.appendChild(link);
  };

  document.addEventListener("pointerover", (event) => prefetch(event.target), { passive: true });
  document.addEventListener("focusin", (event) => prefetch(event.target));
  document.addEventListener("touchstart", (event) => prefetch(event.target), { passive: true });
})();

(() => {
  const key = `luxureatScroll:${location.pathname}`;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  const save = () => sessionStorage.setItem(key, String(window.scrollY || 0));
  const restore = () => {
    const y = Number(sessionStorage.getItem(key) || 0);
    window.scrollTo(0, Number.isFinite(y) ? y : 0);
  };

  document.addEventListener("DOMContentLoaded", () => requestAnimationFrame(restore));
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
})();

(() => {
  const lang = () => document.documentElement.lang?.startsWith("zh") ? "返回顶部" : "Back to top";

  const init = () => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "lux-back-to-top";
    button.setAttribute("aria-label", lang());
    button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">arrow_upward</span>';
    document.body.appendChild(button);

    const update = () => button.classList.toggle("visible", window.scrollY > 360);
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      sessionStorage.setItem(`luxureatScroll:${location.pathname}`, "0");
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
  };

  document.addEventListener("DOMContentLoaded", init);
})();

function initLuxReader() {
  const triggers = document.querySelectorAll("[data-reader-open], [data-reader-archive]");
  if (!triggers.length) return;

  const articleData = window.LUXUREAT_ARTICLE_DATA || {};
  const articles = articleData.articles || {};
  if (!Object.keys(articles).length) return;

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

  const syncReaderCards = () => {
    const seen = new Set();
    const sync = (node, article) => {
      if (!node || seen.has(node)) return;
      seen.add(node);
      const image = node.querySelector("img");
      const background = node.querySelector(".lux-dark-photo-bg, [style*='background-image']");
      if (image) {
        image.src = article.image;
        image.alt = article.title;
      } else if (background) {
        background.style.backgroundImage = `url("${article.image}")`;
      }
      const heading = node.querySelector("h1,h2,h3,h4");
      if (heading) heading.textContent = article.title;
      const eyebrow = Array.from(node.querySelectorAll("span"))
        .find((span) => !span.closest("a,button") && !span.classList.contains("material-symbols-outlined") && /\D/.test(span.textContent.trim()) && span.textContent.trim().length < 64);
      if (eyebrow) eyebrow.textContent = article.eyebrow;
      const paragraph = node.querySelector("p");
      if (paragraph) paragraph.textContent = article.cardText || article.intro;
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
                <span class="lux-reader-archive-media"><img src="${escapeHtml(item.image)}" alt=""><span class="lux-reader-archive-cta">${copy.read}</span></span>
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
    const articleSections = article.sections.length ? article.sections : [[copy.note, copy.noteText]];
    const paragraphs = (content) => (Array.isArray(content) ? content : [content])
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    const plainText = [article.intro, ...articleSections.flatMap(([, content]) => Array.isArray(content) ? content : [content])].join("");
    const minutes = Math.max(4, Math.ceil(plainText.length / (article.lang === "zh" ? 450 : 900)));
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
    const sectionHtml = articleSections.map(([heading, content], index) => `
          <section class="lux-reader-section" id="lux-reader-section-${index}">
            <h3>${escapeHtml(heading)}</h3>
            ${paragraphs(content)}
          </section>`).join("");
    const tocHtml = articleSections.map(([heading], index) => `<a href="#lux-reader-section-${index}">${escapeHtml(heading)}</a>`).join("");

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
            <img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}">
            <figcaption>Figure 01 / ${escapeHtml(article.eyebrow)}</figcaption>
          </figure>
        </section>
        <section class="lux-reader-content">
          <aside class="lux-reader-aside">
            ${asideRows.map(([label, value]) => `<span>${escapeHtml(label)}：${escapeHtml(value)}</span>`).join("")}
          </aside>
          <div class="lux-reader-copy">
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
                      <img src="${escapeHtml(item.image)}" alt="">
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
  };

  document.addEventListener("click", (event) => {
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
}

function initLuxInfoPopovers() {
  const buttons = document.querySelectorAll("[data-info-popover]");
  if (!buttons.length) return;

  const popover = document.createElement("div");
  popover.className = "lux-info-popover";
  popover.hidden = true;
  document.body.appendChild(popover);

  let activeButton = null;
  let closeTimer = 0;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

  const clearCloseTimer = () => {
    clearTimeout(closeTimer);
    closeTimer = 0;
  };
  const close = () => {
    clearCloseTimer();
    popover.hidden = true;
    if (activeButton) activeButton.setAttribute("aria-expanded", "false");
    activeButton = null;
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      if (activeButton?.matches(":hover, :focus") || popover.matches(":hover, :focus-within")) return;
      close();
    }, 90);
  };
  const place = (button) => {
    const rect = button.getBoundingClientRect();
    const top = Math.min(window.innerHeight - 150, rect.bottom + 12);
    const left = Math.min(window.innerWidth - 280, Math.max(16, rect.right - 260));
    popover.style.top = `${Math.max(16, top)}px`;
    popover.style.left = `${left}px`;
  };
  const open = (button) => {
    clearCloseTimer();
    if (activeButton === button && !popover.hidden) {
      place(button);
      return;
    }
    if (activeButton) activeButton.setAttribute("aria-expanded", "false");
    activeButton = button;
    button.setAttribute("aria-expanded", "true");
    popover.innerHTML = `<strong>${escapeHtml(button.dataset.infoTitle || "")}</strong><p>${escapeHtml(button.dataset.infoText || "")}</p>`;
    place(button);
    popover.hidden = false;
  };

  buttons.forEach((button) => {
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("mouseenter", () => open(button));
    button.addEventListener("focus", () => open(button));
    button.addEventListener("mouseleave", scheduleClose);
    button.addEventListener("blur", scheduleClose);
  });
  popover.addEventListener("mouseenter", clearCloseTimer);
  popover.addEventListener("mouseleave", scheduleClose);
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && !activeButton?.contains(event.target)) close();
  });
  window.addEventListener("resize", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function initLuxProductDetails() {
  const triggers = document.querySelectorAll("[data-product-open]");
  const productData = window.LUXUREAT_PRODUCT_DATA || {};
  const galleries = productData.galleries || {};
  const products = productData.products || {};
  const hash = location.hash || "";
  if (!triggers.length && !hash.startsWith("#product-")) return;
  if (!Object.keys(products).length) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const formatMoney = (currency, amount) => `${currency}${Math.round(Number(amount) || 0)}`;
  const copy = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", add: "加入购物袋", detail: "查看详情", qty: "数量", remove: "移除", recent: "最近浏览过", specs: ["鲟鱼品种 SPECIES", "颗粒直径 SIZE", "珍珠色泽 COLOR", "味觉特征 PROFILE"], story: "传承与自然的洗礼", note: "LuxurEat 以冷链、批次记录与开罐服务标准确保每一次品鉴都保持稳定、清晰且可追溯。" }
    : { back: "Back", close: "Close", add: "Add to Cart", detail: "View Details", qty: "Qty", remove: "Remove", recent: "Recently Viewed", specs: ["Species", "Pearl Size", "Color", "Profile"], story: "Heritage & Origin", note: "LuxurEat protects every tasting with cold-chain handling, batch records, and precise opening standards." };
  const totalLabel = (quantity) => document.documentElement.lang?.startsWith("zh") ? `${quantity}件总价` : `${quantity}-item total`;
  const maxQuantity = () => window.LuxureatBag?.maxQuantity || 99;
  const clampQuantity = (quantity) => Math.min(maxQuantity(), Math.max(1, Number(quantity) || 1));
  const galleryFor = (product) => {
    if (product.id.includes("beluga")) return galleries.beluga;
    if (product.id.includes("oscetra")) return galleries.oscetra;
    if (product.id.includes("spoon")) return galleries.spoon;
    if (product.id.includes("champagne")) return galleries.champagne;
    if (product.id.includes("ice-server")) return galleries.ice;
    if (product.id.includes("truffle")) return galleries.truffle;
    return [product.image];
  };

  const detail = document.createElement("div");
  detail.className = "lux-product-detail";
  detail.hidden = true;
  detail.innerHTML = `<div class="lux-product-backdrop" data-product-close></div><section class="lux-product-panel" role="dialog" aria-modal="true" aria-labelledby="lux-product-title"><button class="lux-product-back" type="button" data-product-back hidden></button><button class="lux-product-close" type="button" data-product-close></button><div class="lux-product-body" tabindex="-1"></div></section>`;
  document.body.appendChild(detail);
  const body = detail.querySelector(".lux-product-body");
  const backButton = detail.querySelector(".lux-product-back");
  const closeButton = detail.querySelector(".lux-product-close");
  let openedByPush = false;
  let currentProductId = "";
  const productStack = [];

  const updateSelectedTotal = (quantity) => {
    const labels = copy();
    const addButton = detail.querySelector(".lux-product-purchase [data-bag-add]");
    const total = detail.querySelector("[data-product-total]");
    const amount = Number(addButton?.dataset.bagPrice || 0);
    if (!total || !amount || quantity <= 1) {
      if (total) total.hidden = true;
      return;
    }
    total.hidden = false;
    total.textContent = `${totalLabel(quantity)}: ${formatMoney(addButton.dataset.bagCurrency || "$", amount * quantity)}`;
  };
  const syncSelectedQuantity = (quantity) => {
    const next = clampQuantity(quantity);
    const output = detail.querySelector("[data-product-quantity-value]");
    const addButton = detail.querySelector(".lux-product-purchase [data-bag-add]");
    const minus = detail.querySelector('[data-product-quantity="-1"]');
    const plus = detail.querySelector('[data-product-quantity="1"]');
    if (output) {
      output.value = String(next);
      output.textContent = String(next);
    }
    if (addButton) addButton.dataset.bagQuantity = String(next);
    if (minus) minus.disabled = next <= 1;
    if (plus) plus.disabled = next >= maxQuantity();
    updateSelectedTotal(next);
  };

  const updateProductBagState = () => {
    const product = products[currentProductId];
    const state = detail.querySelector("[data-product-cart-state]");
    if (!product || !state) return;
    const labels = copy();
    const quantity = window.LuxureatBag?.items().find((item) => item.id === product.id)?.quantity || 0;
    state.hidden = !quantity;
    const text = state.querySelector("[data-product-cart-text]");
    const total = quantity > 1 ? ` · ${totalLabel(quantity)}: ${formatMoney(product.currency, product.amount * quantity)}` : "";
    if (text) text.textContent = document.documentElement.lang?.startsWith("zh") ? `已加入购物袋：${quantity}${total}` : `In Cart: ${quantity}${total}`;
  };
  const syncRecentNav = () => {
    const grid = detail.querySelector(".lux-product-recent-grid");
    const buttons = detail.querySelectorAll("[data-product-recent-scroll]");
    if (!grid || !buttons.length) return;
    const max = grid.scrollWidth - grid.clientWidth;
    buttons.forEach((button) => {
      const disabled = max <= 1 || (Number(button.dataset.productRecentScroll) < 0 ? grid.scrollLeft <= 1 : grid.scrollLeft >= max - 1);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });
  };

  const render = (id, push) => {
    const product = products[id];
    if (!product) return;
    if (push && !detail.hidden && currentProductId && currentProductId !== id) productStack.push(currentProductId);
    currentProductId = id;
    const labels = copy();
    const galleryImages = Array.from(new Set(galleryFor(product).filter(Boolean)));
    const prefix = id.startsWith("zh-") ? "zh-" : "en-";
    const recommendations = Object.entries(products).filter(([key]) => key !== id && key.startsWith(prefix)).slice(0, 4);
    body.innerHTML = `
      <article>
        <section class="lux-product-hero">
          <div class="lux-product-gallery">
            <div class="lux-product-thumbs" aria-label="${escapeHtml(product.title)} gallery">
              ${galleryImages.map((src, index) => `<button type="button" class="lux-product-thumb${index === 0 ? " is-active" : ""}" data-product-gallery="${index}" aria-label="${escapeHtml(product.title)} ${index + 1}"><img src="${escapeHtml(src)}" alt="${escapeHtml(product.title)} ${index + 1}"></button>`).join("")}
            </div>
            <div class="lux-product-image"><img data-product-main-image src="${escapeHtml(galleryImages[0] || product.image)}" alt="${escapeHtml(product.title)}"></div>
          </div>
          <div class="lux-product-summary">
            <span>${escapeHtml(product.eyebrow)}</span>
            <h2 id="lux-product-title">${escapeHtml(product.title)}</h2>
            <p>${escapeHtml(product.desc)}</p>
            <strong class="lux-product-price">${escapeHtml(formatMoney(product.currency, product.amount))} <small>/ ${escapeHtml(product.unit)}</small><em data-product-total hidden></em></strong>
            <div class="lux-product-purchase">
              <div class="lux-product-qty" aria-label="${escapeHtml(labels.qty)}">
                <button type="button" data-product-quantity="-1" aria-label="${escapeHtml(labels.qty)} -">−</button>
                <output data-product-quantity-value>1</output>
                <button type="button" data-product-quantity="1" aria-label="${escapeHtml(labels.qty)} +">+</button>
              </div>
              <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${escapeHtml(product.id)}" data-bag-title="${escapeHtml(product.title)}" data-bag-subtitle="${escapeHtml(product.subtitle)}" data-bag-price="${escapeHtml(product.amount)}" data-bag-currency="${escapeHtml(product.currency)}" data-bag-image="${escapeHtml(product.image)}">${labels.add}</button>
            </div>
            <div class="lux-product-cart-state" data-product-cart-state hidden>
              <span data-product-cart-text></span>
              <button type="button" data-bag-remove="${escapeHtml(product.id)}">${escapeHtml(labels.remove)}</button>
            </div>
          </div>
        </section>
        <section class="lux-product-specs">
          ${product.specs.map((value, index) => `<div><span>${escapeHtml(labels.specs[index])}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
        </section>
        <section class="lux-product-story">
          <h3>${labels.story}</h3>
          <p>${escapeHtml(product.desc)} ${escapeHtml(labels.note)}</p>
        </section>
        ${recommendations.length ? `<section class="lux-product-recent">
          <div class="lux-product-recent-inner">
          <h3>${escapeHtml(labels.recent)}</h3>
          <div class="lux-product-recent-grid">
            ${recommendations.map(([key, item]) => `<article class="lux-product-recent-card">
              <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(formatMoney(item.currency, item.amount))} / ${escapeHtml(item.unit)}</small>
              <div class="lux-product-recent-actions">
                <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${escapeHtml(item.id)}" data-bag-title="${escapeHtml(item.title)}" data-bag-subtitle="${escapeHtml(item.subtitle)}" data-bag-price="${escapeHtml(item.amount)}" data-bag-currency="${escapeHtml(item.currency)}" data-bag-image="${escapeHtml(item.image)}">${escapeHtml(labels.add)}</button>
                <button type="button" data-product-open="${escapeHtml(key)}">${escapeHtml(labels.detail)}</button>
              </div>
            </article>`).join("")}
          </div>
          <div class="lux-product-recent-nav">
            <button type="button" data-product-recent-scroll="-1" aria-label="${escapeHtml(labels.back)}" disabled aria-disabled="true"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button>
            <button type="button" data-product-recent-scroll="1" aria-label="${escapeHtml(labels.detail)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>
          </div>
        </section>` : ""}
      </article>`;
    backButton.textContent = labels.back;
    backButton.hidden = !productStack.length;
    closeButton.textContent = labels.close;
    syncSelectedQuantity(1);
    updateProductBagState();
    const recentGrid = detail.querySelector(".lux-product-recent-grid");
    if (recentGrid) {
      recentGrid.addEventListener("scroll", syncRecentNav, { passive: true });
      requestAnimationFrame(syncRecentNav);
    }
    detail.hidden = false;
    document.body.classList.add("lux-reader-open");
    body.focus();
    body.scrollTop = 0;
    if (push) {
      history.pushState({ luxProduct: id }, "", `#product-${id}`);
      openedByPush = true;
    }
  };
  detail.addEventListener("click", (event) => {
    const productBack = event.target.closest("[data-product-back]");
    if (productBack) {
      const previous = productStack.pop();
      if (previous) {
        render(previous, false);
        history.replaceState({ luxProduct: previous }, "", `#product-${previous}`);
      }
      return;
    }
    const recentScroll = event.target.closest("[data-product-recent-scroll]");
    if (recentScroll) {
      if (recentScroll.disabled) return;
      const grid = detail.querySelector(".lux-product-recent-grid");
      grid?.scrollBy({ left: Number(recentScroll.dataset.productRecentScroll) * grid.clientWidth, behavior: "smooth" });
      return;
    }
    const galleryButton = event.target.closest("[data-product-gallery]");
    if (galleryButton) {
      const thumbImage = galleryButton.querySelector("img");
      const mainImage = detail.querySelector("[data-product-main-image]");
      if (thumbImage && mainImage) {
        mainImage.src = thumbImage.src;
        mainImage.alt = thumbImage.alt;
        detail.querySelectorAll("[data-product-gallery]").forEach((button) => button.classList.remove("is-active"));
        galleryButton.classList.add("is-active");
      }
      return;
    }
    const button = event.target.closest("[data-product-quantity]");
    if (!button) return;
    if (button.disabled) return;
    const output = detail.querySelector("[data-product-quantity-value]");
    syncSelectedQuantity(Number(output?.value || output?.textContent || 1) + Number(button.dataset.productQuantity));
  });
  const close = () => {
    detail.hidden = true;
    document.body.classList.remove("lux-reader-open");
    if (openedByPush) history.replaceState(null, "", `${location.pathname}${location.search}`);
    openedByPush = false;
    currentProductId = "";
    productStack.length = 0;
  };

  document.addEventListener("lux-bag-change", updateProductBagState);
  window.addEventListener("resize", syncRecentNav);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product-open]");
    if (!trigger) return;
    const productId = trigger.dataset.productOpen;
    if (!products[productId]) return;
    if (trigger.href && new URL(trigger.href, location.href).pathname !== location.pathname) return;
    event.preventDefault();
    render(productId, true);
  });
  detail.querySelectorAll("[data-product-close]").forEach((button) => button.addEventListener("click", close));
  window.addEventListener("popstate", () => {
    if (!detail.hidden) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !detail.hidden) close();
  });

  const initialId = hash.replace(/^#product-/, "");
  if (products[initialId]) render(initialId, false);
}

function initLuxGiftScroller() {
  const grid = document.querySelector("[data-gift-grid]");
  const buttons = document.querySelectorAll("[data-gift-scroll]");
  if (!grid || !buttons.length) return;
  const sync = () => {
    const max = grid.scrollWidth - grid.clientWidth;
    buttons.forEach((button) => {
      const disabled = max <= 1 || (Number(button.dataset.giftScroll) < 0 ? grid.scrollLeft <= 1 : grid.scrollLeft >= max - 1);
      button.disabled = disabled;
      button.setAttribute("aria-disabled", String(disabled));
    });
  };
  buttons.forEach((button) => button.addEventListener("click", () => {
    if (button.disabled) return;
    grid.scrollBy({ left: Number(button.dataset.giftScroll) * grid.clientWidth, behavior: "smooth" });
  }));
  grid.addEventListener("scroll", sync, { passive: true });
  window.addEventListener("resize", sync);
  requestAnimationFrame(sync);
}

function initLuxFooterActions() {
  const triggers = document.querySelectorAll("[data-footer-modal]");
  if (!triggers.length) return;

  const isZh = document.documentElement.lang?.startsWith("zh");
  const scriptSrc = document.querySelector("script[src*='main.js']")?.src || `${location.origin}/main.js`;
  const asset = (file) => new URL(`assets/${file}`, scriptSrc).href;
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const copy = isZh
    ? {
      close: "关闭",
      privacy: ["隐私政策", "我们仅收集咨询、订单与售后服务所需的信息，并用于客户沟通、冷链履约、合规记录与服务改进。未经许可，我们不会出售您的个人信息。"],
      terms: ["销售条款", "所有商品以确认订单与付款记录为准。鱼子酱等冷链商品因食品安全原因，发出后非质量问题不支持退换；如运输异常，请在签收后 24 小时内联系我们。"],
      shipping: ["配送说明", "我们采用 0-4°C 冷链包装与预约配送。发货前会确认收货时间，偏远地区或特殊活动订单将由顾问单独确认时效。"],
      wechat: ["微信", "请扫描二维码联系 LuxurEat 中国顾问。"],
    }
    : {
      close: "Close",
      privacy: ["Privacy Policy", "We collect only the information needed for inquiries, orders, after-sales support, cold-chain fulfillment, compliance records, and service improvement. We do not sell personal information."],
      terms: ["Terms of Sale", "Orders are confirmed by written order details and payment records. For food-safety reasons, shipped cold-chain goods are not returnable unless quality or transport issues are reported within 24 hours of delivery."],
      shipping: ["Shipping", "We ship with 0-4°C cold-chain packaging and scheduled delivery. Timing is confirmed before dispatch; remote areas and special-event orders are coordinated by a concierge."],
      wechat: ["WeChat", "Scan the QR code to contact the LuxurEat China concierge."],
    };

  const modal = document.createElement("div");
  modal.className = "lux-footer-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="lux-footer-modal-backdrop" data-footer-close></div>
    <section class="lux-footer-modal-panel" role="dialog" aria-modal="true">
      <button type="button" class="lux-footer-modal-close" data-footer-close></button>
      <div class="lux-footer-modal-body" tabindex="-1"></div>
    </section>`;
  document.body.appendChild(modal);

  const body = modal.querySelector(".lux-footer-modal-body");
  const closeButton = modal.querySelector(".lux-footer-modal-close");
  const open = (key) => {
    const item = copy[key];
    if (!item) return;
    const qr = key === "wechat" ? `<img class="lux-footer-qr" src="${asset("wechat-qr.png")}" alt="WeChat QR">` : "";
    body.innerHTML = `<h2>${escapeHtml(item[0])}</h2><p>${escapeHtml(item[1])}</p>${qr}`;
    closeButton.textContent = copy.close;
    modal.hidden = false;
    document.body.classList.add("lux-reader-open");
    body.focus();
  };
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("lux-reader-open");
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-footer-modal]");
    if (trigger) {
      event.preventDefault();
      open(trigger.dataset.footerModal);
    }
  });
  modal.querySelectorAll("[data-footer-close]").forEach((button) => button.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLuxReader();
  initLuxInfoPopovers();
  initLuxProductDetails();
  initLuxGiftScroller();
  initLuxFooterActions();
});

(() => {
  const key = "luxureatBag";
  const maxQuantity = 99;
  const clampQuantity = (quantity) => Math.min(maxQuantity, Math.max(1, Number(quantity) || 1));
  const locale = () => document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const liveProductEntry = (id, lang = locale()) => {
    const products = window.LUXUREAT_PRODUCT_DATA?.products || {};
    const entries = Object.entries(products);
    return entries.find(([productKey, product]) => productKey.startsWith(`${lang}-`) && product.id === id)
      || entries.find(([, product]) => product.id === id);
  };
  const liveProduct = (id) => liveProductEntry(id)?.[1];
  const cleanProduct = (product) => ({
    id: String(product.id || "").trim(),
    title: String(product.title || "").trim(),
    subtitle: String(product.subtitle || "").trim(),
    price: Number(product.price ?? product.amount) || 0,
    currency: product.currency || "$",
    image: product.image || "",
    quantity: clampQuantity(product.quantity),
  });
  const currentItem = (item) => {
    const live = liveProduct(item.id);
    return cleanProduct(live ? { ...live, price: live.amount, quantity: item.quantity } : item);
  };

  const read = () => {
    try {
      const items = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(items) ? items.map(currentItem).filter((item) => item.id && item.title) : [];
    } catch (_) {
      return [];
    }
  };

  const save = (items) => {
    localStorage.setItem(key, JSON.stringify(items));
    renderBag();
    document.dispatchEvent?.(new CustomEvent("lux-bag-change"));
    return items;
  };

  const api = {
    maxQuantity,
    items: read,
    add(product) {
      const next = cleanProduct(product || {});
      if (!next.id || !next.title) return read();

      const items = read();
      const existing = items.find((item) => item.id === next.id);
      if (existing) {
        existing.quantity = clampQuantity(existing.quantity + next.quantity);
      } else {
        items.push(next);
      }
      return save(items);
    },
    change(id, delta) {
      const items = read()
        .map((item) => item.id === id ? { ...item, quantity: clampQuantity(item.quantity + delta) } : item);
      return save(items);
    },
    remove(id) {
      return save(read().filter((item) => item.id !== id));
    },
    subtotal() {
      return read().reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    count() {
      return read().reduce((sum, item) => sum + item.quantity, 0);
    },
  };

  window.LuxureatBag = api;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));

  const money = (currency, amount) => `${currency}${Math.round(Number(amount) || 0)}`;

  const productImage = (button) => {
    const source = button.closest("[data-bag-card], .lux-product-recent-card, [data-caviar-item], .lux-bag-recommendations .group, article")
      || button.closest("section, main")
      || document;
    const img = source.querySelector("img");
    if (img?.src) return img.src;

    const tile = source.querySelector("[style*='background-image']");
    const match = tile?.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    return match?.[1] || "";
  };

  const productFromButton = (button) => ({
    id: button.dataset.bagId,
    title: button.dataset.bagTitle,
    subtitle: button.dataset.bagSubtitle,
    price: button.dataset.bagPrice,
    currency: button.dataset.bagCurrency,
    image: button.dataset.bagImage || productImage(button),
    quantity: button.dataset.bagQuantity,
  });

  const detailProductId = (item, lang) => {
    return liveProductEntry(item.id, lang)?.[0] || "";
  };

  const itemHtml = (item, lang) => {
    const quantity = clampQuantity(item.quantity);
    const lineTotal = quantity > 1 ? `<small class="lux-bag-line-total">${lang === "zh" ? `${item.quantity}件总价` : `${item.quantity}-item total`} ${money(item.currency, item.price * quantity)}</small>` : "";
    const detailId = detailProductId(item, lang);
    const minDisabled = quantity <= 1 ? " disabled aria-disabled=\"true\"" : "";
    const maxDisabled = quantity >= maxQuantity ? " disabled aria-disabled=\"true\"" : "";
    return `
    <div class="lux-bag-item flex flex-col md:flex-row gap-6 p-6 border border-outline-variant/30 bg-surface-container-lowest group" data-bag-item="${escapeHtml(item.id)}">
      <div class="lux-bag-image w-full md:w-48 h-48 overflow-hidden bg-surface-container">
        ${item.image ? `<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">` : ""}
        ${detailId ? `<button class="lux-bag-detail" type="button" data-product-open="${escapeHtml(detailId)}">${lang === "zh" ? "查看详情" : "View Details"}</button>` : ""}
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between gap-6 items-start">
          <div>
            <h3 class="font-headline-sm text-headline-sm mb-1">${escapeHtml(item.title)}</h3>
            <p class="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4">${escapeHtml(item.subtitle)}</p>
          </div>
          <span class="lux-bag-price font-headline-sm text-headline-sm text-primary whitespace-nowrap">${money(item.currency, item.price)}${lineTotal}</span>
        </div>
        <div class="flex justify-between items-end mt-8">
          <div class="flex items-center gap-4">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">${lang === "zh" ? "数量" : "Qty"}</span>
            <div class="flex items-center border border-outline-variant/30">
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="-1" data-bag-id="${escapeHtml(item.id)}" type="button"${minDisabled}><span class="material-symbols-outlined text-sm">remove</span></button>
              <span class="w-12 text-center font-label-lg">${quantity}</span>
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="1" data-bag-id="${escapeHtml(item.id)}" type="button"${maxDisabled}><span class="material-symbols-outlined text-sm">add</span></button>
            </div>
          </div>
          <button class="text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 font-label-sm uppercase tracking-widest" data-bag-remove="${escapeHtml(item.id)}" type="button">
            <span class="material-symbols-outlined text-lg">delete</span>
            <span>${lang === "zh" ? "移除" : "Remove"}</span>
          </button>
        </div>
      </div>
    </div>`;
  };

  const updateNavCount = () => {
    document.querySelectorAll(".lux-actions .lux-bag-link").forEach((link) => {
      const count = api.count();
      const badge = link.querySelector("[data-bag-count]");
      if (badge) {
        badge.textContent = count ? String(count) : "";
        badge.hidden = count === 0;
        return;
      }

      link.dataset.bagLabel ||= link.textContent.trim().replace(/\s*\(\d+\)$/, "");
      link.textContent = count ? `${link.dataset.bagLabel} (${count})` : link.dataset.bagLabel;
    });
  };

  const renderRecommendations = () => {
    const grid = document.querySelector(".lux-bag-recommendations .grid");
    const products = window.LUXUREAT_PRODUCT_DATA?.products || {};
    if (!grid || !Object.keys(products).length) return;

    const lang = locale();
    const copy = lang === "zh"
      ? { add: "加入清单", detail: "查看详情" }
      : { add: "Add to List", detail: "View Details" };
    const entries = Object.entries(products).filter(([key]) => key.startsWith(`${lang}-`)).slice(2);
    if (!entries.length) return;

    grid.innerHTML = entries.map(([key, product]) => `
      <div class="group cursor-pointer" data-bag-card>
        <div class="aspect-square bg-surface-container overflow-hidden mb-6 ghost-border relative">
          <img class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
            <button type="button" class="px-6 py-3 border border-white text-white font-label-sm uppercase tracking-widest bg-black/20 backdrop-blur-sm" data-bag-add data-bag-id="${escapeHtml(product.id)}" data-bag-title="${escapeHtml(product.title)}" data-bag-subtitle="${escapeHtml(product.subtitle)}" data-bag-price="${escapeHtml(product.amount)}" data-bag-currency="${escapeHtml(product.currency)}" data-bag-image="${escapeHtml(product.image)}">${copy.add}</button>
            <button type="button" class="px-6 py-3 border border-primary text-primary font-label-sm uppercase tracking-widest bg-black/20 backdrop-blur-sm" data-product-open="${escapeHtml(key)}">${copy.detail}</button>
          </div>
        </div>
        <h4 class="font-label-lg text-label-lg uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">${escapeHtml(product.title)}</h4>
        <p class="font-label-sm text-label-sm text-on-surface-variant mb-2">${escapeHtml(product.subtitle)}</p>
        <span class="font-body-md text-primary">${money(product.currency, Number(product.amount) || 0)}</span>
      </div>`).join("");
  };

  const renderBag = () => {
    updateNavCount();

    const list = document.querySelector("[data-bag-list]");
    if (!list) return;

    const lang = list.dataset.bagLocale || locale();
    const items = read();
    const currency = items[0]?.currency || (lang === "zh" ? "¥" : "$");
    const shipping = items.length ? Number(list.dataset.bagShipping || (lang === "zh" ? 200 : 20)) : 0;
    const subtotal = api.subtotal();

    list.innerHTML = items.length
      ? items.map((item) => itemHtml(item, lang)).join("")
      : `<div class="p-8 border border-outline-variant/30 text-on-surface-variant">${lang === "zh" ? "您的购物袋暂时为空。" : "Your shopping bag is empty."}</div>`;

    document.querySelectorAll("[data-bag-subtotal]").forEach((el) => { el.textContent = money(currency, subtotal); });
    document.querySelectorAll("[data-bag-shipping-total]").forEach((el) => { el.textContent = money(currency, shipping); });
    document.querySelectorAll("[data-bag-total]").forEach((el) => { el.textContent = money(currency, subtotal + shipping); });
  };

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-bag-add]");
    if (addButton) {
      api.add(productFromButton(addButton));
      addButton.dataset.bagOriginal ||= addButton.textContent.trim();
      addButton.textContent = locale() === "zh" ? "已加入" : "Added";
      setTimeout(() => { addButton.textContent = addButton.dataset.bagOriginal; }, 900);
      return;
    }

    const changeButton = event.target.closest("[data-bag-change]");
    if (changeButton) {
      if (changeButton.disabled) return;
      api.change(changeButton.dataset.bagId, Number(changeButton.dataset.bagChange));
      return;
    }

    const removeButton = event.target.closest("[data-bag-remove]");
    if (removeButton) api.remove(removeButton.dataset.bagRemove);
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderRecommendations();
    renderBag();
  });
})();

(() => {
  const icons = {
    x: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
    mail: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    lock: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
    logIn: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" x2="3" y1="12" y2="12"></line></svg>',
    logOut: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg>',
    userPlus: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" x2="19" y1="8" y2="14"></line><line x1="22" x2="16" y1="11" y2="11"></line></svg>',
    circle: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle></svg>',
    message: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
  };

  const isZh = () => document.documentElement.lang?.toLowerCase().startsWith("zh") || location.pathname.includes("/zh/");
  const copy = () => isZh() ? {
    close: "关闭",
    signIn: "登录账号",
    create: "创建账号",
    subtitleSignIn: "欢迎回到您的 LuxurEat 账户。",
    subtitleCreate: "创建您的 LuxurEat 账户。",
    email: "电子邮箱",
    password: "密码",
    remember: "记住我",
    forgot: "忘记密码？",
    divider: "或使用以下方式登录",
    signOut: "退出登录",
  } : {
    close: "Close",
    signIn: "Sign In",
    create: "Create Account",
    subtitleSignIn: "Welcome back to your LuxurEat account.",
    subtitleCreate: "Create your LuxurEat account.",
    email: "Email Address",
    password: "Password",
    remember: "Remember Me",
    forgot: "Forgot Password?",
    divider: "Or Sign In With",
    signOut: "Sign Out",
  };

  const modalHtml = () => {
    const text = copy();
    return `
    <div class="lux-account-modal" data-account-modal aria-hidden="true">
      <div class="lux-account-dialog" role="dialog" aria-modal="true" aria-labelledby="lux-account-title">
        <button class="lux-account-close" type="button" data-account-close aria-label="${text.close}">${icons.x}</button>
        <section class="lux-account-form">
          <header class="lux-account-head">
            <span class="lux-account-icon" data-account-icon>${icons.logIn}</span>
            <h2 id="lux-account-title" data-account-title>${text.signIn}</h2>
            <p data-account-subtitle>${text.subtitleSignIn}</p>
          </header>
          <form>
            <label class="lux-account-field">
              <span>${text.email}</span>
              <div class="lux-account-input">${icons.mail}<input type="email" placeholder="concierge@luxureat.com" autocomplete="email"></div>
            </label>
            <label class="lux-account-field">
              <span>${text.password}</span>
              <div class="lux-account-input">${icons.lock}<input type="password" placeholder="••••••••" autocomplete="current-password"></div>
            </label>
            <div class="lux-account-row">
              <label><input type="checkbox"><span>${text.remember}</span></label>
              <a href="contact.html">${text.forgot}</a>
            </div>
            <button class="lux-account-submit" type="submit" data-account-submit>${icons.logIn}<span>${text.signIn}</span></button>
          </form>
          <div class="lux-account-divider">${text.divider}</div>
          <div class="lux-account-social">
            <button type="button">${icons.circle}Google</button>
            <button type="button">${icons.message}WeChat</button>
          </div>
          <button class="lux-account-toggle" type="button" data-account-toggle>${icons.userPlus}<span>${text.create}</span></button>
          <button class="lux-account-logout" type="button">${icons.logOut}<span>${text.signOut}</span></button>
        </section>
      </div>
    </div>`;
  };

  let lastFocus = null;

  const modal = () => document.querySelector("[data-account-modal]");

  const ensureModal = () => {
    if (!modal()) document.body.insertAdjacentHTML("beforeend", modalHtml());
    return modal();
  };

  const setOpen = (open) => {
    const node = ensureModal();
    node.classList.toggle("is-open", open);
    node.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocus = document.activeElement;
      requestAnimationFrame(() => node.querySelector("input")?.focus());
    } else {
      lastFocus?.focus?.();
    }
  };

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-account-open]")) {
      setOpen(true);
      return;
    }
    if (event.target.closest("[data-account-close]") || event.target === modal()) {
      setOpen(false);
      return;
    }
    if (event.target.closest("[data-account-toggle]")) {
      const node = ensureModal();
      const title = node.querySelector("[data-account-title]");
      const subtitle = node.querySelector("[data-account-subtitle]");
      const toggle = node.querySelector("[data-account-toggle]");
      const submit = node.querySelector("[data-account-submit]");
      const headerIcon = node.querySelector("[data-account-icon]");
      const text = copy();
      const creating = title.textContent === text.signIn;
      title.textContent = creating ? text.create : text.signIn;
      subtitle.textContent = creating ? text.subtitleCreate : text.subtitleSignIn;
      headerIcon.innerHTML = creating ? icons.userPlus : icons.logIn;
      toggle.innerHTML = creating ? `${icons.logIn}<span>${text.signIn}</span>` : `${icons.userPlus}<span>${text.create}</span>`;
      submit.innerHTML = creating ? `${icons.userPlus}<span>${text.create}</span>` : `${icons.logIn}<span>${text.signIn}</span>`;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal()?.classList.contains("is-open")) setOpen(false);
  });
})();

(() => {
  const icons = {
    mail: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    phone: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L8 9.71a16 16 0 0 0 6.29 6.29l1.23-1.23a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92z"></path></svg>',
    message: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
    external: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>',
    shield: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>',
    file: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>',
    truck: '<svg class="lux-lucide lux-inline-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg>',
  };

  const prependIcon = (node, icon) => {
    if (!node || node.classList.contains("lux-with-icon")) return;
    node.classList.add("lux-with-icon");
    node.insertAdjacentHTML("afterbegin", icon);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lux-footer a[href^='mailto:']").forEach((node) => prependIcon(node, icons.mail));
    document.querySelectorAll(".lux-footer a[href^='tel:']").forEach((node) => prependIcon(node, icons.phone));
    document.querySelectorAll(".lux-footer-social a").forEach((node) => prependIcon(node, icons.external));
    document.querySelectorAll(".lux-footer [data-footer-modal='wechat']").forEach((node) => prependIcon(node, icons.message));
    document.querySelectorAll(".lux-footer [data-footer-modal='privacy']").forEach((node) => prependIcon(node, icons.shield));
    document.querySelectorAll(".lux-footer [data-footer-modal='terms']").forEach((node) => prependIcon(node, icons.file));
    document.querySelectorAll(".lux-footer [data-footer-modal='shipping']").forEach((node) => prependIcon(node, icons.truck));
  });
})();
