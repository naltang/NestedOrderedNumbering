# Usage

## Build a hierarchy

Start with a root item:

```text
1. Project
```

Press Enter to create `2. `. Press Tab on the new item to make it a child:

```text
1. Project
  1.1. ␠
```

## Move a subtree

Tab indents the current item and all numbered descendants below it. Shift+Tab
outdents the same subtree. A multi-line selection moves as one operation.

## Convert numbering to plain text

Press Shift+Tab on a root item:

```text
1. Notes
```

becomes:

```text
Notes
```

Its descendants are lifted and the remaining block is recalculated.

## Commands

Open the Command Palette and search for **Nested Ordered Numbering**:

- **Insert nested ordered numbering** — number selected plain-text lines.
- **Delete nested ordered numbering** — remove prefixes from selected lines.
- **Renumber nested ordered block** — repair and normalize the current block.

The plugin intentionally does not claim global default hotkeys. Assign preferred
shortcuts under **Settings → Hotkeys**.

## Parser rule

The final period and following whitespace are mandatory:

```regex
^[\t ]*(\d+(?:\.\d+)*\.)[\t ]+
```

Accepted: `1. item`, `1.1. item`, `12.3.7. item`
Ignored: `1 item`, `1.1 item`, `1.1.1 item`
