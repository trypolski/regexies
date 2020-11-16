const assert = require('assert');
const isMimetype = require('../index').isMimetype;

describe('isMimetype', function () {
  describe('isMimetype with default extensions', function () {
    it('Should return true if MIME type is image/jpeg', function () {
      assert.strictEqual(isMimetype('image/jpeg'), true);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.strictEqual(isMimetype('application/zip'), false);
    });
  });
  describe('isMimetype with custom extensions', function () {
    it('Should return true if MIME type is application/zip', function () {
      assert.strictEqual(isMimetype('application/zip', 'application', ['zip', 'vnd.ms-excel']), true);
    });
    it('Should return true if MIME type is application/vnd.ms-excel', function () {
      assert.strictEqual(isMimetype('application/vnd.ms-excel', 'application', ['zip', 'vnd.ms-excel']), true);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.strictEqual(isMimetype('image/png', 'application', ['zip', 'vnd.ms-excel']), false);
    });
    it('Should return false if MIME type is application/x-javascript', function () {
      assert.strictEqual(isMimetype('application/x-javascript', 'application', ['zip', 'vnd.ms-excel']), false);
    });
  });
});
