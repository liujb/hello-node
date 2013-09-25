/**
 * user.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-25 10:38:57
 * @version $Id$
 */

/**
 * User class
 * @param {[type]} user [description]
 */

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.age = user.age;
	this.sex = user.sex;
	this.note = user.note;
}

User.fn = User.prototype;

var db = require("../db.js");

/**
 * insert an user to mongodb
 * @param  {[type]}   user     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
User.fn.insert = function(callback) {

	//
	var obj = {
		name: this.name,
		password: this.password,
		age: this.age,
		sex: this.sex,
		note: this.note
	};
	db.open(function(err, db) {
		if (err) {
			console.log('Open database occur a err: ' + err);
		} else {}
		db.collection("users", function(err, coll) {
			coll.insert(obj, function(err, result) {
				if (err) {
					console.log("Insert an object to db occur a err: " + err);
					db.close(function(err, result) {});
				} else {
					console.log("Insert successed!");
					console.log(result);
				}
			});
		});
	});

};