'use strict'

import { Str } from './str'

export interface StrContract {
  /**
   * Creates a new  providing chainable string operations. This new
   * instance clones the original string and works with the clone.
   * It won’t modify the original string value.
   *
   * @param value - `value` is the value being wrapped into an `Str` instance
   */
  (value?: any): Str

  /**
   * Create a UUID (version 4).
   */
  uuid (): string

  /**
   * Create a random, URL-friendly string. The default length will have 21 symbols.
   *
   * @param size - `[size=21]` defines the number of symbols in the random string
   */
  random (size?: number | undefined): string

  /**
   * Determine whether the given `input` is a string.
   *
   * @param input - the `input` value to check whether it’s a string
   */
  isString (input?: any): boolean
}
