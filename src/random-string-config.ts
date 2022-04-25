'use strict'

export class RandomStringConfig {
  /**
   * Stores the random string config.
   */
  private readonly config: {
    /**
     * Stores the length of the random string.
     */
    length: number

    /**
     * Determines whether to include characters in the random string.
     */
    characters: boolean

    /**
     * Determines whether to include numbers in the random string.
     */
    numbers: boolean

    /**
     * Determines whether to include symbols in the random string.
     */
    symbols: boolean
  }

  /**
   * Create a new instance.
   */
  constructor () {
    this.config = {
      length: 21,
      numbers: false,
      symbols: false,
      characters: false
    }
  }

  /**
   * Returns the configured string length.
   *
   * @returns {Number}
   */
  length (): number {
    return this.config.length
  }

  /**
   * Assign the given `length`.
   *
   * @param length
   *
   * @returns {this}
   */
  withLength (length: number): this {
    if (length) {
      this.config.length = length
    }

    return this
  }

  /**
   * Use characters when generating a random string.
   *
   * @returns {this}
   */
  useCharacters (): this {
    this.config.characters = true

    return this
  }

  /**
   * Determine whether to use characters when generating a random string.
   *
   * @returns {this}
   */
  shouldUseCharacters (): boolean {
    return this.config.characters
  }

  /**
   * Use numbers when generating a random string.
   *
   * @returns {this}
   */
  useNumbers (): this {
    this.config.numbers = true

    return this
  }

  /**
   * Determine whether to use numbers when generating a random string.
   *
   * @returns {this}
   */
  shouldUseNumbers (): boolean {
    return this.config.numbers
  }

  /**
   * Use symbols when generating a random string.
   *
   * @returns {this}
   */
  useSymbols (): this {
    this.config.symbols = true

    return this
  }

  /**
   * Determine whether to use numbers when generating a random string.
   *
   * @returns {this}
   */
  shouldUseSymbols (): boolean {
    return this.config.symbols
  }
}
