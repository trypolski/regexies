const assert = require('assert');
const isTwitterHandle = require('../index').isTwitterHandle;

describe('isTwitterHandle', function () {
  it('Should return true if handle includes only numbers', function () {
    assert.strictEqual(isTwitterHandle('1234567890'), true);
  });
  it('Should return true if handle includes only letters a-zA-Z', function () {
    assert.strictEqual(isTwitterHandle('asdYXCTQWEAsqw'), true);
  });
  it('Should return true if handle includes letters, numbers and underscore', function () {
    assert.strictEqual(isTwitterHandle('_asdYXCQWEA567_'), true);
  });
  it('Should return false if length of handle > 15', function () {
    assert.strictEqual(isTwitterHandle('asdasd1234567890_'), false);
  });
  it('Should return false if handle includes other symbols except underscore', function () {
    assert.strictEqual(isTwitterHandle('asdasd$asds'), false);
  });
  it('Should return false if handle includes spaces', function () {
    assert.strictEqual(isTwitterHandle('asdasd asds123'), false);
  });
});