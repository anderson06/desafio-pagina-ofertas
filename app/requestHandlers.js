var fs = require("fs");
var jade = require('jade');
var path = require('path');
var _ = require("lodash");

function start(response) {
    console.log("Request handle 'start' was called.");

    var offers = JSON.parse(fs.readFileSync(__dirname + '/../offer.json').toString());
    var offer = _.findWhere(offers, {id: 0});

    var templatePath = this.views + '/index.jade';

    //pretty: true

    jade.renderFile(templatePath, {offer: offer}, function(err, html) {
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
