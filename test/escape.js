const assert = require('assert');
const { escapeShort, escapeLong } = require('../index');

function checkPermormance(func, count) {
  let result;
  for (let i = 0; i <= count; i++) {
    func();
  }
  return result;
}

const str20 = 'qwe{?789%$123as:}]mh';
const str50 = 'q1.2w3^4e5$6r7*8t9+0y1?2u3(4i5)6o7[8p9]0a{s}d|f/g-';
const str60 = 'qw1e.r2ty3u^i4a$sdg*h8jt9l+z0v?q(w4irty)6ip[p9f0hj{kl}zd|f/-';
const str100 = 'qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-';
const str1000 = 'qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-qqw1e.r2twy3u^i4oep5a$s6drf7g*h8jtk9l+z0xyc1v?b2num3q(w4eirt5y)u6ioo7p[a8spd9f]g0haj{ksl}zdx|cfv/bg-';

describe('Escape special characters', function () {
  this.slow(0);
  describe('escapeShort vs escapeLong 20 characters', function () {
    it('escapeShort 10000 times', function () {
      checkPermormance(() => escapeShort(str20), 10000);
    });
    it('escapeLong 10000 calls', function () {
      checkPermormance(() => escapeLong(str20), 10000);
    });
    it('escapeShort 100000 times', function () {
      checkPermormance(() => escapeShort(str20), 100000);
    });
    it('escapeLong 100000 calls', function () {
      checkPermormance(() => escapeLong(str20), 100000);
    });
  });
  describe('escapeShort vs escapeLong 50 characters', function () {
    it('escapeShort 10000 times', function () {
      checkPermormance(() => escapeShort(str50), 10000);
    });
    it('escapeLong 10000 calls', function () {
      checkPermormance(() => escapeLong(str50), 10000);
    });
    it('escapeShort 100000 times', function () {
      checkPermormance(() => escapeShort(str50), 100000);
    });
    it('escapeLong 100000 calls', function () {
      checkPermormance(() => escapeLong(str50), 100000);
    });
  });
  describe('escapeShort vs escapeLong 60 characters', function () {
    it('escapeShort 10000 times', function () {
      checkPermormance(() => escapeShort(str60), 10000);
    });
    it('escapeLong 10000 calls', function () {
      checkPermormance(() => escapeLong(str60), 10000);
    });
    it('escapeShort 100000 times', function () {
      checkPermormance(() => escapeShort(str60), 100000);
    });
    it('escapeLong 100000 calls', function () {
      checkPermormance(() => escapeLong(str60), 100000);
    });
  });
  describe('escapeShort vs escapeLong 100 characters', function () {
    it('escapeShort 10000 times', function () {
      checkPermormance(() => escapeShort(str100), 10000);
    });
    it('escapeLong 10000 calls', function () {
      checkPermormance(() => escapeLong(str100), 10000);
    });
    it('escapeShort 100000 times', function () {
      checkPermormance(() => escapeShort(str100), 100000);
    });
    it('escapeLong 100000 calls', function () {
      checkPermormance(() => escapeLong(str100), 100000);
    });
  });
  describe('escapeShort vs escapeLong 1000 characters', function () {
    it('escapeShort 10000 times', function () {
      checkPermormance(() => escapeShort(str1000), 10000);
    });
    it('escapeLong 10000 calls', function () {
      checkPermormance(() => escapeLong(str1000), 10000);
    });
    it('escapeShort 100000 times', function () {
      checkPermormance(() => escapeShort(str1000), 100000);
    });
    it('escapeLong 100000 calls', function () {
      checkPermormance(() => escapeLong(str1000), 100000);
    });
  });
  describe('escapeShort', function () {
    it('Should return correct escaped string 1', function () {
      assert.strictEqual(escapeShort('.^$*+?()[]{}\\|/-'), '\\.\\^\\$\\*\\+\\?\\(\\)\\[\\]\\{\\}\\\\\\|\\/\\-');
    });
    it('Should return correct escaped string 2', function () {
      assert.strictEqual(escapeShort('a?b(c)d[e-1/2%'), 'a\\?b\\(c\\)d\\[e\\-1\\/2%');
    });
  });
  describe('escapeLong', function () {
    it('Should return correct escaped string 1', function () {
      assert.strictEqual(escapeLong('.^$*+?()[]{}\\|/-'), '\\.\\^\\$\\*\\+\\?\\(\\)\\[\\]\\{\\}\\\\\\|\\/\\-');
    });
    it('Should return correct escaped string 2', function () {
      assert.strictEqual(escapeLong('a?b(c)d[e-1/2%'), 'a\\?b\\(c\\)d\\[e\\-1\\/2%');
    });
  });
});
