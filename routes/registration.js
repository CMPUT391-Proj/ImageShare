var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('oracle-handler');
var templates = require('helper/templates');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('registration', { title: 'registration' });
});

router.post('/', function(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var firstname = req.param('firstname');
	var lastname = req.param('lastname');
	var address = req.param('address');
	var email = req.param('email');
	var phone = req.param('phone');

	var user = templates.createUser([username, password, 'SYSTIMESTAMP']);
	var person = templates.createPerson([username, firstname, lastname, address, email, phone]);
	
	oracleHandler.oracleInsert('USERS', user, function(err, results) {
		oracleHandler.oracleInsert('PERSONS', person, function(err2, results2) {
			req.method = 'get';
			res.redirect('/gallery'); 
		});
	});
});

module.exports = router;
