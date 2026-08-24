# Development

## Architecture

- `src/model.ts` contains pure parsing and text transforms.
- `src/main.ts` connects those transforms to Obsidian and CodeMirror.
- `styles.css` neutralizes Markdown list/code offsets only on parser-recognized
  editor lines decorated by `src/main.ts`.
- `tests/model.test.ts` verifies numbering behavior without launching Obsidian.
- `esbuild.config.mjs` creates the CommonJS `main.js` release artifact.

The model returns the complete intended text and selection. The integration layer
calculates a minimal change and dispatches exactly one transaction. Keep this rule
for every new editor operation so Ctrl+Z remains atomic.

## Commands

```bash
pnpm install
pnpm test
pnpm test:watch
pnpm lint
pnpm build
pnpm dev
```

Use a disposable vault for manual testing. Copy `main.js`, `manifest.json`, and
`styles.css` into
`.obsidian/plugins/nested-ordered-numbering/`, reload Obsidian, and enable the plugin.

## Test matrix

- Parser accepts only prefixes with the final period.
- Enter creates same-depth siblings.
- Tab and Shift+Tab preserve subtrees.
- Root Shift+Tab produces plain text.
- Multi-line selections remain atomic.
- Insert/delete operations renumber neighboring blocks.
- Legacy indentation normalizes to the fixed-width layout.
- The first three Tab levels move by the same visible interval in Live Preview.
- Outliner remains enabled during manual conflict testing.
