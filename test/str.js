'use strict'

const Path = require('path')
const { test } = require('uvu')
const Fs = require('fs/promises')
const { Str } = require('../dist')
const { expect } = require('expect')

test('get', () => {
  expect(Str('supercharge').get()).toEqual('supercharge')
})

test('after', () => {
  expect(Str('marcus').after('mar').get()).toEqual('cus')
  expect(Str('super-charge').after('-').get()).toEqual('charge')
  expect(Str('su-per-charge').after('-').get()).toEqual('per-charge')

  expect(Str('supercharge').after('xxx').get()).toEqual('supercharge')
  expect(Str('supercharge').after('').get()).toEqual('supercharge')

  expect(Str('super0charge').after('0').get()).toEqual('charge')
  expect(Str('super0charge').after(0).get()).toEqual('charge')
  expect(Str('super2charge').after(2).get()).toEqual('charge')

  expect(Str('Supercharge').after('awesome').get()).toEqual('Supercharge')
  expect(Str('Supercharge is awesome').after('is').get()).toEqual(' awesome')
})

test('afterLast', () => {
  expect(Str('marcus').afterLast('c').get()).toEqual('us')
  expect(Str('super-charge').afterLast('-').get()).toEqual('charge')
  expect(Str('su-per-charge').afterLast('-').get()).toEqual('charge')

  expect(Str('supercharge').afterLast('xxx').get()).toEqual('supercharge')
  expect(Str('supercharge').afterLast('').get()).toEqual('supercharge')

  expect(Str('super0charge').afterLast('0').get()).toEqual('charge')
  expect(Str('super0charge').afterLast(0).get()).toEqual('charge')
  expect(Str('super2charge').afterLast(2).get()).toEqual('charge')
})

test('append', () => {
  expect(Str().append().get()).toEqual('')
  expect(Str().append(null).get()).toEqual('')

  expect(Str('supercharge').append().get()).toEqual('supercharge')
  expect(Str('supercharge').append(null).get()).toEqual('supercharge')

  expect(Str('supercharge is').append(' awesome').get()).toEqual('supercharge is awesome')
  expect(Str('supercharge').append(' is', ' awesome').get()).toEqual('supercharge is awesome')
  expect(Str('supercharge').append([' is', ' awesome']).get()).toEqual('supercharge is awesome')
})

test('before', () => {
  expect(Str('marcus').before('cus').get()).toEqual('mar')
  expect(Str('super-charge').before('-').get()).toEqual('super')
  expect(Str('su-per-charge').before('-').get()).toEqual('su')

  expect(Str('supercharge').before('xxx').get()).toEqual('supercharge')
  expect(Str('supercharge').before('').get()).toEqual('supercharge')
  expect(Str('supercharge').before().get()).toEqual('supercharge')

  expect(Str('super0charge').before('0').get()).toEqual('super')
  expect(Str('super0charge').before(0).get()).toEqual('super')
  expect(Str('super2charge').before(2).get()).toEqual('super')

  expect(Str('Supercharge').before('awesome').get()).toEqual('Supercharge')
  expect(Str('Supercharge is awesome').before('is').get()).toEqual('Supercharge ')
})

test('beforeLast', () => {
  expect(Str('marcus').beforeLast('cus').get()).toEqual('mar')
  expect(Str('super-charge').beforeLast('-').get()).toEqual('super')
  expect(Str('su-per-charge').beforeLast('-').get()).toEqual('su-per')

  expect(Str('supercharge').beforeLast('xxx').get()).toEqual('supercharge')
  expect(Str('supercharge').beforeLast('').get()).toEqual('supercharge')

  expect(Str('super0charge').beforeLast('0').get()).toEqual('super')
  expect(Str('super0charge').beforeLast(0).get()).toEqual('super')
  expect(Str('super2charge').beforeLast(2).get()).toEqual('super')
})

test('upper', () => {
  expect(Str('supercharge').upper().get()).toEqual('SUPERCHARGE')
  expect(Str('SuperchargE').upper().get()).toEqual('SUPERCHARGE')
})

test('uppercase', () => {
  expect(Str('supercharge').uppercase().get()).toEqual('SUPERCHARGE')
  expect(Str('SuperchargE').uppercase().get()).toEqual('SUPERCHARGE')
})

test('isUpper', () => {
  expect(Str().isUpper()).toBe(true)
  expect(Str('').isUpper()).toBe(true)
  expect(Str(null).isUpper()).toBe(true)
  expect(Str(undefined).isUpper()).toBe(true)

  expect(Str('SUPERCHARGE').isUpper()).toBe(true)
  expect(Str('sUPERCHARGE').isUpper()).toBe(false)
  expect(Str('superchargE').isUpper()).toBe(false)
})

test('ucFirst', () => {
  expect(Str().ucFirst().get()).toEqual('')
  expect(Str('').ucFirst().get()).toEqual('')
  expect(Str(null).ucFirst().get()).toEqual('')

  expect(Str('a').ucFirst().get()).toEqual('A')
  expect(Str('ab').ucFirst().get()).toEqual('Ab')
  expect(Str('AB').ucFirst().get()).toEqual('AB')

  expect(Str('supercharge').ucFirst().get()).toEqual('Supercharge')
  expect(Str('sUPERCHARGE').ucFirst().get()).toEqual('SUPERCHARGE')
  expect(Str('sUPERCHARGE     IS AWESOME').ucFirst().get()).toEqual('SUPERCHARGE     IS AWESOME')
})

