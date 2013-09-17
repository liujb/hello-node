
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: "Express EJS", name: "ALLEN" });
  //next();在这儿没用啊！
};

/*
 * 增加新的路由规则.
 */
exports.gettime = function(req, res){
  //res.render('index', { title: "Express EJS", name: "ALLEN" });
  res.send('This time is '+ new Date().toString());
};

exports.user = function(req,res){
	res.send('user');
};
exports.post = function(req,res){
	res.send('user');
};
exports.reg = function(req,res){
	res.send('user');
};
exports.doReg = function(req,res){
	res.send('user');
};
exports.login = function(req,res){
	res.send('user');
};
exports.doLogin = function(req,res){
	res.send('user');
};
exports.logout = function(req,res){
	res.send('user');
};