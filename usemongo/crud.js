/**
 * crud.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-24 23:30:58
 * @version $Id$
 */

var db = require("./db.js");
var assert = require("assert");

db.open(function(err, db) {
	if (err) {
		console.log(err);
	} else {}
	console.log('connect to the mongodb');

	db.collection("users", function(err, collection) {

		//insert a object to mongodb
		// collection.insert({
		// 	username: "liujb",
		// 	age: 23,
		// 	sex: 'man'
		// }, function(err, result) {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		console.log('Insert successed!');
		// 		console.log(result);
		// 	}
		// });
		

		// collection.update({
		// 	username: "liujb"
		// }, {
		// 	username: "liujb",
		// 	age: 24,
		// 	sex: "woman"
		// }, function(err, result) {
		// 	if (!err) {
		// 		console.log('Update an object successed.');
		// 		db.close(function(err, result) {
		// 			if (!err) {
		// 				console.log('After update an object close database successed.');
		// 			} else {
		// 				console.log('After update an object close database occur err:' + err);
		// 			}
		// 		});
		// 	} else {
		// 		console.log('Update an object occur an err: ' + err);
		// 	}
		// });

		//find some objects
		collection.find({}).toArray(function(err, results) {
			db.close(function(err, result) {
				if (err) {
					console.log('Close connection failed.');
				} else {}
				console.log(results); //an array
				//console.log(result); //undefined
			});
		});



		//remove an object
		// collection.remove({
		// 	username: "liujb"
		// }, function(err, result) {
		// 	if (!err) {
		// 		console.log('Remove an user successed.');
		// 		db.close(function(err, result) {
		// 			if (err) {
		// 				console.log('Close the connection occur an error: ' + err);
		// 			} else {}
		// 		});
		// 	} else {}
		// });

	});


});