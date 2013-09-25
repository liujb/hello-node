/**
 * app.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 18:12:20
 * @version $Id$
 */

var api = require("./insert.js");
api.add(function(err, model) {
		if (err) {
			console.log(err)
		} else {}
	}
})