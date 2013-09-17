/**
 * @author Allen
 * 同步读取文件内容，会将文件的内容返回
 */

var fs = require('fs');
var data = fs.readFileSync('file.txt','utf-8');
var data2 = fs.readFileSync('file.txt');
console.log('reading....');
console.log(data);
console.log(data2);

