var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var Post = require('../models/post');

var sellerName = null;

router.get('/sellFoods', isAuth, function(req, res, next) {
	sellerName = req.user.name;
	res.render('sellFoods', {
		title : 'sellFoods'
	});

});

function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}


router.post('/sellFoods', upload.single('foodPic'), function(req, res, next) {
	var body = req.body.body;
    var category = req.body.category;
    var author = sellerName;
    var title = req.body.title;
    var date = new Date();
    var foodPic = req.body.foodPic

    var newPost = new Post({
        body: body,
        category: category,
        author: author,
        title: title,
        date: date,
        foodPic: foodPic
    });

    Post.createPost(newPost, function(err, post) {
    	if (err) throw err;
 //    	req.flash('success', 'Food has successfully been posted.');
        res.location('/');
        res.redirect('/');
    });

});

module.exports = router;

