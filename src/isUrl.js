/**
 * @param {string} url input, must be a string
 * @param {boolean>} includesHttp input, must be a boolean
 * @returns {boolean}
 * @example
 * isUrl('http://google.com/'); // => true
 * isUrl('www.google.com', false); // => true
 * isUrl('http://google.com/'); // => false
 */
module.exports = function isUrl(url, includesHttp = true) {
  const urlRegex = new RegExp(`^${includesHttp ? 'https?:\/\/(www\.)?' : ''}[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`);
  return urlRegex.test(url);
}
