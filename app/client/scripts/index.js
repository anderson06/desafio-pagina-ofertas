var $ = require('jquery');
var select2 = require('select2');
var model = require('./model');
var gallery = require('./gallery');
var optionsView = require('./options-view');

var offer = global.offer;

console.log(offer);

initializeDropdowns();
model.init({offer: offer});
gallery.init({offer: offer, model: model});
optionsView.init({offer: offer, model: model});

function initializeDropdowns() {
  $('select').select2({
    placeholder: "Escolha",
    allowClear: false,
    minimumResultsForSearch: Infinity
  });
}
