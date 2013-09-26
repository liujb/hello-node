/**
 *
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 18:12:20
 * @version $Id$
 */
var runMsg = function(err, obj) {
	if (err) {
		console.log("Occurd an error: " + err);
	} else if (obj) {
		console.log('Run successed! Return an object is :\n' + obj.toString());
	} else {
		console.log("successed.");
	}
};

var User = require("./models/user.js");
if (User) {
	var user = new User({
		name: "allen_2",
		age: 18
	});

	//insert
	// user.insert(function(err, obj) {
	// 	runMsg(err, obj);
	// });

	//remove
	User.remove(user, function(err, obj) {
		runMsg(err, obj);
	});

	// User.list({
	// 	name: "allen_2"
	// }, function(err, obj) {
	// 	runMsg(err, obj);
	// });

} else {}