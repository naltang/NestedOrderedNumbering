# Changelog

All notable changes follow [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and use [Semantic Versioning](https://semver.org/).

## [0.3.1] - 2026-08-24

### Fixed

- Kept the first, second, and deeper hierarchy levels visually uniform in Live
  Preview by neutralizing Obsidian's Markdown-list and indented-code offsets only
  on parser-recognized numbering lines.
- Included `styles.css` in manual installation and GitHub release instructions.

## [0.3.0] - 2026-08-24

### Added

- Fixed-width hierarchy layout: content advances four columns per level.
- Automatic normalization of legacy four-space or tab-indented numbered blocks.
- Compatibility handling for Outliner and other highest-priority editor keymaps.
- Commands for insert, delete, and renumber operations, ready for user-assigned hotkeys.
- Automated tests, CI, release checks, and marketplace documentation.

### Changed

- Hierarchy indentation is now two spaces per level because each numeric prefix
  adds two visible characters per level.

## [0.2.0] - 2026-08-24

### Added

- Root-level Shift+Tab converts an item to plain text.
- Direct keyboard shortcuts and Outliner conflict mitigation.

## [0.1.0] - 2026-08-24

### Added

- Initial proof of concept for Enter, Tab, Shift+Tab, subtree movement,
  insertion, deletion, renumbering, and single-step undo.
