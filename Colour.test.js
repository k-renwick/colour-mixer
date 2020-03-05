import {
  isValidHex,
  isValidRgb,
  asHex,
  asRgbArray,
  blend,
  darken,
  lighten
} from './Colour'

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

describe('asRgbArray', () => {
  it('returns false when given invalid colour code', () => {
    expect(asRgbArray(false)).toBe(false)
    expect(asRgbArray(undefined)).toBe(false)
    expect(asRgbArray(1)).toBe(false)
    expect(asRgbArray('_')).toBe(false)
    expect(asRgbArray({ random: 'object' })).toBe(false)
  })
  it('returns array when given valid colour code', () => {
    expect(asRgbArray('rgb(100,100,100)')).toEqual([100, 100, 100])
    expect(asRgbArray('rgb(0,0,0)')).toEqual([0, 0, 0])
    expect(asRgbArray('rgb(255,255,255)')).toEqual([255, 255, 255])
    expect(asRgbArray('rgba(255,255,255,0)')).toEqual([255, 255, 255])
    expect(asRgbArray('#2566F2')).toEqual([37, 102, 242])
    expect(asRgbArray('2566F2')).toEqual([37, 102, 242])
    expect(asRgbArray('#2566F214')).toEqual([37, 102, 242])
  })
})

describe('blend', () => {
  it('returns false when given invalid colour or percentage', () => {
    expect(blend(false)).toBe(false)
    expect(blend(undefined)).toBe(false)
    expect(blend(1)).toBe(false)
    expect(blend('_')).toBe(false)
    expect(blend({ random: 'object' })).toBe(false)
    expect(blend('#00ADD8', 'm')).toBe(false)
    expect(blend('#00ADD8', { random: 'object' })).toBe(false)
  })
  it('returns hex when given valid rbg values', () => {
    expect(blend('rgba(255,255,255,0)')).toBe('#FFFFFF')
    expect(blend('rgb(255,255,255)')).toBe('#FFFFFF')
    expect(blend('rgb(67,67,67)')).toBe('#A1A1A1')
  })
  it('returns hex when given valid hex values', () => {
    expect(blend('#00ADD8')).toBe('#7FD6EB')
    expect(blend('#B57EE5')).toBe('#DABEF2')
    expect(blend('#B57EE514')).toBe('#DABEF2')
    expect(blend('B57EE5')).toBe('#DABEF2')
  })
  it('returns hex when given valid colour and percentage', () => {
    expect(blend('#00ADD8', 1)).toBe('#00ADD8')
    expect(blend('#00ADD8', 0)).toBe('#FFFFFF')
    expect(blend('#00ADD8', 0.1)).toBe('#E5F6FB')
  })
  it('returns hex when given colour and invalid percentage', () => {
    expect(blend('#00ADD8', 2)).toBe('#00ADD8')
    expect(blend('#00ADD8', -12)).toBe('#FFFFFF')
  })
  it('returns hex when given specified background colour', () => {
    expect(blend('#00ADD8', 0.5)).toBe('#7FD6EB')
    expect(blend('#00ADD8', 0.5, 'rgb(100,100,100)')).toBe('#32889E')
    expect(blend('#00ADD8', 0.5, 'rgb(200, 200, 200)')).toBe('#64BAD0')
  })
})

describe('lighten', () => {
  it('returns false when given invalid colour or percentage', () => {
    expect(lighten(false)).toBe(false)
    expect(lighten(undefined)).toBe(false)
    expect(lighten(1)).toBe(false)
    expect(lighten('_')).toBe(false)
    expect(lighten({ random: 'object' })).toBe(false)
    expect(lighten('#00ADD8', 'm')).toBe(false)
    expect(lighten('#00ADD8', { random: 'object' })).toBe(false)
  })
  it('returns hex when given valid rbg values', () => {
    expect(lighten('rgba(255,255,255,0)')).toBe('#FFFFFF')
    expect(lighten('rgb(255,255,255)')).toBe('#FFFFFF')
    expect(lighten('rgb(67,67,67)')).toBe('#A1A1A1')
  })
  it('returns hex when given valid hex values', () => {
    expect(lighten('#00ADD8')).toBe('#7FD6EB')
    expect(lighten('#B57EE5')).toBe('#DABEF2')
    expect(lighten('#B57EE514')).toBe('#DABEF2')
    expect(lighten('B57EE5')).toBe('#DABEF2')
  })
  it('returns hex when given valid colour and percentage', () => {
    expect(lighten('#00ADD8', 1)).toBe('#00ADD8')
    expect(lighten('#00ADD8', 0)).toBe('#FFFFFF')
    expect(lighten('#00ADD8', 0.1)).toBe('#E5F6FB')
  })
  it('returns hex when given colour and out-of-range percentage', () => {
    expect(lighten('#00ADD8', 2)).toBe('#00ADD8')
    expect(lighten('#00ADD8', -12)).toBe('#FFFFFF')
  })
})

describe('darken', () => {
  it('returns false when given invalid colour or percentage', () => {
    expect(darken(false)).toBe(false)
    expect(darken(undefined)).toBe(false)
    expect(darken(1)).toBe(false)
    expect(darken('_')).toBe(false)
    expect(darken({ random: 'object' })).toBe(false)
    expect(darken('#00ADD8', 'm')).toBe(false)
    expect(darken('#00ADD8', { random: 'object' })).toBe(false)
  })
  it('returns hex when given valid rbg values', () => {
    expect(darken('rgba(255,255,255,0)')).toBe('#7F7F7F')
    expect(darken('rgb(255,255,255)')).toBe('#7F7F7F')
    expect(darken('rgb(100,100,100)')).toBe('#323232')
  })
  it('returns hex when given valid hex values', () => {
    expect(darken('#00ADD8')).toBe('#00566C')
    expect(darken('#B57EE5')).toBe('#5A3F72')
    expect(darken('#B57EE514')).toBe('#5A3F72')
    expect(darken('B57EE5')).toBe('#5A3F72')
  })
  it('returns hex when given valid colour and percentage', () => {
    expect(darken('#00ADD8', 1)).toBe('#00ADD8')
    expect(darken('#00ADD8', 0)).toBe('#000000')
    expect(darken('#00ADD8', 0.3)).toBe('#003340')
  })
  it('returns hex when given colour and out-of-range percentage', () => {
    expect(darken('#00ADD8', 2)).toBe('#00ADD8')
    expect(darken('#00ADD8', -12)).toBe('#000000')
  })
})
