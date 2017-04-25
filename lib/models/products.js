// Product Model
var mysql = require('../tools/mysql_connect.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Validator = require('jsonschema').Validator;
var _ = require('underscore');
var config = require('../../config.js');
var v = new Validator();

// Get all products
exports.getAll = function(app, req, cb) {	
	var q = 'SELECT * FROM products';
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Remove the password before returning the result
		rows = _.map(rows, function(o) { return _.omit(o, 'password'); });

		// Return the result
		cb(null, 200, rows);
	});
}

// Get products by id
exports.getById = function(app, req, cb) {	
	var id = req.params.id;

	var q = 'SELECT * FROM products WHERE id = ' + id;
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Remove the password before returning the result
		rows = _.map(rows, function(o) { return _.omit(o, 'password'); });

		// Return the result
		cb(null, 200, rows);
	});
}