var mymodule = require("./spaza_shop_functions.js");
var sales_history = mymodule.get_sales_history("Nelisa Sales History.csv");


var fs = require('fs');

QUnit.test("Testing the get_sales_history function", function(assert){

	var data = null, data_1 = null;
	fs.readFile("Nelisa Sales History.csv", function(err,buff){
		if(err) throw err;

		data_1 = buff.toString().split("\n");
		
	});

	data = data_1.map(function(item){
			var f1 = item.split(';');

			return f1[2];
		});
	
	data.forEach(function(item, i){
			assert.equal(item, sales_history[i]["stock_item"], "Match");
		});
});

var inventory = mymodule.selling_items("Nelisa Sales History.csv");

var popular_products = mymodule.popular_products(inventory, sales_history);

QUnit.test("Testing popular_products function", function(assert){

	//console.log(popular_products);

	/*var myobject = [{item: "Milk", sold_no: 10},
					{item: "Nuts", sold_no: 1},
					{item: "Raisons", sold_no: 5},
					{item: "Book", sold_no: 7}
					];*/
	popular_products.forEach(function(item, i){
			if(i < popular_products.length-1)
				assert.ok(Number(item["sold_no"]) >= Number(popular_products[i+1]["sold_no"]), "They seem to be descending!");
	});
});