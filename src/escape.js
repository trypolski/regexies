const escapeShort = require('./escapeShort');
const escapeLong = require('./escapeLong');

/**
  * @param {string} s input, must be a string
  * @returns {string}
  * @example
  * escape('.^$*+?()[]{}\\|/-'); // => '\\.\\^\\$\\*\\+\\?\\(\\)\\[\\]\\{\\}\\\\\\|\\/\\-'
*/
module.exports = function escape(s) {
  return s.length > 60 ? escapeLong(s) : escapeShort(s);
}
