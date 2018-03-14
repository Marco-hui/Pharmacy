<template>
    <div class="nav">
        <div class="products">
            <p @click="show=!show">商品管理</p>
        </div>
        <div v-if="show">
            <router-link to="/indexPro" class="users_pro">首页商品</router-link>
            <router-link to="/products" class="users_pro">列表商品</router-link>
        </div>
    </div>
</template>

<script>
    import './nav.css'
    export default{
        data(){
            return {
                show: false
            }
        }
    }
</script>