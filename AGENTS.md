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
- Enter on a prefix-only item removes the complete prefix and indentation, leaves
  one plain blank line, and renumbers the related block in the same transaction.
- `styles.css` offsets apply only to lines decorated with `nested-ordered-numbering-line` by the CodeMirror view plugin.

## Generated files & releases

- `main.js` is a gitignored build artifact — never commit it; `release:check` fails if it is tracked.
- Bump versions with `pnpm version x.y.z`; its custom `version` script syncs `manifest.json` and `versions.json`. `package.json`, `manifest.json`, and `versions.json` must stay in agreement (`release:check` verifies).
- Releases trigger on pushing an `x.y.z` tag matching `manifest.json`'s version; the workflow rebuilds from source and attaches `main.js`, `manifest.json`, `styles.css`.
- `scripts/check-release.mjs` enforces Obsidian Community directory naming rules on manifest fields (id/name/description wording) — rerun it after editing `manifest.json`.

## Manual testing

Use a disposable vault, never a primary one: copy `main.js`, `manifest.json`, and `styles.css` into `<vault>/.obsidian/plugins/nested-ordered-numbering/`, then reload Obsidian and enable the plugin.

## Project constraints

- Every recognized prefix must end with a period and whitespace. Never delegate
  hierarchical numbering to Markdown's ordered-list implementation.
- Blank lines may occur inside one numbered block. A nonblank, unnumbered line is
  the boundary between independent blocks.
- Keep public source and documentation on `main`. Keep `_task/AGENT.MD` and
  `_task/TASK.md` only in the nested local Git repository under `_task/`; never
  add that directory to the public repository or configure a remote for it.
- Local task headings use `### <phase>.<task>.` with a required trailing period.
  Phase `1.x` is plug-in development: only its first heading is annotated as
  `### 1.1. plug-in개발`. Phase `2.x` is marketplace preparation and starts at
  `### 2.1.`.
- Use Git commits and local checkpoint refs for rollback. Do not create sibling
  `NestedOrderedNumbering.backup-*` directories.

## Lessons learned

- A Vault can keep an old `manifest.json` while running a newer `main.js`. Verify
  all three installed artifacts before diagnosing author, description, or version
  mismatches.
- Enter followed by Tab must renumber the whole related block, including numbered
  items after blank lines. Keep this workflow covered by an automated regression
  test.
- Enter on an empty numbered item is the explicit exit from numbering. It must
  leave exactly one plain blank line so Markdown headings can be typed next.
- A plugin does not appear in Community Plugins search until its public release is
  submitted and accepted; a valid GitHub release alone is not a directory listing.

## Recovery history

- 2026-08-28: pre-sync checkpoint `checkpoint/pre-agent-sync-20260828` points to
  `8841b4ed2b1055e92ccb7f3675edddf0ffbea137`. PR 1 was applied by fast-forward;
  restore from that ref if the sync must be undone.
- 2026-08-28: release-candidate checkpoint
  `refs/checkpoints/pre-0.3.3-release-gate` points to Git snapshot
  `5b314df593e39c4248fd14a02dc7444aac716745`.
- 2026-08-28: the isolated prompt repository, formerly under `doc/` and now under
  `_task/`, preserved the original task at
  `3e20296f902bc503aae8ac8356a5b3b4421fef00` and committed the local-only major
  prompts at `14acf422ba9084a94e0deff92aa02053b6ad98bf`; it has no remote.
