/**
 * @param {string} fileMimeType input, must be a string
 * @param {Array<string>} types input, must be an array
 * @returns {boolean}
 * @example
 * isImageMimetype('image/png'); // => true
 * isImageMimetype('image/svg+xml', ['png', 'jpeg', 'svg\\+xml']); // => true
 * isImageMimetype('image/x-icon'); // => false
 */
module.exports = function isImageMimetype(fileMimeType, types = ['png', 'jpeg', 'gif']) {
  const imageMimetypeRegex = new RegExp(`^image\/(${types.join('|')})$`);
  return imageMimetypeRegex.test(fileMimeType);
}
