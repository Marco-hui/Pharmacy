const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 生成订单接口
        app.post('/createorder',(req,res)=>{
            let orders = req.body;
            orders.total*=1;
            orders.status*=1;
            orders.pros = JSON.parse(orders.pros);
            db.mongodb.select('order',{username:orders.username,status:0}).then(result=>{
                // 如果当前用户存在未提交订单，则更新订单信息
                if(result && result.length>0){
                    db.mongodb.update('order',{_id:db.mongodb.objectid(result[0]._id)},orders).then(result1=>{
                        res.send(apiResult(true,result1));
                    });
                }else{ // 否则新增订单
                    db.mongodb.insert('order',orders).then(result2=>{
                        res.send(apiResult(true,result2));
                    })
                }
            })
        })
        // 获取订单接口
        app.get('/getorder',(req,res)=>{
            let username = req.query.username;
            db.mongodb.select('order',{username,status:0}).then(result=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 提交订单（付款成功）接口
        app.post('/putorder',(req,res)=>{
            let id = req.body._id;
            let _id = db.mongodb.objectid(id);
            let proids = JSON.parse(req.body.proids);
            db.mongodb.update('order',{_id},{status:1}).then(result=>{
                var arr = [];
                proids.forEach(item=>{
                    arr.push({_id:db.mongodb.objectid(item)});
                })
                db.mongodb.delete('car',{$or:arr}).then(result=>{
                    res.send(apiResult(true,result));
                })
            })
        })
    }
}