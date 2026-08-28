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
| Current release | [`0.3.3`](https://github.com/spark00000/NestedOrderedNumbering/releases/tag/0.3.3) |
| Minimum Obsidian version | `1.5.0` |
| Desktop only | No |
| License | MIT |

**Short description**

> Create and maintain hierarchical plain-text numbering with a trailing period at every depth.

## Before submitting

- [x] `pnpm test` passes.
- [x] `pnpm lint` passes.
- [x] `pnpm build` passes.
- [x] `pnpm release:check` passes.
- [x] `manifest.json`, `package.json`, and the Git tag use the same version.
- [x] `versions.json` maps that version to the minimum Obsidian version.
- [x] The GitHub release contains `main.js`, `manifest.json`, and `styles.css`.
- [ ] Manual installation from the release was tested in a clean Vault.
- [x] Enter, Tab, Shift+Tab, multi-line selection, and one-step undo were tested.
- [ ] The default theme and at least one community theme were checked.
- [x] README, Wiki, changelog, license, security policy, and issue templates are public.
- [x] Public author and short description match `manifest.json`.

The two unchecked manual checks are intentionally left open until the release files
are installed in a clean Vault and visually checked with the default theme and one
community theme.

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

## Official references

- [Submit your plugin](https://docs.obsidian.md/plugins/releasing/submit-plugin)
- [Submission requirements](https://docs.obsidian.md/community-directory/submission-requirements-for-plugins)
- [Developer policies](https://docs.obsidian.md/community-directory/developer-policies)
