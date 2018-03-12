var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

var url="mongodb://localhost:27017";
var dbName="Pharmacy";

var client=null;

MongoClient.connect(url,function(err,_client){
    if(err) return console.error(err);
    client=_client;
})

module.exports={
    select(coll_name,condition){
        if(client){
            return new Promise((resolve,reject)=>{
                var col = client.db(dbName).collection(coll_name);
                col.find(condition || {}).toArray((err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        }
    },
    insert(coll_name,data){
        if(client){
            return new Promise((resolve,reject)=>{
                var col = client.db(dbName).collection(coll_name);
                col.insert(data).then((result,err)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        }
    },
    update(coll_name,condition,data){
        if(client){
            return new Promise((resolve,reject)=>{
                var col = client.db(dbName).collection(coll_name);
                col.update(condition,{$set:{data}}).then((result,err)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        }
    },
    delete(coll_name,condition){
        if(client){
            return new Promise((resolve,reject)=>{
                var col = client.db(dbName).collection(coll_name);
                col.remove(condition || {}).then((result,err)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                })
            })
        }
    },
    objectid(_id){
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}