test('lower', () => {
  expect(Str('SUPERCHARGE').lower().get()).toEqual('supercharge')
  expect(Str('SuperchargE').lower().get()).toEqual('supercharge')
})

test('lowercase', () => {
  expect(Str('SUPERCHARGE').lowercase().get()).toEqual('supercharge')
  expect(Str('SuperchargE').lowercase().get()).toEqual('supercharge')
})

test('isLower', () => {
  expect(Str().isLower()).toBe(true)
  expect(Str('').isLower()).toBe(true)
  expect(Str(null).isLower()).toBe(true)
  expect(Str(undefined).isLower()).toBe(true)
  expect(Str('123').isLower()).toBe(true)
  expect(Str('supercharge').isLower()).toBe(true)
  expect(Str('super_charge').isLower()).toBe(true)

  expect(Str('sUPERCHARGE').isLower()).toBe(false)
  expect(Str('SUPERCHARGE').isLower()).toBe(false)
})

test('isLowerLetters', () => {
  expect(Str('supercharge').isLowerLetters()).toBe(true)
  expect(Str('super_charge').isLowerLetters()).toBe(true)

  expect(Str().isLowerLetters()).toBe(false)
  expect(Str('').isLowerLetters()).toBe(false)
  expect(Str(null).isLowerLetters()).toBe(false)
  expect(Str(undefined).isLowerLetters()).toBe(false)
  expect(Str('123').isLowerLetters()).toBe(false)
  expect(Str('sUPERCHARGE').isLowerLetters()).toBe(false)
  expect(Str('SUPERCHARGE').isLowerLetters()).toBe(false)
})

test('lcFirst', () => {
  expect(Str().lcFirst().get()).toEqual('')
  expect(Str('').lcFirst().get()).toEqual('')
  expect(Str(null).lcFirst().get()).toEqual('')

  expect(Str('A').lcFirst().get()).toEqual('a')
  expect(Str('ab').lcFirst().get()).toEqual('ab')
  expect(Str('AB').lcFirst().get()).toEqual('aB')

  expect(Str('Supercharge').lcFirst().get()).toEqual('supercharge')
  expect(Str('SUPERCHARGE').lcFirst().get()).toEqual('sUPERCHARGE')
  expect(Str('SUPERCHARGE     IS AWESOME').lcFirst().get()).toEqual('sUPERCHARGE     IS AWESOME')
})

test('strip', () => {
  expect(Str('supercharge is awesome').strip().get()).toEqual('superchargeisawesome')
  expect(Str('    supercharge IS aWesoME').strip().get()).toEqual('superchargeISaWesoME')
  expect(Str('SUPERCHARGE     IS AWESOME   ').strip().get()).toEqual('SUPERCHARGEISAWESOME')
})

test('stripNums', () => {
  expect(Str('supercharge 123 is awesome').stripNums().get()).toEqual('supercharge  is awesome')
  expect(Str('5up3rch4rge 12 awes0me 6789').stripNums().get()).toEqual('uprchrge  awesme ')
})

test('stripHtml', () => {
  expect(Str().stripHtml().get()).toEqual('')
  expect(Str('').stripHtml().get()).toEqual('')
  expect(Str('<p></p>').stripHtml().get()).toEqual('')
  expect(Str('<p>App.basePath()</p>').stripHtml().slug().get()).toEqual('app.basepath()')
  expect(Str('<div><p>Hey <span>Supercharge</span></p></div>').stripHtml().get()).toEqual('Hey Supercharge')
  expect(Str('<div><p>Hey <span>Supercharge</span></p></div>').stripHtml().slug().get()).toEqual('hey-supercharge')
})

test('stripExtraSpaces', () => {
  expect(Str('').stripExtraSpaces().get()).toEqual('')
  expect(Str('    Supercharge  is   awesome  ').stripExtraSpaces().get()).toEqual(' Supercharge is awesome ')
  expect(Str('supercharge 123 is awesome').stripNums().stripExtraSpaces().get()).toEqual('supercharge is awesome')
})

test('squish', () => {
  expect(Str('').squish().get()).toEqual('')
  expect(Str('    Supercharge  is   awesome  ').squish().get()).toEqual('Supercharge is awesome')
  expect(Str('supercharge 123 is awesome').stripNums().squish().get()).toEqual('supercharge is awesome')
  expect(Str('supercharge\t\tis\n\nawesome').squish().get()).toEqual('supercharge is awesome')
  expect(Str(`
    supercharge
    is
    awesome`).squish().get()).toEqual('supercharge is awesome')
})

