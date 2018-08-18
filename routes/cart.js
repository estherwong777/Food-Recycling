var express = require('express');
var router = express.Router();
var posts = require('../models/post');
var User = require('../models/user');

// var currcart = {items: [], total: 0}; // copy of the cart for checkout purposes

router.get('/', isAuth, function(req, res, next) {
	//retrieving current cart
	var cart = req.session.cart;
	var newCart = {items: [], total: 0};
	var total = 0;

    //update total
    for(var item in cart) {
    	newCart.items.push(cart[item]);
    	total += parseInt(cart[item].price);
    }

    newCart.total = total;

	res.render('./cart/cart', {
		title : 'cart',
		cart: newCart
	});
});


router.post('/checkout', function(req, res, next) {
	res.render('./cart/checkout', {
		title: 'checkout'
	});
});

router.post('/buy', function(req, res, next) {
    req.session.cart = req.session.cart || {};
	var cart = req.session.cart;

	//Form validation needed
   
    for(var item in cart) {
       var query = {'_id' : cart[item].id};
       var newValues = {$set: {isSold: 'Sold', 
       purchasedBy: req.user.name, purchaserContact :req.body.phone, date: new Date()}}

       posts.updateOne(query, newValues, function(err, res) {
       	   if (err) throw err;
       	   console.log("updated one post");
       });

   }
   req.session.cart = {};
   req.flash('success', 'Sucessfully purchased cart items');
   res.redirect('/');
});




router.post('/:id', function(req, res) {
	req.session.cart = req.session.cart || {};
	var cart = req.session.cart;

	posts.findOne({_id : req.params.id}, function(err, post) {
		if (err) throw err;

		if (!cart[req.params.id]) {
			cart[req.params.id] = {
				food: post.title,
				producer: post.author,
				price: post.price,
				id: post._id
			}
		}
        req.flash('success', 'Successfully added to your Cart');
		res.redirect('/');
	});
});


function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/users/login');
}

module.exports = router;