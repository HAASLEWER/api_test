var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan'); 
var fs 	= require("fs");
var config = require('./config'); 
    
var port = process.env.PORT || 8080; 
app.set('key', config.secret); 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable cross origin resource sharing, to avoid those nasty browser errors
app.use(cors());

// Disable loggin while running unit tests
if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('combined'));
}

var apiRoutes = express.Router(); 

// Unauthenticated routes

app.get('/',function(req, res) {
	res.send('server running...');
});	

require('./lib/routes/auth')(app);

// Authenticated routes

// Include our app midlleware to verify tokens on secured routes
require('./lib/tools/middleware')(app);

// Include all our routes from the routes dir
var routePath = "./lib/routes/"; 
fs.readdirSync(routePath).forEach(function(file) {
	if (file == 'auth.js') { return; } // Skip auth as it should be an unauthenticated route, we require it specifically above

    // Include routes in sub directories
	if (fs.lstatSync(routePath + file).isDirectory()) {
		fs.readdirSync(routePath + file).forEach(function(dir_file) {
		    var route = routePath + file + "/" + dir_file;
		    require(route)(app);
		});
	} else {
	    var route = routePath + file;
	    require(route)(app);
	}
});   

// go go go!
app.listen(port);
console.log('Listening on http://localhost:' + port);