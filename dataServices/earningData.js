var Promise = require("bluebird");

function QueryExecute(connection) {
    this.connection = connection;

    this.execute = function(query, data){
        data = data || [];
        return new Promise(function(accept, error){
            connection.query( query, data, function(err, results){
              if (err){
                return error(err)
              }
              accept(results);
            });
        })
    };
}
module.exports = function (connection) {
	var queryExecutor = new QueryExecute(connection); 

	this.show_product_earnings = function () {
			return queryExecutor.execute('SELECT stock_item, SUM(earnings) AS earnings FROM (SELECT stock_item ,SUM(no_sold) AS no_sold, sales_price, SUM(no_sold)*CAST(SUBSTRING(sales_price, 2) AS DECIMAL(53, 2)) AS earnings  FROM sales_history GROUP BY sales_price, stock_item ORDER BY stock_item) AS sold_price_earn GROUP BY stock_item ORDER BY earnings DESC');
	        
	};

	this.show_category_earnings = function(){
	        return queryExecutor.execute('SELECT cat_name, SUM(earnings) AS earnings FROM (SELECT cat_name, no_sold*ROUND(AVG(price), 2) AS earnings FROM (SELECT cat_name, stock_item, price, SUM(no_sold) AS no_sold  FROM (SELECT category_name, stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price, no_sold FROM sales_history) AS prod_price INNER JOIN categories ON category_name=categories.cat_name GROUP BY stock_item, price) AS product_price GROUP BY stock_item, price) AS cat_earnings GROUP BY cat_name ORDER BY earnings DESC');
	        
	};

	this.show_products_price_cost = function () {
	        return queryExecutor.execute('SELECT stock_item, sales_price, cost FROM sales_history INNER JOIN purchase_history ON stock_item=purchase_history.item GROUP BY stock_item, sales_price, cost');
	       
	};
}