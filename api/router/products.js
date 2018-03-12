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
    }
}