var Gallery = require('../../app/client/scripts/gallery.js');
var model = require('../../app/client/scripts/model.js');
var offers = require('../../app/server/data/offer.json');
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
		jasmine.getFixtures().fixturesPath = 'base/test/client/fixtures';
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

  describe("On gallery thumb click", function() {
    beforeEach(function() {
      gallery.$thumbs.filter("[data-photo-index='3']").trigger( "click" );
    });

    it ("should open modal on right photo", function() {
      var isRightPhoto = gallery.$modal
        .find(".modal__photo")
        .css("background-image")
        .replace(")", "")
        .substr(-model.data().photos[3].length) === model.data().photos[3];

      expect(isRightPhoto).toBe(true);
    });
  });

  describe("On gallery click", function() {
    beforeEach(function() {
      gallery.$el.trigger( "click" );
    });

    it ("should open modal on correct photo", function() {
      expect(gallery.$modal[0]).toBeInDOM();

      var isFirstPhoto = gallery.$modal
        .find(".modal__photo")
        .css("background-image")
        .replace(")", "")
        .substr(-model.data().photos[0].length) === model.data().photos[0];

      expect(isFirstPhoto).toBe(true);

      describe("On next button click", function() {
        beforeEach(function() {
          gallery.$el.find(".arrow--next").trigger( "click" );
        });

        it ("should render next photo", function() {
          var isNextPhoto = gallery.$modal
            .find(".modal__photo")
            .css("background-image")
            .replace(")", "")
            .substr(-model.data().photos[1].length) === model.data().photos[1];

          expect(isNextPhoto).toBe(true);
        });
      });

      describe("On prev button click", function() {
        beforeEach(function() {
          gallery.$el.find(".arrow--prev").trigger( "click" );
        });

        it ("should render next photo", function() {
          var isPrevPhoto = gallery.$modal
            .find(".modal__photo")
            .css("background-image")
            .replace(")", "")
            .substr(-model.data().photos[model.data().photos[1].length-1].length) === model.data().photos[model.data().photos[1].length-1];

          expect(isPrevPhoto).toBeTrue();
        });
      });

      describe("On modal thumb click", function() {
        beforeEach(function() {
          gallery.$el.find(".modal__thumb[data-photo-index='3'").trigger( "click" );
        });

        it ("should render next photo", function() {
          var isRightPhoto = $modal.find(".modal__photo")
            .attr("src")
            .substr(-modal.offer.photos[3].length) === modal.offer.photos[3];

          expect(isRightPhoto).toBeTrue();
        });
      });
    });
  });
});
