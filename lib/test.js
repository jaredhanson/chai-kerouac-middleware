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
function Test(fn) {
  this._stack = [ fn ];
}

/**
 * Register a callback to be invoked when page is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.request = function(cb) {
  this._request = cb;
  return this;
};

/**
 * Register a callback to be invoked when middleware `end()`s page.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.finish = function(cb) {
  this._finish = cb;
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
 * Dispatch mock request to middleware.
 *
 * @api public
 */
Test.prototype.generate = function(err) {
  var self = this
    , page = new Page()
    , prepare = this._request;
  
  page.once('finish', function() {
    if (!self._finish) { throw new Error('page#end should not be called'); }
    self._finish.call(this);
  });
  
  function ready() {
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(self, err, page);
    }
    
    if (err) {
      self._stack[0](err, page, next);
    } else {
      self._stack[0](page, next);
    }
  }
  
  if (prepare && prepare.length == 2) {
    prepare(page, ready);
  } else if (prepare) {
    prepare(page);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
