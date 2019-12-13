'use strict'

const Uuid = require('uuid/v4')
const Crypto = require('crypto')

class Str {
  /**
   * Create a new String instance providing chainable string operations.
   * This instance clones the original string and works with the clone.
   * It won’t modify the original string.
   *
   * @param {String} string
   *
   * @returns {Str}
   */
  constructor (string) {
    this.string = String(string).slice(0)
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
    return this.string
  }

  /**
   * Uppercases the string. Alias for `.uppercase()`.
   *
   * @returns {Str}
   */
  upper () {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string.
   *
   * @returns {Str}
   */
  uppercase () {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string. Alias for `.upper()`.
   *
   * @returns {Str}
   */
  toUpperCase () {
    return new Str(
      this.string.toUpperCase()
    )
  }

  /**
   * Determine whether the given string is uppercase.
   *
   * @returns {Boolean}
   */
  isUpperCase () {
    return this.string === this.upper().get()
  }

  /**
   * Lowercases the string. Alias for `.lowercase()`.
   *
   * @returns {Str}
   */
  lower () {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string.
   *
   * @returns {Str}
   */
  lowercase () {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string. Alias for `.lower()`.
   *
   * @returns {Str}
   */
  toLowerCase () {
    return new Str(
      this.string.toLowerCase()
    )
  }

  /**
   * Lowercases the first character in the string.
   *
   * @returns {Str}
   */
  lcFirst () {
    return new Str(
      this.string[0].toLowerCase() + this.string.slice(1)
    )
  }

  /**
   * Determine whether the string is lowercase.
   *
   * @returns {Boolean}
   */
  isLowerCase () {
    return this.string === this.lower().get()
  }

  /**
   * Removes whitespace around the string, front and back.
   *
   * @returns {Str}
   */
  trim () {
    return new Str(
      this.string.trim()
    )
  }

  /**
   * Removes all whitespace from the string, everywhere.
   *
   * @returns {Str}
   */
  strip () {
    return new Str(
      this.string.replace(/\s+/g, '')
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
    return this.string.split(separator, limit)
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

  slug () {
    // TODO
  }

  camel () {
    return new Str(
      this.studly().lcFirst().get()
    )
  }

  studly () {
    return new Str(
      this.string.replace(/[_-]+/g, ' ')
    ).title().strip()
  }

  /**
   * Create a UUID (version 4).
   *
   * @returns {String}
   */
  static uuid () {
    return Uuid()
  }

  /**
   * Create a random, URL-friendly string. The default length will have 21 symbols.
   *
   * @param {Number} [size=21] number of symbols in string
   *
   * @returns {String}
   */
  static random (size = 21) {
    const bytes = Crypto.randomBytes(size)
    let random = ''

    while (size--) {
      random += Str.alphabet[bytes[size] & 63]
    }

    return random
  }

  /**
   * Determine whether the string contains the given `haystack`.
   *
   * @param {*} haystack
   *
   * @returns {Boolean}
   */
  contains (haystack) {
    return this.includes(haystack)
  }

  /**
   * Determine whether the string contains the given `haystack`.
   *
   * @param {*} haystack
   *
   * @returns {Boolean}
   */
  includes (haystack) {
    return haystack === ''
      ? false
      : this.string.includes(haystack)
  }

  /**
   * Returns the string’s length.
   *
   * @returns {Number}
   */
  length () {
    return this.string.length
  }
}

module.exports = Str
