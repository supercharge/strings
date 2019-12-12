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
    expect(Str('SUPERCHARGE').lowercase().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lowercase().get()).to.equal('supercharge')
  })

  it('isLowerCase()', async () => {
    expect(Str('supercharge').isLowerCase()).to.be.true()
    expect(Str('sUPERCHARGE').isLowerCase()).to.be.false()
    expect(Str('SUPERCHARGE').isLowerCase()).to.be.false()
  })

  it('trim()', async () => {
    expect(Str('  supercharge').trim().get()).to.equal('supercharge')
    expect(Str(' supercharge ').trim().get()).to.equal('supercharge')
    expect(Str('sUPERCHARGE  ').trim().get()).to.equal('sUPERCHARGE')
  })

  it('contains()', async () => {
    expect(Str('supercharge').contains('arge')).to.be.true()
    expect(Str('supercharge').contains('supercharge')).to.be.true()

    expect(Str('supercharge').contains('abc')).to.be.false()
    expect(Str('supercharge').contains('')).to.be.false()
  })

  it('length()', async () => {
    expect(Str('supercharge').length()).to.equal(11)
    expect(Str(' 123').length()).to.equal(4)
    expect(Str('').length()).to.equal(0)
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
