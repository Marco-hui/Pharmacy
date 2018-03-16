<template>
    <div id="header">
        <h1>
            <img src="../../../img/logo.jpg" > 
        </h1>
        <router-link to="/search">
        <mt-search  v-model="value" cancel-text="取消"placeholder="搜索"  @focus="show()">
        </mt-search>
        </router-link>
    </div>
</template>





<script>

    import Vue from 'vue'
    import { Search } from 'mint-ui';
    Vue.component(Search.name, Search);
    // import 'mint-ui/lib/style.css'
    import './index_header.css'
    export default{
        data:function(){
            return {
                value:''
            }
        },
         mounted(){}
    }
</script>

