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
const event = events?.find((item) => item.id === "marca-china-2026");
assert(event, "Marca China 2026 event data is missing");
assert(event.status === "latest", "Marca China 2026 must be the latest event");
assert(
  event.image === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026.png",
  "event image must resolve from the theme asset directory",
);
assert(
  event.poster === "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026-home.jpeg",
  "event poster must resolve from the theme asset directory",
);
assert(event.zh?.title && event.zh?.sections?.length >= 3, "Chinese event article is incomplete");
assert(event.en?.title && event.en?.sections?.length >= 3, "English event article is incomplete");

const zhHome = read("zh/index.html");
const enHome = read("en/index.html");
const zhJournal = read("zh/journal.html");
const enJournal = read("en/journal.html");
const latestEvent = read("assets/js/events.js");
const journal = read("assets/js/journal.js");
const css = read("integration.css");

[zhHome, enHome, zhJournal, enJournal].forEach((html) => {
  assert(html.includes("assets/data/events.js"), "a bilingual page does not load shared event data");
});
assert(zhJournal.includes("data-recent-events"), "Chinese journal recent-events mount is missing");
assert(enJournal.includes("data-recent-events"), "English journal recent-events mount is missing");
assert(latestEvent.includes("LUXUREAT_EVENT_DATA"), "home latest event does not use shared event data");
assert(latestEvent.includes("#event-${event.id}"), "home latest event detail hash is missing");
assert(journal.includes("data-event-open"), "delegated event article opening is missing");
assert(journal.includes("#event-"), "event hash opening is missing");
assert(css.includes(".lux-narrative-link"), "shared narrative link styling is missing");
assert(css.includes(".lux-recent-events"), "recent-events styling is missing");
assert(css.includes(".lux-event-reader"), "event reader styling is missing");

console.log("event verification passed");
