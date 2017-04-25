// User Model
var mysql = require('../tools/mysql_connect.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Validator = require('jsonschema').Validator;
var _ = require('underscore');
var config = require('../../config.js');
var v = new Validator();

// Get all users
exports.getAll = function(app, req, cb) {	
	var q = 'SELECT * FROM users';
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Remove the password before returning the result
		rows = _.map(rows, function(o) { return _.omit(o, 'password'); });

		// Return the result
		cb(null, 200, rows);
	});
}

// Get user by id
exports.getById = function(app, req, cb) {	
	var id = req.params.id;

	var q = 'SELECT * FROM users WHERE id = ' + id;
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb({message: err}, 500, null); return; };

		// Remove the password before returning the result
		rows = _.map(rows, function(o) { return _.omit(o, 'password'); });

		// Return the result
		cb(null, 200, rows);
	});
}

// Create a new user
exports.create = function(app, req, cb) {	
	// Get the submitted user fields
	var payload = req.body;
	
	// Validate that the correct fields have been submitted uhm correctly...
	var schema = {
		"id": "user_schema",
		"type": "object",
		"properties": {
			"password": {"type": "string", "minLength": 1},
			"firstname": {"type": "string", "minLength": 1},
			"lastname": {"type": "string", "minLength": 1},
			"email": {"type": "string", "minLength": 1},
		},
		"required": ["password", "firstname", "lastname", "email"]
	};

	var validator = v.validate(payload, schema);

	if (validator.errors.length > 0) {
		// Validation failed there is an error in the submitted payload
		// Return the error along with the HTTP status code
		cb({message: validator.errors}, 400, null);
		return;
	} else {
		// Hash the password
		bcrypt.hash(payload.password, 10, function(err, hash) {
 			payload.password = hash;

 			// Insert the hashed password along with the other fields into the database
			mysql.query('INSERT INTO users SET ?', payload, function(err, rows, fields) {																	
				if (err) { cb({message: err}, 500, null); return; };

				// Get the inserted user, to be returned to the client
				getUser(rows.insertId, function(err, result) {
					// Remove the password field
					delete result.password;

					// Retuen the result
					cb(null, 200, result);
				});
			});
		});
	}
}

// Update a user
exports.update = function(app, req, cb) {
	// Get the id from the url parameter
	var id = req.params.id;	
	// Get the submitted payload
	var payload = req.body;
	
	// Verify that the correct fields were submitted
	var schema = {
		"id": "user_schema",
		"type": "object",
		"properties": {
			"password": {"type": "string", "minLength": 1},
			"firstname": {"type": "string", "minLength": 1},
			"lastname": {"type": "string", "minLength": 1},
			"email": {"type": "string", "minLength": 1},
		},
		"required": []
	};

	var validator = v.validate(payload, schema);

	if (validator.errors.length > 0) {
		// Validation failed there is an error in the submitted payload
		// Return the error along with the HTTP status code
		cb({message: validator.errors}, 400, null);
		return;
	} else {
		// Hash the password
		bcrypt.hash(payload.password, 10, function(err, hash) {
 			payload.password = hash;

 			// Update the record in the db
			mysql.query('UPDATE users SET ? WHERE id = ' + id, payload, function(err, rows, fields) {																	
				if (err) { cb({message: err}, 500, null); return; };

				// Get the user from the db, to be returned to the client
				getUser(id, function(err, result) {
					// Delete the password field, before returning the result
					delete result.password;

					// Return the result
					cb(null, 200, result);
				});
			});
		});
	}
}

// Get user by id from db
function getUser(id, cb) {
	var q = 'SELECT * FROM users WHERE id = ' + id;
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb(err, null); return; };

		cb(null, rows[0]);
	});	
}

// Delete a user by id
exports.delete = function(req, cb) {
	var id = req.params.id;
	var q = 'DELETE FROM users WHERE id = ' + id;
	mysql.query(q, function(err, rows, fields) {		
		if (err) { cb({message: err}, 500, null); return; };
		
		cb(null, 200, rows);
	});
}