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
  const count = document.querySelector("[data-caviar-count]");

  const activeButtonClasses = ["border-primary", "text-primary", "bg-primary/10"];
  const inactiveButtonClasses = ["border-outline-variant", "text-on-surface-variant"];
  const activeIconClasses = ["text-primary"];
  const inactiveIconClasses = ["text-on-surface-variant"];
  const sortOptions = [
    {
      key: "recommended",
      label: "推荐排列",
      compare: (a, b) => Number(a.dataset.recommendation) - Number(b.dataset.recommendation),
    },
    {
      key: "price-asc",
      label: "价格升序",
      compare: (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
    },
    {
      key: "price-desc",
      label: "价格降序",
      compare: (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
    },
  ];

  let activeFilter = "all";
  let activeView = "grid";
  let activeSortIndex = 0;

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
    const option = sortOptions[activeSortIndex];
    if (sortButton) {
      sortButton.dataset.caviarSort = option.key;
      sortButton.setAttribute("aria-label", `切换排序方式，当前为${option.label}`);
    }
    if (sortLabel) {
      sortLabel.textContent = option.label;
    }

    items
      .slice()
      .sort(option.compare)
      .forEach((item) => grid.appendChild(item));
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
      activeSortIndex = (activeSortIndex + 1) % sortOptions.length;
      applySort();
    });
  }

  applyFilter();
  applyView();
  applySort();
}

initLuxCaviarControls();

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
