
module.exports = function(connect){
    var bcrypt = require('bcrypt'); 

    var res = function(err, results){
        var input = JSON.parse(JSON.stringify(req.body))

        req.getConnection(function(err, connection){
        if (err)
            return next(err);
            if(err)
                console.log(err)

            res.redirect("/admin_panel")
        });

    var precond =  req.getConnection(function(err, connection){
        if (err){ 
            return next(err);
        }
        
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
            query
        }

    var res = function(err, results1) {
                    if (err)
                            console.log("[!] Error inserting : %s ",err );

                if (results1.length == 0){
                        bcrypt.hash(input.password,10, function(err, hash){
                            data.password = hash
                            connection.query('insert into UserData set ?', data, function(err, results) {
                                if (err)
                                    console.log("[!] Error inserting : %s ",err );
                            })
                        })
                    
                    req.session.user = input.username;
                    administrator = false;
                    res.redirect('/');
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
    };

    var userData = function(query, res){
        connection.query(query,res)
    };
    

} 

var res = function(err, results) {
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

                            connection.query('UPDATE UserData SET locked = ? WHERE username = ?', [true,user], function(err, results) {
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
    };

this.promoteUser = function(res){

        userData("UPDATE UserData SET ? WHERE username=?", [input, input.username],res)
}

this.addUser = function(res){
   
            userData('SELECT * FROM UserData WHERE username = ?', input.username, res);
}

this.authUser = function(res){
    
        userData('SELECT * FROM UserData WHERE username = ?', user,res)
}

exports.checkUser = function(req, res, next){
  if (req.session.user){
    	return next();
  }else{
    // the user is not logged in redirect him to the login page-
    res.redirect('/login');
  }
};
