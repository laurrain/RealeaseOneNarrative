var SuppliersData = require('../routes/suppliersData.js');
var assert = require('assert');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MysqlServer123',
    database: 'spaza_shop'
});

var suppliersData = new SuppliersData(connection);

describe('Testing suppliersData queries', function() {
  it('show_all_suppliers: Should return a list of suppliers', function(done) {
    suppliersData.show_all_suppliers(function(err, results){
		// console.log(data)
		assert.equal(results.length, 5);
      done();
    });
  });
});