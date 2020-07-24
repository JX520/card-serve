var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pshopSchema = new Schema({
	"sid":Number,
	"category":String,
	"goods":[
		{
			"gid":Number,
			"title":String,
			"img":String,
			"price":String,
			"detail":[
				{
					"img":String,
					"intro":String
				},
			]
		},
	]
})

module.exports = mongoose.model("pshops",pshopSchema)