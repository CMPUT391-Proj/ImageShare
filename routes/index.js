var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('oracle-handler');
var helper = require('helper/templates');
var async = require('async');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Home' });
});

// Process the login form
router.post('/login', function(req, res) {

	var username = req.body.username;
	var password = req.body.password;

	var getUsersStatement = 
		'SELECT FROM USERS (USER_NAME, PASSWORD, DATE_REGISTERED) '+
		'VALUES (\''+username+'\', \''+password+'\', SYSTIMESTAMP)';
	var results = oracleHandler.oracleQuery(getUsersStatement);
});

/* Registration */
router.post('/', function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var firstname = req.param('firstname');
	var lastname = req.param('lastname');
	var address = req.param('address');
	var email = req.param('email');
	var phone = req.param('phone');

	var user = helper.createUser([username, password, 'SYSTIMESTAMP']);
	var person = helper.createPerson([username, firstname, lastname, address, email, phone]);
	
	oracleHandler.oracleInsert('USERS', user, function(err, results) {
		oracleHandler.oracleInsert('PERSONS', person, function(err2, results2) {
			req.method = 'get';
			res.redirect('/gallery'); 
		});
	});
});

module.exports = router;
