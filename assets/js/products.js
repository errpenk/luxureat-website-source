const luxEscapeProductHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

window.luxResponsiveData?.(window.LUXUREAT_PRODUCT_DATA);

function renderLuxProductCatalog() {
  const grid = document.querySelector("[data-caviar-grid]");
  const data = window.LUXUREAT_PRODUCT_DATA;
  if (!grid || !data?.products) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const labels = lang === "zh"
    ? { add: "加入购物袋", unavailable: "暂时无货", inStock: "有货", stock: "库存", detail: "查看详情" }
    : { add: "Add to Cart", unavailable: "Out of Stock", inStock: "In Stock", stock: "in stock", detail: "View Details" };
  const formatMoney = (product) => product.priceLabel || `${product.currency || ""}${Math.round(Number(product.amount) || 0)}`;
  const formatPreviewPrice = (product) => product.catalogOnly
    ? `${product.priceLabel || "PRICE"} / ${lang === "zh" ? "份" : "unit"}`
    : `${formatMoney(product)} / ${product.unit}`;
  const stockLabel = (product) => product.available === false
    ? labels.unavailable
    : Number.isFinite(product.stockQuantity) ? `${product.stockQuantity} ${labels.stock}` : "";
  const speciesFor = (key) => {
    if (key.includes("beluga")) return "beluga";
    if (key.includes("oscetra")) return "oscetra";
    if (key.includes("champagne") || key.includes("truffle")) return "pairing";
    return "service";
  };
  const entries = Object.entries(data.products).filter(([key]) => key.startsWith(`${lang}-`));
  if (!entries.length) return;
  const productHref = (product) => location.pathname.endsWith(".html")
    ? `product.html?product=${encodeURIComponent(product.id)}`
    : `${encodeURIComponent(product.id)}/`;

  grid.innerHTML = entries.map(([key, product], index) => `
    <article class="group cursor-pointer flex flex-col gap-6${product.catalogOnly ? " is-catalog-only" : ""}" data-caviar-item data-species="${luxEscapeProductHtml((product.categories || [product.category || speciesFor(key)]).join(" "))}" data-product-type="${luxEscapeProductHtml(product.typeKey || "")}" data-price="${Number(product.amount) || 0}" data-recommendation="${index + 1}" data-title="${luxEscapeProductHtml(product.title)}">
      <div class="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-low" data-product-open="${luxEscapeProductHtml(key)}" role="button" tabindex="0" aria-label="${luxEscapeProductHtml(labels.detail)}: ${luxEscapeProductHtml(product.title)}">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style="background-image: url('${luxEscapeProductHtml(product.image)}');"></div>
      </div>
      <div class="flex flex-col gap-2 border-t border-secondary/20 pt-4">
        <div class="flex justify-between items-start">
          <h2 class="font-headline-md text-headline-sm md:text-headline-md text-on-surface"><a href="${productHref(product)}">${luxEscapeProductHtml(product.title)}</a></h2>
          <span class="font-body-lg text-body-lg text-secondary">${luxEscapeProductHtml(formatPreviewPrice(product))}</span>
        </div>
        <p class="lux-product-card-description font-body-md text-body-md text-on-surface-variant">${luxEscapeProductHtml(product.cardDesc || product.desc)}</p>
        ${product.mainIngredients ? `<small class="lux-product-registration-line font-label-sm text-label-sm"><strong>${luxEscapeProductHtml(product.eyebrow)}</strong><b aria-hidden="true">/</b><span>${luxEscapeProductHtml(product.mainIngredients)}</span></small>` : ""}
        ${stockLabel(product) ? `<small class="font-label-sm text-label-sm uppercase tracking-widest ${product.available === false ? "text-error" : "text-primary"}">${luxEscapeProductHtml(stockLabel(product))}</small>` : ""}
        <div class="mt-4 flex items-center gap-4">
          <button class="border border-primary text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm hover:bg-primary hover:text-surface-container-lowest transition-all duration-300 w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-45" data-purchase-cta type="button"${product.available === false ? " disabled aria-disabled=\"true\"" : ""}>${product.available === false ? labels.unavailable : labels.add}</button>
          <button class="border border-primary text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm hover:bg-primary hover:text-surface-container-lowest transition-all duration-300 w-full md:w-auto" data-product-open="${luxEscapeProductHtml(key)}" type="button">${labels.detail}</button>
        </div>
      </div>
    </article>`).join("");
}

