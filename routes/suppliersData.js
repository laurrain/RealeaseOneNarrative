module.exports = function (connection) { 
  var getData = function(query, cb){
      connection.query(query, cb);
  };
    var searchValue = function(req,res,next){
    if (err) return next(err);
    req.params.searchValue;
};

 var getSearchData = function(query, searchValue, cb){
    connection.query(query, searchValue, cb);
  }

this.show_supplier_popular_product = function (cb) {
		var sql = 'SELECT product_name, shop from product_sold INNER JOIN purchase_history ON item=product_name WHERE no_sold=(SELECT MAX(no_sold) FROM product_sold) GROUP BY product_name'
    	getData(sql, cb)
 };

 this.show_supplier_profitable_product = function (cb) {
		var sql = 'SELECT MAX(profits), shop, stock_item FROM (SELECT shop, stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY sales_history.stock_item ORDER BY profits DESC) AS prod_profits';
     	getData(sql, cb)
};

this.show_all_suppliers = function(cb){
		var sql = 'SELECT * FROM suppliers';
    	getData(sql, cb)
};

this.getSearchAllSuppliers = function(searchValue, cb){
        if(searchValue === "all"){
            var sql = 'SELECT * FROM suppliers';
            getData(sql, cb)

        }
        else{
            var searchValue = "%" +searchValue + "%";
            var sql = 'SELECT * FROM suppliers where shop Like ?';
            getSearchData(sql, searchValue, cb)
        }
};

}
