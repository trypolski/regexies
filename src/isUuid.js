/**
 * @param {string} uuid input, must be a string
 * @param {boolean>} onlyVersion4 input, must be a boolean
 * @returns {boolean}
 * @example
 * isUuid('e56ef521-03b3-4664-8e69-982729ebe460'); // => true
 * isUuid('e56ef521-03b3-4664-8e69-982729ebe460', true); // => true
 * isUuid('b5fafcaec96111ea-87d0-0242ac130003'); // => false
 */
module.exports = function isUuid(uuid, onlyVersion4) {
  const uuidRegex = new RegExp(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${onlyVersion4 ? '4[0-9a-fA-F]{3}' : '[0-9a-fA-F]{4}'}-${onlyVersion4 ? '[89ABab][0-9a-fA-F]{3}' : '[0-9a-fA-F]{4}'}-[0-9a-fA-F]{12}$`);
  return uuidRegex.test(uuid);
}
