/**
 * @author Administrator
 * 注意在真正的开发中不要使用以下简单的方法来获取post请求 有严重的效率和安全问题
 */

var http = require('http');
var util = require('util');
var queryString = require('querystring');

http.createServer(function(req,res){
	var post = '';
	req.on('data',function(chunk){
		post += chunk;
	});
	req.on('end',function(){
		post = queryString.parse(post);
		res.end(util.inspect(post));
	});
}).listen('3000');

console.log('http server is listening the port 3000');
