var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var url = require('url');
var app = express();

var mongoose = require('mongoose');
var Platform = require('../models/platform.js');//平台信息表
var Share = require('../models/share.js');//动态表
var Require = require('../models/require.js');//需求表
var Pshop = require('../models/pshop.js')//平台商城表
var Cart = require('../models/cart.js')
var cors = require("cors");


router.use(bodyParser.urlencoded({
	extended: false
}));
router.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(cors);

// router.all('*', function(req, res, next) { //设置跨域访问
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By", ' 3.2.1');
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});


//查询平台商城商品信息
router.get('/pshop',(req,res,next)=>{
	Pshop.find({},(pErr,pDoc)=>{
		if(pErr){
			return res.json({
				code:1,
				msg:'查询商城信息失败',
				result:pErr
			})
		}else{
			return res.json({
				code:0,
				msg:'查询商城信息成功',
				result:pDoc
			})
		}
	})
});

//查询购物车信息
router.get('/cart',(req,res)=>{
	var {pathname,query} = url.parse(req.url,true);
	var openid = query.openid;
	Cart.find({openid:openid},(Cerr,Cdoc)=>{
		if(Cerr){
			return res.json({
				code:1,
				msg:'查询购物车失败',
				result:Cerr
			})
		}else{
			return res.json({
				code:0,
				msg:'查询购物车成功',
				result:Cdoc
			})
		}
	})
})

//查询平台信息
router.get('/platform',(req,res,next)=>{
	Platform.find({},(Perr,Pdoc)=>{
		if(Perr){
			return res.json({
				code:1,
				msg:'查询平台信息失败',
				result:Perr
			})
		}else{
			return res.json({
				code:0,
				msg:'查询平台信息成功',
				result:Pdoc
			})
		}
	})
});



//查询产品
// router.get('/product', (req, res, next) => {
// 	var {pathname,query} = url.parse(req.url,true);
// 	// console.log(query.uid);
// 	var uid = query.uid;
// 	Product.find({},(err,doc)=>{
// 		if (err) {
// 			res.json({
// 				code: 1,
// 				msg: '查询产品失败',
// 				result: err
// 			})
// 		} else {
// 			if(query.uid == "undefined" || query.uid == null){
// 				 return res.json(doc);
// 			}else{
// 				Product.findOne({uid:uid},(findErr,findDoc)=>{
// 					if(findErr){
// 						res.json({
// 							code: 1,
// 							msg: '查询产品失败',
// 							result: err
// 						})
// 					}else{
// 						res.json(findDoc);
// 						// console.log(findDoc);
// 					}
// 				})
				
// 			}
// 		}
// 	})
// });

//获取动态
router.get('/share',(req,res,next)=>{
	var {pathname,query} = url.parse(req.url,true);
	var uid = query.uid;
	Share.find({},(err,doc)=>{
		if (err) {
			return res.json({
				code: 1,
				msg: '查询动态失败',
				result: err
			})
		} else {
			if(query.uid == "undefined" || query.uid == null){
				 return res.json(doc);
			}else{
				//查询单个数据		
				Share.findOne({uid:uid},(findErr,findDoc)=>{
					if(findErr){
						return res.json({
							code: 1,
							msg: '查询动态失败',
							result: err
						})
					}else{
						//改变点赞状态
						if(query.flag == 1){
							findDoc.isNice = !findDoc.isNice;
							if(findDoc.isNice){
								findDoc.niceNum +=1
							}else{
								findDoc.niceNum -=1
							}
							findDoc.save((saveErr,saveDoc)=>{
								
							})
							
						}
						
						//增加评论
						else if(query.flag == 2){
							var review = {
								'avatarUrl':query.avatarUrl,
								'nickName':query.nickName,
								'content':query.content,
								'publishTime':query.publishTime
							}

							Share.updateOne({uid:uid},{'$push':{review:review}},(reviewErr,reviewDoc)=>{
								if(reviewErr){
									console.log(reviewErr)
								}else{
									console.log(reviewDoc)
								}
							})
						}
						
						
						res.json(findDoc);
						// console.log(findDoc);
					}
				})
				
				
			}
		}
	})
})

//需求
router.post('/require',(req,res,next)=>{
	console.log(req.body);
	//查询需求
	if(req.body.type == '1'){
		var openid = req.body.openid;
		Require.find({openid:openid},(listErr,listDoc)=>{
			if (listErr) {
				return res.json({
					code: 1,
					msg: '查询需求失败',
					result: listErr
				})
			} else {
				res.json({
					code: 0,
					msg: '查询需求成功',
					result: listDoc
				})
			}
		})
	}
	//新增需求
	else{
		Require.create(req.body,(err,doc)=>{
			if (err) {
				return res.json({
					code: 1,
					msg: '保存需求失败',
					result: err
				})
			} else {
				res.json({
					code: 0,
					msg: '保存需求成功',
					result: doc
				})
			}
		});
	}
	
})

module.exports = router;
