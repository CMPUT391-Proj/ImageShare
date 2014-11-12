var express = require('express');
var oracle = require('oracle');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('gallery', { title: 'Gallery' });
});

module.exports = router;
