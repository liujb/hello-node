/**
 * test connect
 * @authors Your Name (you@example.org)
 * @date    2013-09-26 13:34:38
 * @version $Id$
 */

var db = require("./db.js").connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
	console.log('connect to mongodb is ok.');
});