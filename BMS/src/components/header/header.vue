<template>
    <div class="header">
        <h2>药房网后台管理系统</h2>
        <!-- <img :src="src"/> -->
        <router-link to="/login">退出登录</router-link>
    </div>
</template>

<script>
    import './header.css'

    export default{
        data(){
            return {
                src: "../../assets/lbw.jpg"
            }
        }
    }
</script>