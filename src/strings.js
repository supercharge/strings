'use strict'

const Uuid = require('uuid/v4')
const Crypto = require('crypto')

class Strings {
  /**
   * Create a new String instance providing chainable string operations.
   * This instance clones the original string and works with the clone.
   * It won’t modify the original string.
   *
   * @param {String} string
   *
   * @returns {Strings}
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
   * @returns {Strings}
   */
  upper () {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string.
   *
   * @returns {Strings}
   */
  uppercase () {
    return this.toUpperCase()
  }

  /**
   * Uppercases the string. Alias for `.upper()`.
   *
   * @returns {Strings}
   */
  toUpperCase () {
    this.string = this.string.toUpperCase()

    return this
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
   * @returns {Strings}
   */
  lower () {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string.
   *
   * @returns {Strings}
   */
  lowercase () {
    return this.toLowerCase()
  }

  /**
   * Lowercases the string. Alias for `.lower()`.
   *
   * @returns {Strings}
   */
  toLowerCase () {
    this.string = this.string.toLowerCase()

    return this
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
   * @returns {Strings}
   */
  trim () {
    this.string = this.string.trim()

    return this
  }

  /**
   * Convert the string to title case.
   *
   * @returns {Strings}
   */
  title () {
    this.string = this.lowercase().get().replace(/(?:^|\s)\S/g, s => s.toUpperCase())

    return this
  }

  slug () {
    // TODO
  }

  camel () {
    // TODO
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
      random += Strings.alphabet[bytes[size] & 63]
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

module.exports = Strings
