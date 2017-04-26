// Auth Model
var mysql = require('../tools/mysql_connect.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../../config.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();

// Authenticates a user based on username and password
exports.authenticate = function(app, req, cb) {
	// Get the credentials from the POST request
	var email = req.body.email;
	var password = req.body.password;  

	// Validate the email and password
	var schema = {
		"id": "auth_schema",
		"type": "object",
		"properties": {
			"email": {"type": "string", "minLength": 1},
			"password": {"type": "string", "minLength": 1},
		},
		"required": ["email", "password"]
	};

	var validator = v.validate(req.body, schema);

	// If validation fails return the HTTP error code along with the error
	if (validator.errors.length > 0) {		
		cb({message: validator.errors}, 400, null);
		return;
	}

	// Validation passed, check if there is a corresponding user in the database
	var q = 'SELECT * FROM users WHERE email = "' + email + '"';
	mysql.query(q, function(err, rows, fields) {
		if (err) { cb(err, null); return;}

		if (rows.length < 1 ) {	
			// No match found, return the error to the client	
			cb({message: "User could not be authenticated"}, 403, null);
			return;
		} else {
			// Matching record found, verify that the password provided matches the hash in the db
			var hash = rows[0].password;
			
			bcrypt.compare(password, hash, function(err, result) {
				if (result == true) {
					// The password matches the one in the database
					var user = {
									id: rows[0].id,  
									firstname: rows[0].firstname, 
									lastname: rows[0].last_name, 
									email: rows[0].email, 
								};

					// Issue a new token
			        var token = jwt.sign(user, app.get('key'), {
			          expiresIn: 10800 // 3 hours
			        });					
			        	
			        // User has been verified return the token to the user with HTTP success code	
					cb(null, 200, {'token': token});
					return;
				} else {
					// The password provided does not match the hash in the db, return error and error code
					cb({message: "User could not be authenticated"}, 403, null);
					return;
				}
			});
		}

	});
}