var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '42926238'
});
var SaleDataService = require('./salesData');
connection.connect();
connection.query('use nelisa_spaza_shop');
var salesData = new SaleDataService(connection);

exports.show_category_sales_per_day_per_week = function (req, res, next) {
    salesData.show_category_sales_per_day_per_week(function(err, results) {
            if (err) return next(err);
            res.render( 'category_sales_per_day_per_week', {
                data : results,
                administrator : administrator
            });
     
    });
};

exports.show_regular_sales = function (req, res, next) {
    salesData.show_regular_sales(function(err, results) {
          if (err) return next(err);
            res.render( 'regular_sales', {
                data : results,
                administrator : administrator
            });
     
    });
};

exports.show_sales_per_day = function (req, res, next) {
    salesData.show_sales_per_day(function(err, results){
            if (err) return next(err);
            res.render( 'sales_per_day', {
                data : results,
                administrator : administrator
            });
     
    });
};

exports.show_stock_rates = function (req, res, next) {
    salesData.show_stock_rates(function(err, results){
            if (err) return next(err);
            res.render( 'stock_rates', {
                data : results,
                administrator : administrator
            });
    });
};

exports.show_entire_stock = function (req, res, next) {
    salesData.show_entire_stock(function(err, results){
              if (err) return next(err);
            res.render( 'entire_stock', {
                data : results,
                administrator : administrator
            });
      
    });
    
};

exports.show_products_per_day_per_week = function (req, res, next) {
    salesData.show_products_per_day_per_week(function(err, results){
            if (err) return next(err);
            res.render( 'products_per_day_per_week', {
                data : results,
                administrator : administrator
            });
     
    });
};

exports.show_popular_products = function (req, res, next) {
    salesData.show_popular_products(function(err, results){
             if (err) return next(err);

            res.render( 'popular_products', {
                data : results,
                administrator : administrator
            });
      
    });
};

exports.show_popular_category = function (req, res, next) {
    salesData.show_popular_category(function(err, results){
             if (err) return next(err);

            res.render( 'popular_categories', {
                data : results,
                administrator : administrator
            });
     
    });
};

exports.getSearchSales = function(req, res, next){
    req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;

        salesData.getSearchSales(searchValue, function(err, results){
            if (err) 
                return next(err)

            res.render('salesList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
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

 exports.getSearchsalesPerDayWeek = function(req, res, next){
    req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;
        salesData.getSearchsalesPerDayWeek(searchValue, function(err, results){
            if (err) return next(err)
            res.render('salesDayWeekList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};


exports.getSearchPopularProduct = function(req, res, next){
    req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;
        salesData.getSearchPopularProduct(searchValue,function(err, results){
            if (err) return next(err)
            res.render('popular_productList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};


exports.getSearchProductPerDayPerWeek = function(req, res, next){
  req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;
        salesData.getSearchProductPerDayPerWeek(searchValue, function(err, results){
            if (err) return next(err)
            res.render('productDayWeekList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};


exports.getSearchstockRates = function(req, res, next){
   req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;
        salesData.getSearchstockRates(searchValue, function(err, results){
            if (err) return next(err)
            res.render('entire_stockList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};

exports.getSearchEntireStock = function(req, res, next){
   req.getConnection(function(err, connection){
       if(err) return next(err);

       var searchValue = req.params.searchValue;
        salesData.getSearchEntireStock(searchValue, function(err, results){
            if (err) return next(err)
            res.render('entire_stockList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })

        })
    })
};