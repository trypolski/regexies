const CHARACTERS_TO_ESCAPE = require('./constants').CHARACTERS_TO_ESCAPE;

/**
 * @param {string} s input, must be a string
 * @returns {string}
 * @example
 * escapeShort('.^$*+?()[]{}\\|/-'); // => '\\.\\^\\$\\*\\+\\?\\(\\)\\[\\]\\{\\}\\\\\\|\\/\\-'
 */
module.exports = function escapeShort(s) {
  let r = '';
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    r += CHARACTERS_TO_ESCAPE.indexOf(c) === -1 ? c : `\\${c}`;
  }
  return r;
}
