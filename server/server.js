// server.js

// set up ======================================================================
// get all the tools we need
var port    		= 80;

var http     		= require('http');
var bcrypt   		= require('bcrypt');
var express  		= require('express');
var mongoose  		= require('mongoose');
var passport 		= require('passport');
var BasicStrategy 	= require('passport-http').BasicStrategy;
var morgan       	= require('morgan');
var bodyParser   	= require('body-parser');
var $        		= require('jquery')(require("jsdom-no-contextify").jsdom().parentWindow);

// load all models
var User			= require('./app/models/users.js');
var Product			= require('./app/models/products.js');
var Fridge			= require('./app/models/fridge.js');
var FridgeContent	= require('./app/models/fridge_content.js');
var Withdrawel		= require('./app/models/withdrawel.js');
var Reports			= require('./app/models/reports.js');

// https stuff
// var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

// configuration ===============================================================
var configDB = require('./config/database.js');
var app      		= express();

mongoose.connect(configDB.url);

 require('./config/passport')(passport,BasicStrategy,bcrypt); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms

// routes ======================================================================
require('./app/routes.js')(app,passport,$,http,bcrypt,User,Product,Fridge,FridgeContent,Withdrawel,Reports); // load ourroutes and pass in our app and fully configured passport

// launch ======================================================================
http.createServer(app).listen(port);
//var httpsServer = https.createServer(credentials, app).listen(443);
console.log('The magic happens on port ' + port);

