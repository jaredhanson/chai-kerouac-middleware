exports = module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.kerouac = chai.kerouac || {};
  chai.kerouac.use = function(fn) {
    return new Test(fn);
  };
};
