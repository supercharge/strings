'use strict'

const Uuid = require('uuid')
const Crypto = require('crypto')

class Str {
  /**
   * Create a new String instance providing chainable string operations.
   * This instance clones the original string and works with the clone.
   * It won’t modify the original string.
   *
   * @param {String} value
   *
   * @returns {Str}
   */
  constructor (value) {
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
  static get alphabet () {
    return 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'
  }

  /**
   * Returns the string value.
   *
   * @returns {String}
   */
  get () {
    return this.toString()
  }

  /**
   * Returns the string value.
   *
   * @returns {String}
   */
  toString () {
    return this.value
  }

  /**
   * Convert the string to camelCase.
   *
   * @returns {Str}
   */
  camel () {
    return this.studly().lcFirst()
  }

  /**
   * Returns a string that contains the concatenation of two or more strings.
   *
   * @param {String|Array} strings
   *
   * @returns {Str}
   */
  concat (...strings) {
    strings = [].concat(...strings)

    return new Str(
      this.value.concat(...strings)
    )
  }

  /**
   * Determine whether the haystack contains the given `needle`.
   *
   * @param {*} needle
   *
   * @returns {Boolean}
   */
  contains (needle) {
    return this.includes(needle)
  }

  /**
   * Determine whether the string ends with the given `needle`.
   * Optionally, accepts a `length` used as the string length.
   *
   * @param {*} needle
   * @param {Number} length
   *
   * @returns {Boolean}
   */
  endsWith (needle, length) {
    return this.value.endsWith(needle, length)
  }

  /**
   * Determine whether the string equals the given `value`.
   *
   * @param {String} value
   *
   * @returns {Boolean}
   */
  equals (value) {
    return this.value === (value)
  }

  /**
   * Determine whether the given string contains the `needle`.
   *
   * @param {*} needle
   *
   * @returns {Boolean}
   */
  includes (needle) {
    return new Str(needle).isEmpty()
      ? false
      : this.value.includes(needle)
  }

  /**
   * Determine whether the given string is empty.
   *
   * @returns {Boolean}
   */
  isEmpty () {
    return this.value.length === 0
  }

  /**
   * Determine whether the string is lowercase.
   *
   * @returns {Boolean}
   */
  isLower () {
    return this.isLowercase()
  }

  /**
   * Determine whether the string is lowercase.
   *
   * @returns {Boolean}
   */
  isLowercase () {
    return this.value === this.lower().get()
  }

  /**
   * Determine whether the given string is not empty.
   *
   * @returns {Boolean}
   */
  isNotEmpty () {
    return !this.isEmpty()
  }

  /**
   * Determine whether the given string is uppercase.
   *
   * @returns {Boolean}
   */
  isUpper () {
    return this.isUppercase()
  }

  /**
   * Determine whether the given string is uppercase.
   *
   * @returns {Boolean}
   */
  isUppercase () {
    return this.value === this.upper().get()
  }

  /**
   * Lowercases the first character in the string.
   *
   * @returns {Str}
   */
  lcFirst () {
    return new Str(
      this.value[0].toLowerCase() + this.value.slice(1)
    )
  }

  /**
   * Returns the string’s length.
   *
   * @returns {Number}
   */
  length () {
    return this.value.length
  }

  /**
   * Lowercases the string.
   *
   * @returns {Str}
   */
  lower () {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string. Alias for `.lower()`.
   *
   * @returns {Str}
   */
  lowercase () {
    return this.toLowerCase()
  }

  /**
   * Removes the whitespace from the front of the string.
   *
   * @returns {Str}
   */
  ltrim () {
    return new Str(
      this.value.trimLeft()
    )
  }

  /**
   * Create a random, URL-friendly string. The default length will have 21 symbols.
   *
   * @param {Number} [size=21] number of symbols in string
   *
   * @returns {String}
   */
  random (size = 21) {
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
  replaceAll (search, replace) {
    const replacer = new RegExp(search, 'g')

    return new Str(
      this.value.replace(replacer, replace)
    )
  }

  /**
   * Removes the whitespace from the end of the string.
   *
   * @returns {Str}
   */
  rtrim () {
    return new Str(
      this.value.trimRight()
    )
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
  split (separator, limit) {
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
  startsWith (needle, position) {
    return this.value.startsWith(needle, position)
  }

  /**
   * Removes all whitespace from the string, everywhere.
   *
   * @returns {Str}
   */
  strip () {
    return new Str(
      this.value.replace(/\s+/g, '')
    )
  }

  /**
   * Convert the string to StudlyCase. StudlyCase is
   * similar to camelCase except that the first
   * character is uppercase instead of lowercase.
   *
   * @returns {Str}
   */
  studly () {
    return new Str(
      this.value.replace(/[_-]+/g, ' ')
    ).title().strip()
  }

  /**
   * Convert the string to title case.
   *
   * @returns {Str}
   */
  title () {
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
  toLowerCase () {
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
  toUpperCase () {
    return new Str(
      this.value.toUpperCase()
    )
  }

  /**
   * Removes whitespace around the string, front and back.
   *
   * @returns {Str}
   */
  trim () {
    return new Str(
      this.value.trim()
    )
  }

  /**
   * Uppercases the first character in the string.
   *
   * @returns {Str}
   */
  ucFirst () {
    return new Str(
      this.value[0].toUpperCase() + this.value.slice(1)
    )
  }

  /**
   * Uppercases the string.
   *
   * @returns {Str}
   */
  upper () {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string. Alias for `.upper()`.
   *
   * @returns {Str}
   */
  uppercase () {
    return this.toUpperCase()
  }

  /**
   * Create a UUID (version 4).
   *
   * @returns {String}
   */
  uuid () {
    return Uuid.v4()
  }
}

module.exports = Str
