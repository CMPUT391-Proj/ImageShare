var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res) {
	if (req.signedCookies.username == undefined)
	{
		res.render('about', { title: 'About',
							 username: 'You Are Currently Not Signed In',
							 navbarToggle: ''}
		);
	}
	else
	{
		res.render('about', { title: 'About',
							  username: req.signedCookies.username,
							  navbarToggle: 'dropdown'}
		);
	}
});

module.exports = router;
