var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
	var offers = JSON.parse(fs.readFileSync(__dirname + '/../offer.json').toString());
	var offer = _.findWhere(offers, {id: 0});
	
	// duplicate photos so we can test gallery
	Array.prototype.push.apply(offer.photos, offer.photos);

	res.render('index', offer);
});

module.exports = router;
