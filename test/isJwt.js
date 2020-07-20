const assert = require('assert');
const isJwt = require('../index').isJwt

describe('isJwt', function() {
  it('Should return true for correct JWT token', function () {
    assert.equal(isJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ'), true);
  });
  it('Should return false for incorrect JWT token #1', function () {
    assert.equal(isJwt('GciOiJIUzI1NiIsInR5cCI6IkpXVCJ98zg4B6rUYAOvfzdceoH4'), false);
  });
  it('Should return false for incorrect JWT token #2', function () {
    assert.equal(isJwt('eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA'), false);
  });
  it('Should return false for incorrect JWT token #3', function () {
    assert.equal(isJwt('eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA.as1'), false);
  });
  it('Should return false for incorrect JWT token #4', function () {
    assert.equal(isJwt('eyJ.eyJhbGciOiJIUzI1NiIsInR5c.CI6IkpXVCJ98zg4B6rUYA'), false);
  });
})
