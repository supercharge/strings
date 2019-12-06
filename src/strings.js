'use strict'

class Strings {
  /**
   * Create a new String instance providing
   * various, chainable string operations.
   *
   * @param {String} string
   *
   * @returns {Strings}
   */
  constructor (string) {
    this.string = string
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

  upper () {
    return this.toUpperCase()
  }

  toUpperCase () {
    return this.string.toUpperCase()
  }

  isUpperCase () {
    return this.string === this.upper()
  }

  localeUpper () {
    return this.toLocaleUpperCase()
  }

  toLocaleUpperCase () {
    return this.string.toLocaleUpperCase()
  }

  lower () {
    return this.toLowerCase()
  }

  toLowerCase () {
    return this.string.toLowerCase()
  }

  isLowerCase () {
    return this.string === this.lower()
  }

  localeLower () {
    return this.toLocaleLowerCase()
  }

  toLocaleLowerCase () {
    return this.string.toLocaleLowerCase()
  }

  trim () {
    // TODO
  }

  title () {
    // TODO
  }

  slug () {
    // TODO
  }

  camel () {
    // TODO
  }

  uuid () {
    // TODO
  }

  contains (haystack) {
    return this.includes(haystack)
  }

  includes (haystack) {
    return this.string.includes(haystack)
  }

  length () {
    return this.string.length
  }
}

module.exports = Strings
