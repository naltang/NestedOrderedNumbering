<p align="center">
  <img src="https://github.com/spark00000/NestedOrderedNumbering/raw/main/docs/assets/banner.png" alt="Nested Ordered Numbering" width="900">
</p>

# Welcome

Nested Ordered Numbering is an Obsidian plugin for plain-text hierarchical
numbering whose final number always ends with a period.

```text
1. Project
  1.1. Planning
    1.1.1. Requirements
    1.1.2. Milestones
  1.2. Delivery
2. Archive
```

## Start here

| I want to… | Open this page |
|---|---|
| Install the plugin | [[Installation]] |
| Learn Enter, Tab, and Shift+Tab | [[Usage]] |
| See every keyboard action | [[Keyboard Reference]] |
| Fix indentation or plugin conflicts | [[Troubleshooting]] |
| Build or publish a release | [[Development and Releases]] |
| Submit to the Obsidian Community directory | [[Community Marketplace Submission]] |

## Core guarantees

- Every generated prefix has a final period: `1.`, `1.1.`, `1.1.1.`.
- Numbering is stored as ordinary text, not headings or nested Markdown list markers.
- Enter, Tab, and Shift+Tab recalculate the related contiguous block.
- Selected subtrees and multi-line selections move together.
- Every action uses one editor transaction, so one Ctrl+Z reverses it.
- The plugin performs no network requests and collects no telemetry.

> [!IMPORTANT]
> `1.1.` is not a standard Markdown ordered-list marker. This plugin deliberately
> owns the full prefix and its visual indentation.

## Links

- [Source repository](https://github.com/spark00000/NestedOrderedNumbering)
- [Releases](https://github.com/spark00000/NestedOrderedNumbering/releases)
- [Issue tracker](https://github.com/spark00000/NestedOrderedNumbering/issues)
- [License](https://github.com/spark00000/NestedOrderedNumbering/blob/main/LICENSE)
