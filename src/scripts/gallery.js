var $ = require('jquery');
var _ = require('lodash');
var slick = require('slick-carousel');
var Handlebars = require('handlebars');

var el = null;
var thumbs = null;
var thumbsWrapper = null;
var menuContainer = null;
var modal = null;
var modalGallery = null;
var thumbWidth = 94;
var actualPage = 0;
var menuContainerWidth = 0;

function init(params) {
	offer = params.offer;

	el = $('#gallery');
	thumbs = $('.gallery-thumb');
	thumbsWrapper = $('.gallery-thumbs');
	menuContainer = $('.gallery-nav');
	modal = $('.fullscreen');

	createModal();
	startGallery();

	thumbs.on('click', toPhoto);
	thumbs.on('click', '.photosLenght', openModal);
	$('.offer-fig').on('click', openModal);
	$('.modal-gallery-close').on('click', closeModal);
}

function startGallery() {
	el.slick({
			dots: false,
		})
		.on('beforeChange', function(e, s, c, nextSlide) {
			updateMenu(nextSlide);

			if (thumbs.eq(nextSlide).find('.photosLenght').length
				|| thumbs.eq(nextSlide).hasClass('out-of-view'))
				openModal();
		});

	updateMenu(0);

	$('.slick-prev').empty();
	$('.slick-next').empty();
}

function updateMenu(i) {
	var thumb = thumbs.filter(':eq('+i+')');
	thumbs.removeClass('active');
	thumb.addClass('active');

	var menuPage = Math.floor(i / getVisibleThumbs());
}

function addPhotosLength() {
	$('.photosLenght').remove();
	$('.gallery-thumb').removeClass('out-of-view');

	var index = getVisibleThumbs() - 1;

	if (offer.photos.length > index) {
		var photosLenght = $('<div></div>');
		photosLenght.addClass('photosLenght');
		photosLenght.text('+ ' + (offer.photos.length - index - 1));

		$('.gallery-thumb:eq(' + index + ')').append(photosLenght);
		$('.gallery-thumb:gt(' + index + ')').addClass('out-of-view');
	}
}

function getVisibleThumbs() {
	var width = $('.gallery-nav').width();
	return Math.floor(width / thumbWidth);
}

function toPhoto() {
	var $this = $(this);
	var photoIndex = $this.data('index');
	thumbs.removeClass('active');
	$this.addClass('active');
	el.slick('slickGoTo', photoIndex);
}

function createModal() {
	var source   = $("#gallerymodal-template").html();
	var template = Handlebars.compile(source);
	modal.html(template(offer.photos));
	modalGallery = $('#gallery-modal');
	modalGallery.slick({
		dots: true,
	});
}

function openModal() {
	modal.addClass('open');
	modalGallery.slick('setPosition');
	modalGallery.slick('slickGoTo', el.slick('slickCurrentSlide'), true);
}

function closeModal() {
	modal.removeClass('open');
}

module.exports = {
	init: init,
	openModal: openModal,
	closeModal: closeModal,
};