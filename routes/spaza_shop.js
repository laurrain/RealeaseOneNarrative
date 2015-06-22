past_pages = [],
administrator = false,
last_page = "";

admin = {
              username : "admin",
              password : "@dmin123",
              role : true
            },
viewer = {
              username : "viewer",
              password : "Viewer123",
              role : false
            };

exports.authUser = function(req, res, next){

    past_pages = [];

    var userData = JSON.parse(JSON.stringify(req.body)),
      user = req.session.user = userData.user,
      password = userData.password;

    req.getConnection(function(err, connection){
        if (err) 
            return next(err);
        connection.query('SELECT * FROM users WHERE username = ?  AND password = ?', [user, password], function(err, results) {
            if (err) return next(err);

            if(results.length > 0){
                req.session.user = results[0].username

                administrator = results[0].admin

                res.redirect("/");
            }
            else{
                res.render("login", {
                    message : "Username or password incorrect!",
                    layout : false
                })
            }
         });
    });
}

exports.addUser = function(req, res, next){
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    username : input.username,
                    password : input.password
            };

        if (input.password_confirm == input.password){
            connection.query('SELECT * FROM users WHERE username = ?', input.username, function(err, results1) {
                    if (err)
                            console.log("Error inserting : %s ",err );

                if (results1.length == 0){
                    connection.query('insert into users set ?', data, function(err, results) {
                            if (err)
                                    console.log("Error inserting : %s ",err );
                     
                            req.session.user = input.username;
                            res.redirect('/');
                    });
                }
                else{
                    res.render("sign_up", {
                                            message : "Username alredy exists!",
                                            layout : false
                                            })
                }
            });
        }
        else{
            res.render("sign_up", {
                message : "Passwords don't match!",
                layout : false
            })
        }
    });
}

exports.checkUser = function(req, res, next){

  if (req.session.user){
    past_pages.push(req._parsedOriginalUrl.path)
    
    if (req._parsedOriginalUrl.path.match(/profit/gi) && !administrator ) {
      past_pages.splice(-1)
      last_page = past_pages[past_pages.length-1];
      res.redirect(last_page)
    }else {
    	return next();
	}
  }else if (!req.session.user){
    // the user is not logged in redirect him to the login page-
    res.redirect('/login');
  }
};

exports.show_popular_products = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY stock_item ORDER BY no_sold DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'popular_products', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_popular_category = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON category_name=categories.cat_name GROUP BY cat_name ORDER BY no_sold DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'popular_categories', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_products_price_cost = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, sales_price, cost FROM sales_history INNER JOIN purchase_history ON stock_item=purchase_history.item GROUP BY stock_item, sales_price, cost', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'products_price_cost', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_product_earnings = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, SUM(earnings) AS earnings FROM (SELECT stock_item ,SUM(no_sold) AS no_sold, sales_price, SUM(no_sold)*CAST(SUBSTRING(sales_price, 2) AS DECIMAL(53, 2)) AS earnings  FROM sales_history GROUP BY sales_price, stock_item ORDER BY stock_item) AS sold_price_earn GROUP BY stock_item ORDER BY earnings DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'product_earnings', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

//Total number of WEEDAYS
//SELECT day, SUM(1) as freq FROM (SELECT DISTINCT date, day FROM (SELECT date,day, stock_item, SUM(no_sold) AS no_sold, CAST(SUBSTR(sales_price, 2) AS DECIMAL(53,2)) AS sales_price FROM sales_history GROUP BY day, stock_item, date) AS stuff GROUP BY date, day) AS date_days GROUP BY day

exports.show_product_profits = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, avg_profit*no_sold AS profits FROM (SELECT stock_item, ROUND(SUM(profit)/SUM(1), 2) as avg_profit FROM (SELECT * FROM (SELECT stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price,CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)) AS cost, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) - CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2))) AS profit FROM sales_history INNER JOIN purchase_history ON stock_item=item GROUP BY stock_item, price, cost) AS single_profits) AS single_profits GROUP BY stock_item) AS avg_prod_profits INNER JOIN product_sold ON product_name=stock_item ORDER BY profits DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'product_profits', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_supplier_popular_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT product_name, shop from product_sold INNER JOIN purchase_history ON item=product_name WHERE no_sold=(SELECT MAX(no_sold) FROM product_sold) GROUP BY product_name', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'supplier_popular_product', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};


