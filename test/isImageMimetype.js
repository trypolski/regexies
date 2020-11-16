const assert = require('assert');
const isImageMimetype = require('../index').isImageMimetype;

describe('isImageMimetype', function () {
  describe('isImageMimetype with default extensions', function () {
    it('Should return true if MIME type is image/jpeg', function () {
      assert.strictEqual(isImageMimetype('image/jpeg'), true);
    });
    it('Should return true if MIME type is image/png', function () {
      assert.strictEqual(isImageMimetype('image/png'), true);
    });
    it('Should return true if MIME type is image/gif', function () {
      assert.strictEqual(isImageMimetype('image/gif'), true);
    });
    it('Should return false if MIME type is image/svg+xml', function () {
      assert.strictEqual(isImageMimetype('image/svg+xml'), false);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.strictEqual(isImageMimetype('application/zip'), false);
    });
  });
  describe('isImageMimetype with custom extensions', function () {
    it('Should return true if MIME type is image/x-icon', function () {
      assert.strictEqual(isImageMimetype('image/x-icon', ['x-icon', 'svg\\+xml']), true);
    });
    it('Should return true if MIME type is image/svg+xml', function () {
      assert.strictEqual(isImageMimetype('image/svg+xml', ['x-icon', 'svg\\+xml']), true);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.strictEqual(isImageMimetype('image/png', ['x-icon', 'svg\\+xml']), false);
    });
    it('Should return false if MIME type is image/jpeg', function () {
      assert.strictEqual(isImageMimetype('image/jpeg', ['x-icon', 'svg\\+xml']), false);
    });
  });
});
