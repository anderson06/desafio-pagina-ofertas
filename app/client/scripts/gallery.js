var $ = require('jquery');
var _ = require('lodash');

function Gallery(params) {
	this.$el = $('#gallery');
	this.$thumbs = $('.gallery__thumb');
  this.$modal = $("<div></div>");
  this.$modal.addClass("modal");
  this.$body = $(document.body);
  this.$window = $(window);
  this.index = 0;

	this.offer = params.offer;

	this.$el.add(this.$thumbs).on('click', _.bind(this.openModal, this));
  this.$modal.on("click", ".modal__close", _.bind(this.closeModal, this));
  this.$modal.on("click", ".arrow--next", _.bind(this.modalNext, this));
  this.$modal.on("click", ".arrow--prev", _.bind(this.modalPrev, this));
  this.$modal.on("click", ".modal__thumb", _.bind(this.modalChangePhoto, this));
}

Gallery.prototype.renderModal = function(index) {

	var source   = $("#gallerymodal-template").html();
	var template = _.template(source);
	this.$modal.html(template({offer: this.offer, index: index}));
}

Gallery.prototype.openModal = function(event) {
  this.index = Number($(event.currentTarget).data("photo-index"));
  this.renderModal(this.index);
  this.$modal.addClass('open');
  this.$body.append(this.$modal);
}

Gallery.prototype.closeModal = function() {
  this.$modal.detach();
}

Gallery.prototype.modalNext = function() {
  if (this.index != this.offer.photos.length - 1) {
    this.index++;
  } else {
    this.index = 0;
  }

  this.updateModal();
}

Gallery.prototype.modalPrev = function() {
  if (this.index > 0) {
    this.index--;
  } else {
    this.index = this.offer.photos.length - 1;
  }

  this.updateModal();
}

Gallery.prototype.modalChangePhoto = function() {
  this.index = Number($(this).data("photo-index"));
  this.updateModal();
}

Gallery.prototype.updateModal = function() {
  this.$modal.find(".modal__photo")
    .css("background-image", "url(public/assets/"+offer.photos[this.index]+")");

  this.$modal.find(".modal__thumb").removeClass("modal__thumb--selected");

  var $selectedThumb = this.$modal.find(".modal__thumb[data-photo-index='"+this.index+"']");
  $selectedThumb.addClass("modal__thumb--selected");

  var $parent = this.$modal.find(".modal__navigator-wrapper");

  this.$modal.find(".modal__navigator-wrapper")
    .animate({scrollLeft: $selectedThumb.offset().left + $parent.scrollLeft() - 10}, 500);
}

module.exports = Gallery;
