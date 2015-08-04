$(document).ready(function(){
	$("#all_supplierSearchBar").keyup(function(){
		var searchValue = $("#all_supplierSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/all_suppliers/search/" + searchValue, function(results){
			$("#supplierList").html(results)
		})
	})


	$("#salesSearchBar").keyup(function(){
		var searchValue = $("#salesSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/regular_sales/search/" + searchValue, function(results){
			$("#saleList").html(results)
		})
	})

	$("#categorySearchBar").keyup(function(){
		var searchValue = $("#categorySearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/category_sales_per_day_per_week/search/" + searchValue, function(results){
			$("#categoryList").html(results)
		})
	})

	$("#popular_productSearchBar").keyup(function(){
		var searchValue = $("#popular_productSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/popular_products/search/" + searchValue, function(results){
			$("#popular_productList").html(results)
		})
	})

	$("#productDayWeekSearchBar").keyup(function(){
		var searchValue = $("#productDayWeekSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/products_per_day_per_week/search/" + searchValue, function(results){
			$("#productDayWeekList").html(results)
		})
	})

	$("#salesDayWeekSearchBar").keyup(function(){
		var searchValue = $("#salesDayWeekSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/sales_per_day/search/" + searchValue, function(results){
			$("#salesDayWeekList").html(results)
		})
	})

	$("#stock_ratesSearchBar").keyup(function(){
		var searchValue = $("#stock_ratesSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/stock_rates/search/" + searchValue, function(results){
			$("#stock_ratesList").html(results)
		})
	})

	$("#entire_stockSearchBar").keyup(function(){
		var searchValue = $("#entire_stockSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/entire_stock/search/" + searchValue, function(results){
			$("#entire_stockList").html(results)
		})
	})

	$("#productPriceCostSearchBar").keyup(function(){
		var searchValue = $("#productPriceCostSearchBar").val();
		if(searchValue == ""){
			searchValue = "all"
		}
		$.get("/products_price_cost/search/" + searchValue, function(results){
			$("#productPriceCostList").html(results)
		})
	})

})

