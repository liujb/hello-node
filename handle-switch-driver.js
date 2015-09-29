var arr = [{
  "9": {
    "105": "已审核的司机不存在或有多个"
  }
}, {
  "29": {
    "105": "已审核的司机不存在或有多个"
  }
}, {
  "31": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "38": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "40": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "45": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "46": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "48": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "50": {
    "105": "已审核的司机不存在或有多个"
  }
}, {
  "55": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "56": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "57": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "58": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "59": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "60": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "61": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "62": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "63": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "64": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "65": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "66": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "67": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "77": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "81": {
    "102": "已审核的司机状态不正确"
  }
}, {
  "84": {
    "102": "已审核的司机状态不正确"
  }
}];

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
  };
  return false;
}


/**
 * 过滤电话号
 * @type {[type]}
 */
var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/09-29-switch-driver-from-zhonghui.txt";
var destFile = "/Users/liujb/Desktop/09-29-switch-driver-from-zhonghui-ok.txt";
var haveProblemFile = "/Users/liujb/Desktop/09-29-switch-driver-from-zhonghui-have-problem.txt";

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
    })

    return false;
  }

});
