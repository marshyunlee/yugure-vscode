# Yūgure for VS Code

A quiet twilight color theme.

Yūgure (夕暮れ) is Japanese for dusk. The theme sits on a neutral near-black
ground with softened body text and six muted accents that each do one job. The
workbench stays close to the editor background instead of competing with it,
and accents appear as text, never as solid fills, so the window reads dark
without being flat and colourful without being loud.

The palette and its role mapping follow the [Yūgure theme for
Inkdrop](https://github.com/stoykotolev/inkdrop-yugure) by stoykotolev; a
Neovim port lives at [marshyunlee/yugure.nvim](https://github.com/marshyunlee/yugure.nvim).

## Install

From a clone, until it is on the Marketplace:

```sh
git clone https://github.com/marshyunlee/yugure-vscode
cd yugure-vscode
npx --yes @vscode/vsce package
code --install-extension yugure-theme-0.1.0.vsix
```

Then **Preferences → Color Theme → Yūgure**.

## Palette

| name    | hex       | role                                                  |
| ------- | --------- | ----------------------------------------------------- |
| base    | `#141518` | editor and workbench background                       |
| surface | `#18191D` | widgets, inputs, menus                                |
| low     | `#1B1C21` | current line, hover rows                              |
| overlay | `#1F2026` | status bar, separators, inactive selection            |
| med     | `#2A2C34` | selection, list focus                                 |
| high    | `#383A43` | borders, bracket match, scrollbars                    |
| text    | `#9DA4B2` | body text                                             |
| iron    | `#8F97A6` | secondary text, parameters                            |
| subtle  | `#7F8797` | interface text, punctuation, operators                |
| muted   | `#5E6577` | comments, placeholders, inlay hints                   |
| faint   | `#454A58` | line numbers, whitespace, ignored files               |
| rose    | `#B98590` | keywords, storage, tags, list bullets, h1             |
| gold    | `#BFA077` | strings, warnings, find matches, modified files, h2   |
| foam    | `#7AA3B5` | functions, links, info, focus, primary buttons, h3    |
| teal    | `#7BA09F` | types, inline code, added files, hints, h4            |
| iris    | `#9A8EB9` | numbers, constants, attributes, badges, untracked, h5 |
| love    | `#BA6B70` | errors and deletions, nothing else                    |

## What is covered

Workbench (activity bar, side bar, tabs, status bar, title bar, panels,
terminal, lists, inputs, notifications, quick pick, peek view, diff and merge
editors, debug, testing, settings, welcome page, chat), TextMate token colors
for the common scopes, and semantic token colors with `semanticHighlighting`
on.

## Development

```sh
node scripts/check.js
```

The check parses the theme, verifies every color is a hex value from the
palette, keeps `love` out of syntax scopes, and rejects duplicate scopes.

## License

MIT. The palette is reproduced from the Inkdrop theme's published color table.
