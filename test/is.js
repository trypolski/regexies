const assert = require('assert');
const is = require('../index').is;

describe('is', function() {
  describe('Arguments type errors', function () {
    it('Should return specific error message if first agrument type is incorrect', function () {
      assert.throws(() => is(undefined), { name: 'TypeError', message: 'The first argument should be not an empty string' });
    });
    it('Should return specific error message if second agrument type is incorrect', function () {
      assert.throws(() => is('some string', []), { name: 'TypeError', message: 'The second argument (options) should be an object or of objects' });
    });
    it('Should return specific error message if third agrument type is incorrect', function () {
      assert.throws(() => is('some string', {}, 'true'), { name: 'TypeError', message: 'The third argument should be a boolean' });
    });
  });
  describe('Options type errors', function () {
    it('Should return specific error message if option "number" has wrong type', function () {
      assert.throws(() => is('some string', { numbers: 'true' }, true), { name: 'TypeError', message: 'Option "numbers" should be boolean' });
    });
    it('Should return specific error message if option "lettersAll" has wrong type', function () {
      assert.throws(() => is('some string', { lettersAll: 'true' }, true), { name: 'TypeError', message: 'Option "lettersAll" should be boolean' });
    });
    it('Should return specific error message if option "lettersCountry" has wrong type', function () {
      assert.throws(() => is('some string', { lettersCountry: true }, true), { name: 'TypeError', message: 'Option "lettersCountry" should be string with country shortname' });
    });
    it('Should return specific error message if option "lettersCountry" has wrong value', function () {
      assert.throws(() => is('some string', { lettersCountry: 'somecountry' }, true), { name: 'TypeError', message: 'Sorry, the function does not support this country letters' });
    });
    it('Should return specific error message if option "lettersCapital" has wrong type', function () {
      assert.throws(() => is('some string', { lettersCapital: 0 }, true), { name: 'TypeError', message: 'Option "lettersCapital" should be boolean' });
    });
    it('Should return specific error message if option "lettersCapital" has wrong type', function () {
      assert.throws(() => is('some string', { lettersLowercase: 1 }, true), { name: 'TypeError', message: 'Option "lettersLowercase" should be boolean' });
    });
    it('Should return specific error message if option "specialCharacters" has wrong type', function () {
      assert.throws(() => is('some string', { specialCharacters: true }, true), { name: 'TypeError', message: 'Option "specialCharacters" should be string' });
    });
    it('Should return specific error message if option "optional" has wrong type', function () {
      assert.throws(() => is('some string', { optional: 'true' }, true), { name: 'TypeError', message: 'Option "optional" should be boolean' });
    });
    it('Should return specific error message if option "exact" has wrong type', function () {
      assert.throws(() => is('some string', { exact: true }, true), { name: 'TypeError', message: 'Option "exact" should be string' });
    });
    it('Should return specific error message if option "range" has wrong type', function () {
      assert.throws(() => is('some string', { range: true }, true), { name: 'TypeError', message: 'Option "range" should be string' });
    });
  });
  describe('Only numbers', function () {
    it('Should return true for string with only numbers and no length restrictions', function () {
      assert.strictEqual(is('293843984239', { numbers: true }), true);
    });
    it('Should return false for string with not only numbers and no length restrictions', function () {
      assert.strictEqual(is('293843984239asdsa', { numbers: true }), false);
    });
  });
  describe('Max/Min length', function () {
    it('Should return true for string with only numbers and minLength restriction', function () {
      assert.strictEqual(is('293843984239', { numbers: true, minLength: 3 }), true);
    });
    it('Should return false for string with only numbers and minLength restriction', function () {
      assert.strictEqual(is('29', { numbers: true, minLength: 3 }), false);
    });
    it('Should return true for string with only numbers and maxLength restriction', function () {
      assert.strictEqual(is('56747', { numbers: true, minLength: 0, maxLength: 5 }), true);
    });
    it('Should return false for string with only numbers and maxLength restriction', function () {
      assert.strictEqual(is('12312454', { numbers: true, maxLength: 5 }), false);
    });
  });
  describe('Letters', function () {
    it('Should return true for string with only english letters', function () {
      assert.strictEqual(is('asdASdasASY', { lettersAll: true }), true);
    });
    it('Should return false for string with numbers and english letters', function () {
      assert.strictEqual(is('29384398asdASdasASY', { lettersAll: true }), false);
    });
    it('Should return true for string with only english letters with selected capital and lowercase options', function () {
      assert.strictEqual(is('asdASdasASY', { lettersCapital: true, lettersLowercase: true }), true);
    });
    it('Should return false for string with special character and english letters', function () {
      assert.strictEqual(is('$asdASdasASY', { lettersCapital: true, lettersLowercase: true }), false);
    });
    it('Should return true for string with only english capital letters', function () {
      assert.strictEqual(is('QWERTZUIOPASDFGHJKLYXCVBNM', { lettersCapital: true }), true);
    });
    it('Should return false for string with not only english capital letters', function () {
      assert.strictEqual(is('QWERTZUIOPASaDFGHJKLYXCVBNM', { lettersCapital: true }), false);
    });
    it('Should return true for string with only english lowercase letters', function () {
      assert.strictEqual(is('qwertzuiopasdfghjklyxcvbnm', { lettersLowercase: true }), true);
    });
    it('Should return false for string with not only english lowercase letters', function () {
      assert.strictEqual(is('qwertzuiopasdSfghjklyxcvbnm', { lettersLowercase: true }), false);
    });
  });
  describe('Country letters', function () {
    describe('German - de', function () {
      it('Should return true for string with only german capital letters', function () {
        assert.strictEqual(is('VICTORJAGTZWÖLFBOXKÄMPFERQUERÜBERDENGROSSENSYLTERDEICH', { lettersCountry: 'de', lettersCapital: true }), true);
      });
      it('Should return false for string with not only german capital letters', function () {
        assert.strictEqual(is('ФVICTORJAGTZWÖLFBOXKÄMPFERQUERÜBERDENGROSSENSYLTERDEICH', { lettersCountry: 'de', lettersCapital: true }), false);
      });
      it('Should return true for string with only german lowercase letters', function () {
        assert.strictEqual(is('victorjagtzwölfboxkämpferquerüberdengroßensylterdeich', { lettersCountry: 'de', lettersLowercase: true }), true);
      });
      it('Should return false for string with not only german lowercase letters', function () {
        assert.strictEqual(is('êvictorjagtzwölfboxkämpferquerüberdengroßensylterdeich', { lettersCountry: 'de', lettersLowercase: true }), false);
      });
    });
    describe('Spanish - es', function () {
      it('Should return true for string with only spanish capital letters', function () {
        assert.strictEqual(is('BENJAMÍNPIDIÓUNABEBIDADEKIWIYFRESANOÉSINVERGÜENZALAMÁSEXQUISITACHAMPAÑADELMENÚ', { lettersCountry: 'es', lettersCapital: true }), true);
      });
      it('Should return false for string with not only spanish capital letters', function () {
        assert.strictEqual(is('ФBENJAMÍNPIDIÓUNABEBIDADEKIWIYFRESANOÉSINVERGÜENZALAMÁSEXQUISITACHAMPAÑADELMENÚ', { lettersCountry: 'es', lettersCapital: true }), false);
      });
      it('Should return true for string with only spanish lowercase letters', function () {
        assert.strictEqual(is('benjamínpidióunabebidadekiwiyfresanoésinvergüenzalamásexquisitachampañadelmenú', { lettersCountry: 'es', lettersLowercase: true }), true);
      });
      it('Should return false for string with not only spanish lowercase letters', function () {
        assert.strictEqual(is('ßbenjamínpidióunabebidadekiwiyfresanoésinvergüenzalamásexquisitachampañadelmenú', { lettersCountry: 'es', lettersLowercase: true }), false);
      });
    });
    describe('Russian - ru', function () {
      it('Should return true for string with only russian capital letters', function () {
        assert.strictEqual(is('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', { lettersCountry: 'ru', lettersCapital: true }), true);
      });
      it('Should return false for string with not only russian capital letters', function () {
        assert.strictEqual(is('АБВГДЕЁЖЗИЙКЛQМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', { lettersCountry: 'ru', lettersCapital: true }), false);
      });
      it('Should return true for string with only russian lowercase letters', function () {
        assert.strictEqual(is('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', { lettersCountry: 'ru', lettersLowercase: true }), true);
      });
      it('Should return false for string with not only russian lowercase letters', function () {
        assert.strictEqual(is('абвгдеёжзийклäмнопрстуфхцчшщъыьэюя', { lettersCountry: 'ru', lettersLowercase: true }), false);
      });
    });
    describe('Ukrainian - ua', function () {
      it('Should return true for string with only ukrainian capital letters', function () {
        assert.strictEqual(is('ЖЕБРАКУЮТЬФІЛОСОФИПРИҐАНКУЦЕРКВИВГАДЯЧІЩЕЙШАТРОЇХНЄПЯНЕЗНАЄМО', { lettersCountry: 'ua', lettersCapital: true }), true);
      });
      it('Should return false for string with not only ukrainian capital letters', function () {
        assert.strictEqual(is('ЖЕБРАКУЮТЬФІЛОСОФИПРИҐАНКУЦЕРКВИВГАДЯЧІЩЕЙШАТРОЇХНЄПЯНЕЗНАЄМОЁ', { lettersCountry: 'ua', lettersCapital: true }), false);
      });
      it('Should return true for string with only ukrainian lowercase letters', function () {
        assert.strictEqual(is('жебракуютьфілософиприґанкуцерквивгадячіщейшатроїхнєпянезнаємо', { lettersCountry: 'ua', lettersLowercase: true }), true);
      });
      it('Should return false for string with not only ukrainian lowercase letters', function () {
        assert.strictEqual(is('жебракуютьфілософиприґанкуцерквивгадячіщейшатроїхнєпянезнаємоъ', { lettersCountry: 'ua', lettersLowercase: true }), false);
      });
    });
    describe('French - fr', function () {
      it('Should return true for string with only french capital letters', function () {
        assert.strictEqual(is('DÈSNOËLOÙUNZÉPHYRHAÏMEVÊTDEGLAÇONSWÜRMIENSJEDÎNEDEXQUISRÔTISDEBŒUFAUKIRÀLAŸDÂGEMÛRCÆTERA', { lettersCountry: 'fr', lettersCapital: true }), true);
      });
      it('Should return false for string with not only french capital letters', function () {
        assert.strictEqual(is('DÈSNOËLOÙUNZÉPHYRHAÏMEVÊTDEGLAÇONSWÜRMФIENSJEDÎNEDEXQUISRÔTISDEBŒUFAUKIRÀLAŸDÂGEMÛRCÆTERA', { lettersCountry: 'fr', lettersCapital: true }), false);
      });
      it('Should return true for string with only french lowercase letters', function () {
        assert.strictEqual(is('dèsnoëloùunzéphyrhaïmevêtdeglaçonswürmiensjedînedexquisrôtisdebœufaukiràlaÿdâgemûrcætera', { lettersCountry: 'fr', lettersLowercase: true }), true);
      });
      it('Should return false for string with not only french lowercase letters', function () {
        assert.strictEqual(is('dèsnoëloùunzéphyrhфaïmevêtdeglaçonswürmiensjedînedexquisrôtisdebœufaukiràlaÿdâgemûrcætera', { lettersCountry: 'fr', lettersLowercase: true }), false);
      });
    });
  });
  describe('Special characters', function () {
    it('Should return true if string includes only asterisk character', function () {
      assert.strictEqual(is('******', { specialCharacters: '*' }), true);
    });
    it('Should return false for string with numbers and asterisk', function () {
      assert.strictEqual(is('1231231***', { specialCharacters: '*' }), false);
    });
    it('Should return true if string includes slashes and numbers', function () {
      assert.strictEqual(is('91\\28\\22/32/', { specialCharacters: '\\/', numbers: true }), true);
    });
  });
  describe('Exact', function () {
    it('Should return true if string match exact value', function () {
      assert.strictEqual(is('http://', { exact: 'http://' }), true);
    });
    it('Should return false if string does not match exact value', function () {
      assert.strictEqual(is('http://', { exact: 'https://' }), false);
    });
  });
  describe('Range', function () {
    it('Should return true if string match value in specific range', function () {
      assert.strictEqual(is('56789', { range: '5-9' }), true);
    });
    it('Should return false if string does not match value in specific range', function () {
      assert.strictEqual(is('01234', { range: '5-9' }), false);
    });
  });
  describe('Array of options', function () {
    it('Should return true if string match 2 numbers and optional english text after', function () {
      assert.strictEqual(is('09assad', [
        { numbers: true, maxLength: 2, minLength: 2 },
        { lettersAll: true, optional: true }
      ]), true);
    });
    it('Should return true if string match 2 numbers and optional english text after is missing', function () {
      assert.strictEqual(is('09', [
        { numbers: true, maxLength: 2, minLength: 2 },
        { lettersAll: true, optional: true }
      ]), true);
    });
    it('Should return false if string includes one number and optional english text after', function () {
      assert.strictEqual(is('0asdadsd', [
        { numbers: true, maxLength: 2, minLength: 2 },
        { lettersAll: true, optional: true }
      ]), false);
    });
    it('Should return true if string http://www.google.com/ + lowercase letters + slash + numbers', function () {
      assert.strictEqual(is('http://www.google.com/asd/0098767899', [
        { exact: 'http://www.google.com/' },
        { lettersLowercase: true },
        { specialCharacters: '/', minLength: 1, maxLength: 1 },
        { numbers: true, optional: true }
      ]), true);
    });
    it('Should return true if string http://www.google.com/ + lowercase letters + slash without numbers', function () {
      assert.strictEqual(is('http://www.google.com/asd/', [
        { exact: 'http://www.google.com/' },
        { lettersLowercase: true },
        { specialCharacters: '/', minLength: 1, maxLength: 1 },
        { numbers: true, optional: true }
      ]), true);
    });
    it('Should return false if string http://www.google.com/ + uppercase letters + slash + numbers', function () {
      assert.strictEqual(is('http://www.google.com/ASD/34423', [
        { exact: 'http://www.google.com/' },
        { lettersLowercase: true },
        { specialCharacters: '/', minLength: 1, maxLength: 1 },
        { numbers: true, optional: true }
      ]), false);
    });
    it('Should return false if string http://www.google.com/ without letters + slash + numbers', function () {
      assert.strictEqual(is('http://www.google.com/34423', [
        { exact: 'http://www.google.com/' },
        { lettersLowercase: true },
        { specialCharacters: '/', minLength: 1, maxLength: 1 },
        { numbers: true, optional: true }
      ]), false);
    });
    it('Should return false if string http://www.google.com/ + lowercase letters + slash + lowercase letters', function () {
      assert.strictEqual(is('http://www.google.com/asdasd/asd', [
        { exact: 'http://www.google.com/' },
        { lettersLowercase: true },
        { specialCharacters: '/', minLength: 1, maxLength: 1 },
        { numbers: true, optional: true }
      ]), false);
    });
  });
})
