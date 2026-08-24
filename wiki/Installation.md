# Installation

## Community directory

After the plugin is accepted into the Obsidian Community directory:

1. Open **Settings → Community plugins → Browse**.
2. Search for **Nested Ordered Numbering**.
3. Select **Install**, then **Enable**.

## Manual installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the same
   [GitHub release](https://github.com/spark00000/NestedOrderedNumbering/releases).
2. Create this folder inside the test Vault:

   ```text
   <Vault>/.obsidian/plugins/nested-ordered-numbering/
   ```

3. Copy all three files into that folder.
4. In Obsidian, open **Settings → Community plugins** and enable the plugin.
5. When replacing an existing version, disable and re-enable the plugin once.

> [!WARNING]
> Test third-party plugins in a disposable Vault before using them with important
> notes. Keep a backup of the Vault.

## Verify the installation

Type:

```text
1. Alpha
2. Beta
```

Put the cursor on `2. Beta` and press Tab. The result should be:

```text
1. Alpha
  1.1. Beta
```

See [[Troubleshooting]] if the prefix changes but the visible indentation does not.
