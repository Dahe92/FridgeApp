// app/models/fridge_content.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our fridge model
var contentSchema = mongoose.Schema({

        fridge_id	: String,
		ean			: String,
		name		: String,
		mhd			: Date,
		category	: String,
		tags		: String,
		buydate		: Date,
		amount		: Number,
		stats		: Boolean		
});

// methods ======================
// generating a hash

// create the model for fridgeContent and expose it to our app
module.exports = mongoose.model('FridgeContent', contentSchema);

