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
 var locked = function(req, res, next){
 JSON.parse(JSON.stringify(req.body))
};

 var insertData = function(query, inputData, cb){
    connection.query(query, inputData, cb);
  }

   var postData = function(query, inputData, cb){
      connection.query(query, inputData, cb);
  };

this.promoteUser = function(inputData, cb){

        var sql = "UPDATE UserData SET ? WHERE username=?";
  		postData(sql, inputData, cb)
}

this.addUser = function(inputData, cb){
    if(input.password_confirm == input.password){
        var sql = 'SELECT * FROM UserData WHERE username = ?';
        getData(sql, inputData, cb)
    }
        if (results1.length == 0){
            bcrypt.hash(input.password,10, function(err, hash){
            data.password = hash
            var sql = 'insert into UserData set ?';
            insertData(sql, inputData, cb)
        }) 
    }     
};

this.authUser = function(inputData, cb){

    var sql = 'SELECT * FROM UserData WHERE username = ?'
    getData(sql, inputData.username, cb)
              
    if(counter == 3 ){

    var sql = 'UPDATE UserData SET locked = ? WHERE username = ?';
    postData(sql, inputData.username, cb)
    }
	 
	};
}