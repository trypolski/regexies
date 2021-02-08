const LETTERS_BY_COUNTRY = {
  en: { lowercase: 'a-z', capital: 'A-Z' },
  de: { lowercase: 'a-z\u00e4\u00f6\u00fc\u00df', capital: 'A-Z\u00c4\u00d6\u00dc'},
  es: { lowercase: 'a-zñáéíóúü', capital: 'A-ZÑÁÉÍÓÚÜ' },
  ru: { lowercase: 'а-я\u0451', capital: 'А-Я\u0401' },
  ua: { lowercase: 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя', capital: 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ' },
  fr: { lowercase: 'a-zàâçéèêëîïôûùüÿñæœ', capital: 'A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ' },
}

const CHARACTERS_TO_ESCAPE = '.^$*+?()[]{}\\|/-';

function escapeShort(s) {
  let r = '';
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    r += CHARACTERS_TO_ESCAPE.indexOf(c) === -1 ? c : `\\${c}`;
  }
  return r;
}

function escapeLong(s) {
	return s.replace(/[\.\^\$\*\+\?\(\)\[\]\{\}\\\|\/\-]/g, '\\$&');
}

function escape(s) {
  return s.length > 60 ? escapeLong(s) : escapeShort(s);
}

function convertCharToUnicode(char) {
  const charHex = char.codePointAt(0).toString(16);
  return '\\u' + '0000'.substring(0, 4 - charHex.length) + charHex;
}

function createIs(userOptions = {}, checkOptionsInput = false) {
  if (typeof userOptions !== 'object' || (Array.isArray(userOptions) && userOptions.length === 0)) { throw 'The second argument (options) should be an object or of objects' }
  if (typeof checkOptionsInput !== 'boolean') { throw 'The third argument should be a boolean' }

  const IS_DEFAULT_OPTIONS = {
    numbers: false,
    lettersCountry: 'en',
    lettersAll: false,
    lettersCapital: false,
    lettersLowercase: false,
    minLength: undefined,
    maxLength: undefined,
    specialCharacters: '',
    optional: false,
    exact: '',
  }

  function checkOptions(options) {
    if (typeof options.numbers !== 'boolean') { throw 'Option "numbers" should be boolean' }
    if (typeof options.lettersCountry !== 'string') { throw 'Option "lettersCountry" should be string with country shortname' }
    if (!LETTERS_BY_COUNTRY[options.lettersCountry]) { throw 'Sorry, the function does not support this country letters' }
    if (typeof options.lettersAll !== 'boolean') { throw 'Option "lettersAll" should be boolean' }
    if (typeof options.lettersCapital !== 'boolean') { throw 'Option "lettersCapital" should be boolean' }
    if (typeof options.lettersLowercase !== 'boolean') { throw 'Option "lettersLowercase" should be boolean' }
    const typeofMinLength = typeof options.minLength;
    if (typeofMinLength !== 'undefined' && typeofMinLength !== 'number' && typeofMinLength !== 'string') { throw 'Option "minLength" should be undefined, number or string' }
    const typeofMaxLength = typeof options.maxLength;
    if (typeofMaxLength !== 'undefined' && typeofMaxLength !== 'number' && typeofMaxLength !== 'string') { throw 'Option "minLength" should be undefined, number or string' }
    if (typeof options.specialCharacters !== 'string') { throw 'Option "specialCharacters" should be string' }
    if (typeof options.optional !== 'boolean') { throw 'Option "optional" should be boolean' }
    if (typeof options.exact !== 'string') { throw 'Option "exact" should be string' }
  }

  const optionsArray = Array.isArray(userOptions) ? userOptions : [userOptions];
  const regexStringArray = optionsArray.map(optionsObj => {
    const options = { ...IS_DEFAULT_OPTIONS, ...optionsObj };
    if (checkOptionsInput) {
      checkOptions(options);
    }
  
    const numbers = options.numbers ? '0-9' : '';
    const letters = `${options.lettersAll || options.lettersCapital ? LETTERS_BY_COUNTRY[options.lettersCountry].capital : ''}${options.lettersAll || options.lettersLowercase ? LETTERS_BY_COUNTRY[options.lettersCountry].lowercase : ''}`;
    const length = options.exact ? '' : options.minLength === undefined && options.maxLength === undefined ? '*' : `{${options.minLength !== undefined ? options.minLength : 0},${options.maxLength !== undefined ? options.maxLength : ''}}`;
    const characters = escape(options.specialCharacters);
    const exactUpdated = options.exact ? escape(options.exact) : `[${numbers}${letters}${characters}]`;
    const lengthUpdated = exactUpdated + length;
    return options.optional ? `(${lengthUpdated})?` : lengthUpdated;
  });
  return new RegExp(`^${regexStringArray.join('')}$`);
}

