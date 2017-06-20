var assert = require('assert');
var removeConsole = require('../index');

let source = ''

describe('remove console', function() {
  describe('no option', function() {
    it('should return a empty string when the code just a console statement', function() {
      source = `console.log('something')`;
      assert.equal('', removeConsole(source));
    });
    it('should return source when the code just a string including console', function() {
      source = `"console.log('something')"`;
      assert.notEqual('', removeConsole(source));
    });
  });
});