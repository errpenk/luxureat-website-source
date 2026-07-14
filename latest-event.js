(function () {
  const assetBase = new URL(".", document.currentScript?.src || location.href);
  const asset = (path) => new URL(path, assetBase).href;
  const mapQuery = "广州市海珠区琶洲街道新港东路1000号保利世界贸易中心";
  const mapHref = `https://maps.apple.com/?q=${encodeURIComponent(mapQuery)}`;
  const poster = asset("assets/images/marca-china-2026.jpeg");
  const calendarHref = asset("assets/marca-china-2026.ics");
  const icons = {
    location: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>',
    calendar: '<svg class="lux-lucide" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>',
  };
  const events = {
    zh: {
      posterAlt: "Marca China 2026 Private Label Fair Guangzhou event poster",
      title: "意大利奢味，广州相见。",
      paragraphs: [
        '2026年9月8日至9日，<strong class="lux-event-brand">LuxurEat</strong> 将携旗下 <strong class="lux-event-brand">TrufflEat</strong>、<strong class="lux-event-brand">CaviarEat</strong>、<strong class="lux-event-brand">TinCaviar</strong> 等品牌亮相 <strong>MARCA CHINA 广州国际自有品牌展</strong>。',
        "以纯正意大利风味与全球化供应能力，为买家提供更多可能。",
      ],
      location: "广州保利世贸展览馆",
      date: "2026年9月8–9日",
      mapTitle: "打开地图导航",
      calendarTitle: "添加到日历",
      tagline: "The Luxury of Taste, Made in Italy.",
      closing: "期待与您在广州见面！",
    },
    en: {
      posterAlt: "Marca China 2026 Private Label Fair Guangzhou event poster",
      title: "Italian luxury taste meets Guangzhou.",
      paragraphs: [
        'On September 8-9, 2026, <strong class="lux-event-brand">LuxurEat</strong> will present <strong class="lux-event-brand">TrufflEat</strong>, <strong class="lux-event-brand">CaviarEat</strong>, <strong class="lux-event-brand">TinCaviar</strong>, and more at <strong>MARCA CHINA Private Label Fair</strong>.',
        "With authentic Italian flavor and global supply capability, we bring buyers more possibilities.",
      ],
      location: "Poly World Trade Expo Centre, Guangzhou",
      date: "September 8-9, 2026",
      mapTitle: "Open map directions",
      calendarTitle: "Add to calendar",
      tagline: "The Luxury of Taste, Made in Italy.",
      closing: "We look forward to meeting you in Guangzhou.",
    },
  };

  const section = document.querySelector("[data-latest-event]");
  if (!section) return;

  const lang = document.documentElement.lang?.startsWith("zh") ? "zh" : "en";
  const event = events[lang];
  section.innerHTML = `
    <div class="lux-latest-event-inner">
      <figure class="lux-event-frame">
        <img alt="${event.posterAlt}" src="${poster}">
      </figure>
      <div class="lux-event-copy">
        <h2>${event.title}</h2>
        ${event.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        <a class="lux-event-meta" href="${mapHref}" target="_blank" rel="noopener" title="${event.mapTitle}">${icons.location}${event.location}</a>
        <a class="lux-event-meta" href="${calendarHref}" title="${event.calendarTitle}">${icons.calendar}${event.date}</a>
        <p><strong>${event.tagline}</strong></p>
        <p>${event.closing}</p>
      </div>
    </div>`;
})();
