/**
 * 过滤电话号
 * @type {[type]}
 */

var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/aaa.txt";
var destFile = "/Users/liujb/Desktop/filter-phones.csv";

var result = [];

lineReader.eachLine(srcFile, function (line, last) {

  line = line.trim().replace("\"", "");

  if (line && line.length === 11) {
    result.push(line.toString());
  }

  if (last) {
    console.log(result.length);

    var str = result.join("\n");
    fs.writeFile(destFile, str, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return false;
  }

});
