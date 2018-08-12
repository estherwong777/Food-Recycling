var express = require('express');
var router = express.Router();
var posts = require('../models/post');

//var posts = this.Post.PostDB;

/* GET home page. */
router.get('/', isAuth, function(req, res, next) {
	posts.find({}, function(err, posts) {
		res.render('index', { posts: posts, title: 'Home' });
	});
});


function isAuth(req, res, next) {
	//Ensure you can only access homepage if logged in
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;
