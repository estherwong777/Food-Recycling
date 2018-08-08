var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Home' });
});


function ensureAuthenticated(req, res, next) {
	//Ensure you can only access homepage if logged in
	if (req.isAuthenticated()) {
		return next();

	}

	res.redirect('/users/login');
}

module.exports = router;
