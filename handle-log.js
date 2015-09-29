/**
 * 过滤电话号
 * @type {[type]}
 */

var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/aa";
var destFile = "/Users/liujb/Desktop/bb";

var result = [];

var flag = true;
var flag1 = true;
var flag2 = true;
var flag3 = true;
lineReader.eachLine(srcFile, function (line, last) {
  // console.log(line.indexOf("[content:]您预约") > 0)

  if (flag && line.indexOf("[content:]您预约") > 0) {
    console.log("AAAAA\n");
    result.push(line);
    flag = false;
  } else if (flag1 && line.indexOf("[content:]您于（") > 0) {
    console.log("BBBBB\n");
    result.push(line);
    flag1 = false;
  } else if (flag2 && line.indexOf("[content:]亲爱的用户，") > 0) {
    console.log("CCCC\n");
    result.push(line);
    flag2 = false;
  } else if (flag3 && line.indexOf("已有师傅抢单，近10单") > 0) {
    flag3 = false;
    console.log("DDDD\n");
    result.push(line);
  } else if (line.indexOf("[content:]您预约") <= 0 && line.indexOf("[content:]您于（") <= 0 && line.indexOf("[content:]亲爱的用户，") <= 0 && line.indexOf("已有师傅抢单，近10单") <= 0) {
    result.push(line);
  }



  if (last) {
    console.log(result);

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
