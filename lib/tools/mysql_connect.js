// MySQL connect helper module
var mysql = require('mysql');
var config = require('../../config.js');

// Connect to mysql server
var connection = mysql.createConnection({
  host     : config.mysql_host,
  user     : config.mysql_user,
  password : config.mysql_password,
  database : config.mysql_db
});

module.exports = connection;