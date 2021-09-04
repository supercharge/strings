'use strict'

import Crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export class Str {
  /**
   * The string value to work with.
   */
  private value: string

  /**
   * Create a new String instance providing chainable string operations.
   * This instance clones the original string and works with the clone.
   * It won’t modify the original string.
   *
   * @param {String} value
   *
   * @returns {Str}
   */
  constructor (value?: any) {
    this.value = String(value || '').slice(0)
  }

  /**
   * Returns a URL-friendly alphabet containing the symbols `a-z A-Z 0-9 _-`.
   * The symbols order was changed for better gzip compression.
   *
   * The alphabet comes from the https://github.com/ai/nanoid package.
   *
   * @returns {String}
   */
  static get alphabet (): string {
    return 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'
  }

  /**
   * Returns the string value.
   *
   * @returns {String}
   */
  get (): string {
    return this.toString()
  }

  /**
   * Returns the string value.
   *
   * @returns {String}
   */
  toString (): string {
    return this.value
  }

  /**
   * Returns the portion of the string after the first occurrence of the given `delimiter`.
   *
   * @param {String} delimiter
   *
   * @returns {Str}
   */
  after (delimiter: string): Str {
    if (delimiter === '') {
      return this
    }

    const substrings = this.split(delimiter)

    return substrings.length === 1
      ? this // delimiter is not part of the string
      : new Str(substrings.slice(1).join(delimiter))
  }

  /**
   * Returns the portion of the string after the last occurrence of the given `delimiter`.
   *
   * @param {String} delimiter
   *
   * @return {Str}
   */
  afterLast (delimiter: string): Str {
    return delimiter === ''
      ? this
      : new Str(this.split(delimiter).pop())
  }

  /**
   * Append the given values to the string.
   *
   * @param {String|String[]} values
   *
   * @return {Str}
   */
  append (...values: string[] | string[][]): Str {
    return new Str(
      this.value + ([] as string[]).concat(...values).join('')
    )
  }

  /**
   * Returns the portion of the string before the first occurrence of the given `delimiter`.
   *
   * @param {String} delimiter
   *
   * @returns {Str}
   */
  before (delimiter: string): Str {
    return delimiter === ''
      ? this
      : new Str(this.split(delimiter).shift())
  }

  /**
   * Returns the portion of the string before the last occurrence of the given `delimiter`.
   *
   * @param {String} delimiter
   *
   * @return {Str}
   */
  beforeLast (delimiter: string): Str {
    if (delimiter === '') {
      return this
    }

    const substrings = this.split(delimiter)

    return substrings.length === 1
      ? this // delimiter is not part of the string
      : new Str(substrings.slice(0, -1).join(delimiter))
  }

  /**
   * Convert the string to camelCase.
   *
   * @returns {Str}
   */
  camel (): Str {
    return this.studly().lcFirst()
  }

  /**
   * Returns the list of characters for the given string.
   *
   * @returns {String[]}
   */
  chars (): string[] {
    return Array.from(this.toString())
  }

  /**
   * Returns a string that contains the concatenation of two or more strings.
   *
   * @param {String|Array} strings
   *
   * @returns {Str}
   */
  concat (...strings: string[]): Str {
    strings = ([] as string[]).concat(...strings)

    return new Str(
      this.value.concat(...strings)
    )
  }

  /**
   * Determine whether the haystack contains any of the given `needles`.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  contains (...needles: string[] | string[][]): boolean {
    return this.includes(...needles)
  }

  /**
   * Determine whether the haystack contains all items if the `needles` array.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  containsAll (...needles: string[] | string[][]): boolean {
    return this.includesAll(...needles)
  }

  /**
   * Determine whether the haystack does not contain the given `needle`.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  notContains (needle: string): boolean {
    return !this.contains(needle)
  }

  /**
   * Determine whether the string ends with the given `needle`.
   * Optionally, accepts a `length` used as the string length.
   *
   * @param {String} needle
   * @param {Number} length
   *
   * @returns {Boolean}
   */
  endsWith (needle: string, length?: number): boolean {
    return this.value.endsWith(needle, length)
  }

  /**
   * Determine whether the string equals the given `value`.
   *
   * @param {String} value
   *
   * @returns {Boolean}
   */
  equals (value: string): boolean {
    return this.value === value
  }

  /**
   * Determine whether the string does not equal the given `value`.
   *
   * @param {String} value
   *
   * @returns {Boolean}
   */
  notEquals (value: string): boolean {
    return !this.equals(value)
  }

  /**
   * Append a single instance of the given `suffix` to the end of
   * the string if it doesn’t already ends with the given suffix.
   *
   * @param {String} suffix
   *
   * @returns {Str}
   */
  finish (suffix: string): Str {
    return this.endsWith(suffix)
      ? this
      : this.append(suffix)
  }

  /**
   * Determine whether the given string contains the `needle`.
   *
   * @param {*} needle
   *
   * @returns {Boolean}
   */
  includes (...needles: string[] | string[][]): boolean {
    const includes = ([] as string[])
      .concat(...needles)
      .filter(needle => needle !== '')
      .find(needle => this.value.includes(needle))

    return !!includes
  }

  /**
   * Determine whether the haystack contains all items if the `needles` array.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  includesAll (...needles: string[] | string[][]): boolean {
    return ([] as string[])
      .concat(...needles)
      .every(needle => {
        return this.includes(needle)
      })
  }

  /**
   * Determine whether the string does not contain the given `needle`.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  notIncludes (needle: string): boolean {
    return !this.includes(needle)
  }

  /**
   * Determine whether the given string is empty.
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.length() === 0
  }

  /**
   * Determine whether the string is lowercase.
   *
   * @returns {Boolean}
   */
  isLower (): boolean {
    return this.isLowercase()
  }

  /**
   * Determine whether the string is lowercase.
   *
   * @returns {Boolean}
   */
  isLowercase (): boolean {
    return this.value === this.lower().get()
  }

  /**
   * Determine whether the given string is not empty.
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Determine whether the given `input` is a string.
   *
   * @param {*} input
   *
   * @returns {Boolean}
   */
  isString (input: any): boolean {
    return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]'
  }

  /**
   * Determine whether the given string is uppercase.
   *
   * @returns {Boolean}
   */
  isUpper (): boolean {
    return this.isUppercase()
  }

  /**
   * Determine whether the given string is uppercase.
   *
   * @returns {Boolean}
   */
  isUppercase (): boolean {
    return this.value === this.upper().get()
  }

  /**
   * Convert the string to kebab-case.
   *
   * @returns {Str}
   */
  kebab (separator: string = '-'): Str {
    return new Str(
      this.value.replace(/[_-\s]+/g, separator)
    )
      .strip()
      .toLowerCase()
  }

  /**
   * Lowercases the first character in the string.
   *
   * @returns {Str}
   */
  lcFirst (): Str {
    return new Str(
      this.value[0].toLowerCase() + this.value.slice(1)
    )
  }

  /**
   * Returns the string’s length.
   *
   * @returns {Number}
   */
  length (): number {
    return this.value.length
  }

  /**
   * Returns the first `limit` characters and ends the limited string with `end`.
   *
   * @param {Number} limit
   * @param {String} end
   *
   * @returns {Str}
   */
  limit (limit: number = 0, end: string = ''): Str {
    return this.length() <= limit
      ? this
      : new Str(this.value.substring(0, limit).concat(end))
  }

  /**
   * Lowercases the string.
   *
   * @returns {Str}
   */
  lower (): Str {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string. Alias for `.lower()`.
   *
   * @returns {Str}
   */
  lowercase (): Str {
    return this.toLowerCase()
  }

  /**
   * Removes the whitespace from the front of the string when
   * no argument is present. It trims the given `characters`
   * from the left of the string if you pass along a value.
   *
   * @param {String} characters
   *
   * @returns {Str}
   */
  ltrim (characters: string = ''): Str {
    if (!characters) {
      return new Str(
        this.value.trimLeft()
      )
    }

    while (this.startsWith(characters)) {
      this.value = this.replace(characters, '').get()
    }

    return new Str(this.value)
  }

  /**
   * Pad the left side of the string with the given `pad` string (repeatedly
   * if needed) so that the resulting string reaches a given `length`.
   *
   * @param {Number} length
   * @param {String} pad
   *
   * @returns {Str}
   */
  padLeft (length: number, pad: string = ' '): Str {
    return new Str(
      this.value.padStart(length, pad)
    )
  }

  /**
   * Pad the right side of the string with the given `pad` string (repeatedly
   * if needed) so that the resulting string reaches a given `length`.
   *
   * @param {Number} length
   * @param {String} pad
   *
   * @returns {Str}
   */
  padRight (length: number, pad: string = ' '): Str {
    return new Str(
      this.value.padEnd(length, pad)
    )
  }

  /**
   * Parse a Class[@]method style string into the Class and method names.
   *
   * @returns {String[]}
   */
  parseCallback (separator: string = '@', defaultValue?: string): [string, string | undefined] {
    if (this.notContains(separator)) {
      return [this.value, defaultValue]
    }

    const [Class, method] = this.split(separator, 2)

    return [Class, method]
  }

  /**
   * Convert the string to PascalCase (same as StudlyCase). Alias for `.studly()`.
   *
   * @returns {Str}
   */
  pascal (): Str {
    return this.studly()
  }

  /**
   * Prepend the given values to the string.
   *
   * @param {String|String[]} values
   *
   * @return {Str}
   */
  prepend (...values: string[] | string[][]): Str {
    return new Str(
      ([] as string[]).concat(...values).join('') + this.value
    )
  }

  /**
   * Create a random, URL-friendly string. The default length will have 21 symbols.
   *
   * @param {Number} [size=21] number of symbols in string
   *
   * @returns {String}
   */
  random (size = 21): string {
    const bytes = Crypto.randomBytes(size)
    const alphabetLength = Str.alphabet.length - 1

    let random = ''

    while (size--) {
      random += Str.alphabet[bytes[size] & alphabetLength]
    }

    return random
  }

  /**
   * Replace the first occurence of the string.
   *
   * @param {String} search
   * @param {String} replace
   *
   * @returns {Str}
   */
  replace (search: string, replace: string): Str {
    return new Str(
      this.value.replace(search, replace)
    )
  }

  /**
   * Replace all occurrences of `search` with `replace` in the string.
   *
   * @param {*} search
   * @param {*} replace
   *
   * @returns {Str}
   */
  replaceAll (search: string|RegExp, replace: string): Str {
    const replacer = new RegExp(search, 'g')

    return new Str(
      this.value.replace(replacer, replace)
    )
  }

  /**
   * Replace the last occurence of the string.
   *
   * @param {String} search
   * @param {String} replace
   *
   * @returns {Str}
   */
  replaceLast (search: string, replace: string): Str {
    return this.notContains(search)
      ? this
      : new Str(
        this.beforeLast(search).get() + replace + this.afterLast(search).get()
      )
  }

  /**
   * Returns the reversed string.
   *
   * @returns {Str}
   */
  reverse (): Str {
    return new Str(
      this.value.split('').reverse().join('')
    )
  }

  /**
   * Removes the whitespace from the end of the string when
   * no argument is present. It trims the given `characters`
   * from the left of the string if you pass along a value.
   *
   * @param {String} characters
   *
   * @returns {Str}
   */
  rtrim (characters: string = ''): Str {
    if (!characters) {
      return new Str(
        this.value.trimRight()
      )
    }

    while (this.endsWith(characters)) {
      this.value = this.replaceLast(characters, '').get()
    }

    return new Str(this.value)
  }

  /**
   * Shuffles the characters of the string using the Fisher-Yates-Shuffle algorithm (also known as the Knuth-Shuffle).
   *
   * @returns {Str}
   */
  shuffle (): Str {
    const characters = this.chars()
    let characterCount = characters.length

    while (characterCount) {
      // Pick a remaining character
      const position = Math.floor(Math.random() * characterCount--)

      // And swap it with the current element.
      const char = characters[characterCount]
      characters[characterCount] = characters[position]
      characters[position] = char
    }

    return new Str(characters.join(''))
  }

  /**
   * Returns a section of the string starting from the given `start` until the given `end`.
   *
   * @param {Number} start
   * @param {Number} end
   *
   * @returns {Str}
   */
  slice (start?: number, end?: number): Str {
    return new Str(
      this.value.slice(start, end)
    )
  }

  /**
   * Convert the string to a URL-friendly “slug” in kebab-case.
   *
   * @param {String} separator
   *
   * @returns {Str}
   */
  slug (separator: string = '-'): Str {
    return this.kebab(separator)
  }

  /**
   * Convert the string to snake_case.
   *
   * @returns {Str}
   */
  snake (): Str {
    return new Str(
      this.value.replace(/[_-\s]+/g, '_')
    )
      .strip()
      .toLowerCase()
  }

  /**
   * Splits up the string into an array of strings by separating
   * the string at each of the specified `separator` string.
   *
   * @param {String} separator
   * @param {Number} limit
   *
   * @returns {Array}
   */
  split (separator: string, limit?: number): string[] {
    return this.value.split(separator, limit)
  }

  /**
   * Prepends a single instance of the given `prefix` to the start of
   * the string if it doesn’t already start with the given prefix.
   *
   * @param {String} prefix
   *
   * @returns {Str}
   */
  start (prefix: string): Str {
    return this.startsWith(prefix)
      ? this
      : this.prepend(prefix)
  }

  /**
   * Determine whether the string starts with the given `needle`.
   * Optionally, accepts the position in the string at which
   * to begin searching for the `needle` (defaults to `0`).
   *
   * @param {*} needle
   * @param {Number} position
   *
   * @returns {Boolean}
   */
  startsWith (needle: string, position?: number): boolean {
    return this.value.startsWith(needle, position)
  }

  /**
   * Removes all whitespace from the string, everywhere.
   *
   * @returns {Str}
   */
  strip (): Str {
    return new Str(
      this.value.replace(/\s+/g, '')
    )
  }

  /**
   * Removes the byte order mark (BOM) from the string.
   *
   * @returns {Str}
   */
  stripBom (): Str {
    // Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
    // conversion translates it to FEFF (UTF-16 BOM).
    return this.value.charCodeAt(0) === 0xFEFF
      ? new Str(this.slice(1))
      : this
  }

  /**
   * Removes all numbers from the string.
   *
   * @returns {Str}
   */
  stripNums (): Str {
    return this.replaceAll(/\d+/, '')
  }

  /**
   * Removes all extra spaces from the string and leaves a single space at the position.
   *
   * @returns {Str}
   */
  stripExtraSpaces (): Str {
    return new Str(
      this.value.replace(/\s+/g, ' ')
    )
  }

  /**
   * Convert the string to StudlyCase. StudlyCase is similar to camelCase
   * except that the first character is uppercase instead of lowercase.
   *
   * @returns {Str}
   */
  studly (): Str {
    return new Str(
      this.value.replace(/[_-]+/g, ' ')
    )
      .title()
      .strip()
  }

  /**
   * Returns the substring.
   *
   * @param {Number} start
   * @param {Number} length
   *
   * @returns {Str}
   */
  substr (start: number, length: number): Str {
    return new Str(
      this.value.substring(start, length)
    )
  }

  /**
   * Convert the string to title case.
   *
   * @returns {Str}
   */
  title (): Str {
    return new Str(
      this
        .lowercase()
        .split(' ')
        .filter(s => s)
        .map(s => s[0].toUpperCase() + s.slice(1))
        .join(' ')
    )
  }

  /**
   * Lowercases the string. Alias for `.lower()` and convenience
   * method to comply with the global String’s `.toLowerCase()`.
   *
   * @returns {Str}
   */
  toLowerCase (): Str {
    return new Str(
      this.value.toLowerCase()
    )
  }

  /**
   * Uppercases the string. Alias for `.upper()` and convenience
   * method to comply with the global String’s `.toUpperCase()`.
   *
   * @returns {Str}
   */
  toUpperCase (): Str {
    return new Str(
      this.value.toUpperCase()
    )
  }

  /**
   * Removes whitespace around the string, front and back when no argument
   * is present. It trims the given `characters` from the left and right
   * of the string if you pass along a value.
   *
   * @param {String} characters
   *
   * @returns {Str}
   */
  trim (characters: string = ''): Str {
    return this
      .ltrim(characters)
      .rtrim(characters)
  }

  /**
   * Uppercases the first character in the string.
   *
   * @returns {Str}
   */
  ucFirst (): Str {
    return new Str(
      this.value[0].toUpperCase() + this.value.slice(1)
    )
  }

  /**
   * Uppercases the string.
   *
   * @returns {Str}
   */
  upper (): Str {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string. Alias for `.upper()`.
   *
   * @returns {Str}
   */
  uppercase (): Str {
    return this.toUpperCase()
  }

  /**
   * Create a UUID (version 4).
   *
   * @returns {String}
   */
  uuid (): string {
    return uuidv4()
  }
}
