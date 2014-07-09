/**
 * [User]
 * @param {[type]} user [description]
 */

function User(user) {
    this.name = user.name;
    this.password = user.password;
}


var mongodb = require('./db');

/**
 * 保存用户
 * @param callback
 */
User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password
    };

    //建立数据库连接
    mongodb.open(function(err, db) {

        if (err) {
            console.log(err);
            mongodb.close();
            return callback(err);
        } else {}

        //读取users集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            } else {}
            //为name属性添加索引
            collection.ensureIndex('name', {
                unique: true
            });

            //写入user文档
            collection.insert(user, {
                safe: true
            }, function(err, user) {
                //关闭数据库并执行回调函数
                mongodb.close();
                callback(err, user);
            });
        });
    });
};

/**
 * 检测用户是否存在
 * @param username
 * @param callback
 */
User.get = function get(username, callback) {

    //建立数据库连接
    mongodb.open(function(err, db) {
        if (err) {
            //如果数据库连接有误，则返回
            return callback(err);
        } else {}

        //读取users集合
        db.collection('users', function(err, collection) {
            if (err) {
                //读取users集合有误，关闭数据库连接并返回
                mongodb.close();
                return callback(err);
            } else {}

            //查找name属性为username的文档
            collection.findOne({
                name: username
            }, function(err, doc) {
                mongodb.close();//关闭数据库
                if (doc) {
                    var user = new User(doc);
                    callback(err, user);
                } else {
                    callback(err, null);
                }
            });
        });
    });
};

module.exports = User;