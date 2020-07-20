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

module.exports = {
  isBearer,
  isUuid,
  isPassword,
  isEmail,
  isJwt,
  isUrl,
  isHexColor
}
