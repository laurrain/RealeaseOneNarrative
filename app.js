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

app.get("/category_earnings", spaza_shop.show_category_earnings)

app.get("/category_sales_per_day_per_week", spaza_shop.show_category_sales_per_day_per_week);

app.get("/category_profits", spaza_shop.show_category_profits)

app.get("/daily_profits", spaza_shop.show_daily_profits)

app.get("/entire_stock", spaza_shop.show_entire_stock)

app.get("/regular_sales", spaza_shop.show_regular_sales);

app.get("/popular_categories", spaza_shop.show_popular_category);

app.get("/popular_products", spaza_shop.show_popular_products);

app.get("/products_price_cost", spaza_shop.show_products_price_cost);

app.get("/product_earnings", spaza_shop.show_product_earnings);

app.get("/products_per_day_per_week", spaza_shop.show_products_per_day_per_week)

app.get("/product_profits", spaza_shop.show_product_profits);

app.get("/sales_per_day", spaza_shop.show_sales_per_day)

app.get("/stock_rates", spaza_shop.show_stock_rates)

app.get("/supplier_popular_product", spaza_shop.show_supplier_popular_product)

app.get("/supplier_profitable_product", spaza_shop.show_supplier_profitable_product)

app.get("/*", function(req, res){
	res.render("home")
})

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){

	console.log("server is running on " + server.address().address + ":" +server.address().port)

})
