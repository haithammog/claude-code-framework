#!/usr/bin/env node
/**
 * inject-architecture.js
 *
 * SessionStart hook: injects ARCHITECTURE.md into Claude's context
 * at the start of every session.
 *
 * Outputs a JSON object with an `additionalContext` field containing
 * the architecture document content (capped at 160 lines).
 *
 * Place at: .claude/inject-architecture.js
 */

const fs = require("fs");
const path = require("path");

const PROJECT_DIR = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const ARCH_FILE = path.join(PROJECT_DIR, "ARCHITECTURE.md");
const LINE_CAP = 200;

try {
  if (!fs.existsSync(ARCH_FILE)) {
    process.stdout.write("{}\n");
    process.exit(0);
  }

  const content = fs.readFileSync(ARCH_FILE, "utf8");
  const lines = content.split("\n").slice(0, LINE_CAP).join("\n");

  const output = JSON.stringify({ additionalContext: lines });
  process.stdout.write(output + "\n");
  process.exit(0);
} catch (_err) {
  process.stdout.write("{}\n");
  process.exit(0);
}
