var optionsView = require('../app/client/scripts/options-view.js');
var offers = require('../app/server/data/offer.json');
var _ = require('lodash');

describe('options-view', function() {
	var offer = {};

	option1 = {
		"id": 2,
		"title": "Noites em Vegas e Albuquerque",
		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		"from": [
			"Brasilia",
			"Campo Grande",
			"Rio de Janeiro"
		],
		"daily": 5,
		"price": 2380
	};

	option2 = {
		"id": 1,
		"title": "Noites em Vegas e Albuquerque",
		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		"from": [
			"Rio de Janeiro"
		],
		"daily": 15,
		"price": 2620
	};

	option3 = {
		"id": 0,
		"title": "Noites em Vegas e Albuquerque",
		"description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
		"from": [
			"Manaus",
			"Belém"
		],
		"daily": 5,
		"price": 2549
	};

	offer.options = [option1, option2, option3];

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
		loadFixtures('options-filter.html');
		optionsView.init({offer: offer});
	});

	it('Should return options sorterd by price', function() {
		var options = optionsView.getFilteredOptions();
		expect(options).toEqual([option1, option3, option2]);
	});

	it('Should filter from', function() {
		var options = optionsView.getFilteredOptions('Rio de Janeiro');

		expect(options).toEqual([option1, option2]);
	});

	it('Should filter daily', function() {
		var options = optionsView.getFilteredOptions(null, 5);

		expect(options).toEqual([option1, option3]);
	});

	it('Should filter daily and from simutaneously', function() {
		var options = optionsView.getFilteredOptions('Rio de Janeiro', 5);

		expect(options).toEqual([option1]);
	});

	it('Should clear after filters', function() {
		optionsView.getFilteredOptions('Rio de Janeiro', 5);
		optionsView.getFilteredOptions('Rio de Belém', 15);
		optionsView.getFilteredOptions('Rio de Janeiro', 0);
		var options = optionsView.getFilteredOptions(null, null);

		expect(options).toEqual([option1, option3, option2]);
	});

	it('Should render ui', function() {
		var options = $('.option');
		var fromSelect = $('#saida');
		var dailySelect = $('#n-diarias');

		expect(options.length).toExist();
		expect(options.length).toBe(3);

		expect(options.eq(0).find('.value span').text()).toBe('2380');
		expect(options.eq(1).find('.value span').text()).toBe('2549');
		expect(options.eq(2).find('.value span').text()).toBe('2620');

		expect(fromSelect).toContainHtml('<option>Brasilia</option>');
		expect(fromSelect).toContainHtml('<option>Campo Grande</option>');
		expect(fromSelect).toContainHtml('<option>Rio de Janeiro</option>');
		expect(fromSelect).toContainHtml('<option>Manaus</option>');
		expect(fromSelect).toContainHtml('<option>Belém</option>');

		expect(dailySelect).toContainHtml('<option>5</option>');
		expect(dailySelect).toContainHtml('<option>15</option>');
	});
});
