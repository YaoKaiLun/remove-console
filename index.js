var esprima = require('esprima')
var estraverse = require('estraverse')
var escodegen = require('escodegen')

module.exports = function(code) {
  var tree = esprima.parse(code, { sourceType: 'script' })
  estraverse.replace(tree, {
    enter: function (node) {
      if (isConsole(node)) {
        return this.remove()
      }
    }
  })
  return escodegen.generate(tree)
}

function isConsole(node) {
  return node.type === 'ExpressionStatement' &&  node.expression.type === 'CallExpression'  && node.expression.callee.type === 'MemberExpression' && node.expression.callee.object.type === 'Identifier' && node.expression.callee.object.name === 'console';
}
