module.exports = function(app) {

    /**
     * 匹配首页
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    app.get('/', function(req, res) {
        res.render('index', {
            title: '首页'
        });
    });

    /**
     * Get the register page
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    app.get('/reg', function(req, res) {
        res.render('reg', {
            title: '用户注册'
        });
    });

    /**
     * Post，do the register
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    app.post('/doReg', function(req, res) {

        if (req.body['confirm-pwd'] !== req.body['password']) {
            req.flash('error', '两次输入的口号不一致.');
            return res.redirect('/reg');
        } else {}
        var crypto = require('crypto');
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');

        var newUser, User = require('../models/user.js');
        newUser = new User({
            name: req.body.username,
            password: password
        });

        newUser.save(function(err) {
                if (err) {
                    //console.log(err);
                    return res.redirect('/reg');
                } else {}
                req.session.user = newUser;
                //req.flash('success', '注册成功！');
                consoel.log('注册成功！');
                res.redirect('/');
        });
        /**
         * 调用get方法，
         * @param  {[type]} err  [description]
         * @param  {[type]} user [description]
         * @return {[type]}      [description]
         */
        
        // User.get(newUser.name, function(err, user) {
        //     if (user) {
        //         err = 'User is alreay exists.';
        //     } else {}
        //     if (err) {
        //         console.log(err);
        //         return res.redirect('/reg');
        //     } else {}

        //     newUser.save(function(err) {
        //         if (err) {
        //             return res.redirect('/reg');
        //         } else {}
        //         req.session.user = newUser;
        //         req.flash('success', '注册成功！');
        //         res.redirect('/');
        //     });

        // });

    });

};