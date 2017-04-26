# api_test

# Requirements
Git</br />
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