var EarningsDataService = require('../dataServices/earningData');
var assert = require("assert");
var Connection = require('../routes/testConnectionData');
var Promise = require("bluebird");

var connection =  new Connection();
connection.connect();

var earningsDataService = new EarningsDataService(connection);

describe('Earnings: Display category earnings', function() {
  it('getCategories: Should return and total earnings per category', function(done) {
  	earningsDataService
   		.show_category_earnings()
   		.done(function(results){
      	  assert.equal(5, results.length);
      	  done();
    	});
  	});
});

describe('Product total Earnings: Display produts and total earnings', function() {
  it('getProducts: Should return total earnings', function(done) {
  	earningsDataService
    .show_product_earnings()
    .done(function(results){
      assert.equal(18, results.length);
      done();
    });
  });
});

describe('Product price and cost: Display produts price and cost', function() {
  it('getProducts: Should return price and cost', function(done) {
  	earningsDataService
    .show_products_price_cost()
    .done(function(results){
      assert.equal(29, results.length);
      done();
    });
  });
});
