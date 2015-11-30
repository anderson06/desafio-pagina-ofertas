var $ = require('jquery');
var _ = require('lodash');
var Handlebars = require('handlebars');

var options = [];
var selectedSaida = null;
var selectedDiarias = null;
var saidasEl;
var diariasEl;
var optionsEl;
var template;
var optionsTpl;

function init(params) {
	options = _.sortBy(params.offer.options, 'price');

	saidasEl = $('#saida');
	diariasEl = $('#n-diarias');
	optionsEl = $('#options');

	saidasEl.on('change', changeSaida);
	diariasEl.on('change', changeDiarias);

	template = Handlebars.compile($("#option-template").html());
	optionsTpl = Handlebars.compile($("#optiontag-template").html());

	render();
}

function changeSaida(e) {
	selectedSaida = saidasEl.find('option:selected').val();
	render();
	e.preventDefault();
}

function changeDiarias(e) {
	selectedDiarias = Number(diariasEl.find('option:selected').val());
	render();
	e.preventDefault();
}

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

function render() {

	var filteredOptions = getFilteredOptions(selectedSaida, selectedDiarias);
	var filteredFrom = getFilteredFrom(selectedSaida, selectedDiarias);
	var filteredDaily = getFilteredDaily(selectedSaida, selectedDiarias);

	diariasEl.empty().append(optionsTpl(filteredDaily));
	saidasEl.empty().append(optionsTpl(filteredFrom));
	optionsEl.empty().append(template(filteredOptions));
}

module.exports = {
	init: init,
	getFilteredOptions: getFilteredOptions,
	getFilteredFrom: getFilteredFrom,
	getFilteredDaily: getFilteredDaily,
}