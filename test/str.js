'use strict'

const Path = require('path')
const Str = require('../dist')
const { promises: Fs } = require('fs')

describe('Strings', () => {
  it('get', () => {
    expect(Str('supercharge').get()).toEqual('supercharge')
  })

  it('after', () => {
    expect(Str('marcus').after('mar').get()).toEqual('cus')
    expect(Str('super-charge').after('-').get()).toEqual('charge')
    expect(Str('su-per-charge').after('-').get()).toEqual('per-charge')

    expect(Str('supercharge').after('xxx').get()).toEqual('supercharge')
    expect(Str('supercharge').after('').get()).toEqual('supercharge')

    expect(Str('super0charge').after('0').get()).toEqual('charge')
    expect(Str('super0charge').after(0).get()).toEqual('charge')
    expect(Str('super2charge').after(2).get()).toEqual('charge')
  })

  it('afterLast', () => {
    expect(Str('marcus').afterLast('c').get()).toEqual('us')
    expect(Str('super-charge').afterLast('-').get()).toEqual('charge')
    expect(Str('su-per-charge').afterLast('-').get()).toEqual('charge')

    expect(Str('supercharge').afterLast('xxx').get()).toEqual('supercharge')
    expect(Str('supercharge').afterLast('').get()).toEqual('supercharge')

    expect(Str('super0charge').afterLast('0').get()).toEqual('charge')
    expect(Str('super0charge').afterLast(0).get()).toEqual('charge')
    expect(Str('super2charge').afterLast(2).get()).toEqual('charge')
  })

  it('append', () => {
    expect(Str('supercharge').append().get()).toEqual('supercharge')
    expect(Str('supercharge is').append(' awesome').get()).toEqual('supercharge is awesome')
    expect(Str('supercharge').append(' is', ' awesome').get()).toEqual('supercharge is awesome')
    expect(Str('supercharge').append([' is', ' awesome']).get()).toEqual('supercharge is awesome')
  })

  it('before', () => {
    expect(Str('marcus').before('cus').get()).toEqual('mar')
    expect(Str('super-charge').before('-').get()).toEqual('super')
    expect(Str('su-per-charge').before('-').get()).toEqual('su')

    expect(Str('supercharge').before('xxx').get()).toEqual('supercharge')
    expect(Str('supercharge').before('').get()).toEqual('supercharge')

    expect(Str('super0charge').before('0').get()).toEqual('super')
    expect(Str('super0charge').before(0).get()).toEqual('super')
    expect(Str('super2charge').before(2).get()).toEqual('super')
  })

  it('beforeLast', () => {
    expect(Str('marcus').beforeLast('cus').get()).toEqual('mar')
    expect(Str('super-charge').beforeLast('-').get()).toEqual('super')
    expect(Str('su-per-charge').beforeLast('-').get()).toEqual('su-per')

    expect(Str('supercharge').beforeLast('xxx').get()).toEqual('supercharge')
    expect(Str('supercharge').beforeLast('').get()).toEqual('supercharge')

    expect(Str('super0charge').beforeLast('0').get()).toEqual('super')
    expect(Str('super0charge').beforeLast(0).get()).toEqual('super')
    expect(Str('super2charge').beforeLast(2).get()).toEqual('super')
  })

  it('upper', () => {
    expect(Str('supercharge').upper().get()).toEqual('SUPERCHARGE')
    expect(Str('SuperchargE').upper().get()).toEqual('SUPERCHARGE')
  })

  it('uppercase', () => {
    expect(Str('supercharge').uppercase().get()).toEqual('SUPERCHARGE')
    expect(Str('SuperchargE').uppercase().get()).toEqual('SUPERCHARGE')
  })

  it('isUpper', () => {
    expect(Str('SUPERCHARGE').isUpper()).toBe(true)
    expect(Str('sUPERCHARGE').isUpper()).toBe(false)
    expect(Str('superchargE').isUpper()).toBe(false)
  })

  it('ucFirst', () => {
    expect(Str('supercharge').ucFirst().get()).toEqual('Supercharge')
    expect(Str('sUPERCHARGE').ucFirst().get()).toEqual('SUPERCHARGE')
    expect(Str('sUPERCHARGE     IS AWESOME').ucFirst().get()).toEqual('SUPERCHARGE     IS AWESOME')
  })

  it('lower', () => {
    expect(Str('SUPERCHARGE').lower().get()).toEqual('supercharge')
    expect(Str('SuperchargE').lower().get()).toEqual('supercharge')
  })

  it('lowercase', () => {
    expect(Str('SUPERCHARGE').lowercase().get()).toEqual('supercharge')
    expect(Str('SuperchargE').lowercase().get()).toEqual('supercharge')
  })

  it('isLower', () => {
    expect(Str('supercharge').isLower()).toBe(true)
    expect(Str('sUPERCHARGE').isLower()).toBe(false)
    expect(Str('SUPERCHARGE').isLower()).toBe(false)
  })

  it('lcFirst', () => {
    expect(Str('Supercharge').lcFirst().get()).toEqual('supercharge')
    expect(Str('SUPERCHARGE').lcFirst().get()).toEqual('sUPERCHARGE')
    expect(Str('SUPERCHARGE     IS AWESOME').lcFirst().get()).toEqual('sUPERCHARGE     IS AWESOME')
  })

  it('strip', () => {
    expect(Str('supercharge is awesome').strip().get()).toEqual('superchargeisawesome')
    expect(Str('    supercharge IS aWesoME').strip().get()).toEqual('superchargeISaWesoME')
    expect(Str('SUPERCHARGE     IS AWESOME   ').strip().get()).toEqual('SUPERCHARGEISAWESOME')
  })

  it('stripNums', () => {
    expect(Str('supercharge 123 is awesome').stripNums().get()).toEqual('supercharge  is awesome')
    expect(Str('5up3rch4rge 12 awes0me 6789').stripNums().get()).toEqual('uprchrge  awesme ')
  })

  it('stripExtraSpaces', () => {
    expect(Str('').stripExtraSpaces().get()).toEqual('')
    expect(Str('    Supercharge   ').stripExtraSpaces().get()).toEqual(' Supercharge ')
    expect(Str('supercharge 123 is awesome').stripNums().stripExtraSpaces().get()).toEqual('supercharge is awesome')
  })

  it('title', () => {
    expect(Str('supercharge is awesome').title().get()).toEqual('Supercharge Is Awesome')
    expect(Str('supercharge IS AWesoME').title().get()).toEqual('Supercharge Is Awesome')
    expect(Str('SUPERCHARGE IS AWESOME').title().get()).toEqual('Supercharge Is Awesome')
  })

  it('camel', () => {
    expect(Str('supercharge').camel().get()).toEqual('supercharge')
    expect(Str('superCharge').camel().get()).toEqual('superCharge')
    expect(Str('supercharge is awesome').camel().get()).toEqual('superchargeIsAwesome')
    expect(Str('supercharge_IS_AwesoMe').camel().get()).toEqual('superchargeIsAwesoMe')
    expect(Str('SUPERCHARGE_is_AWESOME').camel().get()).toEqual('superchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').camel().get()).toEqual('superchargeIsAwesome')
  })

  it('camel should handle acronyms', () => {
    expect(Str('superCHARGE').camel().get()).toEqual('superCharge')
    expect(Str('super CHARGE').camel().get()).toEqual('superCharge')

    expect(Str('XMLHttpRequest').camel().get()).toEqual('xmlHttpRequest')
    expect(Str('XmlHTTPRequest').camel().get()).toEqual('xmlHttpRequest')
  })

  it('studly', () => {
    expect(Str('supercharge is awesome').studly().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').studly().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').studly().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').studly().get()).toEqual('SuperchargeIsAwesome')
  })

  it('trim', () => {
    expect(Str('  supercharge').trim().get()).toEqual('supercharge')
    expect(Str(' supercharge ').trim().get()).toEqual('supercharge')
    expect(Str('sUPERCHARGE  ').trim().get()).toEqual('sUPERCHARGE')
    expect(Str('/supercharge/').trim('/').get()).toEqual('supercharge')
    expect(Str('/supercharge/').trim('abc').get()).toEqual('/supercharge/')
  })

  it('contains', () => {
    expect(Str('supercharge').contains('arge')).toBe(true)
    expect(Str('supercharge').contains('supercharge')).toBe(true)
    expect(Str('Supercharge is awesome').contains('is', 'awesome')).toBe(true)
    expect(Str('Supercharge is awesome').contains(['is', 'awesome'])).toBe(true)

    expect(Str('supercharge').contains('')).toBe(false)
    expect(Str('supercharge').contains('abc')).toBe(false)
    expect(Str('supercharge').contains('Supercharge')).toBe(false)
  })

  it('containsAll', () => {
    expect(Str('supercharge is awesome').containsAll('supercharge')).toBe(true)
    expect(Str('supercharge is awesome').containsAll(['supercharge'])).toBe(true)
    expect(Str('supercharge is awesome').containsAll('is', 'awesome')).toBe(true)
    expect(Str('supercharge is awesome').containsAll(['is', 'awesome'])).toBe(true)

    expect(Str('supercharge is awesome').containsAll('')).toBe(false)
    expect(Str('supercharge is awesome').containsAll(['', 'is'])).toBe(false)
    expect(Str('supercharge is awesome').containsAll(['supercharge', 'bad'])).toBe(false)
  })

  it('notContains', () => {
    expect(Str('supercharge').notContains('')).toBe(true)
    expect(Str('supercharge').notContains('sub')).toBe(true)
    expect(Str('supercharge').notContains('charger')).toBe(true)

    expect(Str('supercharge').notContains('super')).toBe(false)
  })

  it('notIncludes', () => {
    expect(Str('supercharge').notIncludes('')).toBe(true)
    expect(Str('supercharge').notIncludes('sub')).toBe(true)
    expect(Str('supercharge').notIncludes('charger')).toBe(true)

    expect(Str('supercharge').notIncludes('super')).toBe(false)
  })

  it('length', () => {
    expect(Str('supercharge').length()).toEqual(11)
    expect(Str(' 123').length()).toEqual(4)
    expect(Str('').length()).toEqual(0)
  })

  it('isEmpty', () => {
    expect(Str().isEmpty()).toBe(true)
    expect(Str('').isEmpty()).toBe(true)
    expect(Str(null).isEmpty()).toBe(true)
    expect(Str('Supercharge').isEmpty()).toBe(false)
  })

  it('isNotEmpty', () => {
    expect(Str().isNotEmpty()).toBe(false)
    expect(Str('').isNotEmpty()).toBe(false)
    expect(Str(null).isNotEmpty()).toBe(false)
    expect(Str('Supercharge').isNotEmpty()).toBe(true)
  })

  it('uuid', () => {
    expect(Str.uuid).toBeInstanceOf(Function)
    expect(Str.uuid().split('-').length).toEqual(5)
  })

  it('split', () => {
    expect(Str('Supercharge-is-awesome').split('-')).toEqual(['Supercharge', 'is', 'awesome'])
    expect(Str('Supercharge-is-awesome').split()).toEqual(['Supercharge-is-awesome'])
    expect(Str('Supercharge').split('-')).toEqual(['Supercharge'])
  })

  it('random', () => {
    expect(Str.random())

    // default length is 21 chars
    expect(Str.random().length).toEqual(21)

    // supports a custom length
    expect(Str.random(50))
    expect(Str.random(50).length).toEqual(50)
  })

  it('replaceAll', () => {
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
  })

  it('equals', () => {
    expect(Str('Supercharge').equals('Supercharge')).toBe(true)

    expect(Str('Super').equals('super')).toBe(false)
    expect(Str('Super').equals()).toBe(false)
  })

  it('notEquals', () => {
    expect(Str('Super').notEquals()).toBe(true)
    expect(Str('Super').notEquals('super')).toBe(true)

    expect(Str('Supercharge').notEquals('Supercharge')).toBe(false)
  })

  it('startsWith', () => {
    expect(Str('Supercharge').startsWith('Super')).toBe(true)
    expect(Str('Supercharge').startsWith('charge', 5)).toBe(true)

    expect(Str('Supercharge').startsWith('super')).toBe(false)
    expect(Str('Super').startsWith('Super', 10)).toBe(false)
    expect(Str('Super').startsWith()).toBe(false)
  })

  it('endsWith', () => {
    expect(Str('Supercharge').endsWith('charge')).toBe(true)
    expect(Str('Supercharge').endsWith('Chare')).toBe(false)

    expect(Str('abc').endsWith('abc', 3)).toBe(true)
    expect(Str('abc').endsWith('abc', 4)).toBe(true)
    expect(Str('Supercharge').endsWith('charge', 5)).toBe(false)
    expect(Str('Super').endsWith()).toBe(false)
  })

  it('ltrim', () => {
    expect(Str('   Supercharge').ltrim().get()).toEqual('Supercharge')
    expect(Str('   Supercharge').ltrim(null).get()).toEqual('Supercharge')
    expect(Str('   Supercharge').ltrim('').get()).toEqual('Supercharge')

    expect(Str('Supercharge').ltrim('abc').get()).toEqual('Supercharge')
    expect(Str('/supercharge').ltrim('/').get()).toEqual('supercharge')
    expect(Str('///supercharge').ltrim('/').get()).toEqual('supercharge')

    expect(Str('   Supercharge').ltrim('Supercharge').get()).toEqual('   Supercharge')
    expect(Str('   supercharge   ').ltrim('Supercharge').get()).toEqual('   supercharge   ')
  })

  it('rtrim', () => {
    expect(Str('Supercharge   ').rtrim().get()).toEqual('Supercharge')
    expect(Str('Supercharge   ').rtrim(null).get()).toEqual('Supercharge')
    expect(Str('Supercharge   ').rtrim('').get()).toEqual('Supercharge')

    expect(Str('Supercharge').rtrim('abc').get()).toEqual('Supercharge')
    expect(Str('/supercharge/').rtrim('/').get()).toEqual('/supercharge')
    expect(Str('/supercharge///').rtrim('/').get()).toEqual('/supercharge')

    expect(Str('Supercharge   ').rtrim('Supercharge').get()).toEqual('Supercharge   ')
  })

  it('concat', () => {
    expect(Str('Supercharge').concat('-is', '-great').get()).toEqual('Supercharge-is-great')
    expect(Str('Supercharge').concat([' is', ' great']).get()).toEqual('Supercharge is great')
  })

  it('isString', () => {
    expect(Str.isString('')).toBe(true)
    expect(Str.isString(String())).toBe(true)
    expect(Str.isString('Supercharge')).toBe(true)

    expect(Str.isString(1)).toBe(false)
    expect(Str.isString({})).toBe(false)
  })

  it('limit', () => {
    expect(Str('Supercharge').limit(5, ' ->').get()).toEqual('Super ->')
    expect(Str('Supercharge').limit(5).get()).toEqual('Super')

    expect(Str('Supercharge').limit().get()).toEqual('')
    expect(Str('Supercharge').limit(0).get()).toEqual('')
    expect(Str('Supercharge').limit(0, ' ->').get()).toEqual(' ->')

    expect(Str('Supercharge').limit(11, ' ->').get()).toEqual('Supercharge')
    expect(Str('Supercharge').limit(12, ' ->').get()).toEqual('Supercharge')
  })

  it('kebab/slug', () => {
    expect(Str('super charge').kebab().get()).toEqual('super-charge')

    expect(Str('super charge').slug().get()).toEqual('super-charge')
    expect(Str('supercharge is awesome').slug().get()).toEqual('supercharge-is-awesome')
    expect(Str('supercharge_IS_AWesoME').slug().get()).toEqual('supercharge-is-awesome')
    expect(Str('SUPERCHARGE_is_AWESOME').slug().get()).toEqual('supercharge-is-awesome')
    expect(Str('supercharge_IS_AWesoME!').slug().get()).toEqual('supercharge-is-awesome!')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').slug().get()).toEqual('supercharge-is-awesome')

    expect(Str('super charge').slug('.AA.').get()).toEqual('super.aa.charge')
  })

  it('snake', () => {
    expect(Str('super charge').snake().get()).toEqual('super_charge')
    expect(Str('supercharge is awesome').snake().get()).toEqual('supercharge_is_awesome')
    expect(Str('supercharge_IS_AWesoME').snake().get()).toEqual('supercharge_is_awesome')
    expect(Str('SUPERCHARGE_is_AWESOME').snake().get()).toEqual('supercharge_is_awesome')
    expect(Str('SUPERCHARGE_is_AWESOME!').snake().get()).toEqual('supercharge_is_awesome!')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').snake().get()).toEqual('supercharge_is_awesome')
  })

  it('padLeft', () => {
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

  it('padRight', () => {
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

  it('parseCallback', () => {
    expect(Str('').parseCallback()).toEqual(['', undefined])
    expect(Str(null).parseCallback()).toEqual(['', undefined])
    expect(Str(undefined).parseCallback()).toEqual(['', undefined])

    expect(Str('Controller').parseCallback()).toEqual(['Controller', undefined])
    expect(Str('Controller@index').parseCallback()).toEqual(['Controller', 'index'])

    expect(Str('Controller.method').parseCallback('.')).toEqual(['Controller', 'method'])
    expect(Str('Controller').parseCallback('.', 'handle')).toEqual(['Controller', 'handle'])
  })

  it('pascal', () => {
    expect(Str('supercharge is awesome').pascal().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('supercharge_IS_AWesoME').pascal().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
    expect(Str('SUPERCHARGE_is_AWESOME!').pascal().get()).toEqual('SuperchargeIsAwesome!')
    expect(Str('SUPERCHARGE  -_- is -_-  -_-     AWESOME').pascal().get()).toEqual('SuperchargeIsAwesome')
  })

  it('prepend', () => {
    expect(Str('supercharge').prepend().get()).toEqual('supercharge')
    expect(Str('is awesome').prepend('supercharge ').get()).toEqual('supercharge is awesome')
    expect(Str(' awesome').prepend('supercharge', ' is').get()).toEqual('supercharge is awesome')
    expect(Str(' awesome').prepend(['supercharge', ' is']).get()).toEqual('supercharge is awesome')
  })

  it('substr', () => {
    expect(Str('Supercharge').substr(0, 5).get()).toEqual('Super')
    expect(Str('Supercharge').substr(5, 0).get()).toEqual('Super')
    expect(Str('Supercharge').substr(5).get()).toEqual('charge')
    expect(Str('Supercharge').substr().get()).toEqual('Supercharge')
    expect(Str('Supercharge is awesome').substr(0, 11).get()).toEqual('Supercharge')
  })

  it('replace', () => {
    expect(Str('  supercharge').replace(' ', 'awesome').get()).toEqual('awesome supercharge')
    expect(Str('supercharge has a blue house and a blue car').replace(/blue/g, 'red').get()).toEqual('supercharge has a red house and a red car')
    expect(Str('Supercharge is nice').replace('nice', 'sweet').get()).toEqual('Supercharge is sweet')
    expect(Str('Apples are round, and apples are juicy.').replace('are', 'is').get()).toEqual('Apples is round, and apples are juicy.')
  })

  it('start', () => {
    expect(Str('repos/supercharge').start('/').get()).toEqual('/repos/supercharge')
    expect(Str('/repos/supercharge').start('/').get()).toEqual('/repos/supercharge')
  })

  it('finish', () => {
    expect(Str('/repos/supercharge').finish('/').get()).toEqual('/repos/supercharge/')
    expect(Str('/repos/supercharge/').finish('/').get()).toEqual('/repos/supercharge/')
  })

  it('reverse', () => {
    expect(Str().reverse().get()).toEqual('')
    expect(Str('').reverse().get()).toEqual('')
    expect(Str(null).reverse().get()).toEqual('')
    expect(Str('abc').reverse().get()).toEqual('cba')
    expect(Str('SuperchargE').reverse().get()).toEqual('EgrahcrepuS')
  })

  it('replaceLast()', () => {
    expect(Str('Supercharge').replaceLast('', 'sweet').get()).toEqual('Supercharge')
    expect(Str('super-super').replaceLast('super', 'sweet').get()).toEqual('super-sweet')
    expect(Str('Supercharge is supercharge').replaceLast('supercharge', 'awesome indeed').get()).toEqual('Supercharge is awesome indeed')

    expect(Str('supercharge').replaceLast('sweet', 'awesome').get()).toEqual('supercharge')
  })

  it('chars', () => {
    expect(Str().chars()).toEqual([])
    expect(Str('').chars()).toEqual([])
    expect(Str('Super').chars()).toEqual(['S', 'u', 'p', 'e', 'r'])
    expect(Str('Super 👍').chars()).toEqual(['S', 'u', 'p', 'e', 'r', ' ', '👍'])
  })

  it('shuffle', () => {
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

  it('slice', () => {
    expect(Str().slice().get()).toEqual('')
    expect(Str('').slice().get()).toEqual('')

    expect(Str('Super').slice().get()).toEqual('Super')
    expect(Str('Super').slice(1).get()).toEqual('uper')
    expect(Str('Super').slice(1, 3).get()).toEqual('up')
  })

  it('stripBom', async () => {
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

  it('startsWithBom', async () => {
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

  it('containsBom', async () => {
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

  it('at', () => {
    expect(Str('Supercharge').at(0)).toEqual('S')
    expect(Str('Supercharge').at(-1)).toEqual('e')
    expect(Str('Supercharge').at(-3)).toEqual('r')
    expect(Str('Supercharge').at(-11)).toEqual('S')

    expect(Str('Supercharge').at(12)).toEqual(undefined)
    expect(Str('Supercharge').at(50)).toEqual(undefined)

    expect(Str('Supercharge').at(-12)).toEqual(undefined)
    expect(Str('Supercharge').at(-50)).toEqual(undefined)
  })

  it('isCamel', () => {
    expect(Str('helloWorld').isCamel()).toBe(true)
    expect(Str('hello').isCamel()).toBe(true)
    expect(Str('hello world').isCamel()).toBe(false)
    expect(Str('HelloworlD').isCamel()).toBe(false)
    expect(Str('HELLOWORLD').isCamel()).toBe(false)
  })

  it('isUuid', async () => {
    expect(Str().isUuid()).toBe(false)
    expect(Str('').isUuid()).toBe(false)
    expect(Str(null).isUuid()).toBe(false)
    expect(Str('randommm-inva-lidd-uuid').isUuid()).toBe(false)
    expect(Str('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa').isUuid()).toBe(false)

    expect(Str(Str.uuid()).isUuid()).toBe(true)
    expect(Str('00000000-0000-0000-0000-000000000000').isUuid()).toBe(true)
  })

  it('isSymbol', () => {
    expect(Str.isSymbol(Symbol.for(''))).toBe(true)
    expect(Str.isSymbol(Symbol.for('Supercharge'))).toBe(true)
    expect(Str.isSymbol(Object(Symbol.for('Supercharge')))).toBe(true)

    expect(Str.isSymbol(Symbol)).toBe(false)
    expect(Str.isSymbol(1)).toBe(false)
    expect(Str.isSymbol({})).toBe(false)
    expect(Str.isSymbol('')).toBe(false)
    expect(Str.isSymbol(String())).toBe(false)
    expect(Str.isSymbol('Supercharge')).toBe(false)
  })

  it('splitCamel', () => {
    expect(Str('Supercharge').splitCamel()).toEqual(['Supercharge'])
    expect(Str('SuperchargeIsAwesome').splitCamel()).toEqual(['Supercharge', 'Is', 'Awesome'])
    expect(Str('Supercharge Is Awesome').splitCamel()).toEqual(['Supercharge', 'Is', 'Awesome'])

    expect(Str('super').splitCamel()).toEqual(['super'])
    expect(Str('superChargeIsCamelCase').splitCamel()).toEqual(['super', 'Charge', 'Is', 'Camel', 'Case'])
  })

  it('words', async () => {
    expect(Str().words()).toEqual([])
    expect(Str('').words()).toEqual([])

    expect(Str('Supercharge').words()).toEqual(['Supercharge'])
    expect(Str('super charge').words()).toEqual(['super', 'charge'])
    expect(Str('Supercharge       ').words()).toEqual(['Supercharge'])
    expect(Str('Supercharge is awesome').words()).toEqual(['Supercharge', 'is', 'awesome'])

    expect(Str('SuperchargeIsAwesome').words()).toEqual(['Supercharge', 'Is', 'Awesome'])

    const textWithLineBreaks = Path.resolve(__dirname, 'fixtures', 'text-with-line-breaks.md')
    expect(
      Str(await Fs.readFile(textWithLineBreaks)).words()
    ).toEqual(['##', 'Headline', 'Intro', 'Text'])
  })

  it('lines', async () => {
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

  it('sameAs', () => {
    expect(Str().sameAs()).toBe(true)
    expect(Str('').sameAs()).toBe(true)

    expect(Str('SUPER').sameAs('SUPER')).toBe(true)
    expect(Str('SUPERCHARGE').sameAs('supercharge')).toBe(true)
    expect(Str('SuPeRcHaRgE').sameAs('sUpErChArGe')).toBe(true)

    expect(Str('Super').sameAs()).toBe(false)
    expect(Str('SuPeR').sameAs('sUpErChArGe')).toBe(false)
    expect(Str('SUPERCHARGE').sameAs('SLOWCHARGE')).toBe(false)
  })
})
