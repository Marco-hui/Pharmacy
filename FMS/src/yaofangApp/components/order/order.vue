<template>
	<div class="lccontian lcbg">
		<header class="carheader">
			<a href="javascript:history.go(-1)">
				<img src="../login/img/top_left.png" class="iconarror">
			</a>
			<span>生成订单</span>
			<img src="../carts/img/home.png" class="iconhome" @click="show=!show">	
		</header>
		<div class="footertop" v-if="show">
			<lcfootertop></lcfootertop>
		</div>
		<div class="addr">
			<router-link to="/">+ 添加收货地址</router-link>
		</div>
		<div class="lclist">
			<ul class="lcgoods clearfix">
				<li v-for="(obj,idx) in pros">
					<img :src="'../../../../'+pros[idx].imgurl">
					<span>x <em>{{pros[idx].qty}}</em></span>
				</li>
				<!-- <li>
					<img src="./img/e960b443a25a561b5a827a0ff8289c3f4c7470ec.jpg">
					<span>x <em>4</em></span>
				</li> -->
			</ul>	
			<div>
				<span>···共
					<router-link to="/carts">
						<i>{{pros.length}}</i>	
					</router-link>
				种类</span>				
			</div>
		</div>
		<main class="lcadd">
			<ul>
				<li>
					<span>总计</span>
					<span>￥{{dataset.total}}</span>
				</li>
				<li>
					<span>配送费</span>
					<span>￥8</span>
				</li>
				<li>
					<span>优惠券</span>
					<span>￥0</span>
				</li>
				<li>
					<span>积分抵扣</span>
					<span>￥0</span>
				</li>
				<li>
					<span>活动抵扣</span>
					<span>￥0</span>
				</li>
			</ul>
		</main>
		<div class="another">
			<!-- wode -->
		</div>
		<footer class="ordersettlement">
			<!-- <div class="sumarea">
				<p>合计：0.00元</p>
				<p>总额0.00元 已减0.00元</p>
			</div> -->
			<p><em>实付款：￥ {{dataset.total}}</em></p>
			<span class="nextstep">
				<input type="button" value="立即付款" @click="payment">
			</span>
			
		</footer>
		
	</div>
</template>
<script>
	import './order.scss'
	import http from '../../utils/httpclient.js'
	import router from '../../router/rounter.js'
	import lcfootertop from '../home/footer.vue'
	export default {
		data(){
			return {
				user: '',
				dataset: [],
				pros: [],
				show: false
			}
		},
		components:{
			lcfootertop
		},
		mounted(){
			this.user= window.sessionStorage.getItem('username')
			http.get('getorder', {username: this.user}).then(res=>{
				if(res.data.status){
					this.dataset= res.data.data[0]
					this.pros= this.dataset.pros
				}else{
					console.log('无效订单')
				}
			})		
		},
		methods:{
			payment(){
				if(this.pros.length!=0){
					var arrids=[]
					for(var i=0;i<this.pros.length;i++){
						arrids.push(this.pros[i]._id)
					}
					var del_id={
						_id: this.dataset._id,
						proids: JSON.stringify(arrids)
					}
					console.log(del_id)
					http.post('putorder',del_id).then(res=>{
						if(res.data.data.n!=0){
							router.push('/payment/'+this.dataset.total)
							// query:{orderNo:orderNo}}
						}
					})			
				}else{
					console.log('无效订单')
				}	
			}
		}
	}
</script>