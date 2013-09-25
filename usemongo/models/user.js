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
 * [insert an user to mongodb]
 * @param  {[type]}   user     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
User.fn.insert = function(callback) {

	//create the object
	var obj = {
		name: this.name,
		password: this.password,
		age: this.age,
		sex: this.sex,
		note: this.note
	};

	//open the database
	db.open(function(err, db) {

		//call the users collection
		db.collection("users", function(err, coll) {
			//insert action
			coll.insert(obj, function(err, result) {
				//close the database
				db.close(function(err, result) {});
				if (err) {
					callback(err, null);
				} else {
					callback(null, result);
				}
			});
		});
	});
};

/**
 * [delete an user]
 * @param  {[type]}   user     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
User.remove = function(user, callback) {
	db.open(function(err, db) {
		db.collection("users", function(err, coll) {
			coll.remove(user, function(err, result) {
				db.close(function(err, result) {});
				if (!err) {
					callback(null, result);
				} else {
					callback(err, null);
				}
				
			});
		});
	});
};

/**
 * [get list by conditions]
 * @param  {[type]}   condition [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
User.list = function(condition, callback) {
	db.open(function(err, db) {
		db.collection("users", function(err, coll) {
			coll.find(condition).toArray(function(err, list) {
				if (err) {
					callback(err, null);
				} else {
					callback(null, list);
				}
			});
			db.close(function(err, result) {});
		});
	});
};

module.exports = User;