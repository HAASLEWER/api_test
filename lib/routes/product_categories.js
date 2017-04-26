// Product Categories Routes
var ProductCategories = require('../models/product_categories');

module.exports = function(app) {
/**
 * @api {get} /product_categories/ Get all product categories
 * @apiName GetProductCategories
 * @apiGroup ProductCategories
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of product categories.
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
	app.get('/product_categories',function(req, res) {
		ProductCategories.getAll(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});

/**
 * @api {get} /product_categories/:id Get product category by id
 * @apiName GetProductCategoriesByID
 * @apiGroup ProductCategories
 *
 * @apiParam {String} token The valid authentication token.
 *
 * @apiSuccess {Array} result Array of product categories.
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
	app.get('/product_categories/:id',function(req, res) {
		ProductCategories.getById(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});	


/**
 * @api {get} /product_categories/:id/product_types Get all product types for the category
 * @apiName GetProductTypesByCategoryID
 * @apiGroup ProductCategories
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
	app.get('/product_categories/:id/product_types',function(req, res) {
		ProductCategories.getProductTypes(app, req, function(err, code, result) {
			if (err) { 
		      return res.status(code || 400).send({ 
		          err 
		      });
			}

			return res.send({result: result});
		});		
	});	
}