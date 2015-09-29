//以下程序会输出什么呢？
//大概是5000，为什么呢？
//还是因为setTimeout会在后面的代码都执行完成的情况下
//才会被js虚拟机从事件队列中开始执行
//setTimeout和setInterval不是孵化出新的线程，只是简单的延迟执行
console.log('Test output.');
var start = new Date;
setTimeout(function () {
  var end = new Date;
  console.log('Time slapsed:', end - start, 'ms');
}, 500);

while (new Date - start < 5000) {
}