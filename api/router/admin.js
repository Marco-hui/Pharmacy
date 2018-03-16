const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

var express=require('express');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
// 设置上传目录
var uploadpath=path.join(path.resolve(__dirname,'../'),'temp/uploadgoods');
var upload=multer({ dest: uploadpath});

module.exports={
    reg(app){
        // 后台获取全部商品数据接口
        app.get('/admingetpro',filter,(req,res)=>{
            var goods=[];
            db.mongodb.select('indexgoods').then((goods1)=>{
                goods=goods.concat(goods1);
                db.mongodb.select('products').then((goods2)=>{
                    goods=goods.concat(goods2);
                    res.send(apiResult(true,goods));
                })
            })
        })
        // 数据库操作——增(可多件)
        app.post('/addProduct',filter,(req,res)=>{
            try{
                var data = JSON.parse(req.body.data);
            }catch(err){
                var data = req.body;
                data.price = data.price*1;
                data.oprice = data.oprice*1;
                data.store = data.store*1;
                data.category_id = data.category_id*1;
            }
            db.mongodb.insert('products',data).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 数据库操作——删(可多件)
        app.post('/delProduct',filter,(req,res)=>{
            let id = req.body.id;
            let ids = req.body.ids;
            if(id){
                let _id = db.mongodb.objectid(id);
                db.mongodb.delete('products',{_id}).then(result=>{
                    res.send(apiResult(true,result));
                })
            }else if(ids){
                ids = JSON.parse(ids);
                var id_arr=[];
                for(var i=0;i<ids.length;i++){
                    id_arr.push({_id:db.mongodb.objectid(ids[i])})
                }
                db.mongodb.delete('products',{$or:id_arr}).then(result=>{
                    res.send(apiResult(true,result));
                })
            }else{
                res.send(req.body);
            }
        })
        // 数据库操作——改  {id:_id,data:{}}
        app.post('/updateProduct',filter,(req,res)=>{
            let id = req.body.id;
            let data = JSON.parse(req.body.data);
            let _id = db.mongodb.objectid(id);
            db.mongodb.update('products',{_id},data).then(result1=>{
                if(result1.result.n == 0){
                    db.mongodb.update('indexgoods',{_id},data).then(result2=>{
                        res.send(apiResult(Boolean(result2.result.n),result2));
                    })
                }else{
                    res.send(apiResult(Boolean(result1.result.n),result1));
                }
            })
        })
        // 数据库操作——查（首页商品模糊查询）
        app.get('/indexfuzzy',filter,(req,res)=>{
            var field = req.query.field.trim().replace(/[\*\^\$]/g,"");
            if(field){
                let proname = new RegExp("^.*"+field+".*$",'ig');
                let size = new RegExp("^.*"+field+".*$",'ig');
                let price = new RegExp("^.*"+field+".*$",'ig');
                let store = new RegExp("^.*"+field+".*$",'ig');
                let proof = new RegExp("^.*"+field+".*$",'ig');
                let factory = new RegExp("^.*"+field+".*$",'ig');
                let server = new RegExp("^.*"+field+".*$",'ig');
                db.mongodb.select('indexgoods',{$or:[{proname},{size},{price},{store},{proof},{factory},{server}]}).then(result=>{
                    res.send(apiResult(result.length>0,result));
                })
            }
        })
        // 数据库操作——查（列表页商品模糊查询）
        app.get('/goodsfuzzy',filter,(req,res)=>{
            var field = req.query.field.trim().replace(/[\*\^\$]/g,"");
            if(field){
                let proname = new RegExp("^.*"+field+".*$",'ig');
                let size = new RegExp("^.*"+field+".*$",'ig');
                let price = new RegExp("^.*"+field+".*$",'ig');
                let store = new RegExp("^.*"+field+".*$",'ig');
                let proof = new RegExp("^.*"+field+".*$",'ig');
                let factory = new RegExp("^.*"+field+".*$",'ig');
                let server = new RegExp("^.*"+field+".*$",'ig');
                let category = new RegExp("^.*"+field+".*$",'ig');
                db.mongodb.select('products',{$or:[{proname},{size},{price},{store},{proof},{factory},{server},{category}]}).then((result)=>{
                    data=result;
                    res.send(apiResult(result.length > 0,result));
                })
            }
        })
        // 添加商品图片接口
        app.post('/uploadgoodsimg',upload.single('goodsimg'),(req,res)=>{
            var file=req.file;
            fs.rename(file.path,file.path+file.originalname);
            var imgurl = "src/assets/img/uploadgoods/"+file.filename+file.originalname;
            res.send(apiResult(true,imgurl));
        })
        
        // 获取所有用户信息接口
        app.get('/getusers',filter,(req,res)=>{
            db.mongodb.select('users').then(result=>{
                res.send(apiResult(result && result.length>0,result))
            })
        })
        // 用户帐号操作——查(模糊查询)
        app.get('/usersFuzzy',filter,(req,res)=>{
            let field = req.query.field;
            if(field){
                field = field.trim().replace(/[\*\.\^\$]/g,"");
                let username = new RegExp("^.*"+field+".*$",'ig');
                let credits = new RegExp("^.*"+field+".*$",'ig');
                let coupon = new RegExp("^.*"+field+".*$",'ig');
                let wallet = new RegExp("^.*"+field+".*$",'ig');
                db.mongodb.select('users',{$or:[{username},{credits},{coupon},{wallet}]}).then(result=>{
                    res.send(apiResult(result && result.length>0,result));
                })
            }
        })

        // 获取所有管理员信息接口
        app.get('/getadmins',filter,(req,res)=>{
            db.mongodb.select('administrator').then(result=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 管理员账号操作——增
        app.post('/addAdmin',filter,(req,res)=>{
            let name = req.body.name;
            let pass = req.body.pass;
            db.mongodb.select("administrator",{name}).then(result=>{
                if(result && result.length>0){
                    res.send(apiResult(false,null,null,"该用户名已存在"));
                }else{
                    db.mongodb.insert("administrator",{name,pass}).then(result1=>{
                        res.send(apiResult(true,result1));
                    })
                }
            })
        })
        // 管理员帐号操作——删
        app.post('/removeAdmin',filter,(req,res)=>{
            let _id = db.mongodb.objectid(req.body._id);
            db.mongodb.delete("administrator",{_id}).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 管理员帐号操作——改
        app.post('/updateAdmin',filter,(req,res)=>{
            let _id = db.mongodb.objectid(req.body._id);
            let pass = req.body.pass;
            db.mongodb.update('administrator',{_id},{pass}).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 管理员帐号操作——查(模糊查询)
        app.get("/selectAdmin",filter,(req,res)=>{
            let field = req.query.field;
            if(field){
                field = field.trim().replace(/[\*\.\^\$]/g,"");
                let name = new RegExp("^.*"+field+".*$",'ig');
                db.mongodb.select('administrator',{name}).then(result=>{
                    res.send(apiResult(result && result.length>0,result));
                })
            }
        })
    }
}