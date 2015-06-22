'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    spaza_shop = require('./routes/spaza_shop'),

 app = express();
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


var checkUser = function(req, res, next){
    if(req.session.user ){
        user.username = req.session.user;
        user.role =req.session.user
        user: req.session.user;
        return next();
            

    }
        res.redirect('login')

    }

app.get("/",checkUser, function(req, res){  

	res.render("home")
})

app.get("/login", function(req, res){
  res.render("login", {layout : false});
})

app.post('/login',spaza_shop.checkUser)

app.get("/logout", function(req, res, next){
  if (req.session.user){
    delete req.session.user;
    res.redirect("login")
  }
  // the user is not logged in redirect him to the login page-

  res.redirect('/login');
}, function(req, res){
  
  res.redirect("/login");

})

app.get("/signup", function(req,res){
  res.render('signup', {data:spaza_shop, layout: false})
})
app.post('UserData/signup', spaza_shop.signup)

app.post('/UserData/signup', spaza_shop.userData)

app.get("/category_earnings",spaza_shop.show_category_earnings)

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

app.get("/supplier_profitable_product", spaza_shop.show_supplier_profitable_product);

app.get("/all_suppliers",spaza_shop.show_all_suppliers);

app.get("/sales_history", spaza_shop.show_sales_history);

app.get("/purchase_history", spaza_shop.show_purchase_history);

app.get("/categories", spaza_shop.show_categories);

app.get("/product_sold", spaza_shop.show_product_sold);

app.get("/sales", function(req, res){
  res.render("sales")
});

app.get("/earnings", function(req, res){
  res.render("earnings")
});

app.get("/profits", function(req, res){
  res.render("profits")
});

app.get("/supplier_information",function(req, res){
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

var port = process.env.PORT || 5000;

var server = app.listen(port, function(){

	console.log("server is running on " + server.address().address + ":" +server.address().port)

})
