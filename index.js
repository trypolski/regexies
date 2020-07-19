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

module.exports = {
  isBearer,
  isUuid,
  isPassword,
  isEmail
}
