/**
 *
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 17:11:02
 * @version $Id$
 */

//require setting.js
var setting = require("./setting.js"),
	mongoose = require('mongoose');

//Full server uri
var uri = "mongodb://" + setting.server + "/" + setting.db;

//connect server
mongoose.connect(uri);

//抛出mongoose对象
module.exports = mongoose;