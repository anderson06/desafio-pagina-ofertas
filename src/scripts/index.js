var controller = require('./controller');
var $ = require('jquery');
var select2 = require('select2');

$('select').select2({
	placeholder: "Escolha",
	allowClear: false,
	minimumResultsForSearch: Infinity
});

controller.init();
