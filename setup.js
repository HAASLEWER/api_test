// Creates the app database and seeds it
// Used with: npm setup
// MySQL connect helper module
var mysql = require('mysql');
var config = require('./config.js');
var fs = require('fs');
var _ = require('underscore');

// Connect to mysql server
var connection = mysql.createConnection({
  host     : config.mysql_host,
  user     : config.mysql_user,
  password : config.mysql_password,
  multipleStatements: true
});

// Execute the mysql backup and seed file
execFile("./db/schema.sql", function(err, res) {
    if (err) {
        console.log("\x1b[31m", err);
    } else {
        console.log("\x1b[32m", "Database and tables succcesfully created and seeded.");
    }

    process.exit();
});

// Function to execute the text extracted from the mysql file
function exec(sql, callback) {
    connection.query(sql, function (err, results) {
        if (!_.isArray(results)) {
            results = [results];
        }
        if (typeof callback === 'function') {
            callback(err, results);
        }
    });
    return this;
}

// Function to get text from the mysql file
function execFile(filename, callback) {
    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        exec(data, callback);
    });
    return this;
}

