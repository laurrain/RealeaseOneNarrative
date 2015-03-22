var spaza = require('./spaza_shop_functions');
var spaza_2 = require('./spaza_shop_functions_2');

//Print the logo first then execute the rest of the functions
var logo = spaza.print_logo("Nelisa's Spaza Shop", function(){

	//Get selling items and sales history into variables
	var selling_items = spaza.get_selling_items("Nelisa Sales History.csv");
	spaza_2.write_to_file(selling_items, "selling_items.csv")
	
	var sales_history = spaza.get_sales_history("Nelisa Sales History.csv")
	//spaza_2.write_to_file(sales_history, "sales_history.csv")

	//Get most popular products, write them to file and print to console as well
	var popular_products = spaza.get_popular_products(selling_items, sales_history);
	console.log("THE MOST POPULAR PRODUCT: " + popular_products[0]["product"] + " - SALES NO.: " + popular_products[0]["sold_no"])
	spaza_2.write_to_file(popular_products, "popular_products.csv");

	//Get most popular categories, print the to console and write to file as well
	var popular_categories = spaza.get_popular_category(popular_products);
	spaza_2.write_to_file(popular_categories, "popular_categories.csv");

	console.log("\nMOST POPULAR CATEGORY: " + popular_categories[0]["category"] + " - SALES NO.: " + popular_categories[0]["sold_no"]);
	console.log("\nLEAST POPULAR PRODUCT: " + popular_products[popular_products.length-1]["product"] + " - SALES NO.: " + popular_products[popular_products.length-1]["sold_no"]);
	console.log("\nLEAST POPULAR CATEGORY: " + popular_categories[popular_categories.length-1]["category"] + " - SALES NO.: " + popular_categories[popular_categories.length-1]["sold_no"]);

	//Get the most regular sales
	var regular_sales  = spaza.get_regular_sales(sales_history, selling_items);
	spaza_2.write_to_file(regular_sales, "most_regular_sales.csv");
	console.log("\nMOST REGULAR SALES" + "\n-----------------------------------")
	console.log("PRODUCT -- FREQUENCY\n----------  -  -----------")
	spaza.print(regular_sales);

	var purchase_history = spaza.get_purchase_history("NelisaPurchases.csv");
	//spaza.print(purchase_history);

	var entire_stock = spaza.get_entire_stock(selling_items, purchase_history);
	spaza_2.write_to_file(entire_stock, "entire_stock.csv")
	//spaza.print(entire_stock)

	console.log("\nSALES GOING DOWN THE FASTEST-->SLOWEST\n-----------------------------------------");
	var stock_rates = spaza.get_stock_rates(entire_stock, popular_products);
	console.log("PRODUCT -- RATE(%)\n----------  -  ----------")
	spaza.print(stock_rates);
	spaza_2.write_to_file(stock_rates, "stock_rates.csv")

	console.log("\nPRODUCT EARNINGS IN RANDS(R)\n-----------------------")
	var product_earnings = spaza.get_product_earnings(sales_history, popular_products);
	console.log("PRODUCT -- EARNINGS\n----------  -  ----------")
	spaza.print(product_earnings);
	spaza_2.write_to_file(product_earnings, "product_earnings")

	console.log("\nCATEGORY EARNINGS  IN RANDS(R)\n---------------------------")
	var category_earnings = spaza.get_category_earnings(product_earnings);
	console.log("CATEGORY --EARNINGS\n----------  -  -----------")
	spaza.print(category_earnings);
	spaza_2.write_to_file(category_earnings, "category_earnings.csv")

	var price_cost = spaza.get_product_price_and_cost(selling_items,sales_history, purchase_history);
	spaza_2.write_to_file(price_cost, "price_and_cost.csv")

	console.log("\nPRODUCTS PROFITS  IN RANDS(R)\n---------------------------")
	var product_profits = spaza.get_product_profits(price_cost,popular_products);
	console.log("PRODUCT -- PROFITS\n----------  -  ----------")
	spaza.print(product_profits);
	spaza_2.write_to_file(product_earnings, "product_earnings.csv")

	console.log("\nCATEGORY PROFITS  IN RANDS(R)\n---------------------------")
	var cat_profits = spaza.get_category_profits(product_profits);
	console.log("CATEGORY -- PROFITS\n----------  -  ----------")
	spaza.print(cat_profits);
	spaza_2.write_to_file(cat_profits, "category_profits.csv")

	/*console.log("\nAVERAGE TOTAL SALES PER DAY AND PER WEEK\n----------------------------------------------")
	var sales_per_week_and_day = spaza_2.get_total_avg_day_week_sales(sales_history);
	spaza.print(sales_per_week_and_day)*/
	console.log("\nAVERAGE SALES PER WEEK\n----------------------------")
	console.log("WEEK  -- AVERAGE\n-------  - -----")
	var sales_per_week = spaza_2.get_avg_sales_per_week(sales_history)
	spaza.print(sales_per_week)
	spaza_2.write_to_file(sales_per_week, "sales_per_week")

	console.log("\nAVERAGE TOTAL SALES PER DAY IN RANDS(R)\n----------------------------------------------")
	var sales_per_day = spaza_2.get_avg_sales_per_day(sales_history);
	console.log("DAY - - - AVG_SALES\n------- ----------")
	spaza.print(sales_per_day)
	spaza_2.write_to_file(sales_per_day, "sales_per_day.csv")


	console.log("\nAVERAGE SALES PER DAY AND PER WEEK PER PRODUCT\n----------------------------------------------------")
	var product_per_day_per_week = spaza_2.get_product_avg_dayWeek_sales(sales_history, selling_items)
	console.log("PRODUCT -- DAY_AVERAGE -- WEEK_AVERAGE\n----------  -  -----------  -  ---------")
	spaza.print(product_per_day_per_week)
	spaza_2.write_to_file(product_per_day_per_week, "product_per_day_per_week.csv")

	console.log("\nAVERAGE SALES PER DAY AND PER WEEK PER CATEGORY\n----------------------------------------------------")
	var category_per_day_per_week = spaza_2.get_avg_cat_dayWeek_sales(product_per_day_per_week)
	console.log("CATEGORY -- DAY_AVERAGE -- WEEK_AVERAGE\n----------  -  -----------  -  ---------")
	spaza.print(category_per_day_per_week)
	spaza_2.write_to_file(category_per_day_per_week, "category_per_day_per_week.csv")

	console.log("\nMOST PROFITABLE DAYS\n------------------------")
	var daily_profits = spaza_2.get_avg_profit_per_day(sales_history, price_cost)
	console.log("DAY -- PROFITS\n-------- -- -------")
	spaza.print(daily_profits)
	spaza_2.write_to_file(daily_profits, "daily_profits.csv")

	console.log("\nSUPPLIER SUPPLYING THE MOST POPULAR PRODUCT\n-------------------------------------")
	var supplier_pop = spaza_2.get_supply_popular_product(popular_products, purchase_history)
	console.log("SHOP     ---    PRODUCT\n-------------  -  --------------")
	spaza.print(supplier_pop)
	spaza_2.write_to_file(supplier_pop, "supplier_pop.csv")

});