var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


mongoose.connect('mongodb://localhost/auth');

var db = mongoose.connection;


//User schema - Each schema maps to a MongoDB collection and defines 
//the shape of the documents within that collection.

var userSchema = mongoose.Schema({
	name : {
		type : String,
		index : true
	},
	address : {
		type : String
	},
	phone : {
		type : String
	},
	email : {
		type : String
	},
	password: {
		type: String
	},
	certifiation: {
        type: String
	}
});

//Sets up the database on my local computer
//mongoose automatically looks for the PLURAL of the collection model. eg. 'Users'
var User = module.exports = mongoose.model('User', userSchema); 

//Available to files which export this one
module.exports.createUser = function(newUser, callback) {
    //We will use async bcrypting (taken from example bcrypt)
    bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
    		    newUser.password = hash; //hashed password before saving
    		    newUser.save(callback);
    	});
    });
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {name: username};
	User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
};



module.exports.comparePassword = function(passwordAttempt, hash, callback) {
	// Load hash from your password DB.
    bcrypt.compare(passwordAttempt, hash, function(err, res) {
        callback(null, res);
        //res will store if its matched or not
    });
};


