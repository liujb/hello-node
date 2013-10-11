/*
 * GET home page.
 */

var crypto = require('crypto'),
	fs = require('fs'),
	User = require('../models/user.js'),
	Post = require('../models/post.js'),
	Comment = require('../models/comment.js');

module.exports = function(app) {

	/**
	 * 首页
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/', function(req, res) {
		var pageIndex = req.query.p ? parseInt(req.query.p) : 1;
		Post.list(null, pageIndex, function(err, posts, total) {
			if (err) {
				posts = [];
			} else {}
			res.render('index', {
				title: '主页',
				user: req.session.user,
				posts: posts,
				pageIndex: pageIndex,
				isFirstPage: (pageIndex - 1) === 0,
				isLastPage: ((pageIndex - 1) * 10 + posts.length) === total,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	/**
	 * 注册页面
	 */
	app.get('/reg', notLogin_next);

	/**
	 * 注册页面
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/reg', function(req, res) {
		res.render('reg', {
			title: '注册',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	/**
	 *
	 */
	app.post('/reg', notLogin_next);

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

	/**
	 *
	 */
	app.get('/login', notLogin_next);

	/**
	 * [description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/login', function(req, res) {
		res.render('login', {
			title: '登录',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	/**
	 *
	 */
	app.post('/login', notLogin_next);

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
				return; //这个return很有必要
			} else {}
			if (user["password"] !== pwd_md5) {
				req.flash('error', '密码不正确.');
			} else {
				req.session.user = user;
				req.flash('success', '登录成功.');
				res.redirect('/');
			}
		});
	});

	/**
	 *
	 */
	app.get('/post', login_next);

	/**
	 * [description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/post', function(req, res) {
		res.render('post', {
			title: 'Post',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	/**
	 *
	 */
	app.get('/post', login_next);

	/**
	 * [description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.post('/post', function(req, res) {
		var post = new Post({
			title: req.body.title,
			content: req.body.content,
		});
		if (!post.title) {
			req.flash('error', "标题不能为空.");
			res.redirect('/post');
			return;
		} else {}
		if (!post.content) {
			req.flash('error', "内容不能为空.");
			res.redirect('/post');
			return;
		} else {}

		var currentUser = req.session.user;
		if (currentUser && currentUser.name) {
			post.author = currentUser.name;
		} else {}

		post.save(function(err) {
			if (err) {
				req.flash('error', '发布失败.');
				return res.redirect('/post');
			} else {
				req.flash('success', '发布成功!');
				res.redirect('/');
			}
		});
	});

	/**
	 *
	 */
	app.get('/logout', login_next);

	/**
	 * 注销
	 */
	app.get('/logout', function(req, res) {
		req.session.user = null;
		req.flash('success', '注销成功.');
		res.redirect('/');
	});

	/**
	 * 上传文件
	 */
	app.get('/upload', login_next);
	app.get('/upload', function(req, res) {
		res.render('upload', {
			title: '文件上传',
			user: req.session.user,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

	app.post('/upload', login_next);
	app.post('/upload', function(req, res) {
		for (var f in req.files) {
			if (req.files[f].size === 0) {
				fs.unlinkSync(req.files[f].path);
				console.log('Successfully removed an empty folder.');
			} else {
				var target_path = './public/upload/images/' + req.files[f].name;
				fs.renameSync(req.files[f].path, target_path);
				console.log('Successfully renamed a file.');
			}
		}
		req.flash('success', '文件上传成功.');
		res.redirect('/upload');
	});

	app.get('/archive', function(req, res) {
		Post.getArchive(function(err, docs) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			} else {}
			res.render('archive', {
				title: 'Archive',
				posts: docs,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	/**
	 * 获取帖子列表
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	app.get('/u/:name', function(req, res) {

		User.get(req.params.name, function(err, user) {
			if (!user) {
				req.flash('error', '用户不存在.');
				return res.redirect('/');
			} else {}
			var pageIndex = req.query.p ? parseInt(req.query.p) : 1;
			Post.list(user.name, pageIndex, function(err, docs, total) {
				if (err) {
					req.flash('error', err);
					return res.redirect('/');
				} else {}
				res.render('user', {
					title: user.name,
					posts: docs,
					user: req.session.user,
					pageIndex: pageIndex,
					isFirstPage: pageIndex === 0,
					isLastPage: ((pageIndex - 1) * 10 + docs.length) === total,
					success: req.flash('success').toString(),
					error: req.flash('error').toString()
				});
			});
		});
	});

	app.get('/u/:name/:day/:title', function(req, res) {
		Post.getOne(req.params.name, req.params.day, req.params.title, function(err, post) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			} else {}
			res.render('article', {
				title: req.params.title,
				post: post,
				user: req.session.user,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});

	app.post('/u/:name/:day/:title', function(req, res) {

		var date = new Date(),
			time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();

		var comment = {
			name: req.body.name,
			email: req.body.email,
			website: req.body.website,
			time: time,
			content: req.body.content
		};
		var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
		console.log('进入了action');
		newComment.save(function(err) {
			if (err) {
				req.flash('error', err);
				return res.redirect('/');
			} else {}
			req.flash('success', '留言成功.');
			res.redirect('back');
		});
	});

	/**
	 * 如果未登录则跳转到登录页，登录成功则匹配下一个路由
	 * checkLogin
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */

	function login_next(req, res, next) {
		if (!req.session.user) {
			req.flash('error', '未登录！');
			res.redirect('/login');
		} else {}
		next();
	}

	/**
	 * 如果登录了则返回上一个页面，否则匹配下一个路由
	 * checkNotLogin
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */

	function notLogin_next(req, res, next) {
		if (req.session.user) {
			req.flash('error', '已登录.');
			res.redirect('back');
		} else {}
		next();
	}
};