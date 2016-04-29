var model = require('../../app/client/scripts/model.js');
var optionsView = require('../../app/client/scripts/options-view.js');
var _ = require('lodash');

var offer = {
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

var origins = [
  {selected: false, text: 'Belém'},
  {selected: false, text: 'Brasilia'},
  {selected: false, text: 'Campo Grande'},
  {selected: false, text: 'Manaus'},
  {selected: false, text: 'Rio de Janeiro'},
];

var dailyList = [
  {selected: false, text: 5},
  {selected: false, text: 15}
];

describe('Model', function() {

  beforeEach(function() {
    model.init({offer: offer});
  });

  // options

  it('Should return all options sorted by price', function() {
    var options = model.getFilteredOptions("todas", "todas");
    expect(options).toEqual([offer.options[0], offer.options[2], offer.options[1]]);
  });

  it('Should filter options by origin', function() {
    var options = model.getFilteredOptions('Rio de Janeiro', "todas");

    expect(options).toEqual([offer.options[0], offer.options[1]]);
  });

  it('Should filter options by daily', function() {
    var options = model.getFilteredOptions('todas', 15);

    expect(options).toEqual([offer.options[1]]);
  });

  it('Should filter options by origin and daily', function() {
    expect(model.getFilteredOptions('Manaus', 15)).toEqual([]);
    expect(model.getFilteredOptions('Rio de Janeiro', 15)).toEqual([offer.options[1]]);
  });

  // origins

  it('Should return all origins', function() {
    var filteredOrigins = model.getFilteredFrom("todas", "todas");

    expect(filteredOrigins).toEqual(origins);
  });

  it('Should filter origins by origin', function() {
    expect(model.getFilteredFrom('Rio de Janeiro', "todas")).toEqual([
      {selected: false, text: 'Belém'},
      {selected: false, text: 'Brasilia'},
      {selected: false, text: 'Campo Grande'},
      {selected: false, text: 'Manaus'},
      {selected: true, text: 'Rio de Janeiro'},
    ]);

    expect(model.getFilteredFrom('Belém', "todas")).toEqual([
      {selected: true, text: 'Belém'},
      {selected: false, text: 'Brasilia'},
      {selected: false, text: 'Campo Grande'},
      {selected: false, text: 'Manaus'},
      {selected: false, text: 'Rio de Janeiro'},
    ]);

    expect(model.getFilteredFrom('Test', "todas")).toEqual([
      {selected: false, text: 'Belém'},
      {selected: false, text: 'Brasilia'},
      {selected: false, text: 'Campo Grande'},
      {selected: false, text: 'Manaus'},
      {selected: false, text: 'Rio de Janeiro'},
    ]);
  });

  it('Should filter origins by daily', function() {
    expect(model.getFilteredFrom('todas', 5)).toEqual([
      {selected: false, text: 'Belém'},
      {selected: false, text: 'Brasilia'},
      {selected: false, text: 'Campo Grande'},
      {selected: false, text: 'Manaus'},
      {selected: false, text: 'Rio de Janeiro'},
    ]);

    expect(model.getFilteredFrom('todas', 15)).toEqual([
      {selected: false, text: 'Rio de Janeiro'},
    ]);
  });

  it('Should filter origins by origin and daily', function() {
    var filteredOrigins = model.getFilteredFrom('Brasilia', 5);

    expect(model.getFilteredFrom('Brasilia', 5)).toEqual([
      {selected: false, text: 'Belém'},
      {selected: true, text: 'Brasilia'},
      {selected: false, text: 'Campo Grande'},
      {selected: false, text: 'Manaus'},
      {selected: false, text: 'Rio de Janeiro'},
    ]);

    expect(model.getFilteredFrom('Rio de Janeiro', 15)).toEqual([
      {selected: true, text: 'Rio de Janeiro'},
    ]);
  });

  // daily list

  it('Should return all daily list', function() {
    expect(model.getFilteredDaily("todas", "todas")).toEqual(dailyList);
  });

  it('Should filter daily list by origin', function() {
    var filteredDailyList = model.getFilteredDaily('Rio de Janeiro', "todas");

    expect(model.getFilteredDaily('Rio de Janeiro', "todas")).toEqual(dailyList);
    expect(model.getFilteredDaily('Brasilia', "todas")).toEqual([{selected: false, text: 5}]);
  });

  it('Should filter daily list by daily', function() {
    expect(model.getFilteredDaily('todas', 15)).toEqual([
      {selected: false, text: 5},
      {selected: true, text: 15}
    ]);

    expect(model.getFilteredDaily('todas', 5)).toEqual([
      {selected: true, text: 5},
      {selected: false, text: 15}
    ]);
  });

  it('Should filter daily list by origin and daily', function() {
    var filteredDailyList = model.getFilteredDaily('Brasilia', 5);

    expect(filteredDailyList).toEqual([{selected: true, text: 5}]);
  });

});
