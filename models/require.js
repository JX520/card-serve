var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//定义表结构
var requireSchema = new Schema({
	"openid":String,
	"name":String,
	"wx":String,
	"phone":String,
	"need":String,
	"publishTime":String
});

module.exports = mongoose.model('requires',requireSchema)