/**
 * @param {string} string input, must be a string
 * @returns {boolean}
 * @example
 * isRomanNumber('X'); // => true
 * isRomanNumber('IIX'); // => false
 */
module.exports = function isRomanNumber(string) {
  return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(string);
}
