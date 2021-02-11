/**
 * @param {string} string input, must be a string
 * @returns {boolean}
 * @example
 * isNumbersOnly('12345678901234567890'); // => true
 * isNumbersOnly('1a234567ssd890.'); // => false
 */
module.exports = function isNumbersOnly(string) {
  return /^[0-9]*$/.test(string);
}
