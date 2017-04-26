// Product Type Model
var mysql = require('../tools/mysql_connect.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Validator = require('jsonschema').Validator;
var _ = require('underscore');
var config = require('../../config.js');
var v = new Validator();

// Get all product types
exports.getAll = function(app, req, cb) {	
	var q = 'SELECT * FROM product_types';
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Return the result
		cb(null, 200, rows);
	});
}

// Get product type by id
exports.getById = function(app, req, cb) {	
	var id = req.params.id;

	var q = 'SELECT * FROM product_types WHERE id = ' + id;
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Return the result
		cb(null, 200, rows);
	});
}

// Get products by product type id
exports.getProducts = function(app, req, cb) {	
	var id = req.params.id;

	var q = 'SELECT * FROM products WHERE product_type_id = ' + id;
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Return the result
		cb(null, 200, rows);
	});
}