'use strict'

const Str = require('./src/strings')

const strings = string => {
  return new Str(string)
}

module.exports = strings
module.exports.default = strings
