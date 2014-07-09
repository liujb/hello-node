var Hello = require('./moduleFromObject').Hello;
//var Hello=require('./moduleFromObject');
hello = new Hello();
hello.setName('Allen');
hello.sayHello();