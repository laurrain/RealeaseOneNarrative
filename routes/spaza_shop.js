exports.show_popular_products = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'popular_products', {
    			data : results
    		});
      });
	});
};

exports.show_popular_category = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON cat_id=categories.id GROUP BY cat_name ORDER BY no_sold DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'popular_categories', {
    			data : results
    		});
      });
	});
};

exports.show_products_price_cost = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, sales_price, cost FROM sales_history INNER JOIN purchase_history ON stock_item=purchase_history.item GROUP BY stock_item', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'products_price_cost', {
    			data : results
    		});
      });
	});
};

exports.show_product_earnings = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, SUM(cast(substring(sales_price,2) as decimal(53,8))*no_sold) AS earnings FROM sales_history GROUP BY stock_item', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'product_earnings', {
    			data : results
    		});
      });
	});
};

exports.show_product_profits = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY stock_item', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'product_profits', {
    			data : results
    		});
      });
	});
};

exports.show_supplier_popular_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT product_name, shop from product_sold INNER JOIN purchase_history ON item=product_name WHERE no_sold=(SELECT MAX(no_sold) FROM product_sold) GROUP BY product_name', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'supplier_popular_product', {
    			data : results
    		});
      });
	});
};

exports.show_supplier_profitable_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY stock_item', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'to_be_supplier_profitable_product', {
    			data : results
    		});
      });
	});
};