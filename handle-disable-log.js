/**
 * 过滤电话号
 * @type {[type]}
 */

var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/disable.log";
var destFile = "/Users/liujb/Desktop/disable.log2";

var result = [];

/**
 * format date
 * @param  {[type]} i [description]
 * @return {[type]}   [description]
 */
var formatDate = function (i) {
  if (parseInt(i) > 0) {
    var d = new Date(parseInt(i) * 1000);
    return (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
  }
  return "";

}

lineReader.eachLine(srcFile, function (line, last) {
  var tmp = line.split("\t");
  tmp[2] = formatDate(tmp[2]);
  console.log(tmp[2]);
  tmp[3] = formatDate(tmp[3]);
  tmp[9] = formatDate(tmp[9]);

  result.push(tmp.join(","));


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
