var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义表结构
var shareSchema = new Schema({
	"uid":Number,
	"openid":String,
	"img":String,
	"userImg":String,
	"userName":String,
	"publishTime":String,
	"title":String,
	"content":String,
	"isNice":Boolean,
	"niceNum":Number,
	"review":[
		{
			"avatarUrl":String,
			"nickName":String,
			"content":String,
			"publishTime":String,
		}
	]
	
});

module.exports = mongoose.model('shares',shareSchema)