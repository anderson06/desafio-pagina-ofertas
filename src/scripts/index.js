$ = require('jquery');
slick = require('slick-carousel');

$('#gallery').slick({
	asNavFor: '#gallery-nav'
});

$('#gallery-nav').slick({
	asNavFor: '#gallery',
	slidesToShow: 10,
	infinite: true
});
