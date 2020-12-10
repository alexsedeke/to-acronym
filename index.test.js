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
    const result = acronym('Dual Green Services for Simple Environment')
    expect(result).toBe('DGSSE')
  })

  it('should transform single word to acronym', () => {
    const result = acronym('System')
    expect(result).toBe('STM')
  })

  it('should not use long inner acronym', () => {
    const result = acronym('IBM System')
    expect(result).toBe('IS')
  })

  it('should use long inner acronym', () => {
    const result = acronym('IBM System', { acronymMaxLength: 3 })
    expect(result).toBe('IBMS')
  })

  it('should use also lower case letters when maxLength is not reached', () => {
    const result = acronym('All birds get free food at out house', { maxLength: 5 })
    expect(result).toBe('ABGFF')
  })

  it('should use letters only with hight priotity', () => {
    const result = acronym('GE green System', { highPriorityOnly: true })
    expect(result).toBe('GES')
  })

  it('should trim result when too long', () => {
    const result = acronym('conclusion', { maxLength: 4 })
    expect(result).toBe('CCLN')
  })

  it('should return "NOSTRING" when value is not a string', () => {
    const result = acronym({ acronym: 'test'})
    expect(result).toBe('NOSTRING')
  })
})
