/**
 * @author Allen
 * @datetime 20120810
 * @description
 * events模块只有一个对象【events.EventEmitter】
 * events.EventEmitter 核心功能就是事件发射以及事件监听器的功能的封装
 * events.EventEmitter 的每一个事件都由事件名以及若干参数组成
 * 对于每个事件 events.EventEmitter支持若干个事件监听程序
 * emitter.on(event,listener)为指定事件注册监听器
 * emitter.emit(eventName,argumentList)发射事件
 * emitter.once(event,listener)为指定事件指定一个单次监听器
 * emitter.removeListener(event,listener)移除某个事件的指定监听器
 * emitter.remoceAllListeners([event])移除所有事件所有监听器
 */
var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener1', arg1, arg2);
});

emitter.on('someEvent', function(arg1, arg2) {
    console.log('listener2', arg1, arg2);
});

emitter.emit('someEvent', 'Allen', 22);