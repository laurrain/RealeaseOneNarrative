exports.show_popular_products = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, sum(no_sold) as no_sold from sales_history group by stock_item order by no_sold desc', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'popular_products', {
    			data : results
    		});
      });
	});
};

exports.show_category_earnings = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, sum(no_sold) as no_sold from sales_history group by stock_item order by no_sold desc', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'category_earnings', {
    			data : results
    		});
      });
	});
};