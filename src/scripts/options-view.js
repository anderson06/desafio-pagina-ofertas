var $ = require('jquery');
var _ = require('lodash');
var Handlebars = require('handlebars');

var options = [];
var filteredOptions = [];
var saidas = [];
var diarias = [];
var selectedSaida = null;
var selectedDiarias = null;

var saidasEl = $('#saida');
var diariasEl = $('#n-diarias');
var optionsEl = $('#options');

var source   = $("#option-template").html();
var template = Handlebars.compile(source);

var optionsSource = $("#optiontag-template").html();
var optionsTpl = Handlebars.compile(optionsSource);

function init(params) {
	options = _.sortBy(params.offer.options, 'price');

	saidasEl.on('change', changeSaida);
	diariasEl.on('change', changeDiarias);

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

function render() {

	filteredOptions = _.chain(options)
		.filter(function(option) { 
			return selectedSaida ? _.includes(option.from, selectedSaida) : true; 
		})
		.filter(function(option) { 
			return selectedDiarias ? option.daily === selectedDiarias : true; 
		})
		.value();

	saidas = _.chain(options)
		.filter(function(option) { 
			return selectedDiarias ? option.daily === selectedDiarias : true; 
		})
		.map(function(option) { return option.from; })
		.flatten()
		.sort()
		.uniq()
		.map(function(saida) { return {selected: saida === selectedSaida, text: saida}; })
		.value();

	diarias = _.chain(options)
		.filter(function(option) { 
			return selectedSaida ? _.includes(option.from, selectedSaida) : true; 
		})
		.map(function(option) { return option.daily; })
		.sort(function(a, b) { return a - b; })
		.uniq()
		.map(function(diarias) { return {selected: diarias === selectedDiarias, text: diarias}; })
		.value();

	diariasEl.empty().append(optionsTpl(diarias));
	saidasEl.empty().append(optionsTpl(saidas));
	optionsEl.empty().append(template(filteredOptions));
}

module.exports = {
	init: init,
}