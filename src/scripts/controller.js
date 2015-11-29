var model = require('./model');
var gallery = require('./gallery');
var optionsView = require('./options-view');

function init() {
	model.init({ id: global.offerId });

	model.sync(function() {
		var offer = model.offer();

		gallery.init({offer: offer});
		optionsView.init({offer: offer});
	});

	
}

module.exports = {
	init: init,
};