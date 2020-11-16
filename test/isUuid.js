const assert = require('assert');
const isUuid = require('../index').isUuid;

describe('isUuid', function () {
  describe('isUuid version 4', function () {
    it('Should return true if uuid is v4 and correct', function () {
      assert.strictEqual(isUuid('7259de2b-8d80-480f-8503-2bb8fbcc0690', true), true);
    });
    it('Should return false if uuid is not v4 and correct', function () {
      assert.strictEqual(isUuid('5c43b50e-c932-11ea-87d0-0242ac130003', true), false);
    });
  });
  describe('isUuid any version', function () {
    it('Should return true if uuid and correct', function () {
      assert.strictEqual(isUuid('7259de2b-8d80-480f-8503-2bb8fbcc0690'), true);
    });
    it('Should return false if incorrect length', function () {
      assert.strictEqual(isUuid('5c43b50e-c932-11ea-87d0-0242ac130003a'), false);
    });
    it('Should return false if no dashes', function () {
      assert.strictEqual(isUuid('5c43b50ec93211ea87d00242ac130003a'), false);
    });
    it('Should return false if different type of dashes', function () {
      assert.strictEqual(isUuid('5c43b50e—c932—11ea—87d0—0242ac130003a'), false);
    });
  });
});
