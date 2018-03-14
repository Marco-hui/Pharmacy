<template>
    <div id="adminlogin">
        <div class="superlogin"></div>
        <div class="loginBox locate">
            <div class="logo"><img src="src/assets/img/logo.jpg"/></div>
            <div class="loginMain">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="title">用户名：</td>
                        <td><input type="text" class="form-control txt" v-model="username"/></td>
                    </tr>
                    <tr>
                        <td class="title">密   码：</td>
                        <td><input type="password" class="form-control txt" v-model="password"/></td>
                    </tr>
                    <tr>
                        <td class="title">验证码：</td>
                        <td><input type="text" class="form-control txt txt2" v-model="yzm" @blur="vCode"/><span class="yzm" @click="createCode">6666</span></td>
                    </tr>
                    <tr class="errortd">
                        <td>&nbsp;</td>
                        <td><i class="ico-error"></i><span class="errorword"></span></td>
                    </tr>        
                    <tr class="opt">
                        <td>&nbsp;</td>
                        <td><button id="btnlogin" @click="Login">登录</button><button id="btnreset">重置</button></td>
                    </tr>        
                    <tr class="forget">
                        <td>&nbsp;</td><td class="forgetpsw"><a href="login_forgetb.html" class="fr">忘记密码？</a></td>
                    </tr>   
                </table>
            </div>
        </div>
        <div class="footer">Copyright &copy; 2018-2019 yaofang  All Rights Reserved.</div>
    </div>
</template>

<script>
    import "../../assets/common/base.css"
    import "./login.scss"
    import $ from "jquery"
    import http from "../../utils/httpClient.js"

    export default{
        data(){
            return{
                username:'',
                password:'',
                yzm:'',
                _yzm:'',
                status:false,
                show:false
            }
        },
        methods:{
            createCode(){
                var arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
                var vcode='';
                for(var i=0;i<4;i++){
                    vcode += arr[parseInt(Math.random()*arr.length)]
                }
                $(".yzm").html(vcode);
                this._yzm=vcode;
            },
            vCode(){
                if(this.yzm == ""){
                    $('.errortd').show().find('.errorword').text("请输入验证码！");
                    $('.txt2').focus();
                    this.status=false;
                }else if(this.yzm !== this._yzm.toLowerCase()){
                    $('.errortd').show().find('.errorword').text("验证码输入错误！");
                    $('.txt2').focus();
                    this.status=false;
                }else{
                    $('.errortd').hide();
                    this.status=true;
                }
            },
            Login(){
                if(!this.status){
                     $('.errortd').show().find('.errorword').text("验证码有误！");
                     $('.txt2').focus();
                     return false;
                }
                http.get('adminlogin',{username:this.username,password:this.password}).then(res=>{
                    if(res.data.status){
                        window.sessionStorage.setItem('xxtoken',res.data.data.token);
                        window.sessionStorage.setItem('username',res.data.data.name)
                        this.$router.push({path:"/"});
                    }else{
                        $('.errortd').show().find('.errorword').text("用户名或密码错误，请重新输入！");
                        this.createCode();
                        this.yzm='';
                        this.status=false;
                    }
                })
            }
        },
        mounted(){
            this.createCode();
        }
    }
</script>