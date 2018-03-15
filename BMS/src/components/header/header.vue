<template>
    <div class="header">
        <h2>药房网后台管理系统</h2> 
        <h4>
            <i class="fa fa-user-circle-o fa-lg"></i>当前用户：<span>{{username}}</span>
            <a @click="logout">退出</a>
        </h4>
    </div>
</template>

<script>
    import './header.scss'
    import '../../assets/font-awesome/css/font-awesome.min.css'
    export default{
        data(){
            return {
                username:""
            }
        },
        methods:{
            getuser(){
                this.username=window.sessionStorage.getItem("username");
            },
            logout(){
                window.sessionStorage.removeItem("username");
                window.sessionStorage.removeItem("xxtoken");
                this.$router.push({path:"/login"});
            }
        },
        mounted(){
            this.getuser();
        }
    }
</script>