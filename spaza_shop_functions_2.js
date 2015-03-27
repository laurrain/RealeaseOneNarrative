module.exports = {

	get_total_avg_day_week_sales:function(sales_history){

		var day_week_sales = [],
			total = 0,
			date_tracker  = sales_history[1]["date"],
			count_days = 1,
			count_weeks = 1;

		sales_history.forEach(function(row){

			var len = row["sales_price"].length

			if(row["stock_item"] !== "stock item"){
				total += Number(row["sales_price"].substr(1, len)) * Number(row["no_sold_items"]);
			}

			if(date_tracker !== row["date"] && row["stock_item"] !== "stock item"){
				date_tracker = row["date"];
				count_days++;
				count_weeks = Math.ceil(count_days/7)
			}
		});

		day_week_sales.push(
							{time: "day_avg", avg: Math.round(total/count_days)},
							{time: "week_avg", avg: Math.round(total/count_weeks)}
							);
		
		return day_week_sales;
	},

	get_product_avg_dayWeek_sales:function(sales_history, selling_items){

		var the_product_avgs = [],
			product_no_sales = {},
			product_selling_days = {},
			product_selling_weeks = {};

		sales_history.forEach(function(row){

			if(product_no_sales[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				product_no_sales[row["stock_item"]] = Number(row["no_sold_items"])
			}
			else if(row["stock_item"] !== "stock item"){
				product_no_sales[row["stock_item"]] += Number(row["no_sold_items"])
			}

			if(product_selling_days[row["stock_item"]] === undefined && row["stock_item"] !== "stock item"){
				product_selling_days[row["stock_item"]] = Number(row["no_sold_items"]) > 0 ? 1: 0
			}
			else if(row["stock_item"] !== "stock item"){
				if(Number(row["no_sold_items"]) > 0){
					++product_selling_days[row["stock_item"]]
				}
			}

		})
		
		for(var key in product_selling_days){
			product_selling_weeks[key] = Math.ceil(product_selling_days[key]/7)
		}

		//console.log(product_selling_days, product_selling_weeks)


		the_product_avgs = Object.keys(product_no_sales).map(function(key){
			return {
				product: key,
				day_avg: Math.round(product_no_sales[key]/product_selling_days[key]),
				week_avg: Math.round((product_no_sales[key]/product_selling_weeks[key]))
			}
		})

		return the_product_avgs;

	},

	get_avg_cat_dayWeek_sales:function(the_product_avgs){

		var category_avgs = [];

		var junk_food = {day_avg: 0, week_avg: 0},
			veg_and_carbs = {day_avg: 0, week_avg: 0},
			fruit = {day_avg: 0, week_avg: 0},
			dairy = {day_avg: 0, week_avg: 0},
			not_edible = {day_avg: 0, week_avg: 0};

		the_product_avgs.forEach(function(item){
			switch(item["product"]){
				case "Mixed Sweets 5s":
				case "Top Class Soy Mince":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food["day_avg"] += Number(item["day_avg"]);
					junk_food["week_avg"] += Number(item["week_avg"]);
				break;

				case "Chakalaka Can":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Bread":
					veg_and_carbs["day_avg"] += Number(item["day_avg"]);
					veg_and_carbs["week_avg"] += Number(item["week_avg"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit["day_avg"] += Number(item["day_avg"]);
					fruit["week_avg"] += Number(item["week_avg"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy["day_avg"] += Number(item["day_avg"]);
					dairy["week_avg"] += Number(item["week_avg"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible["day_avg"] += Number(item["day_avg"]);
					not_edible["week_avg"] += Number(item["week_avg"]);
				break;
			};

		});

		category_avgs.push(
						{category: "junk_food", day_avg: junk_food["day_avg"], week_avg: junk_food["week_avg"]}, 
			            {category: "dairy", day_avg: dairy["day_avg"], week_avg: dairy["week_avg"]},
			            {category: "veg_and_carbs", day_avg: veg_and_carbs["day_avg"], week_avg: veg_and_carbs["week_avg"]},
			            {category: "not_edible", day_avg: not_edible["day_avg"], week_avg: not_edible["week_avg"]},
			            {category: "fruit", day_avg:fruit["day_avg"], week_avg: fruit["week_avg"]}
						);

		return category_avgs;

	},

	get_avg_sales_per_day:function(sales_history){

		var days_sales_obj = {},
			count_days = {},
			track_date = {},
			these_days = [];

		sales_history.forEach(function(row){

			if(row["stock_item"] !== "stock item"){

				if(days_sales_obj[row["day"]] === undefined){
					days_sales_obj[row["day"]] = Number(row["no_sold_items"])
					track_date[row["day"]] = row["date"];
					count_days[row["day"]] = Number(row["no_sold_items"]) > 0? 1 : 0;
				}
				else{

					days_sales_obj[row["day"]] += Number(row["no_sold_items"])

					if(track_date[row["day"]] !== row["date"] || count_days[row["day"]] === 0 ){

						Number(row["no_sold_items"]) > 0? ++count_days[row["day"]]: count_days[row["day"]];
						track_date[row["day"]] = row["date"];
					}
				}

			}

		})

		these_days = Object.keys(days_sales_obj).map(function(key){
			return {
				day: key,
				avg: days_sales_obj[key]/count_days[key]
			}
		})

		return these_days;

	},

	get_sales_per_week:function(sales_history){

		var track_day = sales_history[1]["day"],
			track_date = sales_history[1]["date"],
			these_weeks = [];


		var total = 0,
			counter = 1;

		sales_history.forEach(function(row){

			if(row["date"] !== "Date"){
				if(track_day === row["day"] && track_date !== row["date"]){
					these_weeks.push({week: "week"+counter, avg: total});
					counter++;
					track_date = row["date"]
					total = 0;
				}

				total += Number(row["no_sold_items"])
			}

		});


		if(counter === 0){
			these_weeks.push({week:"week1", avg: total});
		}
		else
			these_weeks.push({week:"week"+counter, avg: total})

		return these_weeks;
	},

	get_avg_profit_per_weekday:function(sales_history, price_cost){

		/*var day_profits = {},
			price_and_cost = {},
			sales_history_map = {},
			these_days = [],
			count_days = {};

		price_cost.forEach(function(row){
			if(price_and_cost[row["product"]] === undefined){
				price_and_cost[row["product"]] = [Number(row["price"]), Number(row["cost"])];
			}
		})

		sales_history.forEach(function(row){

			if(day_profits[row["day"]] === undefined && row["stock_item"] !== "stock item"){
				
				console.log((row["no_sold_items"]))
				day_profits[row["day"]] = Number(row["no_sold_items"])*(price_and_cost[row["product"]][0] - price_and_cost[row["product"]][1])	
				count_days[row["day"]] = day_profits[row["day"]] > 0 ? 1: 0
				
			}
			else if(row["stock_item"] !== "stock item"){
				day_profits[row["day"]] += Number(row["no_sold_items"])*(price_and_cost[row["product"]][0] - price_and_cost[row["product"]][1])
				Number(row["no_sold_items"]) > 0? ++count_days[row["day"]]: count_days[row["day"]]
			}
		})

		these_days = Object.keys(day_profits).map(function(key){
			return {
				day: key,
				profit: count_days > 0 ? day_profits[key]/count_days[key]:day_profits[key]
			}
		})*/

		var these_days = [
							{day: "Sunday", profit: 0},
							{day: "Monday", profit: 0},
							{day: "Tuesday", profit: 0},
							{day: "Wednesday", profit: 0},
							{day: "Thursday", profit: 0},
							{day: "Friday", profit: 0},
							{day: "Saturday", profit: 0}
							],

			track_date = sales_history[1]["date"];

		these_days.forEach(function(week_day){

			var total = 0,
				counter = 0;
				//date = row["date"];

			sales_history.forEach(function(row){

				if(week_day["day"] === row["day"]){

					price_cost.forEach(function(cost_price){

						if(cost_price["product"] === row["stock_item"]){

							total += Number(row["no_sold_items"]) * (Number(cost_price["price"]) - Number(cost_price["cost"]))

							if(track_date !== row["date"]){
								counter++;
								track_date = row["date"]
							}
						}
					});
				}

			});


			if(counter !== 0)
				week_day["profit"] += Math.round(total/counter);
			else
				week_day["profit"] += Math.round(total)


		});

		return these_days.sort(function(a, b){
			if(b["profit"] - a["profit"] < 0)
				return -1
			else if(b["profit"] - a["profit"] > 0)
				return 1
		});

	},

	get_supply_popular_product: function(popular_products, purchase_history){

		var suppliers = [];

		purchase_history.forEach(function(row){

			var count_sup = 0;

			if(row["stock_item"] === popular_products[0]["product"]){
				suppliers.forEach(function(shop){
					if(row["shop"] === shop["shop"]){
						count_sup++;
					}
				});

				if(count_sup === 0){
					suppliers.push({shop: row["shop"], product: row["stock_item"]})
				}
			}

		});

		return suppliers;

	},

	get_supply_profitable_product:function(product_profits, purchase_history){


		var suppliers = [];

		purchase_history.forEach(function(row){

			var count_sup = 0;

			if(row["stock_item"] === product_profits[0]["product"]){
				suppliers.forEach(function(shop){
					if(row["shop"] === shop["shop"]){
						count_sup++;
					}
				});

				if(count_sup === 0){
					suppliers.push({shop: row["shop"], product: row["stock_item"]})
				}
			}

		});

		return suppliers;

	},

	write_to_file: function (data, filename) {

		var file_ops = require('fs');
		
		file_ops.writeFile(filename, JSON.stringify(data));
	}

};