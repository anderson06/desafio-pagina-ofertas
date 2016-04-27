var querystring = require("querystring"),
    fs = require("fs"),
    jade = require('jade'),
    path = require('path');

function start(response) {
    console.log("Reques handle 'start' was called.");

    var offers = JSON.parse(fs.readFileSync(__dirname + '/../offer.json').toString());
    var offer = _.findWhere(offers, {id: 0});

    fs.readFile('index.jade', 'utf-8', function(error, source){
      var html = jade.render(source, offer);
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
    });

}

function show(response) {
    console.log("Reques handle 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

function public(path, request, response) {

  var file = path.normalize('.' + req.url);
  console.log('Trying to serve', file);

  function reportError(err) {
    console.log(err);
    response.writeHead(500);
    response.end('Internal Server Error');
  }

  path.exists(file, function(exists) {
    if (exists) {
      fs.stat(file, function(err, stat) {
        var rs;

        if (err) {
          return reportError(err);
        }

        if (stat.isDirectory()) {
          response.writeHead(403);
          response.end('Forbidden');
        } else {
          rs = fs.createReadStream(file);
          rs.on('error', reportError);
          response.writeHead(200);
          rs.pipe(response);
        }
      });
    } else{
      response.writeHead(404);
      response.end('Not found');
    }
  });

}

exports.start = start;
exports.show = show;
