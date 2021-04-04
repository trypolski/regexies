const LETTERS_BY_COUNTRY = require('./constants').LETTERS_BY_COUNTRY;

/**
  * @param {string} slug input, must be a string
  * @param {string} separator input, must be a string with slug separator (by default '-')
  * @param {string} lang input, must be a string with language as 'de' (by default 'en')
  * @returns {boolean}
  * @example
  * isSlug('word-and-word'); // => true
  * isSlug('word_and_word', '_'); // => true
  * isSlug('слово_и_слово', '_', 'ru'); // => true
  * isSlug('1a234567ssd890.'); // => false
*/
 module.exports = function isSlug(slug, separator = '-', language = 'en') {
  const letters = LETTERS_BY_COUNTRY[language];
  const passwordRegex = new RegExp(`^[${letters.capital}${letters.lowercase}0-9]+(?:${separator}[${letters.capital}${letters.lowercase}0-9]+)*$`);
  return passwordRegex.test(slug);
}
