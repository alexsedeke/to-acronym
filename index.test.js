const { acronym } = require('./index')

describe('Acronym method', () => {
  it('should transform multiple uppercase words', () => {
    const result = acronym('Super Computer Services')
    expect(result).toBe('SCS')
  })

  it('should transform multiple lowercase words', () => {
    const result = acronym('cleaning services for london')
    expect(result).toBe('CSFL')
  })

  it('should transform multiple mixedcase words', () => {
    const result = acronym('Dual green Services')
    expect(result).toBe('DGS')
  })

  it('should transform multiple mixedcase words with short acronym', () => {
    const result = acronym('GE Green Services')
    expect(result).toBe('GEGS')
  })

  it('should transform multiple mixedcase words with short acronym', () => {
    const result = acronym('IBM Green Services')
    expect(result).toBe('IGS')
  })

  it('should transform multiple mixedcase words and use only upper priority words', () => {
    const result = acronym('Dual green Services for simple Environment')
    expect(result).toBe('DSE')
  })

  it('should transform single word to acronym', () => {
    const result = acronym('System')
    expect(result).toBe('STM')
  })

  it('should return "NOSTRING" when value is not a string', () => {
    const result = acronym({ acronym: 'test'})
    expect(result).toBe('NOSTRING')
  })
})
