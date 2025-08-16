# VS Code Separators Extension

VS Code Separators is a TypeScript extension that draws separator lines above code symbols (methods, functions, classes, interfaces, etc.) to improve source code readability. The extension supports multiple programming languages and is distributed as both a desktop and web extension.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build
Run these commands in sequence to set up the development environment:

```bash
git submodule init
git submodule update
npm install
npm run build
```

- `git submodule init && git submodule update` -- initializes the vscode-whats-new submodule (required dependency)
- `npm install` -- installs dependencies, takes ~37 seconds
- `npm run build` -- webpack build for both Node.js and Web extensions, takes ~4 seconds. NEVER CANCEL.

### Development Workflow
For active development with automatic rebuilding:

```bash
npm run watch
```

- `npm run watch` -- starts webpack in watch mode, takes ~3-4 seconds to build initially, then rebuilds incrementally. NEVER CANCEL. Leave running during development.

### Quality Assurance
Run these commands before committing changes:

```bash
npm run lint
npm run pretest
```

- `npm run lint` -- runs ESLint on source code, takes ~1.4 seconds
- `npm run pretest` -- compiles TypeScript and runs lint, takes ~4 seconds total
- ALWAYS run `npm run lint` before committing or the CI (.github/workflows/main.yml) will fail

### Testing Limitations
```bash
npm test
```

- `npm test` -- attempts to run VS Code extension tests but FAILS in headless environments due to VS Code download requirements
- Tests require internet connectivity to download VS Code from update.code.visualstudio.com
- Tests work only in interactive environments with VS Code installed
- DO NOT rely on automated tests for validation in CI-like environments

## Manual Validation

Since automated tests fail in headless environments, use these validation approaches:

### Build Validation
Always validate builds manually:

```bash
npm run build && echo "Build completed successfully"
ls -la dist/
```

- Verify that `dist/extension-node.js` and `dist/extension-web.js` are generated
- File sizes should be ~206KB each
- Source maps should be present (.js.map files)

### Code Quality Validation
```bash
npm run lint
```

- Extension currently has 5 warnings (not errors) - this is expected
- Focus on fixing new warnings you introduce, not existing ones
- Zero errors should be maintained

### Clean Build Validation
Test that the build works from a clean state:

```bash
rm -rf dist/ out/
npm run build
```

- Verifies that the build process is reproducible
- Ensures no missing dependencies or build artifacts
- Both `dist/` and `out/` directories should be recreated

### VS Code Extension Development
To test the extension in VS Code:

1. Open the repository folder in VS Code
2. Press `F5` or use "Run Extension" launch configuration
3. This opens a new Extension Development Host window
4. Open any source code file (TypeScript, JavaScript, Python, etc.)
5. Verify separator lines appear above functions, classes, methods
6. Test the command palette commands:
   - `Separators: Toggle Visibility`
   - `Separators: Select Symbols`
   - `Separators: Select Folding Ranges`

### Web Extension Testing
Use the "Run Web Extension in VS Code" launch configuration to test the web version.

## Project Structure and Navigation

### Key Directories
```
├── src/                    # TypeScript source code
│   ├── extension.ts        # Main extension entry point
│   ├── constants.ts        # Configuration constants
│   ├── symbols/            # Symbol detection and filtering
│   ├── foldingRanges/      # Folding range detection
│   ├── comments/           # Comment detection logic
│   ├── language/           # Language-specific rules
│   └── test/               # Test suites
├── dist/                   # Webpack output (extension-node.js, extension-web.js)
├── out/                    # TypeScript compilation output
├── vscode-whats-new/       # Git submodule for "What's New" functionality
├── .vscode/                # VS Code workspace configuration
│   ├── launch.json         # Debug configurations
│   └── tasks.json          # Build tasks
├── rules.json              # Built-in comment detection rules
└── package.json            # Extension manifest and npm scripts
```

### Important Files to Know
- `src/extension.ts` -- main extension activation and decoration logic
- `src/decoration.ts` -- separator line rendering logic
- `package.json` -- extension manifest, commands, settings, and build scripts
- `rules.json` -- language-specific comment detection patterns
- `CONTRIBUTING.md` -- development workflow documentation
- `.github/workflows/main.yml` -- CI pipeline configuration

### Common Navigation Patterns
- After changing settings in `package.json`, run `npm run build`
- After modifying language rules, check `rules.json` and `src/constants.ts`
- When adding new symbol types, update both `src/constants.ts` and decoration logic
- Always check `src/test/suite/` for existing test patterns when adding new features

## Build Configuration

### TypeScript Configuration
- Target: ES2020
- Output: `out/` directory for development, `dist/` for bundled extension
- Source maps enabled for debugging

### Webpack Configuration
- Generates two bundles: `extension-node.js` (desktop) and `extension-web.js` (web)
- Uses Terser for minification in production mode
- Development builds include source maps

### Timing Expectations
- Initial `npm install`: ~37 seconds
- `npm run build`: ~4 seconds - NEVER CANCEL
- `npm run lint`: ~1.4 seconds  
- `npm run watch` initial build: ~3-4 seconds, then incremental
- TypeScript compilation: ~2 seconds
- Full CI pipeline: ~2-3 minutes across multiple OS platforms

## CI and Deployment

### GitHub Actions
The CI pipeline (.github/workflows/main.yml):
- Runs on Ubuntu, macOS, and Windows
- Installs Node.js 16.x
- Initializes git submodules
- Runs `npm install` and `npm test`
- Uses `xvfb-run` on Linux for headless testing

### Prerequisites for CI Success
- All lint warnings must be addressed for new code
- Git submodules must be properly initialized
- No compilation errors allowed
- Extension must load successfully in VS Code

## Troubleshooting

### Common Issues
- **Tests fail with network errors**: Expected in headless environments. Use manual validation instead.
- **"vscode module not found"**: Extension requires VS Code runtime. Use `F5` debugging or Extension Development Host.
- **Webpack build fails**: Check TypeScript compilation first with `npm run compile`.
- **Submodule not found**: Run `git submodule init && git submodule update`.

### Build Issues
- Clean build: Delete `dist/` and `out/` directories, then run `npm run build`
- Watch mode stuck: Kill the process and restart `npm run watch`
- Extension not loading: Check VS Code Developer Tools console for errors

### Development Tips
- Use VS Code's built-in TypeScript language server for navigation
- Reload the Extension Development Host window (`Ctrl+R`/`Cmd+R`) after code changes
- Check the Extension Host output channel for runtime errors
- Use the debugger by setting breakpoints and pressing `F5`
