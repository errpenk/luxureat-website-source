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

  const images = {
    harvest: luxAsset("assets/images/lux-032.jpg"),
    truffle: luxAsset("assets/images/lux-026.jpg"),
    service: luxAsset("assets/images/lux-003.jpg"),
    malossol: luxAsset("assets/images/lux-048.jpg"),
    champagne: luxAsset("assets/images/lux-029.jpg"),
    spoon: luxAsset("assets/images/lux-014.jpg"),
    ice: luxAsset("assets/images/lux-039.jpg"),
  };
  const articles = {
    "zh-harvest": {
      lang: "zh", eyebrow: "品牌传承", title: "采撷之艺", meta: "MASTERCLASS · 2024年10月",
      image: images.harvest,
      intro: "鱼子酱的采撷不是速度，而是判断。盐渍大师在温度、颗粒张力与成熟度之间寻找那个极窄的窗口。",
      sections: [
        ["鲟鱼的尊贵传承", "每一批鱼子酱都从产地记录开始，成熟度、粒径与油脂感决定它是否进入 LuxurEat 的精选序列。"],
        ["Malossol 的克制", "低盐不是噱头，而是保留矿物感与乳香的方式。盐只负责托起风味，不掩盖鱼卵本身。"],
      ],
      related: ["zh-service", "zh-malossol", "zh-champagne"],
    },
    "zh-truffle": {
      lang: "zh", eyebrow: "寻味溯源", title: "追求卓越：阿尔巴黄金", meta: "ATLAS · 皮埃蒙特",
      image: images.truffle,
      intro: "阿尔巴白松露的价值来自短暂季节与不可复制的土壤气息，它适合作为鱼子酱菜单的香气延伸。",
      sections: [["产地筛选", "我们关注采收时间、湿度与香气完整度，只保留能在餐桌上清晰表达产区的批次。"]],
      related: ["zh-harvest", "zh-service", "zh-malossol"],
    },
    "zh-service": {
      lang: "zh", eyebrow: "精致生活", title: "味觉传承：现代侍酒服务", meta: "COURSE · 服务礼仪",
      image: images.service,
      intro: "真正好的服务，是让器具、温度与酒款都退到幕后，只留下鱼子酱的第一口冲击。",
      sections: [["贝母匙", "贝母不带金属气味，能保护鱼子酱脆弱的原色原味，是餐桌上最小但最关键的器具。"]],
      related: ["zh-champagne", "zh-mother-of-pearl", "zh-harvest"],
    },
    "zh-malossol": {
      lang: "zh", eyebrow: "匠心工艺", title: "盐的科学：轻盐渍大师课", meta: "CRAFT · Malossol",
      image: images.malossol,
      intro: "低于 3% 的盐分让海洋感、坚果香与奶油质地自然展开，考验的是原料与师傅的稳定度。",
      sections: [["低盐的边界", "盐分越克制，对冷链、成熟度和装罐时间的要求越高。"]],
      related: ["zh-harvest", "zh-service", "zh-champagne"],
    },
    "zh-champagne": {
      lang: "zh", eyebrow: "配餐艺术", title: "香槟之韵", meta: "PAIRING · Brut",
      image: images.champagne,
      intro: "年份干型香槟用酸度与气泡清理味蕾，让鱼子酱的油脂感变得更轻、更清晰。",
      sections: [["选择方式", "优先选择酸度明亮、桶味克制的酒款，让酒体承担刷新口腔的角色。"]],
      related: ["zh-mother-of-pearl", "zh-harvest", "zh-service"],
    },
    "zh-mother-of-pearl": {
      lang: "zh", eyebrow: "品鉴器具", title: "贝母触感", meta: "SERVICE · Spoon",
      image: images.spoon,
      intro: "白贝母匙避免金属氧化味，是保护鱼子酱风味最简单也最有效的选择。",
      sections: [["为什么不用金属", "银器会带来明显的金属尾韵，尤其会破坏低盐鱼子酱的细腻乳香。"]],
      related: ["zh-service", "zh-champagne", "zh-harvest"],
    },
    "zh-ice-server": {
      lang: "zh", eyebrow: "品鉴器具", title: "现代主义银质冰镇座", meta: "SERVICE · Ice",
      image: images.ice,
      intro: "双层冰镇座负责稳定温度，让开罐后的香气缓慢释放，而不是迅速失衡。",
      sections: [["温度控制", "碎冰承托罐体，避免直接冻结鱼卵，同时让服务过程保持在理想区间。"]],
      related: ["zh-harvest", "zh-mother-of-pearl", "zh-service"],
    },
    "zh-breath": {
      lang: "zh", eyebrow: "品鉴仪式", title: "呼吸律动", meta: "RITUAL · Rest",
      image: images.champagne,
      intro: "开罐后的几分钟，是香气从冷藏状态回到餐桌状态的缓慢苏醒。",
      sections: [["静置的意义", "让鱼子酱在低温中短暂呼吸，海洋感与奶油感会更清晰，而不是被冰冷压住。"]],
      related: ["zh-ice-server", "zh-champagne", "zh-palate"],
    },
    "zh-hand-warm": {
      lang: "zh", eyebrow: "品鉴仪式", title: "虎口仪式", meta: "RITUAL · Warmth",
      image: images.spoon,
      intro: "把少量鱼子酱置于虎口，用体温轻微唤醒，是最私密也最古老的品鉴方式。",
      sections: [["温度与肌理", "短暂升温会放大坚果香、海洋盐感与颗粒张力，让第一口更完整。"]],
      related: ["zh-breath", "zh-mother-of-pearl", "zh-palate"],
    },
    "zh-palate": {
      lang: "zh", eyebrow: "品鉴仪式", title: "舌尖绽放", meta: "RITUAL · Palate",
      image: images.harvest,
      intro: "不要急于咀嚼。用舌尖轻压，让鱼卵自然破裂，风味会更像一道缓慢展开的曲线。",
      sections: [["入口节奏", "从矿物感、乳香到海洋尾韵，真正的层次来自克制的动作。"]],
      related: ["zh-hand-warm", "zh-breath", "zh-service"],
    },
    "en-harvest": {
      lang: "en", eyebrow: "Maison Heritage", title: "The Art of the Harvest", meta: "MASTERCLASS · October 2024",
      image: images.harvest,
      intro: "Caviar harvesting is an act of judgment: temperature, pearl tension, maturity, and salting must meet in a narrow window.",
      sections: [["The Heritage of the Sturgeon", "Every selection begins with traceability, maturity, pearl size, and the clean mineral finish that defines true service quality."], ["The Malossol Method", "Low salt supports flavor without covering the roe's natural creaminess and oceanic depth."]],
      related: ["en-service", "en-malossol", "en-champagne"],
    },
    "en-truffle": {
      lang: "en", eyebrow: "Sourcing", title: "Sourcing Excellence: The Alba Gold", meta: "ATLAS · Piedmont",
      image: images.truffle,
      intro: "Alba truffles carry a short season and unmistakable soil perfume, making them a natural aromatic extension of a caviar menu.",
      sections: [["Source Discipline", "Harvest timing, humidity, and intact aroma decide whether a lot belongs on a LuxurEat table."]],
      related: ["en-harvest", "en-service", "en-malossol"],
    },
    "en-service": {
      lang: "en", eyebrow: "Epicurean Life", title: "A Legacy of Taste: Modern Service", meta: "COURSE · Service",
      image: images.service,
      intro: "Great service lets the vessel, temperature, and wine step back so the first spoon of caviar can speak clearly.",
      sections: [["Mother-of-Pearl", "Mother-of-pearl brings no metallic note, preserving the fragile texture and clean finish of the roe."]],
      related: ["en-champagne", "en-mother-of-pearl", "en-harvest"],
    },
    "en-malossol": {
      lang: "en", eyebrow: "Craftsmanship", title: "The Science of Salt: Malossol Mastery", meta: "CRAFT · Malossol",
      image: images.malossol,
      intro: "Less than 3% salt exposes the roe's marine depth, nutty notes, and creamy texture, demanding better raw material and handling.",
      sections: [["The Edge of Low Salt", "The less salt you use, the more cold-chain discipline and timing matter."]],
      related: ["en-harvest", "en-service", "en-champagne"],
    },
    "en-champagne": {
      lang: "en", eyebrow: "Pairing", title: "Champagne", meta: "PAIRING · Brut",
      image: images.champagne,
      intro: "Vintage brut Champagne brings acidity and fine bubbles that refresh the palate between rich, saline tastes.",
      sections: [["How to Choose", "Favor bright acidity and restrained oak so the wine cleanses rather than competes."]],
      related: ["en-mother-of-pearl", "en-harvest", "en-service"],
    },
    "en-mother-of-pearl": {
      lang: "en", eyebrow: "Service Ware", title: "Mother-of-Pearl Spoon", meta: "SERVICE · Spoon",
      image: images.spoon,
      intro: "Mother-of-pearl is the simplest way to protect the roe from metallic flavors during service.",
      sections: [["Why Not Metal", "Silver can leave an oxidative finish that overwhelms low-salt caviar's creamy delicacy."]],
      related: ["en-service", "en-champagne", "en-harvest"],
    },
    "en-ice-server": {
      lang: "en", eyebrow: "Service Ware", title: "Modern Silver Ice Server", meta: "SERVICE · Ice",
      image: images.ice,
      intro: "A double-walled server stabilizes temperature after opening, keeping the tasting ritual calm and precise.",
      sections: [["Temperature Control", "Crushed ice supports the tin without freezing the roe, preserving texture through service."]],
      related: ["en-harvest", "en-mother-of-pearl", "en-service"],
    },
    "en-breath": {
      lang: "en", eyebrow: "Tasting Ritual", title: "Breathing Rhythm", meta: "RITUAL · Rest",
      image: images.champagne,
      intro: "The first minutes after opening let the aroma move from cellar-cold to table-ready.",
      sections: [["Why Rest Matters", "A brief rest keeps the roe cold while allowing cream, brine, and minerality to become legible."]],
      related: ["en-ice-server", "en-champagne", "en-palate"],
    },
    "en-hand-warm": {
      lang: "en", eyebrow: "Tasting Ritual", title: "The Hand Ritual", meta: "RITUAL · Warmth",
      image: images.spoon,
      intro: "A small spoonful on the back of the hand warms gently, revealing texture before the first taste.",
      sections: [["Temperature and Texture", "A controlled touch of warmth opens nutty notes, ocean salinity, and pearl tension."]],
      related: ["en-breath", "en-mother-of-pearl", "en-palate"],
    },
    "en-palate": {
      lang: "en", eyebrow: "Tasting Ritual", title: "Palate Release", meta: "RITUAL · Palate",
      image: images.harvest,
      intro: "Do not rush to chew. Let the pearls break slowly against the palate so the finish can unfold.",
      sections: [["Pacing the First Bite", "Minerality, cream, and marine length appear most clearly when the gesture stays restrained."]],
      related: ["en-hand-warm", "en-breath", "en-service"],
    },
  };

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
  const backButton = reader.querySelector("[data-reader-back]");
  const closeButtons = reader.querySelectorAll("[data-reader-close]");
  let currentId = "";
  const stack = [];

  const showReader = (copy) => {
    reader.hidden = false;
    document.body.classList.add("lux-reader-open");
    backButton.hidden = stack.length === 0;
    backButton.textContent = copy.back;
    reader.querySelector(".lux-reader-close").textContent = copy.close;
    body.focus();
    body.scrollTop = 0;
  };

  const renderArchive = (push) => {
    if (push && currentId) stack.push(currentId);
    currentId = "__archive";
    const copy = labels();
    body.innerHTML = `
      <article class="lux-reader-archive">
        <h2>${escapeHtml(copy.archive)}</h2>
        ${archiveGroups().map(([title, ids]) => `
          <section class="lux-reader-archive-group">
            <span>${escapeHtml(title)}</span>
            <div class="lux-reader-archive-grid">
              ${ids.map((id) => {
                const item = articles[id];
                return item ? `
                  <button type="button" class="lux-reader-archive-card" data-reader-archive-item="${escapeHtml(id)}">
                    <img src="${escapeHtml(item.image)}" alt="">
                    <span class="lux-reader-archive-copy"><span>${escapeHtml(item.eyebrow)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta)}</small></span>
                  </button>` : "";
              }).join("")}
            </div>
          </section>`).join("")}
      </article>`;
    showReader(copy);
  };

  const render = (id, push) => {
    const article = articles[id];
    if (!article) return;
    if (push && currentId) stack.push(currentId);
    currentId = id;
    const copy = labels();
    const articleSections = article.sections.length > 1 ? article.sections : [...article.sections, [copy.note, copy.noteText]];
    const media = article.related.map((relatedId) => articles[relatedId]?.image).filter(Boolean);
    const contentImages = [media[0] || article.image, media[1] || article.image];

    body.innerHTML = `
      <article class="lux-reader-layout">
        <section class="lux-reader-hero" style="background-image:url('${escapeHtml(article.image)}')">
          <div class="lux-reader-hero-copy">
            <span class="lux-reader-eyebrow">${escapeHtml(article.eyebrow)}</span>
            <h2 id="lux-reader-title">${escapeHtml(article.title)}</h2>
            <p class="lux-reader-meta">${escapeHtml(article.meta)}</p>
          </div>
        </section>
        <div class="lux-reader-copy">
          <p class="lux-reader-intro">${escapeHtml(article.intro)}</p>
          <section class="lux-reader-section lux-reader-section-split">
            <div>
              <h3>${escapeHtml(articleSections[0][0])}</h3>
              <p>${escapeHtml(articleSections[0][1])}</p>
            </div>
            <figure><img src="${escapeHtml(contentImages[0])}" alt=""></figure>
          </section>
          <section class="lux-reader-section">
            <h3>${escapeHtml(articleSections[1][0])}</h3>
            <p>${escapeHtml(articleSections[1][1])}</p>
            <figure class="lux-reader-wide-image"><img src="${escapeHtml(contentImages[1])}" alt=""></figure>
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
  });
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
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

  const close = () => {
    popover.hidden = true;
    if (activeButton) activeButton.setAttribute("aria-expanded", "false");
    activeButton = null;
  };
  const place = (button) => {
    const rect = button.getBoundingClientRect();
    const top = Math.min(window.innerHeight - 150, rect.bottom + 12);
    const left = Math.min(window.innerWidth - 280, Math.max(16, rect.right - 260));
    popover.style.top = `${Math.max(16, top)}px`;
    popover.style.left = `${left}px`;
  };
  const open = (button) => {
    if (activeButton === button && !popover.hidden) {
      close();
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
    button.addEventListener("mouseleave", close);
    button.addEventListener("blur", close);
  });
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target)) close();
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
  const formatMoney = (currency, amount) => `${currency}${amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === "$" ? 2 : 0,
    maximumFractionDigits: currency === "$" ? 2 : 0,
  })}`;
  const copy = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", add: "加入购物袋", detail: "查看详情", qty: "数量", remove: "移除", recent: "最近浏览过", specs: ["鲟鱼品种 SPECIES", "颗粒直径 SIZE", "珍珠色泽 COLOR", "味觉特征 PROFILE"], story: "传承与自然的洗礼", note: "LuxurEat 以冷链、批次记录与开罐服务标准确保每一次品鉴都保持稳定、清晰且可追溯。" }
    : { back: "Back", close: "Close", add: "Add to Cart", detail: "View Details", qty: "Qty", remove: "Remove", recent: "Recently Viewed", specs: ["Species", "Pearl Size", "Color", "Profile"], story: "Heritage & Origin", note: "LuxurEat protects every tasting with cold-chain handling, batch records, and precise opening standards." };
  const totalLabel = (quantity) => document.documentElement.lang?.startsWith("zh") ? `${quantity}件总价` : `${quantity}-item total`;
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
            <strong class="lux-product-price">${escapeHtml(product.price)} <small>/ ${escapeHtml(product.unit)}</small><em data-product-total hidden></em></strong>
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
              <small>${escapeHtml(item.price)} / ${escapeHtml(item.unit)}</small>
              <div class="lux-product-recent-actions">
                <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${escapeHtml(item.id)}" data-bag-title="${escapeHtml(item.title)}" data-bag-subtitle="${escapeHtml(item.subtitle)}" data-bag-price="${escapeHtml(item.amount)}" data-bag-currency="${escapeHtml(item.currency)}" data-bag-image="${escapeHtml(item.image)}">${escapeHtml(labels.add)}</button>
                <button type="button" data-product-open="${escapeHtml(key)}">${escapeHtml(labels.detail)}</button>
              </div>
            </article>`).join("")}
          </div>
          <div class="lux-product-recent-nav">
            <button type="button" data-product-recent-scroll="-1" aria-label="${escapeHtml(labels.back)}">←</button>
            <button type="button" data-product-recent-scroll="1" aria-label="${escapeHtml(labels.detail)}">→</button>
          </div>
          </div>
        </section>` : ""}
      </article>`;
    backButton.textContent = labels.back;
    backButton.hidden = !productStack.length;
    closeButton.textContent = labels.close;
    updateSelectedTotal(1);
    updateProductBagState();
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
      detail.querySelector(".lux-product-recent-grid")?.scrollBy({ left: Number(recentScroll.dataset.productRecentScroll) * 320, behavior: "smooth" });
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
    const output = detail.querySelector("[data-product-quantity-value]");
    const addButton = detail.querySelector("[data-bag-add]");
    const next = Math.max(1, Number(output?.value || output?.textContent || 1) + Number(button.dataset.productQuantity));
    if (output) {
      output.value = String(next);
      output.textContent = String(next);
    }
    if (addButton) addButton.dataset.bagQuantity = String(next);
    updateSelectedTotal(next);
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
  initLuxFooterActions();
});

