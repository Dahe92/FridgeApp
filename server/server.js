// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = 80;
var mongoClient  = require('mongodb').MongoClient;

var $        = require('jquery')(require("jsdom-no-contextify").jsdom().parentWindow);

var http     = require('http');
var passport = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//var configDB = require('./config/database.js');

// configuration ===============================================================
try{
var url = 'mongodb://localhost:27017/fridgeApp' // connect to our database
mongoClient.connect(url, function (err,db){
	console.log("Connected correctly to server!");
});
}
catch(err){console.log('error: '+err)}
// require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./app/routes.js')(app,$,http); // load ourroutes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

