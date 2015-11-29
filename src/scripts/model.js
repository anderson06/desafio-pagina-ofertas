$ = require('jquery');

var offer = {};
var id = 0;

function init(params) {
	id = params.id;
}

function sync(success) {
	$.ajax({
		dataType: "json",
		url: '/offers/' + id,
		success: function(data) {
			console.log(data);
			offer = data;
			success();
		}
	});
}

module.exports = {
	init: init,
	sync: sync,
	offer: function() { return offer; }
};