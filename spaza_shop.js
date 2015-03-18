var spaza = require('./spaza_shop_functions');

//Print the logo first then execute the rest of the functions
var logo = spaza.print_logo("Nelisa's Spaza Shop", function(){

	//Get selling items and sales history into variables
	var selling_items = spaza.get_selling_items("Nelisa Sales History.csv");
	
	var sales_history = spaza.get_sales_history("Nelisa Sales History.csv")

	//Get most popular products, write them to file and print to console as well
	var popular_products = spaza.get_popular_products(selling_items, sales_history);
//	spaza.write_to_file("popular_products.csv", popular_products, 2);
	console.log("THE MOST POPULAR PRODUCT: " + popular_products[0]["product"] + " - SALES NO.: " + popular_products[0]["sold_no"])

	//Get most popular categories, print the to console and write to file as well
	var popular_categories = spaza.get_popular_category(popular_products);
	//spaza.write_to_file("popular_categories.csv", popular_categories, 2);

	console.log("\nMOST POPULAR CATEGORY: " + popular_categories[0]["category"] + " - SALES NO.: " + popular_categories[0]["sold_no"]);
	console.log("\nLEAST POPULAR PRODUCT: " + popular_products[popular_products.length-1]["product"] + " - SALES NO.: " + popular_products[popular_products.length-1]["sold_no"]);
	console.log("\nLEAST POPULAR CATEGORY: " + popular_categories[popular_categories.length-1]["category"] + " - SALES NO.: " + popular_categories[popular_categories.length-1]["sold_no"]);

	//Get the most regular sales
	var regular_sales  = spaza.get_regular_sales(sales_history, selling_items);
//	spaza.write_to_file("most_regular_sales.csv", regular_sales, 2);
	console.log("\nMOST REGULAR SALES" + "\n-----------------------------------")
	spaza.print(regular_sales);

	var purchase_history = spaza.get_purchase_history("NelisaPurchases.csv");
	//spaza.print(purchase_history);

	var entire_stock = spaza.get_entire_stock(selling_items, purchase_history);
	//spaza.print(entire_stock)

	console.log("\nSALES GOING DOWN THE FASTEST-->SLOWEST\n-----------------------------------------");
	var stock_rates = spaza.get_stock_rates(entire_stock, popular_products);
	spaza.print(stock_rates);

	console.log("\nPRODUCT EARNINGS IN RANDS(R)\n-----------------------")
	var product_earnings = spaza.get_product_earnings(sales_history, popular_products);
	spaza.print(product_earnings);

	console.log("\nCATEGORY EARNINGS  IN RANDS(R)\n---------------------------")
	var category_earnings = spaza.get_category_earnings(product_earnings);
	spaza.print(category_earnings);

	var price_cost = spaza.get_product_price_and_cost(selling_items,sales_history, purchase_history);

	console.log("\nPRODUCTS PROFITS  IN RANDS(R)\n---------------------------")
	var product_profits = spaza.get_product_profits(price_cost,popular_products);
	spaza.print(product_profits);

	console.log("\nCATEGORY PROFITS  IN RANDS(R)\n---------------------------")
	var cat_profits = spaza.get_category_profits(product_profits);
	spaza.print(cat_profits);
});