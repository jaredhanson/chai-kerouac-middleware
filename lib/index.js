module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.kerouac = chai.connect || {};
  chai.kerouac.use = function(middleware) {
    return new Test(middleware);
  };
};
