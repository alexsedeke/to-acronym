/**
 * Verify if string has lower case characters.
 * @param {string} stringValue String value to test.
 * @returns {boolean}
 */
function hasLowerCase (stringValue) {
  return (/[a-z]/.test(stringValue));
}

/**
 * Verify if string has upper case characters.
 * @param {string} stringValue String value to test.
 * @returns {boolean}
 */
function hasUpperCase (stringValue) {
  return (/[A-Z]/.test(stringValue));
}

/**
 * Verify if string has only upper case characters.
 * @param {string} stringValue String value to test.
 * @returns {boolean}
 */
function isUpperCaseOnly (stringValue) {
  return (stringValue.toUpperCase() === stringValue)
}

/**
 * Verify if string has only lower case characters.
 * @param {string} stringValue String value to test.
 * @returns {boolean}
 */
function isLoverCaseOnly (stringValue) {
  return (stringValue.toLowerCase() === stringValue)
}

/**
 * Analyse the string and return first letter if it is not
 * an acronym or acronym is longer than 2 letters. Otherwise
 * return the whole string.
 * @param {string} stringValue String value for analysis.
 * @param {boolean} isAcronym Is the String value a acronym.
 * @returns {string} First letter from string value.
 */
function getWordAcronym (stringValue, isAcronym) {
  if (isAcronym && stringValue.length <= 2) {
    return stringValue
  }

  return stringValue.charAt(0).toUpperCase()
}

/**
 * Analyse string priority and set index value. 1 is for higher priority,
 * 0 ist less priority. Acronym is high priority and also string starting with capital letter. 
 * @param {string} stringValue String value for prioritization.
 * @param {boolean} isAcronym Is the String value a acronym.
 * @param {boolean} isMixedCase Is the whole String in mixed case. 
 * @returns {number} Return priority index value.
 */
function getWordPriority (stringValue, isAcronym, isMixedCase) {
  const firstLetter = stringValue.charAt(0)
  if (isAcronym) {
    return 1
  } 
  if (isMixedCase && isUpperCaseOnly(firstLetter)) {
    return 1
  }
  return 0
}

/**
 * Transform String with single word or multiple words to acronym.
 * @param {string} stringSource String to create acronym from.
 * @param {object} options 
 * @returns {string} Returns acronym string.
 */
function acronym (stringSource, options = {}) {
  const _options = Object.assign({
    maxLength: 5
  }, options)
  if (typeof stringSource !== 'string') {
    return 'NOSTRING'
  }

  // analyse entry
  let list = stringSource.split(/(?:,|-| )+/)
  const isUpperCase = hasUpperCase(stringSource)
  const isLowerCase = hasLowerCase(stringSource)
  const isMixedCase = (isUpperCase && isLowerCase)

  list = list.map(value => {
    const isAcronym = (isMixedCase && isUpperCaseOnly(value))
    return {
      value,
      isAcronym,
      isMixedCase,
      acronym: getWordAcronym(value, isAcronym),
      priority: getWordPriority(value, isAcronym, isMixedCase)
    }
  })
  // concate string.
  const reducer = (accumulator, current) => {
    if (_options.maxLength < list.length && current.priority === 0) {
      return (typeof accumulator === 'object') ? accumulator.acronym : accumulator
    }
    return (typeof accumulator === 'object') ? accumulator.acronym + current.acronym : accumulator + current.acronym
  }

  return list.reduce(reducer)
}

module.exports = { acronym }
