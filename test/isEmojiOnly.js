const assert = require('assert');
const isEmojiOnly = require('../index').isEmojiOnly

describe('isEmojiOnly', function() {
  it('Should return true if a string contains only emoji', function () {
    assert.strictEqual(isEmojiOnly('😀💩👀'), true);
  });
  it('Should return false if a string contains no emoji', function () {
    assert.strictEqual(isEmojiOnly('asdqwetyuvbn'), false);
  });
  it('Should return false if a string contains mix of numbers and emoji', function () {
    assert.strictEqual(isEmojiOnly('123👨🏻👩🏻456'), false);
  });
})
