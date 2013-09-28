/**
 * user model
 * @authors Your Name (you@example.org)
 * @date    2013-09-28 13:52:05
 * @version $Id$
 */

var mongodb = require('./db.js');
var User = function(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports = User;

User.fn = User.prototype;

User.fn.save = function(callback) {
	//要存入数据库的对象
	var obj = {
		name: this.name,
		password: this.password,
		email: this.email
	};

	//打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			// 如果出现错误则返回
			return callback(err);
		} else {}

		//访问“users”集合
		db.collection('users', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			} else {}

			//将用户数据插入到users集合中
			collection.insert(obj, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				} else {
					//表示成功，可以返回result就是插入后的对象
					callback(null);
				}
			});
		});
	});
};

User.get = function(name, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		} else {}

		db.collection('users', function(err, collection) {
			collection.findOne({
				name: name
			}, function(err, user) {
				mongodb.close();
				if (user) {
					return callback(null, user); //返回查询的用户信息
				} else {}
				callback(err);
			});
		});
	});
};