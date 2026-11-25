import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My calendar blocked focus time, so my manager booked a meeting called 'quick sync about focus time'.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  fail("MAKEFUN_OUTPUT_DIR is not set");
}

if (LINE.length < 1 || LINE.length > 199) {
  fail(`entry must be 1-199 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
if (readFileSync(target, "utf8") !== LINE) {
  fail("read-back check failed: entry.txt does not match the line");
}
console.log(`wrote entry.txt (${LINE.length} characters)`);
