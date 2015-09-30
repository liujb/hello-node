var arr = [{"3":{"102":"已审核的司机状态不正确"}},{"4":{"102":"已审核的司机状态不正确"}},{"6":{"105":"已审核的司机不存在或有多个"}},{"20":{"105":"已审核的司机不存在或有多个"}},{"22":{"105":"已审核的司机不存在或有多个"}},{"25":{"105":"已审核的司机不存在或有多个"}},{"33":{"102":"已审核的司机状态不正确"}},{"41":{"104":"司机状态不是待重审、注册未完成或未审核"}},{"54":{"102":"已审核的司机状态不正确"}},{"58":{"102":"已审核的司机状态不正确"}},{"60":{"105":"已审核的司机不存在或有多个"}}];

/**
 * [inArray description]
 * @param  {[type]} item [description]
 * @param  {[type]} arr  [description]
 * @return {[type]}      [description]
 */
function inArray(item, arr) {
  for (var i = arr.length - 1; i >= 0; i--) {

    var tmp = arr[i];
    for (var p in tmp) {
      if (p == item) {
        return true;
      }
    }
  }
  return false;
}


/**
 * 过滤电话号
 * @type {[type]}
 */
var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/09-30-switch-driver-from-zhonghui.txt";
var destFile = "/Users/liujb/Desktop/09-30-switch-driver-from-zhonghui-ok.txt";
var haveProblemFile = "/Users/liujb/Desktop/09-30-switch-driver-from-zhonghui-have-problem.txt";

var result = [];
var problem = [];
var flag = 1;

lineReader.eachLine(srcFile, function (line, last) {

  line = line.trim().replace("\"", "");

  if (!inArray(flag.toString(), arr)) {
    console.log(line);
    result.push(line);
  } else {
    problem.push(line);
  }

  flag++;

  if (last) {
    console.log(result.length);

    var str = result.join("\n");
    fs.writeFile(destFile, str, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(arr.length);
      console.log("The file was saved!");
    });

    fs.writeFile(haveProblemFile, problem.join("\n"), function (err) {
      if (err) {
        return console.log(err);
      }
    });

    return false;
  }

});
