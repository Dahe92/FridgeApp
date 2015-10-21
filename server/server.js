// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = 80;
var mongoose  = require('mongoose');

var $        = require('jquery')(require("jsdom-no-contextify").jsdom().parentWindow);

var http     = require('http');
var passport = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var User            = require('./app/models/users.js');
var bcrypt   		= require('bcrypt');
var BasicStrategy = require('passport-http').BasicStrategy;

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url);

 require('./config/passport')(passport,BasicStrategy,bcrypt); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// routes ======================================================================
require('./app/routes.js')(app,passport,$,http,bcrypt,User); // load ourroutes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

