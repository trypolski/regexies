# Regexies

The library includes a list of popular regex functions for every project usage. You can use special builder functions to create your own regexes.

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
Build your own regex using these functions:
* [is](#is)
* [createIs](#createIs)

Verify strings using these functions:  
* [Email address](#isemail)
* [Password](#ispassword)
* [UUID](#isuuid)
* [Bearer header](#isbearer)
* [JWT token](#isjwt)
* [URL](#isurl)
* [HEX color](#ishexcolor)
* [Image MIME type](#isimagemimetype)
* [Audio MIME type](#isaudiomimetype)
* [Video MIME type](#isvideomimetype)
* [Any custom MIME type](#ismimetype)
* [Numbers](#isnumbersonly)
* [ObjectId/MongoId](#isobjectid--ismongoid)
* [Roman number](#isromannumber)
* [Twitter handle](#istwitterhandle)
* [LinkedIn public profile URL](#islinkedinprofileurl)
* [Facebook public profile URL](#isfacebookprofileurl)

### is
Use this function to create your own regex and check a string. This function is a wrapper function for [createIs](#createIs) and build in method .test of Regex class. To make your code less expensive just use [createIs](#createIs) to generate regex.
```javascript
/**
 * @param  {String} string String to check
 * @param  {Object | Array} userOptions Option object or array of option objects
 * @param  {Boolean} checkOptionsInput Check type of option values, by default set to "false"
 * @return {Boolean}
 */
is(string, userOptions, checkOptionsInput)
```

Second argument of the function could be object or array of objects with option parameters.  
```javascript
const IS_DEFAULT_OPTIONS = {
  numbers: false, // {Boolean} match numbers 0-9
  lettersCountry: 'en', // {String} A country code to specify supported letters, English by default
  lettersAll: false, // {Boolean} match lowercase and uppercase letters
  lettersCapital: false, // {Boolean} match uppercase letters
  lettersLowercase: false, // {Boolean} match lowercase letters
  minLength: undefined, // {Number} set min length of mathing group
  maxLength: undefined, // {Number} set max length of mathing group
  specialCharacters: '', // {String} set special characters in the string (escape "\"), the function automatically escapes needed characters
  optional: false, // {Boolean} mark a matching group as optional
  exact: '', // {String} put string that should exactly match, the function automatically escapes needed characters
}
```
More about options:  
**lettersCountry** - specify letters of which country should be supported. By default the function supports English, but to match any letters you need to add one of options *lettersAll*, *lettersCapital*, *lettersLowercase*.  
Supported languages: english 'en', german 'de', spanish 'es', french 'fr', russian 'ru', ukrainian 'ua'.  
More countries will be added in the future, it just takes a lot of time to figure out which letters should be included to regex.  
**lettersAll** - this option has higher priority and overwrites *lettersCapital*, *lettersLowercase*.  
**minLength** - if *maxLength* value isn't set it will match from min to any length.  
**maxLength** - if *minLength* value isn't set it will match from 0 to max.  
**specialCharacters** - a string that includes all special characters like "'!?§$%&/". All characters will be automatically escaped by the function, but don't forget to escape "\" manually (specialCharacters: '\\' to add backslash).  
**exact** - ignores all options except *optional*.  

Example:
```javascript
const options = [
  { exact: 'http://www.google.com/' },
  { lettersLowercase: true },
  { specialCharacters: '/', minLength: 1, maxLength: 1 },
  { numbers: true, optional: true }
]
const isResult = is('http://www.google.com/asd/0098767899', options) // true
const isResult = is('http://www.google.com/asd/', options) // true
const isResult = is('http://www.google.com/ASD/588766', options) // false
const isResult = is('https://www.google.com/asdas/678', options) // false
```

### createIs
Use this function to generate regex based on options. This function uses the same option parameters as [is](#is) function.
```javascript
/**
 * @param  {Object | Array} userOptions Option object or array of option objects
 * @param  {Boolean} checkOptionsInput Check type of option values, by default set to "false"
 * @return {instanceof Regex}
 */
createIs(userOptions, checkOptionsInput)
```

### isEmail
Verify email address using "isEmail" function. This function checks common addresses, but doesn't include all possible names. If your project should support specific email addresses, it's better to create your own extended regex.
```javascript
const isCorrectEmail = isEmail('email@address.com') // true
const isCorrectEmail = isEmail('email@address.c') // false
```

### isPassword
Verify passwords using "isPassword" function. By default password's length should be 8-30 and !"§$%&()=?*+#,.;:_- are allowed symbols.
```javascript
const isCorrectPassword = isPassword('asdsa%&()=123') // true
const isCorrectPassword = isPassword('!"§$%&a') // false (too short)
const isCorrectPassword = isPassword('!"§$%&aasdasdajhdawzdgaw56789asdaskdjn?*+#,.;') // false (too long)
```
You can extend current function changing min/max length and add your own set of supported symbols
isPassword(password, minLength, maxLength, customSetOfSymbols)
```javascript
const isCorrectPassword = isPassword('123abc', 5) // true
const isCorrectPassword = isPassword('!"§$%&aasdasdajhdawzdgaw56789asdaskdjn?*+#,.;', 8, 60) // true
const isCorrectPassword = isPassword('123abc°', 5, 20, '°') // true
// but
const isCorrectPassword = isPassword('123abc°!', 5, 20, '°') // false
```

### isUuid
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

### isBearer
Verify Authorization header data that looks like "Bearer some.token.value" using "isBearer" function.
```javascript
const isCorrectBearer = isBearer('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // true
const isCorrectBearer = isBearer('BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // false
const isCorrectBearer = isBearer('"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI"') // false
```

### isJwt
Verify value of JWT token using "isJwt" function. There is a way to create more strict regex to check Base64Url encoded data string for JWT token. Regexies allows not only "." symbol in encoded string, but some additional symbols as required for Base64Url encoded data.
```javascript
const isCorrectJwt = isJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ') // true
const isCorrectJwt = isJwt('eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA.as1') // false
const isCorrectJwt = isJwt('"eyJ.eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA"') // false
```

### isUrl
Verify URLs using "isUrl" function. By default "http" or "https" prefix is required, but you can always disable it adding second argument to the function as "false".
```javascript
const isCorrectUrl = isUrl('http://google.com/') // true
const isCorrectUrl = isUrl('https://google.com/') // true
const isCorrectUrl = isUrl('google.com/') // false
// but
const isCorrectUrl = isUrl('www.google.com', false) // true
const isCorrectUrl = isUrl('&google.com', false) // false
```

### isHexColor
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

### isImageMimetype
Verify MIME type of image files using "isImageMimetype" function. By default the function allows "image/png", "image/jpeg", and "image/gif".
```javascript
const isCorrectImageType = isImageMimetype('image/png') // true
const isCorrectImageType = isImageMimetype('image/x-icon') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectImageType = isImageMimetype('image/x-icon', ['png', 'jpeg', 'x-icon']) // true
```
If you want to add support of "image/svg+xml" you need to add additional escaping as:
```javascript
const isCorrectImageType = isImageMimetype('image/svg+xml', ['png', 'jpeg', 'svg\\+xml']) // true
```
:exclamation: Be careful, the possibility to upload svg files isn't safe for your project(svg files could include js code). Don't allow extensions you are not sure about.

### isAudioMimetype
Verify MIME type of audio files using "isAudioMimetype" function. By default the function allows only "audio/mpeg".
```javascript
const isCorrectAudioType = isAudioMimetype('audio/mpeg') // true
const isCorrectAudioType = isAudioMimetype('audio/x-aiff') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectAudioType = isAudioMimetype('audio/x-aiff', ['mpeg', 'x-aiff']) // true
```

### isVideoMimetype
Verify MIME type of video files using "isVideoMimetype" function. By default the function allows "video/mpeg", "video/mp4", and "video/quicktime".
```javascript
const isCorrectVideoType = isVideoMimetype('video/mp4') // true
const isCorrectVideoType = isVideoMimetype('video/x-msvideo') // false
```
You can extend the list of supported extensions. Add array of custom extenstions as second argument to the function:
```javascript
const isCorrectVideoType = isVideoMimetype('audio/x-msvideo', ['mpeg', 'x-msvideo']) // true
```

### isMimetype
Verify any MIME type of files using "isMimeType" function. By default this function works as "isImageMimetype", but you can extend it for every file type. Use second argument to set prefix as 'image' or 'application'. Add array of types as third argument.
```javascript
const isCorrectType = isMimetype('application/zip', 'application', ['zip', 'vnd.ms-excel']) // true
const isCorrectType = isMimetype('video/x-msvideo', 'application', ['zip', 'vnd.ms-excel']) // false
```
:exclamation: This function give you more space, but it's not always good and safe. Try to use more strict functions as isImageMimetype/isAudioMimetype if it's possible. If type has specific symbols, escape them like "svg\\+xml".

### isNumbersOnly
Verify a string to find out if it includes only numbers or not.
```javascript
const hasOnlyNumbers = isNumbersOnly('12345678901234567890') // true
const hasOnlyNumbers = isNumbersOnly('1a234567ssd890.') // false
```

### isObjectId / isMongoId
Verify mongodb id (that is ObjectId type). You can use two names that are aliases isObjectId and isMongoId. Theoretically, ObjectId is just a string contains numbers from 0 to 9, letters a, b, c, d, f and has length 24. Some strings could look not like typical MongoDB id, but are still correct for the regex pattern.
```javascript
const isCorrectObjectId = isObjectId('5f17d5d2040de74f301f686f') // true
const isCorrectMongoId = isMongoId('abcdf1234012345678901234') // true
const isCorrectMongoId = isMongoId('1a234567ssd890.') // false
```

### isRomanNumber
Verify a roman numbers using "isRomanNumber" function.
```javascript
const isCorrectRomanNumber = isRomanNumber('X') // true
const isCorrectRomanNumber = isRomanNumber('IIX') // false
```

### isTwitterHandle
Verify a twitter handle using "isTwitterHandle" function. Handle's length should be less than 15, handle can include letters, numbers and underscore.
```javascript
const isCorrectTwitterHandle = isTwitterHandle('john_smith09') // true
const isCorrectTwitterHandle = isTwitterHandle('john_$mith09') // false
```

### isLinkedInProfileUrl
Verify a LinkedIn profile URL using "isLinkedInProfileUrl" function.  
Optional: http, https, www, country 2-letter code, slash at the end, any specific characters.  
Strict: linkedin.com, /in/, 3-100 symbols length, can not include spaces.  
```javascript
const isCorrectProfileUrl = isLinkedInProfileUrl('https://www.linkedin.com/in/johnsmith/') // true
const isCorrectProfileUrl = isLinkedInProfileUrl('http://ca.linkedin.com/in/johnsmith') // true
const isCorrectProfileUrl = isLinkedInProfileUrl('https://www.linkedin.com/in/jo/') // false
```

### isFacebookProfileUrl
Verify a Facebook profile URL using "isFacebookProfileUrl" function.  
Optional: http, https, www, max length, slash at the end.  
Strict: facebook.com, 5 symbols min length, can not include any special characters except period.  
```javascript
const isCorrectProfileUrl = isFacebookProfileUrl('https://www.facebook.com/john.smith01/') // true
const isCorrectProfileUrl = isFacebookProfileUrl('https://www.facebook.com/john/') // false
```

## Tests
Tests are not included in regexies library if you install it through npm. Please clone git repo of the library to find tests.

## Updates
Expect more functions with next everyweek updates.