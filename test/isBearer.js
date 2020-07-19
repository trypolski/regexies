const assert = require('assert');
const isBearer = require('../index').isBearer

describe('isBearer', function() {
  it('Should return true for correct bearer header', function () {
    assert.equal(isBearer('Bearer asdasdaalksdj213alksd'), true);
  });
  it('Should return false with typo in Bearer word', function () {
    assert.equal(isBearer('Bearers asdasdaalksdj213alksd'), false);
  });
  it('Should return false if headers start with lowercase', function () {
    assert.equal(isBearer('bearer asdasdaalksdj213alksd'), false);
  });
  it('Should return false if header starts with " symbol', function () {
    assert.equal(isBearer('"Bearer asdasdaalksdj213alksd"'), false);
  });
  it("Should return false if header starts with ' symbol", function () {
    assert.equal(isBearer("'Bearer asdasdaalksdj213alksd'"), false);
  });
  it('Should return false if header starts non English B symbol', function () {
    assert.equal(isBearer('Вearer asdasdaalksdj213alksd'), false);
  });
  it('Should return false if header has no space after Bearer word', function () {
    assert.equal(isBearer('Вearerasdasdaalksdj213alksd'), false);
  });
  it('Should return false if header has no symbols after Bearer word', function () {
    assert.equal(isBearer('Вearer '), false);
  });
})