function syncLuxProductBindings() {
  const products = window.LUXUREAT_PRODUCT_DATA?.products;
  if (!products) return;

  const formatMoney = (product) => `${product.currency || ""}${Math.round(Number(product.amount) || 0)} / ${product.unit || ""}`;
  const fields = {
    title: (product) => product.title,
    desc: (product) => product.desc,
    eyebrow: (product) => product.eyebrow,
    price: formatMoney,
  };

  document.querySelectorAll("[data-product-bind]").forEach((root) => {
    const product = products[root.dataset.productBind];
    if (!product) return;

    root.querySelectorAll("[data-product-field]").forEach((node) => {
      const value = fields[node.dataset.productField]?.(product);
      if (value) node.textContent = value;
    });
  });
}

function initLuxCaviarControls() {
  const controls = document.querySelector("[data-lux-caviar-controls]");
  const grid = document.querySelector("[data-caviar-grid]");
  const items = grid ? Array.from(grid.querySelectorAll("[data-caviar-item]")) : [];

  if (!controls || !grid || !items.length) {
    return;
  }

  const filterButtons = Array.from(document.querySelectorAll("[data-caviar-filter]"));
  const viewButtons = Array.from(controls.querySelectorAll("[data-caviar-view]"));
  const sortButton = controls.querySelector("[data-caviar-sort]");
  const sortLabel = controls.querySelector("[data-caviar-sort-label]");
  const sortMenu = controls.querySelector("[data-caviar-sort-menu]");
  const sortItems = Array.from(controls.querySelectorAll("[data-caviar-sort-option]"));
  const search = controls.querySelector("[data-caviar-search]");
  const searchClear = controls.querySelector("[data-caviar-search-clear]");
  const clearAll = document.querySelector("[data-caviar-clear]");
  const filterPanel = document.querySelector(".lux-product-filter-panel");
  const filterToggle = document.querySelector("[data-caviar-filter-toggle]");
  const count = document.querySelector("[data-caviar-count]");
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const empty = document.createElement("p");
  empty.className = "lux-caviar-empty";
  empty.innerHTML = lang === "zh"
    ? "<strong>即将上新</strong><span>未找到相关产品</span>"
    : "<strong>Coming Soon</strong><span>No related products found</span>";
  empty.hidden = true;
  grid.insertAdjacentElement("afterend", empty);

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
      label: lang === "zh" ? "价格低到高" : "Price: Low to High",
      compare: (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
    },
    {
      key: "price-desc",
      label: lang === "zh" ? "价格高到低" : "Price: High to Low",
      compare: (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
    },
  ];

  const activeFilters = { category: new Set(), type: new Set() };
  let activeView = "grid";
  let activeSortKey = "recommended";
  let searchTerm = "";
  const mobileFilters = matchMedia("(max-width: 767px)");

  const syncMobileFilterPanel = () => {
    if (!filterPanel || !filterToggle || !mobileFilters.matches || filterPanel.hidden) return;

    const toggleRect = filterToggle.getBoundingClientRect();
    filterPanel.style.setProperty("--lux-filter-panel-top", `${Math.round(toggleRect.bottom + 12)}px`);
    filterPanel.style.setProperty("--lux-filter-panel-left", `${Math.round(toggleRect.left)}px`);
    filterPanel.style.setProperty("--lux-filter-panel-width", `${Math.round(toggleRect.width)}px`);
  };

  const setFiltersOpen = (open) => {
    if (!filterPanel || !filterToggle) return;
    filterPanel.hidden = !open;
    filterToggle.setAttribute("aria-expanded", String(open));
    if (open) requestAnimationFrame(syncMobileFilterPanel);
  };

  filterToggle?.addEventListener("click", () => {
    setFiltersOpen(filterToggle.getAttribute("aria-expanded") !== "true");
  });
  if (mobileFilters.matches) setFiltersOpen(false);
  mobileFilters.addEventListener("change", (event) => setFiltersOpen(!event.matches));
  addEventListener("scroll", syncMobileFilterPanel, { passive: true });
  addEventListener("resize", syncMobileFilterPanel);

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
      const matchesSpecies = !activeFilters.category.size || item.dataset.species.split(" ").some((category) => activeFilters.category.has(category));
      const matchesType = !activeFilters.type.size || activeFilters.type.has(item.dataset.productType);
      const matchesSearch = !searchTerm || item.textContent.toLocaleLowerCase(lang === "zh" ? "zh-CN" : "en").includes(searchTerm);
      const matchesFilter = matchesSpecies && matchesType && matchesSearch;
      item.hidden = !matchesFilter;
      if (matchesFilter) {
        visibleCount += 1;
      }
    });

    if (count) {
      count.textContent = String(visibleCount);
    }
    grid.dataset.visibleCount = String(visibleCount);
    const shouldCenterEmpty = visibleCount === 0 && empty.hidden;
    empty.hidden = visibleCount !== 0;
    if (shouldCenterEmpty) requestAnimationFrame(() => empty.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" }));
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
      item.querySelector(".lux-sort-selected-icon")?.remove();
      if (selected) item.insertAdjacentHTML("beforeend", '<svg class="lux-lucide lux-sort-selected-icon" viewBox="0 0 24 24" aria-hidden="true" translate="no"><path d="M20 6 9 17l-5-5"/></svg>');
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
      const filter = button.dataset.caviarFilter || "all";
      const group = button.dataset.caviarFilterGroup === "type" ? "type" : "category";
      const selected = activeFilters[group];
      if (filter === "all") selected.clear();
      else if (selected.has(filter)) selected.delete(filter);
      else selected.add(filter);
      filterButtons.forEach((item) => {
        const itemGroup = item.dataset.caviarFilterGroup === "type" ? "type" : "category";
        if (itemGroup !== group) return;
        const itemFilter = item.dataset.caviarFilter || "all";
        const isActive = itemFilter === "all" ? !selected.size : selected.has(itemFilter);
        item.setAttribute("aria-pressed", String(isActive));
        activeButtonClasses.forEach((className) => item.classList.toggle(className, isActive));
        inactiveButtonClasses.forEach((className) => item.classList.toggle(className, !isActive));
      });
      applyFilter();
    });
  });

  search?.addEventListener("input", () => {
    searchTerm = search.value.trim().toLocaleLowerCase(lang === "zh" ? "zh-CN" : "en");
    searchClear?.classList.toggle("is-visible", Boolean(search.value));
    applyFilter();
  });
  searchClear?.addEventListener("click", () => {
    if (!search) return;
    search.value = "";
    searchTerm = "";
    searchClear.classList.remove("is-visible");
    search.focus();
    applyFilter();
  });
  clearAll?.addEventListener("click", () => {
    activeFilters.category.clear();
    activeFilters.type.clear();
    searchTerm = "";
    if (search) search.value = "";
    searchClear?.classList.remove("is-visible");
    filterButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.caviarFilter === "all")));
    applyFilter();
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

  const requestedCategories = new URLSearchParams(location.search).getAll("category")
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
  requestedCategories.forEach((category) => {
    filterButtons.find((button) => button.dataset.caviarFilterGroup === "category" && button.dataset.caviarFilter === category)?.click();
  });
  applyFilter();
  applyView();
  applySort();
}

