/**
 * post.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-29 20:52:13
 * @version $Id$
 */
var mongodb = require('./db.js');
var markdown = require('markdown').markdown;

/**
 * Post类
 * @param {[type]} obj [description]
 */
var Post = function(obj) {
	this.title = obj.title;
	this.content = obj.content;
	this.author = obj.author;
	this.tags = obj.tags;
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
		time: time,
		tags: this.tags,
		comments: []
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

/**
 * [获取帖子列表]
 * @param  {[type]}   name     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Post.list = function(name, pageIndex, callback) {
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
			//查询条件
			var query = {};
			if (name) {
				query.author = name;
			} else {}

			coll.count(query, function(err, total) {
				coll.find(query, {
					skip: (pageIndex - 1) * 10,
					limit: 10
				}).sort({
					time: -1
				}).toArray(function(err, docs) {
					mongodb.close();
					if (err) {
						return callback(err);
					} else {}
					//循环docs
					//将内容输出为html
					docs.forEach(function(doc) {
						doc.content = markdown.toHTML(doc.content);
					});
					callback(null, docs, total); //成功！以数组形式返回查询的结果
				});
			});
		});
	});
};

/**
 * 根据姓名，日期，标题获取具体的一篇帖子
 * @param  {[type]}   name     [description]
 * @param  {[type]}   day      [description]
 * @param  {[type]}   title    [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
Post.getOne = function(name, day, title, callback) {
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
			coll.findOne({
				"author": name,
				"time.day": day,
				"title": title
			}, function(err, doc) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				//解析为markdown
				doc.content = markdown.toHTML(doc.content);
				doc.comments.forEach(function(comment) {
					comment.content = markdown.toHTML(comment.content);
				});
				callback(null, doc);
			});
		});
	});
};

Post.edit = function(name, day, title, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			coll.findOne({
				"author": name,
				"time.day": day,
				"title": title
			}, function(err, doc) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				callback(null, doc);
			});
		});
	});
};

Post.getArchive = function(callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			coll.find({}, {
				'author': 1,
				'time': 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				callback(null, docs);
			});
		});
	});
};

Post.update = function(name, day, title, content, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			console.log(err);
			return callback(err);
		} else {}
		console.log("xxx");
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			console.log("xxx2");
			coll.update({
				"author": name,
				"time.day": day,
				"title": title
			}, {
				$set: {
					"content": content
				}
			}, function(err, result) {
				mongodb.close();
				if (err) {
					console.log(err);
					return callback(err);
				} else {}

				callback(null);
			});
		});
	});
};

Post.remove = function(name, day, title, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			coll.remove({
				"author": name,
				"time.day": day,
				"title": title
			}, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				callback(null);
			});
		});
	});
};

Post.getTags = function(callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}
		db.collection('post', function(err, coll) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}
			//distinct 用来找出给定键的所有不同值
			coll.distinct("tags.tag", function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {}
				callback(null, docs);
			});
		});
	});
};

//返回含有特定标签的所有文章
Post.getTag = function(tag, callback) {
	console.log(tag);
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('post', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			//通过 tags.tag 查询并返回只含有 name、time、title 键的文档组成的数组
			collection.find({
				"tags.tag": tag
			}, {
				"author": 1,
				"time": 1,
				"title": 1
			}).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};