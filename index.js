'use strict';

module.exports = require('./lib/middleware.js');
module.exports.handlers = {
	file: require('./lib/handlers/file.js')
};