const assert = require('assert');
const isEmail = require('../index').isEmail

describe('isEmail', function() {
  it('Should return true for correct email', function () {
    assert.strictEqual(isEmail('someemail@gmail.com'), true);
  });
  it('Should return false for incorrect email #1', function () {
    assert.strictEqual(isEmail('@gmail.com'), false);
  });
  it('Should return false for incorrect email #2', function () {
    assert.strictEqual(isEmail('asdd@.com'), false);
  });
  it('Should return false for incorrect email #3', function () {
    assert.strictEqual(isEmail('asda@gmail.c'), false);
  });
  it('Should return false for incorrect email #4', function () {
    assert.strictEqual(isEmail('asda12@gmailcom'), false);
  });
})
