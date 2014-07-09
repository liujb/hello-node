//以下程序会出输出什么呢/
//1,2,3???on，no，no
//会输出3个4！为什么会3个4呢？
//因为setTimeout函数被调用时候，会有一个延时事件排入队列
//然后setTimeout之后的函数继续运行，直到再也没有任何代码
//再执行setTimeout里面的函数
//当i等于4的时候，不符合循环的条件了，之前定义的3个setTimeout(...)
//就会执行
for (var i = 1, len = 3; i <= len; i++) {
    setTimeout(function() {
        console.log(i);
    }, 0);
};