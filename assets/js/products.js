const luxEscapeProductHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[char]));

function renderLuxProductCatalog() {
  const grid = document.querySelector("[data-caviar-grid]");
  const data = window.LUXUREAT_PRODUCT_DATA;
  if (!grid || !data?.products) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const labels = lang === "zh"
    ? { add: "加入购物袋", detail: "查看详情", badge: "限量珍藏" }
    : { add: "Add to Cart", detail: "View Details", badge: "Limited Reserve" };
  const formatMoney = (product) => `${product.currency || ""}${Math.round(Number(product.amount) || 0)}`;
  const speciesFor = (key) => {
    if (key.includes("beluga")) return "beluga";
    if (key.includes("oscetra")) return "oscetra";
    if (key.includes("champagne") || key.includes("truffle")) return "pairing";
    return "service";
  };
  const entries = Object.entries(data.products).filter(([key]) => key.startsWith(`${lang}-`));
  if (!entries.length) return;

  grid.innerHTML = entries.map(([key, product], index) => `
    <article class="group cursor-pointer flex flex-col gap-6" data-caviar-item data-species="${speciesFor(key)}" data-price="${Number(product.amount) || 0}" data-recommendation="${index + 1}" data-title="${luxEscapeProductHtml(product.title)}">
      <div class="relative w-full aspect-[4/3] overflow-hidden bg-surface-container-low">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" style="background-image: url('${luxEscapeProductHtml(product.image)}');"></div>
        ${index === 0 ? `<div class="absolute top-4 left-4 border border-secondary/50 px-3 py-1 bg-surface-container-lowest/80 backdrop-blur-md"><span class="font-label-sm text-label-sm text-secondary uppercase tracking-widest">${labels.badge}</span></div>` : ""}
      </div>
      <div class="flex flex-col gap-2 border-t border-secondary/20 pt-4">
        <div class="flex justify-between items-start">
          <h2 class="font-headline-md text-headline-sm md:text-headline-md text-on-surface">${luxEscapeProductHtml(product.title)}</h2>
          <span class="font-body-lg text-body-lg text-secondary">${luxEscapeProductHtml(formatMoney(product))} / ${luxEscapeProductHtml(product.unit)}</span>
        </div>
        <p class="font-body-md text-body-md text-on-surface-variant line-clamp-2">${luxEscapeProductHtml(product.desc)}</p>
        <div class="mt-4 flex items-center gap-4">
          <button class="border border-primary text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm hover:bg-primary hover:text-surface-container-lowest transition-all duration-300 w-full md:w-auto" data-bag-add data-bag-id="${luxEscapeProductHtml(product.id)}" data-bag-sku="${luxEscapeProductHtml(product.sku)}" data-bag-title="${luxEscapeProductHtml(product.title)}" data-bag-subtitle="${luxEscapeProductHtml(product.subtitle)}" data-bag-price="${luxEscapeProductHtml(product.amount)}" data-bag-currency="${luxEscapeProductHtml(product.currency)}" data-bag-image="${luxEscapeProductHtml(product.image)}" type="button">${labels.add}</button>
          <button class="border border-outline-variant text-on-surface hover:border-primary hover:text-primary px-6 py-2 uppercase tracking-widest font-label-sm text-label-sm transition-all duration-300 w-full md:w-auto" data-product-open="${luxEscapeProductHtml(key)}" type="button">${labels.detail}</button>
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
    root.querySelectorAll("[data-bag-add]").forEach((button) => {
      button.dataset.bagId = product.id;
      button.dataset.bagSku = product.sku;
      button.dataset.bagTitle = product.title;
      button.dataset.bagSubtitle = product.subtitle;
      button.dataset.bagPrice = product.amount;
      button.dataset.bagCurrency = product.currency;
      button.dataset.bagImage = product.image;
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
syncLuxProductBindings();
initLuxCaviarControls();

function initLuxProductDetails() {
  const productData = window.LUXUREAT_PRODUCT_DATA || {};
  const galleries = productData.galleries || {};
  const products = productData.products || {};
  const hash = location.hash || "";
  if (!Object.keys(products).length) return;

  const formatMoney = (currency, amount) => `${currency}${Math.round(Number(amount) || 0)}`;
  const copy = () => document.documentElement.lang?.startsWith("zh")
    ? { back: "返回", close: "关闭", add: "加入购物袋", detail: "查看详情", qty: "数量", remove: "移除", recent: "最近浏览过", specs: ["鲟鱼品种 SPECIES", "颗粒直径 SIZE", "珍珠色泽 COLOR", "味觉特征 PROFILE"], story: "传承与自然的洗礼", note: "LuxurEat（露意膳） 以冷链、批次记录与开罐服务标准确保每一次品鉴都保持稳定、清晰且可追溯。" }
    : { back: "Back", close: "Close", add: "Add to Cart", detail: "View Details", qty: "Qty", remove: "Remove", recent: "Recently Viewed", specs: ["Species", "Pearl Size", "Color", "Profile"], story: "Heritage & Origin", note: "LuxurEat（露意膳） protects every tasting with cold-chain handling, batch records, and precise opening standards." };
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
            <div class="lux-product-thumbs" aria-label="${luxEscapeProductHtml(product.title)} gallery">
              ${galleryImages.map((src, index) => `<button type="button" class="lux-product-thumb${index === 0 ? " is-active" : ""}" data-product-gallery="${index}" aria-label="${luxEscapeProductHtml(product.title)} ${index + 1}"><img loading="lazy" decoding="async" src="${luxEscapeProductHtml(src)}" alt="${luxEscapeProductHtml(product.title)} ${index + 1}"></button>`).join("")}
            </div>
            <div class="lux-product-image"><img loading="lazy" decoding="async" data-product-main-image src="${luxEscapeProductHtml(galleryImages[0] || product.image)}" alt="${luxEscapeProductHtml(product.title)}"></div>
          </div>
          <div class="lux-product-summary">
            <span>${luxEscapeProductHtml(product.eyebrow)}</span>
            <h2 id="lux-product-title">${luxEscapeProductHtml(product.title)}</h2>
            <p>${luxEscapeProductHtml(product.desc)}</p>
            <strong class="lux-product-price">${luxEscapeProductHtml(formatMoney(product.currency, product.amount))} <small>/ ${luxEscapeProductHtml(product.unit)}</small><em data-product-total hidden></em></strong>
            <div class="lux-product-purchase">
              <div class="lux-product-qty" aria-label="${luxEscapeProductHtml(labels.qty)}">
                <button type="button" data-product-quantity="-1" aria-label="${luxEscapeProductHtml(labels.qty)} -">−</button>
                <output data-product-quantity-value>1</output>
                <button type="button" data-product-quantity="1" aria-label="${luxEscapeProductHtml(labels.qty)} +">+</button>
              </div>
              <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${luxEscapeProductHtml(product.id)}" data-bag-sku="${luxEscapeProductHtml(product.sku)}" data-bag-title="${luxEscapeProductHtml(product.title)}" data-bag-subtitle="${luxEscapeProductHtml(product.subtitle)}" data-bag-price="${luxEscapeProductHtml(product.amount)}" data-bag-currency="${luxEscapeProductHtml(product.currency)}" data-bag-image="${luxEscapeProductHtml(product.image)}">${labels.add}</button>
            </div>
            <div class="lux-product-cart-state" data-product-cart-state hidden>
              <span data-product-cart-text></span>
              <button type="button" data-bag-remove="${luxEscapeProductHtml(product.id)}">${luxEscapeProductHtml(labels.remove)}</button>
            </div>
          </div>
        </section>
        <section class="lux-product-specs">
          ${product.specs.map((value, index) => `<div><span>${luxEscapeProductHtml(labels.specs[index])}</span><strong>${luxEscapeProductHtml(value)}</strong></div>`).join("")}
        </section>
        <section class="lux-product-story">
          <h3>${labels.story}</h3>
          <p>${luxEscapeProductHtml(product.desc)} ${luxEscapeProductHtml(labels.note)}</p>
        </section>
        ${recommendations.length ? `<section class="lux-product-recent">
          <div class="lux-product-recent-inner">
          <h3>${luxEscapeProductHtml(labels.recent)}</h3>
          <div class="lux-product-recent-grid">
            ${recommendations.map(([key, item]) => `<article class="lux-product-recent-card">
              <img loading="lazy" decoding="async" src="${luxEscapeProductHtml(item.image)}" alt="${luxEscapeProductHtml(item.title)}">
              <strong>${luxEscapeProductHtml(item.title)}</strong>
              <small>${luxEscapeProductHtml(formatMoney(item.currency, item.amount))} / ${luxEscapeProductHtml(item.unit)}</small>
              <div class="lux-product-recent-actions">
                <button type="button" data-bag-add data-bag-quantity="1" data-bag-id="${luxEscapeProductHtml(item.id)}" data-bag-sku="${luxEscapeProductHtml(item.sku)}" data-bag-title="${luxEscapeProductHtml(item.title)}" data-bag-subtitle="${luxEscapeProductHtml(item.subtitle)}" data-bag-price="${luxEscapeProductHtml(item.amount)}" data-bag-currency="${luxEscapeProductHtml(item.currency)}" data-bag-image="${luxEscapeProductHtml(item.image)}">${luxEscapeProductHtml(labels.add)}</button>
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
    sku: String(product.sku || product.id || "").trim(),
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
    sku: button.dataset.bagSku,
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
    <div class="lux-bag-item flex flex-col md:flex-row gap-6 p-6 border border-outline-variant/30 bg-surface-container-lowest group" data-bag-item="${luxEscapeProductHtml(item.id)}">
      <div class="lux-bag-image w-full md:w-48 h-48 overflow-hidden bg-surface-container">
        ${item.image ? `<img loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${luxEscapeProductHtml(item.image)}" alt="${luxEscapeProductHtml(item.title)}">` : ""}
        ${detailId ? `<button class="lux-bag-detail" type="button" data-product-open="${luxEscapeProductHtml(detailId)}">${lang === "zh" ? "查看详情" : "View Details"}</button>` : ""}
      </div>
      <div class="flex-1 flex flex-col justify-between">
        <div class="flex justify-between gap-6 items-start">
          <div>
            <h3 class="font-headline-sm text-headline-sm mb-1">${luxEscapeProductHtml(item.title)}</h3>
            <p class="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4">${luxEscapeProductHtml(item.subtitle)}</p>
          </div>
          <span class="lux-bag-price font-headline-sm text-headline-sm text-primary whitespace-nowrap">${money(item.currency, item.price)}${lineTotal}</span>
        </div>
        <div class="flex justify-between items-end mt-8">
          <div class="flex items-center gap-4">
            <span class="font-label-sm text-label-sm text-on-surface-variant uppercase">${lang === "zh" ? "数量" : "Qty"}</span>
            <div class="flex items-center border border-outline-variant/30">
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="-1" data-bag-id="${luxEscapeProductHtml(item.id)}" type="button"${minDisabled}><span class="material-symbols-outlined text-sm">remove</span></button>
              <span class="w-12 text-center font-label-lg">${quantity}</span>
              <button class="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high transition-colors" data-bag-change="1" data-bag-id="${luxEscapeProductHtml(item.id)}" type="button"${maxDisabled}><span class="material-symbols-outlined text-sm">add</span></button>
            </div>
          </div>
          <button class="text-on-surface-variant hover:text-error transition-colors flex items-center gap-2 font-label-sm uppercase tracking-widest" data-bag-remove="${luxEscapeProductHtml(item.id)}" type="button">
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
          <img loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="${luxEscapeProductHtml(product.image)}" alt="${luxEscapeProductHtml(product.title)}">
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3">
            <button type="button" class="px-6 py-3 border border-white text-white font-label-sm uppercase tracking-widest bg-black/20 backdrop-blur-sm" data-bag-add data-bag-id="${luxEscapeProductHtml(product.id)}" data-bag-sku="${luxEscapeProductHtml(product.sku)}" data-bag-title="${luxEscapeProductHtml(product.title)}" data-bag-subtitle="${luxEscapeProductHtml(product.subtitle)}" data-bag-price="${luxEscapeProductHtml(product.amount)}" data-bag-currency="${luxEscapeProductHtml(product.currency)}" data-bag-image="${luxEscapeProductHtml(product.image)}">${copy.add}</button>
            <button type="button" class="px-6 py-3 border border-primary text-primary font-label-sm uppercase tracking-widest bg-black/20 backdrop-blur-sm" data-product-open="${luxEscapeProductHtml(key)}">${copy.detail}</button>
          </div>
        </div>
        <h4 class="font-label-lg text-label-lg uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">${luxEscapeProductHtml(product.title)}</h4>
        <p class="font-label-sm text-label-sm text-on-surface-variant mb-2">${luxEscapeProductHtml(product.subtitle)}</p>
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

  const checkout = async (button) => {
    const lang = locale();
    const items = read();
    const feedback = document.querySelector("[data-bag-checkout-feedback]");
    const message = (zh, en) => lang === "zh" ? zh : en;
    const setMessage = (value) => { if (feedback) feedback.textContent = value; };
    if (!items.length) {
      setMessage(message("购物袋为空。", "Your shopping bag is empty."));
      return;
    }

    button.disabled = true;
    setMessage(message("正在连接安全结算…", "Connecting to secure checkout…"));
    const timeout = new AbortController();
    const timeoutId = setTimeout(() => timeout.abort(), 15000);
    try {
      const config = window.LuxureatCheckout;
      if (!config?.ajaxUrl || !config?.nonce) throw new Error(message("请刷新页面后重试。", "Please refresh the page and try again."));
      const body = new URLSearchParams({
        action: "luxureat_checkout",
        nonce: config.nonce,
        lang,
        items: JSON.stringify(items.map(({ sku, quantity }) => ({ sku, quantity }))),
      });
      const response = await fetch(config.ajaxUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body,
        signal: timeout.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.data?.message || message("购物车同步失败。", "Cart sync failed."));
      location.href = result.data.checkoutUrl;
    } catch (error) {
      setMessage(error.name === "AbortError" ? message("连接超时，请重试。", "The connection timed out. Please try again.") : (error.message || message("暂时无法结算，请稍后再试。", "Checkout is temporarily unavailable.")));
      button.disabled = false;
    } finally {
      clearTimeout(timeoutId);
    }
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
    if (removeButton) {
      api.remove(removeButton.dataset.bagRemove);
      return;
    }

    const checkoutButton = event.target.closest("[data-bag-checkout]");
    if (checkoutButton) checkout(checkoutButton);
  });

  document.addEventListener("DOMContentLoaded", () => {
    renderRecommendations();
    renderBag();
  });
})();


document.addEventListener("DOMContentLoaded", initLuxProductDetails);
