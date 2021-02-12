/**
 * @param {string} email input, must be a string
 * @returns {boolean}
 * @example
 * isEmail('email@address.com'); // => true
 * isEmail('email@address.c'); // => false
 */
module.exports = function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
