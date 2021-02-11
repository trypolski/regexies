/**
 * @param {string} hex input, must be a string
 * @param {boolean>} dash input, must be a boolean
 * @returns {boolean}
 * @example
 * isHexColor('#fFf111'); // => true
 * isHexColor('000FFF', false); // => true
 * isHexColor('#000qff'); // => false
 */
module.exports = function isHexColor(hex, dash = true) {
  const hexRegex = new RegExp(`^${dash ? '#' : ''}(?:[a-fA-F\\d]{3}){1,2}$`);
  return hexRegex.test(hex);
}
