process.env.NODE_ENV = 'test';
var assert = require('assert');
var expect = require("chai").expect;
var request = require("request");
var config = require('../config.js');

var app = require('../index.js');

describe('Users', function() {
	var new_user = "";
	var existing_user = "";
	var url = "http://localhost:8080/auth";
	var json = {email: 'test@api.com', password: config.secret};
	var options = {
	  method: 'post',
	  body: json,
	  json: true,
	  url: url
	}

	// Get our token first
	request.post(options, function(token_error, token_response, token_body) {							

		describe('Get all users', function() {
			var url = "http://localhost:8080/users?token=" + token_body.result.token;
			it("should return 200, and should include a user id in the first array element", function(done) {
				request(url, function(error, response, body) {					
					body = JSON.parse(body);								
					expect(response.statusCode).to.equal(200);
					expect(body.result[0]).to.have.property('id');
					existing_user = body.result[0];
					done();
				});
			});
		});	

		describe('Create new user with invalid properties', function() {
			it("should return 400", function(done) {

				var url = "http://localhost:8080/users?token=" + token_body.result.token;
				var json = {identify: 'get rekt', name: ''};

				var options = {
				  method: 'post',
				  body: json,
				  json: true,
				  url: url
				}

				request.post(options, function(error, response, body) {							
					expect(response.statusCode).to.equal(400);				
					done();
				});
			});
		});

		describe('Create new user with valid properties', function() {
			it("should return 200 and inserted id", function(done) {

				var url = "http://localhost:8080/users?token=" + token_body.result.token;
				var json =  {
								"password": "1234",
								"firstname": "Jannie",
								"lastname": "Moolman",
								"email": "jannie@moolman.co.za",
							};			
				var options = {
				  method: 'post',
				  body: json,
				  json: true,
				  url: url
				}

				request.post(options, function(error, response, body) {										
					expect(response.statusCode).to.equal(200);	
					expect(body.result).to.have.property('id');
					new_user = body.result.id;								
					done();
				});
			});
		});	

		describe('Get user by id', function() {
			var url = "http://localhost:8080/users/" + new_user + "?token=" + token_body.result.token;
			it("should return 200 and include an id property", function(done) {
				request(url, function(error, response, body) {
					body = JSON.parse(body);								
					expect(response.statusCode).to.equal(200);
					expect(body.result[0]).to.have.property('id');
					done();
				});
			});
		});

		describe('Delete user by id', function() {
			it("should return 200", function(done) {

				var url = "http://localhost:8080/users/" + new_user + "?token=" + token_body.result.token;
				var options = {
				  method: 'delete',
				  body: '',
				  url: url
				}

				request.delete(options, function(error, response, body) {
					body = JSON.parse(body);												
					expect(response.statusCode).to.equal(200);									
					done();
				});
			});
		});					

	});					 

});