'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express();


//Statistics files objects
var auth = require('./routes/Auth'),
    sales = require('./routes/Sales'),
    earnings = require('./routes/Earnings'),
    profits = require('./routes/Profits'),
    tables_settings = require('./routes/tables_settings'),
    supplier_info = require('./routes/Suppliers');
    
var user = {};

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: '42926238',
      port: 3306,
      database: 'nelisa_spaza_shop'
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

app.use(session({secret: "yada yada", saveUninitialized : false, resave: true, cookie : {maxAge : 5*60000}}));

app.get("/", auth.checkUser, function(req, res){

  res.render("home", {administrator : administrator})
})

app.get("/login", function(req, res){

  res.render("login", {layout : false});
})

app.post("/login",auth.authUser)


app.get('/sign_up', function(req, res){
  res.render("sign_up", {layout : false});
})

app.post("/sign_up", auth.addUser)

app.get("/admin_panel", auth.checkUser, tables_settings.adminPanel)
app.post("/admin_panel/:username", auth.checkUser, auth.promoteUser)


app.get("/logout", function(req, res, next){

  if (req.session.user){
    delete req.session.user;
    res.redirect("/login")
  }else {
    // the user is not logged in redirect him to the login page-
    res.redirect("/login")
  }
})

app.get("/category_earnings", auth.checkUser, earnings.show_category_earnings)

app.get("/category_sales_per_day_per_week", auth.checkUser, sales.show_category_sales_per_day_per_week);
app.get('/category_sales_per_day_per_week/search/:searchValue',sales.getSearchCategory)

app.get("/category_profits", auth.checkUser, profits.show_category_profits)

app.get("/daily_profits", auth.checkUser, profits.show_daily_profits)

app.get("/entire_stock", auth.checkUser, sales.show_entire_stock)
app.get('/entire_stock/search/:searchValue',sales.getSearchEntireStock)

app.get("/regular_sales", auth.checkUser, sales.show_regular_sales);
app.get('/regular_sales/search/:searchValue',sales.getSearchSales)

app.get("/popular_categories", auth.checkUser, sales.show_popular_category);

app.get("/popular_products", auth.checkUser, sales.show_popular_products);
app.get('/popular_products/search/:searchValue',sales.getSearchPopularProduct)

app.get("/products_price_cost", auth.checkUser, earnings.show_products_price_cost);

app.get("/product_earnings", auth.checkUser, earnings.show_product_earnings);

app.get("/products_per_day_per_week", auth.checkUser, sales.show_products_per_day_per_week)
app.get('/products_per_day_per_week/search/:searchValue',sales.getSearchProductPerDayPerWeek)

app.get("/product_profits", auth.checkUser, profits.show_product_profits);

app.get("/sales_per_day", auth.checkUser, sales.show_sales_per_day)
app.get('/sales_per_day/search/:searchValue',sales.getSearchsalesPerDayWeek)

app.get("/stock_rates", auth.checkUser, sales.show_stock_rates)
app.get('/stock_rates/search/:searchValue',sales.getSearchstockRates)

app.get("/supplier_popular_product", auth.checkUser, supplier_info.show_supplier_popular_product)

app.get("/supplier_prof_product", auth.checkUser, supplier_info.show_supplier_profitable_product);

app.get("/all_suppliers", auth.checkUser, supplier_info.show_all_suppliers);
app.get('/all_suppliers/search/:searchValue',supplier_info.getSearchAllSuppliers)

app.get("/sales_history", auth.checkUser, tables_settings.show_sales_history);

app.get("/purchase_history", auth.checkUser, tables_settings.show_purchase_history);

app.get("/categories", auth.checkUser, tables_settings.show_categories);

app.get("/product_sold", auth.checkUser, tables_settings.show_product_sold);



app.post('/sales_history/add_sales_history', auth.checkUser, tables_settings.add_sales_history);
app.get('/sales_history/edit_sales_history/:id', auth.checkUser, auth.checkUser, tables_settings.get_sales_history);
app.post('/sales_history/update_sales_history/:id', auth.checkUser, auth.checkUser, tables_settings.update_sales_history);
app.get('/sales_history/delete_sales_history/:id', auth.checkUser, auth.checkUser, tables_settings.delete_sales_history);

app.post('/categories/add_categories', auth.checkUser, tables_settings.add_categories);
app.get('/categories/edit_categories/:id', auth.checkUser, tables_settings.get_categories);
app.post('/categories/update_categories/:id', auth.checkUser, tables_settings.update_categories);
app.get('/categories/delete_categories/:id', auth.checkUser, tables_settings.delete_categories);

app.post('/product_sold/add_product_sold', auth.checkUser, tables_settings.add_product_sold);
app.get('/product_sold/edit_product_sold/:id', auth.checkUser, tables_settings.get_product_sold);
app.post('/product_sold/update_product_sold/:id', auth.checkUser, tables_settings.update_product_sold);
app.get('/product_sold/delete_product_sold/:id', auth.checkUser, tables_settings.delete_product_sold);

app.post('/purchase_history/add_purchase_history', auth.checkUser, tables_settings.add_purchase_history);
app.get('/purchase_history/edit_purchase_history/:id', auth.checkUser, tables_settings.get_purchase_history);
app.post('/purchase_history/update_purchase_history/:id', auth.checkUser, tables_settings.update_purchase_history);
app.get('/purchase_history/delete_purchase_history/:id', auth.checkUser, tables_settings.delete_purchase_history);

app.post('/all_suppliers/add_all_suppliers', auth.checkUser, tables_settings.add_all_suppliers);
app.get('/all_suppliers/edit_all_suppliers/:id', auth.checkUser, tables_settings.get_all_suppliers);
app.post('/all_suppliers/update_all_suppliers/:id', auth.checkUser, tables_settings.update_all_suppliers);
app.get('/all_suppliers/delete_all_suppliers/:id', auth.checkUser, tables_settings.delete_all_suppliers);

app.get("/*", auth.checkUser, function(req, res){
  res.redirect("/login");
})

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){

	console.log("server is running on " + server.address().address + ":" +server.address().port)

})