test('title', () => {
  expect(Str().title().get()).toEqual('')
  expect(Str('Title').title().get()).toEqual('Title')

  expect(Str('keep NASA capitalized').title().get()).toEqual('Keep NASA Capitalized')
  expect(Str('keep *asteriskS arounD wordS*').title().get()).toEqual('Keep *Asterisks Around Words*')
  expect(Str('keep *asterisks around words*').title().get()).toEqual('Keep *Asterisks Around Words*')
  expect(Str('keep _underscores around words_').title().get()).toEqual('Keep _Underscores Around Words_')

  expect(Str('Supercharge. awesome.').title().get()).toEqual('Supercharge. Awesome.')
  expect(Str('supercharge is awesome').title().get()).toEqual('Supercharge Is Awesome')
  expect(Str('supercharge Is AWesoME').title().get()).toEqual('Supercharge Is Awesome')
  expect(Str('SUPERCHARGE IS AWESOME').title().get()).toEqual('SUPERCHARGE IS AWESOME')

  expect(Str('superchargeIsAwesome').title().get()).toEqual('Superchargeisawesome')
})

test('camel', () => {
  expect(Str('supercharge').camel().get()).toEqual('supercharge')
  expect(Str('superCharge').camel().get()).toEqual('superCharge')
  expect(Str('supercharge is awesome').camel().get()).toEqual('superchargeIsAwesome')
  expect(Str('SUPERCHARGE IS AWESOME').camel().get()).toEqual('superchargeIsAwesome')
  expect(Str('SUPERCHARGE-IS-AWESOME').camel().get()).toEqual('superchargeIsAwesome')
  expect(Str('supercharge_IS_AwesoMe').camel().get()).toEqual('superchargeIsAwesoMe')
  expect(Str('SUPERCHARGE_is_AWESOME').camel().get()).toEqual('superchargeIsAwesome')
  expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').camel().get()).toEqual('superchargeIsAwesome')
})

test('camel should handle acronyms', () => {
  expect(Str('superCHARGE').camel().get()).toEqual('superCharge')
  expect(Str('super CHARGE').camel().get()).toEqual('superCharge')
  expect(Str('super_charge').camel().get()).toEqual('superCharge')
  expect(Str('super-charge').camel().get()).toEqual('superCharge')

  expect(Str('XMLHttpRequest').camel().get()).toEqual('xmlHttpRequest')
  expect(Str('XmlHTTPRequest').camel().get()).toEqual('xmlHttpRequest')
})

