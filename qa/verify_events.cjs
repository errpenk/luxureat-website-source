const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const context = {
  window: {},
  document: {
    currentScript: {
      src: "https://luxureat.cn/wp-content/themes/luxureat-static/assets/data/events.js",
    },
  },
  URL,
};
vm.runInNewContext(read("assets/data/events.js"), context);

const events = context.window.LUXUREAT_EVENT_DATA?.events;
const eventUtils = context.window.LUXUREAT_EVENT_UTILS;
const fhcEvent = events?.find((item) => item.id === "fhc-shanghai-2026");
const event = events?.find((item) => item.id === "cifie-changsha-2026");
const secondEvent = events?.find((item) => item.id === "marca-china-2026");
const sialEvent = events?.find((item) => item.id === "sial-guangzhou-2026");
const romaEvent = events?.find((item) => item.id === "roma-bar-show-2026");
assert(fhcEvent, "FHC Shanghai 2026 event data is missing");
assert(event, "Changsha 2026 event data is missing");
assert(eventUtils, "shared Beijing event utilities are missing");
assert(romaEvent?.displayWidth === 820 && romaEvent.displayHeight === 547, "Roma Bar Show event or cover dimensions are missing");
for (const item of events) {
  assert(!Object.hasOwn(item, "status"), `${item.id} still requires a manually maintained status`);
  assert(item.type === "exhibition", `${item.id} event type is missing`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(item.startDate), `${item.id} startDate is missing or invalid`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(item.endDate), `${item.id} endDate is missing or invalid`);
  assert(item.startDate <= item.endDate, `${item.id} date range is invalid`);
}
assert(fhcEvent.displayWidth === 520 && fhcEvent.displayHeight === 529, "FHC delivery image dimensions are missing");
for (const item of [event, secondEvent, sialEvent]) {
  assert(item.displayWidth === 520 && item.displayHeight === 528, `${item.id} delivery image dimensions are missing`);
}
assert(secondEvent?.zh?.articleTitle === "LuxurEat（露意膳）亮相广州国际自有品牌展。", "Marca China Chinese title is wrong");
assert(eventUtils.getBeijingToday(new Date("2026-09-11T15:59:59Z")) === "2026-09-11", "Beijing date changes too early");
assert(eventUtils.getBeijingToday(new Date("2026-09-11T16:00:00Z")) === "2026-09-12", "Beijing date does not change at midnight UTC+8");
const dateCases = [
  { id: "a", startDate: "2026-09-09", endDate: "2026-09-11" },
  { id: "b", startDate: "2026-11-10", endDate: "2026-11-12" },
  { id: "c", startDate: "2026-12-05", endDate: "2026-12-08" },
];
assert(eventUtils.getEventStatus(dateCases[0], "2026-09-08") === "upcoming", "event is not upcoming before its start date");
assert(eventUtils.getEventStatus(dateCases[0], "2026-09-11") === "current", "event must remain current through its end date");
assert(eventUtils.getEventStatus(dateCases[0], "2026-09-12") === "past", "event must become past the day after its end date");
assert(eventUtils.getHomeEvents(dateCases, "2026-09-12").map(({ id }) => id).join() === "b,c", "home events must exclude past events and sort by startDate ASC");
const groupedEvents = eventUtils.groupBrandEvents(dateCases, "2026-09-12");
assert(groupedEvents.active.map(({ id }) => id).join() === "c,b", "Brand News active events must sort by startDate DESC");
assert(groupedEvents.past.map(({ id }) => id).join() === "a", "Brand News must retain past events");
assert(event.mapQuery === "43QH+WWQ, Changsha County, Changsha, Hunan, China, 410133", "Changsha map address is wrong");
assert(event.mapHref?.includes("0xaa8729018b86a918"), "Changsha Google Maps link is wrong");
assert(
  event.image === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-poster.webp",
  "event image must resolve from the theme asset directory",
);
assert(
  event.cardImage === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-banner.webp",
  "event card image must resolve from the theme asset directory",
);
assert(event.previewImage === event.cardImage, "event detail preview must use the wide expo banner");
assert(
  event.poster === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-poster.webp",
  "event poster must resolve from the theme asset directory",
);
assert(
  secondEvent.poster === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026-poster.webp",
  "Marca China poster replacement is missing",
);
assert(event.zh?.articleTitle === "意大利风味，与长沙相遇。", "Chinese event title is wrong");
assert(event.zh?.paragraphs?.join("").includes("诚邀您莅临现场，与我们相见长沙。"), "Chinese event copy is incomplete");
assert(event.zh?.title && event.zh?.sections?.length >= 3, "Chinese event article is incomplete");
assert(event.en?.title && event.en?.sections?.length >= 3, "English event article is incomplete");
assert(fhcEvent.zh?.sections?.length === 4 && fhcEvent.en?.sections?.length === 4, "FHC bilingual article is incomplete");
assert(sialEvent.zh?.sections?.length === 6 && sialEvent.en?.sections?.length === 6, "SIAL bilingual article is incomplete");
assert(fhcEvent.previewImage?.endsWith("/fhc-shanghai-2026-banner.webp"), "FHC wide preview image is wrong");
assert(sialEvent.previewImage?.endsWith("/sial-guangzhou-2026-banner.webp"), "SIAL wide preview image is wrong");

const zhHome = read("zh/index.html");
const enHome = read("en/index.html");
const zhJournal = read("zh/about-us.html");
const enJournal = read("en/about-us.html");
const zhNews = read("zh/brand.html");
const enNews = read("en/brand.html");
const latestEvent = read("assets/js/events.js");
const journal = read("assets/js/journal.js");
const css = read("integration.css");

