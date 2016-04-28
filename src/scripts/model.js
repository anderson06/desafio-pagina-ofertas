$ = require('jquery');

var offer = {};

function getFilteredOptions(selectedSaida, selectedDiarias) {
	return _.chain(options)
		.filter(function(option) {
			return selectedSaida ? _.includes(option.from, selectedSaida) : true;
		})
		.filter(function(option) {
			return selectedDiarias ? option.daily === selectedDiarias : true;
		})
		.value();
}

function getFilteredFrom(selectedSaida, selectedDiarias) {
	return _.chain(options)
		.filter(function(option) {
			return selectedDiarias ? option.daily === selectedDiarias : true;
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
			return selectedSaida ? _.includes(option.from, selectedSaida) : true;
		})
		.map(function(option) { return option.daily; })
		.sort(function(a, b) { return a - b; })
		.uniq()
		.map(function(diarias) { return {selected: diarias === selectedDiarias, text: diarias}; })
		.value();
}

module.exports = {
	offer: function() { return offer; },
	getFilteredOptions: getFilteredOptions,
	getFilteredFrom: getFilteredFrom,
	getFilteredDaily: getFilteredDaily
};
