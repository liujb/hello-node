//以下代码又会输出什么呢？
//在nodejs中会输出{}
//而在WebKit的console.log中则会输出{name:'ALLEN'}
//在nodejs中console.log是严格同步的
//而在WebKit中不是完全同步的，在执行到console.log的时候没有立即拍摄对象快照而是存储了一个对象的引用，然后在代码返回事件队列时才去拍摄快照
var obj = {};
console.log(obj);
obj.name = 'ALLEN';