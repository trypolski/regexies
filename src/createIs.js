const LETTERS_BY_COUNTRY = require('./constants').LETTERS_BY_COUNTRY;
const IS_DEFAULT_OPTIONS = require('./constants').IS_DEFAULT_OPTIONS;
const escape = require('./escape');

/**
  * @param {object<IS_DEFAULT_OPTIONS>} userOptions input, must be an object
  * @param {boolean} checkOptionsInput input, must be a boolean
  * @returns {RegExp}
  * @example
  * createIs([
    { exact: 'http://www.google.com/' },
    { lettersLowercase: true },
    { specialCharacters: '/', minLength: 1, maxLength: 1 },
    { numbers: true, optional: true }
  ]); // => /^http:\/\/www\.google\.com\/[a-z]*[\/]{1,1}([0-9]*)?$/
*/
module.exports = function createIs(userOptions = {}, checkOptionsInput = false) {
  if (typeof userOptions !== 'object' || (Array.isArray(userOptions) && userOptions.length === 0)) { throw new TypeError('The second argument (options) should be an object or of objects') }
  if (typeof checkOptionsInput !== 'boolean') { throw new TypeError('The third argument should be a boolean') }

  function checkOptions(options) {
    if (typeof options.numbers !== 'boolean') { throw new TypeError('Option "numbers" should be boolean') }
    if (typeof options.lettersCountry !== 'string') { throw new TypeError('Option "lettersCountry" should be string with country shortname') }
    if (!LETTERS_BY_COUNTRY[options.lettersCountry]) { throw new TypeError('Sorry, the function does not support this country letters') }
    if (typeof options.lettersAll !== 'boolean') { throw new TypeError('Option "lettersAll" should be boolean') }
    if (typeof options.lettersCapital !== 'boolean') { throw new TypeError('Option "lettersCapital" should be boolean') }
    if (typeof options.lettersLowercase !== 'boolean') { throw new TypeError('Option "lettersLowercase" should be boolean') }
    const typeofMinLength = typeof options.minLength;
    if (typeofMinLength !== 'undefined' && typeofMinLength !== 'number' && typeofMinLength !== 'string') { throw new TypeError('Option "minLength" should be undefined, number or string') }
    const typeofMaxLength = typeof options.maxLength;
    if (typeofMaxLength !== 'undefined' && typeofMaxLength !== 'number' && typeofMaxLength !== 'string') { throw new TypeError('Option "minLength" should be undefined, number or string') }
    if (typeof options.specialCharacters !== 'string') { throw new TypeError('Option "specialCharacters" should be string') }
    if (typeof options.optional !== 'boolean') { throw new TypeError('Option "optional" should be boolean') }
    if (typeof options.exact !== 'string') { throw new TypeError('Option "exact" should be string') }
  }

  const optionsArray = Array.isArray(userOptions) ? userOptions : [userOptions];
  const regexStringArray = optionsArray.map(optionsObj => {
    const options = { ...IS_DEFAULT_OPTIONS, ...optionsObj };
    if (checkOptionsInput) {
      checkOptions(options);
    }
  
    const numbers = options.numbers ? '0-9' : '';
    const letters = `${options.lettersAll || options.lettersCapital ? LETTERS_BY_COUNTRY[options.lettersCountry].capital : ''}${options.lettersAll || options.lettersLowercase ? LETTERS_BY_COUNTRY[options.lettersCountry].lowercase : ''}`;
    const length = options.exact ? '' : options.minLength === undefined && options.maxLength === undefined ? '*' : `{${options.minLength !== undefined ? options.minLength : 0},${options.maxLength !== undefined ? options.maxLength : ''}}`;
    const characters = escape(options.specialCharacters);
    const exactUpdated = options.exact ? escape(options.exact) : `[${numbers}${letters}${characters}]`;
    const lengthUpdated = exactUpdated + length;
    return options.optional ? `(${lengthUpdated})?` : lengthUpdated;
  });
  return new RegExp(`^${regexStringArray.join('')}$`);
}
