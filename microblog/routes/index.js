module.exports = function (app) {

    //获取首页
    app.get('/', function (req, res) {
        res.render('index', {title: '首页'});
    });

    //获取注册页面
    app.get('/reg', function (req, res) {
        res.render('reg', {title: '用户注册'});
    });

    //注册
    app.post('/doReg', function (req, res) {

        if (req.body['confirm-pwd'] !== req.body['password']) {
            req.flash('error', '两次输入的口号不一致.');
            return res.redirect('/reg');
        } else {
        }
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser
            , User = require('../models/user.js');
        newUser = new User({
            name: req.body.username,
            password: password
        });


        User.get(newUser.name, function (err, user) {
            if (user) {
                err = 'User is alreay exists.';
            } else {
            }
            if (err) {
                req.flash('error', err);
            } else {
            }

            newUser.save(function (err) {
                if (err) {
                    req.flash('error', err);
                } else {
                }
                req.session.user = newUser;
                req.flash('success', '注册成功！');
                res.redirect('/');
            });
        });

    });

};