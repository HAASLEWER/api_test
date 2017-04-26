# api_test

# Requirements
Git<br />
MySQL ~5.7<br />
Node.JS 7.7.1 // Bcrypt can be finicky about the version so best to use this version of node, use nvm it will change your life ;)<br />
	- NPM ~4.1.2<br />
Tested on Ubuntu 16.04<br />

# API Installation
1.  Clone this repo<br />
git clone git@github.com:HAASLEWER/api_test.git<br />
2. Insert your mysql credentials in the config.js file in the project root<br />
3. Install dependencies<br />
npm install<br />
4. Create, populate and seed DB<br />
npm run setup<br />
5. Run unit tests, make sure all tests pass<br />
npm test<br />
6. Run the API and Web App<br />
npm start<br />
7. Go to [server_ip]:8080 in your browser to login eg. localhost:8080<br />
8. Email: test@api.com, Password: $*r3*tMFz:!z7eZX <br />

# Project Description
A basic system that demonstrates a Node.js API and Angular Material as a front-end.  The application has a hierarchy in the left side bar that contains Product Categories > Product Types.  After opening a Product Category and clicking on a Product Type, the Products that are assigned to the category and type are displayed in the lower portion of the sidebar.  Clicking on a Product opens a sales graph on the right in the main content area.

The API consists of four models namely:
Auth: The authentication, model, routes and middleware allowing users to register, login and maintain session information through the authentication middleware.
Users: Includes the user models and routes allowing a client to creat, update, view and delete users.
Product Categories: The top layer of Product i.e Computing.
Product Types: The link between the Product Category and Product i.e Monitors.
Products: The actual Products that are part of a type and category i.e Samsung Monitor.

The API uses JSON Web Tokens(JWT) to issue authentication tokens.  JWT was chosen because it provides a secure and simple way to encode and decode tokens whilst keeping the state information encrypted inside the token allowing you to create stateless applications easily.

Unit Tests are also included for all models to ensure everything is functional before starting the application and makes it easy to scale to continuous integration/deployment environments.

# Data Model
![alt text](https://raw.githubusercontent.com/HAASLEWER/api_test/master/db/api_data_model.png)
