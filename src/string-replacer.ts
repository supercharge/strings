'use strict'

import { Str } from './str'

export class StringReplacer {
  /**
   * Stores the Str instance.
   */
  private readonly strings: Str

  /**
   * Stores the "search" value.
   */
  private readonly searchValue: string | RegExp

  /**
   * Determine whether to replace all occurences.
   */
  private shouldReplaceAll: boolean

  /**
   * Determine whether to replace the last occurence.
   */
  private shouldReplaceLast: boolean

  /**
   * Create a new string replacer instance.
   */
  constructor (Strings: Str, searchValue: string | RegExp) {
    this.strings = Strings
    this.searchValue = searchValue

    this.shouldReplaceAll = false
    this.shouldReplaceLast = false
  }

  /**
   * Replace all occurences of the search value.
   *
   * @returns {this}
   */
  all (): this {
    this.shouldReplaceAll = true

    return this
  }

  /**
   * Replace the last occurence of the search value.
   *
   * @returns {this}
   */
  last (): this {
    this.shouldReplaceLast = true

    return this
  }

  /**
   * Replace the search value with the given `replaceValue`.
   *
   * @param replaceValue
   *
   * @returns {Str}
   */
  with (replaceValue: string): Str
  with (replaceValue: string): Str
  with (replacer: (substring: string, ...args: any[]) => string): Str
  with (replacer: any): Str {
    switch (true) {
      case this.shouldReplaceAll:
        return this.strings.replaceAll(this.searchValue, replacer)

      case this.shouldReplaceLast:
        return this.strings.replaceLast(this.searchValue, replacer)

      default:
        return this.strings.replace(this.searchValue, replacer)
    }
  }
}
