# api_test

# Requirements
MySQL ~5.7<br />
Node.JS ~7.7.1<br />
	- NPM ~4.1.2<br />
Tested on Ubuntu 16.04<br />

# DB Installation
// If you have an existing mysql installation you can change the mysql credentails in the config.js file.<br />
// Alternatively find the MySQL installation instructions below.<br />
# MySQL Installation instructions for Ubuntu
// Ensure your OS is up to date<br />
sudo apt-get update<br />
// Install MySQL Server<br />
sudo apt-get install mysql-server<br />
// Run the mysql secure installation script<br />
sudo mysql_secure_installation<br />
// Root Password: super_secure_1234<br />
// Accept the defaults for the rest of the prompts EXCEPT the one asking if you would like to change the root password.<br />
// Grant remote access for the root user<br />
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'super_secure_1234' WITH GRANT OPTION;<br />
*** Please note I opted to use the root user to simplify the setup instructions, I would never do this in production <br /> 
<br />

# API Installation
npm install<br />
npm setup<br />
npm test<br />
npm start<br />