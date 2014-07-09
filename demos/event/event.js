//开发者看来事件由EventEmitter对象提供
var eventEmitter = require('events').EventEmitter;
var event = new eventEmitter();
//event对象注册了事件some_event的一个监听器
event.on('some_event', function() {
    console.log('some_event occured');
});
/*
 * 定时调用event对象的emit方法并传入some_event事件
 * 那么将调用some_event监听器
 */
setTimeout(function() {
    event.emit('some_event');
}, 1000);