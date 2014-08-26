var mongoose = require('mongoose') ;	// 定义使用组件
var Schema = mongoose.Schema ;	// 创建模式
var UserSchema = new Schema({
	userid : String,
	name : String,
	password : String
});	// 定义了一个新的模式，但是此模式还未和users集合有关联
exports.User = mongoose.model('User',UserSchema) ;	// 与Users表关联

/*var user_data = {
		userid : "aaa" ,
		name : "bb" ,
		password : "cc"
	};
var user = new exports.User(user_data);
user.save(function(error,data){
	 
});*/