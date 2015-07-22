past_pages = [],
administrator = false,
last_page = "",
counter = 0;

exports.adminPanel = function(req, res, next){

    req.getConnection(function(err, connection){
        if(err)
            return next(err);

        connection.query("SELECT username, admin, locked FROM users WHERE NOT username = ?", req.session.user, function(err, data){
            if(err)
                console.log("[!] Error requesting adminPanel data from database:\n\t%s", err);


            res.render("admin_panel",
                {data : data,
                administrator : administrator
            })
        })
    })
};

//Total number of WEEDAYS
//SELECT day, SUM(1) as freq FROM (SELECT DISTINCT date, day FROM (SELECT date,day, stock_item, SUM(no_sold) AS no_sold, CAST(SUBSTR(sales_price, 2) AS DECIMAL(53,2)) AS sales_price FROM sales_history GROUP BY day, stock_item, date) AS stuff GROUP BY date, day) AS date_days GROUP BY day

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
                            products: products,
                            administrator : administrator
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
    				console.log("[!] Error Selecting : %s ",err );
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
          			console.log("[!] Error Updating : %s ",err );
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
    				console.log("[!] Error Selecting : %s ",err );
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
          			console.log("[!] Error Updating : %s ",err );
			}
      		connection.query('UPDATE sales_history SET category_name=? WHERE cat_id = (SELECT ID FROM categories WHERE cat_name=?)', [data.cat_name, data.cat_name], function(err, rows){
            if (err){
                    console.log("[!] Error Updating : %s ",err );
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
    				console.log("[!] Error Selecting : %s ",err );
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
          			console.log("[!] Error Updating : %s ",err );
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
    				console.log("[!] Error Selecting : %s ",err );
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
          			console.log("[!] Error Updating : %s ",err );
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
                console.log("[!] Error inserting : %s ",err );

            connection.query('UPDATE product_sold SET no_sold=no_sold+? WHERE product_name=?', [input.no_sold, input.stock_item], function(err, results) {
                if (err)
                        console.log("[!] Error inserting : %s ",err );
                
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
                        console.log("[!] Error inserting : %s ",err );
         
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
                        console.log("[!] Error inserting : %s ",err );
         
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
                        console.log("[!] Error inserting : %s ",err );
         
                res.redirect('/categories');
            });
    });
};

exports.delete_sales_history = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('DELETE FROM sales_history WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("[!] Error Selecting : %s ",err );
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
                    console.log("[!] Error Selecting : %s ",err );
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
                    console.log("[!] Error Selecting : %s ",err );
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
                    console.log("[!] Error Selecting : %s ",err );
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
                        console.log("[!] Error inserting : %s ",err );
         
                res.redirect('/all_suppliers');
            });
    });
};

exports.get_all_suppliers = function(req, res, next){
    var id = req.params.id;
    req.getConnection(function(err, connection){
        connection.query('SELECT * FROM suppliers WHERE id = ?', [id], function(err,rows){
            if(err){
                    console.log("[!] Error Selecting : %s ",err );
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
                        console.log("[!] Error Updating : %s ",err );
                }
                connection.query('UPDATE suppliers SET ? WHERE id = ?', [data, id], function(err, rows){
                    if (err){
                            console.log("[!] Error Updating : %s ",err );
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
                    console.log("[!] Error Selecting : %s ",err );
            }
            res.redirect('/all_suppliers');
        });
    });
};