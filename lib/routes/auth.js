// Auth Routes
var Auth = require('../models/auth');

module.exports = function(app) {
	/**
	 * @api {post} /auth/ Authenticate a user
	 * @apiName Authenticate
	 * @apiGroup Auth
	 *
	 * @apiParam {String} email User email address.
	 * @apiParam {String} password User password.
	 *
	 * @apiSuccess {String} token  The authenticated token that must accompany every request. 
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *		  result: {
	 *		 	"token": "eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0"	
	 *		  }
	 *     }
	 *
	 * @apiError AuthFailed The user could not be authenticated.
	 *
	 * @apiErrorExample Error-Response:
	 *     HTTP/1.1 403 Forbidden
	 *     {
	 *       "err": {
	 *		 	"message": "User could not be authenticated"
	 *		 }
	 *     }
	*/
	app.post('/auth',function(req, res) {
		Auth.authenticate(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});
	});	
}