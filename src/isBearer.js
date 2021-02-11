/**
 * @param {string} headerValue input, must be a string
 * @returns {boolean}
 * @example
 * isBearer('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI'); // => true
 * isBearer('BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI'); // => false
 */
module.exports = function isBearer(headerValue) {
  return /^Bearer [\s\S*]{1,}$/.test(headerValue);
}
