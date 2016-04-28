var Gallery = require('../app/client/scripts/gallery.js');
var model = require('../app/client/scripts/model.js');
var offers = require('../app/server/data/offer.json');
var _ = require('lodash');
var $ = require('jquery');

var gallery;

describe('Gallery', function() {
	var offer = {
		"id": 0,
		"title": "Hotel The Mirage (Hotel & Casino)",
		"location": "Las Vegas, USA",
		"description": "Aéreo de várias cidades + Hotel em Vegas",
		"photos": [
			"images/photo6.jpg",
			"images/photo8.jpg",
			"images/photo7.jpg",
			"images/photo9.jpg",
			"images/photo11.jpg",
			"images/photo3.jpg",
			"images/photo2.jpg",
			"images/photo1.jpg",
			"images/photo6.jpg",
			"images/photo8.jpg",
			"images/photo7.jpg",
			"images/photo9.jpg",
			"images/photo11.jpg",
			"images/photo3.jpg",
			"images/photo2.jpg",
			"images/photo1.jpg"
		],
	};

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
		loadFixtures('gallery.html');
    model.init({offer: offer});
    gallery = new Gallery({offer: offer, model: model});
	});

	it('Should have a properly dom element', function() {
    expect(gallery.$el).toExist();
    expect(gallery.$el[0]).toBeInDOM();
    expect(gallery.$modal[0]).not.toBeInDOM();
    //console.log(gallery.$el.parent().html());
    expect(gallery.$el).toHaveData("photo-index", 0);

    var thumb0 = gallery.$thumbs.filter("[data-photo-index='0']");
    expect(thumb0).toHaveClass("gallery__thumb--selected");
	});

  describe("Modal tests", function() {
    beforeEach(function() {
      gallery.$el.trigger( "click" );
    });

    it ("should open modal on correct photo", function() {
      expect(gallery.$modal[0]).toBeInDOM();
    });
  });
});
