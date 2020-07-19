# Regexies

The library includes a list of popular regex functions for every project usage. If you are lazy enough to create your own regular expressions or bored to move regex helper function from project to project (like me) than Regexies is a good choise.

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
Verify uuid string using "isUuid" function. By default function supported all version of uuid.
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
Verify Authorization header data that looks like "Bearer <token>" using "isBearer" function.
```javascript
const isCorrectBearer = isBearer('Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // true
const isCorrectBearer = isBearer('BearereyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI') // false
const isCorrectBearer = isBearer('"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI"') // false
```

## Tests
Tests are not included in regexies library if you install it through npm. Please clone git repo of the library to find tests.

## Upates
Expect more functions with next updates.