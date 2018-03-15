const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // （点击加入清单）数据加入购物车接口
        app.post('/addcar',filter,(req,res)=>{
            let data = req.body;
            data.id = data.id;
            data.price = data.price*1;
            data.oprice = data.oprice*1;
            data.store = data.store*1;
            data.qty = data.qty*1;
            db.mongodb.select('car',{id:data.id,username:data.username}).then(result=>{
                // 若商品已存在，更新数量即可    
                if(result && result.length>0){
                    var qty = result[0].qty*1 + data.qty;
                    db.mongodb.update('car',{id:data.id,username:data.username},{qty}).then(result1=>{
                        res.send(apiResult(true,result1));
                    })
                }else{
                    db.mongodb.insert('car',data).then(result=>{
                        res.send(apiResult(true,result));
                    })
                }
            })
        })
        // 获取购物车商品列表数据接口
        app.get('/getcar',(req,res)=>{
            let username = req.query.username;
            db.mongodb.select('car',{username}).then(result=>{
                res.send(result);
            })
        })
        // 购物车页增加减少商品数量
        app.post('/changeqty',(req,res)=>{
            let id = req.body._id;
            let _id = db.mongodb.objectid(id);
            let qty = req.body.qty;
            db.mongodb.update('car',{_id},{qty}).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 删除购物车商品（支持单件、多选、全部删除）
        app.post('/removepro',(req,res)=>{
            var _id = req.body._id;
            var username = req.body.username;
            if(_id){
                try{
                    _id = db.mongodb.objectid(_id);
                    db.mongodb.delete('car',{_id}).then(result=>{
                        res.send(apiResult(true,result));
                    })
                }catch(error){
                    try{
                        _id = JSON.parse(_id);
                        var data = [];
                        _id.forEach(item=>{
                            data.push({_id:db.mongodb.objectid(item)});
                        })
                        db.mongodb.delete('car',{$or:data}).then(result=>{
                            res.send(apiResult(true,result));
                        })
                    }catch(err){
                        res.send(apiResult(false,null,err));
                    }
                }
            }else if(username){
                db.mongodb.delete('car',{username}).then(result=>{
                    res.send(apiResult(true,result));
                })
            }
        })
    }
}