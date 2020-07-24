var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "uid":Number,
    "name":String,
    "type":Number,
    "img":String,
	"swiper":Array,
	"title":String,
	"detail":String,
});

module.exports = mongoose.model('products',productSchema)