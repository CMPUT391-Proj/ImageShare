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
	var description = req.body.desc;
	var subject = req.body.subject;
	var date = req.body.date;
	var place = req.body.place;

	var insertImagesStatement = 
		'INSERT INTO IMAGES '
			+ 'VALUES ((SELECT MAX(photo_id) from IMAGES) + 1, \'jesstest\', 1, \'' 
			+ subject + '\', \'' + place + '\', TO_DATE(\''  
			+ date + '\', \'yyyy-mm-dd\'), \'' + description + '\', null, null)';

	oracleHandler.oracleQuery(insertImagesStatement);
	
	res.send('success');
	// res.error();
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