exports.show_supplier_profitable_product = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT MAX(profits), shop, stock_item FROM (SELECT shop, stock_item, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*product_sold.no_sold AS profits FROM sales_history INNER JOIN purchase_history ON stock_item=item INNER JOIN product_sold ON product_name=item GROUP BY sales_history.stock_item ORDER BY profits DESC) AS prod_profits', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'supplier_profitable_product', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_sales_per_day = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT day, SUM(no_sold)/SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) as avg_per_weekday from  (SELECT DISTINCT day, date, SUM(no_sold) as no_sold FROM sales_history GROUP BY date) AS sales_per_date GROUP BY day ORDER BY avg_per_weekday DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'sales_per_day', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_stock_rates = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT item, CAST((quantity-no_sold)/quantity*100 AS DECIMAL(10,2)) AS rate_as_percent FROM (SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item) as entire_stock INNER JOIN product_sold ON product_name=item ORDER BY rate_as_percent', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'stock_rates', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_regular_sales = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, SUM(CASE WHEN no_sold > 0 THEN 1 ELSE 0 END) AS frequency FROM sales_history GROUP BY stock_item ORDER by frequency DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'regular_sales', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_entire_stock = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT item, SUM(quantity) as quantity FROM purchase_history GROUP BY item ORDER BY quantity DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'entire_stock', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_daily_profits = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT DISTINCT day, ROUND(SUM(profits)/SUM(1), 2) AS profits FROM (SELECT DISTINCT sales_history.date, day, SUM((CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2))-CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)))*no_sold) AS profits  FROM sales_history INNER JOIN purchase_history ON item=stock_item GROUP BY date) AS date_profits GROUP BY day ORDER BY profits DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'daily_profits', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_category_profits = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, SUM(avg_profit*product_sold.no_sold) AS profits FROM (SELECT category_name,stock_item, ROUND(SUM(profit)/SUM(1), 2) as avg_profit FROM (SELECT * FROM (SELECT category_name, stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price,CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2)) AS cost, (CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) - CAST(SUBSTRING(cost, 2) AS DECIMAL(53,2) )) AS profit FROM sales_history INNER JOIN purchase_history ON stock_item=item GROUP BY stock_item, price, cost) AS single_profits) AS single_profits GROUP BY stock_item)AS avg_prod_profits INNER JOIN product_sold ON product_name=stock_item INNER JOIN categories ON categories.cat_name=category_name GROUP BY cat_name ORDER BY profits DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'category_profits', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_category_sales_per_day_per_week = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, category_name, cat_name, SUM(no_sold) AS no_sold FROM sales_history INNER JOIN categories ON categories.cat_name=category_name GROUP BY date, cat_name) AS cat_sales GROUP BY cat_name ORDER BY per_day, per_week', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'category_sales_per_day_per_week', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_category_earnings = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT cat_name, SUM(earnings) AS earnings FROM (SELECT cat_name, no_sold*ROUND(AVG(price), 2) AS earnings FROM (SELECT cat_name, stock_item, price, SUM(no_sold) AS no_sold  FROM (SELECT category_name, stock_item, CAST(SUBSTRING(sales_price,2) AS DECIMAL(53,2)) AS price, no_sold FROM sales_history) AS prod_price INNER JOIN categories ON category_name=categories.cat_name GROUP BY stock_item, price) AS product_price GROUP BY stock_item, price) AS cat_earnings GROUP BY cat_name ORDER BY earnings DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'category_earnings', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_products_per_day_per_week = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT stock_item, CASE WHEN (SUM(no_sold)/SUM(1)) < ROUND(SUM(no_sold)/SUM(1), 0) THEN ROUND(SUM(no_sold)/SUM(1), 0) ELSE ROUND(SUM(no_sold)/SUM(1),0)+1 END AS per_day, CASE WHEN (SUM(no_sold)/7) < ROUND((SUM(no_sold)/SUM(1))/7, 0) THEN ROUND(SUM(no_sold)/7, 0) ELSE ROUND(SUM(no_sold)/7,0)+1 END AS per_week FROM (SELECT date, stock_item, SUM(no_sold) AS no_sold FROM sales_history GROUP BY date, stock_item) AS prod_sales GROUP BY stock_item ORDER BY per_day DESC, per_week DESC', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'products_per_day_per_week', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_all_suppliers = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM suppliers', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'all_suppliers', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_sales_history = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM sales_history ORDER BY id DESC', [], function(err, sales_history) {
        	if (err) 
                return next(err);
            
            connection.query('SELECT ID, cat_name FROM categories', [], function(err, categories) {
                if (err) return next(err);

                connection.query('SELECT DISTINCT day FROM days', [], function(err, days) {
                    if (err) return next(err);
                    connection.query('SELECT DISTINCT product_name FROM product_sold', [], function(err, products) {
                        if (err) return next(err);

                        res.render( 'sales_history', {
                            sales_history : sales_history,
                            categories : categories,
                            days : days,
                            products: products
                        });
                    });
                });
            });
        });
	});
};

exports.show_purchase_history = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM purchase_history', [], function(err, results) {
        	if (err) return next(err);

                connection.query('SELECT shop FROM suppliers', [], function(err, supplier_names) {
                if (err) return next(err);
            		res.render( 'purchase_history', {
            			data : results,
            			administrator : administrator,
                        shops: supplier_names,
                        administrator : administrator
            		});
            });
        });
	});
};

exports.show_product_sold = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM product_sold', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'product_sold', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.show_categories = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT * FROM categories', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'categories', {
    			data : results,
    			administrator : administrator
    		});
      });
	});
};

exports.get_sales_history = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM sales_history WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('edit_sales_history',{page_title:"Edit Product",
							data : rows[0],
							layout : false,
                            administrator : administrator
            });      
		}); 
	});
};

