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
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026-home.jpeg",
);
assert.equal(
  event.image,
  "https://luxureat.cn/wp-content/themes/luxureat-static/assets/media/events/marca-china-2026.png",
);

console.log("event asset URL verification passed");
