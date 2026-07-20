const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("assets/data/events.js", "utf8");
const context = {
  window: {},
  document: {
    currentScript: {
      src: "https://luxureat.cn/wp-content/themes/luxureat-static/assets/data/events.js",
    },
  },
  URL,
};

vm.runInNewContext(source, context);

const event = context.window.LUXUREAT_EVENT_DATA.events[0];

assert.equal(
  event.poster,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026.jpg",
);
assert.equal(
  event.image,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026.jpg",
);
assert.equal(
  event.cardImage,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-banner.webp",
);
assert.equal(event.previewImage, event.cardImage);

console.log("event asset URL verification passed");
