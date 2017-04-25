// Product Routes
var Products = require('../models/products');

module.exports = function(app) {
/**
 * @api {get} /products/ Get all product types
 * @apiName GetProducts
 * @apiGroup Products
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
 *		         "name":"Monitor",
 *		         "product_type":"Computing", 
 *		      }
 *		   ]
 *		}
 *
 */		
	app.get('/products',function(req, res) {
		Products.getAll(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});

/**
 * @api {get} /products/:id Get product type by id
 * @apiName GetProductsByID
 * @apiGroup Products
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
 *		         "name":"Monitor",
 *		         "product_type":"Computing", 
 *		      }
 *		   ]
 *		}
 *
 */	
	app.get('/products/:id',function(req, res) {
		Products.getById(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});	
}