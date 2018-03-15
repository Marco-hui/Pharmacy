const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 获取首页商品数据接口
        app.get('/indexgoods',(req,res)=>{
            db.mongodb.select('indexgoods').then((result)=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 获取分类页商品数据接口
        app.get('/categorys',(req,res)=>{
            db.mongodb.select('categorys').then((result)=>{
                res.send(apiResult(result && result.length>0,result));
            })
        })
        // 获取列表页商品数据接口(支持价格排序)
        app.get('/products',(req,res)=>{
            let category_id = req.query.category_id*1;
            let _order = req.query.order*1;
            if(!_order){
                order={};
            }else{
                order={price:_order};
            }
            db.mongodb.select('products',{category_id},order).then(result=>{
                 res.send(apiResult(result && result.length>0,result));
            })
        })
        // 获取详情页商品数据接口
        app.get('/apro',(req,res)=>{
            let id = req.query.id;
            let _id = db.mongodb.objectid(id);
            db.mongodb.select('indexgoods',{_id}).then(result1=>{
                if(result1.length == 0){
                    db.mongodb.select('products',{_id}).then((result2)=>{
                        res.send(apiResult(true,result2));
                    })
                }else{
                    res.send(apiResult(true,result1));
                }
            })
        })
        // 获取首页和列表页商品模糊查询接口
        app.get('/fuzzy',(req,res)=>{
            var field = req.query.field.trim().replace(/[\*\^\$]/g,"");
            if(field){
                let proname = new RegExp("^.*"+field+".*$",'ig');
                let category = new RegExp("^.*"+field+".*$",'ig');
                let size = new RegExp("^.*"+field+".*$",'ig');
                let factory = new RegExp("^.*"+field+".*$",'ig');
                var data=[];
                db.mongodb.select('indexgoods',{$or:[{proname},{size},{factory}]}).then(data1=>{
                    data = data.concat(data1);
                    db.mongodb.select('products',{$or:[{proname},{category},{size},{factory}]}).then((data2)=>{
                        data=data.concat(data2);
                        res.send(apiResult(data && data.length > 0,data));
                    })
                })
            }
        })
    }
}