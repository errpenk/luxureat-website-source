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
const event = events?.find((item) => item.id === "cifie-changsha-2026");
const secondEvent = events?.find((item) => item.id === "marca-china-2026");
assert(event, "Changsha 2026 event data is missing");
assert(event.status === "latest", "Changsha 2026 must be the latest event");
assert(secondEvent?.status === "latest", "Marca China 2026 must also be a latest event");
assert(secondEvent?.zh?.articleTitle === "LuxurEat亮相广州国际自有品牌展。", "Marca China Chinese title is wrong");
assert(events.filter((item) => item.status === "latest").length === 2, "Both current events must render as latest");
assert(event.mapQuery === "43QH+WWQ, Changsha County, Changsha, Hunan, China, 410133", "Changsha map address is wrong");
assert(event.mapHref?.includes("0xaa8729018b86a918"), "Changsha Google Maps link is wrong");
assert(
  event.image === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026.jpg",
  "event image must resolve from the theme asset directory",
);
assert(
  event.cardImage === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-banner.webp",
  "event card image must resolve from the theme asset directory",
);
assert(event.previewImage === event.cardImage, "event detail preview must use the wide expo banner");
assert(
  event.poster === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026.jpg",
  "event poster must resolve from the theme asset directory",
);
assert(event.zh?.articleTitle === "意大利风味，与长沙相遇。", "Chinese event title is wrong");
assert(event.zh?.paragraphs?.join("").includes("诚邀您莅临现场，与我们相见长沙。"), "Chinese event copy is incomplete");
assert(event.zh?.title && event.zh?.sections?.length >= 3, "Chinese event article is incomplete");
assert(event.en?.title && event.en?.sections?.length >= 3, "English event article is incomplete");

const zhHome = read("zh/index.html");
const enHome = read("en/index.html");
const zhJournal = read("zh/journal.html");
const enJournal = read("en/journal.html");
const zhNews = read("zh/news.html");
const enNews = read("en/news.html");
const latestEvent = read("assets/js/events.js");
const journal = read("assets/js/journal.js");
const css = read("integration.css");

[zhHome, enHome, zhNews, enNews].forEach((html) => {
  assert(html.includes("assets/data/events.js"), "a bilingual page does not load shared event data");
});
assert(!zhJournal.includes("data-recent-events"), "Chinese journal still contains recent events");
assert(!enJournal.includes("data-recent-events"), "English journal still contains recent events");
assert(zhNews.includes("data-recent-events"), "Chinese brand-news event mount is missing");
assert(enNews.includes("data-recent-events"), "English brand-news event mount is missing");
assert(zhNews.includes('class="active" href="news.html">品牌新闻'), "Chinese brand-news navigation is not active");
assert(enNews.includes('class="active" href="news.html">Brand News'), "English brand-news navigation is not active");
assert(latestEvent.includes("LUXUREAT_EVENT_DATA"), "home latest event does not use shared event data");
assert(latestEvent.includes("setInterval(() => show(index + 1), 3000)"), "home event autoplay is not set to three seconds");
assert(latestEvent.includes("data-event-carousel-step"), "home event carousel controls are missing");
assert(latestEvent.includes("#event-${event.id}"), "home latest event detail hash is missing");
assert(latestEvent.includes("news.html#event-${event.id}"), "home latest event does not point to Brand News");
assert(!latestEvent.includes("journal.html#event-${event.id}"), "home latest event still points to About Us");
assert(journal.includes("data-event-open"), "delegated event article opening is missing");
assert(journal.includes("#event-"), "event hash opening is missing");
assert(css.includes(".lux-narrative-link"), "shared narrative link styling is missing");
assert(css.includes(".lux-recent-events"), "recent-events styling is missing");
assert(css.includes(".lux-event-reader"), "event reader styling is missing");

console.log("event verification passed");
