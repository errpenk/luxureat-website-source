(function () {
  const section = document.querySelector("[data-latest-event]");
  const events = window.LUXUREAT_EVENT_DATA?.events;
  const event = events?.find((item) => item.status === "latest");
  if (!section || !event) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const copy = event[lang];
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[char]));
  const mapHref = `https://maps.apple.com/?q=${encodeURIComponent(event.mapQuery)}`;
  const newsHref = `news.html#event-${event.id}`;
  const icons = {
    location: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    calendar: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>',
    arrow: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
  };

  section.innerHTML = `
    <div class="lux-latest-event-inner">
      <figure class="lux-event-frame">
        <img alt="${escapeHtml(copy.posterAlt)}" src="${escapeHtml(event.poster)}">
      </figure>
      <div class="lux-event-copy">
        <h2>${escapeHtml(copy.title)}</h2>
        ${copy.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        <a class="lux-event-meta" href="${mapHref}" target="_blank" rel="noopener" title="${escapeHtml(copy.mapTitle)}">${icons.location}${escapeHtml(copy.location)}</a>
        <a class="lux-event-meta" href="${escapeHtml(event.calendar)}" title="${escapeHtml(copy.calendarTitle)}">${icons.calendar}${escapeHtml(copy.date)}</a>
        <p><strong>${escapeHtml(copy.tagline)}</strong></p>
        <p>${escapeHtml(copy.closing)}</p>
        <a class="lux-narrative-link lux-event-detail-link" href="${newsHref}">${escapeHtml(copy.detail)}${icons.arrow}</a>
      </div>
    </div>`;
})();
