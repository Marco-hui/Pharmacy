const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');

var express=require('express');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
// 设置上传目录
var uploadpath=path.join(path.resolve(__dirname,'../'),'temp');
var upload=multer({ dest: uploadpath});

module.exports={
    reg(app){
        // 获取当前用户信息
        app.get('/getuser',(req,res)=>{
            let username = req.query.username;
            db.mongodb.select('users',{username}).then(result=>{
                res.send(apiResult(true,result));
            })
        })
        // 修改头像（文件上传）接口
        app.post('/uploadfile',upload.single('head'),(req,res)=>{
            var file=req.file;
            var username=req.body.username;
            fs.rename(file.path,file.path+file.originalname);
            var headurl = "/temp/"+file.filename+file.originalname;
            db.mongodb.update('users',{username},{headurl}).then(result=>{
                res.send(apiResult(true,result));
            })
        })
    }
}