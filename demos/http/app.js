/**
 * @author Administrator
 * http.Server是http模块中的HTTP服务器对象
 * http.createServer创造了一个http.Server的实例
 * 将一个函数作为HTTP请求处理函数
 */
var http = require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Hello nodejs</h1>');
	res.end('<p>Hello world</p>');
}).listen(3000);

console.log('server is listening 3000');
