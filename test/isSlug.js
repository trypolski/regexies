const assert = require('assert');
const isSlug = require('../index').isSlug;

describe('isSlug', function () {
  describe('isSlug with default values', function () {
    it('Should return true if slug is correct', function () {
      assert.strictEqual(isSlug('someSlug'), true);
    });
    it('Should return true if slug with "-" is correct', function () {
      assert.strictEqual(isSlug('someslug90-someSlug12'), true);
    });
    it('Should return false if slug is not correct', function () {
      assert.strictEqual(isSlug('6786asd_asds', true), false);
    });
  });
  describe('isSlug with custom separator', function () {
    it('Should return true if slug is correct', function () {
      assert.strictEqual(isSlug('Asdf_asd4567', '_'), true);
    });
    it('Should return false if slug is not correct', function () {
      assert.strictEqual(isSlug('asd_asddas-zq'), false);
    });
  });
  describe('isSlug with custom language', function () {
    it('Should return true if slug is correct', function () {
      assert.strictEqual(isSlug('слово09-и-слово12', '-', 'ru'), true);
    });
    it('Should return false if slug is not correct', function () {
      assert.strictEqual(isSlug('asdasd-dsada89', '-', 'ru'), false);
    });
  });
});
