var fs = require('fs');
//Sync(동기적 방식) -> 순차적으로 작업이 끝날때까지 기다린다
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);


//ASync(비동기적 방식) -> 비 순차적 작업 실행
//callback함수는 어떻게 실행 되는지?
  console.log(2);
fs.readFile('data.txt',{encoding:'utf8'},function(err, data){
  console.log(3);
  console.log(data);
})
console.log(4);
