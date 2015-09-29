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
app.get('/', function (req, res) {
  if (!req.cookies.user) {
    res.redirect('/signin');
  } else {
    res.sendfile('views/index.html');
  }
});

app.get('/signin', function (req, res) {
  res.sendfile('views/signin.html');
});

app.post('/signin', function (req, res) {
  if (users[req.body.name]) {
    console.log(req.body.name);
    res.redirect('/signin'); //表示存在此用户不能登录
  } else {
    console.log('fuck');
    res.cookie('user', req.body.name, {
      maxAge: 1000 * 60 * 60 * 24 * 30
    }); //将那么存储到cookies中并设置有效期为30天
    res.redirect('/');
  }
});

var server = http.createServer(app); //创建服务
var io = require('socket.io').listen(server); //监听服务

//socket连接事件
io.sockets.on('connection', function (socket) {
  //服务端监听客户端emit的“上线”信号
  socket.on('online', function (data) { //用户上线
    socket.name = data.user; //将上线的用户名存储为 socket 对象的属性，以区分每个socket对象，方便后面使用
    console.log("data.user：" + data.user);
    if (!users[data.user]) { //users 对象中不存在该用户名则插入该用户名
      users[data.user] = data.user;
    } else {}
    //向所有用户广播该用户上线信息
    io.sockets.emit('online', {
      users: users,
      user: data.user
    });
  });
  //监听说话信号
  socket.on('say', function (data) {
    if (data.to === 'all') {
      socket.broadcast.emit('say', data);
    } else {
      var clients = io.sockets.clients();
      clients.forEach(function (client) {
        if (client.name === data.to) {
          client.emit('say', data);
        } else {}
      });
    }
  });

  //当对方关闭连接后触发disconnect事件
  socket.on('disconnect', function () {
    if (users[socket.name]) {
      delete users[socket.name];
      //像除连接外的所有连接发送offline信号
      socket.broadcast.emit('offline', {
        users: users,
        user: socket.name
      });
    } else {}
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
