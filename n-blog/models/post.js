/**
 * post.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-29 20:52:13
 * @version $Id$
 */
var mongodb = require('./db.js');

var Post = function(obj) {
	this.title = obj.title;
	this.content = obj.content;
	this.author = obj.author;
};

module.exports = Post;
Post.fn = Post.prototype;

/**
 * 发表帖子
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Post.fn.save = function(callback) {
	var date = new Date();
	//存储各种时间格式，方便以后扩展
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth() + 1),
		day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
	};

	var post = {
		title: this.title,
		content: this.content,
		author: this.author,
		time: time
	};

	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			return callback(err);
		} else {}

		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			coll.insert(post, {
				safe: true
			}, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {
					callback(null);
				}
			});
		});
	});
};

Post.list = function(name, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			return callback(err);
		} else {}
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			var query = {};
			query.name = name ? name : null;
			coll.find(query).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				callback(null, docs); //成功！以数组形式返回查询的结果
			});
		});
	});
};