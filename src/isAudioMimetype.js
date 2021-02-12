/**
 * @param {string} fileMimeType input, must be a string
 * @param {Array<string>} types input, must be an array
 * @returns {boolean}
 * @example
 * isAudioMimetype('audio/mpeg'); // => true
 * isAudioMimetype('audio/x-aiff', ['mpeg', 'x-aiff']); // => true
 * isAudioMimetype('audio/x-aiff'); // => false
 */
module.exports = function isAudioMimetype(fileMimeType, types = ['mpeg']) {
  const audioMimetypeRegex = new RegExp(`^audio\/(${types.join('|')})$`);
  return audioMimetypeRegex.test(fileMimeType);
}
