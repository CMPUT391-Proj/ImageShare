var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('oracle-handler');
var helper = require('helper/templates');
var async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	if (req.signedCookies.username == undefined)
	{
		res.render('index', { title: 'Home',
							 username: 'You Are Currently Not Signed In',
							 navbarToggle: ''}
		);
	}
	else
	{
		res.render('index', { title: 'Home',
							  username: req.signedCookies.username,
							  navbarToggle: 'dropdown'}
		);
	}
});

// Process the login form
router.post('/login', function(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	var getUsersStatement = 
		'SELECT FROM USERS (USER_NAME, PASSWORD, DATE_REGISTERED) '+
		'VALUES (\''+username+'\', \''+password+'\', SYSTIMESTAMP)';

/*	oracleHandler.oracleRetrieval(getUsersStatement) {
		if (user && user.authenticate(req.body.user.password)) {
			req.session.user_name = user.id;

	      // Remember me
	      //if (req.body.remember_me) {
	      	var loginToken = new LoginToken({ email: user.email });
	      	loginToken.save(function() {
	      		res.cookie('logintoken', loginToken.cookieValue, { expires: new Date(Date.now() + 2 * 604800000), path: '/' });
	      	});
	      //}

	      res.redirect('/gallery');
		}
		else {
			req.flash('error', 'Incorrect credentials');
			res.redirect('/');
		}

	});*/
	res.cookie('username', username, { maxAge: 900000, httpOnly: true, signed: true});
	console.log('username cookie created successfully');
	res.redirect('/gallery');
});

module.exports = router;
