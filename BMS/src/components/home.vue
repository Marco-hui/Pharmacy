<template lang="html">
    <div class="box">        
        <qheader></qheader>
        <qnav></qnav>
        <div class="container">
            <router-view></router-view>
        </div>     
    </div>
</template>

<script>
import './home.css'
import http from "../utils/httpClient"
import qheader from './header/header.vue'
import qnav from './nav/nav.vue'

export default {
    components: {
        qheader,
        qnav
    },
    data() {
        return {
            name: '药房网后台管理系统',
        }
    },
    methods: {
        
    },
    mounted() {
        http.post('islogin').then(res=>{
            if(!res.data.status){
                this.$router.push({name:'login'});
            }
        })
    }
}
</script>