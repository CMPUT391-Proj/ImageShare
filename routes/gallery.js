if (process.platform == 'linux') {
	var oracle = require('oracle');
}
else if (process.platform == 'darwin') {
	var oracle = require('oracle_mac');
}

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('gallery', { title: 'Gallery' });
});

module.exports = router;
