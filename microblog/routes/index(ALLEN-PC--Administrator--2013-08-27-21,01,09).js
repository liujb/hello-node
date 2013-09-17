
// /*
//  * GET home page.
//  */

// exports.index = function(req, res){
//   res.render('index', { title: "Express EJS", name: "ALLEN" });
//   //next();在这儿没用啊！
// };

// /*
//  * 增加新的路由规则.
//  */
// exports.gettime = function(req, res){
//   //res.render('index', { title: "Express EJS", name: "ALLEN" });
//   res.send('This time is '+ new Date().toString());
// };

// exports.user = function(req,res){
// 	res.send('user');
// };
// exports.post = function(req,res){
// 	res.send('user');
// };
// exports.reg = function(req,res){
// 	res.render('index',{title:'Register'})
// 	//res.send('user');
// };
// exports.doReg = function(req,res){
// 	res.send('user');
// };
// exports.login = function(req,res){
// 	res.send('user');
// };
// exports.doLogin = function(req,res){
// 	res.send('user');
// };
// exports.logout = function(req,res){
// 	res.send('user');
// };



module.exports = function(app){

	//获取首页
	app.get('/',function(req,res){
		res.render('index',{title:'首页'});
	});

	//获取注册页面
	app.get('/reg',function(req,res){
		res.render('reg',{title:'用户注册'});
	});

	//注册
	app.post('/doReg',function(req,res){
		if(req.body['confirm-pwd']!==req.body['password']){
			req.flash('error','两次输入的口号不一致.');
			return res.redirect('/reg');
		}else{}
		var crypto = require('crypto');
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password.digest('base64'));
		
		var newUser = new User({
			name:req.body.username,
			password:password
		});

		var User = require('../models/user.js');
		User.get(newUser.name,function(err,user){
			if(user){
				err = 'User is alreay exists.';
			}else{}
			if(err){
				req.flash('error',err);
			}else{}

			newUser.save(function(err){
				if(err){
					req.flash('error',err);
				}else{}
				req.session.user = newUser;
				req.flash('success','注册成功！');
				res.redirect('/');
			});
		});
	});

};