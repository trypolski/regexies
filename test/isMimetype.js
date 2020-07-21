const assert = require('assert');
const isMimetype = require('../index').isMimetype;

describe('isMimetype', function () {
  describe('isMimetype with default extensions', function () {
    it('Should return true if MIME type is image/jpeg', function () {
      assert.equal(isMimetype('image/jpeg'), true);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.equal(isMimetype('application/zip'), false);
    });
  });
  describe('isMimetype with custom extensions', function () {
    it('Should return true if MIME type is application/zip', function () {
      assert.equal(isMimetype('application/zip', 'application', ['zip', 'vnd.ms-excel']), true);
    });
    it('Should return true if MIME type is application/vnd.ms-excel', function () {
      assert.equal(isMimetype('application/vnd.ms-excel', 'application', ['zip', 'vnd.ms-excel']), true);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.equal(isMimetype('image/png', 'application', ['zip', 'vnd.ms-excel']), false);
    });
    it('Should return false if MIME type is application/x-javascript', function () {
      assert.equal(isMimetype('application/x-javascript', 'application', ['zip', 'vnd.ms-excel']), false);
    });
  });
});
