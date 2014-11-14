var express = require('express');
var oracleHandler = require('oracle-handler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('gallery', { title: 'Gallery' });
});

module.exports = router;
