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
				if(item === row['stock_item']){
					sold += Number(row['no_sold_items']);
				}
			});

			inventory_sold.push({product: item, sold_no: sold});

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
				if(item === row['stock_item']){
					++i;
				}
			
			});

			if(i === 0 && row['stock_item'] !== 'stock item'){
				spaza_inventory.push(row['stock_item']);
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
						{product: "junk_food", sold_no: junk_food},
						{product: "veg_and_carbs", sold_no: veg_and_carbs},
						{product: "fruit", sold_no:fruit},
						{product: "dairy", sold_no: dairy},
						{product: "not_edible", sold_no: not_edible}
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
				if(sellin === item["stock_item"]){
					if(Number(item["no_sold_items"]) > 0){
						starter++;
					}
				}
			});

			regulariry.push({product: sellin, sold_no/*frequency*/: starter});

		});
		return regulariry.sort(function(a, b){
			return b["sold_no"] - a["sold_no"];
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
				if(item === row['stock_item']){
					bought += Number(row['quantity']);
				}
			});

			stock_levels.push({product: item, quantity: bought});

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
					percent += (inventory_left/Number(stock_item["quantity"]))*100;
				}
			});
			stock_rates.push({product: item["product"], remaining_stock: inventory_left, percent_left: percent});
		});

		return stock_rates.sort(function(a, b){
			return b["percent_left"] - a["percent_left"];
		});
	}
}

//};


	/*print_logo(function(){

		var filename = 'Nelisa Sales History.csv';
		process.stdout.write("\n" + "---------------------------------------------------------------------------------------------------" + "\n");
		getTheInventory(filename);
	})*/
