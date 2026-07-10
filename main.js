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
  const triggers = document.querySelectorAll("[data-reader-open]");
  if (!triggers.length) return;

  const images = {
    harvest: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7anz-XTzA8rUvCwVCN3tnA2c2twxLvw5xTeZY8fdjIZx32wdxnrD3FxOkWKlNvm-lgNGcFXJCyBj6zyugVzHui1X1JEmJm2xV1CW1pVSRih5-WGvyDCI05Ag5b61L7EC6aMY72hjaavZ8QDnbAnLP8g_Ld-MkMHDgHqV6-zNhyFZDw_IcQgZ44UN1BVPwAqB8BghU0PrSUYfiL-_Yq2tfmk0qAvC5_uurJz-kivVfokBHxreXKApDBA_qKdUTevydltWgjTFXeRo",
    truffle: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQy_7QgEhJXRb9TVE_qzhuDOz-7NCGBa_j5-U9QAjY-RgkJ2ZQHX_5SO79aYEFnsmh__rooT1ufKKtESdCxIDI6AKK5cskDxVD5oMSArK_A-w8eZYyBq6M901sPa1EICBL1VKmnbf8fDFvZoZ_WKcozP-dEw8yZPP_5H1A26D2NuC1k-Y5wKcxiXZD1R99ifx-tOOWICpWqnVpIrkftwymdfHoUs6G_63VZqke4f15-qB_VQ2iKl62ZxITlbpb4UVfs_kj11XG2E8",
    service: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAg7keSD5fHP8vQ477QdjOPGaMu0dEKrV3C-or5erPbi9FooRm3f-gqK9jsQmWVqRty8-JYMdaGQrZH09RfQKdhEbCW7r-8kA8Ow2g38LJWJSt-uLuompA3zl2DjXfylHLAFug2zSiBkisJovH4dz3kyg_RpayvCeghiRuxKbORpOPhWFWBW2M-d8RxRYsW9DZDxi0dPc5YtudATgrihhdU45o2T_6ZdY5FNOBxb3IaJRenUHk_a_444WorRvwedmX_ZWSCN4tQMM",
    malossol: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfbNuFAT9ZgIgOwkTaahfs0NsdQcBPQoxt-Ged22Ov4fxMRtVjhrlsSuvUvYzVnOnp1iayJXEui5QoYCH-gS85o09LHojk52rTWmcSRnQwnYDsBoE3T0gHFRY5J-HQn-deQqgNVuoCv6DxPqMp14M5CCpsJPaZZkTOA6uS8vrXJIEQRaae53cX__4tffkuuhWlz0MBpR7xO85jaPBJguBeZGYyP5rtfOFtBKVwS_-3WLRaNHYRm0aaKqUj-aYT5d412hKENpYGiok",
    champagne: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoPRwxvQOmHqNT232yA2aUY2zRh1_cnBBvXcKRHewJ4aG_PfIFz8MXLQLsJiLIyUXslsOfWrXxfollJKQF6lQZQfCsqqVLbIZiJHunsWkso0aiISFUQcyq8_4wO9J3Gt25hLpv-iiHdTqLalW-P_sHArq8JlUO0ycSBH8zid4OLED2c4J6FFIv6GMMsKRoK5L5dWur-IHLjpXYq8hv7Zw8bHiNvjDBEhV7eZA6fU9Hu0wvOQ4k0uci3OHhrWTZdOOQ4ZT-wkRW13Y",
    spoon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZQcq4hfiLU3hNPVytnsfWjFbSXPVMC0ZEe6Jo0kK6b7vRdcaEs3ISV22gseD6C-hcP_-8Er8ha6yZzwUFvnUXMiye9wgrs0mVPIJCsgrJ4hqtlDG_lMYdPdnPPpHg_rQ4kSoSoMBKB0vJwAV_7niM0AX1Yc-AEeuvZl8k8cuLTBQZHKeAPPZLu6dE00svFteMahQNJ-2gt8rqXByzIrJgj0kF-BM29DieNSBStG8btLmXTHvM3d1vdSLqFMsjHj7m8DVKZCXWZE8",
    ice: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbRm7T-vUyLcLqFrQuOXykQjzwhdpDRZMcSbGFjeVpdb76MZnZ28gQBKlrdLjIc_T6WjQjfb9fKyBVe5FExMY-kpE-b4sG25R8qhkpNGJAlJP28iPnyPtCbQYT5ZdpDuLAhtScGkzGtfa55QEl-UcC8bncCNITmhCjb8RDhdB8hzDBWSWgpLLudYILlxAIcaXTQ2fMzaUXyQJZUcPC8Rg_RqNGkNslWq8L7t_OuWsc9fIRvbrYWlI1r5EErsUZte_sRwyldQQwu0Q",
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
  };

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const labels = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", related: "延伸阅读", read: "阅读详情", note: "品鉴笔记", noteText: "温度、器具与节奏共同决定入口的第一层印象；真正的奢华来自克制而准确的服务。" }
    : { back: "Back", close: "Close", related: "Further Reading", read: "Read Details", note: "Tasting Notes", noteText: "Temperature, service ware, and pacing shape the first impression; luxury is restraint made precise." };

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

    reader.hidden = false;
    document.body.classList.add("lux-reader-open");
    backButton.hidden = stack.length === 0;
    backButton.textContent = copy.back;
    reader.querySelector(".lux-reader-close").textContent = copy.close;
    body.focus();
    body.scrollTop = 0;
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
    const trigger = event.target.closest("[data-reader-open]");
    if (!trigger || !articles[trigger.dataset.readerOpen]) return;
    event.preventDefault();
    open(trigger.dataset.readerOpen);
  });
  body.addEventListener("click", (event) => {
    const related = event.target.closest("[data-reader-related]");
    if (related) render(related.dataset.readerRelated, true);
  });
  backButton.addEventListener("click", () => {
    const previous = stack.pop();
    if (previous) render(previous, false);
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
  const images = {
    beluga: "https://lh3.googleusercontent.com/aida-public/AB6AXuACJOnyTg87lVs0EJCu5fRU4HTMa17EXiWif-_i75wx6YuLlPpTlUwQiwdFkPLBhE5gXWVrGU04jUdKhTd3PZyQ8bpW4mSkIcPhMfmwfLClntQ4vY6NJOAkUb1bivTdXI2YitlmukK1D3dGNNAc9g0rboUlkemDceyJT1Btw5n3mxvGXpJcax2iqf2VFHX_HTTpZ0_isZ13U-FDO7Je8sxIZsTLFEBEIacseGoW2VqzxbwZ1rF1OohLNzwRwOuv7bjFFmj_ZFkv0MI",
    oscetra: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw_tDFhLpvYsM-QXpGZ1LlENLhyBbuXDFWoGotLU0shCFfsNIC3PfJmEYbC2sjUwEwrJvOFjhPdv3klNWbI3lo9ggNI9xeczWfnQCahE6pVj58uH2z_J8upHhFnzGm0rbGwDAy-H5sFaPfBzB98QvxUPHEq9JCsuO_rAtoOX11FRMIlt1iaeib6XCJ1IpoX2K9ihttS8BLMf5ZZVkr_nWpd-9xRNwnOOT38v50QuJ8jz1PhP-YouPd4QkysuGMfZM1pXUKiQDfGt8",
    spoon: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2P5yZoNq2-PBMLXeFcbruH1kXuUuYjkMfzKDIKD21IWS8cj0gPO1qmelr-FXL-acV_eTP1vy8o3A4GM_cEf7CbFJBvIC-lHvsziLOZ3iplbm7luEgBN6adnsaNysgBmwJOBwEXJi6SIVoBYAIc4NI1mnCc3W5B4wVTHPQtpnMbcldWMuiDawngtY4iNSVWWR0hreOxU8Hly_d_-706XymQuHqyuDgiHCwEVt1PrdI5fL_9VifYaPDt2uoGGeMYzvCFBOq47acuNM",
    champagne: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAdvQdleYAsN8UYpwdMZHwnWbgcUDtdpGFWKWXj6I4SEE02s8aPf4txi8Rpn1-chBzWrO8914w5sx-2WEDKip-qC5r2bPujAoMIpbq3nWejA1XxdaO5pHuXsnPvkQPugM0_E-Vvl6d6b_YNERpu69jkWlW40vMcDgKuRh5rduZrycRhd_o3nUIJ0a5sm0gSODr_UOnhAj09zHnvw2DNfjnxNATC4OJ7w87gZJg5AhNewIQ_wKbxqHKc_mx-71usoOmX0uisxRI5Tw",
    ice: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbRm7T-vUyLcLqFrQuOXykQjzwhdpDRZMcSbGFjeVpdb76MZnZ28gQBKlrdLjIc_T6WjQjfb9fKyBVe5FExMY-kpE-b4sG25R8qhkpNGJAlJP28iPnyPtCbQYT5ZdpDuLAhtScGkzGtfa55QEl-UcC8bncCNITmhCjb8RDhdB8hzDBWSWgpLLudYILlxAIcaXTQ2fMzaUXyQJZUcPC8Rg_RqNGkNslWq8L7t_OuWsc9fIRvbrYWlI1r5EErsUZte_sRwyldQQwu0Q",
    truffle: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQy_7QgEhJXRb9TVE_qzhuDOz-7NCGBa_j5-U9QAjY-RgkJ2ZQHX_5SO79aYEFnsmh__rooT1ufKKtESdCxIDI6AKK5cskDxVD5oMSArK_A-w8eZYyBq6M901sPa1EICBL1VKmnbf8fDFvZoZ_WKcozP-dEw8yZPP_5H1A26D2NuC1k-Y5wKcxiXZD1R99ifx-tOOWICpWqnVpIrkftwymdfHoUs6G_63VZqke4f15-qB_VQ2iKl62ZxITlbpb4UVfs_kj11XG2E8",
  };
  const galleries = {
    beluga: [
      images.beluga,
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDKyZdxU0kGF8Vd-zMlJdzsTr4siYTL8YgOEAlYupJwzsaN5mzFBD-W_ipZxBtWxInFokoDgH7cm7h5-5QPLGoSz0vpME_P6a0qrr-Y2y2VakxcC3vg1EYL-3UDQPI2nYhxCq34ENlKNl-kNGcA5waTnTOm8fxAxjpJJWFQhjCZ50Ik9jZhh_NSGXX3ZlXzw_kTgXFOcEWhH_a2_7GLr7-x_Z81gogm3T6Cs5jofzP_2_UFZ86UPvvHCja9qW79efyY2ZcXBFvjUk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQG35wvIpjHg3dO9aAqS8DyvQTpm_WWe89Uo6iHhEKHas-8N69c_tKuMELvL0NFW0qe67sWPKN_oBqBfGL00mRsknlGPt-R0KXIgMB1bGemgFMJMROABnT66UaotrHNezYujj8ApVJUUurxkjkr9U6J4ThUGrsXg5252uPdSK34NlDj31o4BeSdPRJcrjgm8cA693wzq1WFWmmuYFd4Dt69JkeOLzViDCDn8NGdxRv6m4qijpjT2ZpSdk60u9WeLKAu1emAC3IBMk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5nzBWcTBNa6X7Vo61aOmU6wugtUwUu3Gxb-wumiWYodKCw7DoMFVY0oZp2_gA9lXB2c3ov0s9_wLPVff3abDSnJqJwABLZLr-lzdZfje7C-bzA7X_1_FiZr8UXnGHayvNtRxUUvJZKH41bzMCyD1PpXNgvYfArVffkYZQxflAXDhlv_A-jHthPCAJo7c5x5Xyg3ZLNg1HnEn31SkcIeVImzSOChtyArtj500F3ExSkBvUurl8uz1Xj4mwR5vFVyZ9OK99lCIxNno",
    ],
    oscetra: [images.oscetra, images.beluga, images.truffle],
    spoon: [images.spoon, images.beluga, "https://lh3.googleusercontent.com/aida-public/AB6AXuAmATWC8-Wd1yng8-EUZvY9jZdTbpQu8tpAT7VeRaUsiwM4pzEOdMprJ1hiPv2A9b38FvL6BbqVHvfmTqFd2P_m8v_67SspNoJGljgNeheLHNuZcld5f0GRwAXic62Ux6qt_SFlmjTwHP0sWBO7ftycDJ3-jXA_MW_dII9WLKFtSn7nhavfVil7EeusjZa8Jsq4AAPjVhCLEQ9FNt4oOkZWX9LAQRra1szFveLxJiZfHSIo_bv_fQc5KPBixeFnT1tuaDTEPlE4pis"],
    champagne: [images.champagne, images.beluga],
    ice: [images.ice, images.champagne, images.spoon],
    truffle: [images.truffle, images.oscetra],
  };
  const products = {
    "zh-imperial-beluga": { title: "至臻帝王鲟鱼子酱", eyebrow: "Rare Harvest", desc: "源自帝王鲟的银灰色大颗粒，入口即化，呈现奶油、海洋与矿物的长尾。", price: "¥2,480", unit: "30G", image: images.beluga, id: "imperial-beluga-30g", subtitle: "Imperial Beluga / 30g", currency: "¥", amount: 2480, specs: ["Huso Huso", "3.2 - 3.5 MM", "Pearl Grey", "奶油/海洋/矿物"] },
    "zh-royal-oscetra": { title: "皇家奥西特拉鱼子酱", eyebrow: "Nutty Reserve", desc: "金棕色鱼子带来紧实颗粒感与烘焙坚果香，是进阶品鉴与商务宴请的稳妥选择。", price: "¥1,280", unit: "30G", image: images.oscetra, id: "royal-oscetra-30g", subtitle: "Royal Oscetra / 30g", currency: "¥", amount: 1280, specs: ["Acipenser Gueldenstaedtii", "2.8 - 3.1 MM", "Amber Gold", "坚果/黄油/海盐"] },
    "zh-mother-of-pearl": { title: "手工打磨珍珠母贝匙", eyebrow: "Service Ware", desc: "非金属贝母材质避免氧化味，保护鱼子酱最细腻的乳香与矿物尾韵。", price: "¥1,280", unit: "Set", image: images.spoon, id: "zh-spoons", subtitle: "经典对装", currency: "¥", amount: 1280, specs: ["Mother-of-Pearl", "Pair Set", "Hand Polished", "无金属气味"] },
    "zh-champagne": { title: "Krug 陈年香槟", eyebrow: "Pairing", desc: "以明亮酸度和细腻气泡刷新味蕾，适合作为鱼子酱品鉴的经典搭配。", price: "¥2,850", unit: "Bottle", image: images.champagne, id: "zh-champagne", subtitle: "Grand Cuvée 171ème Édition", currency: "¥", amount: 2850, specs: ["Brut", "Grand Cuvée", "Chilled", "酸度/气泡/清爽"] },
    "zh-ice-server": { title: "现代主义银质冰镇座", eyebrow: "Service Ware", desc: "双层冰镇结构稳定开罐后的服务温度，让鱼子酱保持清晰弹性。", price: "¥12,400", unit: "Piece", image: images.ice, id: "zh-ice-server", subtitle: "纯银工艺", currency: "¥", amount: 12400, specs: ["Silver", "Double Wall", "Crushed Ice", "稳定温控"] },
    "en-imperial-beluga": { title: "Imperial Beluga Caviar", eyebrow: "Rare Harvest", desc: "Large steel-grey pearls from Huso Huso sturgeon, with a creamy finish and long oceanic minerality.", price: "$350", unit: "30G", image: images.beluga, id: "imperial-beluga-30g", subtitle: "Maison Reserve / 30g", currency: "$", amount: 350, specs: ["Huso Huso", "3.2 - 3.5 MM", "Pearl Grey", "Cream / Ocean / Mineral"] },
    "en-royal-oscetra": { title: "Royal Oscetra Caviar", eyebrow: "Nutty Reserve", desc: "Golden-brown pearls with firm texture, toasted nut complexity, and a long savory finish.", price: "$180", unit: "30G", image: images.oscetra, id: "royal-oscetra-30g", subtitle: "Royal Oscetra / 30g", currency: "$", amount: 180, specs: ["Acipenser Gueldenstaedtii", "2.8 - 3.1 MM", "Amber Gold", "Nut / Butter / Sea Salt"] },
    "en-mother-of-pearl": { title: "Mother-of-Pearl Spoon", eyebrow: "Service Ware", desc: "A non-reactive spoon that preserves the roe's clean flavor without metallic notes.", price: "$45", unit: "Set", image: images.spoon, id: "en-spoons", subtitle: "Hand-Crafted / Artisan", currency: "$", amount: 45, specs: ["Mother-of-Pearl", "Pair Set", "Hand Polished", "No Metallic Note"] },
    "en-champagne": { title: "Maison Vintage Brut", eyebrow: "Pairing", desc: "Bright acidity and fine bubbles refresh the palate between rich caviar tastings.", price: "$320", unit: "Bottle", image: images.champagne, id: "en-champagne", subtitle: "Grand Cru / 2012", currency: "$", amount: 320, specs: ["Brut", "Grand Cru", "Chilled", "Acidity / Bubbles"] },
    "en-truffle": { title: "Truffle Pairing Set", eyebrow: "Pairing", desc: "A dark, aromatic pairing set for menus that extend beyond the first spoon of caviar.", price: "$185", unit: "Set", image: images.truffle, id: "en-truffle-set", subtitle: "Winter Black / White Alba", currency: "$", amount: 185, specs: ["Winter Black", "White Alba", "Gift Set", "Aromatic Finish"] },
  };
  const hash = location.hash || "";
  if (!triggers.length && !hash.startsWith("#product-")) return;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const copy = () => document.documentElement.lang?.startsWith("zh")
    ? { close: "关闭", add: "加入购物袋", qty: "数量", specs: ["鲟鱼品种 SPECIES", "颗粒直径 SIZE", "珍珠色泽 COLOR", "味觉特征 PROFILE"], story: "传承与自然的洗礼", note: "LuxurEat 以冷链、批次记录与开罐服务标准确保每一次品鉴都保持稳定、清晰且可追溯。" }
    : { close: "Close", add: "Add to Cart", qty: "Qty", specs: ["Species", "Pearl Size", "Color", "Profile"], story: "Heritage & Origin", note: "LuxurEat protects every tasting with cold-chain handling, batch records, and precise opening standards." };
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
  detail.innerHTML = `<div class="lux-product-backdrop" data-product-close></div><section class="lux-product-panel" role="dialog" aria-modal="true" aria-labelledby="lux-product-title"><button class="lux-product-close" type="button" data-product-close></button><div class="lux-product-body" tabindex="-1"></div></section>`;
  document.body.appendChild(detail);
  const body = detail.querySelector(".lux-product-body");
  const closeButton = detail.querySelector(".lux-product-close");
  let openedByPush = false;

  const render = (id, push) => {
    const product = products[id];
    if (!product) return;
    const labels = copy();
    const galleryImages = Array.from(new Set(galleryFor(product).filter(Boolean)));
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
            <strong>${escapeHtml(product.price)} <small>/ ${escapeHtml(product.unit)}</small></strong>
            <div class="lux-product-purchase">
              <div class="lux-product-qty" aria-label="${escapeHtml(labels.qty)}">
                <button type="button" data-product-quantity="-1" aria-label="${escapeHtml(labels.qty)} -">−</button>
                <output data-product-quantity-value>1</output>
                <button type="button" data-product-quantity="1" aria-label="${escapeHtml(labels.qty)} +">+</button>
              </div>
              <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${escapeHtml(product.id)}" data-bag-title="${escapeHtml(product.title)}" data-bag-subtitle="${escapeHtml(product.subtitle)}" data-bag-price="${escapeHtml(product.amount)}" data-bag-currency="${escapeHtml(product.currency)}" data-bag-image="${escapeHtml(product.image)}">${labels.add}</button>
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
      </article>`;
    closeButton.textContent = labels.close;
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
  });
  const close = () => {
    detail.hidden = true;
    document.body.classList.remove("lux-reader-open");
    if (openedByPush) history.replaceState(null, "", `${location.pathname}${location.search}`);
    openedByPush = false;
  };

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

  const itemHtml = (item, lang) => `
    <div class="flex flex-col md:flex-row gap-6 p-6 border border-outline-variant/30 bg-surface-container-lowest group" data-bag-item="${escapeHtml(item.id)}">
      <div class="w-full md:w-48 h-48 overflow-hidden bg-surface-container">
        ${item.image ? `<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">` : ""}
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between gap-6 items-start">
          <div>
            <h3 class="font-headline-sm text-headline-sm mb-1">${escapeHtml(item.title)}</h3>
            <p class="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4">${escapeHtml(item.subtitle)}</p>
          </div>
          <span class="font-headline-sm text-headline-sm text-primary whitespace-nowrap">${money(item.currency, item.price)}</span>
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
