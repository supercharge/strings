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

  it('isUpper()', async () => {
    expect(Str('SUPERCHARGE').isUpper()).to.be.true()
    expect(Str('sUPERCHARGE').isUpper()).to.be.false()
    expect(Str('superchargE').isUpper()).to.be.false()
  })

  it('lower()', async () => {
    expect(Str('SUPERCHARGE').lower().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lower().get()).to.equal('supercharge')
  })

  it('lowercase()', async () => {
    expect(Str('SUPERCHARGE').lowercase().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lowercase().get()).to.equal('supercharge')
  })

  it('isLower()', async () => {
    expect(Str('supercharge').isLower()).to.be.true()
    expect(Str('sUPERCHARGE').isLower()).to.be.false()
    expect(Str('SUPERCHARGE').isLower()).to.be.false()
  })

  it('lcFirst()', async () => {
    expect(Str('Supercharge').lcFirst().get()).to.equal('supercharge')
    expect(Str('SUPERCHARGE').lcFirst().get()).to.equal('sUPERCHARGE')
    expect(Str('SUPERCHARGE     IS AWESOME').lcFirst().get()).to.equal('sUPERCHARGE     IS AWESOME')
  })

  it('strip()', async () => {
    expect(Str('supercharge is awesome').strip().get()).to.equal('superchargeisawesome')
    expect(Str('    supercharge IS aWesoME').strip().get()).to.equal('superchargeISaWesoME')
    expect(Str('SUPERCHARGE     IS AWESOME   ').strip().get()).to.equal('SUPERCHARGEISAWESOME')
  })

  it('title()', async () => {
    expect(Str('supercharge is awesome').title().get()).to.equal('Supercharge Is Awesome')
    expect(Str('supercharge IS AWesoME').title().get()).to.equal('Supercharge Is Awesome')
    expect(Str('SUPERCHARGE IS AWESOME').title().get()).to.equal('Supercharge Is Awesome')
  })

  it('camel()', async () => {
    expect(Str('supercharge is awesome').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').camel().get()).to.equal('superchargeIsAwesome')
  })

  it('studly()', async () => {
    expect(Str('supercharge is awesome').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').studly().get()).to.equal('SuperchargeIsAwesome')
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
