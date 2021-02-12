/**
 * @param {string} fileMimeType input, must be a string
 * @param {string} mimePrefix input, must be a string
 * @param {Array<string>} types input, must be an array
 * @returns {boolean}
 * @example
 * isMimetype('application/zip', 'application', ['zip', 'vnd.ms-excel']); // => true
 * isMimetype('video/x-msvideo', 'application', ['zip', 'vnd.ms-excel']); // => false
 */
module.exports = function isMimetype(fileMimeType, mimePrefix = 'image', types = ['png', 'jpeg', 'gif']) {
  const mimeTypeRegex = new RegExp(`^${mimePrefix}\/(${types.join('|')})$`);
  return mimeTypeRegex.test(fileMimeType);
}
