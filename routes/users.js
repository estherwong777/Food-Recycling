var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

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

  if (req.file) {
  	console.log('Uploading...');
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
    //Re-render the page, and give it the errors to show on html
  	res.render('register', {
  		errors : errors
  	});
  } else {
  	console.log("No errors in form");
  }

});


module.exports = router;
