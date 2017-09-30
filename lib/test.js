/**
 * Module dependencies.
 */
var Page = require('./page');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(middleware) {
  this._middleware = middleware;
}

/**
 * Register a callback to be invoked when page is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.page = function(cb) {
  this._page = cb;
  return this;
};

/**
 * Register a callback to be invoked when middleware `end()`s page.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.end = function(cb) {
  this._end = cb;
  return this;
};

/**
 * Register a callback to be invoked when middleware calls `next()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.next = function(cb) {
  this._next = cb;
  return this;
};

/**
 * Dispatch mock page to middleware.
 *
 * @api public
 */
Test.prototype.dispatch = function(err) {
  var self = this
    , before = this._page;
  
  var page = new Page(function() {
    if (!self._end) { throw new Error('page#end should not be called'); }
    self._end.call(this, page);
  });
  
  function ready() {
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(this, err);
    }
    
    if (err) {
      self._middleware(err, page, next);
    } else {
      self._middleware(page, next);
    }
  }
  
  if (before && before.length == 2) {
    before(page, ready);
  } else if (before) {
    before(page);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
