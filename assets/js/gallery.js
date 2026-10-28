(function () {
  const form = document.querySelector("[data-gallery-filters]");
  if (!form) return;

  const lang = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const gallery = window.LUXUREAT_GALLERY_DATA || [];
  for (const [key, cms] of Object.entries(window.LUXUREAT_CMS?.gallery || {})) {
    const id = key.slice(0, key.lastIndexOf(":"));
    let item = gallery.find((entry) => entry.id === id);
    if (!item) {
      item = { id, kind: "video", width: 768, height: 576, zh: { title: id }, en: { title: id } };
      gallery.push(item);
    }
    item[cms.lang] = { title: cms.title };
    if (cms.eventId) item.eventId = cms.eventId;
    if (cms.date) item.date = cms.date;
    if (cms.src) item.src = cms.src;
    const videoPoster = cms.cmsHtml?.match(/<video\b[^>]*\bposter=["']([^"']+)/i)?.[1];
    if (videoPoster || cms.poster) item.poster = videoPoster || cms.poster;
  }
  const events = new Map((window.LUXUREAT_EVENT_DATA?.events || []).map((event) => [event.id, event]));
  for (const media of gallery) if (media.collection) events.set(media.eventId, { ...media.collection, galleryCollection: true });
  const grid = document.querySelector("[data-gallery-grid]");
  const empty = document.querySelector("[data-gallery-empty]");
  const pageNav = document.querySelector("[data-gallery-pagination]");
  const dialog = document.querySelector("[data-gallery-dialog]");
  const viewer = document.querySelector("[data-gallery-viewer]");
  const caption = document.querySelector("[data-gallery-caption]");
  const previous = dialog.querySelector("[data-gallery-prev]");
  const next = dialog.querySelector("[data-gallery-next]");
  const searchInput = form.elements.search;
  const suggestions = form.querySelector("#gallery-suggestions");
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const eventFor = (media) => events.get(media.eventId);
  const eventName = (media) => eventFor(media)?.[lang]?.galleryTitle || eventFor(media)?.[lang]?.articleTitle || (lang === "zh" ? "企业影像" : "Company media");
  const placeName = (media) => media.place?.[lang] || eventFor(media)?.[lang]?.city || "";
  const eventHref = (media) => {
    if (!eventFor(media) || eventFor(media).galleryCollection) return "";
    const brand = location.protocol === "file:" || location.pathname.endsWith(".html") ? "brand.html?v=20261025-gallery15" : lang === "zh" ? "/brand/" : "/en/brand/";
    return `${brand}#event-${encodeURIComponent(media.eventId)}`;
  };
  const pageHref = (page) => location.protocol === "file:" || location.pathname.endsWith(".html")
    ? `${page}.html`
    : `${lang === "zh" ? "/" : "/en/"}${page}/`;
  const relatedLinks = (collection, className) => {
    const links = collection
      ? [[`${pageHref("blog")}#olive-academy`, lang === "zh" ? "橄榄油学院" : "Olive Oil Academy"], [`${pageHref("product")}?category=olive-oil#product-catalogue`, lang === "zh" ? "橄榄油系列产品" : "Olive Oil Products"]]
      : [[eventHref({ eventId: "sial-paris-2026" }), lang === "zh" ? "SIAL Paris 2026 展会详情" : "SIAL Paris 2026 Event Details"], [pageHref("product"), lang === "zh" ? "系列产品" : "Products"]];
    const label = className === "lux-gallery-caption-related" ? "" : `<span>${lang === "zh" ? "相关搜索：" : "Related searches: "}</span>`;
    return `<nav class="${className}" aria-label="${lang === "zh" ? "相关搜索" : "Related searches"}">${label}${links.map(([href, name]) => `<a href="${escapeHtml(href)}">${escapeHtml(name)} <span aria-hidden="true">→</span></a>`).join("")}</nav>`;
  };
  const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, lang === "zh" ? "zh-CN" : "en"));

  for (const place of unique(gallery.map(placeName))) form.elements.place.add(new Option(place, place));
  for (const id of unique(gallery.map((media) => media.eventId))) {
    const event = events.get(id);
    if (event) form.elements.event.add(new Option(event[lang].galleryTitle || event[lang].articleTitle, id));
  }

  const hashEvent = decodeURIComponent(location.hash).replace(/^#event-/, "");
  if (events.has(hashEvent) && gallery.some((media) => media.eventId === hashEvent)) form.elements.event.value = hashEvent;

  const ordered = [...gallery].sort((a, b) => b.date.localeCompare(a.date) || (a.eventId === b.eventId && a.sequence && b.sequence ? a.sequence - b.sequence : a.id.localeCompare(b.id)));
  const searchCandidates = unique(gallery.map(eventName)).concat(unique(gallery.map((media) => media[lang].title)));
  const showSuggestions = () => {
    const query = searchInput.value.trim().toLocaleLowerCase();
    const options = query ? searchCandidates.filter((name) => name.toLocaleLowerCase().includes(query) && name.toLocaleLowerCase() !== query).slice(0, 6) : [];
    suggestions.innerHTML = options.map((name) => `<button type="button" role="option" data-gallery-suggestion="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
    suggestions.hidden = !options.length;
    searchInput.setAttribute("aria-expanded", String(Boolean(options.length)));
  };
  searchInput.addEventListener("input", showSuggestions);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") { suggestions.hidden = true; searchInput.setAttribute("aria-expanded", "false"); }
    if (event.key === "ArrowDown" && !suggestions.hidden) { event.preventDefault(); suggestions.querySelector("button")?.focus(); }
  });
  suggestions.addEventListener("click", (event) => {
    const option = event.target.closest("[data-gallery-suggestion]");
    if (!option) return;
    searchInput.value = option.dataset.gallerySuggestion;
    suggestions.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.focus();
    form.dispatchEvent(new Event("input", { bubbles: true }));
  });
  document.addEventListener("click", (event) => {
    if (!form.querySelector(".lux-gallery-search").contains(event.target)) { suggestions.hidden = true; searchInput.setAttribute("aria-expanded", "false"); }
  });
  let matches = [];
  let eventCounts = new Map();

  const card = (media) => {
    const title = media[lang].title;
    return `<article class="lux-gallery-card">
      <button type="button" class="lux-gallery-card-media" data-gallery-open="${escapeHtml(media.id)}" aria-label="${escapeHtml(`${lang === "zh" ? "查看" : "View"} ${title}`)}">
        <img loading="lazy" decoding="async" width="${media.width}" height="${media.height}" src="${escapeHtml(media.poster || media.thumb || media.src)}" alt="">
        ${media.kind === "video" ? '<span class="lux-gallery-play" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M8 5 19 12 8 19Z"/></svg></span>' : ""}
      </button>
    </article>`;
  };

  const group = (items) => {
    const media = items[0];
    const href = eventHref(media);
    const name = eventName(media);
    const collection = eventFor(media)?.galleryCollection;
    const count = eventCounts.get(media.eventId || media.id) || items.length;
    const subtitle = eventFor(media)?.[lang]?.subtitle;
    const headingDetail = collection
      ? `<p class="lux-gallery-collection-subtitle">${escapeHtml(subtitle)}</p>`
      : `<p>${escapeHtml(placeName(media))} · ${escapeHtml(count)} ${lang === "zh" ? "条记录" : count === 1 ? "record" : "records"}</p>`;
    const related = collection || media.eventId === "sial-paris-2026" ? relatedLinks(collection, "lux-gallery-related") : "";
    return `<section class="lux-gallery-event${collection ? " lux-gallery-collection" : ""}" id="${collection ? "olive-oil-origin" : escapeHtml(`event-${media.eventId}`)}" aria-label="${escapeHtml(name)}"><div class="lux-gallery-event-heading"><div><h2>${escapeHtml(name)}</h2>${headingDetail}</div>${href ? `<a href="${escapeHtml(href)}" data-event-open="${escapeHtml(media.eventId)}">${lang === "zh" ? "展会详情" : "Event details"} <span aria-hidden="true">→</span></a>` : ""}</div><div class="lux-gallery-grid">${items.map(card).join("")}</div>${related}</section>`;
  };

  const filterMatches = () => {
    const search = form.elements.search.value.trim().toLocaleLowerCase();
    const start = form.elements.start.value;
    const place = form.elements.place.value;
    const eventId = form.elements.event.value;
    const kind = form.elements.kind.value;
    matches = ordered.filter((media) => {
      const names = `${media.zh.title} ${media.en.title} ${eventName(media)} ${placeName(media)}`.toLocaleLowerCase();
      return (!search || names.includes(search))
        && (!start || media.date >= start)
        && (!place || placeName(media) === place)
        && (!eventId || media.eventId === eventId)
        && (!kind || media.kind === kind);
    });
    eventCounts = new Map();
    for (const media of matches) {
      const key = media.eventId || media.id;
      eventCounts.set(key, (eventCounts.get(key) || 0) + 1);
    }
  };

  const renderPage = (page, size) => {
    const groups = new Map();
    for (const media of matches.slice((page - 1) * size, page * size)) {
      const key = media.eventId || media.id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(media);
    }
    grid.innerHTML = [...groups.values()].map(group).join("");
    empty.hidden = matches.length !== 0;
  };

  filterMatches();
  const pagination = luxCreatePagination(pageNav, { total: () => matches.length, scrollTarget: grid, onChange: renderPage });
  if (form.elements.event.value) requestAnimationFrame(() => grid.scrollIntoView({ block: "start" }));
  form.addEventListener("input", () => { filterMatches(); pagination.reset(); });
  form.addEventListener("change", () => {
    const eventId = form.elements.event.value;
    history.replaceState(null, "", `${location.pathname}${eventId ? `#event-${encodeURIComponent(eventId)}` : ""}`);
    filterMatches();
    pagination.reset();
  });
  form.addEventListener("reset", () => {
    suggestions.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    history.replaceState(null, "", location.pathname);
    setTimeout(() => { filterMatches(); pagination.reset(); }, 0);
  });
  document.querySelectorAll("[data-gallery-layout]").forEach((button) => button.addEventListener("click", () => {
    grid.dataset.layout = button.dataset.galleryLayout;
    document.querySelectorAll("[data-gallery-layout]").forEach((choice) => choice.setAttribute("aria-pressed", String(choice === button)));
  }));

  let currentMedia = null;
  let eventSequence = [];
  const showMedia = (media) => {
    currentMedia = media;
    const title = media[lang].title;
    const mediaHtml = media.kind === "video"
      ? `<div class="lux-gallery-video"><video controls playsinline preload="metadata" width="${media.width}" height="${media.height}" poster="${escapeHtml(media.poster)}"><source src="${escapeHtml(media.src)}" type="video/mp4"></video></div>`
      : `<img src="${escapeHtml(media.src)}" width="${media.width}" height="${media.height}" alt="${escapeHtml(title)}">`;
    viewer.innerHTML = mediaHtml;
    const event = eventFor(media);
    const eventCopy = event?.[lang];
    const index = eventSequence.indexOf(media);
    const href = eventHref(media);
    const eventTitle = (eventCopy?.galleryTitle || eventCopy?.articleTitle || "").split("·")[0].trim();
    caption.innerHTML = event?.galleryCollection
      ? `<p class="lux-gallery-chapter-title">${escapeHtml(title)}</p>${relatedLinks(true, "lux-gallery-caption-related")}`
      : `<div class="lux-gallery-caption-top">${index + 1} / ${eventSequence.length}</div><p>${escapeHtml(placeName(media))}${eventCopy?.date ? ` · ${escapeHtml(eventCopy.date)}` : ""}</p>${href ? `<a href="${escapeHtml(href)}" data-event-open="${escapeHtml(media.eventId)}">${lang === "zh" ? "了解" : "Explore"} ${escapeHtml(eventTitle)} <span aria-hidden="true">→</span></a>` : ""}`;
    previous.disabled = index <= 0;
    next.disabled = index >= eventSequence.length - 1;
    dialog.setAttribute("aria-label", title);
  };
  const step = (delta) => {
    const nextMedia = eventSequence[eventSequence.indexOf(currentMedia) + delta];
    if (nextMedia) showMedia(nextMedia);
  };
  const warmedPhotos = new Set();
  const warmPhoto = (media) => {
    if (media?.kind !== "photo" || warmedPhotos.has(media.src)) return;
    warmedPhotos.add(media.src);
    const image = new Image();
    image.src = media.src;
  };
  grid.addEventListener("pointerover", (event) => warmPhoto(gallery.find((item) => item.id === event.target.closest("[data-gallery-open]")?.dataset.galleryOpen)));
  grid.addEventListener("focusin", (event) => warmPhoto(gallery.find((item) => item.id === event.target.closest("[data-gallery-open]")?.dataset.galleryOpen)));
  grid.addEventListener("touchstart", (event) => warmPhoto(gallery.find((item) => item.id === event.target.closest("[data-gallery-open]")?.dataset.galleryOpen)), { passive: true });
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-open]");
    if (!button) return;
    const media = matches.find((item) => item.id === button.dataset.galleryOpen);
    if (!media) return;
    eventSequence = matches.filter((item) => item.eventId === media.eventId);
    showMedia(media);
    const index = eventSequence.indexOf(media);
    warmPhoto(eventSequence[index - 1]);
    warmPhoto(eventSequence[index + 1]);
    dialog.showModal();
  });
  previous.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
  });
  let touchStart = null;
  viewer.addEventListener("touchstart", (event) => { touchStart = [event.changedTouches[0].clientX, event.changedTouches[0].clientY]; }, { passive: true });
  viewer.addEventListener("touchend", (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart[0];
    const dy = event.changedTouches[0].clientY - touchStart[1];
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
    touchStart = null;
  }, { passive: true });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-gallery-close]") || event.target.closest("[data-event-open]")) dialog.close();
  });
  dialog.addEventListener("close", () => { viewer.replaceChildren(); currentMedia = null; eventSequence = []; });
})();
