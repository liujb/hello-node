//注意模块加载是单次加载
//也就是说无论调用多少次require('./module');获得的都是同一个模块
var myModule = require('./module');
myModule.setName('Allen');
myModule.sayHello();