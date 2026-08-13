import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { transform } from "lightningcss";
import { PurgeCSS } from "purgecss";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "assets/css/integration-home.min.css");
const check = process.argv.includes("--check");
const content = [
  "zh/index.html", "en/index.html",
  "assets/js/core.js", "assets/js/engagement.js", "assets/js/products.js",
  "assets/js/events.js", "assets/js/journal.js",
  "assets/data/products.js", "assets/data/events.js", "assets/data/journal.js",
].map((file) => path.join(root, file));

const [{ css }] = await new PurgeCSS().purge({
  content,
  css: [{ raw: fs.readFileSync(path.join(root, "integration.css"), "utf8"), extension: "css" }],
});
const built = Buffer.from(transform({
  filename: "integration-home.min.css",
  code: Buffer.from(css),
  minify: true,
}).code.toString().replace(/url\((["']?)assets\//g, "url($1../"));

if (check) {
  if (!fs.existsSync(output) || !fs.readFileSync(output).equals(built)) {
    throw new Error("Homepage CSS is stale. Run npm run css:build.");
  }
  console.log("Homepage CSS is current.");
} else {
  fs.writeFileSync(output, built);
  console.log(`Built ${path.relative(root, output)} (${built.length} bytes).`);
}
