<template>
	<div class="lccontain">
		<header class="mineheader">
			<div class="top">
				<span>我的药房网</span>
				<img src="./img/shezhi.png">
			</div>
			<div class="mynews">
				<img src="./img/touxiang.png">
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
			
		</main>
		<footer class="indexfooter">
			<lcfooter></lcfooter>
			<!-- <router-view name="footer"> -->
		</footer>
	</div>
</template>
<script>
	import './mine.scss'
	import lcfooter from '../home/footer.vue'
	import http from '../../utils/httpclient.js'
	export default {
		data(){
			return {
				user: '',
				dataset: []
			}
		},
		components:{
			lcfooter
		},
		mounted(){
			this.user= window.sessionStorage.getItem('username')
			console.log(this.user)
			http.get('getuser',{username: this.user}).then(res=>{
				console.log(res.data.data[0])
				this.dataset= res.data.data[0]
			})

		}
	}
</script>