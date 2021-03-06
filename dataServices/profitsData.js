module.exports = function (connection) { 
  var getData = function(query, cb){
      connection.query(query, cb);
  };

this.show_product_profits = function (cb) {
		var sql = 'SELECT stock_item, avg_profit*no_sold AS profits FROM (SELECT stock_item, ROUND(SUM(profit)/SUM(1), 2) as avg_profit FROM (SELECT * FROM (SELECT stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price,CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)) AS cost, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) - CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2))) AS profit FROM sales_history INNER JOIN purchase_history ON stock_item=item GROUP BY stock_item, price, cost) AS single_profits) AS single_profits GROUP BY stock_item) AS avg_prod_profits INNER JOIN product_sold ON product_name=stock_item ORDER BY profits DESC';
        getData(sql,cb)
};

this.show_daily_profits = function(cb){
        var sql = 'SELECT DISTINCT day, ROUND(SUM(profits)/SUM(1), 2) AS profits FROM (SELECT DISTINCT sales_history.date, day, SUM((CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*no_sold) AS profits  FROM sales_history INNER JOIN purchase_history ON item=stock_item GROUP BY date) AS date_profits GROUP BY day ORDER BY profits DESC';
        getData(sql,cb)
};

this.show_category_profits = function(cb){
        var sql = 'SELECT cat_name, SUM(avg_profit*product_sold.no_sold) AS profits FROM (SELECT category_name,stock_item, ROUND(SUM(profit)/SUM(1), 2) as avg_profit FROM (SELECT * FROM (SELECT category_name, stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price,CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)) AS cost, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) - CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2) )) AS profit FROM sales_history INNER JOIN purchase_history ON stock_item=item GROUP BY stock_item, price, cost) AS single_profits) AS single_profits GROUP BY stock_item)AS avg_prod_profits INNER JOIN product_sold ON product_name=stock_item INNER JOIN categories ON categories.cat_name=category_name GROUP BY cat_name ORDER BY profits DESC';
        getData(sql, cb)
};
}
