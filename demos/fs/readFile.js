/**
 * @author Administrator
 */

var fs = require('fs');
fs.readFile('file.txt',function(err,data){
	if(err){
		console.error(err);
	}else{
		console.log(data);
	}
});

fs.readFile('file.txt','utf-8',function(err,data){
	if(err){
		console.error(err);
	}else{
		console.log(data);
	}
});

console.log('reading...');
