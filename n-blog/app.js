/**
 * Module dependencies.
 */

var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {
	falgs: 'a'
});
var errorLog = fs.createWriteStream('error.log', {
	flags: 'a'
});
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();

var MongoStore = require('connect-mongo')(express);
var setting = require('./setting.js');
var flash = require('connect-flash');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//调用 ejs 模板引擎解析 views/index.ejs
app.set('view engine', 'ejs');


app.use(express.favicon());
//使用Express自带的logger中间件实现了终端日志的输出
app.use(express.logger('dev'));
app.use(express.logger({
	stream: accessLog
}));
//connect中间件提供的，用来解析请求体
//去掉之后命令行不会输出请求的信息
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: './public/upload/images'
}));
app.use(express.methodOverride());

//管理会话
//解析cookie的中间件
app.use(express.cookieParser());
app.use(express.session({
	secret: setting.cookieSecret, //防止篡改cookie
	key: setting.db, //cookie的名称
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 30
	}, //30 days
	store: new MongoStore({
		db: setting.db
	})
}));

//使用flash消息提示
app.use(flash());

//应用路由解析规则
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
	var meta = '[' + new Date() + ']' + req.url + '\n';
	errorLog.write(meta + err.stack + '\n');
	next();
});

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
} else {}

routes(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});