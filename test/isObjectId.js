const assert = require('assert');
const isObjectId = require('../index').isObjectId
const isMongoId = require('../index').isMongoId

describe('isObjectId', function() {
  it('Should return true if a string is ObjectId type', function () {
    assert.strictEqual(isObjectId('5f17d5d2040de74f301f686f'), true);
  });
  it('Should return true if a string is a mongodb Id', function () {
    assert.strictEqual(isMongoId('abcdf1234012345678901234'), true);
  });
  it('Should return false if a string is shorter than ObjectId', function () {
    assert.strictEqual(isObjectId('asdasdasd'), false);
  });
  it('Should return false if a string has wrong symbols than regular mongodb Id', function () {
    assert.strictEqual(isMongoId('5f17q5d2040de74f301n686f'), false);
  });
})
