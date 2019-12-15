'use strict'

const Str = require('./str')

const strings = value => {
  return new Str(value)
}

module.exports = strings
module.exports.default = strings

module.exports.uuid = Str.uuid
module.exports.random = Str.random
