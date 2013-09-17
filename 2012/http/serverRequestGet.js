/**
 * @author Administrator
 * http.serverRequest是http的请求信息，
 * 一般由http.Server的request事件发送，作为第一个参数传递req或者request
 * 也提供三个事件用于控制请求体传输data,end,close.
 */
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
	res.writeHead('200',{'Content-Type':'text/html'});
	res.end(util.inspect(url.parse(req.url,true)));
}).listen('3000');

console.log('http is listen the port 3000');

