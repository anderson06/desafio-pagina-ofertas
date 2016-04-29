var model = require('../../app/client/scripts/model.js');
var optionsView = require('../../app/client/scripts/options-view.js');
var _ = require('lodash');
var $ = require('jquery');
var offer;

describe('options-view', function() {

	beforeEach(function() {
		jasmine.getFixtures().fixturesPath = 'base/test/client/fixtures';
		loadFixtures('options-filter.html');
    offer = {
      "options": [
        {
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
        },
        {
          "id": 1,
          "title": "Noites em Vegas e Albuquerque",
          "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
          "from": [
            "Rio de Janeiro"
          ],
          "daily": 15,
          "price": 2620
        },
        {
          "id": 0,
          "title": "Noites em Vegas e Albuquerque",
          "description": "Atenção, quarto duplo é necessário adquirir 2 pacotes",
          "from": [
            "Manaus",
            "Belém"
          ],
          "daily": 5,
          "price": 2549
        }
      ]
    };
    model.init({offer: offer});
		optionsView.init({offer: offer, model: model});
    optionsView.render();
	});

	it('Should render all options', function() {
		var options = $('.option');
		var fromSelect = $('#saida');
		var dailySelect = $('#n-diarias');

		expect(options.length).toBe(3);

		expect(options.eq(0).find('.option__value-strong span').text()).toBe('2.380');
		expect(options.eq(1).find('.option__value-strong span').text()).toBe('2.549');
		expect(options.eq(2).find('.option__value-strong span').text()).toBe('2.620');

		expect(fromSelect).toContainHtml('<option>Brasilia</option>');
		expect(fromSelect).toContainHtml('<option>Campo Grande</option>');
		expect(fromSelect).toContainHtml('<option>Rio de Janeiro</option>');
		expect(fromSelect).toContainHtml('<option>Manaus</option>');
		expect(fromSelect).toContainHtml('<option>Belém</option>');

		expect(dailySelect).toContainHtml('<option>5</option>');
		expect(dailySelect).toContainHtml('<option>15</option>');
	});

  describe('on origin change', function() {

    var options;
    var fromSelect;
    var dailySelect;

    beforeEach(function() {
      fromSelect = $('#saida');
      dailySelect = $('#n-diarias');

      fromSelect.val("Manaus").change();

      options = $('.option');
    });

    it('should render options and filter only from that origin', function() {
      optionsView.render();

      expect(options.length).toBe(1);

      expect(options.eq(0).find('.option__value-strong span').text()).toBe('2.549');

      expect(fromSelect).toContainText('Brasilia');
      expect(fromSelect).toContainText('Campo Grande');
      expect(fromSelect).toContainText('Rio de Janeiro');
      expect(fromSelect).toContainText('Manaus');
      expect(fromSelect).toContainText('Belém');

      expect(fromSelect.find("option:selected")).toContainText('Manaus');

      expect(dailySelect).toContainHtml('<option>5</option>');
    });
  });

  describe('on daily change', function() {

    var options;
    var fromSelect;
    var dailySelect;

    beforeEach(function() {
      fromSelect = $('#saida');
      dailySelect = $('#n-diarias');
      dailySelect.val(15).change();
      options = $('.option');
    });

    it('should render options and filter only from that origin', function() {
      optionsView.render();

      expect(options.length).toBe(1);

      expect(options.eq(0).find('.option__value-strong span').text()).toBe('2.620');

      expect(fromSelect).toContainText('Rio de Janeiro');

      expect(dailySelect).toContainText('5');
      expect(dailySelect).toContainText('15');
    });
  });

  describe('on origin and daily change', function() {

    var options;
    var fromSelect;
    var dailySelect;

    beforeEach(function() {
      fromSelect = $('#saida');
      dailySelect = $('#n-diarias');

      fromSelect.val("Rio de Janeiro").change();
      dailySelect.val("15").change();
      options = $('.option');
    });

    it('should render options and filter only from that origin', function() {
      optionsView.render();

      expect(options.length).toBe(1);

      expect(options.eq(0).find('.option__value-strong span').text()).toBe('2.620');

      expect(fromSelect).toContainText('Rio de Janeiro');

      expect(fromSelect.find("option:selected")).toContainText('Rio de Janeiro');
      expect(dailySelect.find("option:selected")).toContainText('5');

      expect(dailySelect).toContainText('5');
    });
  });
});
