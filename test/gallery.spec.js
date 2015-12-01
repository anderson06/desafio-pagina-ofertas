var gallery = require('../src/scripts/gallery.js');
var offers = require('../offer.json');
var _ = require('lodash');

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
		gallery.init({offer: offer});
	});

	it('Should change to next photo on button click', function() {
		var gallery = $('#gallery');
		var thumbs = $('.gallery-thumb');

		expect(gallery.find('.slick-current img').attr('src')).toBe("images/photo6.jpg");
		expect(thumbs.filter('.active').find('img').attr('src')).toBe("images/photo6.jpg");

		gallery.find('.slick-next.slick-arrow').click();

		expect(gallery.find('.slick-current img').attr('src')).toBe("images/photo8.jpg");
		expect(thumbs.filter('.active').find('img').attr('src')).toBe("images/photo8.jpg");
	});

	it('Should change to next photo on button click', function() {
		var gallery = $('#gallery');
		var thumbs = $('.gallery-thumb');

		expect(gallery.find('.slick-current img').attr('src')).toBe("images/photo6.jpg");
		expect(thumbs.filter('.active').find('img').attr('src')).toBe("images/photo6.jpg");

		gallery.find('.slick-prev.slick-arrow').click();

		expect(gallery.find('.slick-current img').attr('src')).toBe("images/photo1.jpg");
		expect(thumbs.filter('.active').find('img').attr('src')).toBe("images/photo1.jpg");
	});

	it('Should open modal', function() {
		var thumbs = $('.gallery-thumb');
		var modal = $('.fullscreen');

		gallery.openModal();

		expect(modal.hasClass('open')).toBe(true);
	});

	it('Should close modal', function() {
		var modal = $('.fullscreen');

		gallery.openModal();
		gallery.closeModal();

		expect(modal.hasClass('open')).toBe(false);
	});
});