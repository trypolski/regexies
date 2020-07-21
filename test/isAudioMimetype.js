const assert = require('assert');
const isAudioMimetype = require('../index').isAudioMimetype;

describe('isAudioMimetype', function () {
  describe('isAudioMimetype with default extensions', function () {
    it('Should return true if MIME type is audio/mpeg', function () {
      assert.equal(isAudioMimetype('audio/mpeg'), true);
    });
    it('Should return false if MIME type is audio/x-wav', function () {
      assert.equal(isAudioMimetype('audio/x-wav'), false);
    });
    it('Should return false if MIME type is application/zip', function () {
      assert.equal(isAudioMimetype('application/zip'), false);
    });
  });
  describe('isAudioMimetype with custom extensions', function () {
    it('Should return true if MIME type is audio/mpeg', function () {
      assert.equal(isAudioMimetype('audio/mpeg', ['mpeg', 'x-wav']), true);
    });
    it('Should return true if MIME type is audio/x-wav', function () {
      assert.equal(isAudioMimetype('audio/x-wav', ['mpeg', 'x-wav']), true);
    });
    it('Should return false if MIME type is audio/x-mpegurl', function () {
      assert.equal(isAudioMimetype('audio/x-mpegurl', ['mpeg', 'x-wav']), false);
    });
    it('Should return false if MIME type is image/png', function () {
      assert.equal(isAudioMimetype('image/png', ['mpeg', 'x-wav']), false);
    });
  });
});
