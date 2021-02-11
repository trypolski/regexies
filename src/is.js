const createIs = require('./createIs');

/**
  * @param {string} string input, must be a string
  * @param {object<IS_DEFAULT_OPTIONS>|Array<object>} userOptions input, must be an object or an array of objects
  * @param {boolean} checkOptionsInput input, must be a boolean
  * @returns {boolean}
  * @example
  * is('http://www.google.com/asd/', [
      { exact: 'http://www.google.com/' },
      { lettersLowercase: true },
      { specialCharacters: '/', minLength: 1, maxLength: 1 },
      { numbers: true, optional: true }
    ]); // => true
  * is('http://www.google.com/ASD/34423', [
      { exact: 'http://www.google.com/' },
      { lettersLowercase: true },
      { specialCharacters: '/', minLength: 1, maxLength: 1 },
      { numbers: true, optional: true }
    ]); // => false
 */
module.exports = function is(string, userOptions, checkOptionsInput) {
  try {
    if (typeof string !== 'string' || string.length < 1) {
      throw 'The first argument should be not an empty string';
    }
    return createIs(userOptions, checkOptionsInput).test(string);
  } catch (error) {
    return error;
  }
}
