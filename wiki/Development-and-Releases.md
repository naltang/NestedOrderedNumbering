# Development and Releases

## Requirements

- Node.js 22.13 or newer
- pnpm 11
- A disposable Obsidian test Vault

## Verify locally

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm lint
pnpm build
pnpm release:check
```

The integration layer submits one minimal editor transaction per action. Preserve
that invariant so Ctrl+Z remains atomic.

## Release assets

Every GitHub release must attach matching copies of:

- `main.js`
- `manifest.json`
- `styles.css`

The tag must be the exact manifest version without a `v` prefix. The GitHub Actions
release workflow validates, builds, and publishes these assets automatically.
`main.js` is a generated file and is intentionally absent from the source branch;
it must be attached to the GitHub release as an individual file.

## Versioning

```bash
pnpm version patch
```

Update `CHANGELOG.md`, verify `versions.json`, commit, and push the exact version tag.

## Contributing

Read [CONTRIBUTING.md](https://github.com/spark00000/NestedOrderedNumbering/blob/main/CONTRIBUTING.md)
before opening a pull request. Security reports follow
[SECURITY.md](https://github.com/spark00000/NestedOrderedNumbering/blob/main/SECURITY.md).
