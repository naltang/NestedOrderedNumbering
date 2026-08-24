# AGENTS.md

Obsidian plugin `nested-ordered-numbering`: plain-text hierarchical numbering (`1.1.`) with a required final period at every depth. Single package. Requires Node >= 22.13 and pnpm 11 (pinned via `packageManager`).

## Commands

CI runs `pnpm install --frozen-lockfile`, then test → lint → build → `release:check`. Run the same four checks before finishing a change.

```bash
pnpm test                                  # vitest run
pnpm test tests/model.test.ts -t "name"    # single test by file/name
pnpm lint
pnpm build                                 # tsc --noEmit --skipLibCheck && esbuild production
pnpm release:check
pnpm dev                                   # esbuild watch
```

## Architecture rules

- All numbering logic lives as pure text transforms in `src/model.ts` (parse + renumber), covered by `tests/model.test.ts`, which runs without launching Obsidian.
- `src/main.ts` is integration glue only. The model returns complete intended text + selection; `main.ts` computes a minimal change and dispatches **exactly one editor transaction per operation** so a single Ctrl+Z undoes the whole edit. Enforced by the PR template — never split an operation across transactions.
- Enter / Tab / Shift+Tab are registered via `Prec.highest` keymap plus a capture-phase document keydown handler, so recognized lines win over Outliner keymaps.
- `styles.css` offsets apply only to lines decorated with `nested-ordered-numbering-line` by the CodeMirror view plugin.

## Generated files & releases

- `main.js` is a gitignored build artifact — never commit it; `release:check` fails if it is tracked.
- Bump versions with `pnpm version x.y.z`; its custom `version` script syncs `manifest.json` and `versions.json`. `package.json`, `manifest.json`, and `versions.json` must stay in agreement (`release:check` verifies).
- Releases trigger on pushing an `x.y.z` tag matching `manifest.json`'s version; the workflow rebuilds from source and attaches `main.js`, `manifest.json`, `styles.css`.
- `scripts/check-release.mjs` enforces Obsidian Community directory naming rules on manifest fields (id/name/description wording) — rerun it after editing `manifest.json`.

## Manual testing

Use a disposable vault, never a primary one: copy `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/nested-ordered-numbering/`, then reload Obsidian and enable the plugin.
