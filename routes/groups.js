var express = require('express');
var router = express.Router();

/* GET groups page. */
router.get('/', function(req, res) {
	res.render('groups', { title: 'Groups' ,
							username: req.signedCookies.username,
							navbarToggle: 'dropdown'});
});

/* Create group. */
router.post('/createGroup', function(req, res) {
	var groupName = req.param('groupName');
	var notice = req.param('notice');
	/*var group_id = helper.createGuid();

	
	var group = helper.createGroup([group_id, 'test', groupName, 'SYSTIMESTAMP']);
	var groupList = helper.createGroupList([group_id, friend_id, 'SYSTIMESTAMP', notice]);
	*/

	oracleHandler.oracleInsert('GROUPS', group, function(err, results) {
		oracleHandler.oracleInsert('GROUP_LISTS', groupList, function(err2, results2) {
			// res.send(results);	// send the results if you need it
		});
	});
});

module.exports = router;
