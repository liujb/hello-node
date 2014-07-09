/**
 * @author Administrator
 * fs.open(path,flags,[mode],[callback(err,fd)])
 */

var fs = require('fs');
fs.open('file.txt','r','0666',function(err,fd){
	if(err){
		console.error(err);
	}else{
		console.log(fd);
	}
})

console.log('opening....');
