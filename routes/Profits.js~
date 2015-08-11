var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MysqlServer123'
});
var ProfitsDataService = require('./profitsData');
connection.connect();
connection.query('use spaza_shop');
var profitData = new ProfitsDataService(connection);

exports.show_product_profits = function (req, res, next) {
        profitData.show_product_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'product_profits', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_daily_profits = function(req, res, next){
        profitData.show_daily_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'daily_profits', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_category_profits = function(req, res, next){
        profitData.show_category_profits(function(err, results) {
            if (err) return next(err);

            res.render( 'category_profits', {
                data : results,
                administrator : administrator
            });
    });
};