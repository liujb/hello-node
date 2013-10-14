/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

//存储在线用户数
var users = {};
//匹配路由
app.get('/', function(req, res) {
	if (!req.cookies.user) {
		res.redirect('/signin');
	} else {
		res.sendfile('views/index.html');
	}
});

app.get('/signin', function(req, res) {
	res.sendfile('/views/signin.html');
});

app.post('/signin', function(req, res) {
	if (users[req.body.name]) {
		res.redirect('/signin'); //表示存在此用户不能登录
	} else {
		res.cookie('users', req.body.name, {
			maxAge: 1000 * 60 * 60 * 24 * 30
		}); //将那么存储到cookies中并设置有效期为30天
	}
});


var server = http.createSerer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {});
server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});