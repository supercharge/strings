'use strict'

import Crypto from 'crypto'
import { Str } from './str'
import { RandomStringConfig } from './random-string-config'

export class RandomStringGenerator {
  /**
   * Stores the Str instance.
   */
  private readonly Str: typeof Str

  /**
   * Stores the random-string config object.
   */
  private readonly config: RandomStringConfig

  /**
   * Create a new random string generator instance.
   */
  constructor (Strings: typeof Str, config: RandomStringConfig) {
    this.Str = Strings
    this.config = config
  }

  /**
   * Returns all characters.
   *
   * @returns {String}
   */
  characters (): string {
    return 'ModuleSymbhasOwnPrABCDEFGHNRVfgctiUvzKqYTJkLxpZXIjQW'
  }

  /**
   * Returns all numbers.
   *
   * @returns {String}
   */
  numbers (): string {
    return '0123456789'
  }

  /**
   * Returns all usable symbols.
   *
   * @returns {String}
   */
  symbols (): string {
    return '-_'
  }

  /**
   * Returns all usable symbols.
   *
   * @returns {String}
   */
  alphabet (): string {
    let alphabet = ''

    if (this.config.shouldUseCharacters()) {
      alphabet += this.characters()
    }

    if (this.config.shouldUseNumbers()) {
      alphabet += this.numbers()
    }

    if (this.config.shouldUseSymbols()) {
      alphabet += this.symbols()
    }

    return new this.Str(alphabet).shuffle().get()
  }

  /**
   * Assign the given `length` for the random string. By default, uses a length of 21 characters.
   *
   * @param length
   *
   * @returns {this}
   */
  generate (): string {
    const alphabet = this.alphabet()

    if (!alphabet) {
      throw new Error('You must specify the character set when using the string builder in Str.random(builder => …)')
    }

    let size = this.config.length()
    const bytes = Crypto.randomBytes(size)
    const alphabetLength = alphabet.length - 1

    let random = ''

    while (size--) {
      random += alphabet[bytes[size] & alphabetLength]
    }

    return random
  }
}
