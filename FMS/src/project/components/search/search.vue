<template>
    <div>
        <div id="herd">
            <a herf="#" @click= "herd_a" class="aa">
                <img src="http://img.yaofang.cn/mobile/top_left1.jpg" class="black">
            </a>
            <input placeholder="万艾可" type="text"  id="input_val" value="" />
            <img class="close" src="http://img.yaofang.cn/mobile/close02.png" @click="xfocus"/>
            <span>
                <a herf="#" style="top: 0;left:12px;color: #fff;" @click="input_search">搜索</a>
            </span>
        </div>
        <div class="resss">
            <ul class="search_goods">
                <li v-for="(obj,idx) in bood">
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
        <footer id="foot">
            <hkfoot></hkfoot>
        </footer>
    </div>
</template>

<script>
    import '../search/search.css'
    import '../css/sort.css'
    import http from '../../utils/httpclient.js'
    import hkfoot from '../home/foot/index_foot.vue'
    export default {
        components:{
            hkfoot
        },
        data(){
            return {
                bood: [],
            }
        },
        methods:{
            herd_a(){
                 window.history.go(-1);
            },
            input_search(){
                var inputvalue =document.getElementById('input_val').value;
                if(inputvalue ==''){
                    bood: [];

                }else{
                    http.get('fuzzy',{field:inputvalue}).then((res) => {
                        this.bood = res.data.data;
                    })
                }
            },
            xfocus(){
                var input_val = document.getElementById('input_val');
                input_val.value="";
                input_val.focus();
            }
        }
    }
</script>