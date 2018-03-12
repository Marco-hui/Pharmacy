const db = require('../db');
const apiResult = require('../utils/apiResult');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

module.exports={
    reg(app){
        // 前台注册成功添加用户接口
        app.post('/register',function(req,res){
            var username = req.body.username;
            var password = req.body.password;
            var pass_secret = crypto.createHash('md5').update(password).digest('hex');
            db.mongodb.insert('users',{username,password:pass_secret,headurl:"/temp/default.jpg",credits:50,coupon:0,wallet:0}).then((result,err)=>{
                if(err){
                    res.send(apiResult(false));
                }else{
                    res.send(apiResult(true));
                }
            })
        })
        // 前台注册验证用户名是否存在接口 & 前台登录验证接口
        app.get('/login',function(req,res){
            var username = req.query.username;
            var password = req.query.password;
            console.log(password)
            if(password){
                var pass_secret = crypto.createHash('md5').update(password).digest('hex');
                db.mongodb.select('users',{username,password:pass_secret}).then(result=>{
                        let token = '';
                        let user = {username};
                        if(result.length>0) token=jwt.sign(user,'secret',{expiresIn: "3d"});
                        res.send(apiResult(result && result.length>0,{token,username}));
                })
            }else{
                db.mongodb.select('users',{username}).then(result=>{
                    res.send(apiResult(result && result.length>0));
                })
            }
        })
        // 后台注册成功添加用户接口
        app.post('/adminreg',function(req,res){
            var username = req.body.username;
            var password = req.body.password;
            db.mongodb.insert('administrator',{username,password}).then((result,err)=>{
                if(err){
                    res.send(apiResult(false));
                }else{
                    res.send(apiResult(true));
                }
            })
        })
        // 后台注册验证用户名是否存在接口 & 后台登录验证接口
        app.get('/adminlogin',function(req,res){
            var username = req.query.username;
            var password = req.query.password;
            if(password){
                db.mongodb.select('administrator',{username,password}).then(result=>{
                        let token = '';
                        let user = {username};
                        if(result.length>0) token=jwt.sign(user,'secret',{expiresIn: "3d"});
                        res.send(apiResult(result && result.length>0,{token,username}));
                })
            }else{
                db.mongodb.select('administrator',{username}).then(result=>{
                    res.send(apiResult(result && result.length>0));
                })
            }
        })
    }
}