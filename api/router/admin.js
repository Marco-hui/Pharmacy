const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 数据库操作——增(可多件)
        app.post('/addProduct',(req,res)=>{
            let data = JSON.parse(req.body.data);
            db.mongodb.insert('products',data).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 数据库操作——删(可多件)
        app.post('/delProduct',(req,res)=>{
            let id = req.body.id;
            let ids = req.body.data;
            if(id){
                let _id = db.mongodb.objectid(id);
                db.mongodb.delete('products',{_id}).then(result=>{
                    res.send(apiResult(true,result));
                })
            }else if(ids){
                ids = JSON.parse(ids).ids;
                var id_arr=[];
                for(var i=0;i<ids.length;i++){
                    id_arr.push({_id:db.mongodb.objectid(ids[i])})
                }
                db.mongodb.delete('products',{$or:id_arr}).then(result=>{
                    res.send(apiResult(true,result));
                })
            }
        })
        // 数据库操作——改  {id:_id,data:{}}
        app.post('/updateProduct',(req,res)=>{
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
    }
}