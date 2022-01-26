'use strict'

export interface RandomStringBuilder {
  length (size: number): this
  numbers (): this
  characters (): this
  symbols (): this
}

export type RandomStringBuilderCallback = (builder: RandomStringBuilder) => unknown
