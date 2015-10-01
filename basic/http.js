var http = require('http');
http.createServer(function (req, res) {
  for (var p in req) {
    console.log(p + " => " + req[p]);
  }
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.write('Hello Nodejs');
  res.end('<p>Allen</p>');
}).listen(3000);

//console.log
console.log('Http server is listenning 3000 port!');