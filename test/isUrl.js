const assert = require('assert');
const isUrl = require('../index').isUrl;

describe('isUrl', function () {
  describe('isUrl with http/https', function () {
    it('Should return true if url with http is correct #1', function () {
      assert.strictEqual(isUrl('http://google.com/'), true);
    });
    it('Should return true if url with http is correct #2', function () {
      assert.strictEqual(isUrl('https://www.google.com/'), true);
    });
    it('Should return false if url with http is incorrect #1', function () {
      assert.strictEqual(isUrl('Https://www.google.com/'), false);
    });
    it('Should return false if url with http is incorrect #2', function () {
      assert.strictEqual(isUrl('hTTps://www.google.com/'), false);
    });
  });
  describe('isUrl without http/https', function () {
    it('Should return true if url is correct #1', function () {
      assert.strictEqual(isUrl('www.google.com', false), true);
    });
    it('Should return true if url is correct #2', function () {
      assert.strictEqual(isUrl('google.ca', false), true);
    });
    it('Should return false if url is incorrect #1', function () {
      assert.strictEqual(isUrl('&google.com', false), false);
    });
    it('Should return false if url is incorrect #2', function () {
      assert.strictEqual(isUrl('[google.com', false), false);
    });
  });
});
