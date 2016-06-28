/**
 * External dependencies.
 */

var Formatter = require('hydro-formatter');

/**
 * Return indent for suite|test.
 *
 * @param {Suite|Test} node
 * @returns {String}
 * @api private
 */

function indent(node) {
  var next = node;
  var i = 0;
  while (next) {
    ++i;
    next = next.suite || next.parent;
  }
  return Array(i).join('  ');
}

/**
 * Doc formatter.
 *
 * @constructor
 */

var Doc = Formatter.extend();

/**
 * Before suite.
 * Print blank line before every top-level test suite.
 *
 * @param {Suite} suite
 * @api public
 */

Doc.prototype.beforeSuite = function(suite) {
  if (!suite.parent.parent) this.println();
  this.println(indent(suite) + suite.title);
};

/**
 * After each test.
 *
 * @param {Test} test
 * @api public
 */

Doc.prototype.afterTest = function(test) {
  if (test.status === 'skipped') return;
  this.println(indent(test) + this.color(test.title, this.statusColor[test.status]));
};

/**
 * After all tests.
 *
 * @api public
 */

Doc.prototype.afterAll = function() {
  this.displayResult();
  this.displayFailed();
};

/**
 * Primary export.
 */

module.exports = Doc;
