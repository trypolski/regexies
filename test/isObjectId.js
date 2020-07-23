const assert = require('assert');
const isObjectId = require('../index').isObjectId
const isMongoId = require('../index').isMongoId

describe('isObjectId', function() {
  it('Should return true if a string is ObjectId', function () {
    assert.equal(isObjectId('5f17d5d2040de74f301f686f'), true);
  });
  it('Should return true if a string isMongoId', function () {
    assert.equal(isMongoId('abcdf1234012345678901234'), true);
  });
  it('Should return false if a string is shorter than ObjectId', function () {
    assert.equal(isObjectId('asdasdasd'), false);
  });
  it('Should return false if a string is has wrong symbols than isMongoId', function () {
    assert.equal(isMongoId('5f17q5d2040de74f301n686f'), false);
  });
})
