var spaza_2 = require("../spaza_shop_functions_2")

QUnit.test("Testing get_total_avg_day_week_sales", function(assert){

	var sales_history = [
					{day:"Monday", date:"Date1", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Monday", date:"Date1", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"}
					];	

	var expected = [
					{time: "day_avg", avg: 587.00},
					{time: "week_avg", avg: 1760.00}
					];

	var result = mymodule_2.get_total_avg_day_week_sales(sales_history);

	
	assert.deepEqual(result, expected, "Match!");

});

QUnit.test("Testing get_product_avg_dayWeek_sales", function(assert){

var expected = [
				{product: "Item1", day_avg: 100, week_avg: 100},
				{product: "Item2", day_avg: 80, week_avg: 240},
				{product: "Item3", day_avg: 20, week_avg: 20},
				{product: "Item4", day_avg: 600, week_avg: 600},
				{product: "Item5", day_avg: 800, week_avg: 800}
				];

	var sales_history = [
					{day:"Day1", date:"Date1", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Day1", date:"Date1", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Day2", date:"Date2", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Day2", date:"Date2", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Day2", date:"Date2", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Day2", date:"Date2", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Day3", date:"Date3", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day:"Day3", date:"Date3", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"}
					];
	var selling_items = [
						{product: "Item1"},
						{product: "Item2"},
						{product: "Item3"},
						{product: "Item4"},
						{product: "Item5"}
						]

	var result = mymodule_2.get_product_avg_dayWeek_sales(sales_history, selling_items);


	assert.equal(result, expected, "Match!");

});

QUnit.test("Testing get_avg_sales_per_day", function (assert){

	var sales_history = [
					{day:"Monday", date:"Date1", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Monday", date:"Date1", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"}
					];

	var expected = [
					{day: "Sunday", avg: 0},
					{day: "Monday", avg: 180},
					{day: "Tuesday", avg: 1500},
					{day: "Wednesday", avg: 80},
					{day: "Thursday", avg: 0},
					{day: "Friday", avg: 0},
					{day: "Saturday", avg: 0}
					];

	var result = spaza_2.get_avg_sales_per_day(sales_history);

	assert.deepEqual(result, expected, "The day sales match")

});

QUnit.test("Testing get_avg_sales_per_week", function (assert){

	var sales_history = [
					{day:"Monday", date:"Date1", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Monday", date:"Date1", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Monday", date:"Date10", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Monday", date:"Date10", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date20", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date20", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date20", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date20", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date30", stock_item: "Item1", no_sold_items: "10", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date30", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"}
					];

	var expected = [
					{week: "week1", avg: 1760},
					{week: "week2", avg: 1960}
					];

	var result = spaza_2.get_avg_sales_per_week(sales_history);

	assert.deepEqual(result, expected, "The day sales match")

});

QUnit.test("Testing get_avg_profit_per_day", function (assert){

	var sales_history = [
					{day:"Monday", date:"Date1", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day:"Monday", date:"Date1", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day:"Tuesday", date:"Date2", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day:"Wednesday", date:"Date3", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"}
					];

	var price_cost = [
						{product: "Item1", price: 20, cost: 10},
						{product: "Item2", price: 20, cost: 10},
						{product: "Item3", price: 20, cost: 10},
						{product: "Item4", price: 20, cost: 10},
						{product: "Item5", price: 20, cost: 10}
						];

	var expected = [
					{day: "Tuesday", profit: 750},
					{day: "Monday", profit: 90},
					{day: "Wednesday", profit: 40},
					{day: "Sunday", profit: 0},
					{day: "Thursday", profit: 0},
					{day: "Friday", profit: 0},
					{day: "Saturday", profit: 0}
					];

	var result = spaza_2.get_avg_profit_per_day(sales_history, price_cost);

	assert.deepEqual(result, expected, "The day sales match")
});

QUnit.test("Testing get_supply_popular_product", function(assert){

	var popular_products = [
							{product: "phone", sold_no: 80},
							{product: "8.1", sold_no: 45},
							{product: "windows", sold_no:15},
							{product: "black", sold_no:5}
							];

	var purchase_history = [
							{shop: "Maglasana", stock_item: "8.1", sold_no: 45},
							{shop: "Nokulunga", stock_item: "black", sold_no:5},		
							{shop: "Madiba", stock_item: "phone", sold_no: 80},
							{shop: "Nolitha", stock_item: "windows", sold_no:15}
							];

	var result = spaza_2.get_supply_popular_product(popular_products, purchase_history)

	var expected = [
					{product: "phone", shop: "Madiba"}
					];

	assert.deepEqual(result, expected)


});

QUnit.test("Testing get_supply_profitable_product", function(assert){

	var product_profits = [
							{product: "phone", profits: 80},
							{product: "8.1", profits: 45},
							{product: "windows", profits:15},
							{product: "black", profits:5}
							];

	var purchase_history = [
							{shop: "Maglasana", stock_item: "8.1", sold_no: 45},
							{shop: "Nokulunga", stock_item: "black", sold_no:5},		
							{shop: "Madiba", stock_item: "phone", sold_no: 80},
							{shop: "Nolitha", stock_item: "windows", sold_no:15}
							];

	var result = spaza_2.get_supply_profitable_product(product_profits, purchase_history)

	var expected = [
					{product: "phone", shop: "Madiba"}
					];

	assert.deepEqual(result, expected)

});

QUnit.test("Testing write_to_file function", function(assert){

	var purchase_history = [
							{shop: "Maglasana", stock_item: "8.1", sold_no: 45},
							{shop: "Nokulunga", stock_item: "black", sold_no:5},		
							{shop: "Madiba", stock_item: "phone", sold_no: 80},
							{shop: "Nolitha", stock_item: "windows", sold_no:15}
							];
	//async call starting						
	stop();

	spaza_2.write_to_file(purchase_history, "purchase_history_write_testing.json", function(){

		var expected = [
						{shop: "Maglasana", stock_item: "8.1", sold_no: 45},
						{shop: "Nokulunga", stock_item: "black", sold_no:5},		
						{shop: "Madiba", stock_item: "phone", sold_no: 80},
						{shop: "Nolitha", stock_item: "windows", sold_no:15}
						];

		var fs = require('fs');
		
		var result = require("./purchase_history_write_testing.json");
		assert.deepEqual(result, expected);

		//async call ends
		start();

	});

});