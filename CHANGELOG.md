# Changelog


## [1.29.0](https://github.com/supercharge/strings/compare/v1.28.0...v1.29.0) - 2022-10-20

### Added
- `equals(string | Str)`: you can now pass a `Str` instance for comparisons
- `notEquals(string | Str)`: you can now pass a `Str` instance for comparisons
- `isLowerLetters()`: determine whether the wrapped string is lowercase and consists of letters only

### Updated
- bump deps


## [1.28.0](https://github.com/supercharge/strings/compare/v1.27.1...v1.28.0) - 2022-05-30

### Added
- `hasLength(length)`: determine whether the string has the given `length`
- `isAlphaNumeric(input)`: determine whether the given `input` is an alpha-numeric string


## [1.27.1](https://github.com/supercharge/strings/compare/v1.27.0...v1.27.1) - 2022-05-06

### Fixed
- bring back Node.js v12 support


## [1.27.0](https://github.com/supercharge/strings/compare/v1.26.0...v1.27.0) - 2022-04-25

### Updated
- `random`: add support for a random string builder
  - example: `Str.random(use => use.length(10).numbers().characters())` results in a random string using only numbers and characters with a length of 10


## [1.26.0](https://github.com/supercharge/strings/compare/v1.25.1...v1.26.0) - 2022-04-11

### Added
- `squish()`: remove all extra whitespaces and also trim the string (remove leading and trailing whitespaces)


## [1.25.1](https://github.com/supercharge/strings/compare/v1.25.0...v1.25.1) - 2022-04-06

### Updated
- bump deps

### Fixed
- properly handle boolean `false` values as strings
  - before: `false` was replaced with an empty string
  - now: `false` will be wrapped properly to a string `'false'`


## [1.25.0](https://github.com/supercharge/strings/compare/v1.24.0...v1.25.0) - 2022-01-24

### Added
- `stripHtml()`: remove HTML tags from the string

### Updated
- bump deps
- `replace(searchValue: string | RegEx)`: add the `RegEx` type annotation to the search value in the replace method


## [1.24.0](https://github.com/supercharge/strings/compare/v1.23.0...v1.24.0) - 2021-11-17

### Added
- `padBoth(length, pad)`: pad both sides, left and right, of the string with the given `pad` string (repeatedly if needed) so that the resulting string reaches a given `length`
- `equalsIgnoreCase(value)`: determine whether the string equals given `value` when ignoring character casing

### Updated
- use UVU and c8 for testing and coverage report


## [1.23.1](https://github.com/supercharge/strings/compare/v1.23.0...v1.23.1) - 2021-11-12

### Updated
- updated the `splitCamel()` method to trim each word


## [1.23.0](https://github.com/supercharge/strings/compare/v1.22.0...v1.23.0) - 2021-11-12

### Added
- `lines()`: breaks the string at the newline character and returns an array of lines
- `isCamel()`: determine whether the given string is written in camelCase
- `words()`: returns the list of words for the given string


## [1.22.0](https://github.com/supercharge/strings/compare/v1.21.0...v1.22.0) - 2021-10-13

### Added
- `at(position)`: returns the character at the given `position`
- `isSymbol()`: determine whether the string is a JavaScript `Symbol`
- `isUuid()`: determine whether the string is a UUID


## [1.21.0](https://github.com/supercharge/strings/compare/v1.20.0...v1.21.0) - 2021-09-08

### Added
- `containsBom()`: determine whether the string contains a byte order mark (BOM) at any position
- `startsWithBom()`: determine whether the string starts with the byte order mark (BOM)

### Updated
- bump dependencies
- refined types for `Str.isString(value)` allowing TypeScript to properly resolve the `string` type


## [1.20.0](https://github.com/supercharge/strings/compare/v1.19.0...v1.20.0) - 2021-09-03

### Added
- `stripExtraSpaces()`: removes all extra spaces from a string and leaves only a single space at the given position
- `shuffle()`: randomly shuffle the characters of the string (using the fisher yates shuffle algorithm)
- `slice(start, end)`: returns a section of the string from `start` to `end`
- `stripBom()`: removes the byte order mark (BOM) from the string

### Updated
- bump dependencies


## [1.19.0](https://github.com/supercharge/strings/compare/v1.18.0...v1.19.0) - 2021-07-29

### Added
- `chars()`: returns the list of characters for the given string

