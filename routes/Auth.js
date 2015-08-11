var mysql = require('mysql');
var bcrypt = require('bcrypt'); 

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'MysqlServer123'
});
var AuthDataService = require('./authData');
connection.connect();
connection.query('use spaza_shop');
var authData = new AuthDataService(connection);

exports.show_supplier_popular_product = function (req, res, next) {
    supplierData.show_supplier_popular_product
        supplierData.show_supplier_popular_product(function(err, results) {
            if (err) return next(err);

            res.render( 'supplier_popular_product', {
                data : results,
                administrator : administrator
            });
    });
};

exports.promoteUser = function(req, res, next){

    var input = JSON.parse(JSON.stringify(req.body))
        authData.promoteUser(function(err, results){
            if(err)
                console.log(err)

            res.redirect("/admin_panel")
        })
}

exports.addUser = function(req, res, next){
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
                    username : input.username,
                    password: input.password
            };

        if(input.username == undefined || input.password == undefined){

            return res.render("sign_up", {
                message : "Password or username can't be empty!",
                layout : false
            })

        }
        else if (input.password_confirm == input.password){

            bcrypt.hash(input.password, 10, function(err, hash){
                data.password = hash;

                authData.addUser(data, function(err, results) {
                    if (err)
                        console.log("[!] Error inserting : %s ",err );

                    if(results.affectedRows == 0){
                        res.render("sign_up", {
                                                message : "Username alredy exists!",
                                                layout : false
                                                })
                    }
                    else /*(results.length == 0)*/{
                            // bcrypt.hash(input.password,10, function(err, hash){
                            //     data.password = hash
                            //     connection.query('insert into users set ?', data, function(err, results) {
                            //         if (err)
                            //             console.log("[!] Error inserting : %s ",err );
                            //     })
                            // })
                        req.session.user = input.username;
                        administrator = false;
                        return res.redirect('/');
                    }
                });
            });
        }
        else{
            res.render("sign_up", {
                message : "Passwords don't match!",
                layout : false
            })
        }
}

exports.authUser = function(req, res, next){
    past_pages = [];
    var userData = JSON.parse(JSON.stringify(req.body)),
      user = userData.username,
      password = userData.password;
        
        authData.authUser(userData, function(err, results) {
            if (err) return next(err);

            if(results.length > 0){
                bcrypt.compare(password, results[0].password,  function(err, reply){
                    if(err)
                        console.log("[!] There was an error with bcrypt.compare() ", err);

                    if(reply && !results[0].locked){
                        counter = 0
                        req.session.user = results[0].username

                        administrator = results[0].admin

                        return res.redirect("/");
                    }
                    else{

                        counter++;
                        var msg = '';
                        if(counter == 3 || results[0].locked){

                            authData.lock(userData, function(err, results) {
                                if (err) return next(err);
                            
                                msg = "Your account has been blocked!";
                                return res.render("login", {
                                    message : msg,
                                    layout : false
                                });
                            });
                        }else{

                            return res.render("login", {
                                message : msg+"Username or password incorrect!",
                                layout : false
                            });
                        }
                    }
                });
            }
            else{
                counter = 0
                return res.render("login", {
                    message : "Username doesn't exist!",
                    layout : false
                });
            }
        });
   
}

exports.checkUser = function(req, res, next){
  if (req.session.user){
        return next();
  }else{
    res.redirect('/login');
  
}
}
