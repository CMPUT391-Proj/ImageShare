var express = require('express');
var router = express.Router();

/* GET groups page. */
router.get('/', function(req, res) {
	res.render('groups', { title: 'Groups' });
});

/* Create a group. */
router.get('/createGroup', function(req, res) {
	var groupName = req.body.groupName;
	var noctice = req.body.notice;
});


module.exports = router;
