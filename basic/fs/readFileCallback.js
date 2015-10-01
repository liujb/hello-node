function readFileCallback(error, data) {
    if (error) {
        console.error(error);
    } else {
        console.log(data);
    }
};

var fs = require('fs');
fs.readFile('file.txt', 'utf-8', readFileCallback);
console.log('reading...');