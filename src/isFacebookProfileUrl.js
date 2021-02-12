/**
 * @param {string} url input, must be a string
 * @returns {boolean}
 * @example
 * isFacebookProfileUrl('https://www.facebook.com/john.smith01/'); // => true
 * isFacebookProfileUrl('https://www.facebook.com/john/'); // => false
 */
module.exports = function isFacebookProfileUrl(url) {
  return /^(https?:\/\/)?(www.)?facebook.com\/[a-zA-Z0-9.]{5,}\/?$/.test(url);
}
