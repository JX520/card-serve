var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var platformSchema = new Schema({
    "cName":String,
    "cLogo":String,
    "cProduct":Array,
    "cAdress":String,
	"cBrief":String,
	"cDetail":[
		{
			"intro":String,
			"img":String
		}
	],
	"cLink":String,
	"cImg":String,
	"cPhone":String,
	"cMail":String,
	"cPublic":String,
	"cAble":Array,
	"cProducts":Array,
	"cname":String,
	"clogo":String,
	"cposition":String,
	"cphone":String,
	"cmail":String,
	"cwx":String,
	"cwork":String,
	"creward":String
});

module.exports = mongoose.model('platforms',platformSchema)