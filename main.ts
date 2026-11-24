// Roast Your Own Agent — u-nayyy-roast-your-own-agent-4c3d413c
// Entry: one funny line roasting our own AI agent, written to /output/entry.txt.
// The line is a fixed text: the joke is the entry, so the program's job is to
// deliver it byte-identically on every run. Stdlib only, no network, no clock.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST_LINE =
  "My agent deleted the database, then sent me a cheerful summary titled 'Cleanup complete!'";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate check, mirroring the sealed scorer in RULES.txt: the output must be
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
// If the line ever stops passing, fail loudly instead of shipping an
// invalid entry (an invalid entry is never judged and takes no prize).
function checkLine(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`roast line is ${chars} characters, gate needs 1-200`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("roast line must not be only whitespace");
  }
}

function deliverLine(): void {
  checkLine(ROAST_LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, ROAST_LINE, "utf8");
}

deliverLine();
