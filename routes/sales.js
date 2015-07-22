exports.show_category_sales_per_day_per_week = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales GROUP BY cat_name ORDER BY per_day, per_week', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'category_sales_per_day_per_week', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_regular_sales = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history GROUP BY stock_item ORDER by frequency DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'regular_sales', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_sales_per_day = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date GROUP BY day ORDER BY avg_per_weekday DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'sales_per_day', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_stock_rates = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item ORDER BY rate_as_percent', [], function(err, results) {
            if (err) return next(err);

            res.render( 'stock_rates', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_entire_stock = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item ORDER BY quantity DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'entire_stock', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_products_per_day_per_week = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales GROUP BY stock_item ORDER BY per_day DESC, per_week DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'products_per_day_per_week', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_popular_products = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'popular_products', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.show_popular_category = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON category_name=categories.cat_name GROUP BY cat_name ORDER BY no_sold DESC', [], function(err, results) {
            if (err) return next(err);

            res.render( 'popular_categories', {
                data : results,
                administrator : administrator
            });
      });
    });
};

exports.getSearchsales = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('salesList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
            console.log(results)
        };
        if(searchValue === "all"){
            connection.query('SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history GROUP BY stock_item ORDER by frequency DESC', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history where stock_item like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchCategory = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('categoryList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales GROUP BY cat_name ORDER BY per_day, per_week', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales where cat_name like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchPopular_product = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('popular_productList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history where stock_item like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchproduct_per_day_per_week = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('productDayWeekList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales GROUP BY stock_item ORDER BY per_day DESC, per_week DESC', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales where stock_item like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchsales_per_day_week = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('salesDayWeekList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date GROUP BY day ORDER BY avg_per_weekday DESC', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date where day like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchstock_rates = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('stock_ratesList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item ORDER BY rate_as_percent', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item where item like ?', [searchValue], processResults);
        }
    })
};

exports.getSearchEntire_stock = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('entire_stockList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
        };
        if(searchValue === "all"){
            connection.query('SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item ORDER BY quantity DESC', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT item, SUM(quantity) as quantity FROM purchase_history where item like ?', [searchValue], processResults);
        }
    })
};