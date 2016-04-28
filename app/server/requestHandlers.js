var fs = require("fs");
var jade = require('jade');
var path = require('path');
var _ = require("lodash");
var numberFormat = require("underscore.string/numberFormat");

_.numberFormat = numberFormat;

function start(response) {
    console.log("Request handle 'start' was called.");

    var offers = JSON.parse(fs.readFileSync(__dirname + '/data/offer.json').toString());
    var offer = _.findWhere(offers, {id: 0});

    // Duplica as fotos para testar a galeria
    Array.prototype.push.apply(offer.photos, offer.photos);

    offer.options = _.sortBy(offer.options, 'price');

    _.forEach(offer.options, function(option) {
      option.formattedPrice = _.numberFormat(option.price, 0, ",", ".");
    });

	  var froms = _.chain(offer.options)
      .map(function(option) { return option.from; })
      .flatten()
      .sort()
      .uniq()
      .value();

	  var dailys = _.chain(offer.options)
      .map(function(option) { return option.daily; })
      .sort(function(a, b) { return a - b; })
      .uniq()
      .value();

    var data = {
      offer: offer,
      froms: froms,
      dailys: dailys,
      pretty: true
    };

    jade.renderFile(this.views + '/index.jade', data, function(err, html) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
    });
}

function staticContent(root, response, request, pathname) {

  var file = root + pathname.replace("/public", "");

  console.log('Trying to serve', file);

  fs.stat(file, function(err, stat) {
    var rs;

    if (err) {
      response.writeHead(404);
      response.end('Not found');
    } else if (stat.isDirectory()) {
      response.writeHead(403);
      response.end('Forbidden');
    } else {
      rs = fs.createReadStream(file);
      rs.on('error', function() {
        response.writeHead(500);
        response.end('Internal Server Error');
      });
      response.writeHead(200);
      rs.pipe(response);
    }
  });

}

exports.start = start;
exports.staticContent = staticContent;
