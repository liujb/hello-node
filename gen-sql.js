var fs = require('fs');
var lineReader = require("line-reader");

var srcFile = "/Users/liujb/Desktop/09-23-batch-update/get_driverId_driverSerial.txt";
var srcFile2 = "/Users/liujb/Desktop/09-23-batch-update/yuyang_update_origin_data.txt";
var destFile = "/Users/liujb/Desktop/09-23-batch-update/yuyang_update_data.csv";

var result = [];
var reset2 = []

lineReader.eachLine(srcFile, function (line, last) {

  line = line.trim().replace("\"", "");

  if (line) {
    var tmpArr = line.split("\t");
    result.push({
      driverId: tmpArr[0],
      driverSerial: tmpArr[1]
    });
  }

  if (last) {

    console.log(result.length);
    console.log(result);

    lineReader.eachLine(srcFile2, function (li, la) {
      li = li.trim().replace("\"", "");
      if (li) {
        var tmp = li.split("\t");
        reset2.push({
          driverId: tmp[0],
          driverName: tmp[1],
          licenseNumber: tmp[2],
          company: tmp[3],
          phone: tmp[4]
        });

      }
      if (la) {
        console.log(result.length);
        console.log(reset2.length);
        console.log(reset2);
      }
    })


    fs.writeFile(destFile, '', function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return false;
  }

});
