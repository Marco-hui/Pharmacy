const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 数据库操作——增(可多件)
        app.post('/addProduct',(req,res)=>{
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
        app.post('/delProduct',(req,res)=>{
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