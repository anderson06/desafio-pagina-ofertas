$ = require('jquery');
slick = require('slick-carousel');

var el = $('#gallery');
var thumbs = $('.gallery-thumb');

thumbs.on('click', toPhoto);

function init(params) {
	offer = params.offer;

	startGallery();
}

function startGallery() {
	el.slick({
			dots: false,
		});

	$('.slick-prev').empty();
	$('.slick-next').empty();

	if (offer.photos.length >= 9) {
		var photosLenght = $('<div></div>');
		photosLenght.addClass('photosLenght');
		photosLenght.text('+ ' + (offer.photos.length - 10));

		$('.gallery-thumb.last').append(photosLenght)
	}

	$('.gallery-thumb.last');
}

function toPhoto() {
	var photoIndex = $(this).data('index');
	el.slick('slickGoTo', photoIndex);
}


module.exports = {
	init: init,
}