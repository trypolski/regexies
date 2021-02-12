/**
 * @param {string} fileMimeType input, must be a string
 * @param {Array<string>} types input, must be an array
 * @returns {boolean}
 * @example
 * isVideoMimetype('video/mp4'); // => true
 * isVideoMimetype('audio/x-msvideo', ['mpeg', 'x-msvideo']); // => true
 * isVideoMimetype('video/x-msvideo'); // => false
 */
module.exports = function isVideoMimetype(fileMimeType, types = ['mpeg', 'mp4', 'quicktime']) {
  const videoMimetypeRegex = new RegExp(`^video\/(${types.join('|')})$`);
  return videoMimetypeRegex.test(fileMimeType);
}
