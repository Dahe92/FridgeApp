// app/models/user.js
// load the things we need
var mongoose = require('mongoose');


// define the schema for our user model
var userSchema = mongoose.Schema({

        username     : String,
        password     : String
    
});

// methods ======================
// generating a hash

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
