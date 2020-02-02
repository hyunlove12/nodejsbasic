var express = require('express');
//express()는 스태틱 변수인가?
//변수명 까지 정의되어 있는지??
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;
app.set('views','./views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new',{topics:files});
  });

});
app.get(['/topic', '/topic/:id'], function(req, res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    if(id){
      fs.readFile('data/'+id, 'utf-8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view',{title:id,topics:files,description:data});
      });
    }else{
        res.render('view',{topics:files});
    }
  });
});
app.get('/topic123/:id', function(req, res){
  var id = req.params.id;
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    fs.readFile('data/'+id, 'utf-8', function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render('view',{title:id,topics:files,description:data});
    })
  });
})
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title , description,'utf-8', function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});







app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});

app.get('/topic1', function(req, res){
  fs.readFile('data/2.txt', 'utf-8', function(err, data){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    console.log(data);
  res.send(data);
  });
});
