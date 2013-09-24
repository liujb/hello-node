var Db = require("mongodb").Db
, MongoClient = require("mongodb").MongoClient
, Server = require("mongodb").Server
, assert = require("assert");
var mongoclient = new MongoClient(new Server("localhost", 27017), { native_parser: true });
mongoclient.open(function (err, mongoclient) {
var db = mongoclient.db("world")
, coll = db.collection("company");
coll.insert({ 'companyname': 'witmob', 'address': "beijing" }, function (err, result) {
//插入操作，第一个参数是要插入的对象，
//第二个参数是个回调函数（包含两个参数err是表示错误信息，
//result表示插入之后返回的结果，此时返回的结果为插入的对象）
assert.equal(null, err);
//assert.equal(1, result);
console.log("insert data success!");
coll.update({ 'companyname': 'witmob' }, { 'companyname': 'witmob', "address": "Heilongjiang" }, { upsert: true }, function (err, result) {
//更新操作,第一个参数为条件（就是以此为条件进行更新）
//第二个参数是更新后的对象
//第三个参数是回调函数（含有两个参数，err表示错误信息，result表示更新返回的结果，如果成功，此时返回1）
assert.equal(null, err); //这个就是判断更新的结果是否正确
assert.equal(1, result);
console.log("update data success!");
mongoclient.close(function (err, result) {
if (err) {
console.log("close the connection occur an err:" + err);
}
else {
console.log(result);
}
});
});
coll.remove ({"companyname":"wit"},function(err,result){
console.log("update data success!");
mongoclient.close(function (err, result) {
if (err) {
console.log("close the connection occur an err:" + err);
}
else {
console.log(result);
}
});
});
//删除操作，第一个参数为删除的条件，第二个为回调函数
coll.find({}).toArray(function(err,result){
mongoclient.close(function (err, result) {
if (err) {
console.log("close the connection occur an err:" + err);
}
else {
console.log(result);
}
});
}) ;
//查询操作，第一个参数为查询的条件，可能查询结果不止一个，放到一个数组中存放
});
});