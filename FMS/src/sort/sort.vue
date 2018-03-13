<template>
    <router-view></router-view>
</template>

<script>
    import './css/base.css'
    import './css/sort.css'
    import http from 'axios'
    import block1 from './dataReq/block1.vue'



    export default {
        data(){
            return{
                dataset:[]
            }
        },
        components:{
            block1,
        }
    }


</script>