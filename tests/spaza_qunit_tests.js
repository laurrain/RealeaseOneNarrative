var mymodule = require("../spaza_shop_functions");
var mymodule_2 = require("../spaza_shop_functions_2.js")

QUnit.test("Testing bubbleSort function", function(assert){

	var value = [1, 5, 7, 3, 6, 4, 8, 9, 0, 2],
		expected = [9,8,7,6,5,4,3,2,1,0],
		result = mymodule.bubbleSort(value);

	for(var i = 0; i < expected.length; i++){
		assert.deepEqual(result[i], expected[i], "Match");
	}
		
});

QUnit.test("Testing get_popular_products function", function(assert){

	var selling_items = [
						{product: "windows"},
						{product: "phone"},
						{product: "black"},
						{product: "8.1"}
						];

	var sales_history = [
						{stock_item: "windows", no_sold_items: 15},
						{stock_item: "phone", no_sold_items:80},
						{stock_item: "black", no_sold_items: 5},
						{stock_item: "8.1", no_sold_items:45}
						];

	var expected = [
					{product: "phone", sold_no: 80},
					{product: "8.1", sold_no: 45},
					{product: "windows", sold_no:15},
					{product: "black", sold_no:5}
					];

	var result = mymodule.get_popular_products(selling_items, sales_history);

	for(var i = 0; i < expected.length; i++){
		assert.deepEqual(result[i]["product"], expected[i]["product"], "Match")
		assert.deepEqual(result[i]["sold_no"], expected[i]["sold_no"], "Match")

	}
});

QUnit.test("Testing get_sales_history function", function(assert){

	var expected = [
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					{day:"Day", date:"Date", stock_item: "stock item", no_sold_items: "No sold", sales_price: "Sales Price"},
					];

	var result = mymodule.get_sales_history("tests/get_sales_history_test.csv");

	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){
			assert.deepEqual(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("testing get_selling_items function", function(assert){
	var expected = [
					{product: "stock item1"},
					{product: "stock item2"},
					{product: "stock item3"},
					{product: "stock item4"},
					{product: "stock item5"},
					{product: "stock item6"},
					{product: "stock item7"},
					{product: "stock item8"}
					];
	var result = mymodule.get_selling_items("tests/get_selling_items_test.csv")

 	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){
			assert.deepEqual(result[i][key], expected[i][key], "Match!");
		}
	}

});
QUnit.test("Testing get_popular_category function", function(assert){
	var expected = [{category: "junk_food", sold_no: 548}, 
		            {category: "veg_and_carbs", sold_no: 216},
		            {category: "dairy", sold_no: 75},
		            {category: "fruit", sold_no:55},
		            {category: "not_edible", sold_no: 50}
			];



	var popular_item = [
					{product:"Mixed Sweets 5s",sold_no: 123},
				    {product:"Top Class Soy Mince", sold_no: 109},
				    {product:"Bread", sold_no: 100},
					{product:"Fanta 500ml", sold_no: 98},
				    {product:"Cream Soda 500ml", sold_no:78},
				    {product:"Heart Chocolates", sold_no:75},
				    {product:"Coke 500ml", sold_no:65},
					{product:"Chakalaka Can", sold_no: 62},
				    {product:"Gold Dish Vegetable Curry Can", sold_no: 54},
				    {product: "Milk 1l", sold_no: 40},
				    {product: "Imasi", sold_no: 35},
				    {product:"Bananas - loose", sold_no: 30},
				    {product: "Apples - loose", sold_no: 25},
				    {product:  "Soap Bar", sold_no: 22},
				    {product: "Shampoo 1 litre", sold_no: 15},
				    {product: "Rose (Plastic)", sold_no: 10},
				    {product: "Valentines Cards", sold_no: 3}
                	];

    result = mymodule.get_popular_category(popular_item);


	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){
			assert.deepEqual(result[i][key], expected[i][key], "Match!");
		}
	}
});


