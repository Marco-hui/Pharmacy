<template>
    <div id="main">
        <section class="abzy">
            <div class="limit_title">
                <img class="limit_title_pic" src="http://img.yaofang.cn/mobile/zbzy.png?v=201802241308" alt="按病找药">
            </div>
            <ul class="one_ul">
                <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/b6/6ca3d5a679109320507d36973484c6bc.jpg?v=201802241308" title="癫痫病" alt="癫痫病">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/22/50eef0b5476467739fbdd961c3d71c5d.jpg?v=201802241308" title="前列腺" alt="前列腺">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/0f/eb0de26b81dcef2ce4f932aea6292313.jpg?v=201802241308" title="肝炎" alt="肝炎">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/e8/45041838a78f788853ba8535d23e65d9.jpg?v=201802241308" title="抑郁症" alt="抑郁症">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/4e/b8062201c59da54030f423e7eefcd3ad.jpg?v=201802241308" title="肝癌" alt="肝癌">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/4f/a01c6738604afb6e5b46e1e92053da1c.jpg?v=201802241308" title="银屑病" alt="银屑病">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/f4/327c3eaabe38f54177019beee35b8cf2.jpg?v=201802241308" title="脑中风" alt="脑中风">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/d3/65c716b14d5050bdd78c417f814f6e69.jpg?v=201802241308" title="乙肝" alt="乙肝">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/36/2c90c31869ae567d894268693d373d72.jpg?v=201802241308" title="帕金森" alt="帕金森">
                    </a>
                </li>
                        <li>
                    <a href="#" name="__ad_index_abzy_default_pic">
                        <img src="http://img.yaofang.cn/image1/html_img/85/7551cb7c592397efa2610fc2efd86041.jpg?v=201802241308" title="男性" alt="男性">
                    </a>
                </li>
            </ul>
        </section>
        <!-- 要秒杀 -->
        <section class="activity">
            <div class="limit_title">
                <img class="limit_title_pic" src="http://img.yaofang.cn/mobile/mssp.png?v=201802241308" alt="“药”秒杀">
                <!-- <span class="limit_title_i">
                    <a href="#" class="a1">更多
                        <span>
                            <img src="http://img.yaofang.cn/mobile/more.png?v=201802241308" alt="更多"></span>
                    </a>
                </span> -->
            </div>
            <ul>
                <li v-for="(obj, idx) in dataset" v-if="idx<3">
                    <router-link :to="'/details/'+obj._id">
                            <img :src="obj.imgurl" alt="" />
                            <div class="limit_name">
                                <span>{{obj.proname}}</span>
                                <p></p>
                                <p class="price">
                                    <i>{{obj.price}}</i>
                                    <del>{{obj.oprice}}</del>
                                </p>
                            </div>
                        
                    </router-link>
                </li>
                
            </ul>
        </section>

        <!-- 重大疾病 -->
        <section class="activity">
            <div class="limit_title">
                <img class="limit_title_pic" src="http://img.yaofang.cn/mobile/zdjb.png?v=201802241308" alt="“药”秒杀">
                <!-- <span class="limit_title_i">

                    <a href="#" class="a1">更多

                        <span>
                            <img src="http://img.yaofang.cn/mobile/more.png?v=201802241308" alt="更多"></span>
                    </a>
                </span> -->
            </div>
            <ul>
                <li v-for="(obj, idx) in dataset.slice(3,6)" >
                    <router-link :to="'/details/'+obj._id">
                        <img :src="obj.imgurl" alt="" />
                        <div class="limit_name">
                            <span>{{obj.proname}}</span>
                            <p></p>
                            <p class="price">
                                <i>{{obj.price}}</i>
                                <del>{{obj.oprice}}</del>
                            </p>
                        </div>
                    </router-link>
                </li>
                
            </ul>
        </section>

    </div>
</template>
<script>
    import './index_main.css'
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