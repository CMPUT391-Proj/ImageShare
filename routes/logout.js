var express = require('express');
var router = express.Router();

/* GET logout redirection. */
router.get('/', function(req, res) {
	if (req.signedCookies.username != undefined)
	{
		res.clearCookie('username');
	}
	res.redirect('/');
});

module.exports = router;
