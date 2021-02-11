/**
 * @param {string} jwt input, must be a string
 * @returns {boolean}
 * @example
 * isJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ'); // => true
 * isJwt('eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA.as1'); // => false
 */
module.exports = function isJwt(jwt) {
  return /^([a-zA-Z0-9_=]{4,})\.([a-zA-Z0-9_=]{4,})\.([a-zA-Z0-9_\-\+\/=]{4,})/.test(jwt);
}
