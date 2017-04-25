// User Routes
var Users = require('../models/users');

module.exports = function(app) {
/**
 * @api {get} /users/ Get all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{  
 *		   "result":[  
 *		      {  
 *		         "id":1,
 *		         "firstname":"Lehan",
 *		         "lastname":"Coetzee",
 *		         "email":"coetzeel@live.co.za",
 *		      }
 *		   ]
 *		}
 *
 */		
	app.get('/users',function(req, res) {
		Users.getAll(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});

/**
 * @api {get} /users/:id Get user by id
 * @apiName GetUserByID
 * @apiGroup Users
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{  
 *		   "result":[  
 *		      {  
 *		         "id":1,
 *		         "firstname":"Lehan",
 *		         "lastname":"Coetzee",
 *		         "email":"coetzeel@live.co.za",
 *		      }
 *		   ]
 *		}
 *
 */	
	app.get('/users/:id',function(req, res) {
		Users.getById(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});	

/**
 * @api {post} /user Add a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *			"password": "1234",
 *			"firstname": "Jannie",
 *			"lastname": "Moolman",
 *			"email": "jannie@moolman.co.za",
 *     }
 *
 * @apiParam {String} token The valid authentication token.
 * @apiParam {String} password The user's password.
 * @apiParam {String} firstname The user's firstname. 
 * @apiParam {String} lastname The user's lastname.  
 * @apiParam {String} email The user's email address.    
 *
 * @apiSuccess {Object} result The data saved to the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{
 *			"result": {
 *				"firstname": "Jannie",
 *				"lastname": "Moolman",
 *				"email": "jannie@moolman.co.za",
 *			}
 *		}
 *
 * @apiError InvalidPayload The specified payload is incorrect.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 
 *		{  
 *		   "err":{  
 *		      "message":[  
 *		         {  
 *		            "property":"instance",
 *		            "message":"requires property \"first_name\"",
 *		            "schema":"user_schema",
 *		            "instance":{  
 *		               "password":"1234",
 *		               "lastname":"Moolman",
 *		               "email":"jannie@moolman.co.za",
 *		            },
 *		            "name":"required",
 *		            "argument":"first_name",
 *		            "stack":"instance requires property \"first_name\""
 *		         }
 *		      ]
 *		   }
 *		}
 */	
	app.post('/users',function(req, res) {
		Users.create(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});
	});	

/**
 * @api {put} /user/:id Update a user
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiExample Example usage:
 *
 *     body:
 *     {
 *			"password": "1234",
 *			"firstname": "Jannie",
 *			"lastname": "Moolman",
 *			"email": "jannie@moolman.co.za",
 *     }
 *
 * @apiParam {String} token The valid authentication token.
 * @apiParam {String} password The user's password.
 * @apiParam {String} firstname The user's firstname. 
 * @apiParam {String} lastname The user's lastname.  
 * @apiParam {String} email The user's email address.   
 *
 * @apiSuccess {Object} result The data saved to the database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{
 *			"result": {
 *				"firstname": "Jannie",
 *				"lastname": "Moolman",
 *				"email": "jannie@moolman.co.za",
 *			}
 *		}
 *
 * @apiError InvalidPayload The specified payload is incorrect.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 
 *		{  
 *		   "err":{  
 *		      "message":[  
 *		         {  
 *		            "property":"instance",
 *		            "message":"requires property \"firstname\"",
 *		            "schema":"user_schema",
 *		            "instance":{  
 *		               "password":"1234",
 *		               "firstname":"Jannie",
 *		               "lastname":"Moolman",
 *		               "email":"jannie@moolman.co.za",
 *		            },
 *		            "name":"required",
 *		            "argument":"firstname",
 *		            "stack":"instance requires property \"firstname\""
 *		         }
 *		      ]
 *		   }
 *		}
 */	
	app.put('/users/:id',function(req, res) {
		Users.update(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});
	});

/**
 * @api {delete} /users/:id Delete a user
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id The user id. 
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Boolean} success Whether the request was successful.
 * @apiSuccess {Array} result Database result.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": 
 * 				{
 *				"fieldCount": 0
 *				"affectedRows": 1
 *				"insertId": 0
 *				"serverStatus": 2
 *				"warningCount": 0
 *				"message": ""
 *				"protocol41": true
 *				"changedRows": 0
 * 				}
 *     }
 *
 */	
	app.delete('/users/:id', function(req, res) {		
		Users.delete(req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});
	});				
}