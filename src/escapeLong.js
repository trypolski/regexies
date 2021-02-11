/**
 * @param {string} s input, must be a string
 * @returns {string}
 * @example
 * escapeLong('.^$*+?()[]{}\\|/-'); // => '\\.\\^\\$\\*\\+\\?\\(\\)\\[\\]\\{\\}\\\\\\|\\/\\-'
 */
module.exports = function escapeLong(s) {
	return s.replace(/[\.\^\$\*\+\?\(\)\[\]\{\}\\\|\/\-]/g, '\\$&');
}
