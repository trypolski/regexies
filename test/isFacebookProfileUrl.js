const assert = require('assert');
const isFacebookProfileUrl = require('../index').isFacebookProfileUrl;

describe('isFacebookProfileUrl', function () {
  describe('isFacebookProfileUrl', function () {
    it('Should return true if facebook profile url includes https', function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/johnsmith'), true);
    });
    it("Should return true if facebook profile url doesn't include https or http", function () {
      assert.strictEqual(isFacebookProfileUrl('www.facebook.com/johnsmith'), true);
    });
    it('Should return true if facebook profile url includes http', function () {
      assert.strictEqual(isFacebookProfileUrl('http://www.facebook.com/johnsmith'), true);
    });
    it("Should return true if facebook profile url doesn't include www", function () {
      assert.strictEqual(isFacebookProfileUrl('http://facebook.com/johnsmith'), true);
    });
    it("Should return true if facebook profile url doesn't include https, http, www", function () {
      assert.strictEqual(isFacebookProfileUrl('facebook.com/johnsmith'), true);
    });
    it("Should return true if facebook profile url doesn't include slash at the end", function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/johnsmith'), true);
    });
    it("Should return true if facebook profile url includes slash at the end", function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/johnsmith/'), true);
    });
    it('Should return true if facebook profile includes period', function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/john.smith'), true);
    });
    it('Should return true if facebook profile includes numbers', function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/johnsmith0123456789'), true);
    });
    it("Should return false if facebook profile url doesn't include facebook.com", function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.google.com/johnsmith'), false);
    });
    it("Should return false if facebook profile name's length < 5", function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/john'), false);
    });
    it('Should return false if facebook profile includes spaces', function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/john smith'), false);
    });
    it('Should return false if facebook profile includes special characters except period', function () {
      assert.strictEqual(isFacebookProfileUrl('https://www.facebook.com/johnsmith!@#$%^&&*()_+'), false);
    });
  });
});
