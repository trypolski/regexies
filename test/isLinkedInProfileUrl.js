const assert = require('assert');
const isLinkedInProfileUrl = require('../index').isLinkedInProfileUrl;

describe('isLinkedInProfileUrl', function () {
  describe('isLinkedInProfileUrl', function () {
    it('Should return true if linkedin profile url includes https', function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.linkedin.com/in/johnsmith/'), true);
    });
    it("Should return true if linkedin profile url doesn't include https or http", function () {
      assert.strictEqual(isLinkedInProfileUrl('www.linkedin.com/in/johnsmith/'), true);
    });
    it('Should return true if linkedin profile url includes http', function () {
      assert.strictEqual(isLinkedInProfileUrl('http://www.linkedin.com/in/johnsmith/'), true);
    });
    it("Should return true if linkedin profile url doesn't include www", function () {
      assert.strictEqual(isLinkedInProfileUrl('http://linkedin.com/in/johnsmith/'), true);
    });
    it("Should return true if linkedin profile url doesn't include https, http, www", function () {
      assert.strictEqual(isLinkedInProfileUrl('linkedin.com/in/johnsmith/'), true);
    });
    it("Should return true if linkedin profile url doesn't include slash at the end", function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.linkedin.com/in/johnsmith'), true);
    });
    it("Should return false if linkedin profile url doesn't include linkedin.com", function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.google.com/in/johnsmith'), false);
    });
    it("Should return false if linkedin profile url doesn't include in", function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.google.com/johnsmith'), false);
    });
    it("Should return false if linkedin profile name's length < 5", function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.google.com/in/john'), false);
    });
    it("Should return false if linkedin profile name's length > 30", function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.google.com/in/johnsmithj1234567890qwertzuiop1'), false);
    });
    it('Should return false if linkedin profile includes special characters', function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.linkedin.com/in/john$mith/'), false);
    });
    it('Should return false if linkedin profile includes spaces', function () {
      assert.strictEqual(isLinkedInProfileUrl('https://www.linkedin.com/in/john smith/'), false);
    });
  });
});
