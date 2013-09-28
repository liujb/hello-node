/*
 * GET home page.
 */

var crypto = require('crypto'),
	User = require('../models/user.js');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: '主页',
			messages: req.flash('info')
		});
	});
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册'
		});
	});

	app.get('/flash', function(req, res) {
		req.flash('info', "Flash is back.");
		res.redirect('/');
	});

	/**
	 * [响应注册事件]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.post('/reg', function(req, res) {
		var name = req.body.name,
			password = req.body.password,
			password_re = req.body['password-repeat'];
		if (password_re !== password) {
			req.flash('error', '两次输入密码不一致.');
			return res.redirect('/reg');
		} else {}

		var md5 = crypto.createHash('md5'),
			pwd = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: name,
			password: pwd,
			email: req.body.email
		});
		console.log(newUser.email);
		User.get(newUser.name, function(err, user) {
			if (user) {
				req.flash('error', '用户已存在.');
				return res.redirect('/reg');
			} else {}

			newUser.save(function(err) {
				if (err) {
					req.flash('error', err);
					res.redirect('/');
				} else {}
				req.session.user = newUser; //用户信息存入session
				req.flash('success', '注册成功.');
				res.redirect('/');
			});
		});
	});

	app.get('/login', function(req, res) {
		res.render('login', {
			title: '登录'
		});
	});
	app.post('/login', function(req, res) {});
	app.get('/post', function(req, res) {
		res.render('post', {
			title: '发表'
		});
	});
	app.post('/post', function(req, res) {});
	app.get('/logout', function(req, res) {});
};