module.exports = {

	print_logo: function (name, callback) {
		var logo = require('figlet');

		logo(name, function(err, data){
			if(err)
				throw err;

			process.stdout.write(data + "\n");

			if(callback)
				callback();
		});
	},

	bubbleSort: function (array) {

		var array1 = array;

		for(var i = 0; i < array1.length; i++){
			for (var k = 0; k < array1.length-1; k++) {
				if(array1[k] < array1[k+1]){
					var temp = array1[k];
					array1[k] = array1[k+1];
					array1[k+1] = temp;
				}
			};
		};
		return array1;
	},

	get_popular_products: function  (sales_history) {
		//Answering the question 'How much of each item has been sold?' starts here
		var inventory = {},
			inventory_sold = [];

		sales_history.forEach(function(row){

			if(inventory[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				inventory[row["stock_item"]] = Number(row["no_sold_items"]);
			}
			else if(row["stock_item"] !== "stock item"){
				inventory[row["stock_item"]] += Number(row["no_sold_items"]);
			}

		});

		inventory_sold = Object.keys(inventory).map(function(key){
				return {
					product: key,
					sold_no: inventory[key]
				}
		})

		return inventory_sold.sort(function(b, a){
			return Number(a["sold_no"]) - Number(b["sold_no"]);
		});
	},

	get_sales_history: function (filename) {

		var fs = require('fs');
		var buffer = fs.readFileSync(filename);
		var list = buffer.toString().replace(/,/gi, '.');
		list = list.replace(/\r/gi, '\n')
		var sales_history_rows = list.split('\n');

		var sales_history = sales_history_rows.map(function(row){
		
			var fields = row.split(";");

			return {
				day: fields[0],
				date: fields[1],
				stock_item: fields[2],
				no_sold_items: fields[3],
				sales_price: fields[4]
			}

		});

		return sales_history
	},

	popular_products_over_days: function (filename, spaza_inventory, start_date, end_date) {

		var sales_history = this.get_sales_history(filename);

		var inventory_sold = [];
		var track_date = 0;

		var sold = 0, i = 0;
	
		spaza_inventory.forEach(function (item) {

			sales_history.forEach(function (item_history) {
				if(item_history["date"] === start_date){
					i = 1;
					//console.log(item_history["date"]);
				}

				if(i === 1){
					if (item === item_history["stock_item"] && end_date !== item_history["date"]){
						sold += Number(item_history["no_sold_items"]);
						console.log(item_history["date"]);
					}
				}
			});

			console.log(sold);
			sold = 0;
		});
	},


	get_selling_items: function (sales_history) { //This gets the items sold at the spaza shop

		var spaza_inventory = [],
			spaza_inv = {};

		sales_history.forEach(function(row){

			if(spaza_inv[row["stock_item"]] == undefined && row["stock_item"] !== "stock item"){
				spaza_inv[row["stock_item"]] = 0;
			}

		});

		spaza_inventory = Object.keys(spaza_inv).map(function(key){
			return {
				product: key
			}
		});
	
		return spaza_inventory;
	},

	get_popular_category: function(popular_items_list){

		var junk_food = 0,
			veg_and_carbs = 0,
			fruit = 0,
			dairy = 0,
			not_edible = 0;

		popular_items_list.forEach(function(item, i){
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food += Number(item["sold_no"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Top Class Soy Mince":
				case "Bread":
					veg_and_carbs += Number(item["sold_no"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit += Number(item["sold_no"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy += Number(item["sold_no"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible += Number(item["sold_no"]);
				break;
			};
		});

		//console.log([junk_food, veg_and_carbs, fruit, dairy, not_edible])
		
		var categories = [
						{category: "junk_food", sold_no: junk_food},
						{category: "veg_and_carbs", sold_no: veg_and_carbs},
						{category: "fruit", sold_no:fruit},
						{category: "dairy", sold_no: dairy},
						{category: "not_edible", sold_no: not_edible}
						];

		categories.sort(function(a, b){
			return Number(b["sold_no"]) - Number(a["sold_no"])
		});

		return categories;
	},

	get_regular_sales: function(sales_history_list){

		var regulariry = [],
			frequency = {};

		sales_history_list.forEach(function(row){

			if(frequency[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				if(Number(row["no_sold_items"]) > 0){

					frequency[row["stock_item"]] = 1
				}
				else{

					frequency[row["stock_item"]] = 0
				}
			}
			else{
				if(Number(row["no_sold_items"]) > 0){
					++frequency[row["stock_item"]];
				}
			}

		});

		regulariry = Object.keys(frequency).map(function(key){
			return {
				product: key,
				frequency: frequency[key]
			}
		});

		return regulariry.sort(function(a, b){
			return b["frequency"] - a["frequency"];
		});
	},

	get_purchase_history: function(filename){
		var fs = require('fs');
		var buffer = fs.readFileSync(filename);
		var list = buffer.toString().replace(/,/gi, '.');
		list = list.replace(/\r/gi, '\n');
		var purchase_history_rows = list.split('\n');
		//console.log(purchase_history_rows)
		var purchase_history = purchase_history_rows.map(function(row){
		
			var fields = row.split(";");

			return {
				shop: fields[0],
				date: fields[1],
				stock_item: fields[2],
				quantity: fields[3],
				cost: fields[4],
				total_cost: fields[5]
			}
		});

		return purchase_history;
	},

	get_entire_stock: function(purchase_history){

		var stock_levels = [],
			stock = {};

		purchase_history.forEach(function (row) {
			
			if(stock[row["stock_item"]] === undefined && row["stock_item"] !== "Item"){
				stock[row["stock_item"]] = Number(row["quantity"])
			}
			else if(row["stock_item"] !== "Item"){
				stock[row["stock_item"]] += Number(row["quantity"])	
			}

		});

		stock_levels = Object.keys(stock).map(function(key){
			return {
				product: key,
				quantity: stock[key]
			}
		})

		return stock_levels.sort(function(a, b){
			return Number(b["quantity"]) - Number(a["quantity"]);
		});
	},

	get_stock_rates: function(entire_stock, popular_products){

		var stock_rates = [],
			popular = {},
			ground = {};

		entire_stock.forEach(function(row){
			if(ground[row["product"]] === undefined){
				ground[row["product"]] = row["quantity"]
			}
			else{
				ground[row["product"]] += row["quantity"]
			}
		})

		popular_products.forEach(function(row){
			if(popular[row["product"]] === undefined){
				popular[row["product"]] = row["sold_no"]
			}
			else{
				popular[row["product"]] += row["sold_no"]
			}
		})

		for(var key in ground){
			ground[key] = Math.ceil(((ground[key] - popular[key])/ground[key])*100)
		}

		stock_rates = Object.keys(ground).map(function(per){
			return {
				product: per,
				percent_left: ground[per]
			}
		})

		return stock_rates.sort(function(a, b){
			if((a["percent_left"] - b["percent_left"]) < 0)
				return -1;
			else
				return 1;
		});
	},

	get_product_earnings: function(sales_history_list, popular_products){

		var product_earnings = [],
			earns = {};


		sales_history_list.forEach(function(row){

			if(earns[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				earns[row["stock_item"]] = Number(row["no_sold_items"]) * Number(row["sales_price"].substr(1))
			}
			else if(row["stock_item"] !== "stock item"){
				earns[row["stock_item"]] += Number(row["no_sold_items"]) * Number(row["sales_price"].substr(1))
			}
		})
		
		product_earnings = Object.keys(earns).map(function(key){
			return {
				product: key,
				earnings: earns[key]
			}
		})

		return product_earnings.sort(function(a, b){
			if(b["earnings"] - a["earnings"] > 0)
				return 1;
			else
				return -1;
		});
	},

	get_category_earnings: function(product_earnings_list){

		var junk_food_earnings = 0,
			veg_and_carbs_earnings = 0,
			fruit_earnings = 0,
			dairy_earnings = 0,
			not_edible_earnings = 0;

		product_earnings_list.forEach(function(item, i){
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Top Class Soy Mince":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food_earnings += Number(item["earnings"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Bread":
					veg_and_carbs_earnings += Number(item["earnings"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit_earnings += Number(item["earnings"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy_earnings += Number(item["earnings"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible_earnings += Number(item["earnings"]);
				break;
			};
		});

		var categories_earnings = [
						{category: "junk_food", earnings: junk_food_earnings.toFixed(2)},
						{category: "veg_and_carbs", earnings: veg_and_carbs_earnings.toFixed(2)},
						{category: "fruit", earnings:fruit_earnings.toFixed(2)},
						{category: "dairy", earnings: dairy_earnings.toFixed(2)},
						{category: "not_edible", earnings: not_edible_earnings.toFixed(2)}
						];

		categories_earnings.sort(function(a, b){
			return Number(b["earnings"]) - Number(a["earnings"]);
		});

		return categories_earnings;
	},

	get_product_price_and_cost:function(selling_items, sales_history, purchase_history){

		var price_cost = [],
			product_cost = {}
			product_price = {};

		sales_history.forEach(function(row){
			if(product_price[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				product_price[row["stock_item"]] = Number(row["sales_price"].substr(1))
			}
		})

		purchase_history.forEach(function(row){
			if(product_cost[row["stock_item"]] === undefined && row["stock_item"] !== "Item"){
				product_cost[row["stock_item"]] = Number(row["cost"].substr(1))
			}
		})

		price_cost = Object.keys(product_cost).map(function(key){
				return {
					product: key,
					price: product_price[key],
					cost: product_cost[key]
				}
		})

		return price_cost;
	},

	get_product_profits: function(price_cost, popular_products){
		var gains = [],
			ground_profit_obj = {},
			popular_products_obj = {};

		popular_products.forEach(function(item){
			if(popular_products_obj[item["product"]] === undefined){
				popular_products_obj[item["product"]] = item["sold_no"]
			}
		});

		price_cost.forEach(function(item){
			if(ground_profit_obj[item["product"]] === undefined){
				ground_profit_obj[item["product"]] = item["price"] - item["cost"]
			}
		});

		gains = Object.keys(ground_profit_obj).map(function(key){
			return {
				product: key,
				profits: ground_profit_obj[key]*popular_products_obj[key]
			}
		})


		return gains.sort(function(a, b){
			return b["profits"] - a["profits"];
		});
	},

	get_category_profits: function(product_profits){

		var junk_food_profits = 0,
			veg_and_carbs_profits = 0,
			fruit_profits = 0,
			dairy_profits = 0,
			not_edible_profits = 0;

		product_profits.forEach(function(item){
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Top Class Soy Mince":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food_profits += Number(item["profits"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Bread":
					veg_and_carbs_profits += Number(item["profits"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit_profits += Number(item["profits"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy_profits += Number(item["profits"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible_profits += Number(item["profits"]);
				break;
			};
		});

		var categories_profits = [
						{category: "junk_food", profits: junk_food_profits.toFixed(2)},
						{category: "veg_and_carbs", profits: veg_and_carbs_profits.toFixed(2)},
						{category: "fruit", profits:fruit_profits.toFixed(2)},
						{category: "dairy", profits: dairy_profits.toFixed(2)},
						{category: "not_edible", profits: not_edible_profits.toFixed(2)}
						];

		categories_profits.sort(function(a, b){
			return Number(b["profits"]) - Number(a["profits"])
		});

		return categories_profits;
	},

	print: function(array_object){
		//var keys = [];

		array_object.forEach(function(item){
			for(var key in item)
				process.stdout.write(item[key] + "   ");
			console.log()
		});
		console.log();
	}
};
