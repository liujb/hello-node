/**
 * app.js
 * @authors Your Name (you@example.org)
 * @date    2013-09-26 13:47:28
 * @version $Id$
 */

var mongoose = require('./mongoose.js');

//Create a schema
var kittySchema = mongoose.Schema({
	name: String,
	age: Number
});

//为kittySchema添加实例方法
//类似于为prototype添加方法一样
kittySchema.methods.speak = function() {
	var greeting = this.name ? "Meow name is " + this.name : "I don't hava a name";
	console.log(greeting);
};

//创建一个Kitten“类”
var Kitten = mongoose.model('Kitten', kittySchema);

//实例化一个Kitten对象
var fluffy = new Kitten({
	name: 'fluffy',
	age: 24
});

//调用save方法保存到数据库
// fluffy.save(function(err, fluffy) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		//fluffy是
// 		fluffy.speak();
// 	}
// });

//调用静态方法查询
//注意此处是大写Kitten
Kitten.find(function(err, kittens) {
	if (err) {
		console.log(err);
	} else {
		console.log(kittens);
	}
});