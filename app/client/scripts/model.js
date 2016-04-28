var $ = require('jquery');
var _ = require('lodash');

var offer;
var options;

function init(params) {
  offer = params.offer;
	options = _.sortBy(offer.options, 'price');
}

function getFilteredOptions(selectedSaida, selectedDiarias) {
	return _.chain(options)
		.filter(function(option) {
			return selectedSaida !== "todas" ? _.includes(option.from, selectedSaida) : true;
		})
		.filter(function(option) {
			return selectedDiarias !== "todas" ? option.daily === selectedDiarias : true;
		})
		.value();
}

function getFilteredFrom(selectedSaida, selectedDiarias) {
	return _.chain(options)
		.filter(function(option) {
			return selectedDiarias !== "todas" ? option.daily === selectedDiarias : true;
		})
		.map(function(option) { return option.from; })
		.flatten()
		.sort()
		.uniq()
		.map(function(saida) { return {selected: saida === selectedSaida, text: saida}; })
		.value();
}

function getFilteredDaily(selectedSaida, selectedDiarias) {
	return _.chain(options)
		.filter(function(option) {
			return selectedSaida !== "todas" ? _.includes(option.from, selectedSaida) : true;
		})
		.map(function(option) { return option.daily; })
		.sort(function(a, b) { return a - b; })
		.uniq()
		.map(function(diarias) { return {selected: diarias === selectedDiarias, text: diarias}; })
		.value();
}

module.exports = {
  init: init,
	getFilteredOptions: getFilteredOptions,
	getFilteredFrom: getFilteredFrom,
	getFilteredDaily: getFilteredDaily
};
