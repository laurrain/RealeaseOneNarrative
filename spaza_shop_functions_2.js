module.exports = {

	get_total_avg_day_week_sales:function(sales_history){

		var day_week_sales = [],
			total = 0,
			date_tracker  = sales_history[1]["date"],
			count_days = 1,
			count_weeks = 1;

		sales_history.forEach(function(row){
			if(row["stock_item"] !== "stock item"){
				total += Number(row["sales_price"].substr(1, row["sales_price"].length)) * Number(row["no_sold_items"]);
			}

			if(date_tracker !== row["date"] && row["stock_item"] !== "stock item"){
				date_tracker = row["date"];
				count_days++;
				if((count_days/7) > Math.round(count_days/7)){
					count_weeks = Math.round(count_days/7) + 1;
				}
				else{
					count_weeks = Math.round(count_days/7);
				}
			}
		});

		day_week_sales.push(
							{time: "day_avg", avg: Math.round(total/count_days)},
							{time: "week_avg", avg: Math.round(total/count_weeks)}
							);
		return day_week_sales;
	},

	get_product_avg_dayWeek_sales:function(sales_history, selling_items){

		var the_product_avgs = [];

		selling_items.forEach(function(item){

			var date_tracker = sales_history[1]["date"],
				count_days = 0,
				count_weeks = 1,
				sales = 0;

			sales_history.forEach(function(row){
				if(row["stock_item"] === item["product"] && row["stock_item"] !== "stock item" && Number(row["no_sold_items"]) > 0){
						sales += Number(row["sales_price"].substr(1, row["sales_price"].length)) * Number(row["no_sold_items"]);
						count_days++;

					if((count_days/7) > Math.round(count_days/7)){
						count_weeks = Math.round(count_days/7) + 1;
					}
					else{
						count_weeks = Math.round(count_days/7);
					}	
				}
			});

			the_product_avgs.push({product: item["product"], day_avg: Math.round(sales/count_days), week_avg: Math.round(sales/count_weeks)});

		});
		return the_product_avgs;

	},

	get_categories:function(selling_items){
		var categories = [],
			junk_food = [],
			veg_and_carbs = [],
			fruit = [],
			dairy = [],
			not_edible = [];

		selling_items.forEach(function(item){

			switch(item["product"]){

				case "Mixed Sweets 5s":
				case "Fanta 500ml":
				case "Cream Soda 500ml":
				case "Heart Chocolates":
				case "Coke 500ml":
					junk_food.push(item["product"]);
				break;

				case "Chakalaka Can":
				case "Top Class Soy Mince":
				case "Gold Dish Vegetable Curry Can":
				case "Iwisa Pap 5kg":
				case "Bread":
					veg_and_carbs.push(item["product"]);
				break;

				case "Bananas - loose":
				case "Apples - loose":
					fruit.push(item["product"]);
				break;

				case "Milk 1l":
				case "Imasi":
					dairy.push(item["product"]);
				break;

				case "Soap Bar":
				case "Shampoo 1 litre":
				case "Rose (Plastic)":
				case "Valentines Cards":
					not_edible.push(item["product"]);
				break;
			}
		});

		categories.push(
						{junk_food: junk_food},
						{veg_and_carbs: veg_and_carbs},
						{not_edible: not_edible},
						{fruit: fruit},
						{dairy: dairy}
						);

		return categories;
	}
};
