<template>
	<div class="lcminecontain">
		<header class="mineheader" v-if="user!=null">
			<div class="top">
				<span>我的药房网</span>
				<img src="./img/shezhi.png" @click="quit">
			</div>
			<div class="mynews">
				<router-link to="/shezhi">
					<img :src="'http://10.3.136.179:1010'+dataset.headurl">	
				</router-link>
				<div class="newmain">
					<span>{{dataset.username}}</span>
					<p>
						<em>积分：{{dataset.credits}}</em>
						<em>优惠券：0</em>
					</p>
				</div>	
			</div>
			<p class="demand">
				<router-link to="/carts">
					需求订单
				</router-link>	
			</p>
		</header>
		<header class="mineheader nouser" v-if="user==null">
			<router-link to="/login">
				<img src="./img/touxiang.png">
			</router-link>
			<router-link to="/login">
				<h1>请登录</h1>			
			</router-link>
		</header>

		<nav class="lcnav">
			<ul>
				<li>
					<!-- 未付款的订单数 -->
					<span>0</span>
					<router-link to="/order">
						待付款
					</router-link>
				</li>
				<li>
					<span>0</span>
					<span>待发货</span>
				</li>
				<li>
					<span>0</span>
					<span>待收货</span>
				</li>
				<li>
					<!-- 已付款的订单数 -->
					<span>0</span>
					<span>待评价</span>
				</li>
			</ul>
		</nav>
		<main class="lcmain">
			<ul class="list1">
				<li>
					<i class="iconshoucang"></i>
					<em>我的收藏</em>
					<span>商品收藏、店铺收藏</span>
				</li>
				<li>
					<i class="iconyaoyou"></i>
					<em>邀友有奖</em>
					<span>邀请好友、兑换现金券</span>
				</li>
				<li>
					<i class="iconshoucang"></i>
					<em>健康社区</em>
					<span>最新资讯、健康论坛</span>
				</li>
				<li>
					<i class="iconshoucang"></i>
					<em>积分兑换</em>
					<span>积分兑换</span>
				</li>
				<li>
					<i class="iconshoucang"></i>
					<em>我的钱包</em>
					<span>预存款、每康卡</span>
				</li>
			</ul>
		</main>
		<footer class="indexfooter">
			<!-- <lcfooter></lcfooter> -->
			<hkfoot></hkfoot>
		</footer>
		<div class="lcpop1" v-if="$store.state.common.showpop">
			<lcpop :msgFather="txt" :quitor="bol">
				
			</lcpop>		
		</div>
	</div>
</template>
<script>
	import './mine.scss'
	import hkfoot from '../home/foot/index_foot.vue'
	import http from '../../utils/httpclient.js'
	import lcpop from '../pop/pop.vue'
	import router from '../../router/router.js'
	export default {
		data(){
			return {
				user: '',
				dataset: [],
				txt: '',
				bol: true
			}
		},
		components:{
			hkfoot,
			lcpop
		},
		mounted(){
			this.user= window.sessionStorage.getItem('username')
			// console.log(this.user)
			if(this.user!=null){
				http.get('getuser',{username: this.user}).then(res=>{
					// console.log(res.data.data[0])
					this.dataset= res.data.data[0]
					// console.log(this.dataset)
					     
				})	
			}
		},
		methods:{
			quit(){
				this.$store.state.common.showpop=true
				this.txt="您确定要退出账号吗?"
				// setTimeout(function(){
				// 	console.log(44)
				// 	window.location.reload()
				// },1500)
				// if(this.$store.state.common.quit==true || this.$store.state.common.sure==true ){
				// }
				// if(this.$store.state.common.sure==true){
				// 	console.log(444)
				// 	window.sessionStorage.removeItem('infotoken')
				// 	this.$store.state.common.showpop=true
				// 	this.txt="已退出"
				// }
			},
			show(){
				return window.sessionStorage.getItem('username')==null ? false : true 
			}
		}
	}
</script>