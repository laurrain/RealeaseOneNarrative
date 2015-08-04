module.exports = function (connection) {
	this.promoteUser = function(params, cb){
		connection.query("UPDATE users SET ? WHERE username=?", [params, params.username], cb); 
	}

	this.addUser = function(params, cb){
		connection.query('INSERT INTO users (username, password) SELECT * FROM (SELECT ?,?) AS tmp WHERE NOT EXISTS (SELECT username FROM users WHERE username = ? ) LIMIT 1', [params.username, params.password, params.username], cb)
	}
}