document.querySelectorAll("[data-market-data]").forEach((root) => {
  const tabs = [...root.querySelectorAll("[data-market-tab]")];
  const panels = [...root.querySelectorAll("[data-market-panel]")];
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = location.hash === "#italian-food-beverage" ? "food" : "trade";
  let visible = !("IntersectionObserver" in window);

  const animateNumber = (number) => {
    const target = Number(number.dataset.marketNumber);
    const decimals = (number.dataset.marketNumber.split(".")[1] || "").length;
    const render = (value) => `${number.dataset.marketPrefix || ""}${value.toFixed(decimals)}${number.dataset.marketSuffix || ""}`;
    if (reducedMotion) return void (number.textContent = render(target));
    const started = performance.now();
    const frame = (now) => {
      const progress = Math.min(1, (now - started) / 1000);
      number.textContent = render(target * (1 - (1 - progress) ** 3));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const activate = (name, focus = false) => {
    active = name;
    tabs.forEach((tab) => {
      const selected = tab.dataset.marketTab === name;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.marketPanel === name;
      panel.hidden = !selected;
      panel.classList.remove("is-reading");
      if (selected && visible) requestAnimationFrame(() => {
        panel.classList.add("is-reading");
        panel.querySelectorAll("[data-market-number]").forEach(animateNumber);
      });
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.marketTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      activate(tabs[next].dataset.marketTab, true);
    });
  });

  const syncHash = () => {
    if (location.hash === "#italian-food-beverage") activate("food");
    if (location.hash === "#italy-china-trade") activate("trade");
  };
  addEventListener("hashchange", syncHash);
  addEventListener("load", syncHash, { once: true });

  if ("IntersectionObserver" in window) new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    visible = true;
    activate(active);
    observer.disconnect();
  }, { threshold: .2 }).observe(root);
  activate(active);
});

document.querySelectorAll("[data-market-copy-group]").forEach((group) => {
  const target = group.querySelector("[data-market-copy-target]");
  const items = [...group.querySelectorAll("[data-market-explanation]")];
  if (!target || !items.length) return;
  const original = target.textContent;
  let timer;
  const swap = (copy) => {
    clearTimeout(timer);
    target.classList.add("is-changing");
    timer = setTimeout(() => {
      target.textContent = copy;
      target.classList.remove("is-changing");
    }, 140);
  };
  items.forEach((item) => {
    item.addEventListener("pointerenter", () => swap(item.dataset.marketExplanation));
    item.addEventListener("pointerleave", () => swap(original));
    item.addEventListener("focus", () => swap(item.dataset.marketExplanation));
    item.addEventListener("blur", () => swap(original));
  });

  if (matchMedia("(hover: none), (pointer: coarse)").matches && "IntersectionObserver" in window) {
    const visibleItems = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting
        ? visibleItems.set(entry.target, entry.intersectionRatio)
        : visibleItems.delete(entry.target));
      const activeItem = [...visibleItems].sort((a, b) => b[1] - a[1])[0]?.[0];
      items.forEach((item) => item.classList.toggle("is-scroll-active", item === activeItem));
      swap(activeItem?.dataset.marketExplanation || original);
    }, { threshold: [.45, .7], rootMargin: "-15% 0px -15%" });
    items.forEach((item) => observer.observe(item));
  }
});

if (matchMedia("(hover: none), (pointer: coarse)").matches && "IntersectionObserver" in window) {
  const cards = [...document.querySelectorAll(".lux-market-insights-page :is(#market-overview .lux-ms-stat, #cities .lux-ms-card, #market-judgement .lux-ms-card)")];
  const visibleCards = new Map();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting
      ? visibleCards.set(entry.target, entry.intersectionRatio)
      : visibleCards.delete(entry.target));
    const activeCard = [...visibleCards].sort((a, b) => b[1] - a[1])[0]?.[0];
    cards.forEach((card) => card.classList.toggle("is-scroll-active", card === activeCard));
  }, { threshold: [.48, .72], rootMargin: "-12% 0px -12%" });
  cards.forEach((card) => observer.observe(card));
}
