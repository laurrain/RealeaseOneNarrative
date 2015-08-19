var SupplierDataService = require('../dataServices/suppliersData');
var assert = require("assert");
var Connection = require('../routes/testConnectionData');
var Promise = require("bluebird");

var connection =  new Connection();
connection.connect();

var supplierDataService = new SupplierDataService(connection);

describe('Supplier: Display all suppliers', function() {
  it('getAllSuppliers: Should return a list of suppliers', function(done) {
    supplierDataService
    .show_all_suppliers()
    .done(function(results, error){
      assert.equal(5, results.length);
      done();
    });
  });
});


describe('Supplier: Display supplier profitable product', function(){
  it('get supplier product', function(done){
    supplierDataService
    .show_supplier_profitable_product()
    .done(function(results){
      assert(1, results.length);
      done();
    })
  })
})

describe('Supplier:Display supplier popular product', function(){
  it('get the most popular product supplier', function(done){
    supplierDataService
    .show_supplier_popular_product()
    .done(function(results){
      assert(1, results.length);
      done();show_supplier_popular_product
    })
  })
})

