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

		describe('Get all product categories', function() {
			var url = "http://localhost:8080/product_categories?token=" + token_body.result.token;
			it("should return 200, and should include a category id in the first array element", function(done) {
				request(url, function(error, response, body) {					
					body = JSON.parse(body);								
					expect(response.statusCode).to.equal(200);
					expect(body.result[0]).to.have.property('id');
					existing_user = body.result[0];
					done();
				});
			});
		});	

		describe('Get all product types', function() {
			var url = "http://localhost:8080/product_types?token=" + token_body.result.token;
			it("should return 200, and should include a type id in the first array element", function(done) {
				request(url, function(error, response, body) {					
					body = JSON.parse(body);								
					expect(response.statusCode).to.equal(200);
					expect(body.result[0]).to.have.property('id');
					existing_user = body.result[0];
					done();
				});
			});
		});	

		describe('Get all products', function() {
			var url = "http://localhost:8080/products?token=" + token_body.result.token;
			it("should return 200, and should include a product id in the first array element", function(done) {
				request(url, function(error, response, body) {					
					body = JSON.parse(body);								
					expect(response.statusCode).to.equal(200);
					expect(body.result[0]).to.have.property('id');
					existing_user = body.result[0];
					done();
				});
			});
		});										

	});					 

});