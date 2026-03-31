# VS Code Separators Extension

Always reference these instructions first and fall back to additional search or terminal commands only when project files do not provide enough context.

## Project Overview

VS Code Separators is a TypeScript extension that draws separator lines above code symbols (methods, functions, classes, interfaces, etc.) to improve source code readability. The extension supports multiple programming languages and is distributed as both a desktop and web extension.

## Technology Stack

- Language: TypeScript
- Runtime: VS Code Extension API (Node + Web)
- Bundler: Webpack 5
- Linting: ESLint (`eslint-config-vscode-ext`)
- Testing: Mocha + `@vscode/test-electron`

## Working Effectively

Bootstrap and local setup:

```bash
git submodule init
git submodule update
npm install
```

Build and development quickstart:

```bash
npm run build
npm run lint
```

- Use `npm run watch` during active development.
- Use VS Code "Launch Extension" (F5) to validate behavior in Extension Development Host.
- Expected command timings are usually under 10 seconds.
- Never cancel `npm install`, `npm run watch`, or `npm test` once started.
## Build and Development Commands

- `npm run compile` - TypeScript compilation
- `npm run build` - Webpack development build
- `npm run watch` - Continuous webpack build
- `npm run lint` - ESLint validation
- `npm run test` - Full test suite
- `npm run vscode:prepublish` - Production build

## Testing and Validation

Automated tests can fail in headless or restricted-network environments due to VS Code download requirements.

Manual validation checklist:

1. Run `npm run build` and confirm both bundles are generated.
2. Run `npm run lint` and ensure no new warnings/errors are introduced.
3. Launch Extension Host (F5) and verify separator rendering on sample code.
4. Validate commands:
   - `Separators: Toggle Visibility`
   - `Separators: Select Symbols`
   - `Separators: Select Folding Ranges`

## Project Structure and Key Files

```
src/
├── extension.ts          # Main extension entry point
├── decoration.ts         # Separator rendering logic
├── constants.ts          # Configuration constants
├── symbols/              # Symbol detection/filtering
├── foldingRanges/        # Folding range detection
├── comments/             # Comment detection logic
└── language/             # Language-specific rules

dist/                     # Webpack bundles (extension.js)
l10n/                     # Localization files
out/                      # Compiled TypeScript files
vscode-whats-new/         # Git submodule for What's New
walkthrough/              # Getting Started walkthrough content

rules.json                # Built-in comment detection rules
```

## Coding Conventions and Patterns

### Indentation

- Use spaces, not tabs.
- Use 4 spaces for indentation.

### Naming Conventions

- Use PascalCase for `type` names
- Use PascalCase for `enum` values
- Use camelCase for `function` and `method` names
- Use camelCase for `property` names and `local variables`
- Use whole words in names when possible

### Types

- Do not export `types` or `functions` unless you need to share it across multiple components
- Do not introduce new `types` or `values` to the global namespace
- Prefer `const` over `let` when possible.

### Strings

- Prefer double quotes for new code; some existing files may still use single quotes.
- User-facing strings use two localization mechanisms:
  - **Manifest contributions** (commands, settings, walkthrough metadata): use `%key%` placeholders in `package.json`, with translations in `package.nls.json` and `package.nls.{LANGID}.json`. Do **not** use `l10n.t` for these.
  - **Runtime messages** (shown from extension code): use `l10n.t("message")`, with translations in `l10n/bundle.l10n.json` and `l10n/bundle.l10n.{LANGID}.json`.
- Externalized strings must not use string concatenation. Use placeholders instead (`{0}`).

### Code Quality

- All production source files under `src/` (excluding tests under `src/test`) must include the standard project copyright header
- Prefer `async` and `await` over `Promise` and `then` calls
- All user facing messages must be localized using the applicable localization framework (for example `l10n.t` method)
- Keep imports organized: VS Code first, then internal modules.
- Use semicolons at the end of statements.
- Keep changes minimal and aligned with existing style.
- Keep language rules and constants synchronized.

### Import Organization

- Import VS Code API first: `import * as vscode from "vscode"`
- Group related imports together
- Use named imports for specific VS Code types
- Import from local modules using relative paths

### Architecture Patterns
- **Container Pattern**: The `Container` class stores global state like `Container.context`
- **Factory Pattern**: The `LanguageFactory` class creates language-specific symbol and comment providers based on document language
- **Strategy Pattern**: Separate classes implement symbol detection, folding range detection, and comment detection strategies that can be swapped based on language rules
- **Provider Pattern**: The `RulesProvider` class provides built in and user defined rules for comment detection
- **Decoration Pattern**: Separate decoration types created for each _kind_ of separator and folding range
- **Event-Driven**: Heavy use of VS Code events (`onDidChangeConfiguration`, `onDidChangeTextDocument`, etc.)
- **Language Provider Dependency**: The extension relies on language providers (like `DocumentSymbolProvider` and `FoldingRangeProvider`) to determine where to draw separators, so behavior can vary based on the quality of those providers for each language.

## Extension Features and Configuration

- Draw separators above symbols and/or folding ranges.
- Language-aware symbol and comment handling.
- Commands to toggle and refine separator behavior.
- Supports both desktop and web extension targets.

### Key Features
1. **Draw Separators**: Draw separators above symbols and/or folding ranges based on language-aware rules.
2. **Language-Aware Handling**: Use language-specific rules to determine which symbols to draw separators for and when to suppress separators above comments.
3. **Commands**: Provide commands to toggle separator visibility and select symbols/folding ranges.
4. **Customizable Appearance**: Gutter icons, line backgrounds, colors
5. **Remote Development**: Support for remote development scenarios
6. **Internationalization support**: Localization of all user-facing strings
7. **Walkthrough**: Getting Started guide for new users

### Important Settings
- `separators.enabledSymbols`: Define which symbols should have separators drawn
- `separators.functions.ignoreCallbackInline`: Suppress separators above inline callback functions
- `separators.comments.enabled`: Enable comment-aware separator suppression

## Dependencies and External Tools

- Requires `vscode-whats-new` submodule initialization.
- No external runtime tools are required beyond standard extension toolchain.
- Uses `@vscode/test-electron` for integration testing.

## Troubleshooting and Known Limitations

- Network failures in tests are often environment-related (`update.code.visualstudio.com`).
- If build fails, clean `dist/` and `out/` and rebuild.
- If separators do not appear, verify language symbol provider behavior and extension settings.

## CI and Pre-Commit Validation

Before committing:

1. Run `npm run lint`.
2. Run `npm run pretest`.
3. Run `npm run build`.
4. Validate extension behavior manually in Extension Host.

## Common Tasks

1. Update separator logic in `src/decoration.ts` and related symbol/folding modules.
2. Adjust rules in `rules.json` and corresponding constants.
3. Keep command/configuration and localization keys synchronized.
