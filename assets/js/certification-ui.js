(() => {
  const section = document.querySelector("#certification-glossary");
  const cards = [...(section?.querySelectorAll(".lux-cert-card") || [])];
  if (!section || !cards.length || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let timers = [];
  const reset = () => {
    timers.forEach(clearTimeout);
    timers = [];
    cards.forEach((card) => card.classList.remove("is-scroll-flipped"));
  };
  new IntersectionObserver(([entry]) => {
    reset();
    if (!entry.isIntersecting) return;
    cards.forEach((card, index) => timers.push(setTimeout(() => card.classList.add("is-scroll-flipped"), index * 70)));
    timers.push(setTimeout(reset, 1500));
  }, { threshold: .24 }).observe(section);
})();

document.querySelectorAll("[data-cert-partnership-gallery]").forEach((gallery) => {
  const main = gallery.querySelector("[data-cert-partnership-main]");
  const thumbs = [...gallery.querySelectorAll("[data-cert-partnership-thumb]")];
  const status = gallery.querySelector("[data-cert-partnership-status]");
  const thumbsGrid = gallery.querySelector(".lux-cert-partnership-thumbs");
  const shell = gallery.querySelector(".lux-cert-partnership-gallery-shell");
  if (!main || thumbs.length < 2 || !status || !thumbsGrid || !shell) return;

  const isMobile = matchMedia("(max-width: 760px)");
  const isChinese = document.documentElement.lang.startsWith("zh");
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "lux-cert-partnership-expand";
  toggle.setAttribute("aria-controls", thumbsGrid.id ||= "partnership-gallery-thumbnails");
  shell.append(toggle);

  let index = 0;
  let expanded = false;
  const updateVisibility = () => {
    const limit = isMobile.matches ? 8 : 12;
    const currentIsOutsidePreview = index >= limit;
    thumbs.forEach((thumb, thumbIndex) => {
      const isPreview = thumbIndex < limit - (currentIsOutsidePreview ? 1 : 0) || thumbIndex === index;
      thumb.hidden = !expanded && !isPreview;
    });
    toggle.hidden = thumbs.length <= limit;
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.textContent = expanded
      ? (isChinese ? "收起图集" : "Collapse gallery")
      : (isChinese ? `展开全部 ${thumbs.length} 张` : `View all ${thumbs.length} images`);
  };
  const show = (nextIndex) => {
    index = (nextIndex + thumbs.length) % thumbs.length;
    const selected = thumbs[index];
    const preview = selected.querySelector("img");
    main.classList.add("is-changing");
    if (preview?.srcset) {
      main.srcset = preview.srcset;
      main.sizes = preview.sizes || "100vw";
    } else {
      main.removeAttribute("srcset");
      main.removeAttribute("sizes");
    }
    main.src = selected.dataset.src;
    main.alt = selected.dataset.alt;
    status.textContent = `${index + 1} / ${thumbs.length}`;
    thumbs.forEach((thumb) => {
      const isCurrent = Number(thumb.dataset.index) === index;
      thumb.style.order = thumb.dataset.index;
      thumb.classList.toggle("is-current", isCurrent);
      if (isCurrent) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    });
    updateVisibility();
    requestAnimationFrame(() => main.classList.remove("is-changing"));
  };

  toggle.addEventListener("click", () => {
    expanded = !expanded;
    updateVisibility();
  });
  isMobile.addEventListener?.("change", updateVisibility);
  gallery.querySelector("[data-cert-partnership-prev]")?.addEventListener("click", () => show(index - 1));
  gallery.querySelector("[data-cert-partnership-next]")?.addEventListener("click", () => show(index + 1));
  thumbs.forEach((thumb) => thumb.addEventListener("click", () => show(Number(thumb.dataset.index))));
  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(index + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  show(0);
});
