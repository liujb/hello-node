module.exports = function(path) {
    var fs = require('fs');

    fs.readFile(path, function(err, data) {
        if (err) {
            throw err;
        }
        var jsonObj = JSON.parse(data);
        console.log(JSON.stringify(jsonObj));
    });
};