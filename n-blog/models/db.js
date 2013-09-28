/**
 * db.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-26 21:51:51
 * @version $Id$
 */

var settings = require('../setting.js'),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));