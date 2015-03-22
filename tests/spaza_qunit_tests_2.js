var spaza_2 = require("../spaza_shop_functions_2")

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

	expected.forEach(function(spec, i){
		for(var day in spec){
			assert.equal(result[i][day], spec[day], "The day sales match")
		}
	});
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

	expected.forEach(function(spec, i){
		for(var day in spec){
			assert.equal(result[i][day], spec[day], "The day sales match")
		}
	});
});