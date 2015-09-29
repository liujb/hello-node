var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/1001_clients_0927.txt";
var destFile = "/Users/liujb/Desktop/1001_clients_0927_handled.csv";


var prefixes = ["fd-pass", "gs-pass", "msg00", "fd-passport", "dache-mis-web", "dache-num-protect", "dache-comm-web", "dache-api-web", "anti", "smsgw", "dache-api-internal", "dache-api-bmq", "dache-pay-web"];


var inArray = function (item, arr) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (item == arr[i]) {
      return true
    }
  };
  return false;
}

var obj = {};
var result = {};
lineReader.eachLine(srcFile, function (line, last) {

  var tmpArr = line.split(":");
  for (var i = tmpArr.length - 1; i >= 0; i--) {
    tmpArr[i] = tmpArr[i].trim();
  };

  for (var i = prefixes.length - 1; i >= 0; i--) {
    if (tmpArr[2].indexOf(prefixes[i]) >= 0) {

      if (Object.prototype.toString.call(obj[prefixes[i]], null) !== '[object Array]') {
        obj[prefixes[i]] = [];
      }

      obj[prefixes[i]].push(tmpArr.join(","));

      break;
    }
  };



  if (last) {
    // console.log(obj);

    var str = "";
    for (var p in obj) {

      if (typeof obj[p] == "object") {
        
      }
      str += obj[p].join("\r\n") + "\r\n\r\n";

    }

    console.log(str);

    fs.writeFile(destFile, str, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return false;
  }

});
