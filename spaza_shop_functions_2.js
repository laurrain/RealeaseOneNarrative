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

	}

};
