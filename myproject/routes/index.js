
/*
 * GET home page.
 */
var mongoose = require('mongoose') ;	// 导入组件
var models = require('./models') ;	// 导入自定义组件
var User = models.User ;	// 使用User模型，对应的users表
mongoose.connect('mongodb://localhost/mldndb') ;	// 连接数据库

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.login = function(req, res){
  res.render('login', { title: '用户登录' });
};
exports.doLogin = function(req, res){
	// 现在拼凑出了一个基本的字符串
	var query_doc = {userid:req.body.userid , password:req.body.password} ;	// 固定数据
    
   
    
	User.count(query_doc,function(err,doc){// 直接利用mongodb的命令进行操作
		if(doc == 0) {	// 输入错误，没有此信息
			res.redirect("/login") ;
		} else {	// 成功
			res.redirect("/welcome?uid=" + req.body.userid) ;	// 地址重写
		}
	}) ;
};

exports.adduser = function(req, res){
	  res.render('adduser', { title: '用户注册' });
};

exports.doadduser = function(req, res){
	var user_data = {
			userid : req.body.userid,
			name : req.body.name,
			password : req.body.password
		};
	console.info(user_data);
	
    var user = new User(user_data);
    user.save(function(error,data){
    	//console.info(data);
    	if (error) {
           console.log('error!');
    	}
        else {
        	res.send("用户注册成功");
        	console.log("add");
        	console.log(data); 
        }
    });
    //res.end();
};

exports.logout = function(req, res){
  res.render('login', { title: '用户注销' });
};
exports.welcome = function(req, res){
	// 如果是地址栏参数使用req.query.参数名称接收
	var user = {
		userid : req.query.uid 	}
  res.render('welcome', { title: '程序首页' , user:user });
};