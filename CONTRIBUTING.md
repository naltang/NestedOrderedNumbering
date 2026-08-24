# Contributing

Issues and pull requests are welcome after the public repository is created.

## Development

1. Install Node.js 18 or newer and pnpm 11.
2. Run `pnpm install`.
3. Run `pnpm test`, `pnpm lint`, and `pnpm build` before submitting a change.
4. Test editor behavior in a disposable Obsidian vault, not a primary vault.

Keep transforms in `src/model.ts` pure and covered by tests. Editor integration
belongs in `src/main.ts`. Every editor action must remain a single transaction so
one undo restores the whole operation.
