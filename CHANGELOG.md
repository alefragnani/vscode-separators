## [2.6.1] - 2024-03-12
### Internal
- Typo in release date of v2.6.0

## [2.6.0] - 2024-03-11
### Added
- New option to draw separators above comments (issue [#21](https://github.com/alefragnani/vscode-separators/issues/21))
- New setting to define the minimum number of lines for symbols (issue [#3](https://github.com/alefragnani/vscode-separators/issues/3))

## [2.5.0] - 2023-02-10
### Added
- New setting to choose the separator's location (issue [#74](https://github.com/alefragnani/vscode-separators/issues/74))

### Internal
- Support **Localization** API (issue [#79](https://github.com/alefragnani/vscode-separators/issues/79))
- Security Alert: terser (dependabot [PR #76](https://github.com/alefragnani/vscode-separators/pull/76))

## [2.4.1] - 2022-07-16
### Internal
- Add GitHub Sponsors support (PR [#54](https://github.com/alefragnani/vscode-separators/pull/71))

## [2.4.0] - 2022-03-31
### Added
- Add **Web** support (issue [#54](https://github.com/alefragnani/vscode-separators/issues/54))

### Internal
- Support Settings Categories API (issue [#58](https://github.com/alefragnani/vscode-separators/issues/58))
- Add CONTRIBUTING documentation (issue [#57](https://github.com/alefragnani/vscode-separators/issues/57))
- Bump devDependencies (issue [#59](https://github.com/alefragnani/vscode-separators/issues/59))

## [2.3.0] - 2021-09-04
### Added
- Add support to **Lua** language in `separators.functions.ignoreCallbackInline` setting (issue [#50](https://github.com/alefragnani/vscode-separators/issues/50))
- Add separators for `Struct` symbol (issue [#46](https://github.com/alefragnani/vscode-separators/issues/46))

### Internal
- License Update

## [2.2.1] - 2021-07-07
### Fixed
- Remove `minItems` limitation for `enabledSymbols` (issue [#43](https://github.com/alefragnani/vscode-separators/issues/43))

### Internal
- Security Alert: elliptic (dependabot [PR #42](https://github.com/alefragnani/vscode-separators/pull/42))
- Security Alert: y18n (dependabot [PR #41](https://github.com/alefragnani/vscode-separators/pull/41))
- Security Alert: ssri (dependabot [PR #40](https://github.com/alefragnani/vscode-separators/pull/40))
- Security Alert: lodash (dependabot [PR #39](https://github.com/alefragnani/vscode-separators/pull/39))

## [2.2.0] - 2021-07-04
### Added
- New setting to configure `depth`/`level` of separators rendered (issue [#24](https://github.com/alefragnani/vscode-separators/issues/24))
- Language support documentation (issue [#32](https://github.com/alefragnani/vscode-separators/issues/32))
- New setting to ignore `callback`/`inline` functions (issue [#33](https://github.com/alefragnani/vscode-separators/issues/33))

## Changed
- Make `separators.enabledSymbols` setting customizable _per language_ (issue [#18](https://github.com/alefragnani/vscode-separators/issues/18))

## [2.1.0] - 2021-06-04
### Added
- Support **Virtual Workspaces** (issue [#27](https://github.com/alefragnani/vscode-separators/issues/27))
- Support **Workspace Trust** (issue [#26](https://github.com/alefragnani/vscode-separators/issues/26))

### Internal
- Do not show welcome message if installed by Settings Sync (issue [#29](https://github.com/alefragnani/vscode-separators/issues/29))
- Security Alert: ini (dependabot [PR #20](https://github.com/alefragnani/vscode-separators/pull/20))

## [2.0.0] - 2020-11-22
### Added
- Select which separators should be enabled (issue [#1](https://github.com/alefragnani/vscode-separators/issues/1))
- Add separators for more symbols (issue [#2](https://github.com/alefragnani/vscode-separators/issues/2))

### Changed
- Use symbol icon color for their separators as default value (issue [#14](https://github.com/alefragnani/vscode-separators/issues/14))

### Internal
- Use `vscode-whats-new` submodule (issue [#16](https://github.com/alefragnani/vscode-separators/issues/16))

## [1.0.2] - 2020-11-07
### Fixed
- Decorators being duplicated when moving methods down with Return (issue [#5](https://github.com/alefragnani/vscode-separators/issues/5))

## [1.0.1] - 2020-11-05
### Fixed
- Typo in logo
- Typo in Marketplace name

## [1.0.0] - 2020-11-05
- Initial release
