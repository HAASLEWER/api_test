// Product Type Routes
var ProductTypes = require('../models/product_types');

module.exports = function(app) {
/**
 * @api {get} /product_types/ Get all product types
 * @apiName GetProductTypes
 * @apiGroup ProductTypes
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of product types.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{  
 *		   "result":[  
 *		      {  
 *		         "id":1,
 *		         "name":"Computing",
 *		      }
 *		   ]
 *		}
 *
 */		
	app.get('/product_types',function(req, res) {
		ProductTypes.getAll(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});

/**
 * @api {get} /product_types/:id Get product type by id
 * @apiName GetProductTypesByID
 * @apiGroup ProductTypes
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of product types.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *		{  
 *		   "result":[  
 *		      {  
 *		         "id":1,
 *		         "name":"Computing",
 *		      }
 *		   ]
 *		}
 *
 */	
	app.get('/product_types/:id',function(req, res) {
		ProductTypes.getById(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});	
}