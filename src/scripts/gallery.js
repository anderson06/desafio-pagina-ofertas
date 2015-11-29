$ = require('jquery');
slick = require('slick-carousel');

var el = $('#gallery');
var thumbs = $('.gallery-thumb');

thumbs.on('click', toPhoto);

// $('#gallery-nav').slick({
// 	asNavFor: '#gallery',
// 	slidesToShow: 10,
// 	infinite: true
// });

function init(params) {
	offer = params.offer;

	startGallery();
}

function startGallery() {
	el.slick({
		//asNavFor: '#gallery-nav'
	});
}

function toPhoto() {
	var photoIndex = $(this).data('index');
	el.slick('slickGoTo', photoIndex);
}


module.exports = {
	init: init,
}