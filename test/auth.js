process.env.NODE_ENV = 'test';
var assert = require('assert');
var expect = require("chai").expect;
var request = require("request");
var config = require('../config.js');

var app = require('../index.js');

describe('Auth', function() {

	describe('Check if server is running', function() {
		var url = "http://localhost:8080/status";
		it("returns status 200", function(done) {
			request(url, function(error, response, body) {				
				expect(response.statusCode).to.equal(200);
				done();
			});
		});
	});

	describe('Access secured route without token', function() {
		var url = "http://localhost:8080/users";
		it("should block access to secured route without token", function(done) {
			request(url, function(error, response, body) {
				body = JSON.parse(body);								
				expect(response.statusCode).to.equal(403);
				done();
			});
		});
	}); 

	describe('Access secured route with invalid token', function() {
		var url = "http://localhost:8080/device?token=eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0";
		it("should block access with invalid token", function(done) {
			request(url, function(error, response, body) {
				body = JSON.parse(body);
				expect(response.statusCode).to.equal(403);
				done();
			});
		});
	});

	describe('Request token with invalid payload', function() {
		it("should not issue token with malformed properties", function(done) {

			var url = "http://localhost:8080/auth";
			var json = {emal: 'jannie', password: 'moolman'};
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

	describe('Request token with valid payload but invalid credentials', function() {
		it("should not issue token with invalid credentials", function(done) {

			var url = "http://localhost:8080/auth";
			var json = {email: 'fake@fake.com', password: '1234'};
			var options = {
			  method: 'post',
			  body: json,
			  json: true,
			  url: url
			}

			request.post(options, function(error, response, body) {							
				expect(response.statusCode).to.equal(403);				
				done();
			});
		});
	});		

	describe('Request token with valid payload and valid credentials', function() {
		it("should return token", function(done) {

			var url = "http://localhost:8080/auth";
			var json = {email: 'test@api.com', password: config.secret};
			var options = {
			  method: 'post',
			  body: json,
			  json: true,
			  url: url
			}

			request.post(options, function(error, response, body) {										
				expect(body.result.message).to.not.equal(null);				
				done();
			});
		});
	});		

	describe('Request valid token and access secured route successfully', function() {
		it("should return 200", function(done) {

			var url = "http://localhost:8080/auth";
			var json = {email: 'test@api.com', password: config.secret};
			var options = {
			  method: 'post',
			  body: json,
			  json: true,
			  url: url
			}

			request.post(options, function(error, response, body) {					
				var url = "http://localhost:8080/users?token=" + body.result.token;	
				request(url, function(dev_error, dev_response, dev_body) {						
					expect(dev_response.statusCode).to.equal(200);				
					done();
				});								
			});
		});
	});			 
});

