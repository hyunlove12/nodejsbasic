const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;



var server = http.createServer(function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
//listen이 완료되었을 때 callbakc 함수 실행 약속
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
