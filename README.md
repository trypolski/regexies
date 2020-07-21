# Regexies

The library includes a list of popular regex functions for every project usage. If you are lazy enough to create your own regular expressions or bored to move regex helper functions from project to project (like me) than Regexies is a good choise.

## Install
Install using npm:
```javascript
npm i regexies
```
## Import
Import to your existing code:
```javascript
const regexies = require('regexies')
or
import regexies from 'regexies'

regexies.isPassword('sometestpassword')
```
Or import only functions you need:
```javascript
const isPassword = require('regexies').isPassword
or
import { isPassword } from 'regexies'

isPassword('sometestpassword')
```

## Documentation
#### isEmail
Verify email address using "isEmail" function. This function checks common addresses, but doesn't include all possible names. If your project should support specific email addresses, it's better to create your own extended regex.
```javascript
const isCorrectEmail = isEmail('email@address.com') // true
const isCorrectEmail = isEmail('email@address.c') // false
```

#### isPassword
Verify passwords using "isPassword" function. By default password's length should be 8-30 and !"§$%&()=?*+#,.;:_- are allowed symbols.
```javascript
const isCorrectPassword = isPassword('asdsa%&()=123') // true
const isCorrectPassword = isPassword('!"§$%&a') // false (too short)
const isCorrectPassword = isPassword('!"§$%&aasdasdajhdawzdgaw56789asdaskdjn?*+#,.;') // false (too long)
```
You can extend current function changing min/max length and add your set of supported symbols
isPassword(password, minLength, maxLength, customSetOfSymbols)
```javascript
const isCorrectPassword = isPassword('123abc', 5) // true
const isCorrectPassword = isPassword('!"§$%&aasdasdajhdawzdgaw56789asdaskdjn?*+#,.;', 8, 60) // true
const isCorrectPassword = isPassword('123abc°', 5, 20, '°') // true
// but
const isCorrectPassword = isPassword('123abc°!', 5, 20, '°') // false
```

#### isUuid
Verify uuid string using "isUuid" function. By default the function supports all versions of uuid.
```javascript
const isCorrectUuid = isUuid('e56ef521-03b3-4664-8e69-982729ebe460') // true (version 4)
const isCorrectUuid = isUuid('b5fafcae-c961-11ea-87d0-0242ac130003') // true (version 1)
const isCorrectUuid = isUuid('b5fafcaec96111ea-87d0-0242ac130003') // false
```
Just add second argument as true, to exclude support of other uuid versions except version 4.
```javascript
const isCorrectUuidV4 = isUuid('e56ef521-03b3-4664-8e69-982729ebe460', true) // true (version 4)
const isCorrectUuidV4 = isUuid('b5fafcae-c961-11ea-87d0-0242ac130003', true) // false (version 1)
```

#### isBearer
Verify Authorization header data that looks like "Bearer some.token.value" using "isBearer" function.
```javascript
const isCorrectBearer = isBearer('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // true
const isCorrectBearer = isBearer('BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // false
const isCorrectBearer = isBearer('"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI"') // false
```

#### isJwt
Verify value of JWT token using "isJwt" function. There is a way to create more strict regex to check Base64Url encoded data string for JWT token. Regexies allows not only "." symbol in encoded string, but some additional symbols as required for Base64Url encoded data.
```javascript
const isCorrectJwt = isJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ') // true
const isCorrectJwt = isJwt('eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA.as1') // false
const isCorrectJwt = isJwt('"eyJ.eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA"') // false
```

#### isUrl
Verify URLs using "isUrl" function. By default "http" or "https" prefix is required, but you can always disable it adding second argument to the function as "false".
```javascript
const isCorrectUrl = isUrl('http://google.com/') // true
const isCorrectUrl = isUrl('https://google.com/') // true
const isCorrectUrl = isUrl('google.com/') // false
// but
const isCorrectUrl = isUrl('www.google.com', false) // true
const isCorrectUrl = isUrl('&google.com', false) // false
```

#### isHexColor
Verify css colors using "isHexColor" function. By default hex color should start with "#" symbol, but you can disable it adding second argument to the function as "false".
```javascript
const isCorrectHexColor = isHexColor('#fFf111') // true
const isCorrectHexColor = isHexColor('#000') // true
const isCorrectHexColor = isHexColor('#000qff') // false
const isCorrectHexColor = isHexColor('000000') // false
// but
const isCorrectHexColor = isHexColor('000FFF', false) // true
const isCorrectHexColor = isHexColor('000', false) // true
const isCorrectHexColor = isHexColor('00W880', false) // false
```

#### isImageMimetype
Verify MIME type of image files using "isImageMimetype" function. By default the function allows "image/png", "image/jpeg", and "image/gif".
```javascript
const isCorrectImageType = isImageMimetype('image/png') // true
const isCorrectImageType = isImageMimetype('image/x-icon') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectImageType = isImageMimetype('image/x-icon', ['png', 'jpeg', 'x-icon']) // true
```
If you want to add support of "image/svg+xml" you need to add additional escapes as:
```javascript
const isCorrectImageType = isImageMimetype('image/svg+xml', ['png', 'jpeg', 'svg\\+xml']) // true
```
:exclamation: Be careful, possibility to upload svg files isn't safe for your project(svg files could include js code). Don't allow extensions you are not sure about.

#### isAudioMimetype
Verify MIME type of audio files using "isAudioMimetype" function. By default the function allows only "audio/mpeg".
```javascript
const isCorrectAudioType = isAudioMimetype('audio/mpeg') // true
const isCorrectAudioType = isAudioMimetype('audio/x-aiff') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectAudioType = isAudioMimetype('audio/x-aiff', ['mpeg', 'x-aiff']) // true
```

#### isVideoMimetype
Verify MIME type of video files using "isVideoMimetype" function. By default the function allows "video/mpeg", "video/mp4", and "video/quicktime".
```javascript
const isCorrectVideoType = isVideoMimetype('video/mp4') // true
const isCorrectVideoType = isVideoMimetype('video/x-msvideo') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectVideoType = isVideoMimetype('audio/x-msvideo', ['mpeg', 'x-msvideo']) // true
```

#### isMimetype
Verify any MIME type of files using "isMimeType" function. By default this function works as "isImageMimetype", but you can extend it for every file type. Use second argument to set prefix as 'image' or 'application'. Add array of types as third argument.
```javascript
const isCorrectType = isMimetype('application/zip', 'application', ['zip', 'vnd.ms-excel']) // true
const isCorrectType = isMimetype('video/x-msvideo', 'application', ['zip', 'vnd.ms-excel']) // false
```
:exclamation: This function give you more space, but it's not always good and safe. Try to use more strict functions as isImageMimetype/isAudioMimetype if it's possible. If type has specific symbols, escape them like "svg\\+xml".

## Tests
Tests are not included in regexies library if you install it through npm. Please clone git repo of the library to find tests.

## Updates
Expect more functions with next everyweek updates.