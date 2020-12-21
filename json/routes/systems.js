var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({});
});

router.get('/content', function(req, res, next) {
  res.json('app');
});

module.exports = router;
