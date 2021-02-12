/**
  * @param {string} s input, must be a string
  * @returns {string}
  * @example
  * convertToUnicode(); // => ''
*/
module.exports = function convertToUnicode(s) {
  let r = '';
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    const h = c.codePointAt(0).toString(16);
    r += '\\u' + '0000'.substring(0, 4 - h.length) + h;
  }
  return r;
}
