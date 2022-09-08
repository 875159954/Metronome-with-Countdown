"use strict";

// server.js
var _require = require("http"),
    createServer = _require.createServer;

var _require2 = require("url"),
    parse = _require2.parse;

var next = require("next");

var dev = process.env.NODE_ENV !== "production";
var hostname = "localhost";
var port = 3000; // when using middleware `hostname` and `port` must be provided below

var app = next({
  dev: dev,
  hostname: hostname,
  port: port
});
var handle = app.getRequestHandler();
app.prepare().then(function () {
  createServer(function _callee(req, res) {
    var parsedUrl, pathname, query;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            parsedUrl = parse(req.url, true);
            pathname = parsedUrl.pathname, query = parsedUrl.query;

            if (!(pathname === "/a")) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return regeneratorRuntime.awrap(app.render(req, res, "/a", query));

          case 6:
            _context.next = 15;
            break;

          case 8:
            if (!(pathname === "/b")) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return regeneratorRuntime.awrap(app.render(req, res, "/b", query));

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return regeneratorRuntime.awrap(handle(req, res, parsedUrl));

          case 15:
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            console.error("Error occurred handling", req.url, _context.t0);
            res.statusCode = 500;
            res.end("internal server error");

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 17]]);
  }).listen(port, function (err) {
    if (err) throw err;
    console.log("> Ready on http://".concat(hostname, ":").concat(port));
  });
});