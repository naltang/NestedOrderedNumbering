# Publishing

## One-time repository setup

1. Confirm `https://github.com/spark00000/NestedOrderedNumbering` is public.
2. Confirm the public author is `spark00000` in `manifest.json`.
3. Confirm the plugin ID `nested-ordered-numbering` is still unique.
4. Confirm the Wiki and README installation instructions match the release.

Run the release gate before tagging:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm build
pnpm release:check
```

## Versioning

`package.json`, `manifest.json`, and `versions.json` must agree. To bump a version:

```bash
pnpm version patch
```

Update `CHANGELOG.md`, commit the result, and push a tag whose value is the exact
version without a `v` prefix, for example `0.3.1`.

## GitHub release

The release workflow validates the tag, tests and builds the source, then creates a
GitHub release containing `main.js`, `manifest.json`, and `styles.css`.
`main.js` is intentionally ignored on the source branch and must exist as an
individual release attachment, not only inside GitHub's source archives.

## Obsidian Community directory

After the GitHub release exists:

1. Sign in at `community.obsidian.md` with an Obsidian account.
2. Link the GitHub account that owns the repository.
3. Add the plugin using the public repository URL.
4. Resolve all automated review errors and warnings.

The exact listing metadata and final checklist are maintained in the Wiki page
`Community Marketplace Submission`.

The repository root must continue to contain `README.md`, `LICENSE`, and
`manifest.json`. The GitHub release tag must match the manifest version exactly.

Official references:

- [Submit your plugin](https://docs.obsidian.md/plugins/releasing/submit-plugin)
- [Submission requirements](https://docs.obsidian.md/community-directory/submission-requirements-for-plugins)
- [Developer policies](https://docs.obsidian.md/community-directory/developer-policies)
