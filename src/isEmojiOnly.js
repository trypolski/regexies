/**
 * @param {string} string input, must be a string
 * @returns {boolean}
 * @example
 * isEmojiOnly('😀💩👀'); // => true
 * isEmojiOnly('asd'); // => false
 * isEmojiOnly('1💩0'); // => false
 */
module.exports = function isEmojiOnly(string) {
  return /^([\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251])*$/.test(string);
}
