<template lang="html">
    <div class="box">        
        <div class="header">
            <qheader></qheader>
        </div>
        <div class="nav">
            <qnav></qnav>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>     
    </div>
</template>

<script>
import './home.css'
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
        
    }
}
</script>