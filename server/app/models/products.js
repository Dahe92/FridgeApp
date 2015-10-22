// app/models/products.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our product model
var productSchema = mongoose.Schema({

        ean      : String,
        name     : String,
		mhd		 : [Number],
		category : String,
		tag		 : String,
		unit	 : String	
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Products', productSchema);