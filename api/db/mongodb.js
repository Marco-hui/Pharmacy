var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

var url = "mongodb://localhost:1010";
var client = null;

MongoClient.connect(url,function(err,_client){
    if(err) console.error(err);
    client = _client;
})

module.exports={
    select(coll_name,condition){
        if(client){
            return new Promise((resolve,reject)=>{
                var col = client
            })
        }
    },
    insert(){},
    update(){},
    delete(){},
    objectid(){}
}