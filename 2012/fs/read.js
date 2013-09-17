
/**
 * @author Administrator
 * 
 * fs.open(path,flags,[mode],[callback(err,fd)])
 * fd文件描述符，是一个非负数，表示操作系统内核为当前进程所维护的打开文件的记录表索引
 * 
 * fs.read(fd,buffer,offset,length,position,[callback(err,bytesRead,buffer)])
 * fd文件描述符
 * offset是buffer的写入偏移量
 * length要从文件中读取的字节数
 * position是文件读取的起始位置，若为null，则从当前文件指着的指针的位置读取
 * bytesRead表示读取的字节数
 * buffer表示缓冲区
 *  
 */

var fs = require('fs');

fs.open('file.txt','r',function(err,fd){
	if(err){
		console.error(err);
		return;
	}
	var buf = new Buffer(8);
	fs.read(fd,buf,0,8,null,function(err,bytesRead,buffer){
		if(err){
			console.error(err);
			return;
		}
		console.log('bytesRead: '+bytesRead);
		console.log(buffer);	
	});
});

