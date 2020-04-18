'use strict'

const Str = require('./str')

const strings = value => {
  return new Str(value)
}

module.exports = strings
module.exports.default = strings

/**
 * Create a UUID (version 4).
 *
 * @returns {String}
 */
module.exports.uuid = () => {
  return strings().uuid()
}

/**
 * Create a random, URL-friendly string. The default length will have 21 symbols.
 *
 * @param {Number} [size=21] number of symbols in string
 *
 * @returns {String}
 */
module.exports.random = size => {
  return strings().random(size)
}
