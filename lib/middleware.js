'use strict';

var debug;
if (process.env.NODE_DEBUG && /php\-session\-middleware/.test(process.env.NODE_DEBUG)) {
  debug = function(x) { console.error('Session Error: %s', x); };
} else {
  debug = function() { };
}

module.exports = function Middleware(config) {
	var sidName = config.sidName || 'PHPSESSID';
	var handlerName = config.handler || 'file';
	var handlerOpts = config.opts || {};
	var handlerClass = require(__dirname + '/handlers/' + handlerName + '.js');
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
			req.sessionError = e;
			return next();
		});
	}
}