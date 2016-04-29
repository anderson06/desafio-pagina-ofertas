var $ = require('jquery');
var _ = require('lodash');

var offer;
var options;

function init(params) {
  offer = params.offer;
	options = _.sortBy(offer.options, 'price');
}

function data() {
  return offer;
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

function getFilteredFrom(origin, daily) {
	return _.chain(options)
		.filter(function(option) {
			return daily !== "todas" ? option.daily === daily : true;
		})
		.map(function(option) { return option.from; })
		.flatten()
		.sort()
		.uniq()
		.map(function(saida) { return {selected: saida === origin, text: saida}; })
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
  data: data,
	getFilteredOptions: getFilteredOptions,
	getFilteredFrom: getFilteredFrom,
	getFilteredDaily: getFilteredDaily
};