### Updated
- bump dependencies
- remove not needed `eslint-plugin-standard` dependency: not needed when using `eslint-config-standard v16`


## [1.18.0](https://github.com/supercharge/strings/compare/v1.17.1...v1.18.0) - 2021-01-23

### Added
- `slug(separator = '-')`: convert the string to a URL-friendly “slug” in kebab-case

### Updated
- bump dependencies
- `kebab(separator = '-')`: add the `separator` parameter to the `kebab` method


## [1.17.1](https://github.com/supercharge/strings/compare/v1.17.0...v1.17.1) - 2020-12-10

### Fixed
- fixed typings for `parseCallback)` method


## [1.17.0](https://github.com/supercharge/strings/compare/v1.16.0...v1.17.0) - 2020-12-10

### Added
- `parseCallback(separator = '@', defaultValue?)`: parse a Class[@]method style string into the Class and method names

### Updated
- bump dependencies


## [1.16.0](https://github.com/supercharge/strings/compare/v1.15.1...v1.16.0) - 2020-11-18

### Added
- `notEquals(value)`: determine whether the string does not equal the given `value`
- `notIncludes(needle)`: determine whether the string does not contain the given `needle`
- `includesAll(...needles)`: determine whether the string contains all of the given `needles`

### Updated
- bump dependencies


## [1.15.1](https://github.com/supercharge/strings/compare/v1.15.0...v1.15.1) - 2020-10-23

### Fixed
- `replaceLast(search, replacement)` now returns the original string if the searched value isn’t part of the string


## [1.15.0](https://github.com/supercharge/strings/compare/v1.14.0...v1.15.0) - 2020-10-22

### Added
- `reverse()`: reverses the string
- `replaceLast(search, replacement)`: replaces the last occurrence of the given `search` string with the `replacement`

### Updated
- bump dependencies
- `contains(...needles)`: determine whether the given string contains any of the given needles. Before, you could only check for one needle (`contains(needle)`)


## [1.14.0](https://github.com/supercharge/strings/compare/v1.13.0...v1.14.0) - 2020-10-21

### Added
- `finish(suffix)`: ensures the string ends with the given `suffix`
- `padLeft(length, pad)`: pads the string on the left side until the length is reached
- `padRight(length, pad)`:  pads the string on the right side until the length is reached

### Updated
- bump dependencies
- allow array as an argument for `append`, `prepend`, and `containsAll`

### Fixed
- `ltrim(char)` removes every occurrence of `char` from the beginning of the string, not just the first
- `rtrim(char)` removes every occurrence of `char` from the end of the string, not just the last


## [1.13.0](https://github.com/supercharge/strings/compare/v1.12.0...v1.13.0) - 2020-10-20

### Added
- `afterLast(delimiter)`: returns the portion of the string after the last occurrence of `delimiter`
- `append(...values)`: appends the given `values` to the string
- `beforeLast(delimiter)`: returns the portion of the string before the last occurrence of `delimiter`
- `prepend(...values)`: prepends the given `values` to the string
- `start(prefix)`: ensures the string starts with the given `prefix`
- `replace(search, value)`: replaces the first occurrence of `search` with `value` in the string

### Updated
- bump dependencies


## [1.12.0](https://github.com/supercharge/strings/compare/v1.11.0...v1.12.0) - 2020-09-15

### Added
- `before(delimiter)`: returns the portion of the string before the first occurrence of the given `delimiter`
- `after(delimiter)`: returns the portion of the string after the first occurrence of the given `delimiter`
- `stripNums()`: removes all numbers from the string

### Updated
- bump dependencies
- change `main` entrypoint in `package.json` to `dist` folder
- move test runner from `@hapi/lab` to `jest`
- move assertions from `@hapi/code` to `jest`

### Removed
- remove `index.js` file which acted as a middleman to export from `dist` folder


## [1.11.0](https://github.com/supercharge/strings/compare/v1.10.0...v1.11.0) - 2020-07-27

### Added
- `containsAll(needles)`: determine whether all items in the `needles` array are part of the string

### Updated
- bump dependencies


## [1.10.0](https://github.com/supercharge/strings/compare/v1.9.0...v1.10.0) - 2020-07-14

### Added
- `notContains(needle)`: determine whether the given string does not contain the given `needle`

### Updated
- bump dependencies


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
