/*
 * GET home page.
 */

var crypto = require('crypto'),
	User = require('../models/user.js');

module.exports = function(app) {

	/**
	 * 首页
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/', function(req, res) {
		res.render('index', {
			title: '主页',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString(),
			messages: req.flash('info').toString()
		});
	});

	/**
	 * 注册页面
	 */
	app.get('/reg', checkLogin);

	/**
	 * 注册页面
	 */
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/reg', checkLogin);

	/**
	 * 注册
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

	app.get('/login', checkLogin);
	app.get('/login', function(req, res) {
		res.render('login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/reg', checkLogin);
	/**
	 * 登录
	 */
	app.post('/login', function(req, res) {
		var name = req.body.name,
			pwd = req.body.password,
			md5 = crypto.createHash('md5'),
			pwd_md5 = md5.update(pwd).digest('hex');
		User.get(name, function(err, user) {
			if (!user) {
				req.flash('error', '用户不存在.');
				res.redirect('/');
			} else {}
			if (user.password !== pwd_md5) {
				req.flash('error', '密码不正确.');
			} else {
				req.session.user = user;
				req.flash('success', '登录成功.');
				res.redirect('/');
			}
		});
	});
	app.get('/reg', checkLogin);
	app.get('/post', function(req, res) {
		res.render('post', {
			title: '发表'
		});
	});
	app.get('/reg', checkLogin);
	app.post('/post', function(req, res) {});

	app.get('/reg', checkLogin);
	/**
	 * 注销
	 */
	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.flash('success', '注销成功.');
		res.redirect('/');
	});


	function checkNotLogin(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录！');
			res.redirect('/login');
		} else {
			next();
		}

	}

	function checkLogin(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录.');
			res.redirect('back');
		} else {
			next();
		}

	}
};