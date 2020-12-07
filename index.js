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
function getWordAcronym (stringValue, isAcronym, acronymMaxLength = 2) {
  if (isAcronym && stringValue.length <= acronymMaxLength) {
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
 * 
 * @param {*} list 
 * @param {*} isMixedCase 
 * @returns {string} Returns acronym string.
 */
function acronymList (list, isMixedCase, options) {
  list = list.map(value => {
    const isAcronym = (isMixedCase && isUpperCaseOnly(value))
    return {
      value,
      isAcronym,
      isMixedCase,
      acronym: getWordAcronym(value, isAcronym, options.acronymMaxLength),
      priority: getWordPriority(value, isAcronym, isMixedCase)
    }
  })
  // concate string.
  const reducer = (accumulator, current) => {
    // do not use lower priority values
    if ((options.maxLength < list.length || options.highPriorityOnly === true) && current.priority === 0) {
      return (typeof accumulator === 'object') ? accumulator.acronym : accumulator
    }
    return (typeof accumulator === 'object') ? accumulator.acronym + current.acronym : accumulator + current.acronym
  }

  return list.reduce(reducer)
}

/**
 * Transform String with single word to acronym.
 * @param {string} stringValue String to create acronym from.
 * @returns {string} Returns acronym string.
 */
function acronymWord (stringValue) {
  const regexCharOnly = new RegExp('[a-zA-Z0-9]','g')
  const regexVowe = new RegExp('[aeiouyAEIYOU]','g')
  const reducer = (accumulator, current) => {
    if (accumulator.slice(-1) !== current) {
      return accumulator + current
    }
    return accumulator
  }
  let toAcronym = stringValue.match(regexCharOnly).join('')
  toAcronym = toAcronym.replace(regexVowe, '')
  toAcronym = toAcronym.toUpperCase().split('')
  toAcronym = toAcronym.reduce(reducer)
  return toAcronym
}

function trimAcronym (stringValue, maxLength) {
  if (stringValue.length <= maxLength) {
    return stringValue
  }

  const acronym = stringValue.split('')
  // always remove the second and penultimate element
  // con-clu-sion -> C-N-CL-S-N -> CCLN
  let secondPosition = true
  while (acronym.length > maxLength) {
    if (secondPosition === true) {
      acronym.splice(1, 1)
    } else {
      acronym.splice(acronym.length - 2, 1)
    }
    secondPosition = !secondPosition
  }
  return acronym.join('')
 }

/**
 * Transform String with single word or multiple words to acronym.
 * @param {string} stringSource String to create acronym from.
 * @param {object} options 
 * @returns {string} Returns acronym string.
 */
function acronym (stringSource, options = {}) {
  const _options = Object.assign({
    maxLength: 5,
    highPriorityOnly: false,
    acronymMaxLength: 2
  }, options)
  if (typeof stringSource !== 'string') {
    return 'NOSTRING'
  }

  // analyse entry
  let list = stringSource.split(/(?:,|-| )+/)
  const isUpperCase = hasUpperCase(stringSource)
  const isLowerCase = hasLowerCase(stringSource)
  const isMixedCase = (isUpperCase && isLowerCase)
  let acronym = ''

  if (list.length > 1) {
    acronym = acronymList(list, isMixedCase, _options)
  } else {
    acronym = acronymWord(list[0])
  }
  
  acronym = trimAcronym(acronym, _options.maxLength)
  return acronym
}

module.exports = { acronym }
