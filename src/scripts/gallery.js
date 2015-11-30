var $ = require('jquery');
var _ = require('lodash');
var slick = require('slick-carousel');
var Handlebars = require('handlebars');

var el = null;
var thumbs = null;
var thumbsWrapper = null;
var menuContainer = null;
var thumbWidth = 94;
var actualPage = 0;
var menuContainerWidth = 0;
var lazyLayout = _.debounce(calculateLayout, 300);

function init(params) {
	offer = params.offer;

	el = $('#gallery');
	thumbs = $('.gallery-thumb');
	thumbsWrapper = $('.gallery-thumbs');
	menuContainer = $('.gallery-nav');

	thumbs.on('click', toPhoto);
	
	$(window).resize(lazyLayout);

	startGallery();
}

function startGallery() {
	el.slick({
			dots: false,
		})
		.on('beforeChange', function(e, s, c, nextSlide) {
			updateMenu(nextSlide);
		});

	updateMenu(0);

	$('.slick-prev').empty();
	$('.slick-next').empty();

	calculateLayout();
}

function updateMenu(i) {
	var thumb = thumbs.filter(':eq('+i+')');
	thumbs.removeClass('active');
	thumb.addClass('active');

	var menuPage = Math.floor(i / getVisibleThumbs());
	menuGoTo(menuPage);
}

function addPhotosLength() {
	$('.photosLenght').remove();

	var index = getVisibleThumbs() - 1;

	if (offer.photos.length > index) {
		var photosLenght = $('<div></div>');
		photosLenght.addClass('photosLenght');
		photosLenght.text('+ ' + (offer.photos.length - index - 1));

		$('.gallery-thumb:eq(' + index + ')').append(photosLenght);
	}
}

function getVisibleThumbs() {
	var width = $('.gallery-nav').width();
	return Math.floor(width / thumbWidth);
}

function menuGoTo(page) {
	if (actualPage < page)
		thumbMenuNext(page - actualPage);
	else if (actualPage > page)
		thumbMenuPrev(actualPage - page);

	actualPage = page;
}

function recalculateMenuPosition() {
	var currentSlide = el.slick('slickCurrentSlide');
	var visibleThumbs = getVisibleThumbs();
	var currentPage = Math.floor(currentSlide / visibleThumbs);
	var left = currentPage * menuContainer.width() * -1;
	thumbsWrapper.animate({left: left});
}

function getLastVisibleThumbIndex() {
	var currentSlide = el.slick('slickCurrentSlide');
	var visibleThumbs = getVisibleThumbs();
	return ((Math.floor(currentSlide / visibleThumbs) + 1) * visibleThumbs) - 1;
}

function thumbMenuPrev(pages) {
	var left = (menuContainer.width() + 10) * pages;
	thumbsWrapper.animate({left: '+=' + left});
}

function thumbMenuNext(pages) {
	var left = (menuContainer.width() + 10) * pages;
	thumbsWrapper.animate({left: '-=' + left});
}

function toPhoto() {
	var $this = $(this);
	var photoIndex = $this.data('index');
	thumbs.removeClass('active');
	$this.addClass('active');
	el.slick('slickGoTo', photoIndex);
}

function calculateLayout() {
	menuContainerWidth = menuContainer.width();
	recalculateMenuPosition();
	addPhotosLength();
}

module.exports = {
	init: init,
};