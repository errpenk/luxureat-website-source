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
    if (cms.poster) item.poster = cms.poster;
  }
  const events = new Map((window.LUXUREAT_EVENT_DATA?.events || []).map((event) => [event.id, event]));
  const grid = document.querySelector("[data-gallery-grid]");
  const empty = document.querySelector("[data-gallery-empty]");
  const pageNav = document.querySelector("[data-gallery-pagination]");
  const dialog = document.querySelector("[data-gallery-dialog]");
  const viewer = document.querySelector("[data-gallery-viewer]");
  const caption = document.querySelector("[data-gallery-caption]");
  const previous = dialog.querySelector("[data-gallery-prev]");
  const next = dialog.querySelector("[data-gallery-next]");
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const eventFor = (media) => events.get(media.eventId);
  const eventName = (media) => eventFor(media)?.[lang]?.galleryTitle || eventFor(media)?.[lang]?.articleTitle || (lang === "zh" ? "企业影像" : "Company media");
  const placeName = (media) => media.place?.[lang] || eventFor(media)?.[lang]?.city || "";
  const eventHref = (media) => {
    if (!eventFor(media)) return "";
    const brand = location.protocol === "file:" || location.pathname.endsWith(".html") ? "brand.html?v=20261025-gallery15" : lang === "zh" ? "/brand/" : "/en/brand/";
    return `${brand}#event-${encodeURIComponent(media.eventId)}`;
  };
  const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, lang === "zh" ? "zh-CN" : "en"));

  for (const place of unique(gallery.map(placeName))) form.elements.place.add(new Option(place, place));
  for (const id of unique(gallery.map((media) => media.eventId))) {
    const event = events.get(id);
    if (event) form.elements.event.add(new Option(event[lang].galleryTitle || event[lang].articleTitle, id));
  }

  const hashEvent = decodeURIComponent(location.hash).replace(/^#event-/, "");
  if (events.has(hashEvent) && gallery.some((media) => media.eventId === hashEvent)) form.elements.event.value = hashEvent;

  const ordered = [...gallery].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
  let matches = [];
  let eventCounts = new Map();

  const card = (media) => {
    const title = media[lang].title;
    return `<article class="lux-gallery-card">
      <button type="button" class="lux-gallery-card-media" data-gallery-open="${escapeHtml(media.id)}" aria-label="${escapeHtml(`${lang === "zh" ? "查看" : "View"} ${title}`)}">
        <img loading="lazy" decoding="async" width="${media.width}" height="${media.height}" src="${escapeHtml(media.poster || media.src)}" alt="">
        ${media.kind === "video" ? '<span class="lux-gallery-play" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M8 5 19 12 8 19Z"/></svg></span>' : ""}
      </button>
    </article>`;
  };

  const group = (items) => {
    const media = items[0];
    const href = eventHref(media);
    const name = eventName(media);
    const count = eventCounts.get(media.eventId || media.id) || items.length;
    return `<section class="lux-gallery-event" aria-label="${escapeHtml(name)}"><div class="lux-gallery-event-heading"><div><h2>${escapeHtml(name)}</h2><p>${escapeHtml(placeName(media))} · ${escapeHtml(count)} ${lang === "zh" ? "条记录" : count === 1 ? "record" : "records"}</p></div>${href ? `<a href="${escapeHtml(href)}" data-event-open="${escapeHtml(media.eventId)}">${lang === "zh" ? "展会详情" : "Event details"} <span aria-hidden="true">→</span></a>` : ""}</div><div class="lux-gallery-grid">${items.map(card).join("")}</div></section>`;
  };

  const filterMatches = () => {
    const search = form.elements.search.value.trim().toLocaleLowerCase();
    const start = form.elements.start.value;
    const end = form.elements.end.value;
    const place = form.elements.place.value;
    const eventId = form.elements.event.value;
    const kind = form.elements.kind.value;
    matches = ordered.filter((media) => {
      const names = `${media.zh.title} ${media.en.title} ${eventName(media)} ${placeName(media)}`.toLocaleLowerCase();
      return (!search || names.includes(search))
        && (!start || media.date >= start)
        && (!end || media.date <= end)
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
  form.addEventListener("input", () => { filterMatches(); pagination.reset(); });
  form.addEventListener("change", () => {
    const eventId = form.elements.event.value;
    history.replaceState(null, "", `${location.pathname}${eventId ? `#event-${encodeURIComponent(eventId)}` : ""}`);
    filterMatches();
    pagination.reset();
  });
  form.addEventListener("reset", () => {
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
      ? `<div class="lux-gallery-video"><video playsinline preload="metadata" width="${media.width}" height="${media.height}" poster="${escapeHtml(media.poster)}"><source src="${escapeHtml(media.src)}" type="video/mp4"></video><button type="button" class="lux-gallery-video-play" data-gallery-play aria-label="${lang === "zh" ? "播放视频" : "Play video"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5 19 12 8 19Z"/></svg></button></div>`
      : `<img src="${escapeHtml(media.src)}" width="${media.width}" height="${media.height}" alt="${escapeHtml(title)}">`;
    viewer.innerHTML = mediaHtml;
    const event = eventFor(media);
    const eventCopy = event?.[lang];
    const index = eventSequence.indexOf(media);
    const href = eventHref(media);
    const eventTitle = (eventCopy?.galleryTitle || eventCopy?.articleTitle || "").split("·")[0].trim();
    caption.innerHTML = `<div class="lux-gallery-caption-top"><span>${escapeHtml(title)}</span><span>${index + 1} / ${eventSequence.length}</span></div><p>${escapeHtml(placeName(media))}${eventCopy?.date ? ` · ${escapeHtml(eventCopy.date)}` : ""}</p>${href ? `<a href="${escapeHtml(href)}" data-event-open="${escapeHtml(media.eventId)}">${lang === "zh" ? "了解" : "Explore"} ${escapeHtml(eventTitle)} <span aria-hidden="true">→</span></a>` : ""}`;
    previous.disabled = index <= 0;
    next.disabled = index >= eventSequence.length - 1;
    dialog.setAttribute("aria-label", title);
    const video = viewer.querySelector("video");
    if (video) {
      const play = viewer.querySelector("[data-gallery-play]");
      play.addEventListener("click", () => { video.controls = true; video.play().catch(() => {}); });
      video.addEventListener("play", () => { play.hidden = true; });
      video.addEventListener("pause", () => { play.hidden = false; });
      video.addEventListener("ended", () => { play.hidden = false; });
    }
  };
  const step = (delta) => {
    const nextMedia = eventSequence[eventSequence.indexOf(currentMedia) + delta];
    if (nextMedia) showMedia(nextMedia);
  };
  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-open]");
    if (!button) return;
    const media = matches.find((item) => item.id === button.dataset.galleryOpen);
    if (!media) return;
    eventSequence = matches.filter((item) => item.eventId === media.eventId);
    showMedia(media);
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
