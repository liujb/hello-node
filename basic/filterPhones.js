var fs = require('fs');
var lineReader = require('line-reader');

var flag = 1;
var result = '';
lineReader.eachLine('08-16-phones.cvs', function (line, last) {

  if (line && line.length === 11) {
    result += line + "\r\n";
    console.log(line);
    flag++;
  }

  if (last) {

    fs.appendFile('result-phones.txt', result, function (err) {
      if (err) return console.log(err);
      console.log('DONE');
    });

    return false; // stop reading
  }
});