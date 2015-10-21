// config/passport.js

// load up the user model
var User            = require('../app/models/users.js');

// expose this function to our app using module.exports
module.exports = function(passport,BasicStrategy,bcrypt) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // Check Credentials========================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

	passport.use(new BasicStrategy(
		function(username, password, done) {
			User.findOne({ username : username }, function (err, user) {
				if (err) { 
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				bcrypt.compare(password, user.password, function(err, res) {
					if (err) { return done(null, false); }
					return done(null, user);
				});		
			});
		}
	));
};
