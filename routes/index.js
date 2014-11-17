var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('oracle-handler');
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

module.exports = router;
