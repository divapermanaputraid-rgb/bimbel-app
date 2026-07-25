import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("public/buku");
const TARGET =
  'content="width=device-width, initial-scale=1.0, viewport-fit=cover"';
const PATTERNS = [
  /content="width=device-width,\s*initial-scale=1\.0"/g,
  /content="width=device-width,\s*initial-scale=1"/g,
  /content="width=device-width, initial-scale=1.0, viewport-fit=cover"/g,
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let changed = 0;
let already = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes("viewport-fit=cover")) {
    already += 1;
    continue;
  }
  let next = html;
  let did = false;
  for (const re of PATTERNS.slice(0, 2)) {
    if (re.test(next)) {
      next = next.replace(re, TARGET);
      did = true;
      break;
    }
  }
  // reset lastIndex side effects
  PATTERNS.forEach((re) => {
    re.lastIndex = 0;
  });
  if (!did) {
    skipped += 1;
    console.warn("skip (no matching viewport):", file);
    continue;
  }
  fs.writeFileSync(file, next);
  changed += 1;
}

console.log(
  JSON.stringify({ total: files.length, changed, already, skipped }, null, 2)
);
if (skipped > 0) process.exitCode = 1;