renderLuxProductCatalog();
syncLuxProductBindings();
initLuxCaviarControls();

function initLuxProductDetails() {
  const productData = window.LUXUREAT_PRODUCT_DATA || {};
  const galleries = productData.galleries || {};
  const products = productData.products || {};
  const hash = location.hash || "";
  if (!Object.keys(products).length) return;
  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const requestedProduct = new URLSearchParams(location.search).get("product");
  const localized = (zh, en) => lang === "zh" ? zh : en;
  const detailHref = (page, hash) => `${document.querySelector(`.lux-nav a[href$="${page}.html"], .lux-nav a[href$="/${page}/"]`)?.href || `${page}.html`}#${hash}`;
  const recipeRef = (slug, zh, en) => [localized(zh, en), detailHref("recipe", `reader-${lang}-recipe-${slug}`)];
  const guideRef = (slug, zh, en) => [localized(zh, en), detailHref("blog", `reader-${lang}-academy-${slug}`)];
  const related = (links) => ({
    title: localized("相关食谱与知识", "Related Recipes & Guides"),
    links,
  });
  const productContentRules = [
    [/truffle-honey-/, related([recipeRef("truffle-tiramisu", "用松露蜂蜜制作提拉米苏", "Make Tiramisu with Truffle Honey"), recipeRef("truffle-toast", "在烤面包上搭配松露蜂蜜", "Pair Truffle Honey with Toast"), guideRef("truffle-meets-dessert", "松露蜂蜜与甜点的风味平衡", "Balancing Truffle Honey in Desserts"), guideRef("truffle-truffle-aroma-pairing", "控制松露蜂蜜的用量与香气", "Controlling Truffle Honey Quantity and Aroma")])],
    [/whole-summer-truffles-/, related([recipeRef("truffle-summer-crostini", "用整颗夏季松露制作烤面包", "Make Crostini with Whole Summer Truffle"), recipeRef("truffle-tagliolini", "把夏季松露刨在细面上", "Shave Summer Truffle over Tagliolini"), guideRef("truffle-truffle-types", "夏季松露与白松露、黑松露的区别", "How Summer Truffle Differs from White and Black Truffle"), guideRef("truffle-buying-truffle-products", "整颗松露的选择与使用方法", "How to Choose and Use Whole Truffle")])],
    [/summer-truffle-slices-/, related([recipeRef("black-truffle-risotto", "在烩饭中使用夏季松露片", "Use Summer Truffle Slices in Risotto"), recipeRef("truffle-tagliolini", "在细面中加入夏季松露片", "Add Summer Truffle Slices to Tagliolini"), guideRef("truffle-truffle-types", "认识夏季松露的香气与适用菜式", "Understanding Summer Truffle Aroma and Uses"), guideRef("truffle-buying-truffle-products", "松露片的选择、用量与保存", "Choosing, Portioning and Storing Truffle Slices")])],
    [/(?:white|black|winter-black)-truffle-sauce-/, related([recipeRef("truffle-ravioli", "在松露馄饨中使用松露酱", "Use Truffle Sauce in Ravioli"), recipeRef("mushroom-soup", "用松露酱提升菌菇汤香气", "Add Truffle Sauce to Mushroom Soup"), guideRef("truffle-buying-truffle-products", "根据菜式选择白松露酱或黑松露酱", "Choosing White or Black Truffle Sauce for a Dish"), guideRef("truffle-truffle-aroma-pairing", "松露酱与黄油、奶油和菌菇的搭配", "Pairing Truffle Sauce with Butter, Cream and Mushrooms")])],
    [/winter-black-truffle-juice-/, related([recipeRef("black-truffle-risotto", "用冬季黑松露汁调味烩饭", "Season Risotto with Winter Black Truffle Juice"), guideRef("truffle-truffle-aroma-pairing", "松露汁的温度、用量与香气控制", "Temperature, Quantity and Aroma Control for Truffle Juice"), guideRef("truffle-truffle-types", "冬季黑松露的风味特征", "Flavour Characteristics of Winter Black Truffle")])],
    [/white-truffle-(?:oil|evoo)-/, related([recipeRef("truffle-eggs", "用白松露油调味炒蛋", "Season Eggs with White Truffle Oil"), recipeRef("truffle-tagliolini", "在细面出锅后加入白松露油", "Finish Tagliolini with White Truffle Oil"), guideRef("truffle-truffle-aroma-pairing", "白松露油与鸡蛋、意面的搭配逻辑", "Why White Truffle Oil Suits Eggs and Pasta")])],
    [/truffle-fettuccine/, related([recipeRef("truffle-tagliolini", "用松露宽面实践经典松露意面", "Make a Classic Truffle Pasta with Truffle Fettuccine"), guideRef("truffle-truffle-aroma-pairing", "掌握松露意面的温度与风味平衡", "Balance Temperature and Aroma in Truffle Pasta"), guideRef("pasta-academy", "根据面型、酱汁与火候完成意面", "Match Pasta Shape, Sauce and Cooking Time")])],
  ];
  const caviarContent = related([guideRef("caviar-after-opening", "鱼子酱开封后的保存方法", "How to Keep Your Caviar at Its Best After Opening")]);
  const oliveContent = related([recipeRef("olive-pasta", "用特级初榨橄榄油制作蒜香意面", "Make Garlic Pasta with Extra Virgin Olive Oil"), recipeRef("olive-bruschetta", "用烤面包品鉴橄榄油", "Taste Olive Oil with Bruschetta"), guideRef("choose-use-store-evo", "特级初榨橄榄油的选择、使用与保存", "Choosing, Using and Storing Extra Virgin Olive Oil")]);
  const pastaContent = related([recipeRef("olive-pasta", "用意面实践酱汁乳化与出锅收汁", "Practise Sauce Emulsification and Finishing with Pasta"), guideRef("pasta-academy", "根据意面形状、酱汁与火候做选择", "Choose by Pasta Shape, Sauce and Cooking Time"), guideRef("dictionary-pasta-risotto", "认识长面、宽面与管状意面的区别", "Understand Long, Ribbon and Tubular Pasta Shapes"), guideRef("cooking-techniques", "掌握面水、火候与乳化的基础技巧", "Master Pasta Water, Timing and Emulsification")]);

  const formatMoney = (currency, amount) => `${currency}${Math.round(Number(amount) || 0)}`;
  const catalogUnit = () => document.documentElement.lang?.startsWith("zh") ? "份" : "unit";
  const copy = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", add: "加入购物袋", unavailable: "暂时无货", inStock: "有货", stock: "库存", detail: "查看详情", recent: "更多推荐", specs: ["生产企业", "中国注册号", "产品类别 / HS", "有效期至"], story: "产品说明" }
    : { back: "Back", close: "Close", add: "Add to Cart", unavailable: "Out of Stock", inStock: "In Stock", stock: "in stock", detail: "View Details", recent: "More Recommendations", specs: ["Manufacturer", "China Registration", "Category / HS", "Valid Until"], story: "Product Information" };
  const galleryFor = (product) => {
    if (product.gallery?.length) return product.gallery;
    if (product.id.includes("truffle")) return galleries.truffle;
    return [product.image];
  };

  const detail = document.createElement("div");
  detail.className = "lux-product-detail";
  detail.hidden = true;
  detail.innerHTML = `<div class="lux-product-backdrop" data-product-close></div><section class="lux-product-panel" role="dialog" aria-modal="true" aria-labelledby="lux-product-title"><button class="lux-product-back" type="button" data-product-back hidden></button><button class="lux-product-close" type="button" data-product-close></button><div class="lux-product-body" tabindex="-1"></div></section>`;
  document.body.appendChild(detail);
  const imageLightbox = document.createElement("dialog");
  imageLightbox.className = "lux-product-image-lightbox";
  imageLightbox.setAttribute("aria-label", lang === "zh" ? "产品图片放大预览" : "Enlarged product image");
  imageLightbox.innerHTML = `<button type="button" aria-label="${lang === "zh" ? "关闭放大图片" : "Close enlarged image"}">×</button><img alt="">`;
  document.body.appendChild(imageLightbox);
  const openImageLightbox = (src, alt) => {
    const image = imageLightbox.querySelector("img");
    image.src = src;
    image.alt = alt;
    imageLightbox.showModal();
  };
  imageLightbox.querySelector("button").addEventListener("click", () => imageLightbox.close());
  imageLightbox.addEventListener("click", (event) => {
    if (event.target === imageLightbox) imageLightbox.close();
  });
  const body = detail.querySelector(".lux-product-body");
  const backButton = detail.querySelector(".lux-product-back");
  const closeButton = detail.querySelector(".lux-product-close");
  let openedByPush = false;
  let currentProductId = "";
  const productStack = [];

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

  const productFamily = (productId) => productId
    .replace(/-(?:60ml|250ml|50g|55g|80g|110g|170g|180g|275g|350g|350ml|500g)$/, "")
    .replace(/-(?:water|oil)$/, "");
  const productUse = (productId) => /honey/.test(productId) ? "sweet"
    : /(?:oil|evoo)/.test(productId) ? "finishing"
      : /(?:slices|whole)/.test(productId) ? "truffle-piece"
        : /(?:sauce|juice)/.test(productId) ? "sauce"
          : "";

  const render = (id, push) => {
    const product = products[id];
    if (!product) return;
    if (push && !detail.hidden && currentProductId && currentProductId !== id) productStack.push(currentProductId);
    currentProductId = id;
    const labels = copy();
    const content = productContentRules.find(([pattern]) => pattern.test(product.id))?.[1]
      || (product.categories?.includes("caviar") || /(?:beluga|oscetra|caviar)/.test(product.id) ? caviarContent : null)
      || (product.categories?.includes("olive-oil") ? oliveContent : null)
      || (product.categories?.includes("pasta") ? pastaContent : null);
    const galleryImages = Array.from(new Set(galleryFor(product).filter(Boolean)));
    const prefix = id.startsWith("zh-") ? "zh-" : "en-";
    const recommendations = Object.entries(products)
      .filter(([key]) => key !== id && key.startsWith(prefix))
      .map(([key, item], index) => ({
        key,
        item,
        index,
        score: (productFamily(key) === productFamily(id) ? 100 : 0)
          + (productUse(key) && productUse(key) === productUse(id) ? 40 : 0)
          + (item.categories?.some((category) => product.categories?.includes(category)) ? 10 : 0),
      }))
      .sort((a, b) => b.score - a.score || a.index - b.index)
      .slice(0, 6)
      .map(({ key, item }) => [key, item]);
    body.innerHTML = `
      <article>
        <section class="lux-product-hero">
          <div class="lux-product-gallery">
            <div class="lux-product-thumbs" aria-label="${luxEscapeProductHtml(product.title)} gallery">
              ${galleryImages.map((src, index) => `<button type="button" class="lux-product-thumb${index === 0 ? " is-active" : ""}" data-product-gallery="${index}" aria-label="${luxEscapeProductHtml(product.title)} ${index + 1}"><img loading="lazy" decoding="async" src="${luxEscapeProductHtml(src)}" alt="${luxEscapeProductHtml(product.title)} ${index + 1}"></button>`).join("")}
            </div>
            <button type="button" class="lux-product-image" data-product-image-zoom aria-label="${luxEscapeProductHtml(localized("放大查看", "Enlarge"))}：${luxEscapeProductHtml(product.title)}"><img loading="lazy" decoding="async" data-product-main-image src="${luxEscapeProductHtml(galleryImages[0] || product.image)}" alt="${luxEscapeProductHtml(product.title)}"></button>
          </div>
          <div class="lux-product-summary">
            <span>${luxEscapeProductHtml(product.eyebrow)}</span>
            <h2 id="lux-product-title">${luxEscapeProductHtml(product.title)}</h2>
            <p>${luxEscapeProductHtml(product.desc)}</p>
            <strong class="lux-product-price">${product.catalogOnly ? luxEscapeProductHtml(product.priceLabel || "PRICE") : `${luxEscapeProductHtml(formatMoney(product.currency, product.amount))} <small>/ ${luxEscapeProductHtml(product.unit)}</small>`}</strong>
            ${product.available === false || Number.isFinite(product.stockQuantity) ? `<small class="lux-product-stock">${luxEscapeProductHtml(product.available === false ? labels.unavailable : `${product.stockQuantity} ${labels.stock}`)}</small>` : ""}
            <div class="lux-product-purchase">
              <button type="button" data-purchase-cta${product.available === false ? " disabled aria-disabled=\"true\"" : ""}>${product.available === false ? labels.unavailable : labels.add}</button>
            </div>
          </div>
        </section>
        <section class="lux-product-specs${product.details ? " has-label-details" : ""}">
          ${(product.details || product.specs.map((value, index) => ({ label: labels.specs[index], value }))).map((item) => `<div><span>${luxEscapeProductHtml(item.label)}</span><strong>${luxEscapeProductHtml(item.value)}</strong></div>`).join("")}
        </section>
        <section class="lux-product-story">
          <h3>${labels.story}</h3>
          <p>${luxEscapeProductHtml(product.desc)}</p>
          ${content ? `<nav class="lux-reader-article-links" aria-label="${luxEscapeProductHtml(content.title)}">${content.links.map(([label, href]) => `<a class="lux-recipe-product-link" href="${luxEscapeProductHtml(href)}" data-lux-cta data-lux-cta-type="content" data-lux-cta-id="${luxEscapeProductHtml(product.id)}" data-lux-cta-location="product-story-related">${luxEscapeProductHtml(label)}<svg class="lux-lucide" aria-hidden="true" viewBox="0 0 24 24"><path d="M7 17 17 7M7 7h10v10"/></svg></a>`).join("")}</nav>` : ""}
        </section>
        ${recommendations.length ? `<section class="lux-product-recent">
          <div class="lux-product-recent-inner">
          <h3>${luxEscapeProductHtml(labels.recent)}</h3>
          <div class="lux-product-recent-grid">
            ${recommendations.map(([key, item]) => `<article class="lux-product-recent-card">
              <div class="lux-product-recent-media"><img loading="lazy" decoding="async" src="${luxEscapeProductHtml(item.image)}" alt="${luxEscapeProductHtml(item.title)}"></div>
              <strong>${luxEscapeProductHtml(item.title)}</strong>
              <small${item.catalogOnly ? ' class="is-test-price"' : ""}>${item.catalogOnly ? `${luxEscapeProductHtml(item.priceLabel || "PRICE")} / ${luxEscapeProductHtml(catalogUnit())}` : `${luxEscapeProductHtml(formatMoney(item.currency, item.amount))} / ${luxEscapeProductHtml(item.unit)}`}</small>
              <div class="lux-product-recent-actions">
                <button type="button" data-purchase-cta${item.available === false ? " disabled aria-disabled=\"true\"" : ""}>${luxEscapeProductHtml(item.available === false ? labels.unavailable : labels.add)}</button>
                <button type="button" data-product-open="${luxEscapeProductHtml(key)}">${luxEscapeProductHtml(labels.detail)}</button>
              </div>
            </article>`).join("")}
          </div>
          <div class="lux-product-recent-nav">
            <button type="button" data-product-recent-scroll="-1" aria-label="${luxEscapeProductHtml(labels.back)}" disabled aria-disabled="true"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg></button>
            <button type="button" data-product-recent-scroll="1" aria-label="${luxEscapeProductHtml(labels.detail)}"><svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></button>
          </div>
          </div>
        </section>` : ""}
      </article>`;
    window.luxTrack?.("view_item", {
      currency: product.currency,
      value: Number(product.amount) || 0,
      items: [{ item_id: product.id, item_name: product.title }],
    });
    backButton.textContent = labels.back;
    backButton.hidden = !productStack.length && !window.LuxureatHasInternalBack?.();
    closeButton.textContent = labels.close;
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
      } else window.LuxureatBackInternalLink?.();
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
        mainImage.closest(".lux-product-image")?.classList.toggle("is-secondary", galleryButton.dataset.productGallery !== "0");
        detail.querySelectorAll("[data-product-gallery]").forEach((button) => button.classList.remove("is-active"));
        galleryButton.classList.add("is-active");
      }
      return;
    }
    const zoomButton = event.target.closest("[data-product-image-zoom]");
    if (zoomButton) {
      const image = zoomButton.querySelector("img");
      if (image) openImageLightbox(image.src, image.alt);
      return;
    }
  });
  const close = () => {
    window.LuxureatCloseInternalLink?.();
    detail.hidden = true;
    document.body.classList.remove("lux-reader-open");
    if (location.hash.startsWith("#product-")) history.replaceState(null, "", `${location.pathname}${location.search}`);
    openedByPush = false;
    currentProductId = "";
    productStack.length = 0;
  };

  window.addEventListener("resize", syncRecentNav);

  document.addEventListener("click", (event) => {
    const media = event.target.closest(".lux-product-recent-media");
    const trigger = event.target.closest("[data-product-open]")
      || (!event.target.closest("button, a, input, select, textarea") ? media?.closest(".lux-product-recent-card")?.querySelector("[data-product-open]") : null);
    if (!trigger) return;
    const productId = trigger.dataset.productOpen;
    if (!products[productId]) return;
    if (trigger.href && new URL(trigger.href, location.href).pathname !== location.pathname) return;
    event.preventDefault();
    render(productId, true);
  });
  document.addEventListener("keydown", (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    const trigger = event.target.closest('[data-product-open][role="button"]');
    if (!trigger || !products[trigger.dataset.productOpen]) return;
    event.preventDefault();
    render(trigger.dataset.productOpen, true);
  });
  detail.querySelectorAll("[data-product-close]").forEach((button) => button.addEventListener("click", close));
  window.addEventListener("popstate", () => {
    if (!detail.hidden) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (imageLightbox.open) {
      event.preventDefault();
      imageLightbox.close();
      return;
    }
    if (!detail.hidden) close();
  });

  const initialId = hash.replace(/^#product-/, "") || Object.keys(products).find((key) => key.startsWith(`${lang}-`) && products[key].id === requestedProduct) || "";
  if (products[initialId]) render(initialId, false);
}



if (document.readyState === "complete") initLuxProductDetails();
else document.addEventListener("DOMContentLoaded", initLuxProductDetails, { once: true });
