const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

module.exports={
    reg(app){
        // 数据库操作——增(可多件)
        app.post('/addProduct',(req,res)=>{
            let data = JSON.parse(req.body.data);
            db.mongodb.insert('products',data).then(result=>{
                res.send(result);
            })
        })
        // 数据库操作——删(可多件)
        app.post('/delProduct',(req,res)=>{
            let id = req.body.id;
            let ids = req.body.data;
            console.log(id,Boolean(ids));
            if(id){
                let _id = db.mongodb.objectid(id);
                db.mongodb.delete('products',{_id}).then(result=>{
                    res.send(result);
                })
            }else if(ids){
                ids = JSON.parse(ids).ids;
                var id_arr=[];
                for(var i=0;i<ids.length;i++){
                    id_arr.push({_id:db.mongodb.objectid(ids[i])})
                }
                db.mongodb.delete('products',{$or:id_arr}).then(result=>{
                    res.send(result);
                })
            }
        })
    }
}