var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '42926238'
});
var SuppliersDataService = require('./suppliersData');
connection.connect();
connection.query('use spaza_shop');
var supplierData = new SuppliersDataService(connection);

exports.show_supplier_popular_product = function (req, res, next) {
    supplierData.show_supplier_popular_product
        supplierData.show_supplier_popular_product(function(err, results) {
            if (err) return next(err);

            res.render( 'supplier_popular_product', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_supplier_profitable_product = function (req, res, next) {
        supplierData.show_supplier_profitable_product(function(err, results) {
            if (err) return next(err);

            res.render( 'supplier_profitable_product', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_all_suppliers = function(req, res, next){
        supplierData.show_all_suppliers(function(err, results) {
            if (err) return next(err);

            res.render( 'all_suppliers', {
                data : results,
                administrator : administrator
            });
    });
};

exports.getSearchCategory = function(req, res, next){
    req.getConnection(function(err, connection){ 
       console.log(err); 

       if(err) return next(err);

        var searchValue = req.params.searchValue;

        salesData.getSearchCategory(searchValue, function(err, results){
            if (err){
                return next(err);
            }

            res.render('categoryList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};

exports.getSearchAllSuppliers = function(req, res, next){
     req.getConnection(function(err, connection){ 
       console.log(err); 

       if(err) return next(err);
        var searchValue = req.params.searchValue;
        supplierData.getSearchAllSuppliers(searchValue, function(err, results){
                if (err){
                return next(err);
            }

            res.render('suppliersList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};