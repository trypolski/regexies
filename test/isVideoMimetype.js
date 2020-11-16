const assert = require('assert');
const isVideoMimetype = require('../index').isVideoMimetype;

describe('isVideoMimetype', function () {
  describe('isVideoMimetype with default extensions', function () {
    it('Should return true if MIME type is video/mpeg', function () {
      assert.strictEqual(isVideoMimetype('video/mpeg'), true);
    });
    it('Should return true if MIME type is video/x-wav', function () {
      assert.strictEqual(isVideoMimetype('video/mp4'), true);
    });
    it('Should return false if MIME type is video/x-msvideo', function () {
      assert.strictEqual(isVideoMimetype('video/x-msvideo'), false);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.strictEqual(isVideoMimetype('application/zip'), false);
    });
  });
  describe('isVideoMimetype with custom extensions', function () {
    it('Should return true if MIME type is video/mpeg', function () {
      assert.strictEqual(isVideoMimetype('video/mpeg', ['mpeg', 'x-sgi-movie']), true);
    });
    it('Should return true if MIME type is video/x-sgi-movie', function () {
      assert.strictEqual(isVideoMimetype('video/x-sgi-movie', ['mpeg', 'x-sgi-movie']), true);
    });
    it('Should return false if MIME type is video/mp4', function () {
      assert.strictEqual(isVideoMimetype('video/mp4', ['mpeg', 'x-sgi-movie']), false);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.strictEqual(isVideoMimetype('image/png', ['mpeg', 'x-sgi-movie']), false);
    });
  });
});
