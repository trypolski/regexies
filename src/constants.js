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

const LETTERS_BY_COUNTRY = {
  en: { lowercase: 'a-z', capital: 'A-Z' },
  de: { lowercase: 'a-z\u00e4\u00f6\u00fc\u00df', capital: 'A-Z\u00c4\u00d6\u00dc'},
  es: { lowercase: 'a-zñáéíóúü', capital: 'A-ZÑÁÉÍÓÚÜ' },
  ru: { lowercase: 'а-я\u0451', capital: 'А-Я\u0401' },
  ua: { lowercase: 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя', capital: 'АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ' },
  fr: { lowercase: 'a-zàâçéèêëîïôûùüÿñæœ', capital: 'A-ZÀÂÇÉÈÊËÎÏÔÛÙÜŸÆŒ' },
}

const CHARACTERS_TO_ESCAPE = '.^$*+?()[]{}\\|/-';

module.exports = {
  IS_DEFAULT_OPTIONS,
  LETTERS_BY_COUNTRY,
  CHARACTERS_TO_ESCAPE,
}