test('studly / pascal', () => {
  expect(Str('User_Model').pascal().get()).toEqual('UserModel')
  expect(Str('XMLHttpRequest').pascal().get()).toEqual('XmlHttpRequest')
  expect(Str('XmlHTTPRequest').pascal().get()).toEqual('XmlHttpRequest')
  expect(Str('thisIsInCamelCase').pascal().get()).toEqual('ThisIsInCamelCase')
  expect(Str('supercharge is awesome').pascal().get()).toEqual('SuperchargeIsAwesome')
  expect(Str('SUPERCHARGE IS AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
  expect(Str('SUPERCHARGE-IS-AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
  expect(Str('supercharge_IS_AWesoME').pascal().get()).toEqual('SuperchargeIsAWesoMe')
  expect(Str('supercharge_IS_AweSoME').pascal().get()).toEqual('SuperchargeIsAweSoMe')
  expect(Str('SUPERCHARGE_is_AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
  expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
})

test('trim', () => {
  expect(Str('  supercharge').trim().get()).toEqual('supercharge')
  expect(Str(' supercharge ').trim().get()).toEqual('supercharge')
  expect(Str('sUPERCHARGE  ').trim().get()).toEqual('sUPERCHARGE')
  expect(Str('/supercharge/').trim('/').get()).toEqual('supercharge')
  expect(Str('/supercharge/').trim('abc').get()).toEqual('/supercharge/')
})

test('contains', () => {
  expect(Str('supercharge').contains('arge')).toBe(true)
  expect(Str('supercharge').contains('supercharge')).toBe(true)
  expect(Str('Supercharge is awesome').contains('is', 'awesome')).toBe(true)
  expect(Str('Supercharge is awesome').contains(['is', 'awesome'])).toBe(true)

  expect(Str('supercharge').contains('')).toBe(false)
  expect(Str('supercharge').contains('abc')).toBe(false)
  expect(Str('supercharge').contains('Supercharge')).toBe(false)
})

test('containsAll', () => {
  expect(Str('supercharge is awesome').containsAll('supercharge')).toBe(true)
  expect(Str('supercharge is awesome').containsAll(['supercharge'])).toBe(true)
  expect(Str('supercharge is awesome').containsAll('is', 'awesome')).toBe(true)
  expect(Str('supercharge is awesome').containsAll(['is', 'awesome'])).toBe(true)

  expect(Str('supercharge is awesome').containsAll('')).toBe(false)
  expect(Str('supercharge is awesome').containsAll(['', 'is'])).toBe(false)
  expect(Str('supercharge is awesome').containsAll(['supercharge', 'bad'])).toBe(false)
})

test('notContains', () => {
  expect(Str('supercharge').notContains('')).toBe(true)
  expect(Str('supercharge').notContains('sub')).toBe(true)
  expect(Str('supercharge').notContains('charger')).toBe(true)

  expect(Str('supercharge').notContains('super')).toBe(false)
})

test('notIncludes', () => {
  expect(Str('supercharge').notIncludes('')).toBe(true)
  expect(Str('supercharge').notIncludes('sub')).toBe(true)
  expect(Str('supercharge').notIncludes('charger')).toBe(true)

  expect(Str('supercharge').notIncludes('super')).toBe(false)
})

test('length', () => {
  expect(Str('supercharge').length()).toEqual(11)
  expect(Str(' 123').length()).toEqual(4)
  expect(Str('').length()).toEqual(0)
})

test('hasLength', () => {
  expect(Str().hasLength(0)).toBe(true)
  expect(Str('').hasLength(0)).toBe(true)
  expect(Str(null).hasLength(0)).toBe(true)
  expect(Str(' super ').hasLength(7)).toBe(true)

  expect(Str('super').hasLength(2)).toBe(false)
})

test('isEmpty', () => {
  expect(Str().isEmpty()).toBe(true)
  expect(Str('').isEmpty()).toBe(true)
  expect(Str(null).isEmpty()).toBe(true)

  expect(Str(true).isEmpty()).toBe(false)
  expect(Str(false).isEmpty()).toBe(false)
  expect(Str('Supercharge').isEmpty()).toBe(false)
})

test('isNotEmpty', () => {
  expect(Str().isNotEmpty()).toBe(false)
  expect(Str('').isNotEmpty()).toBe(false)
  expect(Str(null).isNotEmpty()).toBe(false)

  expect(Str(true).isNotEmpty()).toBe(true)
  expect(Str(false).isNotEmpty()).toBe(true)
  expect(Str('Supercharge').isNotEmpty()).toBe(true)
})

test('uuid', () => {
  expect(Str.uuid).toBeInstanceOf(Function)
  expect(Str.uuid().split('-').length).toEqual(5)
})

test('split', () => {
  expect(Str('Supercharge-is-awesome').split('-')).toEqual(['Supercharge', 'is', 'awesome'])
  expect(Str('Supercharge-is-awesome').split()).toEqual(['Supercharge-is-awesome'])
  expect(Str('Supercharge').split('-')).toEqual(['Supercharge'])
})

test('random', () => {
  expect(Str.random())
  expect(Str.random(null))

  // default length is 21 chars
  expect(Str.random().length).toEqual(21)
  expect(Str.random(50).length).toEqual(50)

  expect(() => Str.random(use => use.length(3))).toThrow()
  expect(Str.random(use => use.length(3).characters()).length).toEqual(3)

  expect(Str.random(builder => builder.length(10).numbers()).length).toBe(10)
  const onlyNumbers = /^\d+$/.test(Str.random(builder => builder.length().numbers()))
  expect(onlyNumbers).toBe(true)

  const symbols = Str.random(builder => builder.length(30).symbols())
  expect(Str(symbols).includesAll('-', '_')).toBe(true)
})

test('replaceAll', () => {
  expect(
    Str('Supercharge Is Super Awesome').replaceAll().with().get()
  ).toEqual('Supercharge Is Super Awesome')

  expect(
    Str('Supercharge Is Super Awesome').replaceAll(' ', '-').get()
  ).toEqual('Supercharge-Is-Super-Awesome')

  expect(
    Str('Supercharge is awesome').replaceAll('-', '/').get()
  ).toEqual('Supercharge is awesome')

  expect(
    Str('Supercharge is awesome')
      .title()
      .replaceAll(' ', '-')
      .camel()
      .get()
  ).toEqual('superchargeIsAwesome')

  expect(
    Str('super super super super.').replace('super').all().with('charge').get()
  ).toEqual('charge charge charge charge.')
})

test('equals', () => {
  expect(Str().equals('')).toBe(true)
  expect(Str('').equals('')).toBe(true)
  expect(Str(null).equals('')).toBe(true)
  expect(Str('Supercharge').equals('Supercharge')).toBe(true)

  expect(Str('Super').equals()).toBe(false)
  expect(Str('Super').equals('super')).toBe(false)
})

test('equals Str instance', () => {
  expect(Str().equals(Str(''))).toBe(true)
  expect(Str('').equals(Str(''))).toBe(true)
  expect(Str(null).equals(Str(''))).toBe(true)
  expect(Str('Supercharge').equals(Str('Supercharge'))).toBe(true)

  expect(Str('Super').equals(Str())).toBe(false)
  expect(Str('Super').equals(Str('super'))).toBe(false)
})

test('equalsIgnoreCase', () => {
  expect(Str().equalsIgnoreCase()).toBe(true)
  expect(Str('').equalsIgnoreCase()).toBe(true)

  expect(Str('SUPER').equalsIgnoreCase('SUPER')).toBe(true)
  expect(Str('SUPER').equalsIgnoreCase('super')).toBe(true)
  expect(Str('SuPeRcHaRgE').equalsIgnoreCase('sUpErChArGe')).toBe(true)

  expect(Str('Super').equalsIgnoreCase()).toBe(false)
  expect(Str('SuPeR').equalsIgnoreCase('sUpErChArGe')).toBe(false)
  expect(Str('SUPERCHARGE').equalsIgnoreCase('SLOWCHARGE')).toBe(false)
})

test('notEquals', () => {
  expect(Str('Super').notEquals()).toBe(true)
  expect(Str('Super').notEquals('super')).toBe(true)

  expect(Str('Supercharge').notEquals('Supercharge')).toBe(false)
})

test('startsWith', () => {
  expect(Str('Supercharge').startsWith('Super')).toBe(true)
  expect(Str('Supercharge').startsWith('charge', 5)).toBe(true)

  expect(Str('Supercharge').startsWith('super')).toBe(false)
  expect(Str('Super').startsWith('Super', 10)).toBe(false)
  expect(Str('Super').startsWith()).toBe(false)
})

test('endsWith', () => {
  expect(Str('Supercharge').endsWith('charge')).toBe(true)
  expect(Str('Supercharge').endsWith('Charge')).toBe(false)

  expect(Str('abc').endsWith('abc', 3)).toBe(true)
  expect(Str('abc').endsWith('abc', 4)).toBe(true)
  expect(Str('Supercharge').endsWith('charge', 5)).toBe(false)
  expect(Str('Super').endsWith()).toBe(false)
})

test('ltrim', () => {
  expect(Str('   Supercharge').ltrim().get()).toEqual('Supercharge')
  expect(Str('   Supercharge').ltrim(null).get()).toEqual('Supercharge')
  expect(Str('   Supercharge').ltrim('').get()).toEqual('Supercharge')

  expect(Str('Supercharge').ltrim('abc').get()).toEqual('Supercharge')
  expect(Str('/supercharge').ltrim('/').get()).toEqual('supercharge')
  expect(Str('///supercharge').ltrim('/').get()).toEqual('supercharge')
  expect(Str('///supercharge').ltrim('//').get()).toEqual('/supercharge')

  expect(Str('   Supercharge').ltrim('Supercharge').get()).toEqual('   Supercharge')
  expect(Str('   supercharge   ').ltrim('Supercharge').get()).toEqual('   supercharge   ')
})

test('rtrim', () => {
  expect(Str('Supercharge   ').rtrim().get()).toEqual('Supercharge')
  expect(Str('Supercharge   ').rtrim(null).get()).toEqual('Supercharge')
  expect(Str('Supercharge   ').rtrim('').get()).toEqual('Supercharge')

  expect(Str('Supercharge').rtrim('abc').get()).toEqual('Supercharge')
  expect(Str('/supercharge/').rtrim('/').get()).toEqual('/supercharge')
  expect(Str('/supercharge///').rtrim('/').get()).toEqual('/supercharge')

  expect(Str('Supercharge   ').rtrim('Supercharge').get()).toEqual('Supercharge   ')
})

test('concat', () => {
  expect(Str('Supercharge').concat('-is', '-great').get()).toEqual('Supercharge-is-great')
  expect(Str('Supercharge').concat([' is', ' great']).get()).toEqual('Supercharge is great')
})

test('isString', () => {
  expect(Str.isString('')).toBe(true)
  expect(Str.isString(String())).toBe(true)
  expect(Str.isString('Supercharge')).toBe(true)

  expect(Str.isString(1)).toBe(false)
  expect(Str.isString({})).toBe(false)
})

test('isAlphaNumeric', () => {
  expect(Str.isAlphaNumeric('1')).toBe(true)
  expect(Str.isAlphaNumeric('Ab12')).toBe(true)
  expect(Str.isAlphaNumeric('Supercharge')).toBe(true)
  expect(Str.isAlphaNumeric('äöüßáàâ')).toBe(true)
  expect(Str.isAlphaNumeric(
    Str.random(builder => builder.characters().numbers())
  )).toBe(true)

  expect(Str.isAlphaNumeric()).toBe(false)
  expect(Str.isAlphaNumeric('')).toBe(false)
  expect(Str.isAlphaNumeric(1)).toBe(false)
  expect(Str.isAlphaNumeric({})).toBe(false)
  expect(Str.isAlphaNumeric(null)).toBe(false)
  expect(Str.isAlphaNumeric('abc#')).toBe(false)
  expect(Str.isAlphaNumeric('abc!')).toBe(false)
  expect(Str.isAlphaNumeric(String())).toBe(false)
  expect(Str.isAlphaNumeric(
    Str.random(builder => builder.symbols())
  )).toBe(false)
})

test('limit', () => {
  expect(Str('Supercharge').limit(5, ' ->').get()).toEqual('Super ->')
  expect(Str('Supercharge').limit(5).get()).toEqual('Super')

  expect(Str('Supercharge').limit().get()).toEqual('')
  expect(Str('Supercharge').limit(0).get()).toEqual('')
  expect(Str('Supercharge').limit(0, ' ->').get()).toEqual(' ->')

  expect(Str('Supercharge').limit(11, ' ->').get()).toEqual('Supercharge')
  expect(Str('Supercharge').limit(12, ' ->').get()).toEqual('Supercharge')
})

test('kebab/slug', () => {
  expect(Str('super charge').kebab().get()).toEqual('super-charge')

  expect(Str('super charge').slug().get()).toEqual('super-charge')
  expect(Str('supercharge is awesome').slug().get()).toEqual('supercharge-is-awesome')
  expect(Str('supercharge_IS_AWesoME').slug().get()).toEqual('supercharge-is-awesome')
  expect(Str('SUPERCHARGE_is_AWESOME').slug().get()).toEqual('supercharge-is-awesome')
  expect(Str('supercharge_IS_AWesoME!').slug().get()).toEqual('supercharge-is-awesome!')
  expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').slug().get()).toEqual('supercharge-is-awesome')

  expect(Str('super charge').slug('.AA.').get()).toEqual('super.aa.charge')
})

test('snake', () => {
  expect(Str('super charge').snake().get()).toEqual('super_charge')
  expect(Str('supercharge is awesome').snake().get()).toEqual('supercharge_is_awesome')
  expect(Str('supercharge_IS_AWesoME').snake().get()).toEqual('supercharge_is_awesome')
  expect(Str('SUPERCHARGE_is_AWESOME').snake().get()).toEqual('supercharge_is_awesome')
  expect(Str('SUPERCHARGE_is_AWESOME!').snake().get()).toEqual('supercharge_is_awesome!')
  expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').snake().get()).toEqual('supercharge_is_awesome')
})

test('padBoth', () => {
  expect(Str('Super').padBoth().get()).toEqual('Super')
  expect(Str('Super').padBoth(1).get()).toEqual('Super')
  expect(Str('Super').padBoth(15).get()).toEqual('     Super     ')

  expect(Str('Super').padBoth(-1, '.').get()).toEqual('Super')
  expect(Str('Super').padBoth(10, '').get()).toEqual('Super')
  expect(Str('Super').padBoth(5, '.').get()).toEqual('Super')
  expect(Str('Super').padBoth(15, '.').get()).toEqual('.....Super.....')
  expect(Str('Super').padBoth(13, '-=-').get()).toEqual('-=--Super-=--')
  expect(Str('Super').padBoth(14, '-=-').get()).toEqual('-=--Super-=--=')
  expect(Str('Super').padBoth(15, '-=-').get()).toEqual('-=--=Super-=--=')
})

test('padLeft', () => {
  expect(Str('Supercharge').padLeft().get()).toEqual('Supercharge')
  expect(Str('Supercharge').padLeft(1).get()).toEqual('Supercharge')
  expect(Str('Supercharge').padLeft(15).get()).toEqual('    Supercharge')

  expect(Str('Supercharge').padLeft(-1, '.').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padLeft(10, '').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padLeft(5, '.').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padLeft(15, '.').get()).toEqual('....Supercharge')
  expect(Str('Supercharge').padLeft(13, '-=-').get()).toEqual('-=Supercharge')
  expect(Str('Supercharge').padLeft(14, '-=-').get()).toEqual('-=-Supercharge')
  expect(Str('Supercharge').padLeft(15, '-=-').get()).toEqual('-=--Supercharge')
})

test('padRight', () => {
  expect(Str('Supercharge').padRight().get()).toEqual('Supercharge')
  expect(Str('Supercharge').padRight(1).get()).toEqual('Supercharge')
  expect(Str('Supercharge').padRight(15).get()).toEqual('Supercharge    ')

  expect(Str('Supercharge').padRight(-1, '.').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padRight(10, '').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padRight(5, '.').get()).toEqual('Supercharge')
  expect(Str('Supercharge').padRight(15, '.').get()).toEqual('Supercharge....')
  expect(Str('Supercharge').padRight(13, '-=-').get()).toEqual('Supercharge-=')
  expect(Str('Supercharge').padRight(14, '-=-').get()).toEqual('Supercharge-=-')
  expect(Str('Supercharge').padRight(15, '-=-').get()).toEqual('Supercharge-=--')
})

test('parseCallback', () => {
  expect(Str('').parseCallback()).toEqual(['', undefined])
  expect(Str(null).parseCallback()).toEqual(['', undefined])
  expect(Str(undefined).parseCallback()).toEqual(['', undefined])

  expect(Str('Controller').parseCallback()).toEqual(['Controller', undefined])
  expect(Str('Controller@index').parseCallback()).toEqual(['Controller', 'index'])

  expect(Str('Controller.method').parseCallback('.')).toEqual(['Controller', 'method'])
  expect(Str('Controller').parseCallback('.', 'handle')).toEqual(['Controller', 'handle'])
})

test('pascal', () => {
  // this is an alias for .studly() and tests are in "studly"
})

test('prepend', () => {
  expect(Str().prepend().get()).toEqual('')
  expect(Str().prepend(null).get()).toEqual('')

  expect(Str('supercharge').prepend().get()).toEqual('supercharge')
  expect(Str('supercharge').prepend(null).get()).toEqual('supercharge')

  expect(Str('supercharge').prepend(123).get()).toEqual('123supercharge')
  expect(Str('supercharge').prepend(['ARRAY']).get()).toEqual('ARRAYsupercharge')

  expect(Str('is awesome').prepend('supercharge ').get()).toEqual('supercharge is awesome')
  expect(Str(' awesome').prepend('supercharge', ' is').get()).toEqual('supercharge is awesome')
  expect(Str(' awesome').prepend(['supercharge', ' is']).get()).toEqual('supercharge is awesome')
})

test('substr', () => {
  expect(Str('Supercharge').substr(0, 5).get()).toEqual('Super')
  expect(Str('Supercharge').substr(5, 0).get()).toEqual('Super')
  expect(Str('Supercharge').substr(5).get()).toEqual('charge')
  expect(Str('Supercharge').substr().get()).toEqual('Supercharge')
  expect(Str('Supercharge is awesome').substr(0, 11).get()).toEqual('Supercharge')
})

test('replace', () => {
  expect(Str('  supercharge').replace(' ', 'awesome').get()).toEqual('awesome supercharge')
  expect(Str('supercharge has a blue house and a blue car').replace(/blue/g, 'red').get()).toEqual('supercharge has a red house and a red car')
  expect(Str('Supercharge is nice').replace('nice', 'sweet').get()).toEqual('Supercharge is sweet')
  expect(Str('Apples are round, and apples are juicy.').replace('are', 'is').get()).toEqual('Apples is round, and apples are juicy.')

  expect(
    Str('Apples are round, and apples are juicy.').replace('apples').with('bananas').get()
  ).toEqual('Apples are round, and bananas are juicy.')
})

test('start', () => {
  expect(Str('repos/supercharge').start('/').get()).toEqual('/repos/supercharge')
  expect(Str('/repos/supercharge').start('/').get()).toEqual('/repos/supercharge')
})

test('finish', () => {
  expect(Str('/repos/supercharge').finish('/').get()).toEqual('/repos/supercharge/')
  expect(Str('/repos/supercharge/').finish('/').get()).toEqual('/repos/supercharge/')
})

test('reverse', () => {
  expect(Str().reverse().get()).toEqual('')
  expect(Str('').reverse().get()).toEqual('')
  expect(Str(null).reverse().get()).toEqual('')
  expect(Str('abc').reverse().get()).toEqual('cba')
  expect(Str('SuperchargE').reverse().get()).toEqual('EgrahcrepuS')
})

test('replaceLast()', () => {
  expect(Str('Supercharge').replaceLast('', 'sweet').get()).toEqual('Supercharge')
  expect(Str('super-super').replaceLast('super', 'sweet').get()).toEqual('super-sweet')
  expect(Str('Supercharge is supercharge').replaceLast('supercharge', 'awesome indeed').get()).toEqual('Supercharge is awesome indeed')

  expect(Str('supercharge').replaceLast('sweet', 'awesome').get()).toEqual('supercharge')

  expect(
    Str('Supercharge is supercharge').replaceLast('supercharge').with('awesome indeed').get()
  ).toEqual('Supercharge is awesome indeed')
  expect(
    Str('supercharge').replaceLast('awesome').with('other').get()
  ).toEqual('supercharge')
})

test('chars', () => {
  expect(Str().chars()).toEqual([])
  expect(Str('').chars()).toEqual([])
  expect(Str('Super').chars()).toEqual(['S', 'u', 'p', 'e', 'r'])
  expect(Str('Super 👍').chars()).toEqual(['S', 'u', 'p', 'e', 'r', ' ', '👍'])
})

test('shuffle', () => {
  expect(Str().shuffle().get()).toEqual('')
  expect(Str('').shuffle().get()).toEqual('')

  const chars = Str('Super').shuffle().chars()
  expect(chars.length).toBe(5)
  expect(chars.includes('S')).toBe(true)
  expect(chars.includes('u')).toBe(true)
  expect(chars.includes('p')).toBe(true)
  expect(chars.includes('e')).toBe(true)
  expect(chars.includes('r')).toBe(true)
})

test('slice', () => {
  expect(Str().slice().get()).toEqual('')
  expect(Str('').slice().get()).toEqual('')

  expect(Str('Super').slice().get()).toEqual('Super')
  expect(Str('Super').slice(1).get()).toEqual('uper')
  expect(Str('Super').slice(1, 3).get()).toEqual('up')
})

test('stripBom', async () => {
  expect(Str().stripBom().get()).toEqual('')
  expect(Str('').stripBom().get()).toEqual('')

  const startingWithBom = Path.resolve(__dirname, 'fixtures', 'utf8-starting-with-bom.txt')
  expect(
    Str(await Fs.readFile(startingWithBom)).stripBom().get()
  ).toEqual('Supercharge\n')

  const bomInTheMiddle = Path.resolve(__dirname, 'fixtures', 'utf8-bom-in-the-middle.txt')
  expect(
    Str(await Fs.readFile(bomInTheMiddle)).stripBom().get()
  ).toEqual(
    await Fs.readFile(bomInTheMiddle, 'utf-8')
  )
})

test('startsWithBom', async () => {
  expect(Str().startsWithBom()).toBe(false)
  expect(Str('').startsWithBom()).toBe(false)
  expect(Str('Supercharge').containsBom()).toBe(false)

  const startingWithBom = Path.resolve(__dirname, 'fixtures', 'utf8-starting-with-bom.txt')
  expect(
    Str(await Fs.readFile(startingWithBom)).startsWithBom()
  ).toBe(true)

  const bomInTheMiddle = Path.resolve(__dirname, 'fixtures', 'utf8-bom-in-the-middle.txt')
  expect(
    Str(await Fs.readFile(bomInTheMiddle)).startsWithBom()
  ).toBe(false)
})

test('containsBom', async () => {
  expect(Str().containsBom()).toBe(false)
  expect(Str('').containsBom()).toBe(false)
  expect(Str('Supercharge').containsBom()).toBe(false)

  const startingWithBom = Path.resolve(__dirname, 'fixtures', 'utf8-starting-with-bom.txt')
  expect(
    Str(await Fs.readFile(startingWithBom)).containsBom()
  ).toBe(true)

  const bomInTheMiddle = Path.resolve(__dirname, 'fixtures', 'utf8-bom-in-the-middle.txt')
  expect(
    Str(await Fs.readFile(bomInTheMiddle)).containsBom()
  ).toBe(true)
})

test('at', () => {
  expect(Str('Supercharge').at(0)).toEqual('S')
  expect(Str('Supercharge').at(-1)).toEqual('e')
  expect(Str('Supercharge').at(-3)).toEqual('r')
  expect(Str('Supercharge').at(-11)).toEqual('S')

  expect(Str('Supercharge').at(12)).toEqual(undefined)
  expect(Str('Supercharge').at(50)).toEqual(undefined)

  expect(Str('Supercharge').at(-12)).toEqual(undefined)
  expect(Str('Supercharge').at(-50)).toEqual(undefined)
})

test('isCamel', () => {
  expect(Str().isCamel()).toBe(true)
  expect(Str('').isCamel()).toBe(true)
  expect(Str(null).isCamel()).toBe(true)
  expect(Str('hello').isCamel()).toBe(true)
  expect(Str('helloWorld').isCamel()).toBe(true)

  expect(Str('HelloWorld').isCamel()).toBe(false)
  expect(Str('HelloworlD').isCamel()).toBe(false)
  expect(Str('HELLOWORLD').isCamel()).toBe(false)
  expect(Str('hello world').isCamel()).toBe(false)
  expect(Str('Hello World').isCamel()).toBe(false)
})

test('isUuid', async () => {
  expect(Str().isUuid()).toBe(false)
  expect(Str('').isUuid()).toBe(false)
  expect(Str(null).isUuid()).toBe(false)
  expect(Str('randommm-inva-lidd-uuid').isUuid()).toBe(false)
  expect(Str('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa').isUuid()).toBe(false)

  expect(Str(Str.uuid()).isUuid()).toBe(true)
  expect(Str('00000000-0000-0000-0000-000000000000').isUuid()).toBe(true)
})

test('isSymbol', () => {
  expect(Str.isSymbol(Symbol.for(''))).toBe(true)
  expect(Str.isSymbol(Symbol.for('Supercharge'))).toBe(true)
  expect(Str.isSymbol(Object(Symbol.for('Supercharge')))).toBe(true)

  expect(Str.isSymbol()).toBe(false)
  expect(Str.isSymbol(null)).toBe(false)
  expect(Str.isSymbol(Symbol)).toBe(false)

  expect(Str.isSymbol('')).toBe(false)
  expect(Str.isSymbol({})).toBe(false)
  expect(Str.isSymbol([])).toBe(false)
  expect(Str.isSymbol(1234)).toBe(false)
  expect(Str.isSymbol(String())).toBe(false)
  expect(Str.isSymbol('Supercharge')).toBe(false)
})

test('splitCamel', () => {
  expect(Str('Supercharge').splitCamel()).toEqual(['Supercharge'])
  expect(Str('SuperchargeIsAwesome').splitCamel()).toEqual(['Supercharge', 'Is', 'Awesome'])
  expect(Str('Supercharge Is Awesome').splitCamel()).toEqual(['Supercharge', 'Is', 'Awesome'])

  expect(Str('super').splitCamel()).toEqual(['super'])
  expect(Str('superChargeIsCamelCase').splitCamel()).toEqual(['super', 'Charge', 'Is', 'Camel', 'Case'])
})

test('words', async () => {
  expect(Str().words()).toEqual([])
  expect(Str('').words()).toEqual([])

  expect(Str('Supercharge').words()).toEqual(['Supercharge'])
  expect(Str('super charge').words()).toEqual(['super', 'charge'])
  expect(Str('Supercharge       ').words()).toEqual(['Supercharge'])
  expect(Str('Supercharge is awesome').words()).toEqual(['Supercharge', 'is', 'awesome'])
  expect(Str('supercharge_is_awesome').words()).toEqual(['supercharge', 'is', 'awesome'])
  expect(Str('supercharge-is-awesome').words()).toEqual(['supercharge', 'is', 'awesome'])
  expect(Str('supercharge is awesome!').words()).toEqual(['supercharge', 'is', 'awesome'])

  expect(Str('SuperchargeIsAwesome').words()).toEqual(['Supercharge', 'Is', 'Awesome'])
  expect(Str(`
    Hey pal,

    Supercharge is awesome!
  `).words()).toEqual(['Hey', 'pal', 'Supercharge', 'is', 'awesome'])

  const textWithLineBreaks = Path.resolve(__dirname, 'fixtures', 'text-with-line-breaks.md')
  expect(
    Str(await Fs.readFile(textWithLineBreaks)).words()
  ).toEqual(['Headline', 'Intro', 'Text'])
})

test('lines', async () => {
  expect(Str().lines()).toEqual([''])
  expect(Str('').lines()).toEqual([''])
  expect(Str('Supercharge').lines()).toEqual(['Supercharge'])
  expect(Str('Supercharge\n').lines()).toEqual(['Supercharge', ''])

  const textWithLineBreaks = Path.resolve(__dirname, 'fixtures', 'text-with-line-breaks.md')

  expect(
    Str(await Fs.readFile(textWithLineBreaks)).lines()
  ).toEqual(['## Headline', 'Intro', '', 'Text', ''])

  expect(
    Str(`
      Hey pal,
      Supercharge is awesome!
    `).lines()
  ).toEqual(['', '      Hey pal,', '      Supercharge is awesome!', '    '])
})

test.run()
