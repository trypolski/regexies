const assert = require('assert');
const isVideoMimetype = require('../index').isVideoMimetype;

describe('isVideoMimetype', function () {
  describe('isVideoMimetype with default extensions', function () {
    it('Should return true if MIME type is video/mpeg', function () {
      assert.equal(isVideoMimetype('video/mpeg'), true);
    });
    it('Should return true if MIME type is video/x-wav', function () {
      assert.equal(isVideoMimetype('video/mp4'), true);
    });
    it('Should return false if MIME type is video/x-msvideo', function () {
      assert.equal(isVideoMimetype('video/x-msvideo'), false);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.equal(isVideoMimetype('application/zip'), false);
    });
  });
  describe('isVideoMimetype with custom extensions', function () {
    it('Should return true if MIME type is video/mpeg', function () {
      assert.equal(isVideoMimetype('video/mpeg', ['mpeg', 'x-sgi-movie']), true);
    });
    it('Should return true if MIME type is video/x-sgi-movie', function () {
      assert.equal(isVideoMimetype('video/x-sgi-movie', ['mpeg', 'x-sgi-movie']), true);
    });
    it('Should return false if MIME type is video/mp4', function () {
      assert.equal(isVideoMimetype('video/mp4', ['mpeg', 'x-sgi-movie']), false);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.equal(isVideoMimetype('image/png', ['mpeg', 'x-sgi-movie']), false);
    });
  });
});
