/**
 * @author Allen
 * util.inspect(object,showHiddenMsg,depth);
 * 接收的三个参数分别表示
 * ①传入的对象
 * ②是否显示隐藏的信息
 * ③对象很复杂时指定层数以控制输出信息的多少
 */
var util = require('util');

function Person() {
  this.name = 'allen';
  this.toString = function () {
    return this.name;
  };
};

var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
