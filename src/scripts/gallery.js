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
var $modal = $("<div></div>");
var $body = $(document.body);

$modal.addClass("fullscreen open");

function init(params) {
	offer = params.offer;

	el = $('#gallery');
	thumbs = $('.gallery-thumb');
	thumbsWrapper = $('.gallery-thumbs');
	menuContainer = $('.gallery-nav');
	modal = $('.fullscreen');

	createModal();

	el.add(thumbs).on('click', openModal);
	$('.modal-gallery-close').on('click', closeModal);
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
	$modal.html(template(offer.photos));
}

function openModal() {
  $modal.addClass('open');
  $body.append($modal);
}

function closeModal() {
  $modal.remove();
}

module.exports = {
	init: init,
	openModal: openModal,
	closeModal: closeModal,
};
