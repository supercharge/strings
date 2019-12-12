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

  it('upper()', async () => {
    expect(Str('supercharge').upper().get()).to.equal('SUPERCHARGE')
    expect(Str('SuperchargE').upper().get()).to.equal('SUPERCHARGE')
  })

  it('uppercase()', async () => {
    expect(Str('supercharge').uppercase().get()).to.equal('SUPERCHARGE')
    expect(Str('SuperchargE').uppercase().get()).to.equal('SUPERCHARGE')
  })

  it('isUpperCase()', async () => {
    expect(Str('SUPERCHARGE').isUpperCase()).to.be.true()
    expect(Str('sUPERCHARGE').isUpperCase()).to.be.false()
    expect(Str('superchargE').isUpperCase()).to.be.false()
  })

  it('lower()', async () => {
    expect(Str('SUPERCHARGE').lower().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lower().get()).to.equal('supercharge')
  })

  it('lowercase()', async () => {
    expect(Str('SUPERCHARGE').lower().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lower().get()).to.equal('supercharge')
  })

  it('isLowerCase()', async () => {
    expect(Str('supercharge').isLowerCase()).to.be.true()
    expect(Str('sUPERCHARGE').isLowerCase()).to.be.false()
    expect(Str('SUPERCHARGE').isLowerCase()).to.be.false()
  })

  it('uuid()', async () => {
    expect(Str.uuid()).to.exist()
    expect(Str.uuid().split('-').length).to.equal(5)
  })

  it('random()', async () => {
    expect(Str.random()).to.exist()

    // default length is 21 chars
    expect(Str.random().length).to.equal(21)

    // supports a custom length
    expect(Str.random(50)).to.exist()
    expect(Str.random(50).length).to.equal(50)
  })
})
