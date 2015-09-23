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

      var sql = "UPDATE UserData SET admin = ?, locked = ? WHERE username=?";
  		postData(sql, [inputData.admin, inputData.locked, inputData.username], cb)
}

this.addUser = function(inputData, cb){
    
    var sql = "INSERT INTO UserData(username, password) SELECT * FROM (SELECT ?, ?) AS tmp WHERE NOT EXISTS (SELECT username FROM UserData WHERE username = ?) LIMIT 1;";
    insertData(sql, [inputData.username, inputData.password, inputData.username], cb)
};

this.authUser = function(inputData, cb){

    var sql = 'SELECT * FROM UserData WHERE username = ?'
    getData(sql, inputData.username, cb)

              
    if(counter == 3 ){

    var sql = 'UPDATE UserData SET locked = ? WHERE username = ?';
    postData(sql, inputData.username, cb)
    }


	 
	};

this.lock = function(inputData, cb){

    var sql = 'UPDATE UserData SET locked = ? WHERE username = ?';
    postData(sql, [inputData.admin, inputData.username], cb)
  };
}