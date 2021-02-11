/**
 * @param {string} id input, must be a string
 * @returns {boolean}
 * @example
 * isObjectId('5f17d5d2040de74f301f686f'); // => true
 * isMongoId('abcdf1234012345678901234'); // => true
 * isObjectId('1a234567ssd890.'); // => false
 */
module.exports = function isObjectId(id) {
  return /^[a-f0-9]{24}$/.test(id);
}
