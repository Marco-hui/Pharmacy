<template>
    <div id="index_goods">
      <div class="west_title Recommend_color">
        <h2 style="margin-left:38.1%;">为你推荐</h2>
      </div>
        <div class="Recommend_div">
         
  <!--需要懒加载的组件-->
          <ul id="thelist">
            <li v-for="(obj, idx) in dataset.slice(20,60)">
              <router-link :to="'/details/'+obj._id" >
                <vue-lazy-component>
                  <img :src="obj.imgurl">
                    <div class="commodity">
                      <span>{{obj.proname}}</span>
                      <p class="commodity_pri"><i>￥{{obj.price}}</i></p>
                    </div>
                </vue-lazy-component>
              </router-link>
            </li>
          </ul>
        </div>
    </div>
</template>


<script>
    import './index_goods.css'
    // import { Lazyload } from 'mint-ui';
    
    // import Vue from 'vue'
    // Vue.use(Lazyload);
    import VueLazyComponent from '@xunlei/vue-lazy-component'
    import Vue from 'vue'

    Vue.use(VueLazyComponent)

    import http from '../../../../utils/httpclient.js'


    export default{

        data(){
            return {
                dataset: [],
                show: false
            }
        },
        mounted(){
            http.get('indexgoods').then(res=>{
                this.dataset = res.data.data;
            })
        }
    }
    
        
    
</script>