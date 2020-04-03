'use strict'

const Str = require('..')
const Lab = require('@hapi/lab')
const { expect } = require('@hapi/code')

const { describe, it } = (exports.lab = Lab.script())

describe('Strings', () => {
  it('tbd', () => {
    expect(
      Str('supercharge').get()
    ).to.equal('supercharge')
  })

  it('upper()', () => {
    expect(Str('supercharge').upper().get()).to.equal('SUPERCHARGE')
    expect(Str('SuperchargE').upper().get()).to.equal('SUPERCHARGE')
  })

  it('uppercase()', () => {
    expect(Str('supercharge').uppercase().get()).to.equal('SUPERCHARGE')
    expect(Str('SuperchargE').uppercase().get()).to.equal('SUPERCHARGE')
  })

  it('isUpper()', () => {
    expect(Str('SUPERCHARGE').isUpper()).to.be.true()
    expect(Str('sUPERCHARGE').isUpper()).to.be.false()
    expect(Str('superchargE').isUpper()).to.be.false()
  })

  it('ucFirst()', () => {
    expect(Str('supercharge').ucFirst().get()).to.equal('Supercharge')
    expect(Str('sUPERCHARGE').ucFirst().get()).to.equal('SUPERCHARGE')
    expect(Str('sUPERCHARGE     IS AWESOME').ucFirst().get()).to.equal('SUPERCHARGE     IS AWESOME')
  })

  it('lower()', () => {
    expect(Str('SUPERCHARGE').lower().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lower().get()).to.equal('supercharge')
  })

  it('lowercase()', () => {
    expect(Str('SUPERCHARGE').lowercase().get()).to.equal('supercharge')
    expect(Str('SuperchargE').lowercase().get()).to.equal('supercharge')
  })

  it('isLower()', () => {
    expect(Str('supercharge').isLower()).to.be.true()
    expect(Str('sUPERCHARGE').isLower()).to.be.false()
    expect(Str('SUPERCHARGE').isLower()).to.be.false()
  })

  it('lcFirst()', () => {
    expect(Str('Supercharge').lcFirst().get()).to.equal('supercharge')
    expect(Str('SUPERCHARGE').lcFirst().get()).to.equal('sUPERCHARGE')
    expect(Str('SUPERCHARGE     IS AWESOME').lcFirst().get()).to.equal('sUPERCHARGE     IS AWESOME')
  })

  it('strip()', () => {
    expect(Str('supercharge is awesome').strip().get()).to.equal('superchargeisawesome')
    expect(Str('    supercharge IS aWesoME').strip().get()).to.equal('superchargeISaWesoME')
    expect(Str('SUPERCHARGE     IS AWESOME   ').strip().get()).to.equal('SUPERCHARGEISAWESOME')
  })

  it('title()', () => {
    expect(Str('supercharge is awesome').title().get()).to.equal('Supercharge Is Awesome')
    expect(Str('supercharge IS AWesoME').title().get()).to.equal('Supercharge Is Awesome')
    expect(Str('SUPERCHARGE IS AWESOME').title().get()).to.equal('Supercharge Is Awesome')
  })

  it('camel()', () => {
    expect(Str('supercharge is awesome').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').camel().get()).to.equal('superchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').camel().get()).to.equal('superchargeIsAwesome')
  })

  it('studly()', () => {
    expect(Str('supercharge is awesome').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').studly().get()).to.equal('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').studly().get()).to.equal('SuperchargeIsAwesome')
  })

  it('trim()', () => {
    expect(Str('  supercharge').trim().get()).to.equal('supercharge')
    expect(Str(' supercharge ').trim().get()).to.equal('supercharge')
    expect(Str('sUPERCHARGE  ').trim().get()).to.equal('sUPERCHARGE')
  })

  it('contains()', () => {
    expect(Str('supercharge').contains('arge')).to.be.true()
    expect(Str('supercharge').contains('supercharge')).to.be.true()

    expect(Str('supercharge').contains('abc')).to.be.false()
    expect(Str('supercharge').contains('')).to.be.false()
  })

  it('length()', () => {
    expect(Str('supercharge').length()).to.equal(11)
    expect(Str(' 123').length()).to.equal(4)
    expect(Str('').length()).to.equal(0)
  })

  it('isEmpty()', () => {
    expect(Str().isEmpty()).to.be.true()
    expect(Str('').isEmpty()).to.be.true()
    expect(Str(null).isEmpty()).to.be.true()
    expect(Str('Supercharge').isEmpty()).to.be.false()
  })

  it('isNotEmpty()', () => {
    expect(Str().isNotEmpty()).to.be.false()
    expect(Str('').isNotEmpty()).to.be.false()
    expect(Str(null).isNotEmpty()).to.be.false()
    expect(Str('Supercharge').isNotEmpty()).to.be.true()
  })

  it('uuid()', () => {
    expect(Str.uuid()).to.exist()
    expect(Str.uuid().split('-').length).to.equal(5)
  })

  it('split()', () => {
    expect(Str('Supercharge-is-awesome').split('-')).to.equal(['Supercharge', 'is', 'awesome'])
    expect(Str('Supercharge-is-awesome').split()).to.equal(['Supercharge-is-awesome'])
    expect(Str('Supercharge').split('-')).to.equal(['Supercharge'])
  })

  it('random()', () => {
    expect(Str.random()).to.exist()

    // default length is 21 chars
    expect(Str.random().length).to.equal(21)

    // supports a custom length
    expect(Str.random(50)).to.exist()
    expect(Str.random(50).length).to.equal(50)
  })

  it('replaceAll', () => {
    expect(
      Str('Supercharge Is Super Awesome').replaceAll(' ', '-').get()
    ).to.equal('Supercharge-Is-Super-Awesome')

    expect(
      Str('Supercharge is awesome').replaceAll('-', '/').get()
    ).to.equal('Supercharge is awesome')

    expect(
      Str('Supercharge is awesome')
        .title()
        .replaceAll(' ', '-')
        .camel()
        .get()
    ).to.equal('superchargeIsAwesome')
  })

  it('equals', () => {
    expect(Str('Supercharge').equals('Supercharge')).to.be.true()
    expect(Str('Super').equals('super')).to.be.false()
    expect(Str('Super').equals()).to.be.false()
  })

  it('startsWith', () => {
    expect(Str('Supercharge').startsWith('Super')).to.be.true()
    expect(Str('Supercharge').startsWith('super')).to.be.false()
    expect(Str('Super').startsWith('Super', 10)).to.be.false()
    expect(Str('Super').startsWith()).to.be.false()
  })

  it('endsWith', () => {
    expect(Str('Supercharge').endsWith('charge')).to.be.true()
    expect(Str('Supercharge').endsWith('Chare')).to.be.false()

    expect(Str('abc').endsWith('abc', 3)).to.be.true()
    expect(Str('abc').endsWith('abc', 4)).to.be.true()
    expect(Str('Supercharge').endsWith('charge', 5)).to.be.false()
    expect(Str('Super').endsWith()).to.be.false()
  })
})
