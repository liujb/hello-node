/**
 * @author Administrator
 * http.get是request的简化版本
 * 唯一的区别是http.get自动请求方法设为了Get请求，同时不需要手动调用req.end()
 */
var http = require('http');

http.get({host:'www.byvoid.com'},function(res){
	res.setEncoding('utf-8');
	res.on('data',function(data){
		console.log(data);
	});
});
