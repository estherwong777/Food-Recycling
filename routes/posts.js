var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});
var posts = require('../models/post');
var users = require('../models/user');

var sellerName = null;

router.get('/show/:id', isAuth, function(req, res, next) {
    var currPost = {};
    var producer = {};

    posts.findOne({_id: req.params.id}, function(err, post) {
        if (err) throw err;
        users.findOne({name: post.author}, function(err, user) {
            if (err) throw err;
            res.render('showPost', {title: 'showPost', 
                post: post, producer: user});

      });
    }); 
});
router.get('/sellFoods', isAuth, function(req, res, next) {
	sellerName = req.user.name;
	res.render('sellFoods', {
		title : 'sellFoods'
	});
});

router.get('/myfoods', isAuth, function(req, res, next) {

    posts.find({"author" : req.user.name}, function(err, posts) {
        res.render('myfoods', {
        posts: posts,
        name : req.user.name,
        date: new Date(),
        title: 'myfoods'
        });
    });
});

router.post('/delete/:id', function(req, res) {
    posts.deleteOne({_id: req.params.id}, function(err, post) {
        if (err) throw err;
        req.flash('success', 'Successfully deleted');
        res.redirect('/posts/myfoods');
    });

});



router.get('/:category', isAuth, function(req,res,next) {
    posts.find({"category" : req.params.category}, function(err, posts) {
            res.render('./', {
            posts: posts,
            title: 'categories',
            cat: req.params.category
            });
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
    var price = req.body.price;

    if (req.file) {
        console.log("Uploading file");
        var fileName = req.file.filename;
    } else {
        console.log("No image uploaded");
        var fileName = 'noimage.jpg';
    }

    var newPost = new posts({
        body: body,
        category: category,
        author: author,
        title: title,
        date: date,
        foodPic: fileName,
        price: price,
        isSold: 'Not sold',
        purchasedBy: '',
        purchaserContact: ''
    });

    posts.createPost(newPost, function(err, post) {
    	if (err) throw err;
     	req.flash('success', 'Food has successfully been posted.');
        res.location('/');
        res.redirect('/');
    });

});

module.exports = router;

