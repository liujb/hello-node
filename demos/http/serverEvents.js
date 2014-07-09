/**
 * @author Administrator
 * http.Server是一个基于事件的HTTP服务器，所有的客户端请求都被封装成为独立的事件
 * 继承自EventEmitter
 * request事件：当客户端请求到来时，触发该事件，
 * 提供两个参数req，res分别是http.ServerRequest和http.ServerResponse的实例
 * 最常用的就是request事件，所以提供了一个捷径：http.createServer([requestListener])
 * 以下是request事件的显示实现过程
 */
var http = require('http');
var server = new http.Server();
server.on('request',function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Hello nodejs</h1>');
	res.end('<p>Hello world</p>');
	
}).listen('3000');

console.log('http serve is listening the port 3000');
