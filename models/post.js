var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auth');
var db = mongoose.connection;

var postSchema = mongoose.Schema({
	body : {
		type : String,
		index : true
	},
	category : {
		type : String
	},
	author : {
		type : String
	},
	title: {
		type : String
	},
	date: {
		type: String
	},
	foodPic: {
		type: String
	},
	price: {
		type: String
	},
	isSold: {
		type: String 
	},
	purchasedBy: {
		type: String
	},
	purchaserContact: {
		type: String
	}
});

var posts = module.exports = mongoose.model('post', postSchema);

module.exports.createPost = function(newPost, callback) {
    newPost.save(callback);
}