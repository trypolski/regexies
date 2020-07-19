const assert = require('assert');
const isPassword = require('../index').isPassword

describe('isPassword', function () {
  describe('isPassword default values', function () {
    it('Should return true if password is only English letters, numbers, and !"§$%&()=?*+#,.;:_- symbols and the length is between 8-30', function () {
      assert.equal(isPassword('as!"§$%&()=?*+#,.;:_-12345678'), true);
    });
    it('Should return false if password includes wrong symbols', function () {
      assert.equal(isPassword('dasdadasdadadad°'), false);
    });
    it('Should return false if password includes wrong letters', function () {
      assert.equal(isPassword('dasdadasdadadadä12315215'), false);
    });
    it('Should return false if password is longer than 30', function () {
      assert.equal(isPassword('1234567890qwertzuiopasdfghjklyxcvbn'), false);
    });
    it('Should return false if password is shorter than 8', function () {
      assert.equal(isPassword('1234567'), false);
    });
  });
  describe('isPassword custom length', function () {
    it('Should return true if password length is longer than custom minLength', function () {
      assert.equal(isPassword('1234567', 6), true);
    });
    it('Should return true if password length is shorter than custom maxLength', function () {
      assert.equal(isPassword('qwertzuiopasdfghjklyxcvbnm1234567890', 8, 40), true);
    });
    it('Should return true if password length is between custom minLength and maxLength', function () {
      assert.equal(isPassword('12345678901', 8, 12), true);
    });
    it('Should return false if password length is less than custom minLength', function () {
      assert.equal(isPassword('123456789', 10), false);
    });
    it('Should return false if password length is longer than custom maxLength', function () {
      assert.equal(isPassword('1234567890asdfghk', 8, 12), false);
    });
  });
  describe('isPassword custom symbols', function () {
    it('Should return true if password includes custom symbols', function () {
      assert.equal(isPassword('1234567asd°', 8, 30, '°'), true);
    });
    it('Should return false if password includes restricted symbols', function () {
      assert.equal(isPassword('123456789asdö', 8, 30), false);
    });
  });
});
