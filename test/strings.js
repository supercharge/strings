'use strict'

const Str = require('..')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('Strings', () => {
  it('tbd', async () => {
    expect(
      Str('supercharge').get()
    ).to.equal('supercharge')
  })
})