[zhNews, enNews].forEach((html) => {
  assert(html.includes("assets/data/events.js"), "a bilingual page does not load shared event data");
});
assert(zhHome.includes("data-lux-deferred-scripts") && enHome.includes("data-lux-deferred-scripts") && read("assets/js/core.js").includes('"../data/events.js"'), "bilingual homepages do not load trusted deferred event data");
assert(!zhJournal.includes("data-recent-events"), "Chinese journal still contains recent events");
assert(!enJournal.includes("data-recent-events"), "English journal still contains recent events");
assert(zhNews.includes("data-recent-events"), "Chinese brand-news event mount is missing");
assert(enNews.includes("data-recent-events"), "English brand-news event mount is missing");
assert(zhNews.includes('class="active" href="brand.html">品牌新闻'), "Chinese brand-news navigation is not active");
assert(enNews.includes('class="active" href="brand.html">Brand News'), "English brand-news navigation is not active");
assert(latestEvent.includes("LUXUREAT_EVENT_DATA"), "home latest event does not use shared event data");
assert(latestEvent.includes("LUXUREAT_EVENT_UTILS?.getHomeEvents"), "home events do not use shared Beijing filtering and start-date sorting");
assert(latestEvent.includes("section.hidden = true"), "home event section is not hidden when no active events remain");
assert(journal.includes("LUXUREAT_EVENT_UTILS.groupBrandEvents"), "Brand News events do not use shared Beijing grouping and sorting");
assert(!journal.includes("new Date(`${event.endDate}"), "Brand News still parses calendar dates as local timestamps");
assert(latestEvent.includes("setInterval(() => show(index + 1), 2500)"), "home event autoplay is not set to 2.5 seconds");
assert(latestEvent.includes('!matchMedia("(max-width: 767px)").matches'), "home event autoplay is not paused on mobile");
assert(journal.includes('(prefers-reduced-motion: reduce), (max-width: 767px)'), "About Us carousel autoplay is not paused on mobile");
assert(read("assets/js/core.js").includes('(prefers-reduced-motion: reduce), (max-width: 767px)'), "shared carousels are not paused on mobile");
assert(latestEvent.includes("data-event-carousel-step"), "home event carousel controls are missing");
assert(latestEvent.includes('width="${event.displayWidth}" height="${event.displayHeight}"'), "home event posters do not expose intrinsic dimensions");
assert(latestEvent.includes('<a href="${escapeHtml(newsHref)}"') && latestEvent.includes('lux-event-frame'), "home event posters do not link to the News Centre event detail");
assert((latestEvent.match(/data-event-open=/g) || []).length === 2, "home event poster and detail link must open the shared event reader");
assert(latestEvent.includes("#event-${encodeURIComponent(event.id)}"), "home latest event detail hash is missing");
assert(latestEvent.includes("const newsIndexHref = location.protocol") && latestEvent.includes("`${newsIndexHref}#event-${encodeURIComponent(event.id)}`"), "home latest event does not resolve the Brand News modal for static and WordPress routes");
assert(!latestEvent.includes("/events/${encodeURIComponent(event.id)}/"), "home latest event still links to the removed standalone event layout");
assert(latestEvent.includes('href="${newsIndexHref}#exhibition-map"'), "home exhibition map does not resolve Brand News for static and WordPress routes");
assert(!latestEvent.includes("about-us.html#event-${event.id}"), "home latest event still points to About Us");
assert(journal.includes("data-event-open"), "delegated event article opening is missing");
assert(journal.includes("#event-"), "event hash opening is missing");
assert(journal.includes('const eventHref = (id) => `${pageHref("brand")}#event-${encodeURIComponent(id)}`'), "event links do not fall back to the Brand News modal URL");
assert(romaEvent.zh.articleTitle === "LuxurEat亮相Roma Bar Show。" && romaEvent.en.articleTitle === "LuxurEat(露意膳) at Roma Bar Show", "Roma Bar Show past-event titles are incorrect");
assert(event.en.articleTitle === "Italian flavor meets Changsha", "Changsha English event title has an unwanted period");
assert(css.includes(".lux-narrative-link"), "shared narrative link styling is missing");
assert(css.includes(".lux-recent-events"), "recent-events styling is missing");
assert(css.includes(".lux-event-reader"), "event reader styling is missing");
assert(/\.lux-event-reader \{[\s\S]*?padding: 72px 0;/.test(css), "event reader divider is not below the close control");
assert(!/\.lux-event-reader \{[\s\S]{0,160}?padding-top: 24px;/.test(css), "mobile event reader pulls its divider into the close control");
assert(/@media \(max-width: 640px\) \{[\s\S]{0,240}?\.lux-past-events-grid \{[\s\S]{0,120}?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/.test(css), "mobile past events are not arranged in equal columns");
assert(/@media \(max-width: 640px\) \{[\s\S]*?\.lux-event-thumbnails \{[\s\S]*?justify-content: center;/.test(css), "mobile event thumbnails are not centred");
assert(read("scripts/build-luxureat-theme.mjs").includes("luxureat_static_url('${route}')") && read("assets/js/core.js").includes('pageItems.some(([href]) => href === pairedPage)'), "detail-page language links are not preserved");
assert(css.includes('.lux-lang > a.active') && css.includes("color: #005b55") && css.includes("filter: none"), "light-surface navigation does not keep black controls with only the current language green");

console.log("event verification passed");