QUnit.test("Testing get_regular_sales function", function(assert){

	var sales_history = [
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "10", sales_price: "Sales Price"},
					{day1:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "10", sales_price: "Sales Price"},
					{day2:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "1", sales_price: "Sales Price"},
					{day2:"Day", date:"Date", stock_item: "stock item3", no_sold_items: "01", sales_price: "Sales Price"},
					{day3:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "30", sales_price: "Sales Price"},
					{day3:"Day", date:"Date", stock_item: "stock item5", no_sold_items: "40", sales_price: "Sales Price"},
					{day4:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "0", sales_price: "Sales Price"},
					{day4:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "0", sales_price: "Sales Price"},
					{day11:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "30", sales_price: "Sales Price"},
					{day11:"Day", date:"Date", stock_item: "stock item3", no_sold_items: "40", sales_price: "Sales Price"},
					{day21:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "40", sales_price: "Sales Price"},
					{day21:"Day", date:"Date", stock_item: "stock item5", no_sold_items: "0", sales_price: "Sales Price"},
					{day31:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "2", sales_price: "Sales Price"},
					{day31:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "0", sales_price: "Sales Price"},
					{day41:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "20", sales_price: "Sales Price"},
					{day41:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "20", sales_price: "Sales Price"},
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "10", sales_price: "Sales Price"},
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "10", sales_price: "Sales Price"},
					{day1:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "10", sales_price: "Sales Price"},
					];

	var selling_items = [
						{product: "stock item1"},
						{product: "stock item2"},
						{product: "stock item3"},
						{product: "stock item4"},
						{product: "stock item5"},
						];

	var expected = [
					{product: "stock item1", frequency: 5},
					{product: "stock item2", frequency: 4},
					{product: "stock item4", frequency: 3},
					{product: "stock item3", frequency: 2},
					{product: "stock item5", frequency: 1}
					];

	var result = mymodule.get_regular_sales(sales_history, selling_items);

	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){
			assert.deepEqual(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("Testing get_purchase_history function", function(assert){

	var expected = [
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item6", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item7", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item8", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item9", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item6", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item7", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item8", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item9", quantity: "Quantity", cost: "Cost", total_cost: "Total Cost"}
					];

	var result = mymodule.get_purchase_history("tests/get_purchase_history_test.csv");


	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){

			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});

QUnit.test("Testing get_entire_stock function", function(assert){

	var purchase_history = [
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "10", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "20", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "30", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "40", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "50", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item6", quantity: "60", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item7", quantity: "70", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item8", quantity: "80", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item9", quantity: "90", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "10", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "20", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "30", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "40", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "50", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item6", quantity: "60", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item7", quantity: "70", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item8", quantity: "80", cost: "Cost", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item9", quantity: "90", cost: "Cost", total_cost: "Total Cost"}
					];

	var selling_items = [
						{product: "Item1"},
						{product: "Item2"},
						{product: "Item3"},
						{product: "Item4"},
						{product: "Item5"},
						{product: "Item6"},
						{product: "Item7"},
						{product: "Item8"},
						{product: "Item9"}
						];

	var result = mymodule.get_entire_stock(selling_items, purchase_history);

	var expected = [
						{product: "Item9", quantity: 180},
						{product: "Item8", quantity: 160},
						{product: "Item7", quantity: 140},
						{product: "Item6", quantity: 120},
						{product: "Item5", quantity: 100},
						{product: "Item4", quantity: 80},
						{product: "Item3", quantity: 60},
						{product: "Item2", quantity: 40},
						{product: "Item1", quantity: 20}
						];

	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){

			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});

