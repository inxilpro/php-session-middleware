# PHP Session Middleware

[![Build Status](https://travis-ci.org/inxilpro/php-session-middleware.svg)](https://travis-ci.org/inxilpro/php-session-middleware) [![Dependency Status](https://david-dm.org/inxilpro/php-session-middleware.svg)](https://david-dm.org/inxilpro/php-session-middleware)

This is simple Express/Connect middleware that loads PHP sessions in
an express request.

## Installation

``` bash
$ npm install php-session-middleware --save
```

## Usage

``` js
var PhpSessionMiddleware = require('php-session-middleware');
app.use(new PhpSessionMiddleware({
	handler: 'file',
	opts: {
		path: '/tmp/'
	}
}));
app.get('/restricted', function(req, res) {
	if (req.session && req.session.user_id) {
		// Do something with session
	}
});
```

## Roadmap
  - Optionally parse `php.ini` for configuration
  - Allow for other session handlers, such as memcached
  - Implement many more tests

## Change Log

### Initial release
  - This is the initial release, with minimal testing.  Use at your own risk.