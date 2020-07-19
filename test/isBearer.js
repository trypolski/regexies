const assert = require('assert');
const isBearerHeader = require('../index').isBearerHeader

describe('isBearerHeader', function() {
  it('Should return true for correct bearer header', function () {
    assert.equal(isBearerHeader('Bearer asdasdaalksdj213alksd'), true);
  });
  it('Should return false with typo in Bearer word', function () {
    assert.equal(isBearerHeader('Bearers asdasdaalksdj213alksd'), false);
  });
  it('Should return false if headers start with lowercase', function () {
    assert.equal(isBearerHeader('bearer asdasdaalksdj213alksd'), false);
  });
  it('Should return false if header starts with " symbol', function () {
    assert.equal(isBearerHeader('"Bearer asdasdaalksdj213alksd"'), false);
  });
  it("Should return false if header starts with ' symbol", function () {
    assert.equal(isBearerHeader("'Bearer asdasdaalksdj213alksd'"), false);
  });
  it('Should return false if header starts non English B symbol', function () {
    assert.equal(isBearerHeader('Вearer asdasdaalksdj213alksd'), false);
  });
  it('Should return false if header has no space after Bearer word', function () {
    assert.equal(isBearerHeader('Вearerasdasdaalksdj213alksd'), false);
  });
  it('Should return false if header has no symbols after Bearer word', function () {
    assert.equal(isBearerHeader('Вearer '), false);
  });
})
