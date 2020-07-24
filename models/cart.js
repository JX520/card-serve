var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({
	"openid":String,
	"gid":Number,
	"title":String,
	"img":String,
	"price":Number,
	"num":Number,
	"checked":Boolean,
	
})

module.exports = mongoose.model('carts',cartSchema)