//nodejs环境下此段代码能输出130，也就是说在1秒多内
//执行了130多次
//WebKit等浏览器中只会执行90多次
//??注意将0换成1,2,3,4,5,6,7,8,9,10会发现在6之前都差不多是130次，
//换成10最接近100，也就是10是“最理想”的间隔次数
//实际上主流浏览器都遵守规范，推迟延时/时隔的最小值是4毫秒
//console.log(start.toString());
var fireCount = 0;
var start = new Date;

var timer = setInterval(function() {
    if (new Date - start > 1000) {
        clearInterval(timer);
        console.log(fireCount);
        return;
    } else {}
    fireCount++;
}, 0);