(() => {
  const key = "luxureatBag";

  const read = () => {
    try {
      const items = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(items) ? items : [];
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

  const cleanProduct = (product) => ({
    id: String(product.id || "").trim(),
    title: String(product.title || "").trim(),
    subtitle: String(product.subtitle || "").trim(),
    price: Number(product.price) || 0,
    currency: product.currency || "$",
    image: product.image || "",
    quantity: Math.max(1, Number(product.quantity) || 1),
  });

  const api = {
    items: read,
    add(product) {
      const next = cleanProduct(product || {});
      if (!next.id || !next.title) return read();

      const items = read();
      const existing = items.find((item) => item.id === next.id);
      if (existing) {
        existing.quantity += next.quantity;
      } else {
        items.push(next);
      }
      return save(items);
    },
    change(id, delta) {
      const items = read()
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter((item) => item.quantity > 0);
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

  const money = (currency, amount) => `${currency}${amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === "$" ? 2 : 0,
    maximumFractionDigits: currency === "$" ? 2 : 0,
  })}`;

  const productImage = (button) => {
    const source = button.closest("article, section, main") || document;
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

  const locale = () => document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const detailProductId = (item, lang) => {
    const id = item.id || "";
    if (id.includes("imperial-beluga")) return `${lang}-imperial-beluga`;
    if (id.includes("royal-oscetra")) return `${lang}-royal-oscetra`;
    if (id.includes("spoon")) return `${lang}-mother-of-pearl`;
    if (id.includes("champagne")) return `${lang}-champagne`;
    if (id.includes("ice-server")) return "zh-ice-server";
    if (id.includes("truffle")) return "en-truffle";
    return "";
  };

  const itemHtml = (item, lang) => {
    const lineTotal = item.quantity > 1 ? `<small class="lux-bag-line-total">${lang === "zh" ? `${item.quantity}件总价` : `${item.quantity}-item total`} ${money(item.currency, item.price * item.quantity)}</small>` : "";
    const detailId = detailProductId(item, lang);
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
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="-1" data-bag-id="${escapeHtml(item.id)}" type="button"><span class="material-symbols-outlined text-sm">remove</span></button>
              <span class="w-12 text-center font-label-lg">${item.quantity}</span>
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="1" data-bag-id="${escapeHtml(item.id)}" type="button"><span class="material-symbols-outlined text-sm">add</span></button>
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
    document.querySelectorAll(".lux-actions a[href*='bag']").forEach((link) => {
      link.dataset.bagLabel ||= link.textContent.trim().replace(/\s*\(\d+\)$/, "");
      const count = api.count();
      link.textContent = count ? `${link.dataset.bagLabel} (${count})` : link.dataset.bagLabel;
    });
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
      api.change(changeButton.dataset.bagId, Number(changeButton.dataset.bagChange));
      return;
    }

    const removeButton = event.target.closest("[data-bag-remove]");
    if (removeButton) api.remove(removeButton.dataset.bagRemove);
  });

  document.addEventListener("DOMContentLoaded", renderBag);
})();
