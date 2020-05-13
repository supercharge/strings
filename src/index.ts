'use strict'

import { Str } from './str'

/**
 * Create a new String instance providing chainable string operations.
 * This instance clones the original string and works with the clone.
 * It won’t modify the original string.
 *
 * @param {String} value
 *
 * @returns {Str}
 */
const strings = (value?: any): Str => {
  return new Str(value)
}

export default strings

/**
 * Create a UUID (version 4).
 *
 * @returns {String}
 */
export function uuid (): string {
  return strings().uuid()
}

/**
 * Create a random, URL-friendly string. The default length will have 21 symbols.
 *
 * @param {Number} [size=21] number of symbols in string
 *
 * @returns {String}
 */
export function random (size?: number): string {
  return strings().random(size)
}

/**
 * Determine whether the given `input` is a string.
 *
 * @param {*} input - the value to check if it’s a string
 *
 * @returns {Boolean}
 */
export function isString (input?: any): boolean {
  return strings().isString(input)
}
