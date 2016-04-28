var $ = require('jquery');
var _ = require('lodash');
var slick = require('slick-carousel');

var $el = null;
var $thumbs = null;
var $modal = $("<div></div>");
var $body = $(document.body);
var $window = $(window);
var index = 0;

$modal.addClass("modal");

function init(params) {
	offer = params.offer;

	$el = $('#gallery');
	$thumbs = $('.gallery-thumb');
	modal = $('.modal');

	$el.add($thumbs).on('click', openModal);
  $modal.on("click", ".modal__close", closeModal);
  $modal.on("click", ".arrow--next", modalNext);
  $modal.on("click", ".arrow--prev", modalPrev);
  $modal.on("click", ".modal__thumb", modalChangePhoto);
}

function renderModal(index) {
	var source   = $("#gallerymodal-template").html();
	var template = _.template(source);
	$modal.html(template({offer: offer, index: index}));
}

function openModal() {
  index = Number($(this).data("photo-index"));
  renderModal(index);
  $modal.addClass('open');
  $body.append($modal);
}

function closeModal() {
  $modal.detach();
}

function modalNext() {
  if (index != offer.photos.length - 1) {
    index++;
  } else {
    index = 0;
  }

  updateModal();
}

function modalPrev() {
  console.log(index);
  if (index > 0) {
    index--;
  } else {
    index = offer.photos.length - 1;
  }

  updateModal();
}

function modalChangePhoto() {
  index = Number($(this).data("photo-index"));
  updateModal();
}

function updateModal() {
  $modal.find(".modal__photo")
    .css("background-image", "url(public/assets/"+offer.photos[index]+")");

  $modal.find(".modal__thumb").removeClass("modal__thumb--selected");

  var $selectedThumb = $modal.find(".modal__thumb[data-photo-index='"+index+"']");
  $selectedThumb.addClass("modal__thumb--selected");

  $modal.find(".modal__navigator-wrapper")
    .animate({scrollLeft: $selectedThumb.offset().left + 10}, 500);
}

module.exports = {
	init: init,
	openModal: openModal,
	closeModal: closeModal,
};
