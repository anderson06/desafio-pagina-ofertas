var _ = require("lodash");
var path = require('path');
var server = require("./app/server/server");
var router = require("./app/server/router");
var requestHandlers = require("./app/server/requestHandlers");

var handle = {};
handle.views = path.join(__dirname, 'app/server/views');
handle["/"] = requestHandlers.start;
handle["/public"] = _.partial(requestHandlers.staticContent, path.join(__dirname, 'public'));

server.start(router.route, handle);