QUnit.test("Testing get_stock_rates function", function(assert){

	var entire_stock = [
						{product: "Item9", quantity: 180},
						{product: "Item8", quantity: 160},
						{product: "Item7", quantity: 140},
						{product: "Item6", quantity: 120},
						{product: "Item5", quantity: 100},
						{product: "Item4", quantity: 80},
						{product: "Item3", quantity: 60},
						{product: "Item2", quantity: 40},
						{product: "Item1", quantity: 20}
						];

	var popular_products = [
							{product: "Item9", sold_no: 95},
							{product: "Item8", sold_no: 85},
							{product: "Item7", sold_no: 75},
							{product: "Item6", sold_no: 65},
							{product: "Item5", sold_no: 55},
							{product: "Item4", sold_no: 45},
							{product: "Item3", sold_no: 35},
							{product: "Item2", sold_no: 25},
							{product: "Item1", sold_no: 15}
							];

	var result = mymodule.get_stock_rates(entire_stock, popular_products);

	var expected = [
					{product: "Item1", percent_left: 25.00},
					{product: "Item2", percent_left: 38.00},
					{product: "Item3", percent_left: 42.00},
					{product: "Item4", percent_left: 44.00},
					{product: "Item5", percent_left: 45.00},
					{product: "Item6", percent_left: 46.00},
					{product: "Item7", percent_left: 46.00},
					{product: "Item8", percent_left: 47.00},
					{product: "Item9", percent_left: 47.00},
										
					];


	for(var i = 0; i < result.length; i++){
		for(var key in result[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("Testing get_product_earnings function", function(assert){

	var sales_history = [
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "5", sales_price: "R10.00"},
					{day1:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "4", sales_price: "R10.00"},
					{day2:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "4", sales_price: "R10.00"},
					{day2:"Day", date:"Date", stock_item: "stock item3", no_sold_items: "1", sales_price: "R10.00"},
					{day3:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "30", sales_price: "R10.00"},
					{day3:"Day", date:"Date", stock_item: "stock item5", no_sold_items: "40", sales_price: "R10.00"},
					{day4:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "0", sales_price: "R10.00"},
					{day4:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "4", sales_price: "R10.00"},
					{day11:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "30", sales_price: "R10.00"},
					{day11:"Day", date:"Date", stock_item: "stock item3", no_sold_items: "34", sales_price: "R10.00"},
					{day21:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "40", sales_price: "R10.00"},
					{day21:"Day", date:"Date", stock_item: "stock item5", no_sold_items: "15", sales_price: "R10.00"},
					{day31:"Day", date:"Date", stock_item: "stock item4", no_sold_items: "5", sales_price: "R10.00"},
					{day31:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "4", sales_price: "R10.00"},
					{day41:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "20", sales_price: "R10.00"},
					{day41:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "4", sales_price: "R10.00"},
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "5", sales_price: "R10.00"},
					{day1:"Day", date:"Date", stock_item: "stock item1", no_sold_items: "5", sales_price: "R10.00"},
					{day1:"Day", date:"Date", stock_item: "stock item2", no_sold_items: "5", sales_price: "R10.00"},
					];

	var popular_products = [
							{product: "stock item5", sold_no: 55},
							{product: "stock item4", sold_no: 45},
							{product: "stock item3", sold_no: 35},
							{product: "stock item2", sold_no: 25},
							{product: "stock item1", sold_no: 15}
							];

	var result = mymodule.get_product_earnings(sales_history, popular_products);

	var expected = [
					{product: "stock item5", earnings: 550},
					{product: "stock item4", earnings: 450},
					{product: "stock item3", earnings: 350},
					{product: "stock item2", earnings: 250},
					{product: "stock item1", earnings: 150}
					];

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("Testing get_category_earnings function", function(assert){

	var product_earnings = [
						{product:"Mixed Sweets 5s",earnings: 123},
				    	{product:"Top Class Soy Mince", earnings: 109},
				    	{product:"Bread", earnings: 100},
						{product:"Fanta 500ml", earnings: 98},
				    	{product:"Cream Soda 500ml", earnings:78},
				    	{product:"Heart Chocolates", earnings:75},
				    	{product:"Coke 500ml", earnings:65},
						{product:"Chakalaka Can", earnings: 62},
				    	{product:"Gold Dish Vegetable Curry Can", earnings: 54},
				    	{product: "Milk 1l", earnings: 40},
				    	{product: "Imasi", earnings: 35},
				    	{product:"Bananas - loose", earnings: 30},
				    	{product: "Apples - loose", earnings: 25},
				    	{product:  "Soap Bar", earnings: 22},
				    	{product: "Shampoo 1 litre", earnings: 15},
				    	{product: "Rose (Plastic)", earnings: 10},
				    	{product: "Valentines Cards", earnings: 3}
                	];

	var result = mymodule.get_category_earnings(product_earnings);

	var expected = [
					{category: "junk_food", earnings: 548}, 
		            {category: "veg_and_carbs", earnings: 216},
		            {category: "dairy", earnings: 75},
		            {category: "fruit", earnings:55},
		            {category: "not_edible", earnings: 50}
					];

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});

QUnit.test("Testing get_product_price_and_cost function", function(assert){

	var sales_history = [
					{day1:"Day", date:"Date", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day1:"Day", date:"Date", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day2:"Day", date:"Date", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day2:"Day", date:"Date", stock_item: "Item3", no_sold_items: "1", sales_price: "R20.00"},
					{day3:"Day", date:"Date", stock_item: "Item4", no_sold_items: "30", sales_price: "R20.00"},
					{day3:"Day", date:"Date", stock_item: "Item5", no_sold_items: "40", sales_price: "R20.00"},
					{day4:"Day", date:"Date", stock_item: "Item1", no_sold_items: "0", sales_price: "R20.00"},
					{day4:"Day", date:"Date", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day11:"Day", date:"Date", stock_item: "Item1", no_sold_items: "30", sales_price: "R20.00"},
					{day11:"Day", date:"Date", stock_item: "Item3", no_sold_items: "34", sales_price: "R20.00"},
					{day21:"Day", date:"Date", stock_item: "Item4", no_sold_items: "40", sales_price: "R20.00"},
					{day21:"Day", date:"Date", stock_item: "Item5", no_sold_items: "15", sales_price: "R20.00"},
					{day31:"Day", date:"Date", stock_item: "Item4", no_sold_items: "5", sales_price: "R20.00"},
					{day31:"Day", date:"Date", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day41:"Day", date:"Date", stock_item: "Item1", no_sold_items: "20", sales_price: "R20.00"},
					{day41:"Day", date:"Date", stock_item: "Item2", no_sold_items: "4", sales_price: "R20.00"},
					{day1:"Day", date:"Date", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day1:"Day", date:"Date", stock_item: "Item1", no_sold_items: "5", sales_price: "R20.00"},
					{day1:"Day", date:"Date", stock_item: "Item2", no_sold_items: "5", sales_price: "R20.00"},
					];

	var purchase_history = [
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "10", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "20", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "30", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "40", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "50", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "60", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "70", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "80", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "90", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "10", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item5", quantity: "20", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item4", quantity: "30", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "40", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "50", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "60", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item1", quantity: "70", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item2", quantity: "80", cost: "R10.00", total_cost: "Total Cost"},
					{shop: "Shop", date: "Date", stock_item: "Item3", quantity: "90", cost: "R10.00", total_cost: "Total Cost"}
					];

	var selling_items = [
						{product: "Item1"},
						{product: "Item2"},
						{product: "Item3"},
						{product: "Item4"},
						{product: "Item5"}
						];

	var result = mymodule.get_product_price_and_cost(selling_items, sales_history, purchase_history);

	var expected = [
					{product: "Item1", price: 20, cost: 10},
					{product: "Item2", price: 20, cost: 10},
					{product: "Item3", price: 20, cost: 10},
					{product: "Item4", price: 20, cost: 10},
					{product: "Item5", price: 20, cost: 10}
					];

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("Testing get_product_profits function", function(assert){

	var price_cost = [
					{product: "Item1", price: 20, cost: 10},
					{product: "Item2", price: 20, cost: 10},
					{product: "Item3", price: 20, cost: 10},
					{product: "Item4", price: 20, cost: 10},
					{product: "Item5", price: 20, cost: 10}
					];

	var popular_products = [
							{product: "Item5", sold_no: 55},
							{product: "Item4", sold_no: 45},
							{product: "Item3", sold_no: 35},
							{product: "Item2", sold_no: 25},
							{product: "Item1", sold_no: 15}
							];

	var result = mymodule.get_product_profits(price_cost, popular_products);

	var expected = [
					{product: "Item5", profits: 550},
					{product: "Item4", profits: 450},
					{product: "Item3", profits: 350},
					{product: "Item2", profits: 250},
					{product: "Item1", profits: 150}
					];

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}
});

QUnit.test("Testing get_total_avg_day_week_sales", function(assert){

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

	var expected = [
					{time: "day_avg", avg: 587.00},
					{time: "week_avg", avg: 1760.00}
					];

	var result = mymodule_2.get_total_avg_day_week_sales(sales_history);

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}
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

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});

QUnit.test("Testing get_avg_cat_dayWeek_sales", function(assert){

	var expected = [
					{category: "junk_food", day_avg: 1620}, 
		            {category: "dairy", day_avg: 1480},
		            {category: "veg_and_carbs", day_avg: 840},
		            {category: "not_edible", day_avg: 680},
		            {category: "fruit", day_avg:400}
		            ];

    var sales_history = [
					{day1:"Day", date:"Date", stock_item: "Mixed Sweets 5s", no_sold_items: "5", sales_price: "R20.00"},
					{day1:"Day", date:"Date", stock_item: "Top Class Soy Mince", no_sold_items: "4", sales_price: "R20.00"},
					{day2:"Day", date:"Date", stock_item: "Bread", no_sold_items: "4", sales_price: "R20.00"},
					{day2:"Day", date:"Date", stock_item: "Fanta 500ml", no_sold_items: "1", sales_price: "R20.00"},
					{day3:"Day", date:"Date", stock_item: "Cream Soda 500ml", no_sold_items: "30", sales_price: "R20.00"},
					{day3:"Day", date:"Date", stock_item: "Heart Chocolates", no_sold_items: "40", sales_price: "R20.00"},
					{day4:"Day", date:"Date", stock_item: "Coke 500ml", no_sold_items: "0", sales_price: "R20.00"},
					{day4:"Day", date:"Date", stock_item: "Chakalaka Can", no_sold_items: "4", sales_price: "R20.00"},
					{day11:"Day", date:"Date", stock_item: "Gold Dish Vegetable Curry Can", no_sold_items: "30", sales_price: "R20.00"},
					{day11:"Day", date:"Date", stock_item: "Milk 1l", no_sold_items: "34", sales_price: "R20.00"},
					{day21:"Day", date:"Date", stock_item: "Imasi", no_sold_items: "40", sales_price: "R20.00"},
					{day21:"Day", date:"Date", stock_item: "Bananas - loose", no_sold_items: "15", sales_price: "R20.00"},
					{day31:"Day", date:"Date", stock_item: "Apples - loose", no_sold_items: "5", sales_price: "R20.00"},
					{day31:"Day", date:"Date", stock_item: "Soap Bar", no_sold_items: "4", sales_price: "R20.00"},
					{day41:"Day", date:"Date", stock_item: "Shampoo 1 litre", no_sold_items: "20", sales_price: "R20.00"},
					{day44:"Day", date:"Date", stock_item: "Rose (Plastic)", no_sold_items: "4", sales_price: "R20.00"},
					{day15:"Day", date:"Date", stock_item: "Valentines Cards", no_sold_items: "5", sales_price: "R20.00"},
					{day14:"Day", date:"Date", stock_item: "Mixed Sweets 5s", no_sold_items: "5", sales_price: "R20.00"},
					{day16:"Day", date:"Date", stock_item: "Shampoo 1 litre", no_sold_items: "5", sales_price: "R20.00"},
					];

    var result = mymodule_2.get_avg_cat_dayWeek_sales(sales_history);

    for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});

QUnit.test("Testing get_categories function", function(assert){

	var expected = [
						{junk_food: [
									"Mixed Sweets 5s", 
									"Top Class Soy Mince", 
									"Fanta 500ml", 
									"Cream Soda 500ml", 
									"Heart Chocolates",
									"Coke 500ml"]},

						{not_edible: [
									"Soap Bar",
									"Shampoo 1 litre",
									"Rose (Plastic)",
									"Valentines Cards"
									]
						},
						{fruit: [
								"Bananas - loose",
								"Apples - loose"]
						},
						{dairy: [
								"Milk 1l",
								"Imasi"]
						}
					];

	var selling_items = [
						{product:"Mixed Sweets 5s"},
				    	{product:"Top Class Soy Mince"},
				    	{product:"Bread"},
						{product:"Fanta 500ml"},
				    	{product:"Cream Soda 500ml"},
				    	{product:"Heart Chocolates"},
				    	{product:"Coke 500ml"},
						{product:"Chakalaka Can"},
				    	{product:"Gold Dish Vegetable Curry Can"},
				    	{product: "Milk 1l"},
				    	{product: "Imasi"},
				    	{product:"Bananas - loose"},
				    	{product: "Apples - loose"},
				    	{product:  "Soap Bar"},
				    	{product: "Shampoo 1 litre"},
				    	{product: "Rose (Plastic)"},
				    	{product: "Valentines Cards"}
				    	]

	var result = mymodule_2.get_categories(selling_items);

	for(var i = 0; i < expected.length; i++){
		for(var key in expected[i]){
			assert.equal(result[i][key], expected[i][key], "Match!");
		}
	}

});