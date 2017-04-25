// Authentication Middleware
var jwt = require('jsonwebtoken');

module.exports = function(app, cb) {
  // Route middleware to verify a token
  app.use(function(req, res, next) {
    // Check header/url parameters/post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Decode token
    if (token) {
      // Verify token
      jwt.verify(token, app.get('key'), function(err, decoded) {          
        if (err) {
          var err = {status: 403, message: 'Failed to authenticate token'}
          return res.status(403).send({ 
              err
          });   
        } else {
          // Save the decoded token to the req object so that it can be used on all routes
          req.decoded = decoded;            
          next();
        }
      });
    } else {
      // No token provided
      var err = {status: 403, message: 'No token provided'}
      return res.status(403).send({ 
          err
      });
    }
  });
}