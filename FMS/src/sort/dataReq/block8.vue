<template>
    <div>
        <div id="herd">
            <a herf="#">
                <img src="http://img.yaofang.cn/mobile/top_left1.jpg">
            </a>
            <input placeholder="万艾可" type="text"/>
            <img class="close" src="http://img.yaofang.cn/mobile/close02.png"/>
            <span>
                <a herf="#" style="top: 0;left:12px;color: #fff;">搜索</a>
            </span>
        </div>
        <section id="sct">
            <div class="tab">
                <div class="tab_li">
                    <ul>
                        <li class="on"><router-link to="/">重大疾病</router-link></li>
                        <li class="on"><router-link to="/block2">新药特药</router-link></li>
                        <li class="on"><router-link to="/block3">慢性疾病</router-link></li>
                        <li class="on"><router-link to="/block4">家庭常备</router-link></li>
                        <li class="on"><router-link to="/block5">中医养生</router-link></li>
                        <li class="on"><router-link to="/block6">医疗器械</router-link></li>
                        <li class="on"><router-link to="/block7">营养保健</router-link></li>
                        <li class="on"><router-link to="/block8">健康超市</router-link></li>
                        <li class="on"><router-link to="/block9">健康服务</router-link></li>
                        <li class="on"><router-link to="/block10">隐形眼镜</router-link></li>
                    </ul>
                </div>
                <div class="tab_box">
                    <div class="box_mian">
                        <div class="tab_box_tit">
                            <span>
                                <i></i>重大疾病<a>
                                    <img src="http://img.yaofang.cn/mobile/arrows01.jpg"/>
                                </a>
                            </span>
                            <ul>
                                <li v-for="(obj,idx) in dataset">
                                    <router-link to="/list">
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
            <ul>
                <li class="home">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="find">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="buy">
                    <a>
                        <i></i>
                    </a>
                </li>
                <li class="my">
                    <a>
                        <i></i>
                    </a>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    import routers from '../router/router.js'
    import http from 'axios'
    import sort from '../sort.vue'
    export default {
        data(){
            return{
                dataset:[]
            }
        },
        mounted(){
            http.get('http://10.3.136.179:1010/categorys').then((res) => {
                var datas = res.data;
                var arr = datas.data;
                var map = {},
                dest = [];
                
                
                for(var i = 0; i < arr.length; i++){
                    if(arr[i].category_id==='c8'){
                        dest.push({
                            id: arr[i].id,
                            img_url: arr[i].img_url,
                            name: arr[i].name,
                            category: arr[i].category,
                        });
                    }
                }
                console.log(dest[0].img_url);
                this.dataset = dest;  
            })
        }
    }
</script>