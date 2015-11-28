var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');

// GET options
router.get('/:id', function (req, res) {

	var offers = JSON.parse(fs.readFileSync(__dirname + '/../offer.json').toString());
	var offerId = parseInt(req.params.id, 10);
	var offer = _.findWhere(offers, {id: offerId});
	var options;

	if (!offer)
		options = {};
	else 
		options = offer.options;

	res.json(options);

});

module.exports = router;