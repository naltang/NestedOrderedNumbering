# Community Marketplace Submission

This page is the release and submission checklist for the Obsidian Community
plugin directory.

## Listing metadata

| Field | Value |
|---|---|
| Name | Nested Ordered Numbering |
| Plugin ID | `nested-ordered-numbering` |
| Author | `spark00000` |
| Repository | `spark00000/NestedOrderedNumbering` |
| Minimum Obsidian version | `1.5.0` |
| Desktop only | No |
| License | MIT |

**Short description**

> Create hierarchical text numbering that always ends with a period.

## Before submitting

- [ ] `pnpm test` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes.
- [ ] `pnpm release:check` passes.
- [ ] `manifest.json`, `package.json`, and the Git tag use the same version.
- [ ] `versions.json` maps that version to the minimum Obsidian version.
- [ ] The GitHub release contains `main.js`, `manifest.json`, and `styles.css`.
- [ ] Manual installation from the release was tested in a clean Vault.
- [ ] Enter, Tab, Shift+Tab, multi-line selection, and one-step undo were tested.
- [ ] The default theme and at least one community theme were checked.
- [ ] README, Wiki, changelog, license, security policy, and issue templates are public.

## Submission notes

- The plugin manages plain-text prefixes and does not depend on standard Markdown
  nested ordered-list parsing.
- The parser requires a final period: `1.`, `1.1.`, `1.1.1.`.
- The plugin is local-only and makes no network requests.
- Recognized lines use a scoped Live Preview decoration so Markdown list/code
  offsets do not distort early hierarchy levels.

## Submission flow

1. Publish and verify the GitHub release.
2. Sign in to the Obsidian Community directory submission site.
3. Link the GitHub account that owns this repository.
4. Submit `https://github.com/spark00000/NestedOrderedNumbering`.
5. Address automated and reviewer feedback without changing the plugin ID.
