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
		'INSERT INTO IMAGES ' +
		'VALUES (1, \'jesstest\', 1, \'' + subject + '\', \'' + place + '\', \'' + date + '\', \'' + description + '\', null, null)';

	oracleHandler.oracleQuery(insertImagesStatement);
});

module.exports = router;
