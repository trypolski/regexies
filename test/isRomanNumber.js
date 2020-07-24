const assert = require('assert');
const isRomanNumber = require('../index').isRomanNumber

describe('isRomanNumber', function() {
  it('Should return true if a string is a roman number #1', function () {
    assert.equal(isRomanNumber('X'), true);
  });
  it('Should return true if a string is a roman number #2', function () {
    assert.equal(isRomanNumber('VIII'), true);
  });
  it('Should return false if a string is not a roman number #1', function () {
    assert.equal(isRomanNumber('IIX'), false);
  });
  it('Should return false if a string is not a roman number #2', function () {
    assert.equal(isRomanNumber('VIIII'), false);
  });
})
