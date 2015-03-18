var mymodule = require("../spaza_shop_functions");

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
