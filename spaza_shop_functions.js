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

	write_to_file: function (filename, data, data_nummer) {

		var file_ops = require('fs');

		if(data_nummer === null || data_nummer === 1){ 
			file_ops.writeFile(filename, "", function(err){
				if(err) throw err;
			});

			console.log('');
			data.forEach(function(item){
				file_ops.appendFile(filename, item + '\n', function(err){
					if(err) throw err;

				});
			});
		}
	
		else{
			console.log('');
			file_ops.writeFileSync(filename, "");
			
			data.forEach(function(item){
				file_ops.appendFile(filename, item["product"] + ';'+ item["sold_no"] + '\n', function(err){
					if (err) throw err;
					//console.log(item["product"] + '  '+ item["sold_no"]);
				});		
			});
			console.log("\n");
		}
		console.log("Wrote to file: " + filename + "\n\n");
	},


	get_popular_products: function  (selling_items, sales_history) {
		//Answering the question 'How much of each item has been sold?' starts here
		var inventory_sold = [];

		selling_items.forEach(function (item) {
			var sold = 0;
			sales_history.forEach(function(row){
				if(item["product"] === row['stock_item']){
					sold += Number(row['no_sold_items']);
				}
			});

			inventory_sold.push({product: item["product"], sold_no: sold});

		});

		return inventory_sold.sort(function(b, a){
			return Number(a["sold_no"]) - Number(b["sold_no"]);
		});
		//this.bubbleSort(inventory_sold);
		//this.write_to_file("Selling Items (Sorted by Number sold).csv", inventory_sold, 2);
	},

	get_sales_history: function (filename) {

		var fs = require('fs');
		var buffer = fs.readFileSync(filename);
		var list = buffer.toString().replace(/,/gi, '.');
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

		//console.log(inventory_sold);

		//bubbleSort(inventory_sold);
		//write_to_file("Testing.csv", inventory_sold, 2);
	},


	get_selling_items: function (filename) { //This gets the items sold at the spaza shop

		var sales_history = this.get_sales_history(filename);

		var spaza_inventory = [];

		sales_history.forEach(function(row){

			var i = 0;

			spaza_inventory.forEach(function(item){
				if(item["product"] === row['stock_item']){
					++i;
				}
			
			});

			if(i === 0 && row['stock_item'] !== 'stock item'){
				spaza_inventory.push({product: row['stock_item']});
			}

		});	//Getting the inventory ends here
		//write_to_file("Selling Items.csv", spaza_inventory, 1);
	
		return spaza_inventory;
		//this.popular_products(spaza_inventory, sales_history);

		//this.popular_products_over_days(filename, spaza_inventory, "12-Feb", "16-Feb");
	},

	get_popular_category: function(popular_items_list){

		var junk_food = 0,
			veg_and_carbs = 0,
			fruit = 0,
			dairy = 0,
			not_edible = 0;

		popular_items_list.forEach(function(item, i){
			//console.log(item, " - ", i);
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Top Class Soy Mince":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food += Number(item["sold_no"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
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

	get_regular_sales: function(sales_history_list, selling_items){

		var regulariry = [];
		selling_items.forEach(function(sellin){

			var starter = 0;

			sales_history_list.forEach(function(item){
				if(sellin["product"] === item["stock_item"]){
					if(Number(item["no_sold_items"]) > 0){
						starter++;
					}
				}
			});

			regulariry.push({product: sellin["product"], frequency: starter});

		});
		return regulariry.sort(function(a, b){
			return b["frequency"] - a["frequency"];
		});
	},

	get_purchase_history: function(filename){
		var fs = require('fs');
		var buffer = fs.readFileSync(filename);
		var list = buffer.toString().replace(/,/gi, '.');
		var purchase_history_rows = list.split('\r');

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

	get_entire_stock: function(selling_items, purchase_history){

		var stock_levels = [];

		selling_items.forEach(function (item) {
			var bought = 0;
			purchase_history.forEach(function(row){
				if(item["product"] === row['stock_item']){
					bought += Number(row['quantity']);
				}
			});

			stock_levels.push({product: item["product"], quantity: bought});

		});

		return stock_levels.sort(function(a, b){
			return Number(b["quantity"]) - Number(a["quantity"]);
		});
	},

	get_stock_rates: function(entire_stock, popular_products){

		var stock_rates = [];

		popular_products.forEach(function(item){
			var inventory_left = 0;
			var percent = 0;
			entire_stock.forEach(function(stock_item){
				if(item["product"] === stock_item["product"]){
					inventory_left += Number(stock_item["quantity"]) - Number(item["sold_no"]);
					percent += Math.round((inventory_left/Number(stock_item["quantity"]))*100);
				}
			});
			stock_rates.push({product: item["product"], /*remaining_stock: inventory_left,*/ percent_left: percent.toFixed(2)});
		});

		return stock_rates.sort(function(a, b){
			return a["percent_left"] - b["percent_left"];
		});
	},

	get_product_earnings: function(sales_history_list, popular_products){

		var product_earnings = [];

		popular_products.forEach(function(item){

			var earning = 0;
			var found = 0;

			sales_history_list.forEach(function(product){
				if(item["product"] === product["stock_item"]){
					found++;
					//console.log(Number(product["sales_price"].substr(1, product["sales_price"].length)));
					earning = Number(product["sales_price"].substr(1, product["sales_price"].length))*Number(item["sold_no"]);
				}
			});
			product_earnings.push({product: item["product"], earnings: earning.toFixed(2)});

		});

		return product_earnings;
	},

	get_category_earnings: function(product_earnings_list){

		var junk_food_earnings = 0,
			veg_and_carbs_earnings = 0,
			fruit_earnings = 0,
			dairy_earnings = 0,
			not_edible_earnings = 0;

		product_earnings_list.forEach(function(item, i){
			//console.log(item, " - ", i);
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

		//console.log([junk_food, veg_and_carbs, fruit, dairy, not_edible])
		
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

		var price_cost = [];

		selling_items.forEach(function(item){
			var Price = 0;
			sales_history.forEach(function(product){
				if(product["stock_item"] === item["product"]){
					
					Price = product["sales_price"];
				}
			});

			var Cost = 0;

			purchase_history.forEach(function(product){
				if(product["stock_item"] === item["product"]){
					
					Cost = product["cost"];
				}
			});

			price_cost.push({product: item["product"], price: Price.substr(1,Price.length), cost:Cost.substr(1,Cost.length)});

		});

		return price_cost;
	},

	get_product_profits: function(price_cost, popular_products){
		var gains = [];

		popular_products.forEach(function(item){
			var prof = 0;

			price_cost.forEach(function(product){
				if(item["product"] === product["product"]){
					prof = (Number(product["price"]) - Number(product["cost"]))*Number(item["sold_no"]);
				}
			});
			gains.push({product:item["product"], profits: prof.toFixed(2)});
		});

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
			//console.log(item, " - ", i);
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

		//console.log([junk_food, veg_and_carbs, fruit, dairy, not_edible])
		
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
