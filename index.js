var _ = require("lodash");
var path = require('path');
var server = require("./app/server");
var router = require("./app/router");
var requestHandlers = require("./app/requestHandlers");

var handle = {};
handle.views = path.join(__dirname, 'views');
handle["/"] = requestHandlers.start;
handle["/public"] = _.partial(requestHandlers.staticContent, path.join(__dirname, 'public'));

server.start(router.route, handle);
