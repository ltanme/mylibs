
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs') ;	// require()函数表示要加载的模块
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('html',ejs.__express) ; 
app.set('view engine', 'html');	// 替换：app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/login', routes.login);	// 此处还需要routes/index.js修改
app.post('/login', routes.doLogin);	// 处理post请求，表单提交
app.get('/logout', routes.logout);	// 处理注销
app.get('/adduser', routes.adduser);	//添加用户
app.post('/adduser', routes.doadduser);	//添加用户
app.get('/welcome', routes.welcome);		// 进入到首页
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
