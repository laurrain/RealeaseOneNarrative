//Nelisa wants to see the most popular product

var spaza = require('./spaza_shop_functions')

var selling_items = spaza.get_selling_items("Nelisa Sales History.csv");
var sales_history = spaza.get_sales_history("Nelisa Sales History.csv")

console.log(selling_items);

var popularity = spaza.get_popular_products(selling_items, sales_history);

console.log(popularity);