/**
 * test connect to mongodb
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 22:35:41
 * @version $Id$
 */

var db = require("./db.js");
db.open(function(err, db) {
	if (!err) {
		console.log('connect to the mongodb');
	} else {
		console.log(err);
	}
});