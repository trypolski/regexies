/**
 * @param {string} url input, must be a string
 * @returns {boolean}
 * @example
 * isLinkedInProfileUrl('http://ca.linkedin.com/in/johnsmith'); // => true
 * isLinkedInProfileUrl('https://www.linkedin.com/in/jo/'); // => false
 */
module.exports = function isLinkedInProfileUrl(url) {
  return /^(https?:\/\/)?(www.|([a-z]{2}).)?linkedin.com\/in\/\S{3,100}\/?$/.test(url);
}
