var srcFile = "/Users/liujb/Desktop/old-new-user.txt";
var destFile = "/Users/liujb/Desktop/old-new-user.sql";

var fs = require('fs');
var lineReader = require("line-reader");


var result = [];

lineReader.eachLine(srcFile, function (line, last) {

  line = line.trim().replace("\"", "");

  if (line) {
    var tmpArr = line.split("\t");
    var tmpStr = "update Admin set username='" + tmpArr[1] + "' where username='" + tmpArr[0] + "' limit 1;";
    result.push(tmpStr);
  }

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
