<template>
    <div class="nav">
        <div class="products">
            <p @click="show=!show">商品管理</p>
        </div>
        <div v-if="show">
            <router-link to="/indexPro" class="users_pro">首页商品</router-link>
            <router-link to="/products" class="users_pro">列表商品</router-link>
        </div>
        <div class="nav_users">
            <p @click="showUsers=!showUsers">账号管理</p>
        </div> 
        <router-link to="/usersMsg" class="users_msg" v-if="showUsers">用户</router-link>
        <router-link to="/admins" class="users_msg" v-if="showUsers">管理员</router-link>
        <div class="nav_maintain">
            <p @click="showpurchase=!showpurchase">采购管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain"  v-if="showpurchase">维护中...</a>
        <div class="nav_maintain">
            <p @click="showsupplier =!showsupplier ">供应商管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain"  v-if="showsupplier">维护中...</a>
        <div class="nav_maintain">
            <p @click="showtake=!showtake">收货管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain" v-if="showtake">维护中...</a>
        <div class="nav_maintain">
            <p @click="showput=!showput">入库管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain" v-if="showput">维护中...</a>
        <div class="nav_maintain">
            <p @click="showup=!showup">上架管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain" v-if="showup">维护中...</a>
        <div class="nav_maintain">
            <p @click="showdown=!showdown">下架管理</p>
        </div> 
        <a href ="javascript:return false;" class="maintain" v-if="showdown">维护中...</a>
    </div>
</template>

<script>
    import './nav.css'
    export default{
        data(){
            return {
                show: false,
                showUsers: false,
                showpurchase: false,
                showsupplier: false,
                showtake: false,
                showput: false,
                showup: false,
                showdown: false 
            }
        }
    }
</script>