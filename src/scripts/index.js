var $ = require('jquery');
var select2 = require('select2');
var model = require('./model');
var gallery = require('./gallery');
var optionsView = require('./options-view');

$('select').select2({
	placeholder: "Escolha",
	allowClear: false,
	minimumResultsForSearch: Infinity
});

var offer = global.offer;

console.log(offer);

model.offer = offer;
gallery.init({offer: offer, model: model});
optionsView.init({offer: offer, model: model});

function getFilteredOptions(selectedFrom, selectedDaily) {
	return model.getFilteredOptions(selectedFrom, selectedDaily);
}

function getFilteredFrom(selectedFrom, selectedDaily) {
	return model.getFilteredFrom(selectedFrom, selectedDaily);
}

function getFilteredDaily(selectedFrom, selectedDaily) {
	return model.getFilteredDaily(selectedFrom, selectedDaily);
}

