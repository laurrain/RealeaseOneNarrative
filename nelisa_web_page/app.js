var express = require("express")
var exphbs = require("express-handlebars")

var app = express()

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use(express.static("views"))
app.use(express.static("public"))

app.get("/", function(req, res){
	res.render("home")
})

app.get("/category_earnings", function(req, res){
	var data = require("./public/category_earnings.json")

	res.render("category_earnings", {data:data})
})

app.get("/category_sales_per_day_per_week", function(req, res){
	var data = require("./public/category_per_day_per_week.json")

	res.render("category_sales_per_day_per_week", {data:data})
})

app.get("/category_profits", function(req, res){
	var data = require("./public/category_profits.json")

	res.render("category_profits", {data:data})
})

app.get("/daily_profits", function(req, res){
	var data = require("./public/daily_profits.json")

	res.render("daily_profits", {data:data})
})

app.get("/entire_stock", function(req, res){
	var data = require("./public/entire_stock.json")

	res.render("entire_stock", {data:data})
})

app.get("/regular_sales", function(req, res){
	var data = require("./public/most_regular_sales.json")

	res.render("regular_sales", {data:data})
})

app.get("/popular_categories", function(req, res){
	var data = require("./public/popular_categories.json")

	res.render("popular_categories", {data:data})
})

app.get("/popular_products", function(req, res){
	var data = require("./public/popular_products.json")

	res.render("popular_products", {data:data})
})

app.get("/products_price_cost", function(req, res){
	var data = require("./public/price_and_cost.json")

	res.render("products_price_cost", {data:data})
})

app.get("/product_earnings", function(req, res){
	var data = require("./public/product_earnings.json")

	res.render("product_earnings", {data:data})
})

app.get("/products_per_day_per_week", function(req, res){
	var data = require("./public/product_per_day_per_week.json")

	res.render("products_per_day_per_week", {data:data})
})

app.get("/product_profits", function(req, res){
	var data = require("./public/product_profits.json")

	res.render("product_profits", {data:data})
})

app.get("/sales_per_day", function(req, res){
	var data = require("./public/sales_per_day.json")

	res.render("sales_per_day", {data:data})
})

app.get("/stock_rates", function(req, res){
	var data = require("./public/stock_rates.json")

	res.render("stock_rates", {data:data})
})

app.get("/supplier_popular_product", function(req, res){
	var data = require("./public/supplier_pop.json")

	res.render("supplier_popular_product", {data:data})
})

app.get("/supplier_profitable_product", function(req, res){
	var data = require("./public/supplier_profitable.json")

	res.render("supplier_profitable_product", {data:data})
})

app.listen(3000)