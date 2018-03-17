<template>
    <div id="index_home">
        <dkheader></dkheader>
        <div id="index_body">
            <hkbenner></hkbenner>
            <hknav></hknav>
            <hkmain></hkmain>
            <hkgoods></hkgoods>
            <hklist></hklist>
            <!-- <div id="scrollTop" @click="toTop">
                <img src="../img/top.png" height="82" width="82" alt="" />
            </div> -->
        </div>
        <div id="index_hkfoot1">
            <hkfoot></hkfoot>
        </div>
    </div>
</template>

<script>
    import './home.css'
    import '../../../base/base.css'
    import dkheader from '../home/header/index_header.vue'
    import hkbenner from './body/slideshow/benner.vue'
    import hknav from './body/index_nav/index_nav.vue'
    import hkmain from './body/index_main/index_main.vue'
    import hkfoot from './foot/index_foot.vue'
    import hkgoods from './body/index_goods/index_goods.vue'
    import hklist from './index_list/index_list.vue'
    import $ from 'jquery'

    export default {
        components: {
            dkheader,
            hkbenner,
            hknav,
            hkmain,
            hkfoot,
            hkgoods,
            hklist
        },
        methods: {
            // toTop(){
            //     console.log(666)
            //     $("#index_body").animate({scrollTop:0},400);  
            // }
        }
    }
</script>
/*<style type="text/css">
    @import '../../font_493gddw3ht0ozuxr/iconfont.css';
</style>*/