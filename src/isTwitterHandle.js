/**
 * @param {string} string input, must be a string
 * @returns {boolean}
 * @example
 * isTwitterHandle('john_smith09'); // => true
 * isTwitterHandle('john_$mith09'); // => false
 */
module.exports = function isTwitterHandle(string) {
  return /^[a-zA-Z0-9_]{1,15}$/.test(string);
}