function is(string, userOptions, checkOptionsInput) {
  try {
    if (typeof string !== 'string' || string.length < 1) {
      throw 'The first argument should be not an empty string';
    }
    return createIs(userOptions, checkOptionsInput).test(string);
  } catch (error) {
    return error;
  }
}

function isBearer(headerValue) {
  return /^Bearer [\s\S*]{1,}$/.test(headerValue);
}

function isUuid(uuid, onlyVersion4) {
  const uuidRegex = new RegExp(`^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${onlyVersion4 ? '4[0-9a-fA-F]{3}' : '[0-9a-fA-F]{4}'}-${onlyVersion4 ? '[89ABab][0-9a-fA-F]{3}' : '[0-9a-fA-F]{4}'}-[0-9a-fA-F]{12}$`);
  return uuidRegex.test(uuid);
}

function isPassword(password, minLength = 8, maxLength = 30, symbols = '!"§$%&()=?*+#,.;:_-') {
  const passwordRegex = new RegExp(`^[a-zA-Z0-9${symbols}]{${minLength},${maxLength}}$`);
  return passwordRegex.test(password);
}

function isEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isJwt(jwt) {
  return /^([a-zA-Z0-9_=]{4,})\.([a-zA-Z0-9_=]{4,})\.([a-zA-Z0-9_\-\+\/=]{4,})/.test(jwt);
}

function isUrl(url, includesHttp = true) {
  const urlRegex = new RegExp(`^${includesHttp ? 'https?:\/\/(www\.)?' : ''}[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`);
  return urlRegex.test(url);
}

function isHexColor(hex, dash = true) {
  const hexRegex = new RegExp(`^${dash ? '#' : ''}(?:[a-fA-F\\d]{3}){1,2}$`);
  return hexRegex.test(hex);
}

function isImageMimetype(fileMimeType, types = ['png', 'jpeg', 'gif']) {
  const imageMimetypeRegex = new RegExp(`^image\/(${types.join('|')})$`);
  return imageMimetypeRegex.test(fileMimeType);
}

function isAudioMimetype(fileMimeType, types = ['mpeg']) {
  const audioMimetypeRegex = new RegExp(`^audio\/(${types.join('|')})$`);
  return audioMimetypeRegex.test(fileMimeType);
}

function isVideoMimetype(fileMimeType, types = ['mpeg', 'mp4', 'quicktime']) {
  const videoMimetypeRegex = new RegExp(`^video\/(${types.join('|')})$`);
  return videoMimetypeRegex.test(fileMimeType);
}

function isMimetype(fileMimeType, mimePrefix = 'image', types = ['png', 'jpeg', 'gif']) {
  const mimeTypeRegex = new RegExp(`^${mimePrefix}\/(${types.join('|')})$`);
  return mimeTypeRegex.test(fileMimeType);
}

function isNumbersOnly(string) {
  return /^[0-9]*$/.test(string);
}

function isObjectId(id) {
  return /^[a-f0-9]{24}$/.test(id);
}

function isRomanNumber(number) {
  return /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(number);
}

function isTwitterHandle(string) {
  return /^[a-zA-Z0-9_]{1,15}$/.test(string);
}

function isLinkedInProfileUrl(url) {
  return /^(https?:\/\/)?(www.|([a-z]{2}).)?linkedin.com\/in\/\S{3,100}\/?$/.test(url);
}

function isFacebookProfileUrl(url) {
  return /^(https?:\/\/)?(www.)?facebook.com\/[a-zA-Z0-9.]{5,}\/?$/.test(url);
}

module.exports = {
  is,
  createIs,
  isBearer,
  isUuid,
  isPassword,
  isEmail,
  isJwt,
  isUrl,
  isHexColor,
  isImageMimetype,
  isAudioMimetype,
  isVideoMimetype,
  isMimetype,
  isNumbersOnly,
  isObjectId,
  isMongoId: isObjectId,
  isRomanNumber,
  isTwitterHandle,
  isLinkedInProfileUrl,
  isFacebookProfileUrl,
  escape,
  escapeShort,
  escapeLong
}
