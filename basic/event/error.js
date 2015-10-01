/**
 * @author Administrator
 * 如果没有给error注册事件监听器，则会报错。
 */

var events = require('events');

var emitter = new events.EventEmitter();
emitter.on('error', function() {
    console.log('error messages');
});
emitter.emit('error');