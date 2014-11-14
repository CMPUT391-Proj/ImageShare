var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* Registration */
router.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var address = req.body.address;
	var email = req.body.email;
	var phone = req.body.phone;

	var insertUsersStatement = 
		'INSERT INTO USERS (USER_NAME, PASSWORD, DATE_REGISTERED) '+
		'VALUES (\''+username+'\', \''+password+'\', SYSTIMESTAMP)';

	var insertPersonsStatement =
		'INSERT INTO PERSONS (USER_NAME, FIRST_NAME, LAST_NAME, ADDRESS, EMAIL, PHONE) '+
		'VALUES (\''+username+'\',\''+firstname+'\',\''+lastname+'\',\''+address+'\',\''+email+'\',\''+phone+'\')';

	oracleHandler.oracleQuery(insertUsersStatement);
	oracleHandler.oracleQuery(insertPersonsStatement);
});

module.exports = router;
