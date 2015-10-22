// app/models/fridge.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our fridge model
var fridgeSchema = mongoose.Schema({

        owner     : String,
		name	  : String
		
});

// methods ======================
// generating a hash

// create the model for fridge and expose it to our app
module.exports = mongoose.model('Fridge', fridgeSchema);

