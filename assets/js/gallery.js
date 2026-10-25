(function () {
  const form = document.querySelector("[data-gallery-filters]");
  if (!form) return;

  const lang = document.documentElement.lang.startsWith("zh") ? "zh" : "en";
  const gallery = window.LUXUREAT_GALLERY_DATA || [];
  const events = new Map((window.LUXUREAT_EVENT_DATA?.events || []).map((event) => [event.id, event]));
  const grid = document.querySelector("[data-gallery-grid]");
  const count = document.querySelector("[data-gallery-count]");
  const empty = document.querySelector("[data-gallery-empty]");
  const more = document.querySelector("[data-gallery-more]");
  const dialog = document.querySelector("[data-gallery-dialog]");
  const viewer = document.querySelector("[data-gallery-viewer]");
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const eventFor = (media) => events.get(media.eventId);
  const eventName = (media) => eventFor(media)?.[lang]?.galleryTitle || eventFor(media)?.[lang]?.articleTitle || (lang === "zh" ? "企业影像" : "Company media");
  const placeName = (media) => media.place?.[lang] || eventFor(media)?.[lang]?.city || "";
  const eventHref = (media) => {
    if (!eventFor(media)) return "";
    const brand = location.protocol === "file:" || location.pathname.endsWith(".html") ? "brand.html?v=20261025-gallery3" : lang === "zh" ? "/brand/" : "/en/brand/";
    return `${brand}#event-${encodeURIComponent(media.eventId)}`;
  };
  const dateLabel = (date) => new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
  const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, lang === "zh" ? "zh-CN" : "en"));

  for (const place of unique(gallery.map(placeName))) form.elements.place.add(new Option(place, place));
  for (const id of unique(gallery.map((media) => media.eventId))) {
    const event = events.get(id);
    if (event) form.elements.event.add(new Option(event[lang].galleryTitle || event[lang].articleTitle, id));
  }

  const hashEvent = decodeURIComponent(location.hash).replace(/^#event-/, "");
  if (events.has(hashEvent) && gallery.some((media) => media.eventId === hashEvent)) form.elements.event.value = hashEvent;

  const ordered = [...gallery].sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
  let visible = 12;
  let matches = [];

  const card = (media) => {
    const title = media[lang].title;
    const type = media.kind === "video" ? lang === "zh" ? "视频" : "Video" : lang === "zh" ? "图片" : "Photo";
    return `<article class="lux-gallery-card">
      <button type="button" class="lux-gallery-card-media" data-gallery-open="${escapeHtml(media.id)}" aria-label="${escapeHtml(`${lang === "zh" ? "查看" : "View"} ${title}`)}">
        <img loading="lazy" decoding="async" width="${media.width}" height="${media.height}" src="${escapeHtml(media.poster || media.src)}" alt="">
        <span class="lux-gallery-card-type">${escapeHtml(type)}</span>${media.kind === "video" ? '<span class="lux-gallery-play" aria-hidden="true">▶</span>' : ""}
      </button>
      <div class="lux-gallery-card-copy"><small>${escapeHtml(dateLabel(media.date))} · ${escapeHtml(type)}</small><h4>${escapeHtml(title)}</h4></div>
    </article>`;
  };

  const group = (items) => {
    const media = items[0];
    const href = eventHref(media);
    const name = eventName(media);
    return `<section class="lux-gallery-event" aria-label="${escapeHtml(name)}"><div class="lux-gallery-event-heading"><div><span class="lux-gallery-kicker">${lang === "zh" ? "展会现场" : "EXHIBITION"}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(placeName(media))} · ${escapeHtml(items.length)} ${lang === "zh" ? "条影像" : items.length === 1 ? "media item" : "media items"}</p></div>${href ? `<a href="${escapeHtml(href)}">${lang === "zh" ? "展会详情" : "Event details"} <span aria-hidden="true">→</span></a>` : ""}</div><div class="lux-gallery-grid">${items.map(card).join("")}</div></section>`;
  };

  const render = () => {
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
    const groups = new Map();
    for (const media of matches.slice(0, visible)) {
      const key = media.eventId || media.id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(media);
    }
    grid.innerHTML = [...groups.values()].map(group).join("");
    count.textContent = lang === "zh" ? `共 ${matches.length} 条素材` : `${matches.length} media ${matches.length === 1 ? "item" : "items"}`;
    empty.hidden = matches.length !== 0;
    more.hidden = visible >= matches.length;
  };

  form.addEventListener("input", () => { visible = 12; render(); });
  form.addEventListener("change", () => {
    visible = 12;
    const eventId = form.elements.event.value;
    history.replaceState(null, "", `${location.pathname}${eventId ? `#event-${encodeURIComponent(eventId)}` : ""}`);
    render();
  });
  form.addEventListener("reset", () => {
    visible = 12;
    history.replaceState(null, "", location.pathname);
    queueMicrotask(render);
  });
  more.addEventListener("click", () => { visible += 12; render(); });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-gallery-open]");
    if (!button) return;
    const media = gallery.find((item) => item.id === button.dataset.galleryOpen);
    if (!media) return;
    const title = media[lang].title;
    const href = eventHref(media);
    const mediaHtml = media.kind === "video"
      ? `<video controls playsinline autoplay preload="metadata" width="${media.width}" height="${media.height}" poster="${escapeHtml(media.poster)}"><source src="${escapeHtml(media.src)}" type="video/mp4"></video>`
      : `<img src="${escapeHtml(media.src)}" width="${media.width}" height="${media.height}" alt="${escapeHtml(title)}">`;
    viewer.innerHTML = `<div class="lux-gallery-viewer-media">${mediaHtml}</div><div class="lux-gallery-viewer-copy"><small>${escapeHtml(dateLabel(media.date))} · ${escapeHtml(placeName(media))}</small><h2>${escapeHtml(title)}</h2>${href ? `<a href="${escapeHtml(href)}">${lang === "zh" ? "查看" : "View"} ${escapeHtml(eventName(media))} →</a>` : ""}</div>`;
    dialog.showModal();
    viewer.querySelector("video")?.play().catch(() => {});
  });
  dialog.querySelector("[data-gallery-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { viewer.replaceChildren(); });
  render();
})();
