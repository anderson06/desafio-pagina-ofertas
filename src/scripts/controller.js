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

function getFilteredOptions(selectedFrom, selectedDaily) {
	return model.getFilteredOptions(selectedFrom, selectedDaily);
}

function getFilteredFrom(selectedFrom, selectedDaily) {
	return model.getFilteredFrom(selectedFrom, selectedDaily);
}

function getFilteredDaily(selectedFrom, selectedDaily) {
	return model.getFilteredDaily(selectedFrom, selectedDaily);
}

module.exports = {
	init: init,
	getFilteredOptions: getFilteredOptions,
	getFilteredFrom: getFilteredFrom,
	getFilteredDaily: getFilteredDaily
}