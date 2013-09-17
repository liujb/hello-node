/**
 * @author Administrator
 * http.request(options,callback)
 * options是一个请求的参数列表包括 host,port,method,path,headers
 * callback传递一个参数，参数类型为http.ClientResponse的实例
 * http.request方法返回一个http.ClientRequest的实例
 * 
 */
var http = require('http');
var queryString = require('querystring');

var contents = queryString.stringify({
	name:'allen',
	email:'liujiangbei@126.com',
	address:'Beijing'
});

var options = {
	host:'www.byvoid.com',
	path:'/application/node/post.php',
	method:'post',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':contents.length
	}
};

var req = http.request(options,function(res){
	res.setEncoding('utf-8');
	res.on('data',function(data){
		console.log(data);
	});
});

req.write(contents);//个人感觉类似于传统js里面的send()方法
req.end();//必须要有此end()方法，否则服务器不能收到信息
