<template>
    <div id="details">
        <div id="com_header">
           <div id="com_header_nav" v-for="(obj, idx) in dataset">
                <a id='com_header_a'><img src="http://img.yaofang.cn/mobile//top_left.png" @click="com_header_a" ></a>
                <h1 class="goods_name" >{{obj.proname}}</h1>
                <div class="menu"  @click="show=!show">
                    <img src="http://img.yaofang.cn/mobile/home.png">
                </div>
            </div>
        </div>
        <div id="details_body" v-for="(obj, idx) in dataset">
            <!-- footer的导航 -->
            <div id="daohang" v-if="show">
                <hkfoot></hkfoot>
            </div>

            <section class="slider-wrap">
                <img class="banner-image" :src="obj.imgurl" alt="1" >
            </section>
            <div class="goodsInf"  v-for="(obj, idx) in dataset">
                    <p class="goodsInf_info">
                        <span>{{obj.proname}}</span>
                        <span><b>规格</b>：{{obj.size}}</span>
                        <span><b>商品编码</b>：{{obj.store}}</span>
                        <span><b>批准文号</b>：{{obj.proof}}</span>
                        <span><b>生产厂家</b>：{{obj.factory}}</span>
                        <span><b>服务由</b>：<span style="color:#4990E0;">{{obj.server}}</span><b> 提供</b></span>
                    </p>
                    <div class="s_mes">
                        <p class="goodsInf_price">
                            <span>￥{{obj.price}}</span>
                            <del>￥{{obj.oprice}}</del>
                            <span id="ssnum"> 库存<i>{{obj.store}}</i></span>
                        </p>
                        <div class="goodsNum">
                            <i>购买数量：</i>
                            <span id="reduce" @click="reduce">-</span>
                            <input type="text" id="numInp" v-model="total" >
                            <span id="add" @click="addinput">+</span>
                        </div>
                    </div>
            </div>
            <div class="goodsInf_sale">
                    <span>包邮</span> <i>可享受以下优惠</i>
                    <div class="goodsNum">
                        <p>购买本店商品满99元免基础配送费，偏远地区除外</p>
                    </div>
            </div>
            <div class="aaa" id="aaa" style="display: none">
                <div class="shopC">成功加入购物车</div>
            </div>
            <div class="bbb" id="bbb" style="display: none">
                <div class="shopL">请先登录</div>
            </div>

        </div>
        <div class="buyCont">
            <div class="buyCont_left">
                <a class="buy_coll">
                    <b class="collect"></b>
                    <i>收藏</i>                   
                </a>
                <router-link to="/carts">
                    <b class="shopCar">
                        <span class="shopNum"></span>
                    </b>
                    <i>需求清单</i>
                </router-link>
               <!--  <a href="/carts">
                    <b class="shopCar">
                        <span class="shopNum"></span>
                    </b>
                    <i>需求清单</i>
                </a> -->
            </div>
            <div class="m_see">
                <div class="buyCont_btn">
                    <a href="javascript:;" class="addShop" @click="addShop">加入清单</a>
                    <!-- 这里有问题 应该要传参数 或者还要写个接口 -->
                    <!--  <router-link to="/order" style="margin-left: 0.2rem;" class="buynow">立即提交               
                    </router-link> -->
                    <a style="margin-left: 0.2rem;" href="javascript:;" class="buynow" @click="goorder">立即提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import './details.css'
    import './com_header.css'
    import hkfoot from '../home/foot/index_foot.vue'
    import http from '../../utils/httpclient.js'
    import router from '../../router/router.js'
    import $ from 'jquery'



    export default {
        components:{
            hkfoot
        },
        data(){
            return {
                dataset: [],
                total:1,
                show: false
            }
        },methods:{
            com_header_a(){
                window.history.go(-1);
            },
            addinput(){
                this.total+=1;
            },
            reduce(){
                var n = this.total;
            
                n--;
                if(n<1){

                    n =1;

                }
                this.total = n
            },
            addShop(){
                if(window.sessionStorage.getItem('username')!=null){
                    $(".aaa").css('display','block');
                        setTimeout(function(){
                            $(".aaa").css('display','none');
                        },1500);
                    var obj ={
                        "id":this.dataset[0]._id,
                        "proname":this.dataset[0].proname ,
                        "oprice":this.dataset[0].oprice,
                        "price":this.dataset[0].price,
                        "imgurl":this.dataset[0].imgurl,
                        "store":this.dataset[0].store,
                        "server":this.dataset[0].server,
                        "size":this.dataset[0].size,
                        // "username":"13413611594",
                        "username" : window.sessionStorage.getItem('username'),
                        "qty":this.total
                    }
                   
                    http.post("addcar",obj).then(res=>{
                        
                    })           
                }else{
                    $(".bbb").css('display','block');
                    setTimeout(function(){
                            $(".bbb").css('display','none');
                             router.push('/mine')
                        },1500);
                }
            },
            // 另增 点击立即提交去到订单页面
            goorder(){
                
                if(window.sessionStorage.getItem('username')!=null){
                    
                    var arrpros=[]
                    var order={
                        username: window.sessionStorage.getItem('username'),
                        total: (this.total*this.dataset[0].price).toFixed(2),
                        status: 0,
                        pros:JSON.stringify([{
                            '_id': this.dataset[0]._id,
                            'imgurl': this.dataset[0].imgurl,
                            'qty': this.total
                        }]) 
                    }
                    http.post('createorder',order).then(res=>{
                        router.push('/order')
                    })   
                }else{
                    $(".bbb").css('display','block');
                     setTimeout(function(){
                            $(".bbb").css('display','none');
                        },1500);
                }
            },
        },
        mounted(){
            var _id=this.$route.params.id;
            http.get("apro",{id:_id}).then(res=>{
                this.dataset = res.data.data;
                
            })
        }

    }
</script>