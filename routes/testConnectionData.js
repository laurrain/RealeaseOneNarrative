var mysql = require('mysql');

module.exports = function () {
  return mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '42926238',
          database : 'spaza_shop'
      });
};