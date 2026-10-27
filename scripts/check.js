// Validates the theme: JSON parses, every color is a hex value, the palette's
// six accents are the only accents used, and the package manifest points at it.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const failures = [];
const check = (ok, message) => { if (!ok) failures.push(message); };

const palette = {
  base: "#141518", surface: "#18191D", low: "#1B1C21", overlay: "#1F2026", med: "#2A2C34", high: "#383A43",
  text: "#9DA4B2", iron: "#8F97A6", subtle: "#7F8797", muted: "#5E6577", faint: "#454A58",
  rose: "#B98590", gold: "#BFA077", foam: "#7AA3B5", teal: "#7BA09F", iris: "#9A8EB9", love: "#BA6B70",
};
const known = new Set([...Object.values(palette), "#000000", "#8FB3C3", "#383843"].map((c) => c.toUpperCase()));

const isHex = (value) => /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(value);
const basePart = (value) => value.slice(0, 7).toUpperCase();

for (const entry of manifest.contributes.themes) {
  const file = path.join(root, entry.path);
  check(fs.existsSync(file), `theme file missing: ${entry.path}`);
  const theme = JSON.parse(fs.readFileSync(file, "utf8"));
  check(theme.type === "dark" && entry.uiTheme === "vs-dark", `${entry.label}: type/uiTheme mismatch`);

  let colorCount = 0;
  for (const [key, value] of Object.entries(theme.colors)) {
    colorCount += 1;
    check(isHex(value), `colors.${key} is not a hex color: ${value}`);
    check(known.has(basePart(value)), `colors.${key} uses a color outside the palette: ${value}`);
  }
  check(colorCount > 300, `only ${colorCount} workbench colors`);

  const scopes = new Set();
  for (const token of theme.tokenColors) {
    check(Array.isArray(token.scope) && token.scope.length > 0, `tokenColors entry "${token.name}" has no scope list`);
    check(token.settings && typeof token.settings === "object", `tokenColors entry "${token.name}" has no settings`);
    if (token.settings.foreground !== undefined) {
      check(isHex(token.settings.foreground), `tokenColors "${token.name}" foreground is not hex`);
      check(known.has(basePart(token.settings.foreground)), `tokenColors "${token.name}" uses a color outside the palette`);
    }
    for (const scope of token.scope) {
      check(!scopes.has(scope), `scope listed twice: ${scope}`);
      scopes.add(scope);
    }
  }
  check(theme.tokenColors.length > 30, `only ${theme.tokenColors.length} token rules`);

  for (const [selector, value] of Object.entries(theme.semanticTokenColors)) {
    const color = typeof value === "string" ? value : value.foreground;
    if (color !== undefined) {
      check(isHex(color), `semanticTokenColors.${selector} is not hex`);
      check(known.has(basePart(color)), `semanticTokenColors.${selector} uses a color outside the palette`);
    }
  }

  // love is reserved for errors and deletions: no syntax token may use it.
  for (const token of theme.tokenColors) {
    const fg = (token.settings.foreground || "").toUpperCase();
    if (fg === palette.love.toUpperCase()) {
      const allowed = token.scope.every((scope) => /invalid|deleted|error|from-file/.test(scope));
      check(allowed, `tokenColors "${token.name}" uses love on a non-error scope`);
    }
  }
}

if (failures.length) {
  console.error("FAIL\n" + failures.join("\n"));
  process.exit(1);
}
console.log("ok");
