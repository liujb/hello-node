var mongodb = require('./db');
function User(user) {
    this.name = user.name;
    this.password = user.password;
};

module.exports = User;

/**
 * 保存用户
 * @param callback
 */
User.prototype.save = function save(callback) {
    var user = {
        name: this.name,
        password: this.password
    };

    console.log("fuck");

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        } else {
        }
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            } else {
            }
            collection.ensureIndex('name', {unique: true});
            collection.insert(user, {safe: true}, function (err, user) {
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
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        } else {
        }
        db.collection('users', function (err, collection) {
            if (err) {
                callback(err);
            } else {
            }
            collection.findOne({name: username}, function (err, doc) {
                mongodb.close();
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