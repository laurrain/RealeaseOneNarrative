var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '42926238'
});
var EarningsDataService = require('./earningsData');
connection.connect();
connection.query('use nelisa_spaza_shop');
var earningData = new EarningsDataService(connection);

exports.show_product_earnings = function (req, res, next) {
	earningData.show_product_earnings(function(err, results){
       	if (err) return next(err);

    		res.render( 'product_earnings', {
    			data : results,
    			administrator : administrator
    		});
	});
};

exports.show_category_earnings = function(req, res, next){
    earningData.show_category_earnings(function(err, results){
        if (err) return next(err);

            res.render( 'category_earnings', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_products_price_cost = function (req, res, next) {
        earningData.show_products_price_cost(function(err, results){
            if (err) return next(err);

            res.render( 'products_price_cost', {
                data : results,
                administrator : administrator
            });
    });
};