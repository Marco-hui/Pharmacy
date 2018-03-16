<template>
    <div>
        <div id="herd">
             <a herf="#" @click="blacklast" class="aa">
                <img src="http://img.yaofang.cn/mobile/top_left1.jpg" class="black">
            </a>
            <router-link to="/search">
                <input placeholder="马应龙" type="text"/>
            </router-link>
            <img class="close" src="http://img.yaofang.cn/mobile/close02.png"/>
            <span>
                <a herf="#" style="top: 0;left:12px;color: #fff;">搜索</a>
            </span>
        </div>
        <section id="sct">
            <div class="tab">
                <div class="tab_tool">
                    <ul>
                        <li class="category on" @click="moren">默认</li>
                        <li class="category on" style="width:20%;" @click="shang">价格↑</li>
                        <li class="category on" style="width:20%;" @click="xia">价格↓</li>
                    </ul>
                </div>
                <div class="tab_boxs">
                    <div class="good_list">
                        <div class="good_html">
                            <ul class="search_goods">
                                <li v-for="(obj,idx) in dataset">
                                    <router-link :to="'details/'+obj._id">
                                        <dl>
                                            <dt>
                                                <img :src="obj.imgurl"/>
                                            </dt>
                                            <dd>
                                                <p>{{obj.proname}}</p>
                                                <p><span>规格：{{obj.size}}</span></p>
                                                <p><span class="prices">￥{{obj.price}}</span></p>
                                            </dd>
                                        </dl>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer id="foot">
            <hkfoot></hkfoot>
        </footer>
    </div>
</template>

<script>
    import '../css/base.css'
    import  hkfoot from '../home/foot/index_foot.vue'
    
    import http from '../../utils/httpclient.js' 
    export default {
    components:{
            hkfoot
        },
        data(){
            return{
                dataset:[]
            }
        },
        methods:{
            blacklast(){
                window.history.go(-1);
            },
            moren(){
                http.get('products?category_id=3&').then((res) => {
                    this.dataset  = res.data.data;
                })
            },
            shang(){
                http.get('products?category_id=3&order=1').then((res) => {
                    this.dataset  = res.data.data;
                })
            },
            xia(){
                http.get('products?category_id=3&order=-1').then((res) => {
                    this.dataset  = res.data.data;
                })
            }
        },
        mounted(){
            http.get('products?category_id=3').then((res) => {
                var datas = res.data;
                var arr = datas.data;
                var map = {},
                dest = [];
                
                
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].category_id=='3'){
                        dest.push({
                            _id: arr[i]._id,
                            id: arr[i].id,
                            imgurl: arr[i].imgurl,
                            proname: arr[i].proname,
                            size:arr[i].size,
                            price:arr[i].price,
                        });
                    }
                }
                this.dataset = dest;  
            })
        }
    }

</script>