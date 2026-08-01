(function () {
  const assetBase = new URL("../", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;
  const section = document.querySelector("[data-latest-event]");
  const events = (window.LUXUREAT_EVENT_DATA?.events?.filter((item) => item.status === "latest") || [])
    .sort((a, b) => a.endDate.localeCompare(b.endDate));
  if (!section || !events.length) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const newsIndexHref = location.protocol === "file:" || location.pathname.endsWith(".html")
    ? "news.html"
    : lang === "zh" ? "/news/" : "/en/news/";
  const carouselLabels = lang === "zh"
    ? { carousel: "最新活动轮播", previous: "上一个活动", next: "下一个活动", select: "切换至", meet: "与我们见面", meetCopy: "查看 LuxurEat（露意膳）在中国即将参与及已经结束的展会。", map: "查看展会地图" }
    : { carousel: "Latest events carousel", previous: "Previous event", next: "Next event", select: "Show", meet: "Meet Us", meetCopy: "Explore upcoming and completed LuxurEat (露意膳) exhibitions across China.", map: "View exhibition map" };
  const atlasLabels = lang === "zh"
    ? { title: "各地区展会数量与月份", count: "场展览" }
    : { title: "Exhibitions by region and month", count: "exhibitions" };
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  }[char]));
  const icons = {
    location: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    calendar: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>',
    arrow: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>',
    previous: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>',
    next: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>',
  };
  const monthFormatter = new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en", { month: lang === "zh" ? "numeric" : "short" });
  const regionStats = [...events.reduce((stats, event) => {
    const city = event[lang].city;
    const current = stats.get(city) || { count: 0, months: new Set() };
    current.count += 1;
    current.months.add(new Date(`${event.endDate}T00:00:00`).getMonth());
    stats.set(city, current);
    return stats;
  }, new Map())]
    .map(([city, data]) => [city, data.count, [...data.months]
      .sort((a, b) => a - b)
      .map((month) => monthFormatter.format(new Date(2026, month, 1)))
      .map((month) => lang === "zh" ? month : month.toUpperCase())
      .join(" · ")])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const renderSlide = (event, index) => {
    const copy = event[lang];
    const mapHref = event.mapHref || `https://maps.apple.com/?q=${encodeURIComponent(event.mapQuery)}`;
    const newsHref = `${newsIndexHref}#event-${event.id}`;
    return `<article class="lux-latest-event-slide" role="group" aria-roledescription="slide" aria-label="${index + 1} / ${events.length}">
      <div class="lux-latest-event-inner">
        <figure class="lux-event-frame">
          <img loading="lazy" decoding="async" alt="${escapeHtml(copy.posterAlt)}" src="${escapeHtml(event.poster)}">
        </figure>
        <div class="lux-event-copy">
          <h2>${escapeHtml(copy.title)}</h2>
          ${copy.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          <a class="lux-event-meta" href="${escapeHtml(mapHref)}" target="_blank" rel="noopener" title="${escapeHtml(copy.mapTitle)}">${icons.location}${escapeHtml(copy.location)}</a>
          <a class="lux-event-meta" href="${escapeHtml(event.calendar)}" title="${escapeHtml(copy.calendarTitle)}">${icons.calendar}${escapeHtml(copy.date)}</a>
          <p><strong>${escapeHtml(copy.tagline)}</strong></p>
          <p>${escapeHtml(copy.closing)}</p>
          <a class="lux-narrative-link lux-event-detail-link" href="${escapeHtml(newsHref)}">${escapeHtml(copy.detail)}${icons.arrow}</a>
        </div>
      </div>
    </article>`;
  };

  section.innerHTML = `
    <div class="lux-latest-event-carousel" role="region" aria-roledescription="carousel" aria-label="${escapeHtml(carouselLabels.carousel)}">
      <div class="lux-latest-event-viewport">
        <div class="lux-latest-event-track">${events.map(renderSlide).join("")}</div>
        ${events.length > 1 ? `<div class="lux-event-carousel-controls">
          <button type="button" data-event-carousel-step="-1" aria-label="${escapeHtml(carouselLabels.previous)}">${icons.previous}</button>
          <span aria-live="polite"><b>1</b> / ${events.length}</span>
          <button type="button" data-event-carousel-step="1" aria-label="${escapeHtml(carouselLabels.next)}">${icons.next}</button>
        </div>` : ""}
      </div>
      ${events.length > 1 ? `<div class="lux-event-thumbnails" role="tablist" aria-label="${escapeHtml(carouselLabels.carousel)}">
        ${events.map((event, index) => `<button type="button" role="tab" data-event-carousel-index="${index}" aria-selected="${index === 0}" aria-label="${escapeHtml(`${carouselLabels.select} ${event[lang].title}`)}"><img loading="lazy" fetchpriority="low" decoding="async" src="${escapeHtml(event.poster)}" alt=""></button>`).join("")}
      </div>` : ""}
    </div>
    <div class="lux-meet-map">
      <video class="lux-meet-map-video" data-lux-autoplay muted loop playsinline preload="none" disablepictureinpicture disableremoteplayback poster="${escapeHtml(asset("media/events/exhibition-atlas-globe-poster.webp"))}" aria-hidden="true" tabindex="-1"><source src="${escapeHtml(asset("media/events/exhibition-atlas-globe.mp4"))}" type="video/mp4"></video>
      <div class="lux-meet-map-card">
        <span>EXHIBITION ATLAS</span>
        <h2>${escapeHtml(carouselLabels.meet)}</h2>
        <p>${escapeHtml(carouselLabels.meetCopy)}</p>
        <a class="lux-narrative-link" href="${newsIndexHref}#exhibition-map">${escapeHtml(carouselLabels.map)}${icons.arrow}</a>
      </div>
      <aside class="lux-meet-map-summary" aria-label="${escapeHtml(atlasLabels.title)}">
        <dl>${regionStats.map(([city, count, months]) => `<div><dt><span>${escapeHtml(months)}</span>${escapeHtml(city)}</dt><dd><b>${count}</b> ${escapeHtml(atlasLabels.count)}</dd></div>`).join("")}</dl>
      </aside>
    </div>`;

  if (events.length < 2) return;
  const carousel = section.querySelector(".lux-latest-event-carousel");
  const track = carousel.querySelector(".lux-latest-event-track");
  const slides = [...track.children];
  const counter = carousel.querySelector(".lux-event-carousel-controls b");
  const thumbnails = [...carousel.querySelectorAll("[data-event-carousel-index]")];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let timer;
  const show = (next) => {
    index = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => {
      slide.inert = slideIndex !== index;
      slide.setAttribute("aria-hidden", slideIndex === index ? "false" : "true");
    });
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const active = thumbnailIndex === index;
      thumbnail.classList.toggle("is-active", active);
      thumbnail.setAttribute("aria-selected", String(active));
      thumbnail.tabIndex = active ? 0 : -1;
    });
    counter.textContent = index + 1;
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    if (!reduceMotion && !document.hidden) timer = setInterval(() => show(index + 1), 2500);
  };
  carousel.addEventListener("click", (event) => {
    const thumbnail = event.target.closest("[data-event-carousel-index]");
    if (thumbnail) {
      show(Number(thumbnail.dataset.eventCarouselIndex));
      start();
      return;
    }
    const button = event.target.closest("[data-event-carousel-step]");
    if (!button) return;
    show(index + Number(button.dataset.eventCarouselStep));
    start();
  });
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) start();
  });
  document.addEventListener("visibilitychange", start);
  show(0);
  start();
})();
