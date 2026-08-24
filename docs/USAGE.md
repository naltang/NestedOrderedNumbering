# Usage

## Start a numbered block

Type a root item with a final period and a space:

```text
1. Project
```

Press Enter to create `2. `. Press Tab on `2.` to make it `1.1.` below the first
item. Tab and Shift+Tab move the selected item together with its numbered subtree.

## Convert a root item to plain text

Place the cursor anywhere in a root item and press Shift+Tab. `1. Heading-like text`
becomes `Heading-like text`. Its descendants move up one level and the remaining
numbered block is recalculated.

## Insert or remove numbering

- Select plain-text lines and run **Insert nested ordered numbering**.
- Select numbered lines and run **Delete nested ordered numbering**.
- Run **Renumber nested ordered block** to recalculate and normalize the current block.

All commands are available in the Command Palette under the plugin name. The public
plugin intentionally assigns no default shortcuts. Under **Settings → Hotkeys**, you
can assign suggested keys such as Ctrl+Alt+N, Ctrl+Alt+D, and Ctrl+Alt+R.

## Blocks and indentation

Consecutive recognized numbered lines form one block. A blank or unnumbered line
starts a new block. The plugin writes two leading spaces per depth; together with
the growing number prefix this keeps content at four-column intervals.

In Live Preview, the plugin also removes Obsidian's built-in Markdown list and
indented-code offsets from recognized lines. This keeps the first, second, and
later Tab levels visually consistent across the default theme and themes that
retain Obsidian's standard list variables.

## Outliner compatibility

Outliner may remain enabled. For lines matching this plugin's parser, Nested Ordered
Numbering handles Enter, Tab, and Shift+Tab first. Other Markdown lists continue to
use Outliner or Obsidian's normal behavior.
