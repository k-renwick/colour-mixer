import {
  isValidHex,
  isValidRgb,
  asHex,
  asRgb,
  asRgbArray,
  blend,
} from './Colour'

//import * as colourMixer from './Colour'

describe('isValidHex', () => {
  it('returns false when given a non-string', () => {
    expect(isValidHex(false)).toBe(false)
    expect(isValidHex(undefined)).toBe(false)
    expect(isValidHex(1)).toBe(false)
    expect(isValidHex({ random: 'object' })).toBe(false)
  })
  it('returns false when given invalid hex codes', () => {
    expect(isValidHex('#123456789')).toBe(false)
    expect(isValidHex('123456789')).toBe(false)
    expect(isValidHex('#FFFFFG')).toBe(false)
  })
  it('returns true when given valid hex codes', () => {
    expect(isValidHex('#FFFFFF')).toBe(true)
    expect(isValidHex('FFFFFF')).toBe(true)
    expect(isValidHex('FFFFFFFF')).toBe(true)
    expect(isValidHex('FFF')).toBe(true)
    expect(isValidHex('#FFF')).toBe(true)
  })
})

describe('isValidRgb', () => {
  it('returns false when given a non-string', () => {
    expect(isValidRgb(false)).toBe(false)
    expect(isValidRgb(undefined)).toBe(false)
    expect(isValidRgb(1)).toBe(false)
    expect(isValidRgb({ random: 'object' })).toBe(false)
  })
  it('returns false when given invalid rbg codes', () => {
    expect(isValidRgb('rgb(w,w,w)')).toBe(false)
    expect(isValidRgb('rgb(200,200,200,1)')).toBe(false)
    expect(isValidRgb('rgb(1000,1000,1000)')).toBe(false)
  })
  it('returns false when given invalid rbga codes', () => {
    expect(isValidRgb('rgba(w,w,w,w)')).toBe(false)
    expect(isValidRgb('rgba(200,200,200)')).toBe(false)
    expect(isValidRgb('rgba(200,200,200,2)')).toBe(false)
    expect(isValidRgb('rgba(1000,1000,1000,2)')).toBe(false)
  })
  it('returns true when given valid rbg codes', () => {
    expect(isValidRgb('rgb(0,0,0)')).toBe(true)
    expect(isValidRgb('rgb(10,50,80)')).toBe(true)
    expect(isValidRgb('rgb(10, 50, 80)')).toBe(true)
    expect(isValidRgb('rgb(255,255,255)')).toBe(true)
  })
  it('returns true when given valid rbga codes', () => {
    expect(isValidRgb('rgba(0,0,0,0)')).toBe(true)
    expect(isValidRgb('rgba(10,50,80,1)')).toBe(true)
    expect(isValidRgb('rgba(10, 50, 80, 1)')).toBe(true)
    expect(isValidRgb('rgba(255,255,255,0)')).toBe(true)
    expect(isValidRgb('rgba(255,255,255,1)')).toBe(true)
    expect(isValidRgb('rgba(255,255,255,0.2171)')).toBe(true)
  })
})

describe('asHex', () => {
  it('returns false when given invalid rbg values', () => {
    expect(asHex(false)).toBe(false)
    expect(asHex(undefined)).toBe(false)
    expect(asHex(1)).toBe(false)
    expect(asHex({ random: 'object' })).toBe(false)
  })
  it('returns hex when given valid rbg values', () => {
    expect(asHex(37, 102, 242)).toBe('#2566F2')
    expect(asHex(37, 102, 242, 0)).toBe('#2566F2')
    expect(asHex(255, 255, 255, 0)).toBe('#FFFFFF')
  })
})

describe('asRgb', () => {
  it('returns false when given invalid hex', () => {
    expect(asRgb(false)).toBe(false)
    expect(asRgb(undefined)).toBe(false)
    expect(asRgb(1)).toBe(false)
    expect(asRgb('_')).toBe(false)
    expect(asRgb({ random: 'object' })).toBe(false)
  })
  it('returns rgb when given valid hex', () => {
    expect(asRgb('#2566F2')).toStrictEqual([37, 102, 242])
    expect(asRgb('2566F2')).toStrictEqual([37, 102, 242])
    expect(asRgb('#2566F214')).toStrictEqual([37, 102, 242])
  })
})

describe('asRgbArray', () => {
  it('returns false when given invalid rbg code', () => {
    expect(asRgbArray(false)).toBe(false)
    expect(asRgbArray(undefined)).toBe(false)
    expect(asRgbArray(1)).toBe(false)
    expect(asRgbArray({ random: 'object' })).toBe(false)
  })
  it('returns array when given valid rbg values', () => {
    expect(asRgbArray('rgb(100,100,100)')).toStrictEqual(['100', '100', '100'])
    expect(asRgbArray('rgb(0,0,0)')).toStrictEqual(['0', '0', '0'])
    expect(asRgbArray('rgb(255,255,255)')).toStrictEqual(['255', '255', '255'])
    expect(asRgbArray('rgba(255,255,255,0)')).toStrictEqual(['255', '255', '255'])
  })
})

describe('blend', () => {
  it('returns default when given invalid colour', () => {
    expect(blend(false)).toBe(false)
    expect(blend(undefined)).toBe(false)
    expect(blend(1)).toBe(false)
    expect(blend('_')).toBe(false)
    expect(blend({ random: 'object' })).toBe(false)
  })
  it('returns hex when given valid rbg values', () => {
    expect(blend('rgba(255,255,255,0)')).toBe('#FFFFFF')
    expect(blend('rgb(255,255,255)')).toBe('#FFFFFF')
    expect(blend('rgb(67,67,67)')).toBe('#E0E0E0')
  })
  it('returns hex when given valid hex values', () => {
    expect(blend('#00ADD8')).toBe('#D6F1F8')
    expect(blend('#B57EE5')).toBe('#F3EAFA')
    expect(blend('#B57EE514')).toBe('#F3EAFA')
    expect(blend('B57EE5')).toBe('#F3EAFA')
  })
  it('returns hex when given valid colour and opacity', () => {
    expect(blend('#00ADD8', 1)).toBe('#00ADD8')
    expect(blend('#00ADD8', 0)).toBe('#FFFFFF')
    expect(blend('#00ADD8', 0.1)).toBe('#E5F6FB')
  })
  it('returns hex when given colour and invalid opacity', () => {
    expect(blend('#00ADD8', 2)).toBe('#00ADD8')
    expect(blend('#00ADD8', 'm')).toBe('#D6F1F8')
    expect(blend('#00ADD8', -12)).toBe('#FFFFFF')
    expect(blend('#00ADD8', { random: 'object' })).toBe('#D6F1F8')
  })
  it('returns hex when given specified background colour', () => {
    expect(blend('#00ADD8', 0.5)).toBe('#7FD6EB')
    expect(blend('#00ADD8', 0.5, [100, 100, 100])).toBe('#32889E')
    expect(blend('#00ADD8', 0.5, [200, 200, 200])).toBe('#64BAD0')
  })
})
