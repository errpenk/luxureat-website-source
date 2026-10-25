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

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-open]");
    if (!button) return;
    const media = gallery.find((item) => item.id === button.dataset.galleryOpen);
    if (!media) return;
    const title = media[lang].title;
    const mediaHtml = media.kind === "video"
      ? `<video controls playsinline autoplay preload="metadata" width="${media.width}" height="${media.height}" style="width:${media.width}px;aspect-ratio:${media.width}/${media.height}" poster="${escapeHtml(media.poster)}"><source src="${escapeHtml(media.src)}" type="video/mp4"></video>`
      : `<img src="${escapeHtml(media.src)}" width="${media.width}" height="${media.height}" alt="${escapeHtml(title)}">`;
    viewer.innerHTML = `<div class="lux-gallery-viewer-media">${mediaHtml}</div>`;
    dialog.setAttribute("aria-label", title);
    dialog.showModal();
    viewer.querySelector("video")?.play().catch(() => {});
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-gallery-close]")) dialog.close();
  });
  dialog.addEventListener("close", () => { viewer.replaceChildren(); });
})();
