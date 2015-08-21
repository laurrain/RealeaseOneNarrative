var Promise = require("bluebird");

function QueryExecute(connection) {
    this.connection = connection;

    this.execute = function(query, data){
        data = data || [];
        return new Promise(function(accept, error){
            connection.query(query, data, function(err, results){
              if (err){
                return error(err)
              }
              accept(results);
            });
        })
    };
}

module.exports = function (connection) { 
  var searchValue = function(req,res,next){
    if (err) return next(err);
    req.params.searchValue;
  };

 var getSearchData = function(query, searchValue){
    connection.query(query, searchValue);
  } 

  var queryExecutor = new QueryExecute(connection);

  this.show_supplier_popular_product = function () {
  		return queryExecutor.execute('SELECT product_name, shop from product_sold INNER JOIN purchase_history ON item=product_name WHERE no_sold=(SELECT MAX(no_sold) FROM product_sold) GROUP BY product_name')
  };

 this.show_supplier_profitable_product = function () {
		return queryExecutor.execute('SELECT MAX(profits), shop, stock_item FROM (SELECT shop, stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY sales_history.stock_item ORDER BY profits DESC) AS prod_profits');
  };

  this.show_all_suppliers = function(){
  		return queryExecutor.execute('SELECT * FROM suppliers');
  };

  this.getSearchAllSuppliers = function(searchValue){
          if(searchValue === "all"){
              return queryExecutor.execute('SELECT * FROM suppliers');
          }
          else{
              var searchValue = "%" +searchValue + "%";
              return queryExecutor.execute('SELECT * FROM suppliers where shop Like ?');
              getSearchData(queryExecutor.execute('SELECT * FROM suppliers where shop Like ?'), searchValue)
          }
  };
}
