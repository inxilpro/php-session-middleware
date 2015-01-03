'use strict';

var debug = require('util').debuglog('php-session-middleware');

module.exports = function Middleware(config) {
	var sidName = config.sidName || 'PHPSESSID';
	var handlerName = config.handler || 'file';
	var handlerOpts = config.opts || {};
	var handlerClass = require('./lib/handlers/' + handlerName + '.js');
	var handler = new handlerClass(handlerOpts);

	return function (req, res, next) {
		var sid = null;
		if (req.cookies && req.cookies[sidName]) {
			sid = req.cookies[sidName];
		} else if (req.query[sidName]) {
			sid = req.query[sidName];
		}

		// Stop if there's no session ID
		if (!sid) {
			return next();
		}

		handler.getSession(sid).then(function(session) {
			req.session = session;
			return next();
		}).catch(function(e) {
			debug(e.message);
			return next();
		});
	}
}