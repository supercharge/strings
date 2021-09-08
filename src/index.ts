'use strict'

import { Str } from './str'
import { StrContract } from './str-contract'

/**
 * Creates a new  providing chainable string operations. This new
 * instance clones the original string and works with the clone.
 * It won’t modify the original string value.
 *
 * @param value - `value` is the value being wrapped into an `Str` instance
 */
const strings: StrContract = function (value?: any): Str {
  return new Str(value)
}

/**
 * Create a UUID (version 4).
 */
strings.uuid = (): string => {
  return strings().uuid()
}

/**
 * Create a random, URL-friendly string. The default length will have 21 symbols.
 *
 * @param size - `[size=21]` defines the number of symbols in the random string
 */
strings.random = (size?: number): string => {
  return strings().random(size)
}

/**
 * Determine whether the given `input` is a string.
 *
 * @param input - the `input` value to check whether it’s a string
 */
strings.isString = (input?: any): input is string => {
  return strings().isString(input)
}

export = strings
