var express = require('express');
var bodyParser = require('body-parser');
var oracleHandler = require('oracle-handler');
var router = express.Router();

/* GET gallery page. */
router.get('/', function(req, res) {
  res.render('gallery', { title: 'Gallery' });
});

/* Image uploading */
router.post('/imageUpload', function(req, res) {
	
	console.log('received JSON: ', req.body);

	var description = req.body.info.desc;
	var subject = req.body.info.subject;
	var date = req.body.info.date;
	var place = req.body.info.place;

	var permissions = req.body.info.permissionsGroup.split("|");
	var groupName = permissions[0];
	var userName = permissions[1];

	var selectGroupStatement =  
		'SELECT group_id from groups where group_name=\'' 
			+ groupName + '\'' 
			+ (userName == 'null' ? '' : (' and user_name=\'' + userName + '\''));

	var insertImagesStatement = 
		'INSERT INTO IMAGES '
			+ 'VALUES ((SELECT MAX(photo_id) from IMAGES) + 1, \'jesstest\', '
			+ '(' + selectGroupStatement + ')'
			+ ', \'' + subject + '\', \'' + place + '\', TO_DATE(\''  
			+ date + '\', \'yyyy-mm-dd\'), \'' + description + '\', null, null)';

	oracleHandler.oracleQuery(insertImagesStatement, function(err, result) {
		if (err)
			res.status(500).send(err);
		else
			res.send('success');
	});	
});

/* Retrieves all groups the current user is in */
router.get('/groupRetrieval', function(req, res) {
	// need to modify later to join with group_lists to
	// get the groups the user are in only
	var sql = "SELECT group_name, user_name from GROUPS";

	oracleHandler.oracleRetrieval(sql, function(err, results) {
		if (err) throw err;
		res.send(results);
	});
});

module.exports = router;
