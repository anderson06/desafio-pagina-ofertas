var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
	var offers = JSON.parse(fs.readFileSync(__dirname + '/../offer.json').toString());
	var offer = _.findWhere(offers, {id: 0});
	offer.options = _.sortBy(offer.options, 'price');
	res.render('index', offer);
});

module.exports = router;
