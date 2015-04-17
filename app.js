'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    spaza_shop = require('./routes/spaza_shop');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'MysqlServer123',
      port: 3306,
      database: 'spaza_shop'
};

app.engine("handlebars", exphbs({defaultLayout:"main"}))
app.set("view engine", "handlebars")

app.use("/static", express.static("views"))
app.use("/static", express.static("."))

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", function(req, res){
	res.render("home")
})

app.get("/category_earnings", function(req, res){
	var data = require("./category_earnings.json")

	res.render("category_earnings", {data:data})
})

app.get("/category_sales_per_day_per_week", function(req, res){
	var data = require("./category_per_day_per_week.json")

	res.render("category_sales_per_day_per_week", {data:data})
})

app.get("/category_profits", function(req, res){
	var data = require("./category_profits.json")

	res.render("category_profits", {data:data})
})

app.get("/daily_profits", function(req, res){
	var data = require("./daily_profits.json")

	res.render("daily_profits", {data:data})
})

app.get("/entire_stock", function(req, res){
	var data = require("./entire_stock.json")

	res.render("entire_stock", {data:data})
})

app.get("/regular_sales", function(req, res){
	var data = require("./most_regular_sales.json")

	res.render("regular_sales", {data:data})
})

app.get("/popular_categories", spaza_shop.show_popular_category);

app.get("/popular_products", spaza_shop.show_popular_products);

app.get("/products_price_cost", spaza_shop.show_products_price_cost);

app.get("/product_earnings", spaza_shop.show_product_earnings);

app.get("/products_per_day_per_week", function(req, res){
	var data = require("./product_per_day_per_week.json")

	res.render("products_per_day_per_week", {data:data})
})

app.get("/product_profits", spaza_shop.show_product_profits);

app.get("/sales_per_day", function(req, res){
	var data = require("./sales_per_day.json")

	res.render("sales_per_day", {data:data})
})

app.get("/stock_rates", function(req, res){
	var data = require("./stock_rates.json")

	res.render("stock_rates", {data:data})
})

app.get("/supplier_popular_product", spaza_shop.show_supplier_popular_product)

app.get("/supplier_profitable_product", function(req, res){
	var data = require("./supplier_profitable.json")

	res.render("supplier_profitable_product", {data:data})
})

app.get("/*", function(req, res){
	res.render("home")
})

var server = app.listen(3000, function(){

	console.log("server is running on " + server.address().address + ":" +server.address().port)

})