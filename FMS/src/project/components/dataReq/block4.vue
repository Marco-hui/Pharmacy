<template>
    <div>
        <div id="herd">
            <router-link to="/" class="aa">
                <img src="http://img.yaofang.cn/mobile/top_left1.jpg" class="black">
            </router-link>
            <router-link to="/search">
                <input placeholder="万艾可" type="text"/>
            </router-link>
            <img class="close" src="http://img.yaofang.cn/mobile/close02.png"/>
            <span>
                <a herf="#" style="top: 0;left:12px;color: #fff;">搜索</a>
            </span>
        </div>
        <section id="sct">
            <div class="tab">
                <div class="tab_li">
                    <ul>
                        <li class="on"><router-link to="/sort">重大疾病</router-link></li>
                        <li class="on"><router-link to="/block2">新药特药</router-link></li>
                        <li class="on"><router-link to="/block3">慢性疾病</router-link></li>
                        <li class="on"><router-link to="/block4" style="background-color:#E6E6E6;border-left: 8px solid #4990e0;color:#4990e0">家庭常备</router-link></li>
                        <li class="on"><router-link to="/block5">中医养生</router-link></li>
                        <li class="on"><router-link to="/block6">医疗器械</router-link></li>
                        <li class="on"><router-link to="/block7">营养保健</router-link></li>
                        <li class="on"><router-link to="/block8">健康超市</router-link></li>

                    </ul>
                </div>
                <div class="tab_box">
                    <div class="box_mian">
                        <div class="tab_box_tit">
                            <router-link to="/list4">
                                <span>
                                    <i></i>家庭常备<a>
                                        <img src="../img/arrows01.jpg"/>
                                    </a>
                                </span>
                            </router-link>
                            <ul>
                                <li v-for="(obj,idx) in dataset">
                                    <router-link to="/list4">
                                            <dl>
                                                <dt>
                                                    <img :src="obj.img_url"/>
                                                </dt>
                                                <dd>
                                                    <p>{{obj.name}}</p>
                                                </dd>
                                            </dl>
                                        </a>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="tab_box_tit"></div>
                        <div class="tab_box_tit"></div>
                            
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
    import routers from '../../router/router.js'
    import http from '../../utils/httpclient.js'
    import hkfoot from '../home/foot/index_foot.vue'
    export default {
        components:{
            hkfoot
        },
        data(){
            return{
                dataset:[]
            }
        },
        mounted(){
            http.get('categorys').then((res) => {
                var datas = res.data;
                var arr = datas.data;
                var map = {},
                dest = [];
                
                
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].category_id==='c4'){
                        dest.push({
                            id: arr[i].id,
                            img_url: arr[i].img_url,
                            name: arr[i].name,
                            category: arr[i].category,
                        });
                    }
                }
                this.dataset = dest;  
            })
        }
    }
</script>