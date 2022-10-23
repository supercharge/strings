'use strict'

import { RandomStringConfig } from './random-string-config'
import { RandomStringBuilder as RandomStringBuilderContract } from './contracts'

export class RandomStringBuilder implements RandomStringBuilderContract {
  /**
   * Stores the random string config.
   */
  private readonly config: RandomStringConfig

  /**
   * Create a new random string builder instance.
   */
  constructor (config: RandomStringConfig) {
    this.config = config
  }

  /**
   * Assign the given `length` for the random string. By default, uses a length of 21 characters.
   *
   * @param length
   *
   * @returns {this}
   */
  length (length: number): this {
    this.config.withLength(length)

    return this
  }

  /**
   * Use numbers when generating a random string.
   *
   * @returns {this}
   */
  characters (): this {
    this.config.useCharacters()

    return this
  }

  /**
   * Use numbers when generating a random string.
   *
   * @returns {this}
   */
  numbers (): this {
    this.config.useNumbers()

    return this
  }

  /**
   * Use symbols when generating a random string.
   *
   * @returns {this}
   */
  symbols (): this {
    this.config.useSymbols()

    return this
  }
}
