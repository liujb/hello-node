var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/09-30-batch-update-driver-from-fanxue.txt";
var destFile = "/Users/liujb/Desktop/09-30-batch-update-driver-from-fanxue-handled.csv";

var result = [];

lineReader.eachLine(srcFile, function (line, last) {

  var tmpArr = line.split("\t");
  if (tmpArr[4] == "0" || tmpArr[4].length != 11) {
    tmpArr[4] = "";
  }
  result.push(tmpArr.join(","));

  if (last) {
    console.log(result.length);

    var str = result.join("\r\n");
    fs.writeFile(destFile, str, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return false;
  }

});
