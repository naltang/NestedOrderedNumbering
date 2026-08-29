<p align="center">
  <img src="docs/assets/banner.png" alt="Nested Ordered Numbering" width="900">
</p>

<p align="center">
  <a href="https://github.com/spark00000/NestedOrderedNumbering/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/spark00000/NestedOrderedNumbering/actions/workflows/ci.yml/badge.svg"></a>
  <a href="https://github.com/spark00000/NestedOrderedNumbering/releases"><img alt="Release" src="https://img.shields.io/github/v/release/spark00000/NestedOrderedNumbering?display_name=tag&sort=semver"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-7c3aed"></a>
  <img alt="Obsidian 1.5+" src="https://img.shields.io/badge/Obsidian-1.5%2B-8b5cf6">
</p>

<p align="center">
  <a href="https://github.com/spark00000/NestedOrderedNumbering/wiki">Wiki</a>
  · <a href="docs/USAGE.md">Usage</a>
  · <a href="docs/DEVELOPMENT.md">Development</a>
  · <a href="docs/PUBLISHING.md">Publishing</a>
  · <a href="https://github.com/spark00000/NestedOrderedNumbering/issues">Issues</a>
</p>

Create and maintain plain-text hierarchical numbering in Obsidian with a required
trailing period at every depth.

```text
1. First item
  1.1. Child item
    1.1.1. Grandchild item
  1.2. Another child
2. Second item
```

Unlike standard Markdown ordered lists, this plugin owns the entire numeric prefix.
`1.1.` and `1.1.1.` are treated as text numbering rather than Markdown list markers.

## Why this plugin?

Markdown only recognizes a single integer such as `1.` as an ordered-list marker.
Nested Ordered Numbering manages the complete hierarchy as readable plain text,
keeps the required final period at every depth, and recalculates the surrounding
block in one undoable editor transaction.

## Features

- Always emits `1.`, `1.1.`, `1.1.1.`, and deeper forms with a final period.
- Enter creates the next item at the same depth when the current item has content.
- Enter on a prefix-only item such as `1.3. ` removes the prefix and leaves one
  plain blank line, so the next input can be ordinary text or a Markdown heading.
- Tab indents the current item or selected subtree.
- Shift+Tab outdents a subtree; at the root it converts the item to plain text.
- Multi-line selections are supported.
- Insert, delete, and renumber commands update the related contiguous block.
- Blank lines may separate items inside one numbered block; ordinary text still
  starts a new block.
- Each operation uses one editor transaction, so one undo restores the entire edit.
- Recognized numbering is handled before conflicting Outliner keymaps.
- Legacy four-space or tab-indented blocks normalize automatically.
- Live Preview neutralizes Obsidian's Markdown-list and indented-code offsets on
  recognized lines, so the first, second, and deeper Tab levels stay uniform.

## Fixed-width hierarchy layout

Each additional numeric component adds two visible characters (`.1`). The plugin
therefore uses two leading spaces per hierarchy level. The combined result moves
the content start by exactly four columns per level:

```text
1. text             content column 3
  1.1. text         content column 7
    1.1.1. text     content column 11
      1.1.1.1. text content column 15
```

Run **Renumber nested ordered block** on an existing block to normalize older
four-space indentation immediately.

Obsidian normally treats `1.` as a Markdown list marker and four leading spaces
as a list continuation or code block. `styles.css` and a parser-scoped editor
decoration remove only those visual offsets from recognized numbering lines.

## Keyboard controls

| Key | Action |
|---|---|
| Enter | Create the next sibling; on a prefix-only item, exit numbering |
| Tab | Indent the item/selected subtree |
| Shift+Tab | Outdent, or remove numbering at root |
| Ctrl+Z | Undo the complete operation |

`Ctrl+P` is Obsidian's Command Palette shortcut. Open it and search for
**Nested Ordered Numbering** to run the same Insert, Delete, and Renumber commands.
To avoid conflicts, the public plugin does not claim default shortcuts. Assign your
preferred keys under **Settings → Hotkeys**; `Ctrl+Alt+N/D/R` are suggested choices.

## Parser contract

The trailing period and following whitespace are mandatory:

```regex
^[\t ]*(\d+(?:\.\d+)*\.)[\t ]+
```

Recognized: `1. item`, `1.1. item`, `12.3.7. item`
Ignored: `1 item`, `1.1 item`, `1.1.1 item`

## Installation

### Community directory

This section becomes applicable after the plugin is accepted into the Obsidian
Community directory.

1. Open **Settings → Community plugins → Browse**.
2. Search for **Nested Ordered Numbering**.
3. Select **Install**, then **Enable**.

### Manual installation

1. Create `.obsidian/plugins/nested-ordered-numbering/` in a test vault.
2. Copy `main.js`, `manifest.json`, and `styles.css` from a matching GitHub release.
3. Reload Obsidian and enable the plugin under **Community plugins**.

For screenshots, detailed examples, troubleshooting, and marketplace information,
visit the [project Wiki](https://github.com/spark00000/NestedOrderedNumbering/wiki).

## Privacy and security

Nested Ordered Numbering is local-only. It has:

- no network requests;
- no telemetry or analytics;
- no accounts, payments, or advertising;
- no access to files outside the active Obsidian vault;
- no self-update or dependency-install behavior at runtime.

## Development

Requirements: Node.js 22.13+ and pnpm 11.

```bash
pnpm install
pnpm test
pnpm lint
pnpm build
pnpm release:check
```

`main.js` is generated locally and intentionally excluded from the source branch.
Each GitHub release publishes the built `main.js` together with `manifest.json`
and `styles.css`, which are the files Obsidian installs.

See [Development](docs/DEVELOPMENT.md), [Usage](docs/USAGE.md), and
[Publishing](docs/PUBLISHING.md) for details.

## Release status

Release [`0.3.3`](https://github.com/spark00000/NestedOrderedNumbering/releases/tag/0.3.3)
is published with verified `main.js`, `manifest.json`, and `styles.css` assets. The
remaining pre-submission checks are the documented manual Vault and theme tests.
Run the release gate before every future tag as described in
[Publishing](docs/PUBLISHING.md).

## License

[MIT](LICENSE)