exports.update_sales_history = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE sales_history SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err){
          			console.log("Error Updating : %s ",err );
			}
      		res.redirect('/sales_history');
		});
    		
    });
};

exports.get_categories = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('edit_categories',{page_title:"Edit Categories",
				data : rows[0],
				layout : false,
                administrator : administrator
            });      
		}); 
	});
};

exports.update_categories = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE categories SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err){
          			console.log("Error Updating : %s ",err );
			}
      		connection.query('UPDATE sales_history SET category_name=? WHERE cat_id = (SELECT ID FROM categories WHERE cat_name=?)', [data.cat_name, data.cat_name], function(err, rows){
            if (err){
                    console.log("Error Updating : %s ",err );
            }
                res.redirect('/categories');
            });
		});	
    });
};

exports.get_product_sold = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM product_sold WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('edit_product_sold',{page_title:"Edit Product Sold",
				data : rows[0],
				layout : false,
	            administrator : administrator
	        });      
		}); 
	});
};

exports.update_product_sold = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE product_sold SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err){
          			console.log("Error Updating : %s ",err );
			}
      		res.redirect('/product_sold');
		});
    });
};

exports.get_purchase_history = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM purchase_history WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('edit_purchase_history',{page_title:"Edit Purchase History",
				data : rows[0],
				layout : false,
                administrator : administrator
            });      
		}); 
	});
};

exports.update_purchase_history = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE purchase_history SET ? WHERE id = ?', [data, id], function(err, rows){
			if (err){
          			console.log("Error Updating : %s ",err );
			}
      		res.redirect('/purchase_history');
		});
    });
};

exports.add_sales_history = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    day : input.day,
                    date : input.date,
                    stock_item : input.stock_item,
                    no_sold : input.no_sold,
                    sales_price : "R"+input.sales_price,
                    category_name : input.category_name
            };
        connection.query('INSERT INTO sales_history SET ?, cat_id=(SELECT ID FROM categories WHERE cat_name=?)', [data, input.category_name], function(err, results) {
            if (err)
                console.log("Error inserting : %s ",err );

            connection.query('UPDATE product_sold SET no_sold=no_sold+? WHERE product_name=?', [input.no_sold, input.stock_item], function(err, results) {
                if (err)
                        console.log("Error inserting : %s ",err );
                
                res.redirect('/sales_history');
            });
        });
    });
};

exports.add_purchase_history = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    shop : input.shop,
                    date : input.date,
                    item : input.item,
                    quantity : input.quantity,
                    cost : "R"+input.cost,
                    total_cost: "R"+input.cost*input.quantity
            };
        connection.query('insert into purchase_history set ?, supplier_id=(SELECT id FROM suppliers WHERE shop=?)', [data, input.shop], function(err, results) {
                if (err)
                        console.log("Error inserting : %s ",err );
         
                res.redirect('/purchase_history');
            });
    });
};

exports.add_product_sold = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    product_name : input.product_name,
                    no_sold : input.no_sold,
            };
        connection.query('insert into product_sold set ?', data, function(err, results) {
                if (err)
                        console.log("Error inserting : %s ",err );
         
                res.redirect('/product_sold');
            });
    });
};

exports.add_categories = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    cat_name : input.cat_name,
                };
        connection.query('INSERT INTO categories (SELECT MAX(ID)+1, ?  FROM categories)', input.cat_name, function(err, results) {
                if (err)
                        console.log("Error inserting : %s ",err );
         
                res.redirect('/categories');
            });
    });
};

exports.delete_sales_history = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM sales_history WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/sales_history');
        });
    });
};

exports.delete_categories = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/categories');
        });
    });
};

exports.delete_product_sold = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM product_sold WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/product_sold');
        });
    });
};

exports.delete_purchase_history = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM purchase_history WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/purchase_history');
        });
    });
};

exports.add_all_suppliers = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
        var input = JSON.parse(JSON.stringify(req.body));

        var data = {
                    shop : input.shop
                };
        connection.query('insert into suppliers set ?', data, function(err, results) {
                if (err)
                        console.log("Error inserting : %s ",err );
         
                res.redirect('/all_suppliers');
            });
    });
};

exports.get_all_suppliers = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM suppliers WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.render('edit_all_suppliers',{page_title:"Edit Suppliers",
            	data : rows[0],
            	layout : false,
                administrator : administrator
            });      
        }); 
    });
};

exports.update_all_suppliers = function(req, res, next){

    var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.id;
        req.getConnection(function(err, connection){
            connection.query('UPDATE purchase_history SET ? WHERE shop = (SELECT shop FROM suppliers WHERE id = ?)', [data, id], function(err, rows){
                if (err){
                        console.log("Error Updating : %s ",err );
                }
                connection.query('UPDATE suppliers SET ? WHERE id = ?', [data, id], function(err, rows){
                    if (err){
                            console.log("Error Updating : %s ",err );
                    }
                    res.redirect('/all_suppliers');
                });
            });
    });
};

exports.delete_all_suppliers = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM suppliers WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("Error Selecting : %s ",err );
            }
            res.redirect('/all_suppliers');
        });
    });
};