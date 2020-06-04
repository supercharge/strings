# Changelog


## [1.9.0](https://github.com/supercharge/strings/compare/v1.8.0...v1.9.0) - 2020-06-04

### Added
- `ltrim(characters)`, `rtrim(characters)` and `trim(characters)`: support a `characters` parameter allowing you to trim a specific string value from the beginning, end, or both of a value:
    - `Str('/supercharge/').trim('/').get()` => `'supercharge'`
    - `Str('/supercharge/').ltrim('/').get()` => `'supercharge/'`
    - `Str('/supercharge/').rtrim('/').get()` => `'/supercharge'`


## [1.8.0](https://github.com/supercharge/strings/compare/v1.7.0...v1.8.0) - 2020-05-18

### Added
- `snake()`: converts a string to snake_case
- `kebab()`: converts a string to kebab-case
- `pascal()`: converts a string to PascalCase or also known as StudlyCase

### Fixed
- GitHub Action to publish this package in the GitHub Package Registry


## [1.7.0](https://github.com/supercharge/strings/compare/v1.6.0...v1.7.0) - 2020-05-13

### Added
- type definitions

### Updated
- bump dependencies
- move codebase to TypeScript to automatically generate type definitions


## [1.6.0](https://github.com/supercharge/strings/compare/v1.5.0...v1.6.0) - 2020-05-12

### Added
- `.limit(limit, end)`: returns the first `limit` characters and ends the limited string with `end`


## [1.5.0](https://github.com/supercharge/strings/compare/v1.4.0...v1.5.0) - 2020-05-05

### Added
- `Str.isString(value)`: determine whether the given `value` is a string


## [1.4.0](https://github.com/supercharge/strings/compare/v1.3.0...v1.4.0) - 2020-04-24

### Added
- `.ltrim()`: remove all whitespace from the left of the string
- `.rtrim()`: remove all whitespace from the rigth of the string
- `.concat()`: returns a string that contains the concatenation of two or more strings


## [1.3.0](https://github.com/supercharge/strings/compare/v1.2.0...v1.3.0) - 2020-04-03

### Added
- `.split(separator)`: split the string into an ordered set of substrings where the `separator` occurs
- `.equals(value)`: determine whether the string equals the given `value`
- `.startsWith(needle, position)`: determine whether the string starts with the `needle`
- `.endsWith(needle, length)`: determine whether the string ends with the `needle`


## [1.2.0](https://github.com/supercharge/strings/compare/v1.1.0...v1.2.0) - 2020-01-27

### Added
- `.ucFirst()`: uppercase the first character in the string
- `.replaceAll()`: replace all occurences in a string

### Updated
- bump deps
- Readme: fix scope in package name (from `@superchargejs` to `@supercharge`)


## [1.1.0](https://github.com/supercharge/strings/compare/v1.0.1...v1.1.0) - 2019-12-17

### Added
- `.isEmpty()`: determine whether the string value is empty (`''/undefined/null`)
- `.isNotEmpty()`:  determine whether the string value has a length of 1 or greater


## [1.0.1](https://github.com/supercharge/strings/compare/v1.0.0...v1.0.1) - 2019-12-15

### Updated
- GitHub Workflow publishing this package in the GitHub Package Registry
- `files` configuration in `package.json` file to only publish package parts, not tests. This reduces the package size


## 1.0.0 - 2019-12-14

### Added
- `1.0.0` release 🚀 🎉
