# Regexies

The library includes a list of popular regex functions for every project usage. You can use special builder functions to create your own regexes.

Please let us know if you see any bugs or need improvements to existing functions. Thank you!

## Install
Install using npm:
```javascript
npm i regexies
```
## Import
### Node.js
```javascript
const regexies = require('regexies');
regexies.isPassword('sometestpassword');
// or
const isPassword = require('regexies').isPassword;
```
### ES6
```javascript
import regexies from 'regexies';
regexies.isPassword('sometestpassword');
// or
import { isPassword } from 'regexies';
```
### Optimization
Import only functions you need to reduce bundle size.  
```javascript
// Node.js
const isPassword = require('regexies/src/isPassword');
// ES6
import isPassword from 'regexies/src/isPassword';
```

Use with [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import):
```javascript
{
  "libraryName": "regexies",
  "libraryDirectory": "src",
}
```

## Documentation
Visit [Regexies documentation](https://trypolski.github.io/regexies/) on Github Pages to get full information about all available functions with examples and test tools.

Build your own regex using these functions:
* [is](https://trypolski.github.io/regexies/#is)
* [createIs](https://trypolski.github.io/regexies/#createIs) - create your own regex using our regex constructor

Escape special characters using these functions:
* [escape](#escape)
* [escapeShort and escapeLong](https://trypolski.github.io/regexies/#escape)

Verify strings using these functions:  
* [Email address](https://trypolski.github.io/regexies/#isEmail)
* [Password](https://trypolski.github.io/regexies/#isPassword)
* [UUID](https://trypolski.github.io/regexies/#isUuid)
* [Bearer header](https://trypolski.github.io/regexies/#isBearer)
* [JWT token](#https://trypolski.github.io/regexies/#isJwt)
* [URL](https://trypolski.github.io/regexies/#isUrl)
* [HEX color](https://trypolski.github.io/regexies/#isHexColor)
* [Image MIME type](https://trypolski.github.io/regexies/#isImageMimetype)
* [Audio MIME type](https://trypolski.github.io/regexies/#isAudioMimetype)
* [Video MIME type](https://trypolski.github.io/regexies/#isVideoMimetype)
* [Any custom MIME type](https://trypolski.github.io/regexies/#isMimetype)
* [Numbers](https://trypolski.github.io/regexies/#isNumbersOnly)
* [ObjectId/MongoId](https://trypolski.github.io/regexies/#isMongoId)
* [Roman number](https://trypolski.github.io/regexies/#isRomanNumber)
* [Twitter handle](https://trypolski.github.io/regexies/#isTwitterHandle)
* [LinkedIn public profile URL](https://trypolski.github.io/regexies/#isLinkedInProfileUrl)
* [Facebook public profile URL](https://trypolski.github.io/regexies/#isFacebookProfileUrl)
* [Slug](https://trypolski.github.io/regexies/#isSlug)
* [isEmojiOnly](https://trypolski.github.io/regexies/#isEmojiOnly)

### escape
Use this function to escape special characters that should be escaped in Regex. The function decides which helper function to use **escapeShort** or **escapeLong** depends on length of the string.
```javascript
/**
 * @param  {String} string String to escape
 */
escape(string) // .^$*+?()[]{}\|/- to \.\^\$\*\+\?\(\)\[\]\{\}\\\|\/\-
```

### escapeShort and escapeLong
Use **escapeShort** to escape strings with length <= 60 and **escapeLong** for strings longer than 60 symbols.
```javascript
/**
 * @param  {String} string String to escape
 */
escapeShort(string) // custom function with for loop
escapeLong(string)  // string.replace(/[\.\^\$\*\+\?\(\)\[\]\{\}\\\|\/\-]/g, '\\$&');
```
There is no big difference if you want to escape single string, but if your task requires hundrets of iteration then the impact could be significant. Let's take a look at table with performance results:  
| String length | Iterations    | escapeShort   | escapeLong    |
| ------------- | ------------- | ------------- | ------------- |
| 20            | 10k           | 7ms           | 7ms           |
| 20            | 100k          | 30ms          | 56ms          |
| 50            | 10k           | 7ms           | 10ms          |
| 50            | 100k          | 73ms          | 100ms         |
| 100           | 10k           | 13ms          | 11ms          |
| 100           | 100k          | 133ms         | 102ms         |
| 1000          | 10k           | 134ms         | 73ms          |
| 1000          | 100k          | 1315ms        | 732ms         |

## Tests
Tests are not included in regexies library if you install it through npm. Please clone git repo of the library to find tests.
