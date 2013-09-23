/**
 * insert document to mongodb
 * @authors Your Name (you@example.org)
 * @date    2013-09-23 17:22:36
 * @version $Id$
 */


var db = require("./db.js");

exports.add = function(callback) {
	var model = require('./model.js');
	if (!model || !db) {
		callback('Exceptions');
		return;
	} else {}
	db.open(function(err, db) {
		if (err) {
			callback(err);
			return;
		} else {}
		db.collection("users", function(err, collection) {
			if (err) {
				callback(err);
				return;
			} else {}

			//插入记录
			collection.insert(model, {}, function(err, model) {
				db.close();
				callback(err, model);
			});
		});
	});
};