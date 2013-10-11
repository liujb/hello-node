/**
 * comment.js
 * @authors Your Name (you@example.org)
 * @date    2013-10-10 15:02:15
 * @version $Id$
 */

var mongodb = require('./db.js');
var Comment = function(name, day, title, comment) {
	this.name = name;
	this.day = day;
	this.title = title;
	this.comment = comment;
};

module.exports = Comment;

Comment.fn = Comment.prototype;

Comment.fn.save = function(callback) {
	var name = this.name,
		day = this.day,
		title = this.title,
		comment = this.comment;
	console.log(name + day + title);
	console.log(comment);
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}

		//通过用户名、时间及标题查找文档，并把一条留言对象添加到该文档的 comments 数组里
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			coll.update({
				"author": name,
				"time.day": day,
				"title": title
			}, {
				$push: {
					"comments": comment
				}
			}, function(err, result) {
				console.log("err: " + err + " result: " + result);
				mongodb.close();
				callback(null);
			});
		});
	});
};