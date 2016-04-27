var _ = require("lodash");
var server = require("./app/server");
var router = require("./app/router");
var requestHandlers = require("./app/requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/public"] = _.partial(requestHandlers.public, path.join(__dirname, 'public'));

server.start(router.route, handle);
