/**
 * crud.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-24 23:30:58
 * @version $Id$
 */

var db = require("./db.js");
db.open(function(err, db) {
	if (err) {
		console.log(err);
		return;
	} else {}
	console.log('connect to the mongodb');

	db.collection("users", function(err, collection) {

		//insert a object to mongodb
		collection.insert({
			username: "liujb",
			age: 23,
			sex: 'man'
		}, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log('Insert successed!');
				console.log(result);
			}
		});

		//find some objects
		collection.find({}).toArray(function(err, results) {
			db.close(function(err, result) {
				if (err) {
					console.log('Close connection failed.');
					return;
				} else {}
				console.log(results); //an array
				console.log(result); //undefined
			});
		});

	});


});