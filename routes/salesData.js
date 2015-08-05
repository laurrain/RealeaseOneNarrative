module.exports = function (connection) {
  var searchValue = function(req,res,next){
    if (err) return next(err);
    req.params.searchValue;
};
  
  var getData = function(query, cb){
      connection.query(query, null, cb);
  };

  var getSearchData = function(query, searchValue, cb){
    connection.query(query, searchValue, cb);
  }



this.show_category_sales_per_day_per_week = function (cb) {
      var sql = 'SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales GROUP BY cat_name ORDER BY per_day, per_week';
      getData(sql,cb)
};

this.show_regular_sales = function(cb){
        
    var sql = 'SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history GROUP BY stock_item ORDER by frequency DESC';
    getData(sql, cb)
};

this.show_sales_per_day = function(cb){
        var sql = 'SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date GROUP BY day ORDER BY avg_per_weekday DESC';
        getData(sql, cb)
};

this.show_stock_rates = function(cb){
        var sql = 'SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item ORDER BY rate_as_percent';
        getData(sql, cb)
};

this.show_entire_stock = function(cb){
        var sql = 'SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item ORDER BY quantity DESC';
        getData(sql, cb)
};

this.show_products_per_day_per_week = function(cb){
        var sql = 'SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales GROUP BY stock_item ORDER BY per_day DESC, per_week DESC';
        getData(sql, cb)
};

this.show_popular_products = function(cb) {
        var sql = 'SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC';
        getData(sql, cb)
};

this.show_popular_category = function (searchValue,cb) {
    
        var sql = 'SELECT cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON category_name=categories.cat_name GROUP BY cat_name ORDER BY no_sold DESC';
        getData(sql, cb)
};

this.getSearchSales = function(searchValue, cb){
		if(searchValue === "all"){
            var sql = 'SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history GROUP BY stock_item ORDER by frequency DESC';
                getData(sql, cb)
        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history where stock_item like ?';
            getSearchData(sql,searchValue, cb)
        } 
};

this.getSearchCategory = function(searchValue,cb){
        if(searchValue === "all"){
            var sql = 'SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales GROUP BY cat_name ORDER BY per_day, per_week';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales where cat_name like ?';
            getSearchData(sql,searchValue, cb)
        }
};

this.getSearchPopularProduct = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC';
            getData(sql, cb)
        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history where stock_item like ?';
            getSearchData(sql, searchValue, cb)
        }
};

this.getSearchProductPerDayPerWeek = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales GROUP BY stock_item ORDER BY per_day DESC, per_week DESC';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales where stock_item like ?';
            getSearchData(sql, searchValue, cb)
        }
};

this.getSearchsalesPerDayWeek = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date GROUP BY day ORDER BY avg_per_weekday DESC';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date where day like ?';
            getSearchData(sql, searchValue, cb)
        }
    
};

this.getSearchstockRates = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item ORDER BY rate_as_percent';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item where item like ?';
            getSearchData(sql, searchValue, cb)
        }
};

this.getSearchEntireStock = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item ORDER BY quantity DESC';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT item, SUM(quantity) as quantity FROM purchase_history where item like ?';
            getSearchData(sql,searchValue, cb)
        }
};

}