import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const root = process.cwd();
const mediaRoot = path.join(root, "assets/media");
const manifestFile = path.join(root, "assets/data/image-variants.js");
const checkOnly = process.argv.includes("--check");
const mobileWidth = 720;
const sourceThreshold = 100 * 1024;
const outputLimit = 120 * 1024;
const raster = /\.(?:avif|jpe?g|png|webp)$/i;

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : [file];
});
const relative = (file) => path.relative(path.join(root, "assets"), file).split(path.sep).join("/");
const variantFor = (file, suffix) => file.replace(/\.(?:avif|jpe?g|png|webp)$/i, `${suffix}.webp`);

const files = walk(mediaRoot).filter((file) => raster.test(file));
const originals = files.filter((file) => !/(?:-mobile|-720)\.webp$/i.test(file));
const variants = new Map();
const missing = [];
let generated = 0;

for (const source of originals) {
  const info = await sharp(source).metadata();
  const handmade = variantFor(source, "-mobile");
  let target = fs.existsSync(handmade) ? handmade : null;
  if (!target && (info.width || 0) > mobileWidth && fs.statSync(source).size > sourceThreshold) {
    target = variantFor(source, "-720");
    const stale = !fs.existsSync(target) || fs.statSync(target).mtimeMs < fs.statSync(source).mtimeMs;
    if (stale && !checkOnly) {
      const temporary = `${target}.tmp-${process.pid}`;
      for (const quality of [78, 72, 66, 60]) {
        if (fs.existsSync(temporary)) fs.rmSync(temporary);
        await sharp(source).rotate().resize({ width: mobileWidth, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(temporary);
        if (fs.statSync(temporary).size <= outputLimit) break;
      }
      fs.renameSync(temporary, target);
      generated += 1;
    } else if (stale) {
      missing.push(relative(target));
    }
  }
  if (target && fs.existsSync(target)) variants.set(relative(source), relative(target));
}

const manifest = `window.LUXUREAT_IMAGE_VARIANTS = ${JSON.stringify(Object.fromEntries([...variants].sort()), null, 2)};\n`;
if (checkOnly) {
  if (!fs.existsSync(manifestFile) || fs.readFileSync(manifestFile, "utf8") !== manifest) missing.push(relative(manifestFile));
  if (missing.length) {
    console.error(`Responsive images need generation:\n${missing.map((file) => `- ${file}`).join("\n")}`);
    console.error("Run: npm run images:optimize");
    process.exitCode = 1;
  } else {
    console.log(`Responsive image check passed (${variants.size} mobile mappings).`);
  }
} else {
  fs.writeFileSync(manifestFile, manifest);
  console.log(`Generated ${generated} responsive image(s); ${variants.size} mobile mappings are ready.`);
}
