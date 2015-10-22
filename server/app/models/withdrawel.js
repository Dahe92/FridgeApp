// app/models/withdrawel.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our fridge model
var withdrawelSchema = mongoose.Schema({

        fridge_id     :  String,
		ean			  : String,
		mhddelta	  : [{daysRemaining: Number,buyDate: Date}],
		countspoiled  : [Number]
		
});

// methods ======================
// generating a hash

// create the model for Withdrawel and expose it to our app
module.exports = mongoose.model('Withdrawel', withdrawelSchema);

