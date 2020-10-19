'use strict'

import Crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export class Str {
  /**
   * The string value to work with.
   */
  private readonly value: string

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
  append (...values: string[]): Str {
    return new Str(this.value + values.join(''))
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
   * Determine whether the haystack contains the given `needle`.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  contains (needle: string): boolean {
    return this.includes(needle)
  }

  /**
   * Determine whether the haystack contains all items if the `needles` array.
   *
   * @param {String} needle
   *
   * @returns {Boolean}
   */
  containsAll (needles: string[]): boolean {
    for (const needle of ([] as string[]).concat(needles)) {
      if (this.notContains(needle)) {
        return false
      }
    }

    return true
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
   * Determine whether the given string contains the `needle`.
   *
   * @param {*} needle
   *
   * @returns {Boolean}
   */
  includes (needle: any): boolean {
    return new Str(needle).isEmpty()
      ? false
      : this.value.includes(needle)
  }

  /**
   * Determine whether the given string is empty.
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.value.length === 0
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
  kebab (): Str {
    return new Str(
      this.value.replace(/[_-\s]+/g, '-')
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
    return limit >= this.length()
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

    if (this.value.startsWith(characters)) {
      return new Str(
        this.value.substring(characters.length)
      )
    }

    return new Str(this.value)
  }

  /**
   * Right pad the current string till it reaches the given length
   * @param {Number} length
   * @param {String} pad
   * @returns {Str}
   */
  padRight (length: number, pad: string): Str {
    let curStr = this.value
    const gap = length - curStr.length

    if (gap > 0 && pad.length) {
      const mod = Math.ceil(gap / pad.length)
      pad = pad.repeat(mod)

      // select pad string from the last till required length
      curStr += pad.substr(0, gap)
    }
    return new Str(curStr)
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
  prepend (...values: string[]): Str {
    return new Str(values.join('') + this.value)
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

    if (this.value.endsWith(characters)) {
      return new Str(
        this.value.substring(-characters.length, this.value.length - characters.length)
      )
    }

    return new Str(this.value)
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
   * Removes all numbers from the string.
   *
   * @returns {Str}
   */
  stripNums (): Str {
    return this.replaceAll(/\d+/, '')
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
}
