# Troubleshooting

## The first or second Tab level does not look indented

Make sure `styles.css` is installed beside `main.js` and `manifest.json`, then
disable and re-enable the plugin once.

Obsidian normally interprets `1.` as a Markdown list marker and four leading
spaces as a list continuation or indented code. Version 0.3.1+ decorates only
recognized numbering lines and neutralizes those built-in visual offsets.

## Tab inserts spaces or another plugin handles it

1. Confirm the line matches the parser and ends its prefix with a final period.
2. Temporarily disable other list or outline plugins to identify the conflict.
3. Re-enable them one at a time. Nested Ordered Numbering captures recognized
   lines before common highest-priority editor keymaps, including Outliner.

## Ctrl+P opens the Command Palette

That is normal Obsidian behavior. Search for **Nested Ordered Numbering** in the
palette, or assign custom shortcuts under **Settings → Hotkeys**.

## Existing numbers are inconsistent

Place the cursor inside the block and run **Renumber nested ordered block**. Legacy
four-space and tab indentation is normalized to two raw spaces per hierarchy level.

## Shift+Tab does not indent further

Shift+Tab always outdents. To indent with Tab, the hierarchy must have a valid
preceding item that can become the parent or previous sibling. The plugin refuses
to create an orphaned depth.

## Report a problem

Open a [bug report](https://github.com/spark00000/NestedOrderedNumbering/issues/new?template=bug_report.yml)
and include:

- Obsidian version and theme;
- plugin version;
- other list/outline plugins enabled;
- a minimal text example;
- expected and actual results.
