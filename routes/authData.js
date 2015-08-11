module.exports = function (connection) {
var bcrypt = require('bcrypt');  
var counter = 0
var results = [];
var password;
var getData = function(query, inputData, cb){
      connection.query(query, inputData, cb);
  };
 var inputData = function(req, res, next){
 JSON.parse(JSON.stringify(req.body))
};

 var insertData = function(query, inputData, cb){
    connection.query(query, inputData, cb);
  }

   var postData = function(query, inputData, cb){
      connection.query(query, inputData, cb);
  };

this.promoteUser = function(inputData, cb){

<<<<<<< HEAD
        var sql = "UPDATE users SET ? WHERE username=?";
  		postData(sql, inputData, cb)
}

this.addUser = function(inputData, cb){
    if(input.password_confirm == input.password){
        var sql = 'SELECT * FROM users WHERE username = ?';
        getData(sql, inputData, cb)
    }
        if (results1.length == 0){
            bcrypt.hash(input.password,10, function(err, hash){
            data.password = hash
            var sql = 'insert into users set ?';
            insertData(sql, inputData, cb)
        }) 
    }     
=======
      var sql = "UPDATE users SET admin = ?, locked = ? WHERE username=?";
  		postData(sql, [inputData.admin, inputData.locked, inputData.username], cb)
}

this.addUser = function(inputData, cb){
    
    var sql = "INSERT INTO users(username, password) SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = ?) LIMIT 1;";
    insertData(sql, [inputData.username, inputData.password, inputData.username], cb)
>>>>>>> 73d9f569a6accfe37012a074b8c5c20365610906
};

this.authUser = function(inputData, cb){

    var sql = 'SELECT * FROM users WHERE username = ?'
    getData(sql, inputData.username, cb)
<<<<<<< HEAD
              
    if(counter == 3 ){

    var sql = 'UPDATE users SET locked = ? WHERE username = ?';
    postData(sql, inputData.username, cb)
    }
=======
>>>>>>> 73d9f569a6accfe37012a074b8c5c20365610906
	 
	};

this.lock = function(inputData, cb){

    var sql = 'UPDATE users SET locked = ? WHERE username = ?';
    postData(sql, [inputData.admin, inputData.username], cb)
  };
}