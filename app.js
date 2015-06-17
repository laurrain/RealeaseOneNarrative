'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    spaza_shop = require('./routes/spaza_shop'),
    session = require('express-session');

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

app.use(session({secret: "yada yada", saveUninitialized : true, resave: true, cookie : {maxAge : 5*60000}}));


var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }

  // the user is not logged in redirect him to the login page-
  res.redirect('login');
};

app.get("/", checkUser, function(req, res){  

	res.render("home")
})

app.get("/login", function(req, res){
  res.render("login", {layout : false});
})


app.post("/login",function(req, res){

  var userData = JSON.parse(JSON.stringify(req.body)),
      user = req.session.user = userData.user,
      password = userData.password;

  if(user === "username" && password === "12345"){
    res.redirect("/");
  }
  else {
    res.redirect("login")
  }
})

app.get("/logout", function(req, res, next){
  if (req.session.user){
    delete req.session.user;
    res.redirect("login")
  }
  // the user is not logged in redirect him to the login page-

  res.redirect('login');
}, function(req, res){
  
  res.redirect("login");

})

app.get("/category_earnings", checkUser, spaza_shop.show_category_earnings)

app.get("/category_sales_per_day_per_week", checkUser, spaza_shop.show_category_sales_per_day_per_week);

app.get("/category_profits", checkUser, spaza_shop.show_category_profits)

app.get("/daily_profits", checkUser, spaza_shop.show_daily_profits)

app.get("/entire_stock", checkUser, spaza_shop.show_entire_stock)

app.get("/regular_sales", checkUser, spaza_shop.show_regular_sales);

app.get("/popular_categories", checkUser, spaza_shop.show_popular_category);

app.get("/popular_products", checkUser, spaza_shop.show_popular_products);

app.get("/products_price_cost", checkUser, spaza_shop.show_products_price_cost);

app.get("/product_earnings", checkUser, spaza_shop.show_product_earnings);

app.get("/products_per_day_per_week", checkUser, spaza_shop.show_products_per_day_per_week)

app.get("/product_profits", checkUser, spaza_shop.show_product_profits);

app.get("/sales_per_day", checkUser, spaza_shop.show_sales_per_day)

app.get("/stock_rates", checkUser, spaza_shop.show_stock_rates)

app.get("/supplier_popular_product", checkUser, spaza_shop.show_supplier_popular_product)

app.get("/supplier_profitable_product", checkUser, spaza_shop.show_supplier_profitable_product);

app.get("/all_suppliers", checkUser, spaza_shop.show_all_suppliers);

app.get("/sales_history", checkUser, spaza_shop.show_sales_history);

app.get("/purchase_history", checkUser, spaza_shop.show_purchase_history);

app.get("/categories", checkUser, spaza_shop.show_categories);

app.get("/product_sold", checkUser, spaza_shop.show_product_sold);

app.get("/sales", function(req, res){
  res.render("sales")
});

app.get("/earnings", function(req, res){
  res.render("earnings")
});

app.get("/profits", function(req, res){
  res.render("profits")
});

app.get("/supplier_information", function(req, res){
  res.render("supplier_information")
});

app.post('/sales_history/add_sales_history', spaza_shop.add_sales_history);
app.get('/sales_history/edit_sales_history/:id', spaza_shop.get_sales_history);
app.post('/sales_history/update_sales_history/:id', spaza_shop.update_sales_history);
app.get('/sales_history/delete_sales_history/:id', spaza_shop.delete_sales_history);

app.post('/categories/add_categories', spaza_shop.add_categories);
app.get('/categories/edit_categories/:id', spaza_shop.get_categories);
app.post('/categories/update_categories/:id', spaza_shop.update_categories);
app.get('/categories/delete_categories/:id', spaza_shop.delete_categories);

app.post('/product_sold/add_product_sold', spaza_shop.add_product_sold);
app.get('/product_sold/edit_product_sold/:id', spaza_shop.get_product_sold);
app.post('/product_sold/update_product_sold/:id', spaza_shop.update_product_sold);
app.get('/product_sold/delete_product_sold/:id', spaza_shop.delete_product_sold);

app.post('/purchase_history/add_purchase_history', spaza_shop.add_purchase_history);
app.get('/purchase_history/edit_purchase_history/:id', spaza_shop.get_purchase_history);
app.post('/purchase_history/update_purchase_history/:id', spaza_shop.update_purchase_history);
app.get('/purchase_history/delete_purchase_history/:id', spaza_shop.delete_purchase_history);

app.post('/all_suppliers/add_all_suppliers', spaza_shop.add_all_suppliers);
app.get('/all_suppliers/edit_all_suppliers/:id', spaza_shop.get_all_suppliers);
app.post('/all_suppliers/update_all_suppliers/:id', spaza_shop.update_all_suppliers);
app.get('/all_suppliers/delete_all_suppliers/:id', spaza_shop.delete_all_suppliers);

app.get("/*", function(req, res){
	res.render("home")
})

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){

	console.log("server is running on " + server.address().address + ":" +server.address().port)

})
