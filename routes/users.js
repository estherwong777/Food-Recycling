var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title : 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title : 'Login'});
});

router.post('/register', upload.single('certification'), function(req, res, next) {
  var name = req.body.name;
  var address = req.body.address;
  var phone = req.body.phone;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  var certification = req.body.certification;

  if (req.file) {
  	console.log('Sucess : File uploading');
  	var fileName = req.file.fileName;
  } else {
  	console.log('Error : No file upload');
  	var fileName = 'noCertificate.jpg'; //standard image for default
  }

  //Form validation
  req.checkBody('name', 'Company name is required').notEmpty();
  req.checkBody('address', 'Company address is required').notEmpty();
  req.checkBody('phone', 'Company phone number is required').notEmpty();

  req.checkBody('email', 'Company email number is required').notEmpty();
  req.checkBody('email', 'Not a valid email address').isEmail();

  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  //Check if there are any errors in form
  var errors = req.validationErrors();

  if (errors) {
    //Re-render the page, and give it the errors
  	res.render('register', {
  		//passed to jade file
  		errors : errors
  	});
  } else {
  	var newUser = new User({
  		name: name,
  		address: address,
  		phone: phone,
  		email: email,
  		password: password,
  		certification: certification
  	});
  	
  	User.createUser(newUser, function(err, user){
  		if (err) {
  			throw err;
  		}
  		req.flash('success', 'Registration completed, you can now login.');
        res.location('/');
        res.redirect('/');
  	});
  }

});


module.exports = router;
