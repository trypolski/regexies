/**
 * @param {string} password input, must be a string
 * @param {number} minLength input, must be a number
 * @param {number} maxLength input, must be a number
 * @param {string} symbols input, must be a string
 * @returns {boolean}
 * @example
 * isPassword('asdsa%&()=123'); // => true
 * isPassword('!"§$%&aasdasdajhdawzdgaw56789asdaskdjn?*+#,.;', 8, 60); // => true
 * isPassword('!"§$%&a'); // => false
 */
module.exports = function isPassword(password, minLength = 8, maxLength = 30, symbols = '!"§$%&()=?*+#,.;:_-') {
  const passwordRegex = new RegExp(`^[a-zA-Z0-9${symbols}]{${minLength},${maxLength}}$`);
  return passwordRegex.test(password);
}
