const assert = require('assert');
const isNumbersOnly = require('../index').isNumbersOnly

describe('isNumbersOnly', function() {
  it('Should return true if a string contains only numbers', function () {
    assert.equal(isNumbersOnly('1234567890'), true);
  });
  it('Should return false if a string contains not only numbers', function () {
    assert.equal(isNumbersOnly('1234567890.'), false);
  });
})
