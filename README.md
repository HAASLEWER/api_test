# api_test

# Requirements
Git</br />
MySQL ~5.7<br />
Node.JS 7.7.1 // Bcrypt can be finicky about the version so best to use this version of node, use nvm it will change your life ;)<br />
	- NPM ~4.1.2<br />
Tested on Ubuntu 16.04<br />

# API Installation
1.  Clone this repo
git clone git@github.com:HAASLEWER/api_test.git
2. Insert your mysql credentials in the config.js file in the project root
3. Install dependencies
npm install<br />
4. Create, populate and seed DB
npm run setup<br />
5. Run unit tests, make sure all tests pass
npm test<br />
6. Run the API and Web App
npm start<br />
7. Go to [server_ip]:8080 in your browser to login eg. localhost:8080
8. Email: test@api.com, Password: $*r3*tMFz:!z7eZX 