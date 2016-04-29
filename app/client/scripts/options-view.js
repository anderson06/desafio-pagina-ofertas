var $ = require('jquery');
var _ = require('lodash');
var numberFormat = require("underscore.string/numberFormat");

_.numberFormat = numberFormat;

var options;
var selectedSaida;
var selectedDiarias;
var saidasEl;
var diariasEl;
var optionsEl;
var template;
var optionsTpl;
var model;

function init(params) {
  options = [];
  selectedSaida = "todas";
  selectedDiarias = "todas";

  model = params.model;

	options = _.sortBy(params.offer.options, 'price');

	saidasEl = $('#saida');
	diariasEl = $('#n-diarias');
	optionsEl = $('#options');

	saidasEl.on('change', changeSaida);
	diariasEl.on('change', changeDiarias);

	template = _.template($("#option-template").html());
	optionsTpl = _.template($("#optiontag-template").html());
}

function changeSaida(e) {
	selectedSaida = saidasEl.val();
	render();
	e.preventDefault();
}

function changeDiarias(e) {
  if (diariasEl.val() === "todas") {
    selectedDiarias = diariasEl.val();
  } else {
    selectedDiarias = Number(diariasEl.val());
  }

	render();
	e.preventDefault();
}

function render() {
	var filteredOptions = model.getFilteredOptions(selectedSaida, selectedDiarias);
	var filteredFrom = model.getFilteredFrom(selectedSaida, selectedDiarias);
	var filteredDaily = model.getFilteredDaily(selectedSaida, selectedDiarias);

	diariasEl.empty().append(optionsTpl({options: filteredDaily}));
	saidasEl.empty().append(optionsTpl({options: filteredFrom}));
	optionsEl.empty().append(template({options: filteredOptions}));
}

module.exports = {
	init: init,
  render: render
}
