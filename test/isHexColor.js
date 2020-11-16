const assert = require('assert');
const isHexColor = require('../index').isHexColor

describe('isHexColor', function() {
  describe('isHexColor with #', function () {
    it('Should return true if css hex color is correct #1', function () {
      assert.strictEqual(isHexColor('#fFf111'), true);
    });
    it('Should return true if css hex color is correct #2', function () {
      assert.strictEqual(isHexColor('#000Aff'), true);
    });
    it('Should return true if css hex color is correct #3', function () {
      assert.strictEqual(isHexColor('#000'), true);
    });
    it('Should return false if css hex color is incorrect #1', function () {
      assert.strictEqual(isHexColor('#000qff'), false);
    });
    it('Should return false if css hex color is incorrect #2', function () {
      assert.strictEqual(isHexColor('#000FFL'), false);
    });
    it('Should return false if css hex color is incorrect #3', function () {
      assert.strictEqual(isHexColor('000000'), false);
    });
  });
  describe('isHexColor without #', function () {
    it('Should return true if css hex color is correct #1', function () {
      assert.strictEqual(isHexColor('000FFF', false), true);
    });
    it('Should return true if css hex color is correct #2', function () {
      assert.strictEqual(isHexColor('Fab123', false), true);
    });
    it('Should return true if css hex color is correct #3', function () {
      assert.strictEqual(isHexColor('11aAAB', false), true);
    });
    it('Should return false if css hex color is incorrect #1', function () {
      assert.strictEqual(isHexColor('qff', false), false);
    });
    it('Should return false if css hex color is incorrect #2', function () {
      assert.strictEqual(isHexColor('00W880', false), false);
    });
    it('Should return false if css hex color is incorrect #3', function () {
      assert.strictEqual(isHexColor('#888888', false), false);
    });
  });
})
