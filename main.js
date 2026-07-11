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

  const articleImage = (file) => luxAsset(`assets/article-images/${file}`);
  const images = {
    harvest: articleImage("harvest-hero.jpg"),
    harvestDetail: articleImage("harvest-detail.jpg"),
    truffle: articleImage("truffle-hero.jpg"),
    service: articleImage("service-hero.jpg"),
    malossol: articleImage("malossol-hero.jpg"),
    champagne: articleImage("champagne-hero.jpg"),
    spoon: articleImage("mother-of-pearl-hero.jpg"),
    ice: articleImage("ice-server-hero.jpg"),
    temperature: articleImage("temperature-hero.jpg"),
    table: articleImage("table-hero.jpg"),
    vodka: articleImage("vodka-hero.jpg"),
    blini: articleImage("blini-hero.jpg"),
  };
  const articles = {
    "zh-harvest": {
      lang: "zh", eyebrow: "品牌传承", title: "采撷之艺", meta: "MASTERCLASS · 2024年10月",
      image: images.harvest,
      media: [images.harvestDetail, images.temperature, images.table],
      intro: "鱼子酱的采撷不是速度，而是判断。盐渍大师在温度、颗粒张力、成熟度与批次香气之间寻找那个极窄的窗口；窗口一旦错过，再昂贵的器具与服务都无法弥补。",
      sections: [
        ["鲟鱼的尊贵传承", ["每一批鱼子酱都从产地记录开始。我们关注的不只是鱼种名称，而是水域、饲养周期、成熟度、粒径、油脂比例与开罐后的第一层气味。只有这些指标同时稳定，鱼卵才会进入 LuxurEat 的精选序列。", "在真正的品鉴里，奢华不是强烈，而是清晰。优质鱼卵入口即化，却仍保留轻微的颗粒张力；海洋感在前段出现，随后是奶油、坚果与细微矿物的长尾。"]],
        ["Malossol 的克制", ["低盐不是噱头，而是对原料的信任。盐只负责托起风味，不应遮住鱼卵自身的乳香与海洋深度。越低的盐分，越要求冷链、成熟度和装罐时机足够准确。", "我们的开罐服务会记录每一次温度变化与品鉴反馈。它们像一份安静的档案，让下一次宴席仍能复现同样的稳定度。"]],
        ["餐桌上的最后判断", ["鱼子酱离开冷库后，真正的考验才开始。银灰、琥珀或深金色的颗粒需要在柔和光线下观察，过强的灯会误导色泽判断，过热的室温会让油脂过快释放。", "因此，我们更偏爱慢而准确的服务节奏：先看色泽，再闻开罐后的海风气息，最后以贝母匙送入口中，让风味在舌面自然展开。"]],
      ],
      quote: "采撷的本质，是在最短的时间里做最慢的判断。",
      related: ["zh-service", "zh-malossol", "zh-champagne"],
    },
    "zh-truffle": {
      lang: "zh", eyebrow: "寻味溯源", title: "追求卓越：阿尔巴黄金", meta: "ATLAS · 皮埃蒙特",
      image: images.truffle,
      media: [images.table, images.harvestDetail, images.service],
      intro: "阿尔巴白松露的价值来自短暂季节、湿润土壤与不可复制的森林气息。它不是鱼子酱的替代，而是菜单里另一种关于稀缺、时间与产地的表达。",
      sections: [
        ["产地筛选", ["我们关注采收时间、湿度与香气完整度，只保留能在餐桌上清晰表达产区的批次。真正优秀的白松露不需要夸张的用量，几片薄刨就能让热度、脂肪与谷物香气重新排序。", "鱼子酱与松露的共同点，是它们都不适合被复杂烹饪遮盖。最好的菜单通常很安静，只让温度、质地与香气互相回应。"]],
        ["香气的边界", ["白松露的香气具有穿透力，因此它需要被放在菜单的正确位置。过早出现会压住鱼子酱的细腻盐感，过晚出现则失去作为高峰的意义。", "我们的服务顺序会把鱼子酱作为冷感开场，把松露放在温热段落，让海洋与森林之间形成自然过渡。"]],
        ["从皮埃蒙特到餐桌", ["每一次运输都以湿度、温度与包装透气性为核心。香气是活的，它会随着时间衰减，也会因为错误的密封方式变得沉闷。", "因此，LuxurEat 只把它作为少量高规格菜单的季节延伸，而不是全年可复制的陈列商品。"]],
      ],
      quote: "越珍贵的香气，越需要留白。",
      related: ["zh-harvest", "zh-service", "zh-malossol"],
    },
    "zh-service": {
      lang: "zh", eyebrow: "精致生活", title: "味觉传承：现代侍酒服务", meta: "COURSE · 服务礼仪",
      image: images.service,
      media: [images.champagne, images.spoon, images.table],
      intro: "真正好的服务，是让器具、温度与酒款都退到幕后，只留下鱼子酱的第一口冲击。服务不应该抢戏，它的存在感来自准确，而不是装饰。",
      sections: [
        ["贝母匙", ["贝母不带金属气味，能保护鱼子酱脆弱的原色原味，是餐桌上最小但最关键的器具。它轻、温润、不会改变尾韵，也不会在入口时留下氧化感。", "我们会在开罐前确认每一支匙面的完整度。细小裂纹或粗糙边缘都会影响颗粒完整性，这些细节在普通餐桌上容易被忽略，却会直接改变第一口的质地。"]],
        ["香槟与温度", ["酒款应当刷新味蕾，而不是主导风味。年份干型香槟、低温伏特加或极简矿物水都可以成立，前提是它们把注意力还给鱼子酱。", "温度则更像一条隐形边界：太冷会压住乳香，太暖会让油脂失控。理想服务不是固定数字，而是冷链、室温与开罐时间之间的平衡。"]],
        ["现代服务的克制", ["我们减少无意义的仪式动作，只保留真正会影响味觉的步骤。罐体如何放置、何时打开、怎样分勺、何时补冰，每一步都有理由。", "当服务完成，客人记住的不是服务员的动作，而是鱼子酱在舌面上清晰展开的那一秒。"]],
      ],
      quote: "服务的最高级，是让人忘记服务本身。",
      related: ["zh-champagne", "zh-mother-of-pearl", "zh-harvest"],
    },
    "zh-malossol": {
      lang: "zh", eyebrow: "匠心工艺", title: "盐的科学：轻盐渍大师课", meta: "CRAFT · Malossol",
      image: images.malossol,
      media: [images.harvestDetail, images.temperature, images.ice],
      intro: "低于 3% 的盐分让海洋感、坚果香与奶油质地自然展开。它听起来简单，真正困难的是让每一罐都在低盐状态下仍然稳定、清澈、完整。",
      sections: [
        ["低盐的边界", ["盐分越克制，对冷链、成熟度和装罐时间的要求越高。重盐可以遮盖缺陷，Malossol 则会放大一切：好的会更清晰，不稳定也会更明显。", "这也是为什么我们把盐看成结构，而不是调味。它不是为了让鱼子酱变咸，而是帮助颗粒在时间中保持形状、弹性与香气秩序。"]],
        ["大师的手感", ["盐渍大师不会只依赖仪器。触感、光泽、颗粒滚动的速度与开罐气味，都会参与判断。经验不是玄学，它是长期记录后的快速识别。", "每一批鱼卵都有微小差异，真正的技术不是把它们压成一样，而是在允许差异存在的前提下，保持 LuxurEat 应有的干净尾韵。"]],
        ["冷链之后", ["低盐鱼子酱离不开冷链，但冷链不是终点。运输、静置、开罐、分食都可能改变最终感受。", "我们因此把服务建议写进产品档案，让餐厅与私人客户都能理解：一罐鱼子酱的价值，只有在正确打开时才算真正完成。"]],
      ],
      quote: "盐越少，要求越多。",
      related: ["zh-harvest", "zh-service", "zh-champagne"],
    },
    "zh-champagne": {
      lang: "zh", eyebrow: "配餐艺术", title: "香槟之韵", meta: "PAIRING · Brut",
      image: images.champagne,
      media: [images.table, images.service, images.blini],
      intro: "年份干型香槟用酸度与气泡清理味蕾，让鱼子酱的油脂感变得更轻、更清晰。它不是为了制造庆祝感，而是为了在每一勺之间重置口腔。",
      sections: [
        ["选择方式", ["优先选择酸度明亮、桶味克制的酒款，让酒体承担刷新口腔的角色。过重的烘烤香会压住鱼子酱的矿物尾韵，过甜则会让海洋感显得迟钝。", "Blanc de Blancs 通常更锋利，适合结构清晰的 Beluga；陈年香槟则带来坚果与烘焙层次，适合油脂更饱满的 Oscetra。"]],
        ["气泡的作用", ["细密气泡像微小的刷子，清理舌面上的油脂，让下一口鱼子酱重新出现颗粒感。好的配酒不增加复杂度，而是让复杂度被看见。", "因此，我们会避免把香槟倒得过满。低温、少量、多次补杯，往往比一次完整倒满更适合鱼子酱服务。"]],
        ["安静的高峰", ["香槟与鱼子酱的组合已经足够完整，不需要太多配菜。若要加入 blini 或 crème fraîche，也应当保持轻薄，作为质地承托，而不是新的主角。"]],
      ],
      quote: "最好的气泡，不是为了喧哗，而是为了让下一口更清楚。",
      related: ["zh-mother-of-pearl", "zh-harvest", "zh-service"],
    },
    "zh-mother-of-pearl": {
      lang: "zh", eyebrow: "品鉴器具", title: "贝母触感", meta: "SERVICE · Spoon",
      image: images.spoon,
      media: [images.harvestDetail, images.service, images.table],
      intro: "白贝母匙避免金属氧化味，是保护鱼子酱风味最简单也最有效的选择。它看似只是器具，实际决定了入口前最后一厘米是否干净。",
      sections: [
        ["为什么不用金属", ["银器会带来明显的金属尾韵，尤其会破坏低盐鱼子酱的细腻乳香。金属的冷硬触感也容易让颗粒在送入口中前受到不必要的挤压。", "贝母匙的价值在于中性。它不抢味、不导热过快、不留下气味，只负责把鱼子酱完整地从罐中带到舌面。"]],
        ["匙面的弧度", ["匙面不宜过深，过深会让鱼卵堆叠受压；也不宜过平，过平会让分勺动作变得粗糙。理想弧度应当让颗粒自然停留，轻轻滑落。", "在私人品鉴中，我们更建议小匙慢食。每一口的量少一点，层次反而更完整。"]],
        ["仪式的温度", ["贝母不是为了制造古典感，而是为了让现代服务回到准确。真正的仪式感，来自每一个动作都能解释为什么存在。"]],
      ],
      quote: "器具越安静，风味越响亮。",
      related: ["zh-service", "zh-champagne", "zh-harvest"],
    },
    "zh-ice-server": {
      lang: "zh", eyebrow: "品鉴器具", title: "现代主义银质冰镇座", meta: "SERVICE · Ice",
      image: images.ice,
      media: [images.temperature, images.champagne, images.table],
      intro: "双层冰镇座负责稳定温度，让开罐后的香气缓慢释放，而不是迅速失衡。它把冷变成可控的背景，而不是压住风味的力量。",
      sections: [
        ["温度控制", ["碎冰承托罐体，避免直接冻结鱼卵，同时让服务过程保持在理想区间。冰镇座的任务不是越冷越好，而是在开罐后给鱼子酱一个稳定、缓慢的环境。", "当罐体表面出现轻微凝霜，服务员会检查罐底是否与碎冰直接贴合。若接触过紧，局部冻结会让颗粒变硬；若离冰过远，油脂会提前松散。"]],
        ["桌面秩序", ["银质或玻璃冰镇座应保持低姿态，不能遮挡客人观察鱼卵色泽。我们更重视器具的比例、反光和触感，而不是夸张造型。", "它位于餐桌中央，却不应成为中心；中心永远是开罐后那一层清冷、带海风的香气。"]],
        ["服务节奏", ["从冰箱到桌面，从开罐到分勺，所有动作都服务于同一个目标：让每一口都保持接近第一口的状态。"]],
      ],
      quote: "冷不是目的，稳定才是。",
      related: ["zh-harvest", "zh-mother-of-pearl", "zh-service"],
    },
    "zh-breath": {
      lang: "zh", eyebrow: "品鉴仪式", title: "呼吸律动", meta: "RITUAL · Rest",
      image: images.champagne,
      media: [images.ice, images.table, images.harvestDetail],
      intro: "开罐后的几分钟，是香气从冷藏状态回到餐桌状态的缓慢苏醒。所谓“呼吸”，不是让鱼子酱升温，而是让被低温收住的香气重新变得可读。",
      sections: [
        ["静置的意义", ["让鱼子酱在低温中短暂呼吸，海洋感与奶油感会更清晰，而不是被冰冷压住。刚打开的罐体通常只有非常干净的盐水气息，几分钟后才会出现坚果、乳脂与矿物尾韵。", "这段等待不需要仪式化表演，只需要安静。过度搅动、频繁开合或长时间暴露都会打乱颗粒表面油脂的状态。"]],
        ["五分钟的尺度", ["五分钟不是绝对规则，而是一个足够安全的服务窗口。室温偏高时应缩短，私人品鉴人数较少时可以分批开罐，避免最后几勺失去紧致感。", "我们会观察罐面光泽：当颗粒开始呈现轻微的湿润反光，香气也从单纯的冷盐感转为更圆润的乳香。"]],
        ["入口之前", ["呼吸完成后，不要立刻混入配菜。先用贝母匙品尝一小口原味，再决定是否加入香槟、blini 或 crème fraîche。只有先听见鱼子酱本身，配餐才有意义。"]],
      ],
      quote: "真正的醒味，是等待，而不是加热。",
      related: ["zh-ice-server", "zh-champagne", "zh-palate"],
    },
    "zh-hand-warm": {
      lang: "zh", eyebrow: "品鉴仪式", title: "虎口仪式", meta: "RITUAL · Warmth",
      image: images.spoon,
      media: [images.harvestDetail, images.temperature, images.service],
      intro: "把少量鱼子酱置于虎口，用体温轻微唤醒，是最私密也最古老的品鉴方式。它绕开餐具，让温度、皮肤与香气直接建立关系。",
      sections: [
        ["温度与肌理", ["短暂升温会放大坚果香、海洋盐感与颗粒张力，让第一口更完整。体温不是为了把鱼子酱变热，而是把被冷藏压住的油脂轻轻打开。", "理想动作很简单：少量放置，停留片刻，直接入口。不要用手背摩擦，也不要让颗粒停留过久。"]],
        ["为什么是虎口", ["虎口处温度稳定，气味干扰较少，也方便观察颗粒在皮肤上的光泽。优质鱼卵应当保持完整形态，不应快速塌陷或渗出浑浊液体。", "这一步常用于判断批次状态。它比餐桌陈列更直接，也更诚实。"]],
        ["私享的边界", ["虎口品鉴适合小范围专业品鉴，并不适合所有正式宴会。LuxurEat 会根据场景决定是否引导这一动作，让仪式服务于体验，而不是为了仪式而仪式。"]],
      ],
      quote: "手的温度，是最小也最准确的醒味器。",
      related: ["zh-breath", "zh-mother-of-pearl", "zh-palate"],
    },
    "zh-palate": {
      lang: "zh", eyebrow: "品鉴仪式", title: "舌尖绽放", meta: "RITUAL · Palate",
      image: images.harvest,
      media: [images.harvestDetail, images.malossol, images.spoon],
      intro: "不要急于咀嚼。用舌尖轻压，让鱼卵自然破裂，风味会更像一道缓慢展开的曲线，而不是一瞬间被打碎的盐味。",
      sections: [
        ["入口节奏", ["从矿物感、乳香到海洋尾韵，真正的层次来自克制的动作。鱼子酱入口后先停在舌面，用上颚轻轻压开，让颗粒一颗颗释放。", "快速咀嚼会让所有层次同时出现，也同时消失。慢一点，才会分辨出前段的清冷、中段的奶油感和最后的坚果香。"]],
        ["风味曲线", ["优质鱼子酱的尾韵应当干净，不黏腻、不腥重。它会留下海洋与矿物的长度，而不是过度盐感。", "当香槟或伏特加加入时，它们的作用是清理口腔，让下一勺重新开始，而不是把上一勺的余味强行盖掉。"]],
        ["最后一口", ["真正好的品鉴不会越吃越重。最后一口仍应保持清晰，甚至比第一口更平静。那说明温度、器具、分量与节奏都没有失控。"]],
      ],
      quote: "最奢侈的一口，往往不是最多的一口。",
      related: ["zh-hand-warm", "zh-breath", "zh-service"],
    },
    "en-harvest": {
      lang: "en", eyebrow: "Maison Heritage", title: "The Art of the Harvest", meta: "MASTERCLASS · October 2024",
      image: images.harvest,
      media: [images.harvestDetail, images.temperature, images.table],
      intro: "Caviar harvesting is an act of judgment. Temperature, pearl tension, maturity, salting, and aroma must meet in a narrow window; once that window closes, no amount of service theatre can restore the first truth of the roe.",
      sections: [
        ["The Heritage of the Sturgeon", ["Every selection begins with traceability. We study water source, age, maturity, pearl size, oil ratio, and the first aroma released after opening. Only when those signals align does a lot enter the LuxurEat selection.", "In true tasting, luxury is not intensity but clarity. The best pearls dissolve quickly while keeping a delicate tension; ocean salinity appears first, followed by cream, hazelnut, and a long mineral finish."]],
        ["The Malossol Method", ["Low salt is not a slogan. It is a vote of confidence in the roe. Salt should lift the flavor, not hide it. The lower the salt, the more the cold chain, timing, and maturity must be exact.", "Every opening service is recorded with temperature notes and tasting feedback. Those quiet records allow the next dinner to repeat the same stability."]],
        ["The Last Judgment at the Table", ["Once caviar leaves the cellar, the final test begins. Grey, amber, or deep golden pearls must be observed under soft light; harsh light can distort color, while a warm room can loosen the oils too quickly.", "Our preferred service rhythm is slow and precise: observe the color, smell the first marine note, then use mother-of-pearl to let the flavor unfold naturally."]],
      ],
      quote: "Harvesting is the fastest moment that still requires the slowest judgment.",
      related: ["en-service", "en-malossol", "en-champagne"],
    },
    "en-truffle": {
      lang: "en", eyebrow: "Sourcing", title: "Sourcing Excellence: The Alba Gold", meta: "ATLAS · Piedmont",
      image: images.truffle,
      media: [images.table, images.harvestDetail, images.service],
      intro: "Alba white truffle is shaped by a short season, damp soil, and an unmistakable forest perfume. It is not a replacement for caviar, but another way of speaking about rarity, origin, and time.",
      sections: [
        ["Source Discipline", ["Harvest timing, humidity, and intact aroma decide whether a lot belongs on a LuxurEat table. Great white truffle does not require excess; a few thin shavings can reorder heat, fat, and grain into a new architecture.", "Caviar and truffle share one important rule: neither should be buried under complex cooking. The strongest menus stay quiet enough for temperature, texture, and aroma to answer one another."]],
        ["The Boundary of Aroma", ["White truffle is powerful, so placement matters. Served too early, it can mute caviar's delicate salinity; served too late, it loses its role as a seasonal peak.", "We often use caviar as the cold opening and truffle as a warmer passage, allowing ocean and forest to meet without collision."]],
        ["From Piedmont to Service", ["Transport is built around humidity, temperature, and breathable packaging. Aroma is alive: it fades with time and turns flat under the wrong seal.", "For that reason, LuxurEat treats Alba truffle as a seasonal extension for selected menus, not a permanent decorative item."]],
      ],
      quote: "The rarer the aroma, the more silence it needs.",
      related: ["en-harvest", "en-service", "en-malossol"],
    },
    "en-service": {
      lang: "en", eyebrow: "Epicurean Life", title: "A Legacy of Taste: Modern Service", meta: "COURSE · Service",
      image: images.service,
      media: [images.champagne, images.spoon, images.table],
      intro: "Great service lets the vessel, temperature, and wine step back so the first spoon of caviar can speak clearly. Service should not perform luxury; it should make precision feel effortless.",
      sections: [
        ["Mother-of-Pearl", ["Mother-of-pearl brings no metallic note, preserving the fragile texture and clean finish of the roe. It is light, neutral, and gentle enough to carry pearls without bruising them before the first taste.", "Before service, we inspect every spoon surface. A tiny crack or rough edge can disturb the pearl structure, and those small defects become visible on the palate."]],
        ["Wine and Temperature", ["Wine should refresh, not dominate. Vintage brut Champagne, ice-cold vodka, or clean mineral water can all work when they return attention to the roe.", "Temperature is the invisible border. Too cold and the cream is hidden; too warm and the oils lose discipline. Ideal service is the balance between cold chain, room temperature, and opening time."]],
        ["The Restraint of Modern Service", ["We remove gestures that do not affect taste and keep only those that matter: how the tin rests, when it opens, how the spoon divides, when the ice is refreshed.", "When service succeeds, the guest remembers not the motion but the second when the roe opens cleanly on the palate."]],
      ],
      quote: "The highest service is the one you stop noticing.",
      related: ["en-champagne", "en-mother-of-pearl", "en-harvest"],
    },
    "en-malossol": {
      lang: "en", eyebrow: "Craftsmanship", title: "The Science of Salt: Malossol Mastery", meta: "CRAFT · Malossol",
      image: images.malossol,
      media: [images.harvestDetail, images.temperature, images.ice],
      intro: "Less than 3% salt exposes the roe's marine depth, nutty notes, and creamy texture. It sounds simple; the difficulty is making every tin stable, clear, and intact at that low level of intervention.",
      sections: [
        ["The Edge of Low Salt", ["The less salt you use, the more cold-chain discipline and timing matter. Heavy salt can conceal weakness; Malossol reveals everything, both excellence and instability.", "We think of salt as structure rather than seasoning. Its role is not to make caviar salty, but to help the pearls keep form, tension, and aromatic order through time."]],
        ["The Master's Hand", ["A salter does not rely on instruments alone. Touch, gloss, the way pearls roll, and the first smell of a tin all participate in the judgment. Experience is not mysticism; it is pattern recognition built from years of records.", "Each batch carries slight differences. The craft is not to flatten them into sameness, but to preserve a clean LuxurEat finish while letting origin remain visible."]],
        ["After the Cold Chain", ["Low-salt caviar depends on cold chain, but cold chain is not the end. Transport, resting, opening, and serving all shape the final taste.", "For that reason, service guidance belongs inside the product story. A tin reaches its value only when it is opened correctly."]],
      ],
      quote: "The less salt you use, the more discipline you owe the roe.",
      related: ["en-harvest", "en-service", "en-champagne"],
    },
    "en-champagne": {
      lang: "en", eyebrow: "Pairing", title: "Champagne", meta: "PAIRING · Brut",
      image: images.champagne,
      media: [images.table, images.service, images.blini],
      intro: "Vintage brut Champagne brings acidity and fine bubbles that refresh the palate between rich, saline tastes. It is not simply celebratory; it resets the mouth between each spoonful.",
      sections: [
        ["How to Choose", ["Favor bright acidity and restrained oak so the wine cleanses rather than competes. Heavy toast can flatten caviar's mineral finish, while sweetness can make its marine clarity feel dull.", "Blanc de Blancs is often sharper and works beautifully with structured Beluga. Aged Champagne brings nutty and brioche notes that can suit richer Oscetra."]],
        ["The Work of Bubbles", ["Fine bubbles act like small brushes across the palate, lifting oil and returning definition to the next pearl. Good pairing does not add complexity; it makes complexity easier to read.", "For that reason, we pour modestly and refill often. Low temperature, small pours, and quiet pacing serve caviar better than a glass filled too early."]],
        ["A Quiet Peak", ["Caviar and Champagne already form a complete gesture. If blini or crème fraîche enters the service, it should be thin and neutral, a support for texture rather than a new center of attention."]],
      ],
      quote: "The best bubbles do not speak louder; they make the next taste clearer.",
      related: ["en-mother-of-pearl", "en-harvest", "en-service"],
    },
    "en-mother-of-pearl": {
      lang: "en", eyebrow: "Service Ware", title: "Mother-of-Pearl Spoon", meta: "SERVICE · Spoon",
      image: images.spoon,
      media: [images.harvestDetail, images.service, images.table],
      intro: "Mother-of-pearl is the simplest way to protect the roe from metallic flavors during service. It may appear ornamental, but it decides whether the last centimeter before tasting remains clean.",
      sections: [
        ["Why Not Metal", ["Silver can leave an oxidative finish that overwhelms low-salt caviar's creamy delicacy. Metal also introduces a hard coldness that can disturb the pearls before they reach the palate.", "Mother-of-pearl is valuable because it stays neutral. It does not steal flavor, conduct heat too quickly, or leave scent behind. It simply carries the roe intact."]],
        ["The Shape of the Spoon", ["The bowl should not be too deep, which compresses pearls, nor too flat, which makes portioning rough. The ideal curve lets the pearls rest and slide with almost no pressure.", "For private tastings, we prefer smaller spoons. A modest first bite often reveals more detail than a dramatic serving."]],
        ["The Temperature of Ritual", ["Mother-of-pearl is not nostalgia. It is a way for modern service to stay accurate. True ritual is made of actions that can explain why they exist."]],
      ],
      quote: "The quieter the utensil, the louder the flavor.",
      related: ["en-service", "en-champagne", "en-harvest"],
    },
    "en-ice-server": {
      lang: "en", eyebrow: "Service Ware", title: "Modern Silver Ice Server", meta: "SERVICE · Ice",
      image: images.ice,
      media: [images.temperature, images.champagne, images.table],
      intro: "A double-walled server stabilizes temperature after opening, keeping the tasting ritual calm and precise. It turns cold into a controlled background rather than a force that suppresses aroma.",
      sections: [
        ["Temperature Control", ["Crushed ice supports the tin without freezing the roe, preserving texture through service. The goal is not maximum cold, but a slow and stable environment after opening.", "When light frost appears on the tin, service checks whether the base touches the ice too tightly. Excess contact can harden pearls; too little contact lets oils loosen too fast."]],
        ["Order on the Table", ["A silver or glass server should stay low enough for guests to observe color. We value proportion, reflection, and touch more than theatrical form.", "It may sit at the center of the table, but it should never become the center of the experience. The center remains the clean marine aroma released at opening."]],
        ["The Rhythm of Service", ["From refrigerator to table, from opening to portioning, each movement protects a single goal: every spoon should feel close to the first spoon."]],
      ],
      quote: "Cold is not the purpose. Stability is.",
      related: ["en-harvest", "en-mother-of-pearl", "en-service"],
    },
    "en-breath": {
      lang: "en", eyebrow: "Tasting Ritual", title: "Breathing Rhythm", meta: "RITUAL · Rest",
      image: images.champagne,
      media: [images.ice, images.table, images.harvestDetail],
      intro: "The first minutes after opening let the aroma move from cellar-cold to table-ready. Breathing does not mean warming the caviar; it means letting aroma become readable again.",
      sections: [
        ["Why Rest Matters", ["A brief rest keeps the roe cold while allowing cream, brine, and minerality to become legible. A freshly opened tin often begins with clean saline air; after a few minutes, nut, cream, and mineral length begin to emerge.", "This waiting period needs no theatrical gesture. Excess stirring, repeated opening, or long exposure can disturb the oils at the surface of the pearls."]],
        ["The Scale of Five Minutes", ["Five minutes is not a law; it is a safe service window. In a warm room it should shorten, and in a small private tasting the tin can be opened in stages to protect the final spoon.", "We watch the surface gloss. When the pearls begin to show a gentle wet reflection, the aroma usually shifts from cold salinity toward rounder cream."]],
        ["Before the First Bite", ["After the rest, do not rush into accompaniments. Taste the roe alone first with mother-of-pearl, then decide whether Champagne, blini, or crème fraîche has a role. Pairing matters only after the caviar itself has been heard."]],
      ],
      quote: "True awakening is waiting, not warming.",
      related: ["en-ice-server", "en-champagne", "en-palate"],
    },
    "en-hand-warm": {
      lang: "en", eyebrow: "Tasting Ritual", title: "The Hand Ritual", meta: "RITUAL · Warmth",
      image: images.spoon,
      media: [images.harvestDetail, images.temperature, images.service],
      intro: "A small spoonful on the back of the hand warms gently, revealing texture before the first taste. It bypasses the utensil and lets temperature, skin, and aroma meet directly.",
      sections: [
        ["Temperature and Texture", ["A controlled touch of warmth opens nutty notes, ocean salinity, and pearl tension. The point is not to heat caviar, but to loosen the oils held tight by cold storage.", "The gesture should stay simple: a small portion, a short pause, and a direct taste. Do not rub the pearls or leave them exposed too long."]],
        ["Why the Hand", ["The back of the hand offers stable warmth and little aromatic interference. It also allows the taster to observe gloss and structure before tasting.", "This step is often used to assess a batch. It is more direct than table presentation and more honest than decorative ritual."]],
        ["The Boundary of Privacy", ["The hand ritual belongs to small expert tastings and does not suit every formal dinner. LuxurEat introduces it only when the setting supports the experience."]],
      ],
      quote: "The hand is the smallest and most precise warmer.",
      related: ["en-breath", "en-mother-of-pearl", "en-palate"],
    },
    "en-palate": {
      lang: "en", eyebrow: "Tasting Ritual", title: "Palate Release", meta: "RITUAL · Palate",
      image: images.harvest,
      media: [images.harvestDetail, images.malossol, images.spoon],
      intro: "Do not rush to chew. Let the pearls break slowly against the palate so the finish can unfold as a curve rather than a single burst of salt.",
      sections: [
        ["Pacing the First Bite", ["Minerality, cream, and marine length appear most clearly when the gesture stays restrained. Let the caviar rest on the tongue, then press it lightly against the palate so each pearl releases in sequence.", "Fast chewing makes every layer arrive at once and disappear at once. Slow down, and you can read the cool opening, the creamy middle, and the nutty finish."]],
        ["The Flavor Curve", ["Excellent caviar should finish cleanly, without heaviness or fishiness. It leaves length, mineral air, and a marine memory rather than blunt salinity.", "When Champagne or vodka enters, its purpose is to clear the palate and let the next spoon begin again, not erase the previous one."]],
        ["The Last Spoon", ["A great tasting does not become heavier as it goes. The final spoon should remain clear, sometimes even calmer than the first. That means temperature, tool, portion, and pace stayed under control."]],
      ],
      quote: "The most luxurious bite is rarely the largest one.",
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
                <span class="lux-reader-archive-media"><img src="${escapeHtml(item.image)}" alt=""></span>
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
    const contentImages = Array.from(new Set([
      ...(article.media || []),
      ...article.related.map((relatedId) => articles[relatedId]?.image).filter(Boolean),
      article.image,
    ].filter(Boolean)));
    const paragraphs = (content) => (Array.isArray(content) ? content : [content])
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join("");
    const sectionHtml = articleSections.map(([heading, content], index) => {
      const image = contentImages[index % contentImages.length] || article.image;
      const copyHtml = `<div><h3>${escapeHtml(heading)}</h3>${paragraphs(content)}</div>`;
      if (index === 0) {
        return `<section class="lux-reader-section lux-reader-section-split">${copyHtml}<figure><img src="${escapeHtml(image)}" alt=""></figure></section>`;
      }
      if (index === 1) {
        return `<section class="lux-reader-section">${copyHtml}<figure class="lux-reader-wide-image"><img src="${escapeHtml(image)}" alt=""></figure></section>`;
      }
      return `<section class="lux-reader-section lux-reader-section-split lux-reader-section-reverse"><figure><img src="${escapeHtml(image)}" alt=""></figure>${copyHtml}</section>`;
    }).join("");

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
          ${sectionHtml}
          <section class="lux-reader-immersive" style="background-image:url('${escapeHtml(contentImages[2] || article.image)}')">
            <span>${escapeHtml(copy.note)}</span>
            <strong>${escapeHtml(article.quote || copy.noteText)}</strong>
          </section>
          ${article.quote ? `<blockquote class="lux-reader-quote">${escapeHtml(article.quote)}</blockquote>` : ""}
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
