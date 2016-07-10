//引入express模块
var express=require("express");
//初始化一个express服务器
var app = express();
//设置端口号
app.set('port', 3000);  


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});