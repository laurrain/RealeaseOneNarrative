//Nelisa wants to see the most popular product

var spaza = require('./spaza_shop_functions')

var selling_items = spaza.get_selling_items("Nelisa Sales History.csv");
var sales_history = spaza.get_sales_history("Nelisa Sales History.csv")

//console.log(selling_items);

var popularity = spaza.get_popular_products(selling_items, sales_history);

//console.log(popularity);

var popular_categories = spaza.get_popular_category(popularity);

/*popular_categories.forEach(function(item){
			console.log(item["cat"] + " === " + item["sold_no"]);
		});*/
var regular_sales  = spaza.get_regular_sales(sales_history, selling_items);
//console.log(regular_sales);