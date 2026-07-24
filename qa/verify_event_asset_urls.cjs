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

const events = context.window.LUXUREAT_EVENT_DATA.events;
const event = events.find((item) => item.id === "cifie-changsha-2026");
const marca = events.find((item) => item.id === "marca-china-2026");
const fhc = events.find((item) => item.id === "fhc-shanghai-2026");
const sial = events.find((item) => item.id === "sial-guangzhou-2026");

assert.equal(
  event.poster,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-poster.webp",
);
assert.equal(
  event.image,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-poster.webp",
);
assert.equal(
  event.cardImage,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/cifie-changsha-2026-banner.webp",
);
assert.equal(event.previewImage, event.cardImage);
assert.equal(
  marca.poster,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026-poster.webp",
);
assert.equal(fhc.previewImage, fhc.cardImage);
assert.equal(sial.previewImage, sial.cardImage);

console.log("event asset URL verification passed");
