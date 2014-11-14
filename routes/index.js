if (process.platform == 'linux') {
	var oracle = require('oracle');
}
else if (process.platform == 'darwin') {
	var oracle = require('oracle_mac');
}

var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var connectData = {
    hostname: "localhost",
    port: 1525,
    database: "crs", // System ID (SID)
    user: "tfung",
    password: "pass2014"
};

function oracleQuery(statement) {
	oracle.connect(connectData, function(err, connection) {
	if (err) { console.log('Error connecting to db:', err); return; }

		connection.execute(statement, [], function(err, results) {
			if (err) { console.log('Error executing query:', err); return; }

			console.log(results);
			connection.close(); // call only when query is finished executing
		});
	});
}

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

	oracleQuery(insertUsersStatement);
	oracleQuery(insertPersonsStatement);
});

module.exports = router;
