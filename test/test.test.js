/* global describe, it, expect */

var expect = require('chai').expect;
var chai = require('chai');
var Test = require('../lib/test');
var Page = require('../lib/page');


describe('Test', function() {
  
  describe('#request', function() {
    
    it('should invoke sync callback', function(done) {
      chai.kerouac.use(function(page, next) {
        page.end();
      })
      .request(function(page) {
        expect(page).to.be.an.instanceof(Page);
      })
      .finish(function() {
        done();
      })
      .generate();
    }); // should invoke sync callback
    
  });
  
});
