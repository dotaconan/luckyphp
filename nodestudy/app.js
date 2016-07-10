//引入express模块
var express=require("express");
var http = require('http');
var bodyParder = require('body-parser');

//初始化一个express服务器
var app = express();
app.use(bodyParder());

//设置端口号
app.set('port', 3000);  


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {

  res.send('<h1>hello world</h1>');
});
//展示页面
app.get('/test', function(req, res) {
  res.sendfile('testpost.html');
});

//post后台
app.post('/testpost', function(req, res) {
	var query=req.query;

 	console.log(query.id);

    console.log(req.body);
    return;
    console.log(req.body.txtUserName);
	//"txtUserName"
	var str='<p>txtUserName>>'+body.txtUserName+'</p>'
	str+='<p>query.id>>'+query.id+"</p>";
    res.send(str);
});
http.createServer(app).listen(app.get('port'), function(){  
  console.log("Express server listening on port " + app.get('port'));  
});  