exports.show_supplier_popular_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT product_name, shop from product_sold INNER JOIN purchase_history ON item=product_name WHERE no_sold=(SELECT MAX(no_sold) FROM product_sold) GROUP BY product_name', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'supplier_popular_product', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};


exports.show_supplier_profitable_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT MAX(profits), shop, stock_item FROM (SELECT shop, stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY sales_history.stock_item ORDER BY profits DESC) AS prod_profits', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'supplier_profitable_product', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_all_suppliers = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM suppliers', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'all_suppliers', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.getSearchAll_suppliers = function(req, res, next){
    req.getConnection(function(err, connection){
        if(err) return next(err);
        var searchValue = req.params.searchValue;
        var processResults = function(err, results){
            if (err) return next(err);
            res.render('suppliersList', {
                username: req.session.user,
                administrator: administrator,
                data: results,
                layout: false
            })
            console.log(results)
        };
        if(searchValue === "all"){
            connection.query('SELECT * FROM suppliers', processResults)

        }
        else{
            searchValue = "%" +searchValue + "%";
            connection.query('SELECT * FROM suppliers where shop Like ?', [searchValue], processResults);
        }
    })
};

