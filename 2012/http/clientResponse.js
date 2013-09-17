/**
 * @author Administrator
 * http.request,http.get方法都会返回http.ClientRequest的实例
 * 它提供一个response事件，也就是回调函数的绑定对象
 * 还有request.bort()
 * request.setTimeout(timeout,[callback])
 * request.setSocketKeepAlive([enabled],[initialDelay]);
 */
var http = require('http');
var req = http.get({host:'www.byvoid.com'});

req.on('response',function(res){
	res.setEncoding('utf-8');
	res.on('data',function(){
		console.log(data);
	});
});
