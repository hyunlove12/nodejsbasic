//express 객체 가져오기
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(bodyparser.urlencoded({extended:false}));
//템플리트 코드 정렬
app.locals.pretty = true;
//템플리트의 경로 알려주기
//jade파일의 경로
//기본설정의 views로 되어있다.(생략해도 기본으로 views를 찾는다.)
app.set('views', './views');
//템플리트 엔진 설정
app.set('view engine','jade');

app.get('/topic', function(req, res){
  var topics = [
                'Javascript is...'
                ,'Node js is...'
                ,'Express is...'
               ];
  var as = `
          <a href="/topic?id=0">java<a><br>
          <a href="/topic?id=1">node<a><br>
          <a href="/topic?id=2">express<a><br>
          ${topics[req.query.id]}
          `;
  //get방식의 id라는 변수의 값 저장
  res.send(as);
  //res.send(topics[req.query.id]);
});

//시멘틱 url
app.get('/topic/:id', function(req, res){
  var topics = [
                'Javascript is...'
                ,'Node js is...'
                ,'Express is...'
               ];
  var as = `
          <a href="/topic/0">java<a><br>
          <a href="/topic/1">node<a><br>
          <a href="/topic/2">express<a><br>
          ${topics[req.params.id]}
          `;
  //get방식의 id라는 변수의 값 저장
  res.send(as);
  //res.send(topics[req.query.id]);
});

//시멘틱 url
app.get('/topic/:id/:mode', function(req, res){
  //get방식의 id라는 변수의 값 저장
  //res.send는 여러개 못쓴다?
  res.send(req.params.mode + ',' +req.params.id);
  //res.send(topics[req.query.id]);
});

app.get('/form',function(req, res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  var title = req.query.title;
  var des = req.query.description;
  res.send(title+','+des);
})
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + description);
});
//사용자가 app에 접속하였을 때 get방식으로
//home으로 접속 했을 때
// /test -> test로 접속 하였을때
// get -> 라우터 // 하는일은 라우팅 // 길을 찾는다!
//app.use(express.static('public'));
app.get('/', function(req, res){
  //홈으로 접속 하였을때 실행 함수
  //상요자의 요청 -> req
  //응답에 대한 객체 전달 -> res
  res.send('Hello home page');
});
//정적이 파일이 위치할 디렉토리 위치
app.use(express.static('public'));
app.get('/template', function(req, res){
  //템플리트 파일을 읽어온다
  //temp라는 템플리트 파일을 보여준다.
  //temp라는 템플리트를 렌더링하여 보여준다.
  //2번째 인자는 변수
  res.render('temp', {time:Date(),title:'제목'});
});
app.get('/dynamic', function(req, res){
//역슬러시 하면 이어서 작성 가능
//  res.send('<!DOCTYPE html>\
//  <html lang="en" dir="ltr">\
//    <head>\
//      <meta charset="utf-8">\
//      <title></title>\
//    </head>\
//    <body>\
//      Hello! Static!!!!!
//    </body>\
//  </html>\
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  //`` -> 사용하면 ${} 로 변수 꺼내기 가능
  var output = `
                <!DOCTYPE html>
                <html lang="en" dir="ltr">
                  <head>
                    <meta charset="utf-8">
                    <title></title>
                  </head>
                  <body>
                    Hello! Static!!!!!dynamic!!
                    <ul>
                      ${lis}
                    </ul>
                    ${time}
                  </body>
                </html>
              `;
res.send(output);

});
app.get('/route', function(req,res){
  res.send('Hello, Router, <img src="/back_logo_sgrc.png"/>')
});

app.get('/login', function(req, res){
  //홈으로 접속 하였을때 실행 함수
  //상요자의 요청 -> req
  //응답에 대한 객체 전달 -> res
  res.send('Login please');
});

app.get('/login2', function(req, res){
  //홈으로 접속 하였을때 실행 함수
  //상요자의 요청 -> req
  //응답에 대한 객체 전달 -> res
  res.send('<h1>Login please</h1>');
});

//포트번호 지정(listen할 수 있는 포트)
app.listen(3000, function(){
  console.log('connected 3000 port!');
});
