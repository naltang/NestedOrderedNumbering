# Keyboard Reference

| Key | Current context | Result |
|---|---|---|
| Enter | Numbered item | Creates the next sibling at the same depth |
| Tab | Item with a valid previous parent/sibling | Indents the item and its subtree |
| Shift+Tab | Nested item | Outdents the item and its subtree |
| Shift+Tab | Root item | Removes numbering and leaves plain text |
| Ctrl+Z | After any plugin action | Reverses the complete transaction once |

## Example

```text
1. Alpha
2. Beta
```

Tab on `2. Beta`:

```text
1. Alpha
  1.1. Beta
```

Enter at the end of `1.1. Beta`:

```text
1. Alpha
  1.1. Beta
  1.2. ␠
```

Tab on `1.2.` when `1.1.` precedes it:

```text
1. Alpha
  1.1. Beta
    1.1.1. ␠
```

> [!NOTE]
> Ctrl+P remains Obsidian's Command Palette shortcut. This plugin does not replace it.
