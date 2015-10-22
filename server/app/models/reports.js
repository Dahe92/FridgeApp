// app/models/reports.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our fridge model
var reportsSchema = mongoose.Schema({
		username	: String,
		ean			: String,
		comment		: String
});

// methods ======================
// generating a hash

// create the model for fridgeContent and expose it to our app
module.exports = mongoose.model('Reports', reportsSchema);