function bubbleSort (array) {
	// body...

	for(var i = 0; i < array.length; i++){
		for (var k = 0; k < array.length-1; k++) {
			if(array[k]["sold_no"] < array[k+1]["sold_no"]){
				var temp = array[k];
				array[k] = array[k+1];
				array[k+1] = temp;
				//console.log(array[k]["sold_no"]);
			}
		};
	};
}

function write_to_file (filename, data, data_nummer) {
	// body...
	var fs = require('fs');

	//if(data_nummer === null || data_nummer === 1){
	fs.writeFile(filename, "", function(err){
		if(err) throw err;
	});

	data.forEach(function(item){
		fs.appendFile(filename, item + '\n', function(err){
			if(err) throw err;
		});
	});

	console.log(data);
	/*}
	else{
		fs.writeFileSync(filename, "");
		
		data.forEach(function(item){
			fs.appendFile(filename, item["product"] + ';'+ item["sold_no"] + '\n', function(err){
				if (err) throw err;
				console.log(item["product"] + ' '+ item["sold_no"]);
			});	
		});
	}*/
	console.log('\n' + "Wrote to file: " + filename);
	console.log('');

};

function getTheInventory(filename) { //This get the items sold the spaza shop
	// body...
	var fs = require('fs');
	var buffer = fs.readFileSync(filename);
	var list = buffer.toString().replace(/,/gi, '.');
	var sales_history_rows = list.split('\n');

	var spaza_inventory = [];
	
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

	write_to_file("Inventory.csv", spaza_inventory, 1);

	//Answering the question 'How much of each item has been sold?' starts here
	var inventory_sold = [];

	spaza_inventory.forEach(function (item) {
		// body...
		var sold = 0;
		sales_history.forEach(function(row){
			if(item === row['stock_item']){
				sold += Number(row['no_sold_items']);
			}
		});

		inventory_sold.push({product: item, sold_no: sold});

	});

	bubbleSort(inventory_sold);
	//write_to_file("Sold Of Each (Sorted).csv", inventory_sold, 2)

};

getTheInventory('Nelisa Sales History.csv');