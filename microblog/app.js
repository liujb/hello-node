console.log("Are you ok?");
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var util = require('util');
var app = express();//create an application
var partials = require('express-partials'); 
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(partials());
app.use(express.cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({
	secret:settings.cookieSecret,
	store:new MongoStore({
		db:settings.db
	})
}));
app.use(app.router);//保留原来的
//app.use(express.router(routes));//node.js开发指南上面的（注释掉）
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}else{}

routes(app);//新加的

app.locals({
	user:function(req,res){
		return req.session.user;
	},
	error:function(req,res){
		var err = req.flash('error');
		if(err.length){
			return err;
		}else{
			return null;
		}
	},
	success:function(req,res) {
		var succ = req.flash('success');
		if(succ.length){
			return succ;
		}else{
			return null;
		}
	}
});

var port = app.get('port');
http.createServer(app).listen(port,function(){
	console.log('Express server listen the port: '+ port);
});
